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
- Common procedures: implant, crown, veneer, root canal, extraction, bridge, denture, cleaning, whitening, orthodontics, bone graft, x-ray, CBCT, filling, sealant, pulpotomy
- Mark confidence "high" if both name and cost are clear
- Mark "medium" if you had to interpret the name or cost
- Mark "low" if you're guessing
- Add warnings for anything ambiguous
- Return ONLY the JSON object, no other text`;

  const isPdf = mimeType === "application/pdf";

  let content: Anthropic.MessageCreateParams["messages"][0]["content"];

  if (isImage) {
    content = [
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
    ];
  } else if (isPdf) {
    content = [
      {
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: base64Data,
        },
      },
      {
        type: "text",
        text: "Extract all dental procedures and their costs from this dental estimate/invoice document.",
      },
    ];
  } else {
    content = [
      {
        type: "text",
        text: `Extract all dental procedures and their costs from this dental estimate document:\n\n${Buffer.from(base64Data, "base64").toString("utf-8")}`,
      },
    ];
  }

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
// Slugs must match those in src/lib/procedures.ts
const knownProcedures = [
  // General & Diagnostics
  { slug: "consultation", keywords: ["consultation", "consulta", "exam", "checkup"] },
  { slug: "dental-cleaning", keywords: ["cleaning", "limpieza", "prophy", "prophylaxis"] },
  { slug: "intraoral-xray", keywords: ["intraoral", "periapical", "bitewing"] },
  { slug: "panoramic-xray", keywords: ["panoramic", "panorámica", "x-ray", "xray"] },
  { slug: "cbct-sextant", keywords: ["cbct", "3d scan", "cone beam", "tomograf", "ct scan"] },
  { slug: "cbct-full-arch", keywords: ["cbct full", "full arch scan", "full arch cbct"] },
  { slug: "intraoral-scanner", keywords: ["scanner", "smile design", "diseño de sonrisa"] },

  // Restorative
  { slug: "composite-filling", keywords: ["filling", "composite", "relleno", "resina", "restoration"] },
  { slug: "resin-veneer", keywords: ["resin veneer", "carilla de resina"] },
  { slug: "porcelain-inlay", keywords: ["inlay", "onlay", "incrustación"] },

  // Crowns & Prosthetics
  { slug: "crown-porcelain", keywords: ["porcelain crown", "corona porcelana"] },
  { slug: "crown-zirconia", keywords: ["zirconia crown", "corona zirconio"] },
  { slug: "crown-premium", keywords: ["premium crown", "corona premium", "emax crown", "e-max"] },
  { slug: "veneer-porcelain", keywords: ["veneer", "carilla", "porcelain veneer"] },
  { slug: "full-denture", keywords: ["full denture", "complete denture", "dentadura", "prótesis total"] },
  { slug: "partial-denture", keywords: ["partial denture", "partial", "parcial", "chrome cobalt"] },
  { slug: "flexible-prosthesis", keywords: ["flexible", "valplast"] },
  { slug: "hybrid-prosthesis-acrylic", keywords: ["hybrid acrylic", "all-on-4 acrylic", "all on 4", "full arch acrylic"] },
  { slug: "hybrid-prosthesis-zirconia", keywords: ["hybrid zirconia", "all-on-4 zirconia", "full arch zirconia"] },

  // Surgery
  { slug: "extraction-simple", keywords: ["simple extraction", "extracción simple"] },
  { slug: "extraction-surgical", keywords: ["surgical extraction", "extracción quirúrgica"] },
  { slug: "wisdom-tooth-surgery", keywords: ["wisdom", "impacted", "cordal", "third molar"] },
  { slug: "crown-lengthening", keywords: ["crown lengthening", "alargamiento"] },
  { slug: "frenectomy", keywords: ["frenectomy", "frenectomía", "frenum"] },
  { slug: "gingivoplasty", keywords: ["gingivoplasty", "gingivoplastía", "gum contour"] },

  // Endodontics
  { slug: "root-canal-anterior", keywords: ["root canal anterior", "anterior root canal"] },
  { slug: "root-canal-premolar", keywords: ["root canal premolar", "premolar root canal"] },
  { slug: "root-canal-molar", keywords: ["root canal molar", "molar root canal", "root canal"] },
  { slug: "endopost", keywords: ["post and core", "endopost", "post & core", "fiber post"] },

  // Implants
  { slug: "dental-implant", keywords: ["implant only", "implant fixture", "implant body"] },
  { slug: "implant-crown-porcelain", keywords: ["implant with crown", "implant + crown", "implant and crown", "implant crown", "implant"] },
  { slug: "bone-graft-membrane", keywords: ["bone graft", "injerto", "grafting", "membrane", "regeneration"] },
  { slug: "surgical-guide", keywords: ["surgical guide", "guía quirúrgica", "guided surgery"] },

  // Whitening
  { slug: "whitening-polus-advanced", keywords: ["whiten", "blanqueamiento", "bleach", "polus"] },

  // Orthodontics
  { slug: "orthodontics-full", keywords: ["orthodon", "ortodoncia", "braces", "invisalign", "aligner", "bracket"] },

  // Pediatric
  { slug: "sealants", keywords: ["sealant", "sellante"] },
  { slug: "pulpotomy", keywords: ["pulpotomy", "pulpotomía"] },

  // Aesthetics
  { slug: "botox-full-face", keywords: ["botox", "botulinum", "toxina botulínica"] },
  { slug: "lip-fillers", keywords: ["filler", "lip filler", "hyaluronic", "ácido hialurónico", "relleno labio"] },
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
