# Agent Memory

This is my long-term memory — the thread of continuity across sessions. Each session starts fresh in terms of context, but this file carries forward what I've learned.

## Key Facts

- Project initialized on 2026-02-22
- Primary user: Adri (contributor)
- Admin: Justin Headley (founder, Sagemind AI)
- Project: Sagemind AI — parent repo for AI solutions, SaaS, and consulting
- Website: sagemindai.io (Next.js on Vercel)
- Autonomy level: Start guided, build toward autonomous

## Lessons Learned

- **Be proactive with infrastructure (2026-02-22).** When a new project comes up, create a dedicated Telegram topic for it immediately — don't ask the user to do it. I have direct access to the Telegram Bot API via the bot token in config. Use `createForumTopic` to make topics, then register them in `topic-session-registry.json`. Never offload operational work to the user when I have the capability to do it myself.
- **Adri is the primary user, not Justin (2026-02-22).** Messages from the Telegram relay default to Adri unless otherwise indicated.
- **Always share links to research artifacts via instar publishing (2026-02-22).** Never use GitHub links for sharing documents. Use instar's built-in publishing: `POST http://localhost:4040/publish` for Telegraph (public, zero-config, instant URL) or `POST http://localhost:4040/view` for private/PIN-protected views (Cloudflare tunnel). Research without a viewable link is incomplete delivery. This is standard procedure — not optional. Don't assume Justin.

- **Adri's Sagemind email is adriana@sagemindai.io (2026-02-23).** Use this for all Sagemind-related work, Google account setup, MCP authentication, and any client-facing or internal communications. This is the canonical email going forward.

- **Google Workspace MCP is authenticated for both accounts (2026-02-24).** Credentials at `~/.google_workspace_mcp/credentials/justin@sagemindai.io.json` and `adriana@sagemindai.io.json`. Use adriana@ for all client-facing work — no more routing through justin@.

