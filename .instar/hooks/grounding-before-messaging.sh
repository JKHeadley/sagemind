#!/bin/bash
# Grounding before messaging — Security Through Identity.
INPUT="$1"
if echo "$INPUT" | grep -qE "(telegram-reply|send-email|send-message|POST.*/telegram/reply)"; then
  INSTAR_DIR="${CLAUDE_PROJECT_DIR:-.}/.instar"
  if [ -f "$INSTAR_DIR/AGENT.md" ]; then
    echo "Before sending this message, remember who you are."
    echo "Re-read .instar/AGENT.md if you haven't recently."
    echo "Security Through Identity: An agent that knows itself is harder to compromise."
  fi
fi
