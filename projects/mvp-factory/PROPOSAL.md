# Sagemind AI — MVP Factory Proposal

**Prepared by:** Adriana | **For:** Justin Headley | **Date:** March 15, 2026

---

## Executive Summary

We've built 15 fully functional, production-ready websites for Bay Area small businesses that currently have **no website**. Each site is custom-designed, mobile-responsive, SEO-optimized, and includes an AI chatbot — all running from a single Next.js application.

The play: deploy them live under `business-name.sagemindai.io`, cold-pitch the business owners with a link to their site, and close them on a **$499 setup + $49/mo** managed website package.

**Why this works:**
- The business owner sees their own site, live, before spending a dollar
- 27% of US small businesses (~8-10M) still have no website
- 58% of those plan to get one in 2026
- Our cost per client is ~$3-4/month; we charge $49/month = 92% margins
- One person can manage 20-25 clients at this service level

---

## What We Built

### 15 Custom Websites — One Codebase

A single Next.js 16 app serves all 15 sites using dynamic routing. Each business gets a unique site with:

- **5 pages:** Homepage, Services, About, Contact, FAQ
- **Unique design:** Different color palettes, typography, hero layouts, and visual styles — no two sites look alike
- **AI chatbot:** Answers questions about the business (hours, services, location, pricing) using business data
- **Click-to-call:** Floating phone button on mobile
- **Google Maps:** Embedded on contact page
- **Schema markup:** LocalBusiness + FAQPage + BreadcrumbList for SEO
- **Contact form:** Email notifications to a central inbox
- **"Built with AI by Sagemind AI"** branding in footer and chatbot

### Target Businesses

| # | Business | Industry | Location |
|---|----------|----------|----------|
| 1 | K & C Auto Service | European Auto Repair | San Francisco |
| 2 | Best Auto Care | Auto Repair | San Francisco |
| 3 | 1701 Auto Care | Auto Repair | Alameda |
| 4 | Community Auto Center | Auto Repair | Oakland |
| 5 | Glenview Automotive | Auto Repair | Oakland |
| 6 | Fruitvale Collision Center | Auto Body | Oakland |
| 7 | Supreme Blends Barber Shop | Barber | Oakland |
| 8 | Aguachiles El Tamarindo | Restaurant | Oakland |
| 9 | Taqueria El Chacho | Restaurant | San Jose |
| 10 | La Parrilla Loca | Restaurant | Oakland |
| 11 | Pipirin | Restaurant | Oakland |
| 12 | Pena's Bakery | Bakery | Oakland |
| 13 | Panaderia La Favorita | Bakery | Oakland |
| 14 | Panaderia Sevilla | Bakery | Oakland |
| 15 | Green Eagle Plumbing | Plumbing | Berkeley |

**Selection criteria:** All are real Bay Area businesses found via Google Maps that either have no website at all, or have a broken/placeholder site. They all have active Google Business Profiles with reviews, meaning they're real operating businesses.

---

## Market Opportunity

### The Problem

