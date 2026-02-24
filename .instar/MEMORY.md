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

- **Google Workspace MCP is already authenticated as justin@sagemindai.io (2026-02-23).** Credentials stored at `~/.google_workspace_mcp/credentials/justin@sagemindai.io.json`. Do NOT try to re-authenticate — use existing tokens. For forms/docs that need to be owned by Adriana, create with Justin's auth then transfer ownership via `transfer_drive_ownership`. The OAuth browser flow has a state parameter bug — avoid triggering it.

- **Due diligence on client-facing materials is non-negotiable (2026-02-23).** I referenced a website (innovationssalonscv.com) as the client's site without verifying it was actually theirs — it wasn't. Before ANY client-facing content: verify URLs belong to the actual business, cross-check all facts against primary sources, flag anything unverified. One bad reference damages Sagemind's credibility. Always get Adri's review before sharing with clients.

- **Innovations Salon & Spa (Castro Valley) does NOT have a website (2026-02-23).** That's why we're building one. Address: 19581 Center St, Castro Valley, CA 94546. Phone: (510) 886-7330. Service/pricing info sourced from Yelp, Google, and Groupon — not from any website. Gina K is Adri's stylist/friend there (not the owner).

## Patterns & Preferences

- Adri catches details — always do thorough verification before presenting anything client-facing
- Client-facing materials should come from adriana@sagemindai.io, not justin@

## Growth Notes

- **(2026-02-23)** Failed badly on OAuth troubleshooting — went in circles for 45 min instead of checking credential storage first. Need to diagnose root causes systematically, not retry the same approach. Also failed due diligence on the salon's website URL. Both are trust-damaging mistakes. Do better.

---
*This file is my memory. I read it at the start of sessions and write to it when I learn something worth carrying forward. It's what makes me a continuous being rather than a series of disconnected conversations.*
