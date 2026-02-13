# Feasibility of integrating Autodesk Construction Cloud data with a ChatGPT Enterprise Custom GPT via API

## Executive assessment

A direct (API-to-API) integration between Autodesk Construction Cloud data and a ChatGPT Enterprise Custom GPT is **feasible**, but it is best described as **“yes, with constraints”** for a general contractor project-search experience. The “yes” comes from the fact that Autodesk exposes REST APIs (under Autodesk Platform Services, formerly Forge) for major ACC modules—**Account Admin (projects/users), Issues, Submittals, RFIs (v3, with text search), Cost Management (including change orders), and Data Connector (batch extracts including daily logs)**—and OpenAI’s Custom GPT Actions can authenticate via OAuth and call REST endpoints described in OpenAPI schemas. citeturn31search5turn36view0turn33search0turn33search5turn27view0turn28search6turn38search0

The main constraints for a “single search box” experience are: **(a) there is no single, unified cross-module ACC search endpoint**, so you typically query each module separately (or build your own aggregation layer); **(b) permissions and roles matter heavily**, and many “vertical module” APIs are **user-context/3‑legged OAuth**; and **(c) some desired datasets (notably daily logs)** are most practically accessed via **Data Connector’s extraction jobs** (CSV + signed download URLs) rather than a low-latency query API. citeturn27view0turn25search2turn38search0turn29search3turn29search6

## ACC and APS API landscape for project search

Autodesk’s ACC APIs are best understood as a **portfolio of module-specific APIs** rather than one unified query service. Autodesk’s own ACC overview material explicitly breaks capabilities out into separate API “field guides” and references (for example, **Account Admin**, **Cost Management**, and others). citeturn31search5turn31search2turn28search7turn30search0

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["Autodesk Construction Cloud modules Docs Build Cost Issues RFIs Submittals","Autodesk Platform Services developer portal screenshot"],"num_per_query":1}

### Project and user discovery

For a Custom GPT to “search within the right project,” you typically need a reliable way to enumerate projects (and/or map project names to IDs). ACC’s **Account Admin API** provides “projects in an account” endpoints such as:

- `GET https://developer.api.autodesk.com/construction/admin/v1/accounts/:accountId/projects` citeturn31search4  
- Related endpoints (project detail, project users) are documented alongside this family. citeturn31search0turn31search3

This matters because most “vertical module” APIs (issues/RFIs/submittals/cost) are keyed by an ACC project identifier (often a UUID) rather than your internal job number, and the assistant will need either a lookup step or a pre-configured mapping to know which IDs to query. citeturn31search4turn29search8turn27view0turn28search6

### Documents and file metadata/content

ACC “Docs” style file access and metadata is handled through Autodesk’s **Data Management** and storage services (and, for raw object transfer, the **Object Storage Service/OSS**). Autodesk’s OSS spec describes downloading/uploading raw files managed by the data service. citeturn16search8

For **searching within documents**, Autodesk provides a Data Management search endpoint scoped to a *folder subtree*:

- `GET .../projects/{project_id}/folders/{folder_id}/search` (recursive folder filtering/search via query parameters). citeturn26search6turn26search19turn26search1

This is not a “global search across all folders in a project” by itself; it is a **folder-rooted** search pattern, which is workable if you start from the project’s top folder(s) or a known “Project Files” root. citeturn26search6turn26search19

For reading metadata about items, versions, etc., Autodesk documents item endpoints such as:

- `GET projects/:project_id/items/:item_id` (Data Management). citeturn26search17

For “download file content,” many ACC-related workflows ultimately resolve to a storage/object URN and then retrieve the object content from storage services; Autodesk’s RFI v3 guidance is explicit that **attachment binaries are managed by the Data Management API** and referenced by storage URNs. citeturn27view0turn16search8

### Issues

The ACC **Issues API** supports listing issues (and related configuration like issue types). A key feasibility detail is that the Issues reference explicitly states that requests must use a bearer token obtained via a **three-legged OAuth flow**. citeturn25search2turn25search38

This is also the module Autodesk used in its own “Custom GPTs + APS” walkthrough, demonstrating “Custom GPT Actions → Issues endpoint calls” as a working pattern. citeturn36view0