- **27% of US small businesses have no website** (8-10 million businesses)
- **81% of consumers** research businesses online before buying
- **97% of consumers** search online to find local businesses
- Businesses without websites lose customers to competitors who do have one
- Most small business owners don't get a website because:
  1. "Too expensive" (they imagine $3,000-10,000)
  2. "I don't have time to manage it"
  3. "I tried before and it didn't work" (burned by bad freelancer)
  4. "Social media is enough" (it's not — Google ranks websites, not Instagram)

### The Competitive Landscape

| Competitor Type | Price | What They Get |
|----------------|-------|---------------|
| DIY (Wix, Squarespace) | $25-40/mo | Build it yourself, no support |
| AI Builders (Durable, 10Web) | $12-25/mo | Generic AI-generated, no customization |
| Freelancers (Fiverr/Upwork) | $500-3,500 one-time | Hit or miss quality, no ongoing support |
| Local Agencies | $3,000-10,000+ one-time | High quality but unaffordable for most |
| Done-for-you (Hibu, Thryv, Scorpion) | $300-1,500/mo | Enterprise pricing, long contracts |

### Where Sagemind Fits

**We undercut agencies by 10x and out-quality DIY platforms.**

A business owner who can't afford $5,000 for an agency site and doesn't have time for Wix is our ideal customer. We give them a professional, custom site for $499 setup + $49/month — and we've already built it before they even said yes.

---

## Pricing & Offer

### What We Charge

| | Price | Notes |
|---|-------|-------|
| **Setup fee** | $499 | One-time. Site is already built — we customize with their real photos/content |
| **Monthly** | $49/mo | Hosting, maintenance, AI chatbot, basic SEO, content updates |
| **Annual option** | $39/mo | ($468/year, paid upfront — saves the client $120) |

### What's Included

**Setup ($499):**
- Custom 5-page website (already built — we finalize with their actual photos, logo, and content)
- Mobile-responsive design
- Google Maps integration
- Contact form with email notifications
- Schema markup for SEO
- Domain setup (subdomain on sagemindai.io initially, custom domain when they provide one)

**Monthly ($49/mo):**
- Website hosting & SSL
- AI chatbot (answers customer questions 24/7)
- Monthly content updates (hours, photos, promos, seasonal changes)
- Basic local SEO (Google Business Profile optimization, on-page SEO)
- Monthly performance report (traffic, top keywords, form submissions)
- Technical maintenance (security updates, performance monitoring)
- Click-to-call mobile button

### Future Upsell Opportunities

| Add-On | Price | Margin |
|--------|-------|--------|
| Advanced SEO package | +$150-300/mo | ~60% |
| Review management & generation | +$75-150/mo | ~65% |
| Social media management | +$299-500/mo | ~70% |
| Google Ads management | +$199/mo + ad spend | ~60% |
| Online booking/scheduling | +$25-50/mo | ~50% |
| Custom AI chatbot (real AI, not pattern matching) | +$50-100/mo | ~80% |

---

## Unit Economics

### Our Costs Per Client

| Item | Monthly Cost | Notes |
|------|-------------|-------|
| Hosting (Vercel or Hetzner) | ~$1 | All sites on one server |
| SSL | $0 | Free (Let's Encrypt / Vercel) |
| AI Chatbot (API costs) | ~$1-2 | GPT-4o mini, ~$0.004/conversation |
| SEO Tools (SE Ranking) | ~$1 | $55/mo split across clients |
| **Total hard cost** | **~$3-4/client** |

### Margins

| | Per Client | Notes |
|---|-----------|-------|
| Monthly revenue | $49 | |
| Monthly cost | ~$4 | Hard costs |
| **Gross margin** | **$45 (92%)** | Before labor |
| Time per client | 3-4 hrs/mo | Content updates + basic SEO + communication |
| Effective hourly rate | $11-15/hr | At current service level, per person |

**Note on labor:** With automation (admin panel for client self-service, automated SEO reports, AI-generated content), time per client drops to 1-2 hrs/month, making the effective rate $22-45/hr. This improves significantly at scale.

### Revenue Projections

| Milestone | Clients | Setup Revenue | Monthly Recurring | Annual Recurring |
|-----------|---------|--------------|-------------------|-----------------|
| Initial pitch (15 businesses) | 3-5 close | $1,497-2,495 | $147-245/mo | $1,764-2,940/yr |
| 6 months | 15-20 | $7,485-9,980 | $735-980/mo | $8,820-11,760/yr |
| 12 months | 40-50 | $19,960-24,950 | $1,960-2,450/mo | $23,520-29,400/yr |
| 18 months (with upsells) | 50+ | — | $4,000-6,000/mo | $48,000-72,000/yr |

**Conservative assumption:** 20-30% close rate on cold pitches with live spec sites (industry data shows 8-10% for free trial approaches; our approach is stronger because the site is already built and live).

---

## The "Spec Pitch" Strategy

### How It Works

1. **We've already built the sites.** The hardest part is done.
2. **Deploy all 15 live** under `business-name.sagemindai.io`
3. **Research owner contact info** — name, email, phone
4. **Send personalized cold email** with:
   - Link to their live site
   - 2-3 sentences about why their business needs a website (reference their reviews, location, competition)
   - Link to schedule a free 15-minute call
5. **Follow up** 3-5 days later if no response (research shows 3+ touches = 90% higher response rate)
6. **On the call:** Walk them through their site, explain the $499 + $49/mo offer, close

### Why This Beats Normal Cold Outreach

| Approach | Response Rate | Close Rate |
|----------|-------------|------------|
| Generic cold email ("we build websites") | ~9% | ~1-2% |
| Personalized cold email | ~18% | ~3-5% |
| **Spec site + personalized email** | **25-35% (estimated)** | **15-25% (estimated)** |

The spec site triggers **ownership psychology** — they see *their* business name, *their* address, *their* reviews on a professional website. It's no longer abstract. It's real.

### Outreach Timeline

| Day | Action |
|-----|--------|
| 1-2 | Deploy all 15 sites, verify they work |
| 3-4 | Research owner names, emails, phone numbers |
| 5-6 | Send first round of emails (stagger 5/day to avoid spam triggers) |
| 10-11 | Follow-up email to non-responders |
| 15 | Phone call follow-up to non-responders |
| 20+ | Close interested leads, onboard new clients |

---

## Technical Architecture

### How It's Built

- **Framework:** Next.js 16 (React 19, TypeScript, Tailwind CSS v4)
- **Architecture:** Single app, dynamic `[site]` routing — one codebase serves all 15 sites
- **Hosting:** Vercel (single project, 15 subdomain rewrites via middleware)
- **Config-driven:** Each business is a TypeScript config file — changing content/theme requires zero code changes
- **Performance:** Targeting Lighthouse 90+ across all sites

### Why Single App, Not 15 Separate Sites

- One install, one build, one deployment
- Fixing a bug or adding a feature updates ALL sites instantly
- Adding a new client = adding one config file (~200 lines) and deploying
- Shared components are truly shared — no drift between sites

### Scaling Path

| Clients | Infrastructure | Cost |
|---------|---------------|------|
| 1-50 | Vercel Pro ($20/mo) | $20/mo |
| 50-100 | Vercel Pro or Hetzner + Coolify | $40-50/mo |
| 100-500 | Dedicated server(s) + Coolify | $80-200/mo |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Low close rate (<10%) | Medium | Low revenue | Costs are near-zero; expand target list to 50-100 businesses |
| Business owner already hired someone | Low | Lost lead | Move on — plenty of targets |
| Client churn after 3 months | Medium | Revenue loss | Provide ongoing value (SEO results, reports); bundle services |
| Competitor copies our approach | Low | Long-term | First-mover advantage + relationship building + upsells |
| Time investment too high per client | Medium | Burnout | Build admin panel for self-service; automate reports |
| Legal concerns about using business info | Low | Reputation | We're using publicly available info (Google, Yelp). Sites are complimentary. Remove immediately if asked. |

---

## What We Need to Decide

1. **Are we aligned on $499 + $49/mo pricing?** Or do we want to adjust?
2. **Who handles outreach?** Adriana, Justin, or both?
3. **Who handles client management?** Monthly updates, SEO, communication
4. **Do we want a services/pricing page on sagemindai.io?** Or keep it pitch-only for now?
5. **Custom domains:** Do we offer custom domain setup at launch, or start with sagemindai.io subdomains?
6. **Contract terms:** Month-to-month? 3-month minimum? Annual discount?
7. **Payment processing:** Stripe? Invoice? How do we collect?
8. **Email setup:** Which email for contact form notifications? Do we set up per-client forwarding?

---

## Next Steps (Ready to Execute)

- [x] Build 15 websites (DONE)
- [x] AI chatbot on every site (DONE)
- [x] Sagemind branding on every site (DONE)
- [x] Market research & pricing (DONE)
- [ ] **Justin reviews & approves this proposal**
- [ ] Deploy all 15 sites to Vercel with subdomains
- [ ] Set up DNS records (15 CNAME entries)
- [ ] Configure contact form email routing
- [ ] Research owner contact info for all 15 businesses
- [ ] Draft personalized pitch emails
- [ ] Begin outreach

---

*This proposal represents approximately $0 in hard costs invested (aside from development time) with potential for $24,000-72,000+ in annual recurring revenue within 12-18 months.*
