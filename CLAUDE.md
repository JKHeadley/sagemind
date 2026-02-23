# Sagemind AI - Claude Code Context

## Operational Standards (MANDATORY)

These standards apply to ALL work performed in this repository. They override default behavior.

### Due Diligence Standard

**Full standard:** `docs/standards/due-diligence.md`

Before presenting any recommendation, technical claim, or action plan to a client:

1. **Verify independently.** Never relay AI-generated research to a client without checking primary sources. If you can't link to an official doc you actually accessed, the claim is unverified — label it as such.
2. **Categorize every claim** as Verified, Strongly Supported, Unverified, or Contradicted. Do not mix categories without labeling them.
3. **Assess "quick wins" honestly.** Before recommending anything as low-effort, verify the actual setup steps, prerequisites, costs, and whether it addresses the client's stated need. Do not present the client's own known fallback as a new discovery.
4. **Flag gaps, don't fill them with confidence.** It is always better to say "I need to verify this" than to present an unverified claim as fact.
5. **Verify capabilities, not just existence.** For any claim that an API/feature "can" or "cannot" do something, verify at the parameter/config level. Read the actual parameter list, Postman collection, or API reference — do not rely on a research summary's characterization.
6. **Treat AI consensus as a single source.** Multiple AI tools agreeing is NOT independent confirmation. They have correlated errors. Pay special attention to "cannot" claims — AI tools are more likely to incorrectly say something is impossible than to fabricate something that exists.
7. **Cross-check AI research sources.** Click cited URLs. Check dates. Watch for circular sourcing. Test when possible.

When performing research (deep research prompts, web searches, API exploration):
- Use multiple independent sources
- Verify cited URLs actually exist and say what was claimed
- Distinguish between "announced" and "available/working"
- For API capability claims, check the actual parameter lists (Postman collections, OpenAPI specs, official reference pages)
- Document verification status for each finding

## Overview

Sagemind AI LLC is a Bay Area-based company focused on AI solutions, SaaS development, and software consulting. This is the parent repository that organizes all projects and organizational content.

- **Domain**: sagemindai.io
- **Founder**: Justin Headley
- **GitHub**: github.com/JKHeadley

## Repository Structure

```
sagemind/
├── brand/              # Brand assets, logos, style guides
├── docs/               # Shared organizational documentation
│   └── standards/      # Operational standards (due diligence, etc.)
├── planning/           # Strategic planning, roadmaps
├── project_sandbox/    # Active client project research & docs
├── scripts/            # Utility scripts (DNS setup, etc.)
└── projects/           # Git submodules for deployable projects
    └── website/        # Main company website (Next.js)
```

## Projects

### Website (`projects/website`)

The company website at sagemindai.io.

- **Tech Stack**: Next.js 16.1.6, React 19.2.3, Tailwind CSS v4, TypeScript
- **Repository**: github.com/JKHeadley/sagemind-website
- **Deployment**: Vercel (sagemind team)
- **Production URL**: https://sagemindai.io
- **Vercel Project**: sagemind-website

#### Deployment

The website is deployed via Vercel CLI from within `projects/website/site/`:

```bash
cd projects/website/site
vercel deploy --yes --prod
```

#### Environment Variables (Vercel)

All environment variables are configured for production:

| Variable | Description | Current Value |
|----------|-------------|---------------|
| `GMAIL_USER` | Gmail address for sending emails | justin@sagemindai.io |
| `GMAIL_APP_PASSWORD` | Gmail App Password | (set) |
| `CONTACT_EMAIL` | Email to receive contact submissions | justin@sagemindai.io |
| `GOOGLE_CALENDAR_ID` | Primary calendar for booking events | justin@sagemindai.io |
| `GOOGLE_CALENDAR_IDS` | All calendars to check for conflicts | justin@sagemindai.io, headley.justin@gmail.com, justin.headley@monroeinstitute.org |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Google service account JSON | (set) |
| `TIMEZONE` | IANA timezone | America/Los_Angeles |

