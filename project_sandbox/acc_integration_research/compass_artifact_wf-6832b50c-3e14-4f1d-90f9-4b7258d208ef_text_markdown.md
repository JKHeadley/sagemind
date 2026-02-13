# ACC-to-ChatGPT integration is feasible and officially demonstrated

**Yes, direct API integration between Autodesk Construction Cloud and a ChatGPT Enterprise Custom GPT is technically feasible and has been proven.** Autodesk's own Platform Services team published a working tutorial in November 2024 showing a Custom GPT querying ACC Issues via APS OAuth2 — the exact architecture you're considering. The APS OAuth2 Authorization Code flow is fully compatible with ChatGPT's Action system, all endpoints share the `autodesk.com` domain (satisfying ChatGPT's domain-matching requirement), and multiple Actions can coexist in a single GPT — meaning your existing Egnyte integration and a new ACC integration can live side-by-side.

That said, this is not a plug-and-play solution. ACC has **no unified search API** — you must query each module (Issues, RFIs, Submittals, Cost) individually, which means your OpenAPI schema will need multiple endpoint definitions. Daily Logs have no real-time API at all. And ChatGPT's Action constraints (45-second timeout, 100K character response limit, no binary file handling) will shape what's practical without middleware. Below is a complete breakdown.

---

## The ACC API landscape requires module-by-module integration

ACC exposes its data through Autodesk Platform Services (APS) as a collection of **separate REST/JSON APIs per module**, all served from `https://developer.api.autodesk.com`. There is no single endpoint that searches across submittals, RFIs, change orders, and documents simultaneously. Each module must be queried independently and results merged client-side (or by the GPT itself).

**Document Management** uses the APS Data Management API v2 (`/data/v1/` and `/project/v1/`). Key endpoints include listing hubs, projects, folder contents, and a folder-scoped search endpoint (`GET /data/v1/projects/:project_id/folders/:folder_id/search`) that filters by file name, type, and creation date. Project IDs require a `b.` prefix in this API. Downloading files requires obtaining a signed S3 URL from version metadata.

**Issues / Punchlist** lives at `/construction/issues/v1/projects/:projectId/issues` with filtering by status, type, assignee, and custom fields. **RFIs** are at `/construction/rfis/v2/` (with v3 released in 2024–2025 adding custom attributes) and include a dedicated search endpoint: `POST /v2/projects/:projectId/search:rfis`. **Submittals** are at `/construction/submittals/v1/projects/:projectId/items` with filtering support. **Cost Management** — covering budgets, contracts, and the full change order workflow (PCO → RFQ → SCO/COR) — is at `/cost/v1/containers/:containerId/` and requires first retrieving the project's cost container ID.

**Daily Logs have no real-time REST API.** This is a known gap. Daily log data is accessible only through the Data Connector API, which produces asynchronous CSV batch exports — unsuitable for interactive search in a Custom GPT. The Forms API (`/construction/forms/v1/`) provides read-only access to form templates (including daily-log type templates) but not individual daily log entries.

Most ACC APIs use **offset-based pagination** (`limit`, `offset`, `totalResults`, `nextUrl`). Rate limits vary by module and are documented per-API at `aps.autodesk.com/en/docs/acc/v1/overview/rate-limits/`. The authentication endpoint itself allows **500 requests/minute**.

---

## APS OAuth2 maps directly to ChatGPT's Action auth model

The authentication story is straightforward. APS supports **three-legged OAuth2 (Authorization Code flow)**, which is exactly what ChatGPT Custom GPT Actions require. The configuration maps one-to-one:

| ChatGPT Action field | APS value |
|---|---|
| Client ID | Your APS app's Client ID |
| Client Secret | Your APS app's Client Secret |
| Authorization URL | `https://developer.api.autodesk.com/authentication/v2/authorize` |
| Token URL | `https://developer.api.autodesk.com/authentication/v2/token` |
| Scope | `data:read account:read` (minimum for read-only ACC access) |
| Callback URL | `https://chatgpt.com/aip/{g-YOUR-GPT-ID}/oauth/callback` |

Access tokens last **60 minutes**, refresh tokens last **15 days** (single-use; each refresh returns a new pair). ChatGPT handles token refresh automatically. APS also supports **PKCE**, though the standard Authorization Code flow with client secret is sufficient for Custom GPT Actions.

**Per-user permissions are fully enforced** through three-legged OAuth. When a user authenticates, API responses return only data they have access to in ACC — respecting account-level provisioning, project membership, module access, and folder/file permissions. This means your "GCI Data Scout" GPT will automatically inherit each user's ACC permission boundaries, just as it does with Egnyte.

