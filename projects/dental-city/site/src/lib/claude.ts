import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

interface ExtractedItem {
  procedureName: string;
  amount: number | null;
  confidence: "high" | "medium" | "low";
}

interface ParseResult {
  items: ExtractedItem[];
  warnings: string[];
  rawText?: string;
}

export async function parseEstimateDocument(
  base64Data: string,
  mimeType: string
): Promise<ParseResult> {
  const isImage = mimeType.startsWith("image/");

  const systemPrompt = `You are a dental estimate document parser. Extract dental procedure names and their costs from the provided document.

Return a JSON object with this exact structure:
{
  "items": [
    {
      "procedureName": "the procedure name as written",
      "amount": 1234.56 or null if unclear,
      "confidence": "high" | "medium" | "low"
    }
  ],
  "warnings": ["any issues or notes about the extraction"]
}

Guidelines:
- Extract ALL dental procedures mentioned with their costs
- If a cost is a range, use the higher number
- Common procedures: implant, crown, veneer, root canal, extraction, bridge, denture, cleaning, whitening, orthodontics, bone graft, x-ray, CBCT
- Mark confidence "high" if both name and cost are clear
- Mark "medium" if you had to interpret the name or cost
- Mark "low" if you're guessing
- Add warnings for anything ambiguous
- Return ONLY the JSON object, no other text`;

  const content: Anthropic.MessageCreateParams["messages"][0]["content"] = isImage
    ? [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
            data: base64Data,
          },
        },
        {
          type: "text",
          text: "Extract all dental procedures and their costs from this dental estimate/invoice document.",
        },
      ]
    : [
        {
          type: "text",
          text: `Extract all dental procedures and their costs from this dental estimate document:\n\n${Buffer.from(base64Data, "base64").toString("utf-8")}`,
        },
      ];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: "user", content }],
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      items: [],
      warnings: ["Could not parse the document. Please try a clearer image or enter procedures manually."],
    };
  }

  const parsed = JSON.parse(jsonMatch[0]) as ParseResult;
  return parsed;
}

// Map extracted procedure names to our known procedures using fuzzy matching
const knownProcedures = [
  { slug: "dental-implant-with-crown", keywords: ["implant", "implante"] },
  { slug: "all-on-4", keywords: ["all-on-4", "all on 4", "all-on-6", "full arch"] },
  { slug: "dental-crown-porcelain", keywords: ["crown", "corona"] },
  { slug: "veneer-porcelain", keywords: ["veneer", "carilla"] },
  { slug: "root-canal", keywords: ["root canal", "endodon"] },
  { slug: "orthodontics-full", keywords: ["orthodon", "ortodoncia", "braces", "invisalign", "aligner"] },
  { slug: "teeth-whitening", keywords: ["whiten", "blanqueamiento", "bleach"] },
  { slug: "dental-bridge-3unit", keywords: ["bridge", "puente"] },
  { slug: "composite-filling", keywords: ["filling", "composite", "relleno", "restoration"] },
  { slug: "full-denture", keywords: ["denture", "dentadura"] },
  { slug: "dental-cleaning", keywords: ["cleaning", "limpieza", "prophy", "prophylaxis"] },
  { slug: "extraction-simple", keywords: ["simple extraction", "extracción simple"] },
  { slug: "extraction-surgical", keywords: ["surgical extraction", "wisdom", "impacted", "molar", "extracción quirúrgica"] },
  { slug: "bone-graft", keywords: ["bone graft", "injerto", "grafting"] },
  { slug: "panoramic-xray", keywords: ["panoramic", "panorámica", "x-ray", "xray"] },
  { slug: "cbct-3d-scan", keywords: ["cbct", "3d scan", "cone beam", "tomograf"] },
];

export function matchProcedure(name: string): string | null {
  const lower = name.toLowerCase();
  for (const proc of knownProcedures) {
    for (const keyword of proc.keywords) {
      if (lower.includes(keyword)) {
        return proc.slug;
      }
    }
  }
  return null;
}
