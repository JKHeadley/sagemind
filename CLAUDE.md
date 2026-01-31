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
└── projects/       # Git submodules for deployable projects
    └── website/    # Main company website (Next.js)
```

## Projects

### Website (`projects/website`)

The company website at sagemindai.io.

- **Tech Stack**: Next.js 16.1.6, React 19.2.3, Tailwind CSS v4, TypeScript
- **Repository**: github.com/JKHeadley/sagemind-website
- **Deployment**: Vercel (sagemind team)
- **Production URL**: https://sagemind-website.vercel.app

#### Deployment

The website is deployed via Vercel CLI from within `projects/website/site/`:

```bash
cd projects/website/site
vercel deploy --yes --prod
```

#### Environment Variables (Vercel)

Required for contact form and scheduling features:

| Variable | Description |
|----------|-------------|
| `GMAIL_USER` | Gmail address for sending emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not regular password) |
| `CONTACT_EMAIL` | Email to receive contact submissions |
| `GOOGLE_CALENDAR_ID` | Calendar ID for scheduling |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Google service account JSON |
| `TIMEZONE` | IANA timezone (e.g., America/Los_Angeles) |

Set via CLI:
```bash
echo "value" | vercel env add VARIABLE_NAME production
```

List current env vars:
```bash
vercel env ls
```

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
```
