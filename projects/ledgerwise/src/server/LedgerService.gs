/**
 * LedgerService.gs — General Ledger queries and account balance computation.
 */

const LedgerService = {
  /**
   * Get the balance of an account (sum of debits - sum of credits, respecting normal balance).
   * @param {string} accountCode
   * @param {string} [startDate]
   * @param {string} [endDate]
   */
  getAccountBalance(accountCode, startDate, endDate) {
    let rows;
    if (startDate && endDate) {
      rows = DAL.getGLByDateRange(startDate, endDate);
    } else {
      rows = DAL.getAllRows(CONFIG.SHEETS.GL);
    }

    const cols = CONFIG.COLS.GL;
    let debits = 0;
    let credits = 0;

    for (const row of rows) {
      if (String(row[cols.DR_ACCOUNT]) === String(accountCode)) {
        debits += parseNumber(row[cols.DR_AMOUNT]);
      }
      if (String(row[cols.CR_ACCOUNT]) === String(accountCode)) {
        credits += parseNumber(row[cols.CR_AMOUNT]);
      }
    }

    // Check normal balance to determine sign
    const account = AccountsService.getByCode(accountCode);
    const isDebitNormal = account && account.normalBalance === 'Debit';
    const balance = isDebitNormal ? (debits - credits) : (credits - debits);

    return {
      accountCode,
      accountName: account ? account.name : 'Unknown',
      debits: round2(debits),
      credits: round2(credits),
      balance: round2(balance),
    };
  },

  /**
   * Get balances for all accounts (for trial balance and reports).
   */
  getAllBalances(startDate, endDate) {
    const accounts = AccountsService.getAll();
    return accounts.map(a => this.getAccountBalance(a.code, startDate, endDate));
  },

  /**
   * Get account ledger (all entries for one account, with running balance).
   */
  getAccountLedger(accountCode, startDate, endDate) {
    let rows;
    if (startDate && endDate) {
      rows = DAL.getGLByDateRange(startDate, endDate);
    } else {
      rows = DAL.getAllRows(CONFIG.SHEETS.GL);
    }

    const cols = CONFIG.COLS.GL;
    const account = AccountsService.getByCode(accountCode);
    const isDebitNormal = account && account.normalBalance === 'Debit';

    // Filter for this account and sort by date
    const entries = rows
      .filter(row =>
        String(row[cols.DR_ACCOUNT]) === String(accountCode) ||
        String(row[cols.CR_ACCOUNT]) === String(accountCode)
      )
      .sort((a, b) => new Date(a[cols.DATE]) - new Date(b[cols.DATE]));

    let runningBalance = 0;
    return entries.map(row => {
      const dr = String(row[cols.DR_ACCOUNT]) === String(accountCode) ? parseNumber(row[cols.DR_AMOUNT]) : 0;
      const cr = String(row[cols.CR_ACCOUNT]) === String(accountCode) ? parseNumber(row[cols.CR_AMOUNT]) : 0;

      if (isDebitNormal) {
        runningBalance += dr - cr;
      } else {
        runningBalance += cr - dr;
      }

      return {
        date:        formatDate(row[cols.DATE]),
        txnId:       row[cols.TXN_ID],
        description: row[cols.DESCRIPTION],
        debit:       dr || '',
        credit:      cr || '',
        balance:     round2(runningBalance),
        memo:        row[cols.MEMO],
        project:     row[cols.PROJECT],
      };
    });
  },
};
