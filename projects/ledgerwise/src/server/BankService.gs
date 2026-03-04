/**
 * BankService.gs — Bank CSV import and auto-categorization.
 */

const BankService = {
  /**
   * Import parsed CSV rows into Bank_Raw.
   * @param {Array<{date: string, description: string, amount: number}>} rows
   * @returns {{ imported: number }}
   */
  importCSV(rows) {
    if (!rows || !rows.length) {
      throw new Error('No rows to import');
    }

    const bankRows = rows.map(r => [
      r.date,
      r.description,
      r.amount,
      '',              // Memo (populated during categorization)
      r.reference || '', // Bank Reference
      'Needs Review',  // Processed Status
    ]);

    DAL.appendRows(CONFIG.SHEETS.BANK_RAW, bankRows);
    AuditService.log(
      CONFIG.SHEETS.BANK_RAW,
      'CSV Import',
      '',
      rows.length + ' rows added',
      'CSV Import'
    );

    return { imported: rows.length };
  },

  /**
   * Get all unprocessed bank transactions.
   */
  getUnprocessed() {
    const unprocessed = DAL.getUnprocessedBankRows();
    const cols = CONFIG.COLS.BANK_RAW;

    return unprocessed.map(r => ({
      rowNumber:   r.rowNumber,
      date:        formatDate(r.data[cols.DATE]),
      description: r.data[cols.DESCRIPTION],
      amount:      parseNumber(r.data[cols.AMOUNT]),
      memo:        r.data[cols.MEMO],
      bankRef:     r.data[cols.BANK_REF],
      status:      r.data[cols.STATUS],
    }));
  },

  /**
   * Auto-categorize unprocessed bank transactions using mapping rules + AI fallback.
   * Returns categorized transactions with suggested accounts, confidence, and source.
   */
  autoCategorize() {
    const unprocessed = this.getUnprocessed();
    const rules = MappingService.getActiveRules();

    // Phase 1: Apply mapping rules
    const ruleMatched = [];
    const unmatched = [];

    for (var i = 0; i < unprocessed.length; i++) {
      var txn = unprocessed[i];
      var match = MappingService.matchTransaction(txn.description, txn.amount, rules);
      if (match) {
        ruleMatched.push({
          ...txn,
          suggested: {
            drCode:     match.drCode,
            crCode:     match.crCode,
            project:    match.project,
            memo:       match.memoAppend,
            rule:       match.pattern,
            confidence: match.useRegex ? 95 : 75,
            source:     'rule',
            reasoning:  'Matched rule: ' + match.pattern,
          },
        });
      } else {
        unmatched.push({ index: i, txn: txn });
      }
    }

    // Phase 2: AI fallback for unmatched transactions
    var aiResults = [];
    if (unmatched.length > 0 && AIService.isEnabled()) {
      try {
        var txnsForAI = unmatched.map(function(item) { return item.txn; });
        aiResults = AIService.categorizeTransactions(txnsForAI);
      } catch (e) {
        Logger.log('BankService: AI categorization failed: ' + e.message);
      }
    }

    // Build AI lookup by index
    var aiByIndex = {};
    for (var j = 0; j < aiResults.length; j++) {
      aiByIndex[aiResults[j].index] = aiResults[j];
    }

    // Merge unmatched with AI results
    var unmatchedResults = unmatched.map(function(item, idx) {
      var ai = aiByIndex[idx];
      if (ai && ai.confidence > 0) {
        return {
          ...item.txn,
          suggested: {
            drCode:     ai.drCode,
            crCode:     ai.crCode,
            project:    ai.project,
            memo:       '',
            rule:       '',
            confidence: ai.confidence,
            source:     'ai',
            reasoning:  ai.reasoning,
          },
        };
      }
      return { ...item.txn, suggested: null };
    });

    // Combine and sort by original row number
    var all = ruleMatched.concat(unmatchedResults);
    all.sort(function(a, b) { return a.rowNumber - b.rowNumber; });
    return all;
  },

  /**
   * Approve a transaction and optionally learn from it (create a mapping rule).
   */
  approveAndLearn(approval) {
    // Approve the transaction (creates GL entry + marks processed)
    var result = this.approveTransaction(approval);

    // If learn flag is set, create a mapping rule from this approval
    if (approval.learn && approval.description) {
      try {
        AIService.createRuleFromApproval(
          approval.description,
          approval.drCode,
          approval.crCode,
          approval.project || ''
        );
        result.ruleCreated = true;
      } catch (e) {
        Logger.log('approveAndLearn: Rule creation failed: ' + e.message);
        result.ruleCreated = false;
      }
    }

    return result;
  },

  /**
   * Approve a categorized bank transaction — create GL entry and mark as processed.
   * @param {object} approval
   * @param {number} approval.rowNumber - Bank_Raw row number
   * @param {string} approval.drCode - Debit account code
   * @param {string} approval.crCode - Credit account code
   * @param {string} [approval.project]
   * @param {string} [approval.memo]
   */
  approveTransaction(approval) {
    const missing = validateRequired(approval, ['rowNumber', 'drCode', 'crCode']);
    if (missing.length) {
      throw new Error('Missing required fields: ' + missing.join(', '));
    }

    // Read the bank row
    const sheet = DAL.getSheet(CONFIG.SHEETS.BANK_RAW);
    const row = sheet.getRange(approval.rowNumber, 1, 1, 6).getValues()[0];
    const cols = CONFIG.COLS.BANK_RAW;

    const amount = Math.abs(parseNumber(row[cols.AMOUNT]));
    const date = formatDate(row[cols.DATE]);
    const description = row[cols.DESCRIPTION];

    // Create GL entry
    TransactionService.createSimpleEntry(
      date,
      description,
      approval.drCode,
      approval.crCode,
      amount,
      approval.memo || row[cols.MEMO] || '',
      approval.project || ''
    );

    // Mark bank row as processed
    sheet.getRange(approval.rowNumber, cols.STATUS + 1).setValue('Processed');
    if (approval.memo) {
      sheet.getRange(approval.rowNumber, cols.MEMO + 1).setValue(approval.memo);
    }

    return { success: true, date, description, amount };
  },

  /**
   * Batch approve multiple categorized transactions.
   */
  batchApprove(approvals) {
    const results = [];
    for (const a of approvals) {
      try {
        results.push(this.approveTransaction(a));
      } catch (e) {
        results.push({ success: false, error: e.message, rowNumber: a.rowNumber });
      }
    }
    return results;
  },
};
