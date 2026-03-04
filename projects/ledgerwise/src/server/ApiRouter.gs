/**
 * ApiRouter.gs — Central API dispatcher.
 *
 * All client calls go through google.script.run.api(method, params).
 * This keeps the global namespace clean and centralizes auth checks.
 */

/**
 * Main API entry point called from the client.
 * @param {string} method - The API method to call
 * @param {object} params - Parameters for the method
 * @returns {object} { success: true, data: ... } or { success: false, error: '...' }
 */
function api(method, params) {
  try {
    // Auth check for all methods except getCurrentUser
    if (method !== 'getCurrentUser') {
      Auth.requireAuth();
    }

    const p = params || {};

    switch (method) {

      // ─── Auth ──────────────────────────────────────────────
      case 'getCurrentUser':
        return apiResponse(Auth.getCurrentUser());

      // ─── Data Year ──────────────────────────────────────────
      case 'getDataYear':
        return apiResponse({ year: getLatestGLYear() });

      // ─── Dashboard ─────────────────────────────────────────
      case 'getDashboardData':
        return apiResponse(ReportService.getDashboardData());

      // ─── Accounts (Chart of Accounts) ──────────────────────
      case 'getAccounts':
        return apiResponse(AccountsService.getAll());
      case 'getAccount':
        return apiResponse(AccountsService.getByCode(p.code));
      case 'getAccountsGrouped':
        return apiResponse(AccountsService.getGroupedByType());
      case 'createAccount':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(AccountsService.create(p));
      case 'updateAccount':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(AccountsService.update(p.code, p));
      case 'deleteAccount':
        Auth.requireRole(Auth.ROLES.ADMIN);
        return apiResponse(AccountsService.remove(p.code));

      // ─── Transactions (GL) ─────────────────────────────────
      case 'getEntries':
        return apiResponse(TransactionService.getEntries(p));
      case 'getTransaction':
        return apiResponse(TransactionService.getTransaction(p.txnId));
      case 'createJournalEntry':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(TransactionService.createJournalEntry(p));
      case 'createSimpleEntry':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(TransactionService.createSimpleEntry(
          p.date, p.description, p.drAccount, p.crAccount, p.amount, p.memo, p.project
        ));

      // ─── Ledger ────────────────────────────────────────────
      case 'getAccountBalance':
        return apiResponse(LedgerService.getAccountBalance(p.accountCode, p.startDate, p.endDate));
      case 'getAccountLedger':
        return apiResponse(LedgerService.getAccountLedger(p.accountCode, p.startDate, p.endDate));

      // ─── Bank Import ───────────────────────────────────────
      case 'importBankCSV':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(BankService.importCSV(p.rows));
      case 'getUnprocessedBank':
        return apiResponse(BankService.getUnprocessed());
      case 'autoCategorize':
        return apiResponse(BankService.autoCategorize());
      case 'approveTransaction':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(BankService.approveTransaction(p));
      case 'batchApprove':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(BankService.batchApprove(p.approvals));
      case 'approveAndLearn':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(BankService.approveAndLearn(p));

      // ─── Mapping Rules ─────────────────────────────────────
      case 'getMappingRules':
        return apiResponse(MappingService.getAll());
      case 'createMappingRule':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(MappingService.create(p));
      case 'updateMappingRule':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        MappingService.update(p.rowNumber, p);
        return apiResponse({ updated: true });
      case 'deleteMappingRule':
        Auth.requireRole(Auth.ROLES.ADMIN);
        MappingService.remove(p.rowNumber);
        return apiResponse({ deleted: true });
      case 'testMappingPattern':
        return apiResponse(MappingService.testPattern(p.pattern, p.useRegex, p.description));

      // ─── Projects ──────────────────────────────────────────
      case 'getProjects':
        return apiResponse(ProjectService.getAll());
      case 'getProject':
        return apiResponse(ProjectService.getByCode(p.code));
      case 'createProject':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(ProjectService.create(p));
      case 'updateProject':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(ProjectService.update(p.code, p));
      case 'deleteProject':
        Auth.requireRole(Auth.ROLES.ADMIN);
        ProjectService.remove(p.code);
        return apiResponse({ deleted: true });
      case 'getProjectPL':
        return apiResponse(ProjectService.getProjectPL(p.code, p.startDate, p.endDate));

      // ─── Reports ───────────────────────────────────────────
      case 'getProfitAndLoss':
        return apiResponse(ReportService.getProfitAndLoss(p.startDate, p.endDate));
      case 'getBalanceSheet':
        return apiResponse(ReportService.getBalanceSheet(p.asOfDate));
      case 'getTrialBalance':
        return apiResponse(ReportService.getTrialBalance(p.startDate, p.endDate));

      // ─── Audit ─────────────────────────────────────────────
      case 'getAuditLog':
        return apiResponse(AuditService.getRecent(p.limit));

      // ─── Plaid ───────────────────────────────────────────────
      case 'getPlaidStatus':
        return apiResponse(PlaidService.getStatus());
      case 'setPlaidCredentials':
        Auth.requireRole(Auth.ROLES.ADMIN);
        PlaidService.setCredentials(p.clientId, p.secret, p.env);
        return apiResponse(PlaidService.getStatus());
      case 'createLinkToken':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(PlaidService.createLinkToken());
      case 'exchangePublicToken':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(PlaidService.exchangePublicToken(p.publicToken));
      case 'getConnections':
        return apiResponse(PlaidService.getConnections());
      case 'syncTransactions':
        Auth.requireRole(Auth.ROLES.ACCOUNTANT);
        return apiResponse(PlaidService.syncTransactions(p.itemId));
      case 'removeConnection':
        Auth.requireRole(Auth.ROLES.ADMIN);
        PlaidService.removeConnection(p.itemId);
        return apiResponse({ removed: true });

      // ─── AI ─────────────────────────────────────────────────
      case 'getAIStatus':
        return apiResponse(AIService.getStatus());
      case 'setGeminiApiKey':
        Auth.requireRole(Auth.ROLES.ADMIN);
        AIService.setApiKey(p.key);
        return apiResponse(AIService.getStatus());

      // ─── Settings ──────────────────────────────────────────
      case 'ensureAuthSheet':
        Auth.requireRole(Auth.ROLES.ADMIN);
        DAL.ensureAuthSheet();
        return apiResponse({ created: true });

      default:
        return apiResponse(null, 'Unknown API method: ' + method);
    }

  } catch (e) {
    Logger.log('API Error [' + method + ']: ' + e.message);
    return apiResponse(null, e.message);
  }
}
