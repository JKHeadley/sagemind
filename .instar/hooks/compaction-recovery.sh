#!/bin/bash
# Compaction recovery — re-injects identity AND topic context when Claude's context compresses.
# Born from Dawn's 164th Lesson: "Advisory hooks get ignored. Automatic content
# injection removes the compliance gap entirely."
#
# This hook OUTPUTS identity content directly into context rather than just
# pointing to files. After compaction, the agent needs to KNOW who it is
# AND what conversation it's in — not be told where to look.
#
# Context priority (same as session-start):
#   1. Topic context (summary + recent messages) — what are we working on?
#   2. Identity (AGENT.md) — who am I?
#   3. Memory (MEMORY.md) — what have I learned?
#   4. Telegram relay — how do I respond?
#   5. Capabilities — what can I do?
INSTAR_DIR="${CLAUDE_PROJECT_DIR:-.}/.instar"

echo "=== IDENTITY RECOVERY (post-compaction) ==="

# ── 1. TOPIC CONTEXT (highest priority — what are we working on?) ──
# After compaction, the conversation history is lost. Re-inject it from TopicMemory.
if [ -n "$INSTAR_TELEGRAM_TOPIC" ]; then
  TOPIC_ID="$INSTAR_TELEGRAM_TOPIC"
  CONFIG_FILE="$INSTAR_DIR/config.json"
  if [ -f "$CONFIG_FILE" ]; then
    PORT=$(grep -o '"port":[0-9]*' "$CONFIG_FILE" | head -1 | cut -d':' -f2)
    if [ -n "$PORT" ]; then
      TOPIC_CTX=$(curl -s "http://localhost:${PORT}/topic/context/${TOPIC_ID}?recent=20" 2>/dev/null)
      if [ -n "$TOPIC_CTX" ] && echo "$TOPIC_CTX" | grep -q '"totalMessages"'; then
        TOTAL=$(echo "$TOPIC_CTX" | grep -o '"totalMessages":[0-9]*' | cut -d':' -f2)
        TOPIC_NAME=$(echo "$TOPIC_CTX" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('topicName') or 'Unknown')" 2>/dev/null || echo "Unknown")

        echo ""
        echo "--- CONVERSATION CONTEXT (Topic: ${TOPIC_NAME}, ${TOTAL} total messages) ---"
        echo ""

        SUMMARY=$(echo "$TOPIC_CTX" | python3 -c "import sys,json; d=json.load(sys.stdin); s=d.get('summary'); print(s if s else '')" 2>/dev/null)
        if [ -n "$SUMMARY" ]; then
          echo "SUMMARY OF CONVERSATION SO FAR:"
          echo "$SUMMARY"
          echo ""
        fi

        echo "RECENT MESSAGES:"
        echo "$TOPIC_CTX" | python3 -c "
import sys, json
d = json.load(sys.stdin)
for m in d.get('recentMessages', []):
    sender = 'User' if m.get('fromUser') else 'Agent'
    ts = m.get('timestamp', '')[:16].replace('T', ' ')
    text = m.get('text', '')
    if len(text) > 500:
        text = text[:500] + '...'
    print(f'[{ts}] {sender}: {text}')
" 2>/dev/null
        echo ""
        echo "Search past conversations: curl http://localhost:${PORT}/topic/search?topic=${TOPIC_ID}&q=QUERY"
        echo "--- END CONVERSATION CONTEXT ---"
        echo ""
      fi
    fi
  fi
fi

# ── 2. IDENTITY (full AGENT.md — who am I?) ──
if [ -f "$INSTAR_DIR/AGENT.md" ]; then
  echo ""
  echo "--- Your Identity (from .instar/AGENT.md) ---"
  cat "$INSTAR_DIR/AGENT.md"
  echo ""
  echo "--- End Identity ---"
fi

# ── 2b. PROJECT CONTEXT (where am I working?) ──
if [ -f "$INSTAR_DIR/project-map.json" ]; then
  echo ""
  echo "--- PROJECT CONTEXT ---"
  python3 -c "
import json, sys
try:
    m = json.load(open('$INSTAR_DIR/project-map.json'))
    print(f'Project: {m["projectName"]} ({m["projectType"]})')
    print(f'Path: {m["projectDir"]}')
    r = m.get('gitRemote')
    b = m.get('gitBranch')
    if r: print(f'Git: {r}' + (f' [{b}]' if b else ''))
    t = m.get('deploymentTargets', [])
    if t: print(f'Deploy targets: {(", ").join(t)}')
    print(f'Files: {m["totalFiles"]} across {len(m.get("directories", []))} directories')
except Exception as e:
    print(f'(project map load failed: {e})', file=sys.stderr)
" 2>/dev/null
  echo "--- END PROJECT CONTEXT ---"
fi

# ── 3. MEMORY (first 50 lines — what have I learned?) ──
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

# ── 4. TELEGRAM RELAY (how do I respond?) ──
if [ -n "$INSTAR_TELEGRAM_TOPIC" ]; then
  TOPIC_ID="$INSTAR_TELEGRAM_TOPIC"
  RELAY_SCRIPT=""
  if [ -f "$INSTAR_DIR/scripts/telegram-reply.sh" ]; then
    RELAY_SCRIPT=".instar/scripts/telegram-reply.sh"
  elif [ -f "${CLAUDE_PROJECT_DIR:-.}/.claude/scripts/telegram-reply.sh" ]; then
    RELAY_SCRIPT=".claude/scripts/telegram-reply.sh"
  fi

  echo ""
  echo "--- TELEGRAM SESSION (topic ${TOPIC_ID}) ---"
  echo "This session is connected to Telegram topic ${TOPIC_ID}."
  echo "Messages arrive prefixed with [telegram:${TOPIC_ID}]. Strip prefix before interpreting."
  echo "After EVERY response, relay your text back:"
  if [ -n "$RELAY_SCRIPT" ]; then
    echo "  cat <<'EOF' | ${RELAY_SCRIPT} ${TOPIC_ID}"
  else
    echo "  cat <<'EOF' | .instar/scripts/telegram-reply.sh ${TOPIC_ID}"
  fi
  echo "  Your response text here"
  echo "  EOF"
  echo "--- END TELEGRAM SESSION ---"
fi

# ── 5. SERVER STATUS + CAPABILITIES ──
CONFIG_FILE="$INSTAR_DIR/config.json"
if [ -f "$CONFIG_FILE" ]; then
  PORT=$(python3 -c "import json; print(json.load(open('$CONFIG_FILE')).get('port', 4040))" 2>/dev/null || echo "4040")
  HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}/health" 2>/dev/null)
  if [ "$HEALTH" = "200" ]; then
    echo ""
    echo "Instar server: RUNNING on port ${PORT}"
    CAPS=$(curl -s "http://localhost:${PORT}/capabilities" 2>/dev/null)
    if echo "$CAPS" | grep -q '"featureGuide"' 2>/dev/null; then
      echo ""
      echo "--- YOUR CAPABILITIES ---"
      echo "$CAPS" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    guide = d.get('featureGuide', {})
    for t in guide.get('triggers', []):
        print(f'  When: {t["context"]}')
        print(f'  Do:   {t["action"]}')
        print()
except: pass
" 2>/dev/null
      echo "--- END CAPABILITIES ---"
    fi
  else
    echo ""
    echo "Instar server: NOT RUNNING (port ${PORT})"
  fi
fi

echo ""
echo "=== END IDENTITY RECOVERY ==="
