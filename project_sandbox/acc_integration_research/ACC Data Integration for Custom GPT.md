# **Feasibility Analysis of Integrating Autodesk Construction Cloud Data with ChatGPT Enterprise: A Technical and Strategic Research Report**

## **1\. Introduction: The Agentic Shift in Construction Project Management**

The global construction industry stands at a technological inflection point in 2026\. For decades, the sector has focused on the digitization of analog processes—moving from paper blueprints to PDFs, and from physical logbooks to cloud-based repositories. This digitization phase, while necessary, created a secondary challenge: data saturation. General Contractors (GCs) today manage projects characterized by terabytes of data dispersed across disparate modules within platforms like Autodesk Construction Cloud (ACC). The cognitive load required to navigate this information—clicking through folder trees, filtering logs, and cross-referencing cost codes—has become a primary bottleneck in decision-making velocity.

The emergence of Large Language Models (LLMs), particularly enterprise-grade solutions like ChatGPT Enterprise, offers a potential solution to this "data friction." By integrating generative AI directly with the Common Data Environment (CDE) via Application Programming Interfaces (APIs), organizations seek to transform the passive retrieval of information into an active, conversational interrogation of project status. This report provides an exhaustive feasibility analysis of creating a "Project Search" Custom GPT specifically tailored for GCs. The scope focuses on three high-frequency, high-value data streams: Submittals, Requests for Information (RFIs), and Cost Management data.

This analysis is situated within the specific technological and commercial landscape of 2026\. This period is defined by Autodesk’s strategic pivot toward the Model Context Protocol (MCP), the maturing of its proprietary "Autodesk Assistant," and the enforcement of a new token-based pricing model for API interactions. The feasibility of a Custom GPT is therefore not merely a question of technical connectivity—can the APIs talk to each other?—but a complex evaluation of architectural constraints, data security governance, and long-term platform viability.

### **1.1 The Operational Imperative for General Contractors**

For a General Contractor, the "Search" use case is rarely about finding a single file. It is about synthesizing context. A Project Manager (PM) asking, "What is the status of the lobby lighting?" is not looking for a single document. They are implicitly querying:

1. **Submittals:** Has the lighting fixture been approved?  
2. **RFIs:** Are there outstanding questions regarding the voltage or mounting?  
3. **Cost:** Has the budget been adjusted for the alternate fixture specification?

Current platform interfaces require the PM to visit three distinct modules (Build, Cost, Docs), apply three different sets of filters, and mentally synthesize the results. A Custom GPT promises to flatten this vertical stack into a horizontal conversation. However, the realization of this promise depends entirely on the granularity, latency, and searchability of the underlying APS (Autodesk Platform Services) APIs. The analysis suggests that while the "read" capabilities are robust, the "search" capabilities required to support natural language ambiguity are technically uneven across the different modules.1

## **2\. The Autodesk Platform Services (APS) Ecosystem in 2026**

To determine feasibility, one must first understand the infrastructure upon which any integration relies. Autodesk Platform Services (formerly Forge) serves as the unified API layer for ACC. In 2026, this ecosystem has evolved significantly, introducing new architectural paradigms and business models that directly impact the design of third-party integrations.

### **2.1 The Transition to Flex Token Licensing**

Effective December 2025, Autodesk introduced a simplified two-tier business model for cloud APIs, transitioning entirely from cloud credits to Flex tokens.4 This shift is critical for the financial feasibility of a high-volume AI agent.

* **The "Basic Interactions" Cost:** Under the 2026 model, specific API interactions that were previously unmetered now incur costs. "Basic Interactions" with the Model Derivative API—such as retrieving metadata (GET /{urn}/metadata), manifests (GET /{urn}/manifest), or thumbnails (GET /{urn}/thumbnail)—are billed at a rate of 1 token per 300,000 calls.4  
* **Implication for Search Agents:** An AI agent designed to "look" at every file to find an answer could inadvertently trigger thousands of metadata calls per query. If a Custom GPT iterates through a project’s folders to index file properties dynamically, it could consume Flex tokens at an accelerated rate compared to a human user. However, standard administrative calls to ACC specific APIs (like listing RFIs or Submittals) generally remain outside this "rated" category for standard subscriptions, though developers must remain vigilant regarding the distinction between "rated" (e.g., Model Derivative, Automation) and "non-rated" APIs.4

