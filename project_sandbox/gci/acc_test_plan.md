# ACC Integration — Test Plan

**Date:** 2026-02-11
**Prerequisite:** Jon West confirms Custom Integration is active and provides a test project name.

---

## Test 1: OAuth Flow

**Goal:** Verify end-to-end authentication works.

**Query:**
> "What projects are in ACC?"

**Expected behavior:**
1. GPT triggers the `listProjects` call
2. User is redirected to Autodesk OAuth login page
3. User authenticates with their Autodesk account
4. Callback redirects back to ChatGPT
5. GPT receives and displays a list of projects

**Pass criteria:** Projects are returned with names and statuses. No 401/403 errors.

**If it fails:**
- 401 → Token issue. Check scope is `data:read account:read`
- 403 → Custom Integration not provisioned, or app not authorized for this account
- Redirect error → Callback URL mismatch. Verify the URL in APS app settings matches the one shown in the GPT Action editor

---

## Test 2: Project Listing

**Query:**
> "Find the [test project name] project"

**Expected behavior:** GPT calls `listProjects` with `filter[name]` set to the project name. Returns matching project(s) with id, name, status.

**Pass criteria:** The known test project appears in results.

---

## Test 3: Issues — Text Search

**Query:**
> "Show me open issues on [test project]"

Then follow up with:
> "Search for issues about [known keyword, e.g. 'electrical' or 'concrete']"

**Expected behavior:**
1. GPT resolves project name → project ID via `listProjects`
2. Calls `listIssues` with `filter[status]=open` and/or `filter[search]=[keyword]`
3. Returns issues with displayId, title, status, assignedTo, dueDate

**Pass criteria:** Results match what's visible in ACC. Issue count is consistent.

---

## Test 4: Issues — Get Detail

**Query (after Test 3):**
> "Show me the details for issue #[displayId from results]"

**Expected behavior:** GPT calls `getIssueDetails` with the issue ID. Returns full issue including description, location, dates, comments count.

**Pass criteria:** All fields populate correctly. Description text is readable.

---

## Test 5: RFIs — List All

**Query:**
> "Show me all RFIs on [test project]"

**Expected behavior:** GPT calls `searchRfis` with empty body `{}`. Returns RFIs with title, status, question, due date.

**Pass criteria:** RFIs are returned. Count matches ACC.

---

## Test 6: RFIs — Filter by Status

**Query:**
> "Show me open RFIs on [test project]"

**Expected behavior:** GPT calls `searchRfis` with `filter.status: ["open"]`.

**Pass criteria:** Only open RFIs returned. Compare count against ACC filtered view.

---

## Test 7: RFI Detail

**Query (after Test 5 or 6):**
> "Show me the details for [RFI title from results]"

**Expected behavior:** GPT calls `getRfiDetails`. Returns full RFI with question, suggestedAnswer, officialResponse, assignees, dates.

**Pass criteria:** Question text and official response (if answered) are readable and accurate.

---

## Test 8: Multi-Source Routing

**Query sequence:**
> "Find the latest specs for [test project]"

Then:
> "Now show me the open RFIs for that same project"

**Expected behavior:**
1. First query → Egnyte `searchFiles`
2. Second query → ACC `listProjects` + `searchRfis`
3. Both work in the same conversation without auth conflicts

**Pass criteria:** Both data sources respond correctly in a single conversation.

---

## Test 9: Negative Cases

**Query:**
> "Search for RFIs about xyzzy nonexistent topic on [test project]"

**Expected behavior:** Empty results. GPT says "No records found" — does NOT hallucinate data.

**Query:**
> "Show me the daily logs for [test project]"

**Expected behavior:** GPT explains the limitation: daily logs are not available through this integration.

---

## Test 10: Pagination

**Query:**
> "Show me all issues on [test project]"

(On a project with >20 issues)

**Expected behavior:** GPT returns first 20 issues and tells the user: "There are X total results. I'm showing the first 20. Want to see more?"

**Pass criteria:** GPT doesn't silently truncate. Offers to paginate.

---

## Test 11: Permission Scoping

**Goal:** Verify users only see data they have access to in ACC.

**Setup:** Have two users with different ACC project access authenticate separately.

**Pass criteria:** Each user only sees projects and data they're authorized for in ACC.

---

## Results Log

| Test | Date | Result | Notes |
|------|------|--------|-------|
| 1. OAuth Flow | | | |
| 2. Project Listing | | | |
| 3. Issues — Text Search | | | |
| 4. Issues — Detail | | | |
| 5. RFIs — List All | | | |
| 6. RFIs — Filter | | | |
| 7. RFI Detail | | | |
| 8. Multi-Source | | | |
| 9. Negative Cases | | | |
| 10. Pagination | | | |
| 11. Permission Scoping | | | |

---

## RFI Keyword Search — Exploratory Test

**Background:** The RFI v3 `search:rfis` endpoint likely supports keyword search but the exact field name is unverified (see `schema_verification_report.md`). Once basic RFI listing works, try these request body variations:

```json
// Attempt 1: keyword field at top level
{ "keyword": "structural steel" }

// Attempt 2: keyword inside filter
{ "filter": { "keyword": "structural steel" } }

// Attempt 3: searchText field
{ "searchText": "structural steel" }

// Attempt 4: query field
{ "query": "structural steel" }
```

Document which one works and update the schema accordingly.

---

*Prepared: 2026-02-11*
