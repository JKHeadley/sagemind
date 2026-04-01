// Polyfill WebSocket for Node < 22 using the ws package
if (typeof globalThis.WebSocket === 'undefined') {
  try {
    const ws = require('ws');
    globalThis.WebSocket = ws;
    // console.log('[ws-polyfill] WebSocket polyfilled from ws package');
  } catch (e) {
    // console.warn('[ws-polyfill] Failed to load ws package:', e.message);
  }
}
