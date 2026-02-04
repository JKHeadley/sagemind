
You are exactly right. To use this specific Egnyte connection, Tom and his team will need to select a specific Custom GPT (e.g., "GCI Project Search") from their sidebar, rather than just typing into the default "ChatGPT 4" window.
However, this is actually a massive benefit, not a drawback. Here is why this aligns perfectly with Tom's goals, and how you can frame it if he asks:
1. The "@" Mention Feature (The Bridge to "Vanilla")
In ChatGPT Enterprise, users don't always have to switch contexts entirely. They can be in a normal chat and simply type @GCI Project Search to pull that tool into their current conversation.
User Experience: They can be brainstorming a generic email ("Vanilla" mode), realize they need a spec from Egnyte, type @Egnyte to get the file, and then keep writing. It feels seamless.
2. It Solves the "Prompt Engineering" Request
Remember Shalon’s email? She specifically asked for:
"Vetted foundational prompts ready-to-use."
"Training on how to build foundational frameworks..."
If you just gave them "Vanilla ChatGPT + Egnyte," the AI would have no context. It wouldn't know it's a Construction Manager.
The Custom GPT Advantage: You can pre-program the "System Instructions" of the Custom GPT.
You program it to say: "You are an expert Construction Project Manager for GCI. When searching Egnyte, always look for the most recent version of a PDF. Prioritize 'Issued for Construction' drawings over 'Schematic Design'."
Result: The users get a "smart" assistant that knows their business logic automatically, without them having to type a perfect prompt every time.
3. It's Safer
By compartmentalizing the Egnyte access into a specific GPT, you reduce the risk of the AI accidentally trying to search Egnyte when the user just wanted to ask a generic question about a Excel formula. It keeps the "Deep Search" intentional.
Summary:
Yes, it requires using a Custom GPT. But that Custom GPT is the container that holds the specific construction logic, the "vetted prompts," and the secure connection all in one easy-to-click package. It is the "App" approach Tom is looking for.
User
Great! Quick clarification: so users can dynamically "call" a custom GPT from the "vanilla"/main ChatGPT interface? So they don't have to open the custom GPT directly to get access to the search capability? Can you verify this capability with sources?
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
This happens frequently with new Beta features—the "Import" URL doesn't always resolve correctly for ChatGPT's parser.
Here is the Raw OpenAPI JSON you can paste directly into the "Schema" box.
The Fix: Paste this Code
In the ChatGPT Action window, delete anything in the Schema box.
Copy and paste the JSON block below.
Important: After pasting, look at the "url" field (line 9). Ensure it matches your client's domain (https://gcigc.egnyte.com).
code
JSON
{
  "openapi": "3.1.0",
  "info": {
    "title": "GCI Egnyte Search",
    "description": "Search through Egnyte files and content using the Hybrid Search API.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://gcigc.egnyte.com"
    }
  ],
  "paths": {
    "/pubapi/v1/search": {
      "post": {
        "operationId": "searchFiles",
        "summary": "Perform a deep search of file contents",
        "description": "Searches for documents, specifications, and files based on a query.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "The search keywords or natural language query (e.g. '300 California Specs')."
                  }
                },
                "required": [
                  "query"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful search results",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": { "type": "string" },
                          "path": { "type": "string" },
                          "snippet": { "type": "string" }
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
Why this works:
This JSON bypasses the "MCP" middleware URL and points ChatGPT directly to the GCI Egnyte Cloud (gcigc.egnyte.com) using the official Public Search API. This is often more reliable because it uses the exact domain your Client ID/Secret were generated for.
Next Step: Once you paste this, the "Authentication" settings should appear (or remain). Ensure your Client ID/Secret are still saved, and try the "Red Team" test!
Google Search Suggestions
Display of Search Suggestions is required when using Grounding with Google Search. Learn more
Google logo
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
