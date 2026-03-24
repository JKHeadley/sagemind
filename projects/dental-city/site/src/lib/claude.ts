import { GoogleGenerativeAI } from "@google/generative-ai";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenerativeAI(apiKey);
}

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
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
- Use the "Fee" column amount (total fee before insurance), NOT the patient responsibility amount
- If a cost is a range, use the higher number
- Common procedures: implant, crown, veneer, root canal, extraction, bridge, denture, cleaning, whitening, orthodontics, bone graft, x-ray, CBCT, filling, sealant, pulpotomy
- Mark confidence "high" if both name and cost are clear
- Mark "medium" if you had to interpret the name or cost
- Mark "low" if you're guessing
- Add warnings for anything ambiguous
- Return ONLY the JSON object, no other text`;

  const parts = [
    {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    },
    {
      text: systemPrompt + "\n\nExtract all dental procedures and their costs from this dental estimate/invoice document.",
    },
  ];

  const result = await model.generateContent(parts);
  const response = result.response;
  const text = response.text();

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
  { slug: "consultation", keywords: ["consultation", "consulta", "exam", "checkup", "evaluation"] },
  { slug: "dental-cleaning", keywords: ["cleaning", "limpieza", "prophy", "prophylaxis", "scaling"] },
  { slug: "intraoral-xray", keywords: ["intraoral", "periapical", "bitewing", "complete series"] },
  { slug: "panoramic-xray", keywords: ["panoramic", "panorámica", "x-ray", "xray"] },
  { slug: "cbct-sextant", keywords: ["cbct", "3d scan", "cone beam", "tomograf", "ct scan"] },
  { slug: "cbct-full-arch", keywords: ["cbct full", "full arch scan", "full arch cbct"] },
  { slug: "intraoral-scanner", keywords: ["scanner", "smile design", "diseño de sonrisa"] },

  // Restorative
  { slug: "composite-filling", keywords: ["filling", "composite", "relleno", "resina", "restoration"] },
  { slug: "resin-veneer", keywords: ["resin veneer", "carilla de resina"] },
  { slug: "porcelain-inlay", keywords: ["inlay", "onlay", "incrustación"] },

  // Crowns & Prosthetics
  { slug: "crown-porcelain", keywords: ["porcelain crown", "corona porcelana", "crown - porcelain", "crown porcelain"] },
  { slug: "crown-zirconia", keywords: ["zirconia crown", "corona zirconio"] },
  { slug: "crown-premium", keywords: ["premium crown", "corona premium", "emax crown", "e-max"] },
  { slug: "veneer-porcelain", keywords: ["veneer", "carilla", "porcelain veneer"] },
  { slug: "full-denture", keywords: ["full denture", "complete denture", "complete upper denture", "complete lower denture", "dentadura", "prótesis total"] },
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
  { slug: "dental-implant", keywords: ["endosseous implant", "implant only", "implant fixture", "implant body"] },
  { slug: "implant-crown-porcelain", keywords: ["implant with crown", "implant + crown", "implant and crown", "implant crown"] },
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

  // Abutments (map to implant)
  { slug: "implant-crown-porcelain", keywords: ["abutment"] },
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
