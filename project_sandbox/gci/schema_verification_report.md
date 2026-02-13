# ACC OpenAPI Schema — Due Diligence Verification Report

**Date:** 2026-02-11
**Standard applied:** `docs/standards/due-diligence.md`

---

## Verification Summary

Every endpoint, parameter, and response field in the schema was verified against primary Autodesk sources (OpenAPI specs, Postman collections, official blogs). This report documents what was confirmed, what was corrected, and what remains unverified.

---

## Corrections to Original Plan

### 1. Cost API — `q` text search parameter does NOT exist

**Original claim:** "Newer project-based API adds a `q` text search param"
**Status:** CONTRADICTED
**Evidence:** Exhaustive search across schema.yaml (acc-console), official Postman collection, sample app code (aps-acc-cost-exchange), and APS documentation. No `q` parameter found anywhere.
**Impact:** Cost data can only be filtered by structured parameters (id, number, contractId, costStatus, budgetStatus, lastModifiedSince, etc.). No keyword search.

### 2. Cost API — Project-based path does NOT exist

**Original claim:** `/cost/v1/projects/{projectId}/change-orders/{changeOrder}` exists as a newer API
**Status:** CONTRADICTED
**Evidence:** All Cost Management API endpoints use `/cost/v1/containers/{containerId}/...`. No project-based path found in any source.
**Impact:** Must use container-based path. containerId must be retrieved separately.

### 3. containerId != projectId

**Original claim:** "containerId equals projectId in ACC Build"
**Status:** CONTRADICTED
**Evidence:** containerId is a separate UUID retrieved from the Data Management API: `GET /project/v1/hubs/b.{accountId}/projects/b.{projectId}` → `response.data.relationships.cost.data.id`
**Impact:** Need an additional API call to resolve containerId before querying cost data. Added getProjectDetails endpoint to schema.

### 4. Issues API has text search

**Original claim:** Issues only support structured filters (status, type, assignee)
**Status:** CORRECTED (capability was understated)
**Evidence:** Official OpenAPI spec (`construction/issues/Issues.yaml`) documents `filter[search]` parameter: "Free text search — filters both title and displayId." Example: `filter[search]=300`.
**Impact:** Issues are MORE searchable than originally documented. Users can search issues by keyword, not just filter by status/assignee.
**Source:** `https://github.com/autodesk-platform-services/aps-sdk-openapi/blob/main/construction/issues/Issues.yaml`

### 5. RFI keyword search — downgraded from V to SS

**Original claim:** RFIs have "keyword text search" (Verified)
**Status:** STRONGLY SUPPORTED (downgraded)
**Evidence:** The endpoint is called `search:rfis` (naming implies search), and the v2 API had `filter[keyword]`. But the v3 Postman collection only demonstrates `filter.status` and `filter.dueDate` in the POST body. No keyword field shown. No public OpenAPI spec exists for RFIs v3 (Stoplight spec returns 403). APS reference docs are client-side rendered (not scrapable).
**Impact:** Keyword search is highly likely but the exact field name is unverified. Will test during implementation with candidates: `keyword`, `filter.keyword`, `searchText`.

### 6. OAuth scope — `account:read` required for Projects

**Original claim:** Start with `data:read` only
**Status:** CORRECTED
**Evidence:** Official OpenAPI spec for Account Admin specifies `account:read` scope for `GET /construction/admin/v1/accounts/{accountId}/projects`.
**Impact:** Must request both `data:read` and `account:read` scopes in OAuth configuration.

---

## Verified Claims (Confirmed)

| Claim | Source | Status |
|-------|--------|--------|
| Projects endpoint: `GET /construction/admin/v1/accounts/{accountId}/projects` | OpenAPI spec (accountadmin.yaml) | V |
| Projects `filter[name]` with partial text match | OpenAPI spec — supports `contains`, `startsWith`, `endsWith`, `equals` via `filterTextMatch` | V |
| Projects pagination: offset/limit, default 20, max 200 | OpenAPI spec | V |
| Issues endpoint: `GET /construction/issues/v1/projects/{projectId}/issues` | OpenAPI spec (Issues.yaml) | V |
| Issues `filter[search]` free text on title + displayId | OpenAPI spec | V |
| Issues `filter[status]`: draft, open, pending, in_progress, in_review, completed, not_approved, in_dispute, closed | OpenAPI spec | V |
| Issues pagination: offset/limit, default 100, max 100 | OpenAPI spec | V |
| Issues `sortBy` with `-` prefix for descending | OpenAPI spec | V |
| RFIs endpoint: `POST /construction/rfis/v3/projects/{projectId}/search:rfis` | Postman collection | V |
| RFIs `filter.status`: draft, submitted, open, answered, closed, void | Postman collection | V |
| RFIs `filter.dueDate` range format: `ISO8601..ISO8601` | Postman collection | V |
| RFI response includes: id, title, status, question, suggestedAnswer, dueDate, assignedTo (array), customIdentifier | Postman collection (create body + test scripts) | V |
| RFI v3 changed `assignedTo` from single object to array | Migration blog | V |
| RFI v3 added: reviewers, architects, watchers, responses, locations arrays | Migration blog | V |
| Submittals endpoint: `GET /construction/submittals/v2/projects/{projectId}/items` | Postman collection | V |
| Submittals `search` param: keyword search across identifier, title, spec identifier, ball-in-court | Postman collection (line 521-524, explicit description) | V |
| Submittals pagination: offset/limit, default 20, max 50 | Postman collection | V |
| Submittals 30+ filter params | Postman collection | V |
| Cost Change Orders: `GET /cost/v1/containers/{containerId}/change-orders/{pco|rfq|rco|oco|sco}` | schema.yaml + Postman collection + sample app | V |
| Cost 10+ filter params (id, number, contractId, costStatus, budgetStatus, lastModifiedSince, etc.) | schema.yaml | V |
| Cost pagination: offset/limit, default 100 | schema.yaml + Postman | V |
| Cost containerId retrieval via Data Management API | Sample app (datamanagement.js) + Postman tutorial | V |
| Budgets endpoint: `GET /cost/v1/containers/{containerId}/budgets` | schema.yaml + Postman + sample app | V |

---

## Unverified (Needs Testing)

| Claim | What we know | Test plan |
|-------|-------------|-----------|
| RFI keyword search field name in v3 POST body | v2 used `filter[keyword]`, v3 endpoint name is `search:rfis` | Test POST body with `keyword`, `filter.keyword`, `searchText` fields |
| Whether `account:read` alone is sufficient for project listing or if `data:read` is also needed | OpenAPI spec says `account:read` | Test with `account:read data:read` scope (safe) |
| Exact RFI response fields in v3 | Synthesized from create body + migration blog | Will be confirmed on first successful API call |

---

*Prepared: 2026-02-11*
*Due Diligence Standard: Applied — see `docs/standards/due-diligence.md`*
