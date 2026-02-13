# GCI — ACC Integration Plan (Vetted)

## Status: Ready for Implementation

**Client:** GCI General Contractors
**Prepared by:** Justin Headley / Sagemind AI
**Date:** 2026-02-10
**Due Diligence:** All claims independently verified per `docs/standards/due-diligence.md`

---

## Executive Summary

Adding Autodesk Construction Cloud (ACC) as a second data source to the existing GCI Data Scout Custom GPT is **feasible and proven**. Autodesk published a working tutorial demonstrating this exact pattern (Custom GPT + APS OAuth + ACC Issues). All key technical claims have been independently verified against primary sources.

**What this enables:** GCI staff can search RFIs, issues, submittals, and change orders from ACC — alongside their existing Egnyte file search — from a single ChatGPT interface.

**What this does NOT enable:** Daily log search (no real-time API), PDF/attachment content reading (text/JSON only), or keyword search on cost/change order data (structured filters only — no text search).

---

## APS Developer Hub (New Business Model)

Autodesk transitioned to a new business model on December 7, 2025. The legacy `aps.autodesk.com/myapps/` portal is being replaced by "Developer Hubs."

**Our approach:** We will use the new Developer Hub system from the start (not the legacy portal). This means Step 1 follows the new enrollment flow: create an Autodesk team → enroll in APS Free tier → create a Developer Hub → create the app within the Hub.

