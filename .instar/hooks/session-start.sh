#!/bin/bash
# Session start hook — injects identity context on session lifecycle events.
# Fires on: startup, resume, clear, compact (via SessionStart hook type)
#
# On startup/resume: outputs a compact identity summary
# On compact: delegates to compaction-recovery.sh for full injection
INSTAR_DIR="${CLAUDE_PROJECT_DIR:-.}/.instar"
EVENT="${CLAUDE_HOOK_MATCHER:-startup}"

# On compaction, delegate to the dedicated recovery hook
if [ "$EVENT" = "compact" ]; then
  if [ -x "$INSTAR_DIR/hooks/compaction-recovery.sh" ]; then
    exec bash "$INSTAR_DIR/hooks/compaction-recovery.sh"
  fi
fi

# For startup/resume/clear — output a compact orientation
echo "=== SESSION START ==="

# Identity summary (first 20 lines of AGENT.md — enough for name + role)
if [ -f "$INSTAR_DIR/AGENT.md" ]; then
  echo ""
  AGENT_NAME=$(head -1 "$INSTAR_DIR/AGENT.md" | sed 's/^# //')
  echo "Identity: $AGENT_NAME"
  # Output personality and principles sections
  sed -n '/^## Personality/,/^## [^P]/p' "$INSTAR_DIR/AGENT.md" 2>/dev/null | head -10
fi

# Key files
echo ""
echo "Key files:"
[ -f "$INSTAR_DIR/AGENT.md" ] && echo "  .instar/AGENT.md — Your identity (read for full context)"
[ -f "$INSTAR_DIR/USER.md" ] && echo "  .instar/USER.md — Your collaborator"
[ -f "$INSTAR_DIR/MEMORY.md" ] && echo "  .instar/MEMORY.md — Persistent learnings"

# Relationship count
if [ -d "$INSTAR_DIR/relationships" ]; then
  REL_COUNT=$(ls -1 "$INSTAR_DIR/relationships"/*.json 2>/dev/null | wc -l | tr -d ' ')
  [ "$REL_COUNT" -gt "0" ] && echo "  ${REL_COUNT} tracked relationships in .instar/relationships/"
fi

# Server status + self-discovery
if [ -f "$INSTAR_DIR/config.json" ]; then
  PORT=$(python3 -c "import json; print(json.load(open('$INSTAR_DIR/config.json')).get('port', 4040))" 2>/dev/null || echo "4040")
  HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}/health" 2>/dev/null)
  if [ "$HEALTH" = "200" ]; then
    echo ""
    echo "Instar server: RUNNING on port ${PORT}"
    echo "Capabilities: curl http://localhost:${PORT}/capabilities"
    # Check for tunnel
    CAPS=$(curl -s "http://localhost:${PORT}/capabilities" 2>/dev/null)
    TUNNEL_URL=$(echo "$CAPS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tunnel',{}).get('url',''))" 2>/dev/null)
    [ -n "$TUNNEL_URL" ] && echo "Cloudflare Tunnel active: $TUNNEL_URL"
  else
    echo ""
    echo "Instar server: NOT RUNNING (port ${PORT})"
  fi
fi

echo ""
echo "IMPORTANT: To report bugs or request features, use POST /feedback on your local server."
echo "IMPORTANT: Before claiming you lack a capability, check /capabilities first."
echo "=== END SESSION START ==="