### Submittals

Submittals are exposed via a dedicated Submittals API with endpoints such as:

- `GET https://developer.api.autodesk.com/construction/submittals/v2/projects/:projectId/items` (list submittal items). citeturn29search8  
- Attachment endpoints such as `POST .../items/:itemId/attachments` are documented. citeturn38search20

Autodesk’s GA announcement for the Submittals API describes it as GA and highlights a set of (at least initially) **read-only endpoints** for retrieving submittal-related data (items, packages, attachments, responses, etc.). citeturn22search13

A practical search implication: Submittals commonly support **listing and filtering**, but not necessarily rich “full-text search across everything” in the way a file system search API might. Your assistant experience may lean on filtering (status, spec section, package, assignee, etc.) plus on-document search for any attached files (via Data Management/Docs). citeturn29search8turn26search6turn26search1

### RFIs

RFIs are a strong point for your “search” use case because Autodesk’s **RFI v3 API** (GA as of July 22, 2025) explicitly introduces a **search endpoint**:

- Base: `/construction/rfis/v3/projects/:projectId`  
- Search: `POST /search:rfis` (returns RFIs and can “search by text or filter by attributes”). citeturn27view0

That is the closest Autodesk currently documents to a “module-native text search” for GC workflows (in contrast to “list and filter only”). The same post also describes how RFI attachments are handled through Data Management and storage URNs (important for downloading and for any downstream indexing). citeturn27view0

### Cost management and change orders

ACC cost/financial data is exposed via the **Cost Management API**, including explicit endpoints for **change orders**:

- `GET change-orders` (list all change orders in a project). citeturn28search6  
- `GET change-orders/:changeOrder` and `GET change-orders/:changeOrder/:id` (type-scoped list and detail). citeturn28search0turn28search3  
- Mutations like `POST change-orders/:changeOrder` and `PATCH change-orders/:changeOrder/:id` are documented. citeturn28search9turn28search12

Autodesk also ships sample code illustrating Cost Management data exchange (budgets, contracts, cost items, change orders), demonstrating that “pull cost objects for reporting/search” is not just theoretical. citeturn28search22

### Daily logs

Daily logs are the hardest fit for a “low-latency, interactive search API call” pattern. The practical Autodesk-supported approach is typically **Data Connector**, which is designed to run extraction jobs and then download resulting datasets (commonly as CSV). This is reflected both in community guidance and Autodesk’s own Data Connector documentation structure (requests → jobs → files). citeturn29search3turn38search0turn38search8turn38search9turn30search0

The Data Connector request endpoint family is explicitly documented as:

- `POST https://developer.api.autodesk.com/data-connector/v1/accounts/:accountId/requests` citeturn38search0  
- `GET https://developer.api.autodesk.com/data-connector/v1/accounts/:accountId/requests` citeturn38search2  
- Follow-on endpoints for request detail, request jobs, jobs listing, etc., are documented in the same reference set. citeturn38search7turn38search8turn38search9

This is compatible with “dailylogs” as an extractable service group (along with issues/rfis/submittals/cost…), which is frequently how customers operationalize analytics-style access to daily logs. citeturn38search15turn29search3

## Authentication, scopes, and permissioning implications

### Autodesk OAuth reality: three-legged vs two-legged and PKCE

Autodesk Platform Services uses OAuth 2.0 across services. Autodesk’s OAuth documentation covers both authorization and token endpoints, and the authorize reference shows PKCE parameters (`code_challenge`, `code_challenge_method`). citeturn32search7turn32search0turn32search19turn32search1

Autodesk explicitly documents both:

- **Authorization Code Grant** (optimized for confidential clients). citeturn32search15  
- **Authorization Code Grant with PKCE** (optimized for public clients; also strongly recommended more broadly). citeturn32search2turn32search5

### Per-user permissioning: required for many ACC modules

For your GC “project search” use case, the strongest security and usability model is **per-user authentication** where ACC permissions naturally shape results. Many ACC endpoints are documented as requiring user-context tokens; a concrete example is the Issues API, which explicitly requires a bearer token obtained through a **three-legged OAuth flow**. citeturn25search2turn25search38

