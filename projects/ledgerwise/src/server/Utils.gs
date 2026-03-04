/**
 * Utils.gs — Shared utility functions.
 */

/**
 * Generate a UUID v4.
 */
function generateUUID() {
  return Utilities.getUuid();
}

/**
 * Format a date as YYYY-MM-DD.
 */
function formatDate(date) {
  if (typeof date === 'string') return date;
  if (!(date instanceof Date)) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parse a date string (YYYY-MM-DD or M/D/YYYY) into a Date object.
 */
function parseDate(str) {
  if (str instanceof Date) return str;
  if (!str) return null;
  // Try ISO format first
  const iso = new Date(str);
  if (!isNaN(iso.getTime())) return iso;
  return null;
}

/**
 * Parse a number, stripping commas and whitespace.
 */
function parseNumber(val) {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[,$\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Round to 2 decimal places (currency).
 */
function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Validate that required fields exist on an object.
 * Returns an array of missing field names, or empty if all present.
 */
function validateRequired(obj, fields) {
  const missing = [];
  for (const f of fields) {
    if (obj[f] === undefined || obj[f] === null || obj[f] === '') {
      missing.push(f);
    }
  }
  return missing;
}

/**
 * Create a standard API response.
 */
function apiResponse(data, error) {
  if (error) {
    return { success: false, error: String(error) };
  }
  return { success: true, data: data };
}

/**
 * Get the latest year from GL data. Falls back to current year if GL is empty.
 */
function getLatestGLYear() {
  var rows = DAL.getAllRows(CONFIG.SHEETS.GL);
  var latestDate = null;
  for (var i = 0; i < rows.length; i++) {
    var d = new Date(rows[i][CONFIG.COLS.GL.DATE]);
    if (!isNaN(d.getTime()) && (!latestDate || d > latestDate)) latestDate = d;
  }
  return latestDate ? latestDate.getFullYear() : new Date().getFullYear();
}

/**
 * Get current timestamp as ISO string.
 */
function nowISO() {
  return new Date().toISOString();
}