### **2.2 API Governance and Rate Limiting**

A General Contractor’s project data is high-volume. A single project may contain thousands of RFIs and submittals. The feasibility of an AI agent depends on its ability to ingest this data without hitting rate limits that would cause the GPT to time out or hallucinate.

* **Cost Management Limits:** The Cost Management API enforces a limit of 500 requests per minute per user context.5 This is relatively generous and supports robust querying.  
* **RFI Limits:** The RFI API is more constricted, with a limit of 100 requests per minute per client ID.6  
* **Data Management Search:** The folder search endpoint (GET.../search) allows 300 requests per minute.7

**Architectural Insight:** A naive implementation where the GPT "loops" through pages of results to find a specific keyword will fail. If a project has 5,000 RFIs and the API returns 100 per page, a brute-force search would require 50 API calls. While this stays within the *minute* limit, the latency (approx. 1-2 seconds per call) would exceed the GPT’s HTTP timeout window (typically 30-60 seconds for Actions). Therefore, feasibility dictates that the *API itself* must handle the filtering, not the GPT.8

## **3\. Authentication Architecture: The Security Backbone**

Integrating an external AI service like ChatGPT Enterprise with a secure CDE requires a rigorous approach to authentication. The research identifies the security model as the single most critical "go/no-go" factor for enterprise IT teams.

### **3.1 The Necessity of 3-Legged OAuth 2.0**

For a General Contractor, permissions are granular. A Subcontractor PM should not see the Master Budget. A Project Engineer might draft RFIs but not approve Costs.

* **User-Context Enforcement:** The integration *must* use 3-legged OAuth (User Context). This ensures that the GPT accesses ACC acting *as* the specific user.9 If the user cannot see the "Executive Cost Dashboard," the GPT acting on their behalf will receive a 403 Forbidden response from the API, naturally preserving data governance.  
* **Service Account Risks:** While Secure Service Accounts (SSAs) offer server-to-server stability 10, they operate with "developer" or "admin" privileges. Using an SSA for a chat interface is architecturally unsound for this use case because it bypasses the user's permission mask. If a standard user asks the GPT "What is the profit margin?", an SSA-backed bot would retrieve the data, causing a severe data leak. Therefore, **SSAs are deemed infeasible for direct user-facing GPT interactions** unless a complex middleware is built to replicate ACC's permission logic—a prohibitive effort.12

### **3.2 Scope Management and Minimization**

To authorize the connection, the GPT Action must request specific "Scopes." The research highlights a tension between functionality and security.

* **Required Scopes:** The integration requires data:read to view items and account:read to navigate the Hub/Project hierarchy.12 Crucially, for search functionalities, the data:search scope is often required to utilize dedicated search endpoints effectively.12  
* **The "Write" Risk:** Integrating data:write or data:create enables the GPT to draft RFIs or update Cost Items. However, given the propensity of LLMs for "hallucination" (e.g., inventing a budget code or misinterpreting a spec section), granting write access poses operational risks. The feasibility analysis recommends a **Read-Only** architecture for the pilot phase, restricting the scope strictly to retrieval (data:read data:search).12

### **3.3 Handling Multiple Scopes in ChatGPT**

Technical implementation details reveal a nuance in how ChatGPT Actions handle OAuth scopes. The configuration interface typically accepts a single string. Developers must separate multiple scopes with spaces (e.g., data:read data:search) rather than commas, a minor but frequent stumbling block in configuration.13 The integration succeeds only if the underlying API token is generated with the superset of all required scopes for all defined endpoints in the OpenAPI schema.