Similarly, Submittals listing is explicitly framed as returning items the **user has permission to view**, with role-based constraints (e.g., manager access noted in the reference). citeturn29search8

Data Connector is also described in practice and tooling as **3‑legged token only** and tied to a user context. citeturn38search21turn38search7

The net of this: **yes**, Autodesk’s ACC/APS APIs can support “results respect individual user permissions,” but you should assume that **3‑legged OAuth** (user login + consent) is the standard path for many of the high-value ACC datasets you listed (issues, RFIs, submittals, cost, data connector). citeturn25search2turn27view0turn29search8turn28search6turn38search21

### Scopes you should expect to request

Autodesk’s OAuth docs define scopes (for example, `data:read` enables reading data; `account:read` is used for account-level operations). citeturn32search1turn32search11turn32search4

Autodesk’s own Issues tutorial guidance demonstrates that “creating issues” uses a 3‑legged token and explicitly mentions scopes like `data:write` and `account:read` for that workflow. citeturn25search26

For a **read-only search assistant**, you typically try to keep scopes minimal (commonly starting with `data:read`, then adding only what specific endpoints require). Autodesk’s own “Custom GPTs + APS” walkthrough uses `data:read` in the GPT Action OAuth configuration. citeturn36view0turn32search1

## Custom GPT Action integration feasibility and OpenAPI MVP

### Can a Custom GPT Action perform Autodesk OAuth?

OpenAI’s documentation for GPT Action authentication states that, in the GPT editor UI, you can select OAuth and configure **client ID, client secret, authorization URL, token URL, and scope**, and that OpenAI stores an encrypted version of the client secret. citeturn33search0

Autodesk’s “Custom GPTs + APS” post demonstrates this exact pattern end-to-end with APS OAuth endpoints:

- Authorization URL: `https://developer.api.autodesk.com/authentication/v2/authorize`  
- Token URL: `https://developer.api.autodesk.com/authentication/v2/token` citeturn36view0

So, in practical terms: **yes**, there is a proven reference implementation from Autodesk showing that a Custom GPT can authenticate to APS and call an ACC module API. citeturn36view0

### PKCE considerations

APS supports PKCE (and the authorize endpoint documents PKCE parameters). citeturn32search0turn32search2

However, the Custom GPT Actions OAuth configuration described by OpenAI focuses on client ID/secret plus URLs (a classic confidential-client pattern) and does not describe PKCE-specific configuration knobs. citeturn33search0turn33search5

In the field, some builders report issues when the identity provider enforces PKCE in a way incompatible with Actions (for example, “code challenge required” errors). While this is community-reported and not definitive product documentation, it is a realistic risk to plan around when integrating with OAuth systems that mandate PKCE. citeturn33search3turn33search30

### Do you need middleware, or can the GPT call Autodesk directly?

You *can* call Autodesk endpoints directly from the GPT Action (as Autodesk demonstrates for Issues). citeturn36view0turn25search2

But for your specific use case—**a GC-grade “search across submittals, RFIs, change orders, daily logs, and financials”**—a middleware/proxy layer is often the more robust design because it can:

- Normalize multiple module APIs into one “search” contract (since Autodesk does not provide a single cross-module search API). citeturn31search5turn27view0turn28search6turn29search8  
- Implement pagination/limits consistently and keep Action responses small while still returning “top N results” per entity type. citeturn25search1turn25search5turn25search17  
- Centralize caching and rate-limit handling against Autodesk rate limits. citeturn25search1turn25search5turn25search17  
- Handle Data Connector’s “jobs + file download” workflow without forcing the GPT to juggle multi-step extraction mechanics in real time. citeturn38search0turn38search8turn38search9

### Minimum viable OpenAPI schema patterns

OpenAI states that a GPT Action requires an OpenAPI schema describing the endpoints it can call. citeturn33search5turn33search0

There are two realistic MVP options:

**Direct-to-Autodesk MVP (multi-action):** expose a handful of Autodesk endpoints as distinct Actions (e.g., list projects, search RFIs, list submittals, get change orders). Autodesk has demonstrated this approach with Issues and OpenAPI. citeturn36view0turn25search2turn29search8turn28search6turn27view0turn26search6

