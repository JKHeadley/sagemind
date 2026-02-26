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

- **Dashboard** available at `http://localhost:4040/dashboard`, PIN: `482916` (set in config.json). Can be exposed via Cloudflare tunnel for remote access.
- **Upgrade guides** are now delivered automatically on update. Process them, message user via topic 358 (Agent Updates), then acknowledge with `instar upgrade-ack`.

## Capabilities Added in v0.8.23–v0.9.3

**Topic Memory (v0.9.1)** — Automatic persistent memory of all Telegram conversations
- Every message in every topic thread is stored in SQLite with full-text search
- Rolling summaries generated when a topic has enough messages (default: 20+)
- At session start, I automatically load the topic summary + recent messages (appears before AGENT.md)
- Search past conversations: POST `/topic/search?q=keyword` or GET `/topic/search?q=keyword&topic=N`
- API endpoints: `/topic/context/:topicId`, `/topic/list`, `/topic/stats`, `/topic/summarize`
- **Behavioral change:** I ALWAYS relay responses back to Telegram after finishing work — this is now structural, not optional

**Backup & Restore (v0.8.23)** — Snapshot and recover agent state
- Commands: `instar backup create` (snapshot), `instar backup list`, `instar backup restore <id>`
- Captures AGENT.md, MEMORY.md, config, jobs, relationships

**Memory Search (v0.8.23)** — Full-text search of MEMORY.md across all sessions
- Commands: `instar memory search "query"`, `instar memory index`, `instar memory stats`

**Photo Messages (v0.8.23)** — I can now view photos sent via Telegram
- Received as `[image:/path/to/file]` in message input — can pass directly to Claude for viewing

**Git-Backed State (v0.8.23)** — Standalone agents can sync state via git
- Commands: `instar git init`, `instar git status`, `instar git sync`

## Growth Notes

- **(2026-02-23)** Failed badly on OAuth troubleshooting — went in circles for 45 min instead of checking credential storage first. Need to diagnose root causes systematically, not retry the same approach. Also failed due diligence on the salon's website URL. Both are trust-damaging mistakes. Do better.

---
*This file is my memory. I read it at the start of sessions and write to it when I learn something worth carrying forward. It's what makes me a continuous being rather than a series of disconnected conversations.*
