/**
 * ProjectService.gs — Project tracking CRUD and per-project reporting.
 */

const ProjectService = {
  /**
   * Get all projects.
   */
  getAll() {
    const cacheKey = 'projects_all';
    const cached = AppCache.get(cacheKey);
    if (cached) return cached;

    const rows = DAL.getAllRows(CONFIG.SHEETS.PROJECTS);
    const cols = CONFIG.COLS.PROJECTS;
    const projects = rows
      .filter(row => row[cols.CODE])
      .map(row => ({
        code:        row[cols.CODE],
        name:        row[cols.NAME],
        funding:     row[cols.FUNDING],
        revenue:     row[cols.REVENUE],
        clientShare: row[cols.CLIENT_SHARE],
        notes:       row[cols.NOTES],
      }));

    AppCache.set(cacheKey, projects);
    return projects;
  },

  /**
   * Get a single project by code.
   */
  getByCode(code) {
    const found = DAL.findRow(CONFIG.SHEETS.PROJECTS, CONFIG.COLS.PROJECTS.CODE, code);
    if (!found) return null;
    const row = found.data;
    const cols = CONFIG.COLS.PROJECTS;
    return {
      code:        row[cols.CODE],
      name:        row[cols.NAME],
      funding:     row[cols.FUNDING],
      revenue:     row[cols.REVENUE],
      clientShare: row[cols.CLIENT_SHARE],
      notes:       row[cols.NOTES],
    };
  },

  /**
   * Create a new project.
   */
  create(project) {
    const missing = validateRequired(project, ['code', 'name']);
    if (missing.length) {
      throw new Error('Missing required fields: ' + missing.join(', '));
    }

    if (this.getByCode(project.code)) {
      throw new Error('Project code already exists: ' + project.code);
    }

    DAL.appendRow(CONFIG.SHEETS.PROJECTS, [
      project.code,
      project.name,
      project.funding || '',
      project.revenue || '',
      project.clientShare || '',
      project.notes || '',
    ]);

    AppCache.invalidate('projects_all');
    AuditService.log(CONFIG.SHEETS.PROJECTS, project.code, '', project.name, 'Create');
    return this.getByCode(project.code);
  },

  /**
   * Update a project.
   */
  update(code, updates) {
    const found = DAL.findRow(CONFIG.SHEETS.PROJECTS, CONFIG.COLS.PROJECTS.CODE, code);
    if (!found) throw new Error('Project not found: ' + code);

    const cols = CONFIG.COLS.PROJECTS;
    const row = found.data.slice();

    if (updates.name !== undefined)        row[cols.NAME] = updates.name;
    if (updates.funding !== undefined)     row[cols.FUNDING] = updates.funding;
    if (updates.revenue !== undefined)     row[cols.REVENUE] = updates.revenue;
    if (updates.clientShare !== undefined)  row[cols.CLIENT_SHARE] = updates.clientShare;
    if (updates.notes !== undefined)       row[cols.NOTES] = updates.notes;

    DAL.updateRow(CONFIG.SHEETS.PROJECTS, found.rowNumber, row);
    AppCache.invalidate('projects_all');
    AuditService.log(CONFIG.SHEETS.PROJECTS, code, '', 'Updated', 'Update');
    return this.getByCode(code);
  },

  /**
   * Delete a project (only if no GL entries reference it).
   */
  remove(code) {
    const glRows = DAL.getAllRows(CONFIG.SHEETS.GL);
    const inUse = glRows.some(r => String(r[CONFIG.COLS.GL.PROJECT]).trim() === code);
    if (inUse) {
      throw new Error('Cannot delete project ' + code + ': it is referenced in the General Ledger');
    }

    const found = DAL.findRow(CONFIG.SHEETS.PROJECTS, CONFIG.COLS.PROJECTS.CODE, code);
    if (!found) throw new Error('Project not found: ' + code);

    DAL.deleteRow(CONFIG.SHEETS.PROJECTS, found.rowNumber);
    AppCache.invalidate('projects_all');
    AuditService.log(CONFIG.SHEETS.PROJECTS, code, found.data[CONFIG.COLS.PROJECTS.NAME], '', 'Delete');
  },

  /**
   * Get P&L summary for a specific project.
   */
  getProjectPL(code, startDate, endDate) {
    const glRows = DAL.getGLByProject(code);
    const cols = CONFIG.COLS.GL;
    const accounts = AccountsService.getAll();

    // Build account lookup
    const acctMap = {};
    for (const a of accounts) acctMap[a.code] = a;

    let revenue = 0;
    let expenses = 0;

    for (const row of glRows) {
      // Apply date filter if provided
      if (startDate || endDate) {
        const d = new Date(row[cols.DATE]);
        if (startDate && d < new Date(startDate)) continue;
        if (endDate) {
          const e = new Date(endDate);
          e.setHours(23, 59, 59);
          if (d > e) continue;
        }
      }

      const drCode = String(row[cols.DR_ACCOUNT]);
      const crCode = String(row[cols.CR_ACCOUNT]);
      const drAmt = parseNumber(row[cols.DR_AMOUNT]);
      const crAmt = parseNumber(row[cols.CR_AMOUNT]);

      if (drCode && acctMap[drCode]) {
        if (acctMap[drCode].type === CONFIG.ACCOUNT_TYPES.EXPENSE) expenses += drAmt;
        if (acctMap[drCode].type === CONFIG.ACCOUNT_TYPES.REVENUE) revenue -= drAmt;
      }
      if (crCode && acctMap[crCode]) {
        if (acctMap[crCode].type === CONFIG.ACCOUNT_TYPES.REVENUE) revenue += crAmt;
        if (acctMap[crCode].type === CONFIG.ACCOUNT_TYPES.EXPENSE) expenses -= crAmt;
      }
    }

    return {
      projectCode: code,
      revenue:  round2(revenue),
      expenses: round2(expenses),
      netIncome: round2(revenue - expenses),
    };
  },
};
