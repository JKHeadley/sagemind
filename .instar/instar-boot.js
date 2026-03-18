#!/usr/bin/env node
/**
 * Instar boot wrapper (Node.js) — generated for sagemind
 *
 * This replaces /bin/bash as the launchd entry point on macOS.
 * On macOS Sequoia+, launchd-spawned /bin/bash lacks Full Disk Access,
 * causing "Operation not permitted" when accessing project files.
 * User-installed node (homebrew, nvm) is not subject to TCC restrictions.
 *
 * Shadow install is the sole source of truth. No global fallback.
 */
const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const STATE_DIR = "/Users/justin/Documents/Projects/sagemind/.instar";
const SHADOW = STATE_DIR + "/shadow-install/node_modules/instar/dist/cli.js";
const SHADOW_DIR = STATE_DIR + "/shadow-install";
const CRASH_FILE = STATE_DIR + "/state/boot-crashes.txt";

if (!fs.existsSync(SHADOW)) {
  process.stderr.write('ERROR: Shadow install not found at ' + SHADOW + '\n');
  process.stderr.write('Run: npm install instar --prefix ' + SHADOW_DIR + '\n');
  process.exit(1);
}

if (os.platform() === 'darwin') {
  try { execFileSync('xattr', ['-rd', 'com.apple.quarantine', SHADOW_DIR], { stdio: 'ignore' }); } catch {}
  try { execFileSync('xattr', ['-rd', 'com.apple.provenance', SHADOW_DIR], { stdio: 'ignore' }); } catch {}
}

const crashDir = path.dirname(CRASH_FILE);
fs.mkdirSync(crashDir, { recursive: true });

const args = process.argv.slice(2);
const child = spawn(process.execPath, [SHADOW, ...args], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  const exitCode = code ?? (signal ? 1 : 0);
  if (exitCode !== 0) {
    const now = Math.floor(Date.now() / 1000);
    fs.appendFileSync(CRASH_FILE, now + '\n');
    try {
      const lines = fs.readFileSync(CRASH_FILE, 'utf-8').trim().split('\n');
      const cutoff = now - 120;
      const recent = lines.filter(l => parseInt(l, 10) > cutoff).length;
      if (recent >= 3) {
        const backoff = Math.min(recent * 10, 120);
        process.stderr.write('[instar-boot] Crash loop detected (' + recent + ' crashes in 120s). Backing off ' + backoff + 's...\n');
        execFileSync('sleep', [String(backoff)], { stdio: 'ignore' });
      }
      if (lines.length > 20) {
        fs.writeFileSync(CRASH_FILE, lines.slice(-20).join('\n') + '\n');
      }
    } catch {}
    process.exit(exitCode);
  }
  try { fs.unlinkSync(CRASH_FILE); } catch {}
  process.exit(0);
});

child.on('error', (err) => {
  process.stderr.write('[instar-boot] Failed to spawn CLI: ' + err.message + '\n');
  process.exit(1);
});
