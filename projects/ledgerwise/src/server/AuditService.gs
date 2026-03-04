/**
 * AuditService.gs — Audit logging for all data mutations.
 */

const AuditService = {
  /**
   * Log an action to the Audit_Log sheet.
   * @param {string} sheetName - Which sheet was affected
   * @param {string} range - What was changed (description or cell reference)
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   * @param {string} action - Action type (Create, Update, Delete, CSV Import, etc.)
   */
  log(sheetName, range, oldValue, newValue, action) {
    const email = Auth.getCurrentUserEmail() || 'system';
    const timestamp = new Date();

    DAL.appendRow(CONFIG.SHEETS.AUDIT_LOG, [
      timestamp,
      email,
      sheetName,
      range,
      String(oldValue || ''),
      String(newValue || ''),
      action,
    ]);
  },

  /**
   * Get recent audit entries.
   * @param {number} [limit=50]
   * @returns {object[]}
   */
  getRecent(limit) {
    const rows = DAL.getAllRows(CONFIG.SHEETS.AUDIT_LOG);
    const cols = CONFIG.COLS.AUDIT_LOG;
    const count = limit || 50;

    // Rows are in chronological order, take from the end
    const recent = rows.slice(-count).reverse();

    return recent.map(row => ({
      timestamp:  row[cols.TIMESTAMP],
      userEmail:  row[cols.USER_EMAIL],
      sheetName:  row[cols.SHEET_NAME],
      range:      row[cols.RANGE],
      oldValue:   row[cols.OLD_VALUE],
      newValue:   row[cols.NEW_VALUE],
      action:     row[cols.ACTION],
    }));
  },
};