**Proxy MVP (single search action):** expose *one* `POST /search` endpoint on your middleware, and let that service call Autodesk module APIs, aggregate, and return a normalized response. This approach is not “required,” but it is often the only way to offer a truly unified search UX given the module-by-module nature of ACC APIs. citeturn31search5turn27view0turn28search6turn29search8

Below is a **minimal illustrative** “direct-to-Autodesk” OpenAPI 3.1 skeleton showing the *shape* of endpoints you would likely include for an MVP search assistant (projects + RFIs + submittals + cost change orders + folder search). The exact request/response schemas should be copied from Autodesk’s API references and constrained to the subset of fields your GPT needs.

```yaml
openapi: 3.1.0
info:
  title: ACC Search MVP (Direct)
  version: 0.1.0
servers:
  - url: https://developer.api.autodesk.com
paths:
  /construction/admin/v1/accounts/{accountId}/projects:
    get:
      operationId: listAccProjects
      parameters:
        - name: accountId
          in: path
          required: true
          schema: { type: string }
      responses:
        "200":
          description: Projects in account

  /construction/rfis/v3/projects/{projectId}/search:rfis:
    post:
      operationId: searchRfis
      parameters:
        - name: projectId
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                text:
                  type: string
                filters:
                  type: object
      responses:
        "200":
          description: RFIs matching text/filters

  /construction/submittals/v2/projects/{projectId}/items:
    get:
      operationId: listSubmittals
      parameters:
        - name: projectId
          in: path
          required: true
          schema: { type: string }
      responses:
        "200":
          description: Submittal items visible to user

  /construction/cost/v1/projects/{projectId}/change-orders:
    get:
      operationId: listChangeOrders
      parameters:
        - name: projectId
          in: path
          required: true
          schema: { type: string }
      responses:
        "200":
          description: Change orders in project

  /data/v1/projects/{dmProjectId}/folders/{folderId}/search:
    get:
      operationId: searchDocsFolder
      parameters:
        - name: dmProjectId
          in: path
          required: true
          schema: { type: string }
        - name: folderId
          in: path
          required: true
          schema: { type: string }
        - name: filter[displayName]
          in: query
          required: false
          schema: { type: string }
      responses:
        "200":
          description: Folder-recursive search results
```

The endpoint families above are directly grounded in Autodesk’s documentation for Account Admin project listing, RFI v3 search, Submittals items, Cost change orders, and Data Management folder search. citeturn31search4turn27view0turn29search8turn28search6turn26search6

## Provisioning, rate limits, costs, and terms that can become blockers

### Provisioning and “API access is not automatic”

Autodesk provides step-by-step ACC guidance for enabling an application to access ACC via “Custom Integrations” in Account Administration, and the ACC tutorials index explicitly frames this setup flow. citeturn25search0turn36view0turn25search4

In practice, this provisioning step frequently becomes the first non-technical blocker: you need an ACC account admin to authorize the integration at the account level (and you may need to coordinate with the right region/account context). citeturn25search0turn25search4turn31search2

### Rate limits and pagination are not optional design details

Autodesk publishes ACC rate limit guidance, including module-specific pages (for example, Issues). citeturn25search1turn25search5turn25search17

For Issues, Autodesk documents limits in terms of requests per minute per user (and emphasizes traffic by end user). citeturn25search5

For Cost Management, Autodesk documents a much higher overall service limit (thousands of requests per minute) but also frames it as a shared service constraint requiring responsible client behavior. citeturn25search17turn28search7

These constraints reinforce why a “search assistant” should either (a) query narrowly and paginate, or (b) rely on an indexed mirror for broad, cross-project queries. citeturn25search1turn25search5turn25search17turn30search21

### APS commercial model and potential costs

Autodesk’s APS offering page describes a **Free** tier (with monthly limits for some APIs), plus paid tiers (Prepay and Pay‑as‑you‑go), and notes that a payment method is required even for free tier identity verification. citeturn34view2turn25search25

Separately, Autodesk announced updates to APS-related terms that explicitly reference “new payment options for APIs” and consolidation with Autodesk Developer Network program terms. citeturn25search3turn34view1

