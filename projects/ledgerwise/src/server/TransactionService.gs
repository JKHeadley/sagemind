/**
 * TransactionService.gs — Journal entry creation and GL management.
 */

const TransactionService = {
  /**
   * Create a journal entry (one or more GL lines that must balance).
   * @param {object} entry
   * @param {string} entry.date - YYYY-MM-DD
   * @param {string} entry.description
   * @param {Array<{account: string, debit: number, credit: number}>} entry.lines
   * @param {string} [entry.memo]
   * @param {string} [entry.project]
   */
  createJournalEntry(entry) {
    const missing = validateRequired(entry, ['date', 'description', 'lines']);
    if (missing.length) {
      throw new Error('Missing required fields: ' + missing.join(', '));
    }

    if (!entry.lines || !entry.lines.length) {
      throw new Error('Journal entry must have at least one line');
    }

    // Validate double-entry: total debits must equal total credits
    let totalDebits = 0;
    let totalCredits = 0;
    for (const line of entry.lines) {
      totalDebits += parseNumber(line.debit);
      totalCredits += parseNumber(line.credit);

      // Validate account exists
      if (line.debit && !AccountsService.getByCode(line.account)) {
        throw new Error('Invalid debit account: ' + line.account);
      }
      if (line.credit && !AccountsService.getByCode(line.account)) {
        throw new Error('Invalid credit account: ' + line.account);
      }
    }

    if (round2(totalDebits) !== round2(totalCredits)) {
      throw new Error(
        'Journal entry does not balance. Debits: ' + round2(totalDebits) +
        ', Credits: ' + round2(totalCredits)
      );
    }

    const txnId = generateUUID();
    const glRows = [];

    for (const line of entry.lines) {
      const dr = parseNumber(line.debit);
      const cr = parseNumber(line.credit);

      glRows.push([
        entry.date,
        txnId,
        entry.description,
        dr > 0 ? line.account : '',
        dr > 0 ? dr : '',
        cr > 0 ? line.account : '',
        cr > 0 ? cr : '',
        entry.memo || '',
        entry.project || '',
        'OK',
        '', // Balance Check (formula-driven)
      ]);
    }

    DAL.appendRows(CONFIG.SHEETS.GL, glRows);
    AuditService.log(
      CONFIG.SHEETS.GL, txnId, '',
      entry.description + ' (' + glRows.length + ' lines)',
      'Create'
    );

    return { txnId, lines: glRows.length, total: round2(totalDebits) };
  },

  /**
   * Create a simple two-line journal entry (debit one account, credit another).
   */
  createSimpleEntry(date, description, drAccount, crAccount, amount, memo, project) {
    return this.createJournalEntry({
      date,
      description,
      memo,
      project,
      lines: [
        { account: drAccount, debit: amount, credit: 0 },
        { account: crAccount, debit: 0, credit: amount },
      ],
    });
  },

  /**
   * Get GL entries with pagination and optional filters.
   * @param {object} params
   * @param {number} [params.page=1]
   * @param {number} [params.pageSize]
   * @param {string} [params.startDate]
   * @param {string} [params.endDate]
   * @param {string} [params.account]
   * @param {string} [params.project]
   * @param {string} [params.search]
   */
  getEntries(params) {
    const p = params || {};
    let rows = DAL.getAllRows(CONFIG.SHEETS.GL);
    const cols = CONFIG.COLS.GL;

    // Apply filters
    if (p.startDate) {
      const start = new Date(p.startDate);
      rows = rows.filter(r => new Date(r[cols.DATE]) >= start);
    }
    if (p.endDate) {
      const end = new Date(p.endDate);
      end.setHours(23, 59, 59);
      rows = rows.filter(r => new Date(r[cols.DATE]) <= end);
    }
    if (p.account) {
      rows = rows.filter(r =>
        String(r[cols.DR_ACCOUNT]) === p.account ||
        String(r[cols.CR_ACCOUNT]) === p.account
      );
    }
    if (p.project) {
      rows = rows.filter(r => String(r[cols.PROJECT]).trim() === p.project.trim());
    }
    if (p.search) {
      const s = p.search.toLowerCase();
      rows = rows.filter(r =>
        String(r[cols.DESCRIPTION]).toLowerCase().includes(s) ||
        String(r[cols.MEMO]).toLowerCase().includes(s)
      );
    }

    // Sort by date descending (newest first)
    rows.sort((a, b) => new Date(b[cols.DATE]) - new Date(a[cols.DATE]));

    // Paginate
    const total = rows.length;
    const pageSize = p.pageSize || CONFIG.PAGE_SIZE;
    const pages = Math.ceil(total / pageSize) || 1;
    const page = Math.max(1, Math.min(p.page || 1, pages));
    const start = (page - 1) * pageSize;
    const pageRows = rows.slice(start, start + pageSize);

    return {
      entries: pageRows.map(row => ({
        date:        formatDate(row[cols.DATE]),
        txnId:       row[cols.TXN_ID],
        description: row[cols.DESCRIPTION],
        drAccount:   String(row[cols.DR_ACCOUNT]),
        drAmount:    parseNumber(row[cols.DR_AMOUNT]),
        crAccount:   String(row[cols.CR_ACCOUNT]),
        crAmount:    parseNumber(row[cols.CR_AMOUNT]),
        memo:        row[cols.MEMO],
        project:     row[cols.PROJECT],
        status:      row[cols.STATUS],
      })),
      total,
      page,
      pages,
    };
  },

  /**
   * Get entries grouped by transaction ID.
   */
  getTransaction(txnId) {
    const rows = DAL.findRows(CONFIG.SHEETS.GL, CONFIG.COLS.GL.TXN_ID, txnId);
    if (!rows.length) return null;

    const cols = CONFIG.COLS.GL;
    return {
      txnId,
      date:        formatDate(rows[0].data[cols.DATE]),
      description: rows[0].data[cols.DESCRIPTION],
      project:     rows[0].data[cols.PROJECT],
      lines: rows.map(r => ({
        drAccount: String(r.data[cols.DR_ACCOUNT]),
        drAmount:  parseNumber(r.data[cols.DR_AMOUNT]),
        crAccount: String(r.data[cols.CR_ACCOUNT]),
        crAmount:  parseNumber(r.data[cols.CR_AMOUNT]),
      })),
    };
  },
};