Manage via CLI:
```bash
# List env vars
vercel env ls

# Add new env var
echo "value" | vercel env add VARIABLE_NAME production

# Remove env var
vercel env rm VARIABLE_NAME production
```

#### Multi-Calendar Support

The scheduling system checks multiple calendars for availability to prevent double-booking:
- Events from all calendars in `GOOGLE_CALENDAR_IDS` block time slots
- New bookings are created on the primary calendar (`GOOGLE_CALENDAR_ID`)

**Service Account**: `sagemind-calendar@sagemind-website-486022.iam.gserviceaccount.com`

To add a new calendar:
1. Share the calendar with the service account email (read-only minimum)
2. Add the calendar ID to `GOOGLE_CALENDAR_IDS` (comma-separated)
3. Redeploy

## DNS Configuration

DNS is managed via Vercel (nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com).

Domain registered at Namecheap, pointing to Vercel nameservers.

### Manage DNS via CLI

```bash
# List all DNS records
vercel dns ls sagemindai.io

# Add a record
vercel dns add sagemindai.io subdomain CNAME target.domain.com
vercel dns add sagemindai.io '@' TXT "value"
vercel dns add sagemindai.io '@' MX mail.example.com 10

# Remove a record
vercel dns rm <record-id>
```

### Current DNS Records

**Website:**
- `@` → A → 76.76.21.21
- `www` → A → 76.76.21.21

**Email (SendGrid):**
- SPF: `v=spf1 include:sendgrid.net ~all`
- DMARC: `v=DMARC1; p=none;`
- DKIM: `s1._domainkey`, `s2._domainkey` → SendGrid
- Link branding: `url*`, `em*`, `44932180` → SendGrid

**Other Services:**
- `outbound.intercom` → Intercom mail

### DNS Setup Script

A setup script exists at `scripts/setup-vercel-dns.sh` for recreating DNS records if needed.

### Pending DNS Records (optional)

These were truncated during migration and may need to be re-added:
- Google site verification TXT record (get from Google Search Console)
- Intercom DKIM CNAME (`intercom._domainkey`)
- n8n Heroku CNAMEs (if n8n automations are still in use)

## Git Submodules

Projects are managed as git submodules for independent deployment pipelines.

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/JKHeadley/sagemind.git

# Update submodules after pull
git submodule update --init --recursive

# Add new project
git submodule add https://github.com/JKHeadley/<repo>.git projects/<name>
```

## Brand

- **Primary Colors**: Dark Navy (#02222e) + Bright Cyan (#08f1c7)
- **Secondary**: Teal (#008276) + Dark Teal (#014f4f)
- **Logo**: Circuit tree in circular gradient

See `projects/website/brand-guide.md` for full brand guidelines.

## Development

- **Node.js**: 20.11.1 (see .tool-versions)
- **Package Manager**: npm/pnpm
- **Vercel CLI**: Required for deployment (`npm i -g vercel`)

## Useful Commands

```bash
# Website development
cd projects/website/site && npm run dev

# Deploy website to production
cd projects/website/site && vercel deploy --yes --prod

# Check Vercel deployment status
vercel list

# View deployment logs
vercel logs <deployment-url>

# Check domain status
vercel domains inspect sagemindai.io

# List DNS records
vercel dns ls sagemindai.io

