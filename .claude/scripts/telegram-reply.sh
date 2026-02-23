#!/bin/bash
# telegram-reply.sh — Send a message back to a Telegram topic via instar server.
#
# Usage:
#   .claude/scripts/telegram-reply.sh TOPIC_ID "message text"
#   echo "message text" | .claude/scripts/telegram-reply.sh TOPIC_ID
#   cat <<'EOF' | .claude/scripts/telegram-reply.sh TOPIC_ID
#   Multi-line message here
#   EOF

TOPIC_ID=$1
shift

if [ -z "$TOPIC_ID" ]; then
  echo "Usage: telegram-reply.sh TOPIC_ID [message]" >&2
  exit 1
fi

PORT=4040

# Get message from args or stdin
if [ $# -gt 0 ]; then
  MESSAGE="$*"
else
  MESSAGE=$(cat)
fi

if [ -z "$MESSAGE" ]; then
  echo "No message provided" >&2
  exit 1
fi

# Send via instar server API
curl -s -X POST "http://localhost:${PORT}/telegram/reply/${TOPIC_ID}" \
  -H 'Content-Type: application/json' \
  -d "$(jq -n --arg text "$MESSAGE" '{text: $text}')" > /dev/null 2>&1

echo "Sent $(echo "$MESSAGE" | wc -c | tr -d ' ') chars to topic $TOPIC_ID"
