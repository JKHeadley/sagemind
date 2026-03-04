/**
 * ReportService.gs — Financial reports: P&L, Balance Sheet, Trial Balance.
 *
 * These compute from GL data directly rather than reading from the
 * formula-driven report sheets, so they work regardless of template formulas.
 */

const ReportService = {
  /**
   * Profit & Loss (Income Statement).
   * @param {string} startDate - YYYY-MM-DD
   * @param {string} endDate - YYYY-MM-DD
   */
  getProfitAndLoss(startDate, endDate) {
    const cacheKey = 'pl_' + startDate + '_' + endDate;
    const cached = AppCache.get(cacheKey);
    if (cached) return cached;

    const glRows = DAL.getGLByDateRange(startDate, endDate);
    const accounts = AccountsService.getAll();
    const cols = CONFIG.COLS.GL;

    // Accumulate by account
    const balances = {};
    for (const a of accounts) {
      if (a.type === CONFIG.ACCOUNT_TYPES.REVENUE || a.type === CONFIG.ACCOUNT_TYPES.EXPENSE) {
        balances[a.code] = { ...a, debits: 0, credits: 0 };
      }
    }

    for (const row of glRows) {
      const drCode = String(row[cols.DR_ACCOUNT]);
      const crCode = String(row[cols.CR_ACCOUNT]);
      if (drCode && balances[drCode]) balances[drCode].debits += parseNumber(row[cols.DR_AMOUNT]);
      if (crCode && balances[crCode]) balances[crCode].credits += parseNumber(row[cols.CR_AMOUNT]);
    }

    const revenueAccounts = [];
    const expenseAccounts = [];
    let totalRevenue = 0;
    let totalExpenses = 0;

    for (const code of Object.keys(balances)) {
      const b = balances[code];
      // Revenue: normal balance is Credit, so balance = credits - debits
      // Expense: normal balance is Debit, so balance = debits - credits
      if (b.type === CONFIG.ACCOUNT_TYPES.REVENUE) {
        const amount = round2(b.credits - b.debits);
        if (amount !== 0) {
          revenueAccounts.push({ code, name: b.name, subtype: b.subtype, amount });
          totalRevenue += amount;
        }
      } else {
        const amount = round2(b.debits - b.credits);
        if (amount !== 0) {
          expenseAccounts.push({ code, name: b.name, subtype: b.subtype, amount });
          totalExpenses += amount;
        }
      }
    }

    // Sort by account code
    revenueAccounts.sort((a, b) => a.code.localeCompare(b.code));
    expenseAccounts.sort((a, b) => a.code.localeCompare(b.code));

    const result = {
      startDate,
      endDate,
      revenue: {
        accounts: revenueAccounts,
        total: round2(totalRevenue),
      },
      expenses: {
        accounts: expenseAccounts,
        total: round2(totalExpenses),
      },
      netIncome: round2(totalRevenue - totalExpenses),
    };

    AppCache.set(cacheKey, result);
    return result;
  },

  /**
   * Balance Sheet.
   * @param {string} asOfDate - YYYY-MM-DD
   */
  getBalanceSheet(asOfDate) {
    const cacheKey = 'bs_' + asOfDate;
    const cached = AppCache.get(cacheKey);
    if (cached) return cached;

    // Balance sheet uses all GL entries up to asOfDate
    const glRows = DAL.getGLByDateRange('1900-01-01', asOfDate);
    const accounts = AccountsService.getAll();
    const cols = CONFIG.COLS.GL;

    const balances = {};
    for (const a of accounts) {
      if (a.type === CONFIG.ACCOUNT_TYPES.ASSET ||
          a.type === CONFIG.ACCOUNT_TYPES.LIABILITY ||
          a.type === CONFIG.ACCOUNT_TYPES.EQUITY) {
        balances[a.code] = { ...a, debits: 0, credits: 0 };
      }
    }

    for (const row of glRows) {
      const drCode = String(row[cols.DR_ACCOUNT]);
      const crCode = String(row[cols.CR_ACCOUNT]);
      if (drCode && balances[drCode]) balances[drCode].debits += parseNumber(row[cols.DR_AMOUNT]);
      if (crCode && balances[crCode]) balances[crCode].credits += parseNumber(row[cols.CR_AMOUNT]);
    }

    const assets = [];
    const liabilities = [];
    const equity = [];
    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;

    for (const code of Object.keys(balances)) {
      const b = balances[code];
      const isDebitNormal = b.normalBalance === 'Debit';
      const amount = round2(isDebitNormal ? (b.debits - b.credits) : (b.credits - b.debits));

      if (amount === 0) continue;

      const entry = { code, name: b.name, subtype: b.subtype, amount };

      if (b.type === CONFIG.ACCOUNT_TYPES.ASSET) {
        assets.push(entry);
        totalAssets += amount;
      } else if (b.type === CONFIG.ACCOUNT_TYPES.LIABILITY) {
        liabilities.push(entry);
        totalLiabilities += amount;
      } else {
        equity.push(entry);
        totalEquity += amount;
      }
    }

    // Calculate retained earnings (net income for all time)
    const pl = this.getProfitAndLoss('1900-01-01', asOfDate);
    const retainedEarnings = pl.netIncome;
    totalEquity += retainedEarnings;

    // Sort each section by account code
    assets.sort((a, b) => a.code.localeCompare(b.code));
    liabilities.sort((a, b) => a.code.localeCompare(b.code));
    equity.sort((a, b) => a.code.localeCompare(b.code));

    const result = {
      asOfDate,
      assets: { accounts: assets, total: round2(totalAssets) },
      liabilities: { accounts: liabilities, total: round2(totalLiabilities) },
      equity: {
        accounts: equity,
        retainedEarnings: round2(retainedEarnings),
        total: round2(totalEquity),
      },
      balanced: round2(totalAssets) === round2(totalLiabilities + totalEquity),
    };

    AppCache.set(cacheKey, result);
    return result;
  },

  /**
   * Trial Balance.
   * @param {string} startDate
   * @param {string} endDate
   */
  getTrialBalance(startDate, endDate) {
    const cacheKey = 'tb_' + startDate + '_' + endDate;
    const cached = AppCache.get(cacheKey);
    if (cached) return cached;

    const balances = LedgerService.getAllBalances(startDate, endDate);

    let totalDebits = 0;
    let totalCredits = 0;

    const rows = balances
      .filter(b => b.debits !== 0 || b.credits !== 0)
      .map(b => {
        totalDebits += b.debits;
        totalCredits += b.credits;
        return {
          code:        b.accountCode,
          name:        b.accountName,
          debits:      b.debits,
          credits:     b.credits,
          balance:     b.balance,
        };
      });

    const result = {
      startDate,
      endDate,
      accounts: rows,
      totalDebits: round2(totalDebits),
      totalCredits: round2(totalCredits),
      balanced: round2(totalDebits) === round2(totalCredits),
    };

    AppCache.set(cacheKey, result);
    return result;
  },

  /**
   * Dashboard summary data (aggregated for performance).
   */
  getDashboardData() {
    const cacheKey = 'dashboard';
    const cached = AppCache.get(cacheKey);
    if (cached) return cached;

    // Detect the latest year from GL data
    const year = getLatestGLYear();
    // Use December for past years, current month for current year
    const currentYear = new Date().getFullYear();
    const month = (year === currentYear) ? new Date().getMonth() : 11;
    const startOfYear = year + '-01-01';
    const endOfYear = year + '-12-31';
    const startOfMonth = year + '-' + String(month + 1).padStart(2, '0') + '-01';
    const endOfMonth = year + '-' + String(month + 1).padStart(2, '0') + '-' +
      String(new Date(year, month + 1, 0).getDate()).padStart(2, '0');

    // YTD P&L
    const ytdPL = this.getProfitAndLoss(startOfYear, endOfYear);

    // Monthly P&L
    const monthPL = this.getProfitAndLoss(startOfMonth, endOfMonth);

    // Cash balance (account 1000)
    const cashBalance = LedgerService.getAccountBalance('1000');

    // Recent transactions
    const recent = TransactionService.getEntries({ page: 1, pageSize: 10 });

    // Monthly revenue trend (last 6 months)
    const trend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(year, month - i, 1);
      const s = formatDate(d);
      const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const e = formatDate(lastDay);
      const pl = this.getProfitAndLoss(s, e);
      trend.push({
        month: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: pl.revenue.total,
        expenses: pl.expenses.total,
      });
    }

    const result = {
      dataYear: year,
      ytd: {
        revenue: ytdPL.revenue.total,
        expenses: ytdPL.expenses.total,
        netIncome: ytdPL.netIncome,
      },
      month: {
        revenue: monthPL.revenue.total,
        expenses: monthPL.expenses.total,
        netIncome: monthPL.netIncome,
      },
      cashBalance: cashBalance.balance,
      recentTransactions: recent.entries,
      trend,
    };

    AppCache.set(cacheKey, result, 120); // 2-minute cache for dashboard
    return result;
  },
};