## **4\. Deep Dive: The RFI Integration Module**

Requests for Information (RFIs) represent the clarification of design intent. They are text-heavy, numerous, and critical for risk management, making them an ideal candidate for LLM integration.

### **4.1 Endpoint Capabilities: Search vs. List**

The feasibility of RFI retrieval rests on two primary API pathways.

1. **The List Endpoint (GET /rfis):** This returns a paginated list of RFIs. It supports basic filtering but not deep text search.  
2. **The Search Endpoint (POST /search:rfis):** This ACC-specific endpoint is the linchpin of the RFI use case.3 It accepts a JSON body with a search parameter that queries the title, question, and officialResponse fields.

**Feasibility Verdict:** **High.** The existence of POST /search:rfis allows the GPT to offload the "search" logic to the Autodesk server. A user prompt "Find RFIs about structural steel" translates directly to {"search": "structural steel"}, ensuring the response is small, relevant, and fast.

### **4.2 The "Virtual Folder" Constraint**

A significant limitation identified in the research is the handling of attachments. RFI answers are frequently "See attached sketch."

* **Data Structure:** The RFI API response does *not* contain the attachment file content. Instead, it provides a virtualFolderUrn.3  
* **The Retrieval Chain:** To "read" the attachment, the GPT would need to perform a secondary call to the Data Management API (GET /folders/{folderId}/contents) using that URN, and then a tertiary call to download/read the file.  
* **Context Limit:** ChatGPT Actions cannot easily "download" and "OCR" a PDF in real-time within the Action workflow due to the 100KB response limit and text-processing constraints. **Insight:** The GPT can find the RFI *metadata* (Question/Answer text) effectively. However, if the critical information is locked in a PDF attachment, the GPT will be blind to it. The system is feasible as an "Index" (telling the user *which* RFI to look at) but less feasible as a "Reader" (telling the user *what* the attachment says) without complex middleware.14

## **5\. Deep Dive: The Submittal Tracking Module**

Submittals manage the approval of materials. The workflow involves passing "Items" through "Packages" to various reviewers.

### **5.1 Endpoint Limitations: The Search Gap**

Unlike the RFI module, the Submittals API (GET /items) lacks a dedicated high-performance text search endpoint in the snippets provided.

* **Query Parameters:** The documentation highlights filters for id, packageId, specId, reviewResponseId, and dueDate.2 It mentions filtering by "specified title" (filter\[title\]), but this is often an exact match or "starts with" logic rather than a fuzzy keyword search engine.  
* **Implication:** A user asking "Show me the submittal for the generator" might fail if the submittal is titled "350kW Diesel Gen-Set." The lack of semantic or fuzzy matching in the API layer forces the user to be precise with terminology.

### **5.2 Navigation via Spec Sections**

A viable workaround identified is searching by **Spec Section**. Construction projects leverage standard classifications (MasterFormat).

* **Workflow:** The GPT can first query the user "Which spec section?" (e.g., 26 32 13). It can then use filter\[specId\] (after resolving the ID) to retrieve all relevant items.15  
* **Feasibility Verdict:** **Medium.** The integration is feasible for *status tracking* ("Which submittals are overdue?") due to the filter parameter.2 It is less feasible for unstructured *discovery* compared to RFIs due to the rigid filtering logic.

## **6\. Deep Dive: Cost Management & Financial Data**

Integrating Cost Management is the most complex aspect due to the sensitivity of the data and the structural complexity of the API.

### **6.1 Understanding the Data Model: PCO vs. OCO**

The research emphasizes that "Change Orders" are not a monolith. They exist as Potential Change Orders (PCO), Requests for Change Orders (RCO), and Owner Change Orders (OCO).1

