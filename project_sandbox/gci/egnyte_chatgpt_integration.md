# GCI - Egnyte + ChatGPT Enterprise Integration

## Status: In Progress

**Client:** GCI (General Contractor)
**Egnyte Domain:** `gcigc.egnyte.com`
**ChatGPT Plan:** Enterprise
**Objective:** Enable GCI staff to search and retrieve Egnyte-hosted project documents (specs, drawings, submittals) directly from ChatGPT.

---

## Table of Contents

1. [Integration Options](#integration-options)
2. [Option A: Egnyte Remote MCP Server (Recommended)](#option-a-egnyte-remote-mcp-server-recommended)
3. [Option B: Custom GPT Action with OpenAPI Schema](#option-b-custom-gpt-action-with-openapi-schema)
4. [ChatGPT Enterprise Feature Notes](#chatgpt-enterprise-feature-notes)
5. [Verified API Reference](#verified-api-reference)
6. [Corrections from Prior AI Chat](#corrections-from-prior-ai-chat)
7. [Open Questions / Next Steps](#open-questions--next-steps)
8. [Sources](#sources)

---

## Integration Options

| Approach | Complexity | Auth Setup | Capabilities | Status |
|----------|-----------|------------|-------------|--------|
| **A: Egnyte MCP Server** | Low | Handled by Egnyte (OAuth auto-managed) | Search, fetch, ask, summarize (beta) | BLOCKED -- Egnyte must enable on their backend |
| **B: Custom GPT Action** | Medium | Manual OAuth2 config + OpenAPI schema | Search only (what you build) | **Active -- proceeding with this** |

**Status update (2026-02-03):** Option A is blocked. The Egnyte pre-built app is available and enabled in the ChatGPT Enterprise workspace ("AI Task Force"), and exposes 23 actions. However, on user authentication, Egnyte returns: *"MCP Server Access Unavailable — MCP Server connectivity is not enabled for your domain."* This is a domain-level entitlement that only Egnyte can enable on their backend — there is no self-service toggle in the Egnyte admin console. Proceeding with Option B while requesting Egnyte enable MCP access for `gcigc.egnyte.com`.

---

## Option A: Egnyte Remote MCP Server (Recommended)

### Prerequisites

Before starting, confirm the following with GCI:

- [ ] **Egnyte plan tier:** Must be Gen 4 (Essential, Elite, or Ultimate) or Gen 3 (Platform Enterprise or Platform Enterprise Light)
- [ ] **Egnyte Co-Pilot add-on:** Must be enabled (required for the Remote MCP Server)
- [ ] **ChatGPT Enterprise admin access:** Need an admin/owner to configure the connector
- [ ] **Egnyte domain confirmed:** `gcigc.egnyte.com`

### Setup Walkthrough

#### Step 1: Check if Egnyte is Available as a Pre-Built App

1. Log into ChatGPT Enterprise as a workspace **admin/owner**
2. Go to **Workspace Settings** (admin panel)
3. Navigate to the **Apps** tab
4. Look for **Egnyte** in the **Available** tab

**If Egnyte appears as a pre-built app:** Skip to Step 1A below.
**If Egnyte does NOT appear:** Skip to Step 1B below.

#### Step 1A: Enable Pre-Built Egnyte App

1. Click **Enable** on the Egnyte app
2. Configure **RBAC** (Role-Based Access Control) to set which user roles can access it
3. Use **Configure Actions** to select which tools are allowed (search, fetch, etc.)
4. Click **Publish** to make it available to workspace members
5. Skip to Step 3

#### Step 1B: Add as a Custom MCP Connector (Developer Mode)

**Enable Developer Mode:**
1. Go to **Workspace Settings > Permissions & Roles > Connected Data**
2. Toggle on **Developer mode / Create custom MCP connectors**
3. Optionally use RBAC to limit who can create connectors

**Create the Connector:**
1. In ChatGPT, go to **Settings > Connectors > Create**
2. Enter:
   - **Name:** `Egnyte` (or `GCI Document Search`)
   - **Description:** `Search and access GCI project files stored in Egnyte`
   - **Server URL:** `https://mcp-server.egnyte.com/mcp`
   - **Authentication:** Select **OAuth**
3. Click **Connect**

#### Step 2: Admin Authentication

1. You will be redirected to Egnyte's OAuth page
2. Enter the Egnyte domain: `gcigc` (or `gcigc.egnyte.com`)
3. Authenticate with admin Egnyte credentials
4. Grant the requested permissions
5. If successful, ChatGPT will detect the server's available tools

#### Step 3: Publish to Workspace

1. Go to **Workspace Settings > Apps > Drafts**
2. Click **Publish** on the Egnyte connector
3. In the publish modal:
   - Use **Configure Actions** to control which tools are available
   - Use RBAC to assign which roles can access it
4. The connector will appear in users' Apps settings (labeled "custom" if added via Developer Mode)

#### Step 4: End-User First-Time Setup

Each user must authenticate individually on first use:

1. Open a new ChatGPT conversation
2. Click the **+ (plus icon)** in the composer
3. Select **More**, then choose the **Egnyte** connector
4. On first use, the user is redirected to Egnyte's OAuth page
5. They authenticate with their **own** Egnyte credentials
6. After authentication, the connector works in all future conversations

> **Important:** Each user's access is scoped to their own Egnyte permissions. They can only search/retrieve files they already have access to in Egnyte.

### What Users Get

Once connected, users can:

| Capability | How It Works |
|------------|-------------|
| **Search files** | Ask ChatGPT to find documents (e.g., "Find the latest specs for 300 California") |
| **Retrieve file content** | ChatGPT can fetch and read document contents |
| **Deep Research integration** | Egnyte content is searchable as part of multi-source Deep Research queries |
| **Company Knowledge sync** | Egnyte content can be synced to workspace Company Knowledge for always-on access |

**With Developer Mode enabled, additional tools may be available:**

| Tool | Description |
|------|-------------|
| `advanced_search` | Search with metadata, date, and file type filters |
| `ask_document` | Ask natural-language questions about a specific document |
| `summarize_document` | AI-generated document summaries |
| `ask_copilot` | Cross-document analysis via Egnyte Copilot |
| `query_knowledge_base` | Search Egnyte Knowledge Bases |

> **Note:** Without Developer Mode, ChatGPT only supports the `search` and `fetch` tools. This is an OpenAI platform limitation, not an Egnyte one.

### Known Limitations (MCP Server)

- **Beta status:** The Egnyte Remote MCP Server is in beta as of February 2026
- **Read-only:** No upload, edit, or delete operations through the MCP server
- **Co-Pilot required:** The Remote MCP Server requires the Egnyte Co-Pilot add-on
- **Limited availability:** May not be available to all Egnyte customers yet
- **ChatGPT tool restriction:** Standard mode only supports search + fetch; Developer Mode needed for full tool set

### Current Blocker (2026-02-03)

**Status: BLOCKED** — MCP Server connectivity is not enabled for `gcigc.egnyte.com`.

- The Egnyte pre-built app was successfully enabled in ChatGPT Enterprise (workspace: "AI Task Force")
- App details confirmed: URL `https://mcp-server.egnyte.com/mcp`, 23 actions available (ask_copilot, ask_document, ask_knowledge_base, etc.)
- On user authentication, Egnyte returns: *"MCP Server Access Unavailable"*
- This is **not** configurable from the Egnyte admin console — there is no self-service toggle
- Egnyte must enable this on their backend for the `gcigc.egnyte.com` domain

**To unblock:**
- [ ] ~~Check GCI's Egnyte plan tier~~ -- Billing managed by external provider; plan tier not visible in admin console
- [x] **Verify Co-Pilot is active** -- CONFIRMED (2026-02-03). AI Powered Features section present with Agents (Deep Research Agent active), Knowledge Bases, and Prompt Library. Configuration > AI section also present.
- [ ] Contact Egnyte account executive or Egnyte Support requesting Remote MCP Server beta access for `gcigc.egnyte.com`

---

## Option B: Custom GPT Action with OpenAPI Schema

Use this approach if the MCP Server is unavailable (wrong Egnyte plan, no Co-Pilot add-on, etc.).

**Current status: ACTIVE — proceeding with this approach while MCP Server access is pending.**

### Egnyte Developer App (Completed)

| Field | Value |
|-------|-------|
| **App Name** | GCI_Data_Scout |
| **App ID** | 54955284-a8f4-426f-aee4-0cb59b0603f1 |
| **Type** | Publicly Available Application |
| **Domain** | gcigc |
| **Platform** | Web App |
| **API Access** | Prod Collaborate (approved, active) |
| **Callback URL 1** | `https://chat.openai.com/aip/g-fd2a0698f4e8d07e30691edddf8098be2475d328/oauth/callback` |
| **Callback URL 2** | `https://chatgpt.com/aip/g-fd2a0698f4e8d07e30691edddf8098be2475d328/oauth/callback` _(add if not already registered)_ |

> **Note:** API Key and Secret are stored securely and not included in this document.

### Step-by-Step Setup Walkthrough

#### Step 2: Create the Custom GPT

1. In ChatGPT, click your profile icon > **My GPTs** > **Create a GPT**
2. Go to the **Configure** tab
3. Set:
   - **Name:** `GCI Project Search`
   - **Description:** `Search GCI project files, specs, and drawings stored in Egnyte`
   - **Instructions:** (see System Instructions section below)

#### Step 3: Add the Egnyte Action

1. In the GPT editor, scroll down to **Actions** > **Create new action**
2. Delete anything in the Schema box
3. Paste the **Verified OpenAPI Schema** below
4. Under **Authentication**, select **OAuth**
5. Enter the OAuth2 configuration values (see table below)
6. **Important:** After saving, copy both callback URLs shown in the editor
7. Go back to your Egnyte developer app settings and register both callback URLs as authorized redirect URIs

#### Step 4: Test

1. Save the Custom GPT
2. Open it and try: "Search for specs on [known project name]"
3. It will prompt you to authenticate with Egnyte (OAuth flow)
4. After auth, verify search results come back correctly

### Prerequisites

- [ ] Register a developer application at [developers.egnyte.com](https://developers.egnyte.com)
- [ ] Obtain `client_id` and `client_secret` after Egnyte approves the app
- [ ] Request scopes: `Egnyte.search Egnyte.filesystem`

### Verified OpenAPI Schema (v2 Search API)

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "GCI Egnyte Search",
    "description": "Search Egnyte files using the v2 Search API.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://gcigc.egnyte.com"
    }
  ],
  "paths": {
    "/pubapi/v2/search": {
      "post": {
        "operationId": "searchFiles",
        "x-openai-isConsequential": false,
        "summary": "Search file contents and metadata",
        "description": "Search for documents and files by keyword query. The query parameter must be a non-empty string containing at least one keyword.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string",
                    "minLength": 1,
                    "description": "Search keywords. MUST be a non-empty string. Use relevant keywords from the user's request (e.g. '300 California Specs'). Never send an empty query."
                  },
                  "count": {
                    "type": "integer",
                    "description": "Number of results to return (max 100)",
                    "default": 20
                  },
                  "offset": {
                    "type": "integer",
                    "description": "Pagination offset",
                    "default": 0
                  },
                  "folder": {
                    "type": "string",
                    "description": "Restrict search to a folder path (e.g. '/Shared/Projects')"
                  },
                  "sort_by": {
                    "type": "string",
                    "enum": ["last_modified", "size", "score", "name"],
                    "description": "Sort results by field"
                  },
                  "sort_direction": {
                    "type": "string",
                    "enum": ["ascending", "descending"],
                    "description": "Sort direction"
                  }
                },
                "required": ["query"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Search results",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "total_count": { "type": "integer" },
                    "offset": { "type": "integer" },
                    "count": { "type": "integer" },
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": { "type": "string" },
                          "path": { "type": "string" },
                          "snippet": { "type": "string" },
                          "last_modified": { "type": "string" },
                          "size": { "type": "integer" },
                          "entry_id": { "type": "string" },
                          "is_folder": { "type": "boolean" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### OAuth2 Configuration in GPT Editor

| Field | Value |
|-------|-------|
| **Client ID** | _(from Egnyte developer app)_ |
| **Client Secret** | _(from Egnyte developer app)_ |
| **Authorization URL** | `https://gcigc.egnyte.com/puboauth/token` |
| **Token URL** | `https://gcigc.egnyte.com/puboauth/token` |
| **Scope** | `Egnyte.search Egnyte.filesystem` |

**Required callback URLs** (register both in your Egnyte developer app):
```
https://chat.openai.com/aip/{g-YOUR-GPT-ID}/oauth/callback
https://chatgpt.com/aip/{g-YOUR-GPT-ID}/oauth/callback
```

> **Warning:** These callback URLs change every time you modify OAuth settings in the GPT editor. Re-copy them to Egnyte after any change.

### Suggested System Instructions for the Custom GPT

```
You are an expert Construction Project Manager assistant for GCI General Contractors.

CRITICAL RULES FOR SEARCHING:
- The search query parameter MUST ALWAYS be a non-empty string with at least one keyword. NEVER send an empty or whitespace-only query.
- If the user asks a vague question like "what's the latest file?" without providing keywords, ask them for a project name, folder, or keyword to search with. Do NOT attempt to search with an empty query.
- The Egnyte search API cannot list all files or browse folders — it requires keywords.

When searching Egnyte:
- Always look for the most recent version of documents
- Prioritize "Issued for Construction" (IFC) drawings over "Schematic Design" (SD) or "Design Development" (DD)
- When searching for specs, include the CSI division number if the user provides it
- Present results with file name, path, and last modified date
- If multiple versions exist, note the differences in dates
- Use the sort_by parameter to sort by "last_modified" when the user wants the most recent files
- Use the folder parameter to narrow results when the user specifies a project or folder

When you cannot find a document, suggest alternative search terms the user could try.
```

---

## ChatGPT Enterprise Feature Notes

### @Mentions for Custom GPTs

The @mention feature allows users to invoke a Custom GPT from within a normal ChatGPT conversation by typing `@` and selecting from a menu.

**Verified behavior:**
- Available on Enterprise, Business (formerly Team), and Plus plans
- Users type `@` in the message box, see a menu of previously used GPTs
- Each GPT responds according to its own instructions
- GPTs do NOT share state -- the Egnyte GPT's search results are not accessible to other GPTs in the thread

**Known issues (as of early 2026):**
- @mentions **do not work with GPT-5.1 or the "Auto" model selector** -- this is a reported bug, not officially acknowledged by OpenAI
- Only works with legacy models (GPT-4o, GPT-4.1)
- Users must have opened the Custom GPT at least once before they can @mention it

**Recommendation:** Do not rely on @mentions as a primary workflow for GCI until the GPT-5.1 bug is resolved. If using Custom GPTs (Option B), instruct users to open the GPT directly from the sidebar.

### Enterprise Admin Controls

| Feature | Relevance to GCI |
|---------|------------------|
| **Domain allowlisting** | Admin can restrict GPT Actions to only `gcigc.egnyte.com` |
| **Workspace-scoped sharing** | Custom GPTs stay internal to GCI's workspace |
| **Admin visibility** | Admins can view GPT configs, transfer ownership |
| **Audit logs** | Conversation and GPT activity logging for compliance |
| **RBAC** | Control which roles/teams can access the Egnyte integration |

---

## Verified API Reference

### Egnyte Search API Endpoints

| Endpoint | Method | Use Case |
|----------|--------|----------|
| `/pubapi/v1/search?query=...` | GET | Basic keyword search (query params) |
| `/pubapi/v1/search` | POST | Metadata-only search (JSON body with `key_with_value`) |
| `/pubapi/v2/search` | POST | **Full content search** (JSON body with `query`, filters, sorting) |

### Egnyte AI API Endpoints (if Co-Pilot enabled)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/pubapi/v1/ai/copilot/ask` | POST | Ask questions against all domain content |
| `/pubapi/v1/ai/kb/{id}/ask` | POST | Ask against a specific Knowledge Base |
| `/pubapi/v1/ai/document/{id}/ask` | POST | Ask about a specific document |
| `/pubapi/v1/ai/document/{id}/summary` | POST | Generate document summary |

### Egnyte OAuth Endpoints

| Purpose | URL |
|---------|-----|
| Authorization | `https://gcigc.egnyte.com/puboauth/token` (with `response_type=code`) |
| Token exchange | `https://gcigc.egnyte.com/puboauth/token` (with `grant_type=authorization_code`) |

### Available OAuth Scopes

| Scope | Access |
|-------|--------|
| `Egnyte.search` | Search API |
| `Egnyte.filesystem` | File System API |
| `Egnyte.link` | Links API |
| `Egnyte.user` | User Management API |
| `Egnyte.permission` | Permissions API |
| `Egnyte.audit` | Audit Reporting API |
| `Egnyte.projectfolders` | Project Folder API |

Token expiry: **30 days** (2,592,000 seconds).

---

## Test Plan

### Test 1: Basic Connectivity
- [ ] Open the Custom GPT (or MCP connector)
- [ ] Send: "Search for the most recent specs on [known project name]"
- [ ] Verify: Results come back with file names, paths, and snippets
- [ ] Verify: Results match what you'd find searching directly in Egnyte

### Test 2: Permission Scoping
- [ ] Identify a file in a restricted folder (you can see it, a restricted user cannot)
- [ ] Search for that file with your account — confirm it appears
- [ ] Have a restricted user authenticate and search for the same file
- [ ] Verify: The file does NOT appear in the restricted user's results

### Test 3: Search Quality
- [ ] Search for a specific spec by CSI division number
- [ ] Search for a drawing by project name
- [ ] Search for a submittal by vendor name
- [ ] Verify: Results are relevant and the snippets are useful

### Test 4: Negative Test
- [ ] Search for "xyzzy nonexistent project 99999"
- [ ] Verify: Returns no results gracefully (no hallucinated files)

### Test 5: Edge Cases
- [ ] Search for a file with special characters in the name
- [ ] Search with a very broad term — verify pagination works
- [ ] Search with folder scoping (if supported by approach)

### Test Results

| Test | Date | Result | Notes |
|------|------|--------|-------|
| 1. Basic Connectivity | 2026-02-04 | PASS | Searched "spec" sorted by last_modified, returned real project files with correct paths and dates |
| 2. Permission Scoping | | | |
| 3. Search Quality | | | |
| 4. Negative Test | | | |
| 5. Edge Cases | | | |

---

## Corrections from Prior AI Chat

The original AI-assisted conversation contained several errors. Documenting them here to prevent re-introduction.

| Original Claim | Problem | Correct Information |
|----------------|---------|---------------------|
| `POST /pubapi/v1/search` with `{"query": "..."}` body | Conflated v1 and v2 APIs | v1 POST is metadata-only; content search POST is `/pubapi/v2/search` |
| @mentions allow seamless mid-conversation Egnyte search | Overstated capability | GPTs don't share state; @mentions have a known bug on GPT-5.1 |
| "Bypasses MCP middleware" | Fabricated concept | No such middleware exists; the AI invented a rationale |
| "This is a massive benefit, not a drawback" | Sales language masking uncertainty | The AI was compensating for unverified claims with confidence |

---

## Progress Log

| Date | Action | Result |
|------|--------|--------|
| 2026-02-03 | Reviewed prior AI chat for accuracy | Found multiple errors (see Corrections section) |
| 2026-02-03 | Researched & verified Egnyte API + ChatGPT Enterprise capabilities | Documented verified info, corrected OpenAPI schema to v2 |
| 2026-02-03 | Enabled Egnyte pre-built app in ChatGPT Enterprise | Success -- 23 actions available |
| 2026-02-03 | Attempted user authentication to Egnyte MCP Server | BLOCKED -- "MCP Server Access Unavailable" for gcigc.egnyte.com |
| 2026-02-03 | Researched Egnyte admin options to enable MCP | No self-service toggle; Egnyte must enable on backend |
| 2026-02-03 | Confirmed Co-Pilot is active (Agents, Knowledge Bases, Prompt Library all present) | Plan supports MCP Server |
| 2026-02-03 | Pivoting to Option B (Custom GPT Action) while requesting MCP enablement | In progress |
| 2026-02-03 | Created Custom GPT "GCI Data Scout", pasted v2 schema, configured OAuth | Schema accepted, action detected (searchFiles POST /pubapi/v2/search) |
| 2026-02-03 | Tested OAuth sign-in | FAILED -- "Incorrect request type GET for resource owner flow" |
| 2026-02-03 | Root cause: Egnyte app type is "Internal Application" which only supports Resource Owner Password flow, not Authorization Code flow | Need to change app type or create new non-internal app |
| 2026-02-03 | Created new Egnyte developer app "GCI_Data_Scout" as "Publicly Available Application" | App ID: 54955284-a8f4-426f-aee4-0cb59b0603f1 |
| 2026-02-03 | Prod Collaborate API approved and key activated | Ready to configure in Custom GPT |
| 2026-02-04 | Re-entered OAuth credentials, updated GPT, synced callback URL with Egnyte app | OAuth flow working |
| 2026-02-04 | **First successful search!** Queried "spec" sorted by last_modified | Returned real project files (B46.2 Lab, Ford Greenfield Labs, Project Proteus) dated Feb 4, 2026 |

## Open Questions / Next Steps

### Option A (MCP Server) -- Blocked, Parallel Track
- [ ] Check GCI's Egnyte plan tier in admin console (billing/account settings)
- [ ] Verify Co-Pilot is active (Settings > Configuration > AI)
- [ ] Contact Egnyte account exec or support to request MCP Server enablement

### Option B (Custom GPT Action) -- Active
- [ ] Register developer application at developers.egnyte.com
- [ ] Obtain `client_id` and `client_secret`
- [ ] Create Custom GPT in ChatGPT Enterprise with verified v2 OpenAPI schema
- [ ] Configure OAuth2 authentication in GPT editor
- [ ] Register callback URLs in Egnyte developer app
- [ ] Test basic search functionality
- [ ] Test permission scoping (two users with different access levels)
- [ ] Red team test -- verify search accuracy and negative cases

### General
- [ ] **Define folder scope** -- which Egnyte folders should be searchable? (e.g., `/Shared/Projects`)
- [ ] **Plan user training** -- create "vetted foundational prompts" per Shalon's request
- [ ] **Test @mentions** on GCI's workspace -- verify which models support it

---

## Sources

All information in this document was verified against the following sources:

### Egnyte Documentation
- [Egnyte Search API Docs](https://developers.egnyte.com/docs/Search_API)
- [Egnyte Public API Authentication](https://developers.egnyte.com/docs/read/Public_API_Authentication)
- [Egnyte Remote MCP Server Docs](https://developers.egnyte.com/docs/Remote_MCP_Server)
- [Egnyte Remote MCP Server API Reference](https://developers.egnyte.com/api-docs/remote-mcp-server)
- [Egnyte Helpdesk: Connecting Egnyte to ChatGPT](https://helpdesk.egnyte.com/hc/en-us/articles/42508696237965)
- [Egnyte Blog: Secure Enterprise File Access via MCP Server](https://www.egnyte.com/blog/post/solving-the-ai-data-gap-secure-enterprise-file-access-via-egnytes-mcp-server/)
- [Egnyte AI API](https://developers.egnyte.com/api-docs/read/ai-api)

### OpenAI Documentation
- [OpenAI: GPT Actions Introduction](https://platform.openai.com/docs/actions/introduction)
- [OpenAI: GPT Actions Authentication](https://platform.openai.com/docs/actions/authentication)
- [OpenAI: Apps/Connectors in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt)
- [OpenAI: Developer Mode & MCP Connectors](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta)
- [OpenAI: Admin Controls for Apps](https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-in-apps-enterprise-edu-and-business)
- [OpenAI: GPTs in Enterprise](https://help.openai.com/en/articles/8555535-gpts-chatgpt-enterprise-version)
- [OpenAI: @Mentions Feature](https://help.openai.com/en/articles/8908924-what-is-the-mentions-feature-for-gpts)
- [OpenAI: GPT Actions Domain Settings](https://help.openai.com/en/articles/9442513-gpt-actions-domain-settings-chatgpt-enterprise)

### Community / Bug Reports
- [OpenAI Community: @mentions not working with GPT-5.1](https://community.openai.com/t/mentions-feature-for-custom-gpts-not-working-with-gpt-5-1-on-web-and-in-android-app/1367275)

---

*Last updated: 2026-02-03*
*Prepared by: Justin Headley / Sagemind AI*