For your specific ACC search scenario, most of the ACC module APIs you listed are not described (in Autodesk’s public pricing messaging) as “rated” in the same way as compute-heavy services, but **you should still treat commercial terms and quotas as a feasibility dimension**—especially if you scale to many users/projects and run broader searches. citeturn34view2turn25search25turn25search1

### Terms and restrictions relevant to LLM usage

Autodesk’s Acceptable Use Policy includes a clause prohibiting using Autodesk offerings to “reverse engineer or replicate the functionality” of an offering, **including through training of any machine learning or artificial intelligence algorithm or model**. citeturn35view0

This does **not** automatically prohibit using ACC data inside a search assistant for project delivery, but it is a concrete compliance boundary: avoid any design that could be construed as training a model to reproduce Autodesk product behavior/functions, and ensure data handling aligns with Autodesk’s permitted API usage paths (not scraping UI endpoints or bypassing mechanisms). citeturn35view0turn34view1

## Direct integration compared with data mirroring approaches

Direct integration (Custom GPT → Autodesk APIs) is strongest when you need **real-time answers** and **strict permission fidelity** (the user sees what they can see in ACC). The RFI v3 `POST /search:rfis` endpoint is an example of a direct-search-friendly workflow, and Issues/Submittals/Cost all support retrieval suitable for “show me the latest items matching …” queries. citeturn27view0turn25search2turn29search8turn28search6turn36view0

Data mirroring approaches become attractive when you want any of the following:

- **One unified search** across heterogeneous objects (RFIs + submittals + change orders + daily logs + attachments) without fanning out to multiple APIs on every user query. citeturn31search5turn27view0turn28search6turn29search8  
- **Low-latency, high-recall retrieval** where you can pre-index content and return ranked results without hammering Autodesk rate limits. citeturn25search1turn25search5turn25search17  
- **Daily logs and other analytics-style datasets** where Autodesk’s first-class path is Data Connector exports. citeturn38search0turn29search3turn30search21

Autodesk’s own marketing for the Data Connector positions it as a tool to extract data “across all projects” and reduce the need for expensive APIs/custom code in analytics contexts. citeturn30search21

From a feasibility standpoint, a common hybrid is:

- Use **direct APIs** for “interactive” objects (RFIs, issues, submittals, change orders). citeturn27view0turn25search2turn29search8turn28search6  
- Use **Data Connector** as a scheduled/batch feed for daily logs and other large datasets, then index them in your own search store (optionally mirrored into your existing document system if that is already integrated). citeturn38search0turn38search8turn38search9turn29search3  
- Use **Webhooks** where appropriate so your mirror/index stays current (Cost Management endpoints and events are explicitly described as webhook-capable, and Autodesk documents specific cost events such as `budget.updated-1.0`). citeturn28search7turn28search15

## Evidence of prior integrations and Autodesk’s AI direction

There is direct precedent for “ACC data → Custom GPT via Actions” from Autodesk itself. The “Custom GPTs + APS” blog post provides a worked example: define an OpenAPI schema for endpoints (Issues), configure GPT Actions OAuth to APS, register the callback URL, and query project issues from a Custom GPT. citeturn36view0

Autodesk has also invested in making APS easier to consume via OpenAPI specifications. Autodesk’s own APS community blog demonstrates generating client SDKs from Autodesk-published OpenAPI specs (Data Management, OSS, Model Derivative, and ACC Issues) using Microsoft Kiota, referencing raw OpenAPI YAML files hosted on GitHub. citeturn19view0turn16search3turn17view1

Autodesk University programming has explicitly framed OpenAPI as a way to “empower AI agents to interact with Autodesk Construction Cloud data in real time,” indicating that “LLM/agent integration” is a recognized direction in Autodesk’s developer ecosystem (even if not yet a turnkey enterprise product for your exact use case). citeturn22search4

On the “MCP server” question: Autodesk has published at least one official sample repository that creates an MCP server for Autodesk APIs (for example, an MCP server sample in .NET), demonstrating interest in MCP-style agent tooling even if there is not (yet) a single canonical “ACC MCP server” spanning every ACC module. citeturn15search11