# Sagemind AI — Due Diligence Standard

## Purpose

Every recommendation, technical claim, or action plan that Sagemind presents to a client must be independently verified before delivery. AI-assisted research is a starting point, not a conclusion. This standard exists because confident-sounding answers are the most dangerous when they're wrong.

## Core Principles

### 1. Verify Before You Present

Never relay AI-generated research findings to a client without independent verification. AI tools frequently:

- Fabricate features, endpoints, or product capabilities that don't exist
- Present inferences as confirmed facts
- Overstate ease of implementation ("just enable it") while omitting real prerequisites
- Generate plausible-sounding URLs, version numbers, and configuration details that are wrong

**The rule:** If you can't point to a primary source (official docs, a product page you actually loaded, a support article you actually read), it's unverified. Say so.

### 2. Distinguish Facts from Inferences

When documenting or presenting findings, explicitly categorize each claim:

| Category | Meaning | Example |
|----------|---------|---------|
| **Verified** | Confirmed against a primary source you accessed directly | "The RFI search endpoint exists — confirmed via APS API reference page" |
| **Strongly supported** | Multiple indirect signals but no direct confirmation | "The sync likely doesn't cover RFIs — no source mentions them, and all describe it as 'Autodesk Docs' only" |
| **Unverified** | Claimed by AI research but not independently confirmed | "One report says this launched in September 2025 — I haven't found the press release yet" |
| **Contradicted** | Evidence found that conflicts with the claim | "The research said this is a quick toggle, but the setup docs require three admin touchpoints" |

### 3. Assess "Quick Wins" Honestly

Before recommending any action to a client as low-effort, verify:

- **Actual setup steps** — not what the AI summary says, but what the official docs describe
- **Prerequisites and costs** — add-ons, plan tiers, admin access, developer credentials
- **Whether the client already knows about it** — don't present their own fallback plan back to them as a discovery
- **Whether it actually addresses their stated need** — a feature can be real and easy but irrelevant

### 4. Flag Knowledge Gaps Transparently

It is always better to say "I need to verify this" than to present an unverified claim with confidence. Clients trust consultants who acknowledge limits more than those who bluff.

When presenting findings with gaps:
- State what you know and how you know it
- State what you don't know and what you'd need to verify it
- Give a timeline for when you'll have the answer

### 5. Verify Capabilities, Not Just Existence

When evaluating APIs, features, or integrations, verifying that something *exists* is not sufficient. You must also verify what it *can do* at the level of detail that matters for the recommendation.

**Levels of verification:**

| Level | What it confirms | Example |
|-------|-----------------|---------|
| **Existence** | The thing is real | "The Submittals v2 endpoint exists at this path" |
| **Capability** | What it can and cannot do | "The endpoint has a `search` param for keyword search across title, identifier, spec, and ball-in-court" |
| **Behavior** | How it actually works in practice | "The `search` param does substring matching, not exact match" |

For any claim of the form "API X **can/cannot** do Y" — verify at the **capability** level minimum. Read the actual parameter list, check the official reference or Postman collection, and confirm what's available. Do not rely on a research summary's characterization.

**Origin of this rule:** During the GCI ACC integration research (Feb 2026), three independent AI research reports all stated that the Submittals API was "filter-only with no keyword search." This was wrong — the API has a documented `search` parameter. The error was caught only because the client-facing email was challenged before sending. The Postman collection had the correct information the entire time. Existence was verified but capability was not.

### 6. Treat AI Consensus as a Single Source

When using AI research tools (ChatGPT Deep Research, Perplexity, Claude, etc.):

1. **Multiple AI tools agreeing is NOT independent confirmation.** AI tools have correlated errors — they draw from similar training data and make similar reasoning mistakes. Three AI sources saying the same thing may be one error amplified three times.
2. **Read the cited sources yourself** — AI tools cite URLs they never visited. Click through.
3. **Check dates** — AI research frequently cites outdated information as current
4. **Watch for circular sourcing** — multiple AI tools citing each other, or multiple AI tools inferring the same wrong conclusion from the same ambiguous source
5. **Beware "launch announcements"** — a product being announced is not the same as it being available, GA, or working as described
6. **Test when possible** — if you can verify a claim by actually trying the API/feature/tool, do it
7. **Pay special attention to "cannot" claims** — AI tools are more likely to incorrectly state that something is NOT possible than to fabricate something that is. "This API doesn't support search" is a higher-risk claim than "this API supports search" because the latter is easy to verify while the former requires proving a negative.

## Applying This Standard

### Before Every Client Deliverable

- [ ] All technical claims verified against primary sources
- [ ] Capability claims ("can do X" / "cannot do X") verified at parameter level, not just endpoint level
- [ ] "Quick win" recommendations assessed for actual effort, cost, and relevance
- [ ] Knowledge gaps flagged explicitly, not papered over
- [ ] Client's own stated context cross-referenced (don't recommend what they already told you about)
- [ ] AI research consensus treated as single source — at least one claim independently verified against primary docs

### When Documenting Research

- Use the Verified/Strongly Supported/Unverified/Contradicted categories
- Link to primary sources for every verified claim
- Note the date of verification (features change, APIs evolve)

### When Presenting to Clients

- Lead with what's verified
- Separate recommendations from findings
- If a recommendation depends on an unverified claim, say so and propose a verification step

## Examples

### Bad
> "Egnyte has a native ACC sync that launched in September 2025. You should enable it immediately — it's a quick win that gives you ACC document access through your existing GPT."

### Good
> "Our research flagged an Egnyte-ACC native sync feature. I verified it exists (confirmed via Egnyte press release and helpdesk docs), but it requires the Project Hub add-on, APS developer credentials, and admin configuration on both platforms. It also only syncs Autodesk Docs files — not the structured data (RFIs, submittals, cost) you're looking for. I don't recommend prioritizing it right now."

### Bad (capability claim)
> "Submittals only support structured filters — no keyword search. Users will need to know spec section numbers to find what they're looking for."

*Three AI research reports agreed on this. None checked the actual API parameter list.*

### Good (capability claim)
> "I checked the Submittals v2 Postman collection — there's a `search` query parameter that does keyword search across title, identifier, spec identifier, and ball-in-court fields. Natural language queries should work for submittals."

---

*Established: 2026-02-10*
*Owner: Justin Headley / Sagemind AI*