* **API Segmentation:** These are accessed via the GET /change-orders endpoint, but the query must specify the changeOrder type enum (e.g., pco, oco) as a path parameter or filter.1  
* **The "Search" Problem:** A user asking "How much does the lobby redesign cost?" implies a semantic link between "Lobby Redesign" and a PCO. If the PCO is named "Bulletin 42 \- Architectural Changes," a keyword search for "Lobby" returns nothing. The Cost API supports filtering by status, lastModifiedSince, and externalId, but lacks deep semantic text search across scope descriptions.1

### **6.2 The Container ID Nuance**

Cost Management operates within a "Cost Container." While often the same as the Project ID, the integration code must successfully resolve the containerId via the GET /projects endpoint to ensure connectivity.17 Failure to handle this distinction is a common failure point in ACC integrations.

### **6.3 Financial Feasibility**

**High Feasibility for Reporting:** The API is excellent for structured reporting. Queries like "List all OCOs approved in the last 30 days" are deterministically solvable using filter\[status\]=approved and filter.1 **Low Feasibility for Discovery:** Finding a specific cost item based on a vague description of work is difficult without an external search index.

## **7\. The ChatGPT Enterprise "Action" Architecture**

The technical "glue" of this integration is the OpenAI Action schema. The research identifies specific constraints in 2026 that dictate how this schema must be constructed.

### **7.1 OpenAPI 3.1 Specification Strategy**

To connect ChatGPT to ACC, the developer must author an OpenAPI 3.1 specification (YAML or JSON).

* **Simplified Schema:** It is not feasible to simply copy-paste the entire Autodesk spec (which is massive) into the GPT Action. The GPT has a context limit for understanding the schema. The developer must create a "BFF" (Backend for Frontend) style schema—manually defining only the 3-4 endpoints needed (RFI Search, Submittal List, Cost List) and stripping out thousands of irrelevant fields (like internal schemas or permission masks) from the response definition.20  
* **Parameter Injection:** The schema must define projectId as a path parameter. The GPT System Instructions must include a directive: "Always ask the user for the Project Name first, or use the listProjects action to find the ID." The GPT cannot "guess" a GUID.22

### **7.2 The 100KB Response Limit & Pagination**

A critical technical constraint identified in developer discussions is the \~100KB limit on JSON responses processed by ChatGPT Actions.23

* **The Problem:** A GET /rfis call on a mature project might return 2MB of JSON data. Upon receiving this, the GPT Action often fails silently or errors out with "Response too large."  
* **Mitigation (Strict Pagination):** The OpenAPI schema *must* hardcode the limit parameter to a safe number (e.g., limit=20) in the parameters section. This forces the API to return small chunks. The GPT can then be instructed to "Ask the user if they want to see the next 20 results" effectively implementing a conversational pagination cursor.15  
* **Mitigation (Middleware):** A more robust solution involves deploying an Azure Function or AWS Lambda. The GPT calls the Lambda; the Lambda calls Autodesk, retrieves 500 items, filters them using logic superior to the API's native filters, strips out 90% of the JSON bulk, and returns a concise summary to the GPT. This bypasses the 100KB limit by compressing the "signal-to-noise" ratio.

### **7.3 Error Handling and Hallucinations**

