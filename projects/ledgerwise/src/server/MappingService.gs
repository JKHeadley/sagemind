/**
 * MappingService.gs — Bank transaction mapping rules CRUD and matching.
 */

const MappingService = {
  /**
   * Get all active mapping rules, sorted by priority.
   */
  getActiveRules() {
    const rows = DAL.getAllRows(CONFIG.SHEETS.MAPPING_RULES);
    const cols = CONFIG.COLS.MAPPING_RULES;

    return rows
      .filter(row => String(row[cols.ACTIVE]).toUpperCase() === 'TRUE')
      .map(row => ({
        pattern:       row[cols.PATTERN],
        useRegex:      String(row[cols.USE_REGEX]).toUpperCase() === 'TRUE',
        drCode:        String(row[cols.DR_CODE]),
        crCode:        String(row[cols.CR_CODE]),
        project:       row[cols.PROJECT] || '',
        memoAppend:    row[cols.MEMO_APPEND] || '',
        sourceAccount: row[cols.SOURCE_ACCOUNT] || '',
        priority:      parseNumber(row[cols.PRIORITY]) || 100,
      }))
      .sort((a, b) => a.priority - b.priority);
  },

  /**
   * Get all mapping rules (including inactive).
   */
  getAll() {
    const rows = DAL.getAllRows(CONFIG.SHEETS.MAPPING_RULES);
    const cols = CONFIG.COLS.MAPPING_RULES;

    return rows
      .filter(row => row[cols.PATTERN]) // skip empty rows
      .map((row, i) => ({
        rowNumber:     i + 2,
        pattern:       row[cols.PATTERN],
        useRegex:      String(row[cols.USE_REGEX]).toUpperCase() === 'TRUE',
        drCode:        String(row[cols.DR_CODE]),
        crCode:        String(row[cols.CR_CODE]),
        project:       row[cols.PROJECT] || '',
        memoAppend:    row[cols.MEMO_APPEND] || '',
        sourceAccount: row[cols.SOURCE_ACCOUNT] || '',
        active:        String(row[cols.ACTIVE]).toUpperCase() === 'TRUE',
        priority:      parseNumber(row[cols.PRIORITY]) || 100,
      }));
  },

  /**
   * Match a transaction description against rules.
   * Returns the best match or null.
   */
  matchTransaction(description, amount, rules) {
    const desc = String(description).toUpperCase();
    const activeRules = rules || this.getActiveRules();

    for (const rule of activeRules) {
      let matched = false;
      if (rule.useRegex) {
        try {
          const re = new RegExp(rule.pattern, 'i');
          matched = re.test(description);
        } catch (e) {
          // Invalid regex, skip
          continue;
        }
      } else {
        matched = desc.includes(String(rule.pattern).toUpperCase());
      }

      if (matched) {
        return {
          ...rule,
          confidence: rule.useRegex ? 'high' : 'medium',
        };
      }
    }
    return null;
  },

  /**
   * Create a new mapping rule.
   */
  create(rule) {
    const missing = validateRequired(rule, ['pattern', 'drCode', 'crCode']);
    if (missing.length) {
      throw new Error('Missing required fields: ' + missing.join(', '));
    }

    DAL.appendRow(CONFIG.SHEETS.MAPPING_RULES, [
      rule.pattern,
      rule.useRegex ? 'TRUE' : 'FALSE',
      rule.drCode,
      rule.crCode,
      rule.project || '',
      rule.memoAppend || '',
      rule.sourceAccount || '',
      rule.active !== false ? 'TRUE' : 'FALSE',
      rule.priority || 100,
    ]);

    AuditService.log(CONFIG.SHEETS.MAPPING_RULES, rule.pattern, '', 'New rule', 'Create');
    return rule;
  },

  /**
   * Update a mapping rule by row number.
   */
  update(rowNumber, updates) {
    const sheet = DAL.getSheet(CONFIG.SHEETS.MAPPING_RULES);
    const row = sheet.getRange(rowNumber, 1, 1, 9).getValues()[0];

    if (updates.pattern !== undefined)       row[0] = updates.pattern;
    if (updates.useRegex !== undefined)      row[1] = updates.useRegex ? 'TRUE' : 'FALSE';
    if (updates.drCode !== undefined)        row[2] = updates.drCode;
    if (updates.crCode !== undefined)        row[3] = updates.crCode;
    if (updates.project !== undefined)       row[4] = updates.project;
    if (updates.memoAppend !== undefined)    row[5] = updates.memoAppend;
    if (updates.sourceAccount !== undefined) row[6] = updates.sourceAccount;
    if (updates.active !== undefined)        row[7] = updates.active ? 'TRUE' : 'FALSE';
    if (updates.priority !== undefined)      row[8] = updates.priority;

    DAL.updateRow(CONFIG.SHEETS.MAPPING_RULES, rowNumber, row);
    AuditService.log(CONFIG.SHEETS.MAPPING_RULES, row[0], '', 'Updated', 'Update');
  },

  /**
   * Delete a mapping rule by row number.
   */
  remove(rowNumber) {
    const sheet = DAL.getSheet(CONFIG.SHEETS.MAPPING_RULES);
    const pattern = sheet.getRange(rowNumber, 1).getValue();
    DAL.deleteRow(CONFIG.SHEETS.MAPPING_RULES, rowNumber);
    AuditService.log(CONFIG.SHEETS.MAPPING_RULES, pattern, '', '', 'Delete');
  },

  /**
   * Test a pattern against a sample description.
   */
  testPattern(pattern, useRegex, sampleDescription) {
    if (useRegex) {
      try {
        const re = new RegExp(pattern, 'i');
        return { matches: re.test(sampleDescription), valid: true };
      } catch (e) {
        return { matches: false, valid: false, error: e.message };
      }
    }
    return {
      matches: String(sampleDescription).toUpperCase().includes(String(pattern).toUpperCase()),
      valid: true,
    };
  },
};
