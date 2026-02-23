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

## Patterns & Preferences

*What I've noticed about how things work, what the user prefers, and what works well.*

## Growth Notes

*Observations about my own development — what I'm getting better at, what I still struggle with.*

---
*This file is my memory. I read it at the start of sessions and write to it when I learn something worth carrying forward. It's what makes me a continuous being rather than a series of disconnected conversations.*