For read-only access to documents, submittals, RFIs, and cost data, the minimum scopes are **`data:read`** and **`account:read`**. Add `data:search` if using the folder search endpoint, and `viewables:read` if you want 3D/2D model viewer integration. All write scopes can be omitted entirely.

---

## Access is free, but requires an ACC admin provisioning step

**Any developer can register an APS app immediately** at `aps.autodesk.com/myapps/` — no partner agreement, App Store listing, or Autodesk Developer Network membership required. Registration is free and instant.

However, there is one critical administrative gate: **an ACC Account Administrator must add your app as a "Custom Integration"** in the ACC Account Admin portal. This is done by navigating to Custom Integrations → Add Custom Integration → entering your app's Client ID. Without this step, all API calls to ACC data will return **403 Forbidden** errors. For ACC accounts created after February 2021, API access is enabled by default; older accounts may need activation via `bim360appsactivations@autodesk.com`.

**Cost is not a barrier.** As of December 2025, APS operates a two-tier business model. The ACC-specific APIs (Account Admin, Issues, Cost, Documents via Data Management, RFIs, Submittals) are all classified as **non-rated (free) APIs**. Only Model Derivative (CAD file translation), Automation API, Reality Capture, and Flow Graph Engine are paid "rated" APIs requiring Flex tokens. For your search use case, **API access is included at no additional cost** beyond the existing ACC subscription.

**Regarding AI/LLM usage restrictions**: Autodesk updated its Terms of Use on December 8, 2025, with an explicitly **pro-AI stance**. The updated terms clarify that customers may train models on their own data, and data scraping restrictions apply only to Autodesk's own content — not customer project data. Autodesk's APS team has published `llms.txt` files to help AI coding assistants generate APS API code, and the APS homepage now explicitly references "generative AI, agentic systems, or MCPs." There is no prohibition on sending ACC API data to third-party LLMs, though standard data privacy obligations apply (particularly for EU-hosted ACC accounts under GDPR).

---

## A working Custom GPT schema already exists — here's the architecture

Autodesk engineer Petr Broz published the exact integration pattern at `aps.autodesk.com/blog/custom-gpts-aps` (November 2024), including a complete OpenAPI 3.1.0 schema on GitHub (`gist.github.com/petrbroz/a4274548c52e2ee71914c9e644490e5e`) for querying ACC Issues. This schema defines three endpoints: get issue types, list issues with filters, and get issue details — demonstrating the pattern you would replicate for RFIs, submittals, and cost data.

**The recommended architecture for your use case is two separate Actions in one Custom GPT:**

```
"GCI Data Scout" Custom GPT
  ├─ Action 1: Egnyte (existing) → Egnyte OAuth → Egnyte v2 Search API
  └─ Action 2: ACC (new)        → APS OAuth    → ACC APIs
```

Each Action has its own OpenAPI schema and OAuth configuration. Users authenticate to each service independently. The GPT's system instructions direct it to choose the appropriate API based on the user's query (e.g., "search submittals" → ACC, "find specs on the shared drive" → Egnyte).

**The minimum viable OpenAPI schema for ACC project search** would include these endpoints:

- `GET /project/v1/hubs` — List available ACC accounts
- `GET /project/v1/hubs/{hub_id}/projects` — List projects
- `GET /data/v1/projects/{project_id}/folders/{folder_id}/search` — Search documents
- `GET /construction/issues/v1/projects/{projectId}/issues` — Search issues
- `POST /construction/rfis/v2/projects/{projectId}/search:rfis` — Search RFIs
- `GET /construction/submittals/v1/projects/{projectId}/items` — List submittals
- `GET /cost/v1/containers/{containerId}/change-orders` — List change orders
- `GET /cost/v1/containers/{containerId}/budgets` — List budget items

**Key constraints to design around:**

- **45-second timeout**: Most ACC API calls complete well within this, but complex queries across large projects could occasionally be tight.
- **100,000 character response limit**: Large project file listings or hundreds of issues could exceed this. Mitigation: set conservative `limit` parameters (e.g., 20–50 results per call) in your schema defaults and use filter parameters aggressively.
- **No binary file downloads**: GPT Actions handle text/JSON only. You cannot download PDFs or drawings through the Action directly — only metadata and signed URLs. The GPT can return a download link for the user to click.
- **Pagination is not automatic**: ChatGPT will not follow `nextUrl` links without explicit prompting. Your system instructions should tell the GPT to offer "load more results" when pagination indicates additional pages exist.
- **POST for RFI search**: The RFI search endpoint uses POST with a JSON body. GPT Actions support POST with `requestBody`, but these are flagged as "consequential" actions requiring user confirmation unless you set `x-openai-isConsequential: false` in the schema.

