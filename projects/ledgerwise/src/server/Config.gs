/**
 * Config.gs — Central configuration for spreadsheet schema and app settings.
 *
 * All sheet names, column indices, and app-wide constants live here.
 * Nothing else in the codebase should hardcode sheet names or column positions.
 */

const CONFIG = {
  // Set this to the spreadsheet ID for your instance
  SPREADSHEET_ID: '1gKMIB2-RgmS4-YYSQh6_0Gx-iBjDS_YN0wwFE2rBvck',

  // Cache TTL in seconds
  CACHE_TTL: 300, // 5 minutes

  // Pagination defaults
  PAGE_SIZE: 50,

  // Sheet names
  SHEETS: {
    GL:              'General_Ledger',
    COA:             'Chart_of_Accounts',
    BANK_RAW:        'Bank_Raw',
    MAPPING_RULES:   'Mapping_Rules',
    PROJECTS:        'Projects',
    TRANSACTIONS:    'Transactions',
    AUDIT_LOG:       'Audit_Log',
    PL:              'P&L',
    BALANCE_SHEET:   'Balance_Sheet_Auto',
    TRIAL_BALANCE:   'Trial_Balance',
    RECONCILIATION:  'Reconciliation',
    CASH_FLOW:       'Cash_Flow',
    BVA:             'BvA',
    AUTH_USERS:      'Authorized_Users',
  },

  // Column indices (0-based) for each sheet
  COLS: {
    GL: {
      DATE:           0,
      TXN_ID:         1,
      DESCRIPTION:    2,
      DR_ACCOUNT:     3,
      DR_AMOUNT:      4,
      CR_ACCOUNT:     5,
      CR_AMOUNT:      6,
      MEMO:           7,
      PROJECT:        8,
      STATUS:         9,
      BALANCE_CHECK:  10,
    },
    COA: {
      CODE:           0,
      NAME:           1,
      TYPE:           2,
      SUBTYPE:        3,
      NORMAL_BALANCE: 4,
    },
    BANK_RAW: {
      DATE:           0,
      DESCRIPTION:    1,
      AMOUNT:         2,
      MEMO:           3,
      BANK_REF:       4,
      STATUS:         5,
    },
    MAPPING_RULES: {
      PATTERN:        0,
      USE_REGEX:      1,
      DR_CODE:        2,
      CR_CODE:        3,
      PROJECT:        4,
      MEMO_APPEND:    5,
      SOURCE_ACCOUNT: 6,
      ACTIVE:         7,
      PRIORITY:       8,
    },
    PROJECTS: {
      CODE:           0,
      NAME:           1,
      FUNDING:        2,
      REVENUE:        3,
      CLIENT_SHARE:   4,
      NOTES:          5,
    },
    TRANSACTIONS: {
      DATE:           0,
      DESCRIPTION:    1,
      DR_CODE:        2,
      DR_AMOUNT:      3,
      CR_CODE:        4,
      CR_AMOUNT:      5,
      PROJECT:        6,
    },
    AUDIT_LOG: {
      TIMESTAMP:      0,
      USER_EMAIL:     1,
      SHEET_NAME:     2,
      RANGE:          3,
      OLD_VALUE:      4,
      NEW_VALUE:      5,
      ACTION:         6,
    },
  },

  // Account type categories for reporting
  ACCOUNT_TYPES: {
    ASSET:     'Asset',
    LIABILITY: 'Liability',
    EQUITY:    'Equity',
    REVENUE:   'Revenue',
    EXPENSE:   'Expense',
  },
};