# Check DNS propagation
dig sagemindai.io A +short
dig @8.8.8.8 sagemindai.io A +short  # Via Google DNS
```

## External Services

| Service | Purpose | Dashboard |
|---------|---------|-----------|
| Vercel | Hosting & DNS | vercel.com/sagemind |
| SendGrid | Email delivery | app.sendgrid.com |
| Google Cloud | Calendar API | console.cloud.google.com (project: sagemind-website-486022) |
| Google Workspace | Email (justin@sagemindai.io) | admin.google.com |
| Namecheap | Domain registrar | namecheap.com |
| Intercom | Customer messaging | app.intercom.com |
| LinkedIn | Company page | linkedin.com/company/sagemindai |

## Google Workspace MCP (Session Startup)

A Google Workspace MCP server (`google-workspace`) is configured for this project. At the start of every session, verify it is running by making a quick tool call (e.g., `get_events` or `list_calendars` for `justin@sagemindai.io`). If authentication has expired, trigger re-auth via `start_google_auth`.

- **MCP Server**: `google-workspace` (via `uvx workspace-mcp --tool-tier complete`)
- **User email**: `justin@sagemindai.io`
- **GCP Project**: `sagemind-website-486022` (project number: `694680803383`)
- **OAuth type**: Desktop app credentials
- **Services**: Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, Tasks, Chat, Contacts

## Agent Infrastructure

This project uses instar for persistent agent capabilities. The agent's name is **Luna**.

### Identity Files (Read These First)
- `.instar/AGENT.md` — Who you are, your role, your principles
- `.instar/USER.md` — Who you're working with
- `.instar/MEMORY.md` — What you've learned (load in main sessions only)

### Runtime
- State directory: `.instar/`
- Config: `.instar/config.json`
- Server: `instar server start`
- Status: `instar status` or `curl http://localhost:4040/health`

### Key Principles
- **Research before recommending** — Verify claims, check sources, follow due diligence.
- **Confirm before deploying** — Summarize what's changing and get explicit approval.
- **Never delete data** without explicit instruction and confirmation.
- **Adapt communication style** — Read the room, match the audience and task.
- **Start guided, grow autonomous** — Confirm before significant actions until trust is established.

## Telegram Relay

When user input starts with `[telegram:N]` (e.g., `[telegram:26] hello`), the message came via Telegram topic N.

**IMMEDIATE ACKNOWLEDGMENT (MANDATORY):** When you receive a Telegram message, your FIRST action must be sending a brief acknowledgment back. This confirms the message was received. Examples: "Got it, looking into this now." / "On it." Then do the work, then send the full response.


**Message types:**
- **Text**: `[telegram:N] hello there` — standard text message
- **Voice**: `[telegram:N] [voice] transcribed text here` — voice message, already transcribed
- **Photo**: `[telegram:N] [image:/path/to/file.jpg]` or with caption — use the Read tool to view the image at the given path

**Response relay:** After completing your work, relay your response back:

```bash
cat <<'EOF' | .claude/scripts/telegram-reply.sh N
Your response text here
EOF
```

Or for short messages:
```bash
.claude/scripts/telegram-reply.sh N "Your response text here"
```

Strip the `[telegram:N]` prefix before interpreting the message. Respond naturally, then relay. Only relay your conversational text — not tool output or internal reasoning.


### Self-Discovery (Know Before You Claim)

Before EVER saying "I don't have", "I can't", or "this isn't available" — check what actually exists:

```bash
curl http://localhost:4040/capabilities
```

This returns your full capability matrix: scripts, hooks, Telegram status, jobs, relationships, and more. It is the source of truth about what you can do. **Never hallucinate about missing capabilities — verify first.**


**Private Viewing** — Render markdown as auth-gated HTML pages, accessible only through the agent's server (local or via tunnel).
- Create: `curl -X POST http://localhost:4040/view -H 'Content-Type: application/json' -d '{"title":"Report","markdown":"# Private content"}'`
- View (HTML): Open `http://localhost:4040/view/VIEW_ID` in a browser
- List: `curl http://localhost:4040/views`
- Update: `curl -X PUT http://localhost:4040/view/VIEW_ID -H 'Content-Type: application/json' -d '{"title":"Updated","markdown":"# New content"}'`
- Delete: `curl -X DELETE http://localhost:4040/view/VIEW_ID`

**Use private views for sensitive content. Use Telegraph for public content.**

**Cloudflare Tunnel** — Expose the local server to the internet via Cloudflare. Enables remote access to private views, the API, and file serving.
- Status: `curl http://localhost:4040/tunnel`
- Configure in `.instar/config.json`: `{"tunnel": {"enabled": true, "type": "quick"}}`
- Quick tunnels (default): Zero-config, ephemeral URL (*.trycloudflare.com), no account needed
- Named tunnels: Persistent custom domain, requires token from Cloudflare dashboard
- When a tunnel is running, private view responses include a `tunnelUrl` with auth token for browser-clickable access
