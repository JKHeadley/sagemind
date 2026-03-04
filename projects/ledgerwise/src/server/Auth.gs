/**
 * Auth.gs — Authentication and authorization.
 *
 * Phase 1: Simple email-based authorization against Authorized_Users sheet.
 * Phase 2: Full RBAC (admin, accountant, viewer).
 */

const Auth = {
  ROLES: {
    ADMIN:      'admin',
    ACCOUNTANT: 'accountant',
    VIEWER:     'viewer',
  },

  /**
   * Get the current user's email.
   */
  getCurrentUserEmail() {
    // With USER_DEPLOYING, getActiveUser() returns the accessing user
    // but may return empty if user hasn't authorized. Fall back to effective user.
    var email = Session.getActiveUser().getEmail();
    if (!email) {
      email = Session.getEffectiveUser().getEmail();
    }
    return email || '';
  },

  /**
   * Get the current user's authorization info.
   * Returns { email, role, authorized } or { email, role: null, authorized: false }.
   *
   * Phase 1: If no Authorized_Users sheet exists, grant admin to anyone
   * with a Google account (the app is only accessible via URL anyway).
   * Phase 2: Strict RBAC via Authorized_Users sheet.
   */
  getCurrentUser() {
    const email = this.getCurrentUserEmail();
    if (!email) {
      // Even with fallbacks, no email — still allow in Phase 1
      return { email: 'anonymous', role: this.ROLES.ADMIN, authorized: true };
    }

    // Check if Authorized_Users sheet exists
    const ss = DAL.getSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.AUTH_USERS);

    if (!sheet) {
      // Phase 1: No auth sheet yet — allow anyone with the link as admin
      return { email, role: this.ROLES.ADMIN, authorized: true };
    }

    // Look up user in Authorized_Users sheet
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]).toLowerCase().trim() === email.toLowerCase().trim()) {
        return {
          email,
          role: String(rows[i][1]).trim() || this.ROLES.VIEWER,
          authorized: true,
        };
      }
    }

    // Also allow spreadsheet owner even if not in the sheet
    const owner = ss.getOwner();
    if (owner && owner.getEmail() === email) {
      return { email, role: this.ROLES.ADMIN, authorized: true };
    }

    return { email, role: null, authorized: false };
  },

  /**
   * Check if the current user has at least the given role level.
   * Role hierarchy: admin > accountant > viewer
   */
  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user.authorized) return false;

    const hierarchy = [this.ROLES.VIEWER, this.ROLES.ACCOUNTANT, this.ROLES.ADMIN];
    const userLevel = hierarchy.indexOf(user.role);
    const requiredLevel = hierarchy.indexOf(requiredRole);

    return userLevel >= requiredLevel;
  },

  /**
   * Require authorization — throws if not authorized.
   */
  requireAuth() {
    const user = this.getCurrentUser();
    if (!user.authorized) {
      throw new Error('Unauthorized: ' + (user.email || 'unknown user'));
    }
    return user;
  },

  /**
   * Require a minimum role — throws if insufficient.
   */
  requireRole(role) {
    const user = this.requireAuth();
    if (!this.hasRole(role)) {
      throw new Error('Insufficient permissions. Required: ' + role + ', Have: ' + user.role);
    }
    return user;
  },
};
