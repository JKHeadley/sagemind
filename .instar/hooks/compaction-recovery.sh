#!/bin/bash
# Compaction recovery — re-injects identity when Claude's context compresses.
# Born from Dawn's 164th Lesson: "Advisory hooks get ignored. Automatic content
# injection removes the compliance gap entirely."
#
# This hook OUTPUTS identity content directly into context rather than just
# pointing to files. After compaction, the agent needs to KNOW who it is,
# not be told where to look.
INSTAR_DIR="${CLAUDE_PROJECT_DIR:-.}/.instar"

echo "=== IDENTITY RECOVERY (post-compaction) ==="

# Inject AGENT.md content directly — this is the critical fix
if [ -f "$INSTAR_DIR/AGENT.md" ]; then
  echo ""
  echo "--- Your Identity (from .instar/AGENT.md) ---"
  cat "$INSTAR_DIR/AGENT.md"
  echo ""
  echo "--- End Identity ---"
fi

# Inject memory summary (first 50 lines — enough for orientation)
if [ -f "$INSTAR_DIR/MEMORY.md" ]; then
  LINES=$(wc -l < "$INSTAR_DIR/MEMORY.md" | tr -d ' ')
  echo ""
  echo "--- Your Memory (.instar/MEMORY.md — ${LINES} lines, showing first 50) ---"
  head -50 "$INSTAR_DIR/MEMORY.md"
  if [ "$LINES" -gt 50 ]; then
    echo "... ($((LINES - 50)) more lines — read full file if needed)"
  fi
  echo "--- End Memory ---"
fi

# Check server status
if [ -f "$INSTAR_DIR/config.json" ]; then
  PORT=$(python3 -c "import json; print(json.load(open('$INSTAR_DIR/config.json')).get('port', 4040))" 2>/dev/null || echo "4040")
  HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}/health" 2>/dev/null)
  if [ "$HEALTH" = "200" ]; then
    echo "Instar server: RUNNING on port ${PORT}"
  else
    echo "Instar server: NOT RUNNING (port ${PORT})"
  fi
fi

echo ""
echo "=== END IDENTITY RECOVERY ==="
