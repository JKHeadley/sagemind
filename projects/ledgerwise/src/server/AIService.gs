/**
 * AIService.gs — Gemini-powered AI categorization for bank transactions.
 *
 * Uses Google's Gemini 2.5 Flash (free tier, ~250 req/day) to suggest
 * debit/credit accounts for bank transactions that don't match mapping rules.
 * Results are cached to minimize API usage.
 */

const AIService = {
  MODEL: 'gemini-2.5-flash',
  API_BASE: 'https://generativelanguage.googleapis.com/v1beta/models/',
  BATCH_SIZE: 25,
  CACHE_TTL: 3600, // 1 hour

  // ─── API Key Management ─────────────────────────────────────

  getApiKey() {
    return PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY') || '';
  },

  setApiKey(key) {
    PropertiesService.getScriptProperties().setProperty('GEMINI_API_KEY', key.trim());
  },

  isEnabled() {
    return !!this.getApiKey();
  },

  getStatus() {
    const key = this.getApiKey();
    return {
      enabled: !!key,
      model: this.MODEL,
      keySet: !!key,
      keyPreview: key ? key.substring(0, 6) + '...' : '',
    };
  },

  // ─── Core Categorization ────────────────────────────────────

  /**
   * Categorize an array of bank transactions using Gemini.
   * @param {Array<{description: string, amount: number, date: string}>} transactions
   * @returns {Array<{index: number, drCode: string, crCode: string, project: string, confidence: number, reasoning: string}>}
   */
  categorizeTransactions(transactions) {
    if (!this.isEnabled()) return [];
    if (!transactions || !transactions.length) return [];

    const accounts = AccountsService.getAll();
    const recentExamples = this._getRecentExamples();

    // Check cache first — return cached results and identify uncached txns
    const results = [];
    const uncached = [];

    for (var i = 0; i < transactions.length; i++) {
      var txn = transactions[i];
      var cacheKey = this._cacheKey(txn.description, txn.amount);
      var cached = AppCache.get(cacheKey);
      if (cached) {
        cached.index = i;
        results.push(cached);
      } else {
        uncached.push({ index: i, txn: txn });
      }
    }

    if (uncached.length === 0) return results;

    // Batch uncached transactions
    var batches = [];
    for (var j = 0; j < uncached.length; j += this.BATCH_SIZE) {
      batches.push(uncached.slice(j, j + this.BATCH_SIZE));
    }

    for (var b = 0; b < batches.length; b++) {
      try {
        var batch = batches[b];
        var batchTxns = batch.map(function(item) { return item.txn; });
        var prompt = this._buildPrompt(batchTxns, accounts, recentExamples);
        var aiResults = this._callGemini(prompt);

        // Validate and cache each result
        for (var k = 0; k < aiResults.length; k++) {
          var result = aiResults[k];
          var batchItem = batch[result.index];
          if (!batchItem) continue;

          // Validate account codes exist
          result = this._validateResult(result, accounts);
          result.index = batchItem.index;

          // Cache the result
          var key = this._cacheKey(batchItem.txn.description, batchItem.txn.amount);
          AppCache.set(key, result, this.CACHE_TTL);

          results.push(result);
        }
      } catch (e) {
        Logger.log('AIService batch error: ' + e.message);
        // Continue with next batch — don't fail the whole run
      }
    }

    // Sort by original index
    results.sort(function(a, b) { return a.index - b.index; });
    return results;
  },

  // ─── Prompt Building ────────────────────────────────────────

  _buildPrompt(transactions, accounts, recentExamples) {
    var coaText = accounts.map(function(a) {
      return a.code + ' | ' + a.name + ' | ' + a.type + ' | ' + a.normalBalance;
    }).join('\n');

    var examplesText = '';
    if (recentExamples.length > 0) {
      examplesText = '\n\nRecent approved entries for reference:\n' +
        recentExamples.map(function(ex) {
          return 'Description: "' + ex.description + '" Amount: ' + ex.amount +
                 ' → DR: ' + ex.drCode + ', CR: ' + ex.crCode +
                 (ex.project ? ', Project: ' + ex.project : '');
        }).join('\n');
    }

    var txnText = transactions.map(function(txn, i) {
      return i + '. Description: "' + txn.description + '" | Amount: ' + txn.amount +
             ' | Date: ' + txn.date;
    }).join('\n');

    return {
      systemInstruction: {
        parts: [{
          text: 'You are a bookkeeping assistant for double-entry accounting. ' +
                'Suggest debit and credit accounts from the provided Chart of Accounts. ' +
                'For expenses (negative amounts): debit the Expense account, credit Cash/Bank (usually 1000). ' +
                'For income (positive amounts): debit Cash/Bank (usually 1000), credit the Revenue account. ' +
                'Never invent account codes — only use codes from the Chart of Accounts provided. ' +
                'If unsure, set confidence below 40.'
        }]
      },
      contents: [{
        parts: [{
          text: 'Chart of Accounts:\nCode | Name | Type | Normal Balance\n' + coaText +
                examplesText +
                '\n\nCategorize these bank transactions:\n' + txnText +
                '\n\nReturn a JSON array. Each element must have: ' +
                '{"index": <number>, "drCode": "<string>", "crCode": "<string>", "project": "<string or empty>", "confidence": <0-100>, "reasoning": "<brief explanation>"}' +
                '\nThe index must match the transaction number above.'
        }]
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      }
    };
  },

  // ─── Gemini API Call ────────────────────────────────────────

  _callGemini(requestBody) {
    var apiKey = this.getApiKey();
    if (!apiKey) throw new Error('Gemini API key not configured');

    var url = this.API_BASE + this.MODEL + ':generateContent?key=' + apiKey;

    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true,
    });

    var code = response.getResponseCode();
    if (code !== 200) {
      var errBody = response.getContentText();
      Logger.log('Gemini API error (' + code + '): ' + errBody);
      throw new Error('Gemini API error: ' + code);
    }

    var json = JSON.parse(response.getContentText());
    var text = json.candidates &&
               json.candidates[0] &&
               json.candidates[0].content &&
               json.candidates[0].content.parts &&
               json.candidates[0].content.parts[0] &&
               json.candidates[0].content.parts[0].text;

    if (!text) throw new Error('Empty response from Gemini');

    var parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error('Gemini returned non-array response');
    }

    return parsed;
  },

  // ─── Validation ─────────────────────────────────────────────

  _validateResult(result, accounts) {
    var accountCodes = {};
    for (var i = 0; i < accounts.length; i++) {
      accountCodes[String(accounts[i].code)] = true;
    }

    var drValid = accountCodes[String(result.drCode)] || false;
    var crValid = accountCodes[String(result.crCode)] || false;

    if (!drValid || !crValid) {
      // Reduce confidence for invalid codes
      result.confidence = Math.min(result.confidence || 0, 20);
      result.reasoning = (result.reasoning || '') +
        (!drValid ? ' [Invalid DR code: ' + result.drCode + ']' : '') +
        (!crValid ? ' [Invalid CR code: ' + result.crCode + ']' : '');
    }

    // Clamp confidence to 0-100
    result.confidence = Math.max(0, Math.min(100, result.confidence || 0));
    result.project = result.project || '';
    result.reasoning = result.reasoning || '';

    return result;
  },

  // ─── Few-Shot Examples ──────────────────────────────────────

  _getRecentExamples() {
    var cacheKey = 'ai_examples';
    var cached = AppCache.get(cacheKey);
    if (cached) return cached;

    try {
      var rows = DAL.getAllRows(CONFIG.SHEETS.GL);
      var cols = CONFIG.COLS.GL;

      // Get last 100 entries, then deduplicate by description
      var entries = rows.slice(-100).reverse();
      var seen = {};
      var examples = [];

      for (var i = 0; i < entries.length && examples.length < 20; i++) {
        var row = entries[i];
        var desc = String(row[cols.DESCRIPTION]).trim();
        if (!desc || seen[desc.toUpperCase()]) continue;
        seen[desc.toUpperCase()] = true;

        examples.push({
          description: desc,
          amount: parseNumber(row[cols.DR_AMOUNT]) || parseNumber(row[cols.CR_AMOUNT]),
          drCode: String(row[cols.DR_ACCOUNT]),
          crCode: String(row[cols.CR_ACCOUNT]),
          project: row[cols.PROJECT] || '',
        });
      }

      AppCache.set(cacheKey, examples, this.CACHE_TTL);
      return examples;
    } catch (e) {
      Logger.log('AIService: Error getting examples: ' + e.message);
      return [];
    }
  },

  // ─── Cache Key ──────────────────────────────────────────────

  _cacheKey(description, amount) {
    var raw = String(description).trim().toUpperCase() + '|' + String(amount);
    // Use Utilities.computeDigest for MD5
    var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, raw);
    var hex = digest.map(function(b) {
      var h = (b < 0 ? b + 256 : b).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join('');
    return 'ai_' + hex;
  },

  // ─── Learn from Approval ───────────────────────────────────

  /**
   * Create a mapping rule from an approved AI suggestion.
   * Called when user checks "Learn" on an AI-categorized transaction.
   */
  createRuleFromApproval(description, drCode, crCode, project) {
    // Extract a reasonable pattern from the description
    // Remove common noise: dates, amounts, reference numbers
    var pattern = String(description)
      .replace(/\d{1,2}\/\d{1,2}(\/\d{2,4})?/g, '')  // dates
      .replace(/\$[\d,.]+/g, '')                         // dollar amounts
      .replace(/\b\d{6,}\b/g, '')                        // long numbers (refs)
      .replace(/\s+/g, ' ')                              // collapse whitespace
      .trim();

    // If pattern is too short after cleanup, use original
    if (pattern.length < 4) {
      pattern = String(description).trim();
    }

    MappingService.create({
      pattern: pattern,
      useRegex: false,
      drCode: drCode,
      crCode: crCode,
      project: project || '',
      memoAppend: '',
      sourceAccount: '',
      active: true,
      priority: 100,
    });

    return { pattern: pattern, drCode: drCode, crCode: crCode, project: project || '' };
  },
};
