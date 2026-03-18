#!/bin/bash
# telegram-reply.sh — Send a message back to a Telegram topic via instar server.
#
# Usage:
#   ./telegram-reply.sh TOPIC_ID "message text"
#   echo "message text" | ./telegram-reply.sh TOPIC_ID
#   cat <<'EOF' | ./telegram-reply.sh TOPIC_ID
#   Multi-line message here
#   EOF
#
# Reads INSTAR_PORT from environment (default: 4040).

TOPIC_ID="$1"
shift

if [ -z "$TOPIC_ID" ]; then
  echo "Usage: telegram-reply.sh TOPIC_ID [message]" >&2
  exit 1
fi

# Read message from args or stdin
if [ $# -gt 0 ]; then
  MSG="$*"
else
  MSG="$(cat)"
fi

if [ -z "$MSG" ]; then
  echo "No message provided" >&2
  exit 1
fi

PORT="${INSTAR_PORT:-6060}"

# Read auth token from config (if present)
AUTH_TOKEN=""
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
CONFIG_FILE="${PROJECT_DIR}/.instar/config.json"
if [ -f "$CONFIG_FILE" ]; then
  AUTH_TOKEN=$(python3 -c "import json; print(json.load(open('$CONFIG_FILE')).get('authToken',''))" 2>/dev/null)
fi

# Escape for JSON
JSON_MSG=$(printf '%s' "$MSG" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))' 2>/dev/null)
if [ -z "$JSON_MSG" ]; then
  # Fallback if python3 not available: basic escape
  JSON_MSG="\"$(printf '%s' "$MSG" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g')\""
fi

if [ -n "$AUTH_TOKEN" ]; then
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "http://localhost:${PORT}/telegram/reply/${TOPIC_ID}" \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -d "{\"text\":${JSON_MSG}}")
else
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "http://localhost:${PORT}/telegram/reply/${TOPIC_ID}" \
    -H 'Content-Type: application/json' \
    -d "{\"text\":${JSON_MSG}}")
fi

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo "Sent $(echo "$MSG" | wc -c | tr -d ' ') chars to topic $TOPIC_ID"
else
  echo "Failed (HTTP $HTTP_CODE): $BODY" >&2
  exit 1
fi
