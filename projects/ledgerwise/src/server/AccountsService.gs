/**
 * AccountsService.gs — Chart of Accounts CRUD.
 */

const AccountsService = {
  /**
   * Get all accounts.
   */
  getAll() {
    const cacheKey = 'coa_all';
    const cached = AppCache.get(cacheKey);
    if (cached) return cached;

    const rows = DAL.getAllRows(CONFIG.SHEETS.COA);
    const cols = CONFIG.COLS.COA;
    const accounts = rows
      .filter(row => row[cols.CODE]) // skip empty rows
      .map(row => ({
        code:          String(row[cols.CODE]),
        name:          row[cols.NAME],
        type:          row[cols.TYPE],
        subtype:       row[cols.SUBTYPE],
        normalBalance: row[cols.NORMAL_BALANCE],
      }));

    AppCache.set(cacheKey, accounts);
    return accounts;
  },

  /**
   * Get a single account by code.
   */
  getByCode(code) {
    const result = DAL.findRow(CONFIG.SHEETS.COA, CONFIG.COLS.COA.CODE, code);
    if (!result) return null;
    const row = result.data;
    const cols = CONFIG.COLS.COA;
    return {
      code:          String(row[cols.CODE]),
      name:          row[cols.NAME],
      type:          row[cols.TYPE],
      subtype:       row[cols.SUBTYPE],
      normalBalance: row[cols.NORMAL_BALANCE],
    };
  },

  /**
   * Create a new account.
   */
  create(account) {
    const missing = validateRequired(account, ['code', 'name', 'type', 'normalBalance']);
    if (missing.length) {
      throw new Error('Missing required fields: ' + missing.join(', '));
    }

    // Check for duplicate code
    if (this.getByCode(account.code)) {
      throw new Error('Account code already exists: ' + account.code);
    }

    DAL.appendRow(CONFIG.SHEETS.COA, [
      account.code,
      account.name,
      account.type,
      account.subtype || '',
      account.normalBalance,
    ]);

    AppCache.invalidate('coa_all');
    AuditService.log(CONFIG.SHEETS.COA, account.code, '', account.name, 'Create');
    return this.getByCode(account.code);
  },

  /**
   * Update an existing account.
   */
  update(code, updates) {
    const found = DAL.findRow(CONFIG.SHEETS.COA, CONFIG.COLS.COA.CODE, code);
    if (!found) throw new Error('Account not found: ' + code);

    const cols = CONFIG.COLS.COA;
    const row = found.data.slice();
    const oldName = row[cols.NAME];

    if (updates.name !== undefined)          row[cols.NAME] = updates.name;
    if (updates.type !== undefined)          row[cols.TYPE] = updates.type;
    if (updates.subtype !== undefined)       row[cols.SUBTYPE] = updates.subtype;
    if (updates.normalBalance !== undefined) row[cols.NORMAL_BALANCE] = updates.normalBalance;

    DAL.updateRow(CONFIG.SHEETS.COA, found.rowNumber, row);
    AppCache.invalidate('coa_all');
    AuditService.log(CONFIG.SHEETS.COA, code, oldName, updates.name || oldName, 'Update');

    return this.getByCode(code);
  },

  /**
   * Delete an account. Only allowed if no GL entries reference it.
   */
  remove(code) {
    // Check for GL references
    const glRows = DAL.getAllRows(CONFIG.SHEETS.GL);
    const cols = CONFIG.COLS.GL;
    const inUse = glRows.some(row =>
      String(row[cols.DR_ACCOUNT]) === String(code) ||
      String(row[cols.CR_ACCOUNT]) === String(code)
    );
    if (inUse) {
      throw new Error('Cannot delete account ' + code + ': it is referenced in the General Ledger');
    }

    const found = DAL.findRow(CONFIG.SHEETS.COA, CONFIG.COLS.COA.CODE, code);
    if (!found) throw new Error('Account not found: ' + code);

    DAL.deleteRow(CONFIG.SHEETS.COA, found.rowNumber);
    AppCache.invalidate('coa_all');
    AuditService.log(CONFIG.SHEETS.COA, code, found.data[CONFIG.COLS.COA.NAME], '', 'Delete');
  },

  /**
   * Get accounts grouped by type (for dropdowns and reports).
   */
  getGroupedByType() {
    const accounts = this.getAll();
    const grouped = {};
    for (const a of accounts) {
      if (!grouped[a.type]) grouped[a.type] = [];
      grouped[a.type].push(a);
    }
    return grouped;
  },
};
