/**
 * PlaidService.gs — Plaid bank connection integration.
 *
 * Manages bank connections via Plaid Link, syncs transactions
 * into Bank_Raw for categorization and approval.
 */

const PlaidService = {
  SANDBOX_URL: 'https://sandbox.plaid.com',
  PRODUCTION_URL: 'https://production.plaid.com',

  // ─── Credential Management ─────────────────────────────────

  _getProps() {
    var props = PropertiesService.getScriptProperties();
    return {
      clientId: props.getProperty('PLAID_CLIENT_ID') || '',
      secret: props.getProperty('PLAID_SECRET') || '',
      env: props.getProperty('PLAID_ENV') || 'sandbox',
    };
  },

  setCredentials(clientId, secret, env) {
    var props = PropertiesService.getScriptProperties();
    props.setProperty('PLAID_CLIENT_ID', clientId.trim());
    props.setProperty('PLAID_SECRET', secret.trim());
    props.setProperty('PLAID_ENV', env || 'sandbox');
  },

  isEnabled() {
    var p = this._getProps();
    return !!(p.clientId && p.secret);
  },

  getStatus() {
    var p = this._getProps();
    return {
      enabled: !!(p.clientId && p.secret),
      env: p.env,
      clientIdSet: !!p.clientId,
      secretSet: !!p.secret,
    };
  },

  _baseUrl() {
    var env = this._getProps().env;
    if (env === 'production') return this.PRODUCTION_URL;
    return this.SANDBOX_URL;
  },

  // ─── API Helper ─────────────────────────────────────────────

  _request(endpoint, body) {
    var p = this._getProps();
    if (!p.clientId || !p.secret) {
      throw new Error('Plaid credentials not configured');
    }

    var payload = Object.assign({
      client_id: p.clientId,
      secret: p.secret,
    }, body || {});

    var response = UrlFetchApp.fetch(this._baseUrl() + endpoint, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });

    var code = response.getResponseCode();
    var json = JSON.parse(response.getContentText());

    if (code !== 200) {
      var errMsg = json.error_message || json.display_message || 'Plaid API error';
      Logger.log('Plaid error [' + endpoint + ']: ' + JSON.stringify(json));
      throw new Error(errMsg);
    }

    return json;
  },

  // ─── Link Token ─────────────────────────────────────────────

  createLinkToken() {
    var userEmail = Session.getActiveUser().getEmail();
    var userId = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, userEmail)
      .map(function(b) { return ('0' + (b & 0xFF).toString(16)).slice(-2); }).join('');
    var result = this._request('/link/token/create', {
      user: { client_user_id: userId },
      client_name: 'SmartLedger',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    return { linkToken: result.link_token };
  },

  // ─── Token Exchange ─────────────────────────────────────────

  exchangePublicToken(publicToken) {
    var result = this._request('/item/public_token/exchange', {
      public_token: publicToken,
    });

    var accessToken = result.access_token;
    var itemId = result.item_id;

    // Get account info
    var accountsResult = this._request('/accounts/get', {
      access_token: accessToken,
    });

    var institution = accountsResult.item.institution_id || 'Unknown';

    // Try to get institution name
    var instName = institution;
    try {
      var instResult = this._request('/institutions/get_by_id', {
        institution_id: institution,
        country_codes: ['US'],
      });
      instName = instResult.institution.name;
    } catch (e) {
      // Non-critical, use ID as fallback
    }

    // Store each account as a connection
    var connections = [];
    var accounts = accountsResult.accounts || [];
    for (var i = 0; i < accounts.length; i++) {
      var acct = accounts[i];
      this._storeConnection({
        institutionName: instName,
        itemId: itemId,
        accessToken: accessToken,
        accountId: acct.account_id,
        accountName: acct.name,
        accountMask: acct.mask || '',
        lastSync: '',
        status: 'active',
        cursor: '',
      });
      connections.push({
        institutionName: instName,
        accountName: acct.name,
        accountMask: acct.mask || '',
      });
    }

    return { itemId: itemId, connections: connections };
  },

  // ─── Transaction Sync ──────────────────────────────────────

  syncTransactions(itemId) {
    var connections = this._getConnectionsByItem(itemId);
    if (!connections.length) throw new Error('No connections found for item: ' + itemId);

    var accessToken = connections[0].accessToken;
    var cursor = connections[0].cursor || '';

    var allAdded = [];
    var hasMore = true;

    while (hasMore) {
      var body = { access_token: accessToken };
      if (cursor) body.cursor = cursor;

      var result = this._request('/transactions/sync', body);
      allAdded = allAdded.concat(result.added || []);
      cursor = result.next_cursor || '';
      hasMore = result.has_more || false;
    }

    // Update cursor for all connections of this item
    this._updateCursor(itemId, cursor);

    if (allAdded.length === 0) {
      return { imported: 0, message: 'No new transactions' };
    }

    // Build account ID to connection lookup
    var acctLookup = {};
    for (var c = 0; c < connections.length; c++) {
      acctLookup[connections[c].accountId] = connections[c];
    }

    // Import into Bank_Raw
    var bankRows = [];
    for (var i = 0; i < allAdded.length; i++) {
      var txn = allAdded[i];
      // Skip if already imported (dedup by plaid_txn_id)
      if (this._isDuplicate(txn.transaction_id)) continue;

      bankRows.push([
        txn.date,                                         // Date
        txn.name || txn.merchant_name || '',               // Description
        txn.amount * -1,                                   // Amount (Plaid uses positive=debit)
        '',                                                // Memo
        txn.transaction_id,                                // Bank Reference
        'Needs Review',                                    // Status
      ]);
    }

    if (bankRows.length > 0) {
      DAL.appendRows(CONFIG.SHEETS.BANK_RAW, bankRows);
      AuditService.log(
        CONFIG.SHEETS.BANK_RAW,
        'Plaid Sync',
        '',
        bankRows.length + ' transactions from ' + connections[0].institutionName,
        'Plaid Sync'
      );
    }

    // Update last sync timestamp
    this._updateLastSync(itemId);

    return { imported: bankRows.length, total: allAdded.length };
  },

  // ─── Connection Management ─────────────────────────────────

  getConnections() {
    var sheet = this._getConnectionSheet();
    if (!sheet) return [];

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return []; // header only

    var connections = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[1]) continue; // skip empty rows
      connections.push({
        rowNumber: i + 1,
        institutionName: row[0],
        itemId: row[1],
        accountId: row[3],
        accountName: row[4],
        accountMask: row[5],
        lastSync: row[6] ? formatDate(row[6]) : 'Never',
        status: row[7] || 'active',
      });
    }
    return connections;
  },

  removeConnection(itemId) {
    // Revoke access token
    var connections = this._getConnectionsByItem(itemId);
    if (connections.length > 0) {
      try {
        this._request('/item/remove', {
          access_token: connections[0].accessToken,
        });
      } catch (e) {
        Logger.log('Plaid remove error: ' + e.message);
      }
    }

    // Remove rows from sheet
    var sheet = this._getConnectionSheet();
    if (!sheet) return;

    var data = sheet.getDataRange().getValues();
    // Delete from bottom to top to preserve row numbers
    for (var i = data.length - 1; i >= 1; i--) {
      if (data[i][1] === itemId) {
        sheet.deleteRow(i + 1);
      }
    }

    AuditService.log('Bank_Connections', itemId, '', 'Removed', 'Plaid Disconnect');
  },

  // ─── Internal Helpers ──────────────────────────────────────

  _getConnectionSheet() {
    var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    var sheet = ss.getSheetByName('Bank_Connections');
    if (!sheet) {
      // Auto-create the sheet with headers
      sheet = ss.insertSheet('Bank_Connections');
      sheet.getRange(1, 1, 1, 9).setValues([[
        'Institution', 'Item_ID', 'Access_Token', 'Account_ID',
        'Account_Name', 'Account_Mask', 'Last_Sync', 'Status', 'Cursor'
      ]]);
      sheet.setFrozenRows(1);
    }
    return sheet;
  },

  _storeConnection(conn) {
    var sheet = this._getConnectionSheet();
    sheet.appendRow([
      conn.institutionName,
      conn.itemId,
      conn.accessToken,
      conn.accountId,
      conn.accountName,
      conn.accountMask,
      conn.lastSync,
      conn.status,
      conn.cursor,
    ]);
  },

  _getConnectionsByItem(itemId) {
    var sheet = this._getConnectionSheet();
    if (!sheet) return [];
    var data = sheet.getDataRange().getValues();
    var results = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][1] === itemId) {
        results.push({
          rowNumber: i + 1,
          institutionName: data[i][0],
          itemId: data[i][1],
          accessToken: data[i][2],
          accountId: data[i][3],
          accountName: data[i][4],
          accountMask: data[i][5],
          lastSync: data[i][6],
          status: data[i][7],
          cursor: data[i][8] || '',
        });
      }
    }
    return results;
  },

  _updateCursor(itemId, cursor) {
    var sheet = this._getConnectionSheet();
    if (!sheet) return;
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][1] === itemId) {
        sheet.getRange(i + 1, 9).setValue(cursor); // Cursor is col 9
      }
    }
  },

  _updateLastSync(itemId) {
    var sheet = this._getConnectionSheet();
    if (!sheet) return;
    var data = sheet.getDataRange().getValues();
    var now = new Date();
    for (var i = 1; i < data.length; i++) {
      if (data[i][1] === itemId) {
        sheet.getRange(i + 1, 7).setValue(now); // Last_Sync is col 7
      }
    }
  },

  _isDuplicate(plaidTxnId) {
    // Check if this Plaid transaction ID already exists in Bank_Raw
    var rows = DAL.getAllRows(CONFIG.SHEETS.BANK_RAW);
    var bankRefCol = CONFIG.COLS.BANK_RAW.BANK_REF;
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i][bankRefCol]) === plaidTxnId) return true;
    }
    return false;
  },
};
