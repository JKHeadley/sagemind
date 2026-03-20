# Sagemind AI — Business Plan (DRAFT)

**Status:** Draft for discussion — Justin & Adriana
**Date:** March 20, 2026
**Version:** 0.1

---

## 1. Company Overview

**Sagemind AI LLC** is a Bay Area-based AI solutions company that helps small and mid-size businesses adopt AI through consulting, custom-built tools, and managed websites.

- **Founder:** Justin Headley
- **Domain:** sagemindai.io
- **Base:** Bay Area, CA (remote-capable)

### Mission

Make AI practical and affordable for businesses that can't hire an AI team — by delivering working solutions, not slide decks.

---

## 2. Service Lines

Sagemind operates across three complementary service lines, each at a different stage of maturity:

### Service Line A: AI Consulting (Construction Niche)

**Status:** Active — paying clients, referrals coming in

Justin provides hands-on AI integration consulting for construction companies. Tommy (current client) has referred additional companies. The work focuses on practical, high-impact solutions that solve real operational pain points.

**What we know works:**
- Solutions are "simple but highly impactful" (per Tommy's feedback)
- Reusable across construction companies (similar workflows, similar pain points)
- Referral-driven growth is already happening organically

**What's undefined:**
- No documented methodology or playbook
- No standardized pricing structure (phases? milestones? retainer?)
- No case study or proof-of-concept document to show new prospects
- No clear service catalog (what exactly does a typical engagement include?)
- The construction niche is proven but not yet formalized

### Service Line B: MVP Factory (Managed Websites)

**Status:** Built, not yet launched

15 spec websites built for Bay Area small businesses. Ready to deploy and pitch.

- $499 setup + $49/month
- 92% gross margins
- Spec pitch strategy (site built before first contact)
- Full proposal documented in `projects/mvp-factory/PROPOSAL.md`

**What's undefined:**
- Outreach hasn't started
- Who handles sales vs. delivery vs. client management?
- Relationship between this line and the consulting work (same brand? same person?)

### Service Line C: Custom Solutions (Booking Systems, Niche Tools)

**Status:** Scoped, not yet delivered

Custom booking system designed for a salon client. Architecture reusable across service-based businesses (salons, spas, trainers, etc.).

- Zero monthly cost to client (vs. $30-85/mo for Vagaro, Booksy)
- White-label potential
- Full scope in `project_sandbox/salon-website-castro-valley/booking-system-scope.md`

**What's undefined:**
- Pricing model for custom solutions
- How this fits into the broader business (standalone product? upsell from consulting?)

---

## 3. Revenue Model

### Current State (Estimated)

| Source | Status | Revenue |
|--------|--------|---------|
| AI Consulting (construction) | Active | Per-engagement (structure unclear) |
| MVP Factory | Built, not launched | $0 |
| Custom Solutions (salon) | Scoped | $0 |
| Monroe Institute salary | Active | Justin's primary income |

### Target State (12-18 months)

| Source | Target | Revenue Potential |
|--------|--------|-------------------|
| AI Consulting (construction) | 5-8 stable clients | $60K-150K/yr (depends on pricing) |
| MVP Factory | 40-50 managed sites | $24K-30K/yr recurring |
| Custom Solutions | 2-3 projects/quarter | $20K-60K/yr |
| **Combined** | | **$104K-240K/yr** |

**Critical assumption:** These ranges are wide because consulting pricing isn't defined yet. That's the single biggest variable.

---

## 4. The Scaling Question

From Gregg's meeting feedback and the current state, the core tension is:

> Justin is doing great work, getting referrals, and building reusable solutions — but the business isn't yet structured to scale beyond Justin's personal time.

### What Scaling Requires

**1. Productize the consulting methodology**

The construction consulting work needs to be documented as a repeatable process:
- Discovery phase (what questions do we ask?)
- Assessment phase (what do we evaluate?)
- Solution design (what's the playbook for common pain points?)
- Implementation (what do we build/configure?)
- Handoff & support (what does ongoing look like?)

This turns "Justin does AI consulting" into "Sagemind has a methodology" — which is what Gregg meant by "build a product, not an hourly service."

**2. Define pricing that rewards efficiency**

Gregg's specific warning: *don't fall into the hourly trap.* AI makes you faster — hourly billing punishes that. Options:

| Model | Pros | Cons |
|-------|------|------|
| **Phase-based milestones** | Predictable for client, rewards efficiency | Requires good scoping |
| **Monthly retainer** | Recurring revenue, ongoing relationship | Risk of scope creep |
| **Value-based (% of savings)** | Aligns incentives, high ceiling | Hard to measure, client pushback |
| **Tiered packages** | Scalable, easy to sell | May not fit every client |

Current plan (per Adriana in the meeting): Phase-based with milestones. This is the right instinct — just needs to be formalized.

**3. Resolve the hardware bottleneck**

Mac Minis ($3,500 each) are needed to run and scale the AI agents. Options:

| Option | Cost | Pros | Cons |
|--------|------|------|------|
| Buy new Mac Mini | $3,500 | Full control, one-time cost | Currently out of stock, upfront capital |
| Gregg's spare Mac Mini | $0 | Immediate, free | May not meet specs |
| Cloud Mac (MacStadium) | ~$50-80/mo | No hardware, instant | Ongoing cost, adds up |
| AWS EC2 Mac | ~$0.65/hr (~$470/mo) | Enterprise-grade | Expensive at scale |

**Recommendation:** Test Gregg's spare first. If it works, buy time to source new units. Cloud Macs as bridge if needed.

**4. Decide when to leave Monroe Institute**

The meeting established this is the goal, but the trigger is "a large set of stable clients." That needs to be defined as a specific number:

- What's the monthly revenue threshold?
- How many months of consistent revenue?
- What's the savings runway needed?

---

## 5. Competitive Positioning

### What Makes Sagemind Different

**For construction companies (consulting):**
- Justin understands both the tech and the industry pain points
- Solutions are simple and practical, not overengineered
- AI expertise delivered at a price point construction companies can afford
- Reusable solutions mean faster delivery for each new client

**For small businesses (MVP Factory):**
- 10x cheaper than agencies, higher quality than DIY
- Site is built *before* the pitch — zero risk for the prospect
- AI chatbot included at no extra cost
- No lock-in, transparent pricing

**For service businesses (custom solutions):**
- Eliminates $360-1,020/year in SaaS fees
- Custom-branded, fully integrated
- Client owns their data
- White-label potential

### Moat

The defensibility isn't in the AI tools (those are commoditizing). It's in:
1. **Domain expertise** — understanding what construction companies / small businesses actually need
2. **Reusable solution library** — each project makes the next one faster
3. **Relationships** — referral-driven growth in tight-knit industries
4. **Speed** — AI-powered delivery means 10x faster than traditional consultants

---

## 6. Organizational Structure

### Current

| Role | Person | Capacity |
|------|--------|----------|
| Technical delivery / consulting | Justin | Part-time (has full-time job) |
| Business development / client management | Adriana | Active |
| AI agent infrastructure | Luna (AI) | Always-on |

### Key Constraint

Justin is part-time. Everything else — the referrals, the built products, the market opportunity — is waiting on Justin's available hours.

This means the business must be ruthlessly prioritized: which service line gets Justin's limited time?

---

## 7. Near-Term Priorities (Next 90 Days)

**Suggested — needs discussion:**

1. **Close Tommy's referral** — deliver well, get a second case study
2. **Document the consulting methodology** — even a v0.1 is better than nothing
3. **Set consulting pricing** — formalize phase-based milestone pricing
4. **Launch MVP Factory outreach** — deploy sites, start pitching (Adriana can lead)
5. **Resolve hardware** — test Gregg's Mac Mini, source new units
6. **Build the case study** — document Tommy's engagement as a referenceable proof point

---

## 8. VC / Investment Considerations

Gregg raised the possibility of VC interest. Before pursuing that:

**Strengths for a pitch:**
- Revenue from paying clients (not just an idea)
- Reusable solutions = scalable, not pure services
- AI infrastructure play (universal problem, per Gregg)
- Founder with technical depth

**Gaps to address first:**
- Need consistent monthly revenue (not just one-off projects)
- Need documented methodology (investors fund systems, not people)
- Need to articulate the "platform" vision (how does this become bigger than Justin?)
- Hardware investment thesis needs to be clear (why Mac Minis specifically, what do they enable)

**Gregg's offer:** Help secure customers or resources. Worth following up — but after the methodology and pricing are formalized.

---

## What This Document Is NOT

This is not a finished business plan. It's a starting point for a conversation between Justin and Adriana about:

- Which service line to prioritize
- How to price the consulting work
- What "ready to leave Monroe" looks like as a number
- Whether to pursue VC or bootstrap

The questions below are designed to drive that conversation.

---

*Draft prepared by Luna — Sagemind AI | March 20, 2026*