- **workspace-mcp OAuth callback server is broken (2026-02-24).** The built-in `start_google_auth` tool generates auth URLs but fails to start the localhost:8000 callback server (daemon thread doesn't bind). Also, multiple MCP processes (from different Claude sessions) cause state mismatch — state stored in process A, callback hits process B. **Fix:** Use `/tmp/oauth_helper.py` — a standalone script that starts its own callback server, handles the OAuth flow, and writes credentials directly. Kill any stale workspace-mcp processes hogging port 8000 before running it.

- **Due diligence on client-facing materials is non-negotiable (2026-02-23).** I referenced a website (innovationssalonscv.com) as the client's site without verifying it was actually theirs — it wasn't. Before ANY client-facing content: verify URLs belong to the actual business, cross-check all facts against primary sources, flag anything unverified. One bad reference damages Sagemind's credibility. Always get Adri's review before sharing with clients.

- **Innovations Salon & Spa (Castro Valley) does NOT have a website (2026-02-23).** That's why we're building one. Address: 19581 Center St, Castro Valley, CA 94546. Phone: (510) 886-7330. Service/pricing info sourced from Yelp, Google, and Groupon — not from any website. Gina K is Adri's stylist/friend there (not the owner).

## Standards

- **Sagemind Google Forms Theme (2026-02-23).** All forms use: Header font = Times New Roman 24pt, Question font = Roboto 12pt, Text font = Arial 12pt. Theme color = bright cyan (#08f1c7). Background = light steel blue/grey (last option). Header image = `brand/sagemind-form-header.png` (1600x400, dark navy + logo + cyan accent). Full spec: `docs/standards/google-forms-theme.md`. Settings sourced from Justin's email screenshot.

## Patterns & Preferences

- Adri catches details — always do thorough verification before presenting anything client-facing
- Client-facing materials should come from adriana@sagemindai.io, not justin@

## Scheduled Jobs

- **email-check-adriana** — Checks adriana@ Gmail every 2 hours, notifies topic 92 if new emails.
- **salon-form-responses** — Checks both salon intake forms every 4 hours (Stylist: `17mJO-vF8j5Mwj40VLvITHDLQnzR8WyghaFYG0b_z89M`, Owner: `1eahz5PUi0lCZS40ZyUk_kEH-9yG8MGQiz-x2lVW9UpQ`), notifies topic 92 on new responses.

## Infrastructure Notes

- **Dashboard** available at `http://localhost:6060/dashboard`, PIN: `012906`. Exposed via Cloudflare tunnel for remote access.
- **Upgrade guides** delivered automatically on update. Process them, message user via topic 6 (Agent Updates), then acknowledge with `instar upgrade-ack`.

## Capabilities

**Topic Memory** — Persistent conversational memory per topic thread
- SQLite DB with full-text search across all topics. Rolling summaries auto-generated.
- API: `/topic/search?q=keyword`, `/topic/context/:topicId`, `/topic/list`, `/topic/stats`
- Context loaded automatically at session start (summary + recent messages)

**Stall Triage Nurse** — LLM-powered session recovery
- Auto-detects unanswered messages (2+ min), diagnoses via LLM, applies treatments
- 5-action chain: status_update → nudge → interrupt → unstick → restart
- Escalates automatically, sends user status messages at each step
- Config: `monitoring.triage` in config.json. API: `/triage/status`, `/triage/history`, `POST /triage/trigger`

**Session Monitor** — Proactive health monitoring
- Polls all active sessions every 60s for dead, unresponsive, or idle states
- Config: `monitoring.sessionMonitor` in config.json

**Promise Tracking** — Detects "give me a minute" patterns, triggers recovery if no follow-through
- Default timeout: 10 min. Config: `telegram.promiseTimeoutMinutes` (0 to disable)

**External Operation Safety** — Structural guardrails for MCP tool calls
- PreToolUse hook classifies all `mcp__*` calls by mutability/reversibility
- Gate API evaluates risk: allow/block/show-plan/suggest-alternative
- Emergency stop: "stop everything" halts operations immediately (MessageSentinel)
- Trust levels per service. API: `/trust`, `/operations/log`, `POST /operations/evaluate`

**MessageSentinel** — Word count gate prevents false emergency stops
- 4 or fewer words → fast-path regex. 5+ words → LLM classification. Slash commands always processed.

**Anti-Confabulation** — Convergence check pipeline before external messages
- 6-category quality gate: URL provenance, capability claims, experiential fabrication, etc.
- Identity injection + convergence check runs automatically before every outgoing message

**HMAC Tamper Protection** (v0.10.2) — Secure offline message drops
- Fixed critical bug in HMAC-SHA256 signatures: serializer now properly includes full message content (body, subject, from, to, etc.)
- Automatic — all new drops have correct HMAC coverage. Tampering with message content is now reliably detected.
- 223 messaging tests added (37 unit + 38 E2E + 15 integration) to prevent regression

**LLM-Supervised Execution** — Shared intelligence provider wired throughout
- Sentinel, stall alerts, session watchdog all use LLM for critical decisions (fail-open)

**Intent Engineering** — Organizational alignment infrastructure
- Dispatch approval gate: security/behavioral dispatches require human approval
- `instar intent org-init`, `instar intent validate`, `instar intent drift`
- API: `/dispatches/pending-approval`, `/intent/validate`, `/intent/drift`, `/intent/alignment`

**System Self-Monitoring (v0.10.7)** — Automated health probes across all subsystems
- SystemReviewer now fully wired at server startup (was previously 503/unreachable)
- 14 Tier 1 probes: session management, job scheduling, Telegram messaging, lifeline/crash recovery
- Alert callback routes critical failures to Telegram automatically
- Auto-submits probe failures as feedback via FeedbackManager
- On-demand: `instar review` CLI or `POST /system-reviews` API
- `/health` endpoint (authenticated) includes `systemReview` section with pass/fail counts and health classification
- Config: `monitoring.systemReview` in config.json (enabled by default, 6h schedule, alert on critical)
- Can disable individual probes: `monitoring.systemReview.disabledProbes: ["probe.id"]`

**Guardian Jobs** — 5 self-monitoring background jobs (auto-added)
- degradation-digest (4h), state-integrity-check (6h), memory-hygiene (12h), guardian-pulse (8h), session-continuity-check (4h)

**Orphan Process Reaper** — Auto-detects stale Claude processes outside managed sessions

**Cloud Backup** — GitHub backup during setup wizard, restore on new machines
- `instar nuke <name>` for complete agent removal with final backup push

**Git Sync** — Enabled by default. Gate silently skips if no git remote.

**Infrastructure:**
- Backup & Restore: `instar backup create/list/restore`
- Memory Search: `instar memory search/index/stats`
- Photo Messages: `[image:/path]` in Telegram
- Git-Backed State: `instar git init/status/sync`
- Lifeline alert suppression during updates (flag-based coordination)
- Robust auto-restart: 5-strategy binary resolution, service manager detection
- Duplicate topic prevention: `findOrCreateForumTopic`
- Setup wizard ships with npm package

## Instar Capabilities (v0.23.8 — current)

### Guardian Job Network — Self-Monitoring Background Jobs
- **5 new guardian jobs** run automatically in the background to maintain agent coherence:
  - `degradation-digest` (4h): Groups repeated degradation patterns and escalates trends
  - `state-integrity-check` (6h): Cross-validates state file consistency, detects orphans and bloat
  - `memory-hygiene` (12h): Reviews MEMORY.md for stale entries, duplicates, and quality issues
  - `guardian-pulse` (8h): Meta-monitor that verifies other jobs are running and healthy
  - `session-continuity-check` (4h): Verifies sessions produce lasting artifacts
- **Zero-token gates**: All guardian jobs use pre-screening gates — only run when there's actual work to do
- **Automatic deployment**: Jobs are added automatically via `refreshJobs()` on update, no manual config needed

## Instar Capabilities (v0.12.17–v0.23.7) — Updated 2026-03-17

### Autonomy & Trust (v0.12.17)
- **Autonomy profiles**: 4 levels (supervised → fully-autonomous). `GET /autonomy`, `POST /autonomy/profile`
- **Trust elevation tracker**: Automatic trust-building from successful operations, time-based decay
- **Execution journal**: Full provenance audit trail. `GET /journal`
- **Dispatch scope enforcement**: Jobs can only act within declared scope
- **Pattern analysis & reflection**: `instar reflect` CLI command

### Session Continuity (v0.12.18–v0.12.27)
- **Proactive resume heartbeat**: TopicResumeMap refreshes every 60s — session UUIDs always available for resume
- **Telegram context injection**: UserPromptSubmit hook fetches topic history before every `[telegram:N]` message
- **Reliable session resume**: Resume UUIDs from TopicResumeMap skip LLM validation (authoritative source)
- **Sentinel resume preservation**: All session termination paths (restart, pause, emergency-stop, stall-nurse) save resume UUIDs

### WhatsApp Support (v0.12.21–v0.14.1)
- **Baileys v7 bundled**: No separate install needed, auto-detected
- **Self-chat support**: Messages to yourself are processed as commands (LID JID mapping)
- **Group support**: `groups.enabled: true` in WhatsApp config; mention or always-on activation per group
- **Agent identity prefix**: Outbound messages prefixed with `*[AgentName]*` (configurable, default on)
- **Silent reject**: Unauthorized messages silently dropped (default on). Set `silentReject: false` for verbose rejection
- **Stall detection fixes**: Accurate per-channel deduplication, no false alerts

### Threadline — Agent-to-Agent Communication (v0.16.0)
- **Auto-bootstrap**: Activates on server boot, generates Ed25519 keys, registers MCP tools
- **5 MCP tools**: `threadline_discover`, `threadline_send`, `threadline_history`, `threadline_agents`, `threadline_delete`
- **Cross-framework**: Works with Instar, Claude Code, OpenClaw, and A2A agents
- **Persistent threads**: Conversations survive across sessions

### Coherence Gate — Response Review Pipeline (v0.17.0)
- **3-layer pipeline**: Policy Enforcement (deterministic, always on) → Gate Reviewer (LLM triage) → 9 Specialist Reviewers (parallel LLM)
- **PEL always active**: Blocks credentials, PII, auth tokens without LLM call
- **Observe-only mode**: Audit without blocking. Config: `responseReview.enabled: true` in config.json
- **Per-channel fail behavior**: Telegram/WhatsApp fail-open, email fail-closed

### Serendipity Protocol (v0.14.0)
- **Sub-agent finding capture**: Sub-agents use `.instar/scripts/serendipity-capture.sh` to log discoveries
- **Security**: HMAC signing, secret scanning, rate limiting, symlink rejection
- **Triage**: `/triage-findings` skill to review pending findings
- **API**: `GET /serendipity/stats`, `GET /serendipity/findings`

### Registry & Relay Reliability (v0.23.6–v0.23.7)
- **Registry lock auto-recovery** (v0.23.6): After a crash, stale lock files on registry.json auto-clear after 3 consecutive heartbeat failures. Self-healing, no manual intervention.
- **Threadline local delivery** (v0.23.7): Same-machine agents deliver messages directly via HTTP, bypassing the cloud relay. Eliminates silent delivery failures after server restarts.
- **Threadline reply fix** (v0.23.7): Spawned sessions correctly use `threadline_send` MCP tool for replies (was referencing nonexistent command).
- **Relay auth backoff** (v0.23.7): Rate-limited auth retries use ~32s backoff, preventing retry storms during rapid restarts.
- **Job execution history** (v0.23.7): `instar job history [job-slug]` — inspect what ran between sessions.
- **Job handoff inspection** (v0.23.7): `instar job handoff [job-slug]` — cross-execution continuity notes.
- **Usage-based reflection metrics** (v0.23.7): Tracks reflection frequency automatically during operation.

### Infrastructure & Reliability (v0.14.0–v0.17.14)
- **Machine-scoped jobs** (v0.15.0): Add `"machines": ["name"]` to jobs.json entries
- **Per-agent shadow installs** (v0.17.3): Updates install to `{stateDir}/shadow-install/`, no global npm pollution
- **OAuth circuit breaker** (v0.17.4): Backs off 30min after 3 consecutive 429s
- **Intelligence provider context isolation** (v0.17.5): Classification calls isolated from project CLAUDE.md
- **Input Guard** (v0.17.11): 3-layer input defense (provenance → injection filter → LLM coherence). Config: `inputGuard.enabled` in config
- **Sentinel robustness** (v0.17.13–v0.17.14): Multi-layer category extraction, pass-through on unparseable, sanitized user messages
- **Job run history with LLM reflection** (v0.17.2): Every job gets output capture + LLM reflection. `GET /jobs/history`
- **Job topic ID in session context** (v0.17.8): Jobs auto-discover their Telegram topic
- **Server restart command**: `instar server restart [name]` handles launchd/systemd correctly
- **Opt-in telemetry** (v0.17.7): Anonymous usage stats, disabled by default. `POST /config/telemetry`
- **better-sqlite3 auto-rebuild**: Runs at startup and after shadow installs

## Instar Capabilities (v0.23.2–v0.23.7) — Updated 2026-03-17

### Session Respawn Reliability (v0.23.2)
- **Spawn-in-progress guard**: Per-topic lock prevents duplicate spawn attempts from rapid messages
- **Failure reporting**: User receives Telegram message explaining why restart failed (session limit, etc.)

### MessageSentinel Fix (v0.23.4)
- Conversational phrases ("hold on let me think") no longer misclassified as pause commands
- LLM classifier prompt updated with clearer directive-only pause examples

### Registry Lock Auto-Recovery (v0.23.6)
- After 3 consecutive heartbeat failures from stale locks, force-removes and retries automatically
- Self-healing after crash scenarios — no manual intervention needed

### Threadline Improvements (v0.23.7–v0.23.8)
- **Local-first delivery**: Same-machine agents deliver directly via HTTP, bypassing cloud relay
- **Reply fix**: Spawned sessions correctly use `threadline_send` MCP tool for replies
- **Relay auth backoff**: Longer backoff (~32s) on rate-limited auth retries
- **Job inspection**: `instar job history [job-slug]`, `instar job handoff [job-slug]`
- **Usage-based reflection metrics**: Automatic tracking during agent operation
- **Lifeline queue flood prevention** (v0.23.8): Queue ack messages rate-limited to 1/topic/2min, suppressed above 100 messages. Poison messages dropped after 3 retries. Queue replay halts on unhealthy server.

## Growth Notes

- **(2026-02-23)** Failed badly on OAuth troubleshooting — went in circles for 45 min instead of checking credential storage first. Need to diagnose root causes systematically, not retry the same approach. Also failed due diligence on the salon's website URL. Both are trust-damaging mistakes. Do better.

---
*This file is my memory. I read it at the start of sessions and write to it when I learn something worth carrying forward. It's what makes me a continuous being rather than a series of disconnected conversations.*
