# Sagemind AI - Claude Code Context

## Overview

Sagemind AI LLC is a Bay Area-based company focused on AI solutions, SaaS development, and software consulting. This is the parent repository that organizes all projects and organizational content.

- **Domain**: sagemindai.io
- **Founder**: Justin Headley
- **GitHub**: github.com/JKHeadley

## Repository Structure

```
sagemind/
├── brand/          # Brand assets, logos, style guides
├── docs/           # Shared organizational documentation
├── planning/       # Strategic planning, roadmaps
├── scripts/        # Utility scripts (DNS setup, etc.)
└── projects/       # Git submodules for deployable projects
    └── website/    # Main company website (Next.js)
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
