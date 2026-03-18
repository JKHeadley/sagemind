---
name: format-doc
description: Apply professional Sagemind branding and formatting to a Google Doc. Use after creating or importing a document to make it presentable — not a plain markdown dump.
user_invocable: true
---

# Professional Document Formatting — Sagemind AI

You are formatting a Google Document to look polished and on-brand for Sagemind AI. The document must look like it was produced by a professional consulting firm — never like raw markdown pasted into a doc.

## Input

The user will provide one of:
- A Google Doc ID (already created)
- A Google Doc URL (extract the ID from it)
- Ask you to format "the document" (use the most recently created/referenced doc in conversation)

If no document is specified, ask.

## Brand Reference

### Colors
| Role | Hex | Usage in Docs |
|------|-----|---------------|
| Dark Navy | `#02222e` | Heading text, header/footer backgrounds (via text color) |
| Bright Cyan | `#08f1c7` | Accent lines, key terms, table header backgrounds |
| Teal | `#008276` | Subheading text, secondary accents |
| White | `#ffffff` | Text on dark table headers |
| Light Mint | `#b1ffe7` | Subtle highlights, alternating table rows (optional) |

### Typography
| Element | Font | Size | Style |
|---------|------|------|-------|
| Document Title | Montserrat (fallback: Arial) | 24pt | Bold, Dark Navy `#02222e` |
| H1 Section Headers | Montserrat (fallback: Arial) | 18pt | Bold, Dark Navy `#02222e` |
| H2 Subsection Headers | Montserrat (fallback: Arial) | 14pt | Bold, Teal `#008276` |
| H3 Sub-subsections | Montserrat (fallback: Arial) | 12pt | Bold, Dark Navy `#02222e` |
| Body Text | Open Sans (fallback: Arial) | 11pt | Regular, color `#333333` |
| Table Header Cells | Open Sans (fallback: Arial) | 11pt | Bold, White `#ffffff` on Cyan `#08f1c7` bg |
| Table Body Cells | Open Sans (fallback: Arial) | 10pt | Regular |
| Footer Text | Open Sans (fallback: Arial) | 9pt | Italic, color `#666666` |
| Captions / Fine Print | Open Sans (fallback: Arial) | 9pt | Italic, color `#888888` |

### Spacing
| Element | Value |
|---------|-------|
| Line spacing (body) | 1.15 |
| Space above H1 | 24pt |
| Space below H1 | 12pt |
| Space above H2 | 18pt |
| Space below H2 | 8pt |
| Space above H3 | 14pt |
| Space below H3 | 6pt |
| Space between body paragraphs | 8pt below |
| Page margins | Default (1 inch) — do not change |

## Formatting Procedure

Follow this exact sequence. Use `batch_update_doc` for efficiency — group operations when possible.

### Step 1: Inspect the Document

Call `inspect_doc_structure` to get:
- Total document length (end index)
- Existing structure (headings, tables, tabs)
- Safe insertion points

### Step 2: Identify Content Regions

Read the document with `get_doc_content` or `get_doc_as_markdown`. Map out:
- The title (first line or explicitly marked)
- Section headers (lines that act as H1, H2, H3)
- Body paragraphs
- Tables
- Lists (bulleted or numbered)
- Signature blocks or closing sections

### Step 3: Apply Title Formatting

For the document title (first heading):
```
format_text: bold, font_family "Montserrat", font_size 24, text_color "#02222e"
update_paragraph_style: heading_level 1, alignment "START", space_below 12
```

### Step 4: Apply Section Header Formatting

For each H1-level section header:
```
format_text: bold, font_family "Montserrat", font_size 18, text_color "#02222e"
update_paragraph_style: heading_level 1, space_above 24, space_below 12
```

For each H2:
```
format_text: bold, font_family "Montserrat", font_size 14, text_color "#008276"
update_paragraph_style: heading_level 2, space_above 18, space_below 8
```

For each H3:
```
format_text: bold, font_family "Montserrat", font_size 12, text_color "#02222e"
update_paragraph_style: heading_level 3, space_above 14, space_below 6
```

### Step 5: Apply Body Text Formatting

For all body paragraphs:
```
format_text: font_family "Open Sans", font_size 11, text_color "#333333"
update_paragraph_style: line_spacing 1.15, space_below 8
```

Preserve any existing bold/italic within body text — only change font, size, color, and spacing.

### Step 6: Format Tables

For each table found in the document:

1. **Header row**: Apply background_color `#08f1c7`, text_color `#ffffff`, bold, font_family "Open Sans", font_size 11
2. **Body rows**: font_family "Open Sans", font_size 10, text_color "#333333"
3. **Alternating rows** (optional, for tables with 5+ rows): Apply background_color `#f0faf7` to even rows for readability

### Step 7: Format Lists

For bulleted and numbered lists:
- Same font/size as body text (Open Sans, 11pt)
- Ensure proper indentation via paragraph style
- Space below each list item: 4pt

### Step 8: Add Header

Call `update_doc_headers_footers` with section_type "header":
```
SAGEMIND AI
```

Then format the header text: font_family "Montserrat", font_size 10, bold, text_color "#02222e", alignment "START".

### Step 9: Add Footer

Call `update_doc_headers_footers` with section_type "footer":
```
Sagemind AI LLC  |  sagemindai.io  |  Confidential
```

Then if possible, format: font_family "Open Sans", font_size 9, italic, text_color "#666666", alignment "CENTER".

### Step 10: Insert Logo (if appropriate)

For formal documents (proposals, contracts, SOWs), insert the Sagemind logo at the top of the document using `insert_doc_image` if a Drive-hosted logo URL is available. Skip if not available — do not break the flow for this.

## Document Type-Specific Additions

### Proposals & SOWs
- Include a cover section with: Company name, document title, client name, date, version
- Add a "Prepared by" block at the top
- Add a table of contents hint (formatted text — Google Docs API doesn't support auto-TOC insertion)
- End with a signature block: two columns of lines for "Client" and "Sagemind AI"

### Contracts & Agreements
- Number all sections (1.0, 1.1, 2.0, etc.)
- Bold key terms on first use
- Add "Page X" in the footer if possible
- Signature block with date lines

### Checklists
- Use checkbox-style formatting (☐ / ☑) or ordered lists
- Group items under clear category headers
- Add a status summary table at the top if there are many items

### Reports & Deliverables
- Include an executive summary section at the top
- Use tables for data presentation over inline text
- Add clear section dividers (horizontal rules or extra spacing)

## Quality Checks

After formatting, verify:
1. No raw markdown syntax remains visible (no `#`, `**`, `- [ ]`, etc.)
2. All headings use the correct font, size, and color
3. Body text is consistent throughout
4. Tables have branded headers
5. Header and footer are present
6. No orphaned formatting (e.g., half-bolded words from index miscalculation)

If you spot issues, fix them with targeted `modify_doc_text` or `batch_update_doc` calls.

## Important Notes

- **Always use `justin@sagemindai.io`** for Google Workspace MCP calls (the MCP authenticates as Justin)
- **Work in batches** — use `batch_update_doc` to group operations and minimize API calls
- **Index carefully** — after inserting text, all subsequent indices shift. Inspect structure between major operations if needed.
- **Preserve content** — never delete or alter the meaning of text. Only change formatting.
- **Handle errors gracefully** — if a font isn't available, fall back to Arial. If an operation fails, report it and continue with the rest.
