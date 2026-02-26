#!/usr/bin/env node
// Post-action reflection — evolution awareness after significant actions.
// PreToolUse hook for Bash. When the agent is about to commit, deploy, or
// complete a task, injects a brief reminder to capture learnings.
//
// "Every action is an opportunity to learn. Most of that learning is lost
// because nobody paused to ask: what did this teach me?"

let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(data);
    if (input.tool_name !== 'Bash') process.exit(0);

    const command = (input.tool_input || {}).command || '';
    if (!command) process.exit(0);

    // Significant action patterns — moments worth reflecting on
    const significantPatterns = [
      /git\s+commit/i,
      /git\s+push/i,
      /npm\s+publish/i,
      /curl\s+-X\s+POST.*\/deploy/i,
      /instar\s+server\s+restart/i,
    ];

    if (!significantPatterns.some(p => p.test(command))) process.exit(0);

    const reminder = [
      'POST-ACTION REFLECTION — Quick evolution check:',
      '',
      'Before moving on, consider:',
      '- Did this teach you something worth recording? → /learn',
      '- Did you notice a gap in your capabilities? → /gaps',
      '- Did you discover an improvement opportunity? → /evolve',
      '- Did you make a commitment to follow up? → /commit-action',
      '',
      'Skip if nothing notable. The value is in the pause, not the output.',
    ].join('\n');

    process.stdout.write(JSON.stringify({ decision: 'approve', additionalContext: reminder }));
  } catch { /* don't break on errors */ }
  process.exit(0);
});
