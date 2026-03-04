/**
 * Cache.gs — CacheService wrapper for performance.
 *
 * Caches computed results (aggregations, totals), not raw sheet data.
 * Write operations should call invalidate() for affected keys.
 */

const AppCache = {
  _cache: null,

  _getCache() {
    if (!this._cache) {
      this._cache = CacheService.getUserCache();
    }
    return this._cache;
  },

  /**
   * Get a cached value. Returns parsed JSON or null.
   */
  get(key) {
    const raw = this._getCache().get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  /**
   * Set a cached value. Serializes to JSON.
   * @param {string} key
   * @param {*} value
   * @param {number} [ttl] - TTL in seconds, defaults to CONFIG.CACHE_TTL
   */
  set(key, value, ttl) {
    const seconds = ttl || CONFIG.CACHE_TTL;
    const json = JSON.stringify(value);
    // CacheService limit is 100KB per item
    if (json.length > 100000) {
      Logger.log('Cache: value too large for key ' + key + ' (' + json.length + ' bytes)');
      return;
    }
    this._getCache().put(key, json, seconds);
  },

  /**
   * Remove a cached value.
   */
  invalidate(key) {
    this._getCache().remove(key);
  },

  /**
   * Remove multiple cached values by prefix.
   */
  invalidatePrefix(prefix) {
    // CacheService doesn't support prefix deletion, so we track known keys
    // For now, invalidate specific known keys
    const knownKeys = [
      'dashboard', 'pl_', 'bs_', 'tb_', 'coa_all', 'projects_all',
    ];
    const toRemove = knownKeys.filter(k => k.startsWith(prefix));
    if (toRemove.length > 0) {
      this._getCache().removeAll(toRemove);
    }
  },

  /**
   * Invalidate all report caches (call after any GL write).
   */
  invalidateReports() {
    this._getCache().removeAll(['dashboard', 'coa_all', 'projects_all']);
    // P&L, BS, TB caches are keyed by date range — we can't enumerate them,
    // but they expire after CACHE_TTL anyway
  },
};