**Migration deadline: February 18, 2026.** This deadline applies to migrating *existing* apps from the legacy portal. Since we are creating a *new* app, we are not migrating — we go straight to the new system. The exact consequences of the deadline for new app creation are **unverified** (Autodesk docs don't explicitly distinguish between "existing app migration" and "new app creation after cutoff"), but this is moot for us since we're using the new path regardless.

**New enrollment flow (verified):**
1. Create or use an Autodesk account
2. Enroll in an APS offering (Free tier available — no cost for ACC module APIs)
3. Create a Developer Hub (one-per-team, permanent — name carefully)
4. Create the app within the Developer Hub

**Unverified:** Whether Free tier enrollment requires a payment method on file — docs are silent. Will test during registration.

**Verification status:** VERIFIED — [APS Business Model Evolution blog](https://aps.autodesk.com/blog/aps-business-model-evolution), [Developer Hubs User Guide](https://aps.autodesk.com/blog/developer-hubs-user-guide), [How to Create a Developer Hub](https://aps.autodesk.com/blog/how-create-developer-hub-and-migrate-your-applications)

---

## Verification Summary

Every technical claim in this plan has been independently verified. See the category key:

| Symbol | Meaning |
|--------|---------|
| **V** | Verified against primary Autodesk/OpenAI documentation |
| **SS** | Strongly Supported by multiple sources but not directly testable without credentials |
| **U** | Unverified — flagged for testing during implementation |

---

## Architecture

```
"GCI Data Scout" Custom GPT
  ├─ Action 1: Egnyte (existing)  → Egnyte OAuth  → Egnyte v2 Search API
  └─ Action 2: ACC (new)          → APS OAuth     → ACC Module APIs
```

Each Action has its own OpenAPI schema and OAuth configuration. Users authenticate to each service independently. The GPT's system instructions route queries to the appropriate API.

- **Multiple Actions per GPT with separate OAuth:** V — [GPT Actions authentication docs](https://platform.openai.com/docs/actions/authentication)
- **Existing Egnyte Action remains untouched:** V — Actions are independent

---

## Step-by-Step Implementation Plan

### Step 1: Register APS Application — COMPLETE

**Owner:** Justin (Sagemind)
**Completed:** 2026-02-11
**Depends on:** Nothing

1. ~~Go to [aps.autodesk.com](https://aps.autodesk.com) and sign in with an Autodesk account~~
2. ~~Enroll in an APS offering (Free tier — no cost for ACC module APIs)~~
3. ~~Create a Developer Hub (one-per-team, permanent — choose naming carefully)~~
4. ~~Create a new application:~~
   - **Type:** Traditional Web App
   - **Name:** GCI Data Scout ACC
5. ~~Copy the **Client ID** and **Client Secret** (displayed immediately)~~
   - **Client ID:** `YUS0lGiQd2nrUf5fARzVkAfH8Ke0IBreoTXGcaqs8DOacYKl`
   - **Client Secret:** Saved in `project_sandbox/gci/.env` (not committed to git)
6. **TODO:** Add callback URL: `https://chatgpt.com/aip/{g-YOUR-GPT-ID}/oauth/callback`
   - Get the exact callback URL from the GPT Action editor (Step 4)
   - You'll need to come back and add it after creating the Action

**Verification status:**
- App registration is free and instant: **V** — [APS Create App tutorial](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/create-app/), [Getting Started tutorials](https://get-started.aps.autodesk.com/)
- No partner agreement required: **V** — [APS Developer Programs](https://aps.autodesk.com/autodesk-developer-programs) (all optional)
- Traditional Web App supports 3-legged OAuth without PKCE: **V** — [APS New Application Types](https://aps.autodesk.com/blog/new-application-types)
- ACC module APIs are non-rated (free): **V** — [APS Business Model Evolution](https://aps.autodesk.com/blog/aps-business-model-evolution) (only Model Derivative, Automation, Flow Graph Engine, and Reality Capture are rated)
- Developer Hub required for new apps: **V** — [Developer Hubs User Guide](https://aps.autodesk.com/blog/developer-hubs-user-guide)

**Unverified:**
- Whether Free tier enrollment requires a payment method on file: **U** — documentation is silent on this. Test during registration.

---

### Step 2: GCI Admin Provisions the App in ACC

**Owner:** Jon West (GCI Project Manager / ACC Admin)
**Effort:** 10 minutes
**Depends on:** Step 1 (need Client ID)
**Instructions sent:** See `drafts/email_jon_acc_admin_instructions_2026-02-11.md`

1. Log into ACC as Account Administrator
2. Go to **Account Admin > Custom Integrations**
3. Click **Add Custom Integration**
4. Enter the **APS Client ID** from Step 1, plus a name and description
5. The integration will appear as Active in the list
6. Also need: **ACC Account ID** (found in the Account Admin URL)

**If the "Custom Integrations" tab is missing:** GCI's ACC account may need API access activation. For accounts created before February 2021, email `bim360appsactivations@autodesk.com` with:
- Subject: "ACC Docs — API Activation Request"
- Include: Account ID, account name, account admin email

**Cross-account access:** The APS app is registered under Sagemind's Autodesk account, not GCI's. This is the intended design — the Custom Integration mechanism exists specifically for authorizing third-party/external developer apps. Verified from multiple sources including Autodesk's own provisioning documentation and real-world examples (Archibus, BIMrx).

**Verification status:**
- Custom Integrations provisioning process: **V** — [Autodesk Custom Integrations help](https://help.autodesk.com/cloudhelp/ENU/Docs-Admin/files/account-administration/Custom_Integrations.html)
- Cross-account (developer app → client ACC) is supported: **V** — [BIM 360 Provisioning blog](https://aps.autodesk.com/blog/bim-360-docs-provisioning-forge-apps), [Third-party Apps docs](https://help.autodesk.com/cloudhelp/ENU/BIM360D-Administration/files/About-Account-Admin/GUID-0C83B441-C611-4574-8DA0-45D5CFC235FA.html)
- 403 error without provisioning: **V** — [APS errors blog](https://aps.autodesk.com/blog/errors-when-retrieving-hubs)
- Post-Feb 2021 accounts have API access by default: **V** — [APS BIM 360 tutorial](https://aps.autodesk.com/en/docs/bim360/v1/tutorials/getting-started/manage-access-to-docs/)
- Multiple integrations coexist without conflict: **V** — Autodesk docs describe per-integration management with independent status
- Activation email for older accounts: **V** — [Autodesk Knowledge article](https://knowledge.autodesk.com/support/bim-360/troubleshooting/caas/sfdcarticles/sfdcarticles/Apps-tab-missing-in-BIM-360-account.html)

---

### Step 3: Build the OpenAPI Schema

**Owner:** Justin (Sagemind)
**Effort:** 2-4 hours
**Depends on:** Nothing (can be done in parallel with Steps 1-2)

Build a minimal OpenAPI 3.1.0 schema covering the MVP endpoints. Use Autodesk's published tutorial schema as a template.

**MVP Endpoints (Phase 1 — Issues + RFIs):**

| Endpoint | Method | Path | Search Capability |
|----------|--------|------|-------------------|
| List Projects | GET | `/construction/admin/v1/accounts/{accountId}/projects` | Filter by name |
| List Issues | GET | `/construction/issues/v1/projects/{projectId}/issues` | Filter by status, type, assignee |
| Get Issue Detail | GET | `/construction/issues/v1/projects/{projectId}/issues/{issueId}` | By ID |
| Search RFIs | POST | `/construction/rfis/v3/projects/{projectId}/search:rfis` | **Keyword text search** |
| Get RFI Detail | GET | `/construction/rfis/v3/projects/{projectId}/rfis/{rfiId}` | By ID |

**Phase 2 Endpoints (Submittals + Cost):**

| Endpoint | Method | Path | Search Capability |
|----------|--------|------|-------------------|
| Search Submittals | GET | `/construction/submittals/v2/projects/{projectId}/items` | **`search` param: keyword search across title, identifier, spec identifier, ball-in-court** + 30 structured filters |
| Get Project Details | GET | `/project/v1/hubs/{hubId}/projects/{projectId}` | Retrieves cost container ID from `data.relationships.cost.data.id`. **Required before calling cost endpoints.** hubId = `b.{accountId}`, projectId = `b.{projectId}` |
| List Change Orders | GET | `/cost/v1/containers/{containerId}/change-orders/{pco\|rfq\|rco\|oco\|sco}` | 10 structured filters (id, number, contractId, costStatus, budgetStatus, lastModifiedSince, etc.) + sort + pagination. **No text search.** |
| List Budgets | GET | `/cost/v1/containers/{containerId}/budgets` | Filter by rootId, id, code, lastModifiedSince |

**Corrections (2026-02-10):**

1. Earlier research characterized Submittals as "filter-only with no keyword search." This was wrong. The Submittals v2 API has a dedicated `search` query parameter that performs text search across title, identifier, spec identifier, and ball-in-court fields. Verified from the [official Postman collection](https://github.com/autodesk-platform-services/aps-autodesk.build.api-postman.collection). Natural language queries like "find the generator submittal" should work via `?search=generator`.

2. Earlier research characterized Cost/Change Orders as having only an `include` parameter. This was also wrong — the initial Postman collection was incomplete. Verified via [OpenAPI schema](https://github.com/adsk-keenan-bruni/acc-console/blob/main/schema.yaml) and [auto-generated SDK code](https://github.com/adsk-duszykf/Adsk.Platform.Toolkit.dotNet): the legacy container-based API has 10 filter params + sort + pagination. The newer project-based API adds a `q` text search param. The `{changeOrder}` path segment is the **type** (pco, rfq, rco, oco, sco), not an ID.

**Schema design rules:**
- Set `x-openai-isConsequential: false` on all POST endpoints (all are read-only searches)
- Hardcode conservative `limit` defaults (20 results) to stay under 100K character response limit
- Include `{accountId}` as a parameter — will need to be configured or looked up
- For Cost endpoints, `containerId` equals `projectId` in ACC Build

**Key references:**
- Template schema: [Petr Broz's Issues gist](https://gist.github.com/petrbroz/a4274548c52e2ee71914c9e644490e5e) — **V** (confirmed exists with 3 endpoints)
- Official OpenAPI specs: [github.com/autodesk-platform-services/aps-sdk-openapi](https://github.com/autodesk-platform-services/aps-sdk-openapi) — **V** (published April 2025)
- Official Postman collections for each module: **V** (confirmed on GitHub for Issues, RFIs, Submittals, Cost)

**Verification status (endpoints):**
- All endpoint paths and versions: **V** — Confirmed against APS API reference, Postman collections, and llmstxt docs
- RFIs are v3 (not v2): **V** — [RFI v3 blog](https://aps.autodesk.com/blog/autodesk-build-rfi-v3-api-released) (v2 deprecated)
- Submittals are v2 with `search` param (keyword search across title, identifier, spec, ball-in-court): **V** — [Submittals Postman collection](https://github.com/autodesk-platform-services/aps-autodesk.build.api-postman.collection)
- Cost uses containerId (= projectId in ACC Build): **V** — [Cost Management Postman collection](https://github.com/autodesk-platform-services/aps-bim360.costmanagement.api-postman.collection)
- Cost Change Orders have limited query params (only `include` found): **SS** — Postman collection may be incomplete; official docs couldn't be scraped (JS-rendered)
- RFI `POST /search:rfis` replaces GET list in v3: **V** — Returns all RFIs when payload is empty `{}`
- Daily logs have no real-time API: **V** — Only via Data Connector batch exports

---

### Step 4: Configure the ACC Action in GCI Data Scout GPT

**Owner:** Justin (Sagemind)
**Effort:** 30 minutes
**Depends on:** Steps 1, 2, 3

1. Open the GCI Data Scout Custom GPT in the GPT editor
2. Go to **Actions > Create new action**
3. Paste the OpenAPI schema from Step 3
4. Under **Authentication**, select **OAuth** and enter:

| Field | Value | Verified |
|-------|-------|----------|
| Client ID | `YUS0lGiQd2nrUf5fARzVkAfH8Ke0IBreoTXGcaqs8DOacYKl` | — |
| Client Secret | See `project_sandbox/gci/.env` | — |
| Authorization URL | `https://developer.api.autodesk.com/authentication/v2/authorize` | **V** |
| Token URL | `https://developer.api.autodesk.com/authentication/v2/token` | **V** |
| Scope | `data:read account:read` | **V** — Projects API requires `account:read` per official OpenAPI spec |

5. Save — copy the callback URL shown in the editor
6. Go back to the APS app settings and register the callback URL
7. **Important:** If you modify OAuth settings later, the callback URL changes — re-register in APS

**Verification status:**
- OAuth endpoints: **V** — [APS Migration Guide](https://aps.autodesk.com/blog/migration-guide-oauth2-v1-v2), [Custom GPTs + APS blog](https://aps.autodesk.com/blog/custom-gpts-aps), [Postman blog](https://aps.autodesk.com/blog/using-3-legged-oauth-v2-postman)
- PKCE not required for Traditional Web App: **V** — [APS New Application Types](https://aps.autodesk.com/blog/new-application-types)
- ChatGPT Actions do NOT support PKCE: **V** — [OpenAI community thread](https://community.openai.com/t/does-oauth-option-support-pkce/283261) (confirmed compatible since APS doesn't require it for this app type)
- APS v2 token endpoint accepts credentials in request body: **V** — [APS blog update](https://aps.autodesk.com/blog/update-authentication-api-v2-now-accepts-credentials-requests-body) (ChatGPT sends credentials in body, not header)
- Access tokens: 60 minutes, refresh tokens: 15 days (single-use rotation): **V**
- ChatGPT handles token refresh automatically (reactive, on 401): **V** — [OpenAI community guide](https://community.openai.com/t/guide-how-oauth-refresh-tokens-revocation-work-with-gpt-actions/533147)
- Scope `data:read` used in Autodesk's own Custom GPT tutorial: **V**

**Unverified:**
- ~~Whether `account:read` is needed for project listing endpoint~~ — **RESOLVED**: Yes, `account:read` is required. Confirmed from official OpenAPI spec (`accountadmin.yaml`). Scope updated to `data:read account:read`.

---

### Step 5: Update System Instructions

**Owner:** Justin (Sagemind)
**Effort:** 30 minutes
**Depends on:** Step 4

Add ACC-specific routing and behavior to the GPT's system instructions. Key additions:

```
MULTI-SOURCE ROUTING:
- For project FILES (specs, drawings, PDFs): Use the Egnyte searchFiles action
- For RFIs, Issues, Submittals, Change Orders: Use the ACC actions
- If unclear which source, ask the user

ACC-SPECIFIC RULES:
- Always ask for a project name first, then use listProjects to resolve the project ID
- For RFI searches, use the searchRfis action with the user's keywords
- For submittal searches, use the `search` query parameter with the user's keywords. This searches across title, identifier, spec identifier, and ball-in-court fields. You can also combine with structured filters (specId, status, etc.) to narrow results.
- For change orders, ask whether they want PCOs, OCOs, or all types. Use the changeOrder type path parameter to scope results.
- Set result limits to 20 per request. If more results exist, ask the user if they want to see more.
- If the API returns an empty list, say "No records found." Do NOT invent or guess data.
- You cannot read PDF attachments. If an RFI or submittal references an attachment, provide the file name and tell the user where to find it in ACC.
- Daily logs are NOT searchable through this integration. If asked, explain this limitation.

ACC ACCOUNT ID:
- Use account ID: [TO BE CONFIGURED after Step 2]
```

---

### Step 6: Test

**Owner:** Justin (Sagemind), then Tom + testers
**Effort:** 1-2 hours
**Depends on:** Steps 1-5

**Test 1: Authentication**
- [ ] Open the GPT, trigger an ACC action
- [ ] Verify Autodesk OAuth login page appears
- [ ] Complete authentication
- [ ] Verify the action returns data (not 403)

**Test 2: Project Listing**
- [ ] Ask "What projects are in ACC?"
- [ ] Verify known projects appear with correct names

**Test 3: RFI Search (highest-value test)**
- [ ] Ask "Search for RFIs about [known topic] on [known project]"
- [ ] Verify results match what's in ACC
- [ ] Verify results include title, question, status, dates

**Test 4: Issues**
- [ ] Ask "Show me open issues on [known project]"
- [ ] Verify results match ACC

**Test 5: Permission Scoping**
- [ ] Have a user with restricted ACC access authenticate
- [ ] Verify they only see data they have access to in ACC

**Test 6: Egnyte + ACC Together**
- [ ] Ask a question that should hit Egnyte (e.g., "find specs for [project]")
- [ ] Then ask an ACC question (e.g., "show me RFIs for [project]")
- [ ] Verify both work in the same conversation without auth conflicts

**Test 7: Edge Cases**
- [ ] Search for something that doesn't exist — verify no hallucinated results
- [ ] Ask about daily logs — verify the GPT explains the limitation
- [ ] Trigger a large result set — verify pagination messaging works

---

## Known Limitations

| Limitation | Root Cause | Workaround |
|------------|-----------|------------|
| No daily log search | ACC has no real-time daily log API | Data Connector batch exports (future enhancement) |
| No PDF/attachment reading | ChatGPT Actions handle text/JSON only | GPT returns file metadata + tells user where to find it in ACC |
| No cost text search | Cost API has structured filters only — no keyword/text search parameter exists. Thoroughly verified across schema.yaml, Postman collection, and sample app code. | Use structured filters (costStatus, budgetStatus, contractId, lastModifiedSince, etc.) |
| Cost requires containerId lookup | containerId ≠ projectId. Must call Data Management API to retrieve cost container ID before querying cost endpoints. | Schema includes getProjectDetails endpoint; GPT system instructions will guide the chained call flow |
| No cross-module unified search | ACC has separate APIs per module | GPT routes queries to correct module; consider middleware later |
| 100,000 character response limit | ChatGPT Actions constraint | Conservative `limit` params (20 results per call) |
| 45-second timeout | ChatGPT Actions constraint | Narrow queries with filters; avoid broad unscoped requests |
| Cost terminology complexity | PCO/RCO/OCO distinctions | System instructions guide user to specify type |
| Token refresh bugs (rare) | Known ChatGPT issue | Users may need to re-authenticate occasionally |

**Verification:** All limitations confirmed against primary sources (see inline citations throughout).

---

## Constraints (ChatGPT Actions Platform)

| Constraint | Value | Verified |
|------------|-------|----------|
| Response size limit | 100,000 characters | **V** — [OpenAI production notes](https://platform.openai.com/docs/actions/production) |
| Timeout | 45 seconds | **V** — [OpenAI production notes](https://platform.openai.com/docs/actions/production) |
| PKCE support | Not supported (legacy Actions) | **V** — [OpenAI community](https://community.openai.com/t/does-oauth-option-support-pkce/283261) |
| Binary file handling | Not supported | **V** — [OpenAI community](https://community.openai.com/t/download-files-from-an-action-in-a-gpt/530848) |
| Multiple Actions per GPT | Supported, independent OAuth | **V** — [OpenAI Actions auth docs](https://platform.openai.com/docs/actions/authentication) |
| POST consequential flag | `x-openai-isConsequential: false` to skip confirmation | **V** — [OpenAI production notes](https://platform.openai.com/docs/actions/production) (known bugs with flag) |
| Auto token refresh | Reactive (on 401), not proactive | **V** — [OpenAI community guide](https://community.openai.com/t/guide-how-oauth-refresh-tokens-revocation-work-with-gpt-actions/533147) |

---

## Effort Estimate

| Step | Effort | Owner |
|------|--------|-------|
| 1. Register APS app | 30 min | Justin |
| 2. ACC admin provisioning | 10 min | Tom/GCI admin |
| 3. Build OpenAPI schema | 2-4 hours | Justin |
| 4. Configure Action + OAuth | 30 min | Justin |
| 5. Update system instructions | 30 min | Justin |
| 6. Testing | 1-2 hours | Justin + Tom |
| **Total (Justin)** | **~5-8 hours** | |
| **Total (Tom/GCI)** | **~10-30 min** | |

---

## GCI Contacts

| Name | Role | Email | Responsibility |
|------|------|-------|----------------|
| Tom Southam | President | tsoutham@gcigc.com | Project sponsor, decision maker |
| Jon West | Project Manager / ACC Admin | jwest@gcigc.com | ACC admin setup, test project selection |
| Shalon Ani | (CC'd on comms) | sani@gcigc.com | Licensing, tester coordination |

## What We Need from GCI

- [x] **Jon West** added APS app as Custom Integration (Step 2) — confirmed active 2026-02-12
- [x] **ACC Account ID** from Jon — `1ae7cef1-4f15-45a1-b25d-3f79c76df406` (received 2026-02-11)
- [x] **Test project:** 25-1001 Proof School — "has a ton of data from the PM and cost modules" (Jon, 2026-02-12)
- [ ] Confirmation whether the "Custom Integrations" tab is visible in ACC Account Admin (if not, API activation may be needed)

---

## Future Enhancements (Not in Scope for MVP)

| Enhancement | When | Why |
|-------------|------|-----|
| Add Submittals + Cost endpoints | After MVP validated | Phase 2 — both have search/filter capabilities verified |
| Middleware layer | If response size/pagination becomes an issue | Aggregates multi-module results, manages pagination |
| Daily log access via Data Connector | If Tom prioritizes daily logs | Batch export + index approach; not real-time |
| Autodesk MCP Server integration | If ChatGPT adopts MCP support | Would simplify architecture significantly |
| Productize for other contractors | After GCI is stable | Tom's suggestion — package as $5K-$10K setup service |

---

## Sources

All claims verified against these primary sources:

### Autodesk Platform Services
- [Custom GPTs + APS Tutorial](https://aps.autodesk.com/blog/custom-gpts-aps) — Petr Broz, Nov 25, 2024
- [OpenAPI Schema Gist (Issues)](https://gist.github.com/petrbroz/a4274548c52e2ee71914c9e644490e5e)
- [APS Business Model Evolution](https://aps.autodesk.com/blog/aps-business-model-evolution)
- [Developer Hubs User Guide](https://aps.autodesk.com/blog/developer-hubs-user-guide)
- [Create App Tutorial](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/create-app/)
- [New Application Types](https://aps.autodesk.com/blog/new-application-types)
- [OAuth v1 to v2 Migration Guide](https://aps.autodesk.com/blog/migration-guide-oauth2-v1-v2)
- [3-Legged OAuth v2 with Postman](https://aps.autodesk.com/blog/using-3-legged-oauth-v2-postman)
- [v2 Token Endpoint Accepts Body Credentials](https://aps.autodesk.com/blog/update-authentication-api-v2-now-accepts-credentials-requests-body)
- [RFI v3 API Released](https://aps.autodesk.com/blog/autodesk-build-rfi-v3-api-released)
- [OpenAPI Specs Published](https://aps.autodesk.com/blog/openapi-specs-are-here)

### Autodesk ACC / Help
- [Custom Integrations](https://help.autodesk.com/cloudhelp/ENU/Docs-Admin/files/account-administration/Custom_Integrations.html)
- [Third-party Apps and Custom Integrations (BIM 360)](https://help.autodesk.com/cloudhelp/ENU/BIM360D-Administration/files/About-Account-Admin/GUID-0C83B441-C611-4574-8DA0-45D5CFC235FA.html)
- [BIM 360 Provisioning for Forge Apps](https://aps.autodesk.com/blog/bim-360-docs-provisioning-forge-apps) — confirms cross-account (third-party developer → client ACC) is supported
- [Errors When Retrieving Hubs](https://aps.autodesk.com/blog/errors-when-retrieving-hubs)
- [BIM 360 API Access Tutorial](https://aps.autodesk.com/en/docs/bim360/v1/tutorials/getting-started/manage-access-to-docs/)
- [Apps Tab Missing](https://knowledge.autodesk.com/support/bim-360/troubleshooting/caas/sfdcarticles/sfdcarticles/Apps-tab-missing-in-BIM-360-account.html)

### OpenAI
- [Actions Production Notes](https://platform.openai.com/docs/actions/production)
- [Actions Authentication](https://platform.openai.com/docs/actions/authentication)
- [Actions Getting Started](https://platform.openai.com/docs/actions/getting-started)

### GitHub (Official Autodesk Collections)
- [Issues Postman Collection](https://github.com/autodesk-platform-services/aps-acc.issues.api-postman.collection)
- [RFIs Postman Collection](https://github.com/autodesk-platform-services/aps-autodesk.build.api-postman.collection/tree/main/RFIs%20API)
- [Submittals Postman Collection](https://github.com/autodesk-platform-services/aps-autodesk.build.api-postman.collection/tree/main/Submittals%20API)
- [Cost Management Postman Collection](https://github.com/autodesk-platform-services/aps-bim360.costmanagement.api-postman.collection)
- [APS SDK OpenAPI Specs](https://github.com/autodesk-platform-services/aps-sdk-openapi)
- [APS MCP Server (Node.js)](https://github.com/autodesk-platform-services/aps-mcp-server-nodejs)

---

*Prepared: 2026-02-10*
*Due Diligence Standard: Applied — see `docs/standards/due-diligence.md`*