When an API returns an empty list (\`\`), LLMs have a known tendency to hallucinate data to please the user.

* **Feasibility Control:** The System Instructions must explicitly state: "If the API returns an empty list, explicitly state 'No records found'. Do not invent or infer data.".23

## **8\. Emerging Technologies: The Model Context Protocol (MCP) Shift**

While a direct API integration via GPT Actions is *technically* feasible, the 2026 landscape offers a competing paradigm: the Model Context Protocol (MCP).

### **8.1 The MCP Advantage**

Autodesk has aggressively adopted MCP, releasing beta servers for Build and Revit.26

* **Mechanism:** Unlike a GPT Action which is a stateless HTTP call defined by a static schema, an MCP Server is a live application (often Node.js based) that runs alongside the LLM client. It exposes "Tools" (functions) rather than "Endpoints."  
* **Why it Matters:** An MCP server can handle the complexity that breaks GPT Actions.  
  * *Complex Logic:* An MCP tool named FindRFI can internally execute: "Search RFIs \-\> If no results, search Attachments \-\> If no results, check Submittals." This logic resides in code, not in the fragile prompt context.27  
  * *Response Size:* The MCP server can process 10MB of data and return just the relevant paragraph to the LLM, completely bypassing the 100KB Action limit.  
* **Availability:** Snippets indicate diverse MCP implementations, including "Count R's" examples and beta availability for ACC.28

### **8.2 Comparison: GPT Actions vs. MCP**

| Feature | GPT Action (OpenAPI) | MCP Server |
| :---- | :---- | :---- |
| **Setup** | Low (Config in UI) | High (Requires hosting/Node.js) |
| **Data Volume** | Low (\<100KB limit) | High (Server-side processing) |
| **Logic** | Limited to API params | Full coding capability |
| **Security** | 3-Legged OAuth via Browser | 3-Legged or Service Account |
| **2026 Viability** | **Medium** (Legacy support) | **High** (Future standard) |

**Strategic Recommendation:** If the General Contractor is using an AI interface that supports MCP (like Claude Desktop or future ChatGPT iterations), building an **MCP Server** is the superior architectural choice over a simple GPT Action for complex search use cases.27 However, if the requirement is strictly "ChatGPT Enterprise" (which primarily uses Actions/Plugins as of this analysis), the OpenAPI path remains the valid deployment route.

## **9\. Comparative Analysis of Alternatives**

Before committing development resources, the GC must weigh the "Build" option against the "Buy" or "Configure" options available in 2026\.

### **9.1 Autodesk Assistant**

Autodesk’s native "Autodesk Assistant" now offers conversational retrieval of project data.31

* **Pros:** Native integration, no development cost, no security configuration required, understands 3D model context.  
* **Cons:** Closed ecosystem. It cannot search *across* the GC's other silos (e.g., SharePoint, ERP).  
* **Verdict:** For purely finding "RFIs about lighting," the native Assistant is likely faster and cheaper. The Custom GPT is only feasible/desirable if it needs to *cross-reference* ACC data with external knowledge bases (e.g., "Compare this RFI response to our internal Best Practices PDF stored in SharePoint").

### **9.2 Data Connector \+ RAG**

An alternative to real-time API calls is the **Data Connector**.34

* **Workflow:** Schedule daily extraction of *all* project data \-\> Ingest into a Vector Database \-\> GPT queries the Vector DB (RAG).  
* **Feasibility:** This solves the "search" problem entirely. Vector search allows for semantic queries ("Find issues related to water leaks" finds "Moisture intrusion").  
* **Trade-off:** Data latency. The Data Connector typically runs daily or weekly. It is not real-time. If an RFI is answered 5 minutes ago, the RAG bot won't know. API integration is real-time.

### **9.3 Third-Party Connectors (Egnyte / Power Automate)**

* **Egnyte:** Offers native syncing of ACC files.35 Good for file search, but lacks the structured data (Cost/RFI) intelligence.  
* **Power Automate:** Can trigger flows based on ACC events.36 Useful for notifications ("Post to Teams when RFI is closed") but lacks the conversational query capability of a GPT.

## **10\. Implementation Roadmap & Strategic Recommendations**

Based on the synthesis of API capabilities, limits, and strategic trends, the following implementation plan is recommended.

### **10.1 Phase 1: The "Look-up" Pilot (Weeks 1-4)**

Focus on **Deterministic Retrieval**. Do not promise "Search," promise "Look-up."

* **Scope:** RFIs (by ID/Status), Cost PCOs (by Status).  
* **Architecture:** Direct ChatGPT Action using 3-legged OAuth.  
* **Schema:** Defined for GET /rfis and GET /change-orders.  
* **Goal:** Validate authentication flow and user adoption.

### **10.2 Phase 2: The "Search" Expansion (Weeks 5-8)**

Introduce **Keyword Search** where supported.

* **Scope:** Implement POST /search:rfis.  
* **Middleware:** Deploy a simple Azure Function to handle the "Search \-\> Retrieve" logic (i.e., search for ID, then get details) to reduce the prompt complexity for the user.  
* **Constraint:** Explicitly communicate that PDF attachments are not indexed.

### **10.3 Phase 3: The 2026 Evolution (Month 3+)**

Evaluate the **MCP** landscape.

* If Autodesk releases a stable MCP Server for Cost/Build, migrate logic from the Custom GPT Action to the MCP Server. This unlocks "Deep Search" and larger data context handling.

### **10.4 Final Feasibility Verdict**

The integration is **Technically Feasible** but **Operationally Constrained**.

* **Feasible:** Connecting APIs, authenticating users, retrieving JSON data.  
* **Constrained:** By the 100KB limit, the lack of semantic search in Submittals/Cost, and the inability to read attachments in real-time.

**Table 1: Feasibility Matrix by Module**

| Module | Primary API Endpoint | Search Method | Feasibility Score | Critical Constraint |
| :---- | :---- | :---- | :---- | :---- |
| **RFIs** | POST /search:rfis | Keyword (Title/Question) | **High** | Attachments not indexed. |
| **Submittals** | GET /items | Filtering (filter\[specId\]) | **Medium** | No keyword search; requires exact filters. |
| **Cost** | GET /change-orders | Filtering (filter\[status\]) | **High** (for reporting) | Complex terminology (PCO vs OCO). |
| **Daily Logs** | GET /daily-logs | Filter (filter\[date\]) | **High** | Simple date-based retrieval.37 |

By adopting a hybrid approach—using APIs for what they do best (structured retrieval) and acknowledging what they cannot do (semantic omniscience without RAG)—a General Contractor can deploy a powerful, time-saving tool that leverages the best of Autodesk's 2026 ecosystem.

#### **Works cited**

1. GET change-orders/:changeOrder | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference/http/cost-change-orders-changeOrder-GET](https://aps.autodesk.com/en/docs/acc/v1/reference/http/cost-change-orders-changeOrder-GET)  
2. GET items | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference/http/submittals-items-GET/](https://aps.autodesk.com/en/docs/acc/v1/reference/http/submittals-items-GET/)  
3. POST rfi-search | Autodesk Construction Cloud APIs | Autodesk ..., accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference/http/rfis-rfi-search-POST](https://aps.autodesk.com/en/docs/acc/v1/reference/http/rfis-rfi-search-POST)  
4. APS Business Model Evolution \- Autodesk Platform Services, accessed February 10, 2026, [https://aps.autodesk.com/blog/aps-business-model-evolution](https://aps.autodesk.com/blog/aps-business-model-evolution)  
5. Cost Management Rate Limits | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/overview/rate-limits/cost-management-rate-limits%20/](https://aps.autodesk.com/en/docs/acc/v1/overview/rate-limits/cost-management-rate-limits%20/)  
6. RFIs Rate Limits | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/overview/rate-limits/rfis-rate-limits](https://aps.autodesk.com/en/docs/acc/v1/overview/rate-limits/rfis-rate-limits)  
7. Data Management Rate Limits \- Autodesk Platform Services, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/data/v2/developers\_guide/rate-limiting/dm-rate-limits](https://aps.autodesk.com/en/docs/data/v2/developers_guide/rate-limiting/dm-rate-limits)  
8. Rate Limits and Quotas | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/overview/rate-limits](https://aps.autodesk.com/en/docs/acc/v1/overview/rate-limits)  
9. Overview | Authentication (OAuth) \- Autodesk Platform Services, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/oauth/v2](https://aps.autodesk.com/en/docs/oauth/v2)  
10. Overview | Secure Service Account API \- Autodesk Platform Services, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/ssa/v1/developers\_guide/overview/](https://aps.autodesk.com/en/docs/ssa/v1/developers_guide/overview/)  
11. Introducing Secure Service Accounts (SSA) – Now in Public Beta\!, accessed February 10, 2026, [https://aps.autodesk.com/blog/introducing-secure-service-accounts-ssa-now-public-beta](https://aps.autodesk.com/blog/introducing-secure-service-accounts-ssa-now-public-beta)  
12. Scopes | Authentication (OAuth) \- Autodesk Platform Services, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/oauth/v2/developers\_guide/scopes](https://aps.autodesk.com/en/docs/oauth/v2/developers_guide/scopes)  
13. How do i add multiple scopes in actions \- OpenAI Developer Community, accessed February 10, 2026, [https://community.openai.com/t/how-do-i-add-multiple-scopes-in-actions/526015](https://community.openai.com/t/how-do-i-add-multiple-scopes-in-actions/526015)  
14. GET rfis/:id/attachments | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference/http/rfis-rfis-id-attachments-GET](https://aps.autodesk.com/en/docs/acc/v1/reference/http/rfis-rfis-id-attachments-GET)  
15. GET packages | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference/http/submittals-packages-GET](https://aps.autodesk.com/en/docs/acc/v1/reference/http/submittals-packages-GET)  
16. Submittals | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/tutorials/submittals](https://aps.autodesk.com/en/docs/acc/v1/tutorials/submittals)  
17. Cost Management API Field Guide \- Autodesk Platform Services, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/overview/field-guide/cost-management](https://aps.autodesk.com/en/docs/acc/v1/overview/field-guide/cost-management)  
18. GET change-orders/:changeOrder/:id | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference/http/cost-change-orders-changeOrder-id-GET](https://aps.autodesk.com/en/docs/acc/v1/reference/http/cost-change-orders-changeOrder-id-GET)  
19. GET cost-items | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference/http/cost-cost-items-GET](https://aps.autodesk.com/en/docs/acc/v1/reference/http/cost-cost-items-GET)  
20. Creating OpenAPI Schemas for custom GPTs \- Generative AI at BYU, accessed February 10, 2026, [https://genai.byu.edu/creating-openapi-schemas-for-custom-gpts](https://genai.byu.edu/creating-openapi-schemas-for-custom-gpts)  
21. OpenAPI Unleashed: Powering AI Agents and Low-Code Automation, Integration, & Customizations with Autodesk Platform Services., accessed February 10, 2026, [https://www.autodesk.com/autodesk-university/class/OpenAPI-Unleashed-Powering-AI-Agents-and-Low-Code-Automations-with-Autodesk-Platform-Services-2025](https://www.autodesk.com/autodesk-university/class/OpenAPI-Unleashed-Powering-AI-Agents-and-Low-Code-Automations-with-Autodesk-Platform-Services-2025)  
22. API Reference | Autodesk Construction Cloud APIs, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/reference](https://aps.autodesk.com/en/docs/acc/v1/reference)  
23. Limits to the size of request/response in GPT actions? \- OpenAI Developer Community, accessed February 10, 2026, [https://community.openai.com/t/limits-to-the-size-of-request-response-in-gpt-actions/951186](https://community.openai.com/t/limits-to-the-size-of-request-response-in-gpt-actions/951186)  
24. How you deal with response limit in a single API request? \- OpenAI Developer Community, accessed February 10, 2026, [https://community.openai.com/t/how-you-deal-with-response-limit-in-a-single-api-request/500506](https://community.openai.com/t/how-you-deal-with-response-limit-in-a-single-api-request/500506)  
25. 100K character restriction when retrieving data via API with an Action for a GPT, accessed February 10, 2026, [https://community.openai.com/t/100k-character-restriction-when-retrieving-data-via-api-with-an-action-for-a-gpt/584432](https://community.openai.com/t/100k-character-restriction-when-retrieving-data-via-api-with-an-action-for-a-gpt/584432)  
26. Autodesk MCP Servers | Autodesk AI, accessed February 10, 2026, [https://www.autodesk.com/solutions/autodesk-ai/autodesk-mcp-servers](https://www.autodesk.com/solutions/autodesk-ai/autodesk-mcp-servers)  
27. What You Need to Know About MCP Servers in Construction \- Autodesk, accessed February 10, 2026, [https://www.autodesk.com/blogs/construction/mcp-servers-in-construction/](https://www.autodesk.com/blogs/construction/mcp-servers-in-construction/)  
28. Talk to Your BIM: Exploring the AEC Data Model with MCP Server \+ Claude, accessed February 10, 2026, [https://aps.autodesk.com/blog/talk-your-bim-exploring-aec-data-model-mcp-server-claude](https://aps.autodesk.com/blog/talk-your-bim-exploring-aec-data-model-mcp-server-claude)  
29. petrbroz/aps-mcp-server: Experimental Model Context Protocol server providing access to Autodesk Platform Services API. \- GitHub, accessed February 10, 2026, [https://github.com/petrbroz/aps-mcp-server](https://github.com/petrbroz/aps-mcp-server)  
30. OpenAI Agents SDK vs MCP: Feature & Usability Comparison \- PromptLayer Blog, accessed February 10, 2026, [https://blog.promptlayer.com/openai-agents-sdk-vs-mcp/](https://blog.promptlayer.com/openai-agents-sdk-vs-mcp/)  
31. Autodesk Assistant | your agentic AI partner, accessed February 10, 2026, [https://www.autodesk.com/solutions/autodesk-ai/autodesk-assistant](https://www.autodesk.com/solutions/autodesk-ai/autodesk-assistant)  
32. Autodesk Unveils AI Assistant Built on Eight Years of Research | Geo Week News, accessed February 10, 2026, [https://www.geoweeknews.com/news/autodesk-unveils-ai-assistant-built-on-eight-years-of-research](https://www.geoweeknews.com/news/autodesk-unveils-ai-assistant-built-on-eight-years-of-research)  
33. January 2026 Autodesk Construction Cloud Releases – Built for What's Next, accessed February 10, 2026, [https://www.autodesk.com/blogs/construction/january-2026-autodesk-construction-cloud-releases-built-for-whats-next/](https://www.autodesk.com/blogs/construction/january-2026-autodesk-construction-cloud-releases-built-for-whats-next/)  
34. Data Connector API Field Guide \- Autodesk Platform Services, accessed February 10, 2026, [https://aps.autodesk.com/en/docs/acc/v1/overview/field-guide/data-connector](https://aps.autodesk.com/en/docs/acc/v1/overview/field-guide/data-connector)  
35. Autodesk Construction Cloud Integration \- Egnyte Helpdesk, accessed February 10, 2026, [https://helpdesk.egnyte.com/hc/en-us/articles/37437882998029-Autodesk-Construction-Cloud-Integration](https://helpdesk.egnyte.com/hc/en-us/articles/37437882998029-Autodesk-Construction-Cloud-Integration)  
36. Power Automate Connector for Data Exchanges | Autodesk, accessed February 10, 2026, [https://help.autodesk.com/view/DATAEXCHANGE/ENU/?guid=PA\_Data\_Exchanges](https://help.autodesk.com/view/DATAEXCHANGE/ENU/?guid=PA_Data_Exchanges)  
37. 25+ Autodesk Construction Cloud Product Updates to Keep You Connected \- Digital Builder, accessed February 10, 2026, [https://www.autodesk.com/blogs/construction/product-updates-autodesk-construction-may-2020/](https://www.autodesk.com/blogs/construction/product-updates-autodesk-construction-may-2020/)