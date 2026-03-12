// Dental City 2026 Actual Price List
// Source: "Precios actualizados Dental City 2026.pdf"
// Colones converted at ~505 CRC/USD using "con IVA" prices
// Items marked with $ in the PDF are already in USD

export interface Procedure {
  slug: string;
  nameEn: string;
  nameEs: string;
  categoryEn: string;
  categoryEs: string;
  price: number; // USD (single price or low end)
  priceMax?: number; // USD (high end, if range)
  usPriceMin: number;
  usPriceMax: number;
  sortOrder: number;
}

export const procedures: Procedure[] = [
  // === General & Diagnostics ===
  { slug: "consultation", nameEn: "Consultation (incl. Panoramic X-Ray)", nameEs: "Consulta (incluye Rx Panorámica)", categoryEn: "General", categoryEs: "General", price: 51, usPriceMin: 150, usPriceMax: 350, sortOrder: 1 },
  { slug: "dental-cleaning", nameEn: "Dental Cleaning", nameEs: "Limpieza Dental", categoryEn: "General", categoryEs: "General", price: 59, usPriceMin: 100, usPriceMax: 300, sortOrder: 2 },
  { slug: "intraoral-xray", nameEn: "Intraoral X-Ray", nameEs: "Radiografía Intraoral", categoryEn: "Diagnostics", categoryEs: "Diagnóstico", price: 24, usPriceMin: 50, usPriceMax: 150, sortOrder: 3 },
  { slug: "panoramic-xray", nameEn: "Panoramic X-Ray", nameEs: "Radiografía Panorámica, ATM & Cefalométrica", categoryEn: "Diagnostics", categoryEs: "Diagnóstico", price: 46, usPriceMin: 100, usPriceMax: 250, sortOrder: 4 },
  { slug: "cbct-sextant", nameEn: "CBCT 3D Scan (Sextant)", nameEs: "TAC Sextante", categoryEn: "Diagnostics", categoryEs: "Diagnóstico", price: 99, usPriceMin: 250, usPriceMax: 600, sortOrder: 5 },
  { slug: "cbct-full-arch", nameEn: "CBCT 3D Scan (Full Arch)", nameEs: "TAC Arcada Completa", categoryEn: "Diagnostics", categoryEs: "Diagnóstico", price: 129, usPriceMin: 300, usPriceMax: 800, sortOrder: 6 },
  { slug: "intraoral-scanner", nameEn: "Intraoral Scanner / Smile Design", nameEs: "Scanner Intraoral / Diseño de Sonrisa", categoryEn: "Diagnostics", categoryEs: "Diagnóstico", price: 69, usPriceMin: 150, usPriceMax: 500, sortOrder: 7 },

  // === Restorative ===
  { slug: "composite-filling", nameEn: "Composite Filling", nameEs: "Resina (Relleno)", categoryEn: "Restorative", categoryEs: "Restaurativa", price: 62, priceMax: 89, usPriceMin: 150, usPriceMax: 450, sortOrder: 10 },
  { slug: "extended-filling", nameEn: "Extended Composite Filling", nameEs: "Resina Extensa", categoryEn: "Restorative", categoryEs: "Restaurativa", price: 89, usPriceMin: 200, usPriceMax: 500, sortOrder: 11 },
  { slug: "resin-veneer", nameEn: "Resin Veneer", nameEs: "Carilla de Resina", categoryEn: "Restorative", categoryEs: "Restaurativa", price: 99, usPriceMin: 250, usPriceMax: 600, sortOrder: 12 },
  { slug: "premium-resin-veneer", nameEn: "Premium Resin Veneer", nameEs: "Carilla de Resina Premium", categoryEn: "Restorative", categoryEs: "Restaurativa", price: 218, usPriceMin: 400, usPriceMax: 1000, sortOrder: 13 },
  { slug: "resin-inlay", nameEn: "Resin Inlay", nameEs: "Incrustación de Resina", categoryEn: "Restorative", categoryEs: "Restaurativa", price: 238, usPriceMin: 500, usPriceMax: 1200, sortOrder: 14 },
  { slug: "porcelain-inlay", nameEn: "Porcelain Inlay", nameEs: "Incrustación de Porcelana", categoryEn: "Restorative", categoryEs: "Restaurativa", price: 465, usPriceMin: 800, usPriceMax: 2000, sortOrder: 15 },
  { slug: "diastema-closure", nameEn: "Diastema Closure", nameEs: "Cierre de Diastema", categoryEn: "Restorative", categoryEs: "Restaurativa", price: 99, usPriceMin: 200, usPriceMax: 600, sortOrder: 16 },

  // === Crowns & Prosthetics ===
  { slug: "crown-metal-porcelain", nameEn: "Metal Porcelain Crown", nameEs: "Corona Metal Porcelana", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 465, usPriceMin: 1000, usPriceMax: 2000, sortOrder: 20 },
  { slug: "crown-porcelain", nameEn: "Porcelain Crown", nameEs: "Corona Porcelana", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 465, usPriceMin: 1000, usPriceMax: 2000, sortOrder: 21 },
  { slug: "crown-zirconia", nameEn: "Zirconia Crown", nameEs: "Corona Zirconio", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 465, usPriceMin: 1000, usPriceMax: 2500, sortOrder: 22 },
  { slug: "crown-premium", nameEn: "Premium Crown", nameEs: "Corona Premium", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 515, usPriceMin: 1200, usPriceMax: 3000, sortOrder: 23 },
  { slug: "veneer-porcelain", nameEn: "Porcelain Veneer", nameEs: "Carilla de Porcelana", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 515, usPriceMin: 800, usPriceMax: 2500, sortOrder: 24 },
  { slug: "full-denture", nameEn: "Full Denture", nameEs: "Prótesis Total", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 436, usPriceMin: 1000, usPriceMax: 3000, sortOrder: 25 },
  { slug: "partial-denture", nameEn: "Partial Denture (Chrome Cobalt)", nameEs: "Prótesis Parcial Cromo Cobalto", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 485, usPriceMin: 1000, usPriceMax: 2500, sortOrder: 26 },
  { slug: "flexible-prosthesis", nameEn: "Flexible Prosthesis", nameEs: "Prótesis Flexible", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 535, usPriceMin: 1200, usPriceMax: 3000, sortOrder: 27 },
  { slug: "hybrid-prosthesis-acrylic", nameEn: "Hybrid Prosthesis (Acrylic)", nameEs: "Prótesis Híbrida Acrílica", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 10850, usPriceMin: 20000, usPriceMax: 35000, sortOrder: 28 },
  { slug: "hybrid-prosthesis-zirconia", nameEn: "Hybrid Prosthesis (Zirconia)", nameEs: "Prótesis Híbrida Zirconio", categoryEn: "Crowns & Prosthetics", categoryEs: "Coronas y Prótesis", price: 12100, usPriceMin: 25000, usPriceMax: 45000, sortOrder: 29 },

  // === Extractions & Surgery ===
  { slug: "extraction-simple", nameEn: "Simple Extraction", nameEs: "Exodoncia Simple", categoryEn: "Surgery", categoryEs: "Cirugía", price: 51, usPriceMin: 150, usPriceMax: 350, sortOrder: 30 },
  { slug: "extraction-surgical", nameEn: "Surgical Extraction", nameEs: "Exodoncia Quirúrgica", categoryEn: "Surgery", categoryEs: "Cirugía", price: 83, usPriceMin: 200, usPriceMax: 600, sortOrder: 31 },
  { slug: "wisdom-tooth-surgery", nameEn: "Wisdom Tooth Surgery", nameEs: "Cirugía de Cordales", categoryEn: "Surgery", categoryEs: "Cirugía", price: 192, usPriceMin: 300, usPriceMax: 800, sortOrder: 32 },
  { slug: "crown-lengthening", nameEn: "Crown Lengthening", nameEs: "Alargamiento de Corona", categoryEn: "Surgery", categoryEs: "Cirugía", price: 103, usPriceMin: 300, usPriceMax: 1000, sortOrder: 33 },
  { slug: "frenectomy", nameEn: "Frenectomy", nameEs: "Frenectomía", categoryEn: "Surgery", categoryEs: "Cirugía", price: 148, usPriceMin: 300, usPriceMax: 800, sortOrder: 34 },
  { slug: "gingivoplasty", nameEn: "Gingivoplasty (per arch)", nameEs: "Gingivoplastía (por arco)", categoryEn: "Surgery", categoryEs: "Cirugía", price: 119, usPriceMin: 300, usPriceMax: 1000, sortOrder: 35 },

  // === Endodontics ===
  { slug: "root-canal-anterior", nameEn: "Root Canal (Anterior)", nameEs: "Endodoncia Anterior", categoryEn: "Endodontics", categoryEs: "Endodoncia", price: 257, usPriceMin: 700, usPriceMax: 1200, sortOrder: 40 },
  { slug: "root-canal-premolar", nameEn: "Root Canal (Premolar)", nameEs: "Endodoncia Premolar", categoryEn: "Endodontics", categoryEs: "Endodoncia", price: 277, usPriceMin: 800, usPriceMax: 1400, sortOrder: 41 },
  { slug: "root-canal-molar", nameEn: "Root Canal (Molar) — Specialist", nameEs: "Endodoncia Molar — Especialista", categoryEn: "Endodontics", categoryEs: "Endodoncia", price: 391, usPriceMin: 1000, usPriceMax: 1800, sortOrder: 42 },
  { slug: "endopost", nameEn: "Endopost (Post & Core)", nameEs: "Endoposte", categoryEn: "Endodontics", categoryEs: "Endodoncia", price: 79, usPriceMin: 200, usPriceMax: 500, sortOrder: 43 },

  // === Implants ===
  { slug: "dental-implant", nameEn: "Dental Implant (fixture only)", nameEs: "Implante Dental (solo implante)", categoryEn: "Implants", categoryEs: "Implantes", price: 830, usPriceMin: 2000, usPriceMax: 4000, sortOrder: 50 },
  { slug: "implant-crown-metal-porcelain", nameEn: "Implant + Crown (Metal Porcelain)", nameEs: "Implante + Corona (Metal Porcelana)", categoryEn: "Implants", categoryEs: "Implantes", price: 1660, usPriceMin: 3500, usPriceMax: 6000, sortOrder: 51 },
  { slug: "implant-crown-porcelain", nameEn: "Implant + Crown (Porcelain)", nameEs: "Implante + Corona (Porcelana)", categoryEn: "Implants", categoryEs: "Implantes", price: 1765, usPriceMin: 3500, usPriceMax: 6000, sortOrder: 52 },
  { slug: "implant-emax-ti-base", nameEn: "E-max Crown on Ti Base (Zirconia Post)", nameEs: "Corona E-max sobre Ti Base (Poste Zirconio)", categoryEn: "Implants", categoryEs: "Implantes", price: 956, usPriceMin: 1500, usPriceMax: 3000, sortOrder: 53 },
  { slug: "bone-graft-membrane", nameEn: "Bone Graft with Membrane", nameEs: "Regeneración con Injerto y Membrana", categoryEn: "Implants", categoryEs: "Implantes", price: 500, usPriceMin: 500, usPriceMax: 1500, sortOrder: 54 },
  { slug: "surgical-guide", nameEn: "Surgical Guide", nameEs: "Guía Quirúrgica", categoryEn: "Implants", categoryEs: "Implantes", price: 300, usPriceMin: 400, usPriceMax: 1000, sortOrder: 55 },

  // === Whitening ===
  { slug: "whitening-home", nameEn: "Home Whitening (with trays)", nameEs: "Blanqueamiento Casa (incluye fundas)", categoryEn: "Whitening", categoryEs: "Blanqueamiento", price: 208, usPriceMin: 300, usPriceMax: 600, sortOrder: 60 },
  { slug: "whitening-polus-advanced", nameEn: "In-Office Whitening (POLUS Advanced)", nameEs: "Blanqueamiento POLUS Advanced", categoryEn: "Whitening", categoryEs: "Blanqueamiento", price: 309, usPriceMin: 400, usPriceMax: 800, sortOrder: 61 },
  { slug: "whitening-polus-premium", nameEn: "In-Office Whitening (POLUS Premium)", nameEs: "Blanqueamiento POLUS Premium", categoryEn: "Whitening", categoryEs: "Blanqueamiento", price: 376, usPriceMin: 500, usPriceMax: 1000, sortOrder: 62 },

  // === Orthodontics ===
  { slug: "orthodontics-full", nameEn: "Orthodontics (Full Treatment)", nameEs: "Ortodoncia (Tratamiento Completo)", categoryEn: "Orthodontics", categoryEs: "Ortodoncia", price: 900, priceMax: 1800, usPriceMin: 4000, usPriceMax: 8000, sortOrder: 70 },
  { slug: "ortho-study", nameEn: "Complete Orthodontic Study", nameEs: "Estudio Ortodóntico Completo", categoryEn: "Orthodontics", categoryEs: "Ortodoncia", price: 89, usPriceMin: 200, usPriceMax: 500, sortOrder: 71 },

  // === Pediatric ===
  { slug: "sealants", nameEn: "Dental Sealants (Children)", nameEs: "Sellantes (Niños)", categoryEn: "Pediatric", categoryEs: "Pediátrica", price: 50, usPriceMin: 30, usPriceMax: 80, sortOrder: 80 },
  { slug: "pulpotomy", nameEn: "Pulpotomy (Children)", nameEs: "Pulpotomía (Niños)", categoryEn: "Pediatric", categoryEs: "Pediátrica", price: 69, usPriceMin: 100, usPriceMax: 300, sortOrder: 81 },
  { slug: "space-maintainer", nameEn: "Space Maintainer (Children)", nameEs: "Mantenedor de Espacio (Niños)", categoryEn: "Pediatric", categoryEs: "Pediátrica", price: 99, usPriceMin: 200, usPriceMax: 500, sortOrder: 82 },

  // === Aesthetics / Orofacial ===
  { slug: "botox-full-face", nameEn: "Botox Full Face", nameEs: "Toxina Botulínica Full Face", categoryEn: "Aesthetics", categoryEs: "Estética", price: 309, usPriceMin: 500, usPriceMax: 1200, sortOrder: 90 },
  { slug: "botox-bruxism", nameEn: "Botox for Bruxism", nameEs: "Toxina Botulínica Bruxismo", categoryEn: "Aesthetics", categoryEs: "Estética", price: 309, usPriceMin: 500, usPriceMax: 1200, sortOrder: 91 },
  { slug: "lip-fillers", nameEn: "Lip Fillers (Hyaluronic Acid)", nameEs: "Rellenos de Labios con Ác. Hialurónico", categoryEn: "Aesthetics", categoryEs: "Estética", price: 309, usPriceMin: 500, usPriceMax: 1500, sortOrder: 92 },
];

// Helper to format a procedure's price as a display string
export function formatPrice(proc: Procedure): string {
  if (proc.priceMax) {
    return `$${proc.price}–$${proc.priceMax}`;
  }
  return `$${proc.price.toLocaleString()}`;
}

export function formatUSPrice(proc: Procedure): string {
  return `$${proc.usPriceMin.toLocaleString()}–$${proc.usPriceMax.toLocaleString()}`;
}

export function calcSavingsPercent(proc: Procedure): string {
  const dcAvg = proc.priceMax ? (proc.price + proc.priceMax) / 2 : proc.price;
  const usAvg = (proc.usPriceMin + proc.usPriceMax) / 2;
  const pct = Math.round(((usAvg - dcAvg) / usAvg) * 100);
  return `${Math.max(0, pct)}%`;
}
