/**
 * DAL.gs — Data Access Layer.
 *
 * ALL spreadsheet read/write operations go through this module.
 * Services never call SpreadsheetApp directly.
 */

const DAL = {
  _ss: null,

  /**
   * Get the bound spreadsheet instance.
   */
  getSpreadsheet() {
    if (!this._ss) {
      this._ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    }
    return this._ss;
  },

  /**
   * Get a sheet by name.
   */
  getSheet(sheetName) {
    const sheet = this.getSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Sheet not found: ' + sheetName);
    }
    return sheet;
  },

  // ─── Generic Read ────────────────────────────────────────────

  /**
   * Read all data rows from a sheet (excluding header row).
   * Returns a 2D array.
   */
  getAllRows(sheetName) {
    const sheet = this.getSheet(sheetName);
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return [];
    return sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  },

  /**
   * Read a page of data rows.
   * @param {string} sheetName
   * @param {number} page - 1-based page number
   * @param {number} [pageSize] - rows per page
   * @returns {{ rows: any[][], total: number, page: number, pages: number }}
   */
  getPagedRows(sheetName, page, pageSize) {
    const size = pageSize || CONFIG.PAGE_SIZE;
    const sheet = this.getSheet(sheetName);
    const lastRow = sheet.getLastRow();
    const total = Math.max(0, lastRow - 1); // exclude header
    const pages = Math.ceil(total / size) || 1;
    const p = Math.max(1, Math.min(page, pages));
    const startRow = 2 + (p - 1) * size;
    const count = Math.min(size, total - (p - 1) * size);

    if (count <= 0) return { rows: [], total, page: p, pages };

    const rows = sheet.getRange(startRow, 1, count, sheet.getLastColumn()).getValues();
    return { rows, total, page: p, pages };
  },

  /**
   * Get the header row for a sheet.
   */
  getHeaders(sheetName) {
    const sheet = this.getSheet(sheetName);
    return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  },

  // ─── Generic Write ───────────────────────────────────────────

  /**
   * Append a single row to a sheet.
   */
  appendRow(sheetName, rowData) {
    const sheet = this.getSheet(sheetName);
    sheet.appendRow(rowData);
    AppCache.invalidateReports();
  },

  /**
   * Append multiple rows to a sheet.
   */
  appendRows(sheetName, rows) {
    if (!rows.length) return;
    const sheet = this.getSheet(sheetName);
    const lastRow = sheet.getLastRow();
    const numCols = rows[0].length;
    sheet.getRange(lastRow + 1, 1, rows.length, numCols).setValues(rows);
    AppCache.invalidateReports();
  },

  /**
   * Update a specific row (1-based row number, including header).
   */
  updateRow(sheetName, rowNumber, rowData) {
    const sheet = this.getSheet(sheetName);
    sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    AppCache.invalidateReports();
  },

  /**
   * Delete a row by row number (1-based).
   */
  deleteRow(sheetName, rowNumber) {
    const sheet = this.getSheet(sheetName);
    sheet.deleteRow(rowNumber);
    AppCache.invalidateReports();
  },

  // ─── Lookup Helpers ──────────────────────────────────────────

  /**
   * Find a row by matching a column value.
   * Returns { rowNumber, data } or null.
   * @param {string} sheetName
   * @param {number} colIndex - 0-based column to match
   * @param {*} value - value to match
   */
  findRow(sheetName, colIndex, value) {
    const rows = this.getAllRows(sheetName);
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][colIndex]) === String(value)) {
        return { rowNumber: i + 2, data: rows[i] }; // +2 for header and 0-index
      }
    }
    return null;
  },

  /**
   * Find all rows matching a column value.
   * Returns array of { rowNumber, data }.
   */
  findRows(sheetName, colIndex, value) {
    const rows = this.getAllRows(sheetName);
    const results = [];
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][colIndex]) === String(value)) {
        results.push({ rowNumber: i + 2, data: rows[i] });
      }
    }
    return results;
  },

  // ─── GL-Specific ─────────────────────────────────────────────

  /**
   * Get GL entries filtered by date range.
   * @param {string} startDate - YYYY-MM-DD
   * @param {string} endDate - YYYY-MM-DD
   * @returns {any[][]}
   */
  getGLByDateRange(startDate, endDate) {
    const rows = this.getAllRows(CONFIG.SHEETS.GL);
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);

    return rows.filter(row => {
      const d = new Date(row[CONFIG.COLS.GL.DATE]);
      return d >= start && d <= end;
    });
  },

  /**
   * Get GL entries for a specific project.
   */
  getGLByProject(projectCode) {
    const rows = this.getAllRows(CONFIG.SHEETS.GL);
    return rows.filter(row =>
      String(row[CONFIG.COLS.GL.PROJECT]).trim() === String(projectCode).trim()
    );
  },

  // ─── Bank Raw ────────────────────────────────────────────────

  /**
   * Get unprocessed bank transactions.
   */
  getUnprocessedBankRows() {
    const rows = this.getAllRows(CONFIG.SHEETS.BANK_RAW);
    return rows
      .map((row, i) => ({ rowNumber: i + 2, data: row }))
      .filter(r => {
        const status = String(r.data[CONFIG.COLS.BANK_RAW.STATUS]).trim();
        return status !== 'Processed';
      });
  },

  // ─── Ensure Sheet Exists ─────────────────────────────────────

  /**
   * Create the Authorized_Users sheet if it doesn't exist.
   */
  ensureAuthSheet() {
    const ss = this.getSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEETS.AUTH_USERS);
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEETS.AUTH_USERS);
      sheet.appendRow(['Email', 'Role', 'Added Date', 'Added By']);
      // Add the spreadsheet owner as admin
      const owner = Session.getActiveUser().getEmail();
      if (owner) {
        sheet.appendRow([owner, 'admin', formatDate(new Date()), 'system']);
      }
    }
    return sheet;
  },
};