**Middleware is optional but recommended for production scale.** A direct integration (no middleware) works for an MVP and proof-of-concept. Add a lightweight middleware layer (AWS Lambda, Google Cloud Function, Azure Function) if you need pagination aggregation across modules, response size management, text extraction from ACC-stored documents, or a unified search endpoint that fans out queries to multiple ACC APIs in parallel.

---

## Others have proven the pattern, and Autodesk is investing heavily in AI

**Confirmed implementations and resources:**

**Autodesk's official tutorial** (November 2024) demonstrates a Custom GPT querying ACC Issues via APS OAuth2 with a working OpenAPI schema. This is the closest existing reference to what you're building.

**Sunway Construction** (presented at Autodesk University 2023) built a RAG system extracting ACC Files, embedding them via OpenAI's API into a vector store, and creating a Q&A knowledge management system for construction data. Their approach used batch extraction rather than real-time API calls.

**Autodesk Assistant** is Autodesk's own native agentic AI, now available within ACC itself. It can access, validate, and summarize ACC project data using natural language prompts. While it competes with a Custom GPT approach, it validates the market demand for conversational access to construction data.

**APS MCP Server** (GitHub: `autodesk-platform-services/aps-mcp-server-nodejs`) provides ACC project and issues access via the Model Context Protocol, working with **Claude Desktop, VS Code, and Cursor** — but not ChatGPT, which uses REST-based Actions rather than MCP. If ChatGPT adopts MCP support in the future, this becomes a direct integration path.

**Workato** offers a public beta connector for ACC that can link to custom LLM endpoints. **Datagrid** provides AI-focused data extraction from ACC. **Toric** exposes 25+ ACC API endpoints through a no-code interface with scheduling capabilities.

---

## If direct API integration proves too complex, several mirroring paths exist

**The strongest alternative is the Egnyte-ACC native sync**, launched September 2025. This provides one-way sync of ACC documents and project metadata directly into Egnyte — meaning your existing Egnyte-connected Custom GPT would automatically gain access to ACC documents without any additional API integration. Configuration is straightforward (requires APS app credentials set up by an ACC admin) and is available on most Egnyte plans with Project Hub.

However, this sync covers **files and metadata only** — not structured construction data like RFIs, submittals, change orders, or cost items. For those, consider these approaches:

- **ACC Connect (Workato)**: Autodesk's own iPaaS, connecting to 200+ systems. Can push RFIs, Issues, cost data to external stores (Google Sheets, Airtable, databases) that a Custom GPT or middleware can query. No-code/low-code setup with continuous or scheduled data flows.
- **Data Connector API**: Built-in ACC feature for scheduled bulk exports (daily/weekly/monthly) of cross-project data across all modules. Output is structured data accessible via signed URLs. Ideal for populating a searchable store that your GPT can query.
- **APS Webhooks**: Real-time event notifications for Issues (`issue.created`, `issue.updated`), Reviews, and file/folder changes. Webhook payloads can trigger a Lambda/Cloud Function that fetches full records and stores them externally. Note: webhooks do **not** currently cover submittals, RFIs, change orders, or cost data — only Issues, Reviews, and Data Management events.

| Approach | Data types | Latency | Complexity | Cost |
|---|---|---|---|---|
| Direct APS API (Custom GPT Action) | All modules except Daily Logs | Real-time | Medium-High | Free (API) |
| Egnyte native sync | Documents + metadata only | Near real-time | Low | Included with Egnyte |
| ACC Connect (Workato) | All modules | Continuous/scheduled | Medium | Per-connection pricing |
| Data Connector (bulk export) | All modules | Batch (daily+) | Low-Medium | Included with ACC |
| APS Webhooks → external store | Issues, Reviews, Files only | Real-time | High | Free (API) + hosting |

---

## Conclusion: recommended path forward

The direct integration path is proven and practical. **Start with a direct Custom GPT Action calling ACC APIs** using the Autodesk-published tutorial as your template. Your first iteration should cover Issues, RFIs, and Submittals — the modules most commonly searched by field teams — using three-legged OAuth with `data:read account:read` scopes. This requires only registering an APS app (free, instant) and having your ACC admin add it as a Custom Integration.

**The daily logs gap is the biggest limitation** — there is no real-time API, so daily log search will require the Data Connector batch export approach or waiting for Autodesk to release a dedicated API. Cost Management data (change orders, budgets) is fully accessible but adds schema complexity due to the container-ID lookup step.

For a phased rollout, consider: **(1)** Enable the Egnyte-ACC native sync immediately for document access through your existing GPT. **(2)** Build the ACC API Action for Issues, RFIs, and Submittals as an MVP. **(3)** Add Cost Management endpoints once the pattern is validated. **(4)** Implement a middleware layer only if you hit pagination or response-size limits in production. **(5)** Watch Autodesk's MCP server roadmap — if ChatGPT adopts MCP support, this could simplify the entire integration significantly.