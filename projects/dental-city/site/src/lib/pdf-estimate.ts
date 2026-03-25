import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const LOGO_URL = "https://dentalcitycr.com/images/logos/logo-blue-full.png";
let cachedLogo: Uint8Array | null = null;

async function fetchLogo(): Promise<Uint8Array | null> {
  if (cachedLogo) return cachedLogo;
  try {
    const res = await fetch(LOGO_URL);
    if (!res.ok) return null;
    cachedLogo = new Uint8Array(await res.arrayBuffer());
    return cachedLogo;
  } catch {
    return null;
  }
}

const BUFFER_MULTIPLIER = 1.10;

// Colors as RGB (0-1 range)
const NAVY = rgb(12 / 255, 30 / 255, 43 / 255);
const PRIMARY_DARK = rgb(21 / 255, 94 / 255, 117 / 255);
const ACCENT = rgb(6 / 255, 182 / 255, 212 / 255);
const TEXT_COLOR = rgb(30 / 255, 41 / 255, 59 / 255);
const TEXT_LIGHT = rgb(100 / 255, 116 / 255, 139 / 255);
const WHITE = rgb(1, 1, 1);
const GREEN = rgb(5 / 255, 150 / 255, 105 / 255);
const SURFACE_BG = rgb(240 / 255, 253 / 255, 250 / 255);
const GREEN_LIGHT_BG = rgb(236 / 255, 253 / 255, 245 / 255);
const YELLOW_BG = rgb(254 / 255, 252 / 255, 232 / 255);
const STRIPE_BG = rgb(248 / 255, 250 / 255, 252 / 255);
const BORDER_LIGHT = rgb(226 / 255, 232 / 255, 240 / 255);

export interface EstimateProcedure {
  name: string;
  usPrice: number;
  dcPrice: number;
  confidence: "high" | "medium" | "low";
}

export interface EstimatePatient {
  name: string;
  email: string;
  phone: string;
  country: string;
  preferredContact: string;
}

export interface CurrencyOptions {
  currency: string;         // ISO code, e.g. "USD", "EUR", "CAD"
  currencySymbol: string;   // e.g. "$", "€", "C$"
  currencyDisclaimer: string; // conversion disclaimer text, empty for USD
}

function formatAmount(amount: number, symbol: string): string {
  return symbol + amount.toLocaleString("en-US");
}

export async function generateEstimatePdf(
  patient: EstimatePatient,
  procedures: EstimateProcedure[],
  currencyOpts?: CurrencyOptions
): Promise<Buffer> {
  const symbol = currencyOpts?.currencySymbol || "$";
  const currencyDisclaimer = currencyOpts?.currencyDisclaimer || "";
  const totalUs = procedures.reduce((sum, p) => sum + p.usPrice, 0);
  const displayProcedures = procedures.map((p) => ({
    ...p,
    dcPriceDisplay: Math.round(p.dcPrice * BUFFER_MULTIPLIER),
  }));
  const totalDcDisplay = displayProcedures.reduce((sum, p) => sum + p.dcPriceDisplay, 0);
  const totalSavingsDisplay = totalUs - totalDcDisplay;
  const savingsPctDisplay = totalUs > 0 ? Math.round((totalSavingsDisplay / totalUs) * 100) : 0;

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginLeft = 50;
  const marginRight = 50;
  const pageWidth = width - marginLeft - marginRight;

  // Helper: draw filled rect
  function drawRect(x: number, y: number, w: number, h: number, color: ReturnType<typeof rgb>) {
    page.drawRectangle({ x, y, width: w, height: h, color });
  }

  // Helper: draw text
  function drawText(
    text: string,
    x: number,
    y: number,
    opts: { font?: typeof helvetica; size?: number; color?: ReturnType<typeof rgb>; maxWidth?: number } = {}
  ) {
    page.drawText(text, {
      x,
      y,
      font: opts.font || helvetica,
      size: opts.size || 8,
      color: opts.color || TEXT_COLOR,
      maxWidth: opts.maxWidth,
    });
  }

  // Helper: right-aligned text
  function drawTextRight(
    text: string,
    rightX: number,
    y: number,
    opts: { font?: typeof helvetica; size?: number; color?: ReturnType<typeof rgb> } = {}
  ) {
    const font = opts.font || helvetica;
    const size = opts.size || 8;
    const tw = font.widthOfTextAtSize(text, size);
    drawText(text, rightX - tw, y, { ...opts, font, size });
  }

  // Helper: centered text
  function drawTextCenter(
    text: string,
    y: number,
    opts: { font?: typeof helvetica; size?: number; color?: ReturnType<typeof rgb> } = {}
  ) {
    const font = opts.font || helvetica;
    const size = opts.size || 8;
    const tw = font.widthOfTextAtSize(text, size);
    drawText(text, marginLeft + (pageWidth - tw) / 2, y, { ...opts, font, size });
  }

  let y = height;

  // ── HEADER BAR ──
  const headerH = 90;
  drawRect(0, y - headerH, width, headerH, NAVY);

  // Embed logo
  const logoBytes = await fetchLogo();
  if (logoBytes) {
    try {
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(68 / logoImage.height);
      page.drawImage(logoImage, { x: marginLeft, y: y - 80, width: logoDims.width, height: logoDims.height });
    } catch { /* skip logo if embed fails */ }
  }

  drawText("DENTAL CITY", width - marginRight - 180, y - 28, { font: helveticaBold, size: 20, color: WHITE });
  drawText("Let Your Smile Change the World", width - marginRight - 180, y - 44, { size: 9, color: ACCENT });
  drawText("Aguas Zarcas, Costa Rica", width - marginRight - 180, y - 58, { size: 8, color: rgb(148 / 255, 163 / 255, 184 / 255) });
  drawText("info@dentalcitycr.com  |  dentalcitycr.com", width - marginRight - 180, y - 70, { size: 8, color: rgb(148 / 255, 163 / 255, 184 / 255) });
  y -= headerH + 24;

  // ── TITLE ──
  drawTextCenter("PRELIMINARY DENTAL ESTIMATE", y, { font: helveticaBold, size: 16, color: PRIMARY_DARK });
  y -= 20;
  drawTextCenter(dateStr, y, { size: 9, color: TEXT_LIGHT });
  y -= 26;

  // ── PATIENT INFO BOX ──
  const boxH = 82;
  drawRect(marginLeft, y - boxH, pageWidth, boxH, SURFACE_BG);
  page.drawRectangle({ x: marginLeft, y: y - boxH, width: pageWidth, height: boxH, borderColor: BORDER_LIGHT, borderWidth: 1 });

  const col1 = marginLeft + 14;
  const col2 = marginLeft + pageWidth / 2 + 10;
  let infoY = y - 18;

  drawText("Patient Information", col1, infoY, { font: helveticaBold, size: 10, color: PRIMARY_DARK });
  infoY -= 18;

  drawText("Name:", col1, infoY, { size: 9, color: TEXT_LIGHT });
  drawText(patient.name, col1 + 48, infoY, { font: helveticaBold, size: 9 });
  drawText("Country:", col2, infoY, { size: 9, color: TEXT_LIGHT });
  drawText(patient.country || "N/A", col2 + 65, infoY, { font: helveticaBold, size: 9 });
  infoY -= 15;

  drawText("Email:", col1, infoY, { size: 9, color: TEXT_LIGHT });
  drawText(patient.email, col1 + 48, infoY, { font: helveticaBold, size: 9 });
  drawText("Preferred Contact:", col2, infoY, { size: 9, color: TEXT_LIGHT });
  drawText(patient.preferredContact, col2 + 100, infoY, { font: helveticaBold, size: 9 });
  infoY -= 15;

  drawText("Phone:", col1, infoY, { size: 9, color: TEXT_LIGHT });
  drawText(patient.phone || "N/A", col1 + 48, infoY, { font: helveticaBold, size: 9 });

  y -= boxH + 18;

  // ── PROCEDURES TABLE ──
  drawText("Procedures Identified", marginLeft, y, { font: helveticaBold, size: 11, color: PRIMARY_DARK });
  y -= 20;

  const colX = [marginLeft, marginLeft + 250, marginLeft + 340, marginLeft + 420];
  const colEnd = [marginLeft + 240, marginLeft + 330, marginLeft + 410, width - marginRight - 10];
  const rowH = 24;

  // Table header
  drawRect(marginLeft, y - rowH, pageWidth, rowH, PRIMARY_DARK);
  const priceLabel = currencyOpts?.currency && currencyOpts.currency !== "USD" ? `Your Price (${symbol})` : "US Price";
  drawText("Procedure", colX[0] + 10, y - 16, { font: helveticaBold, size: 9, color: WHITE });
  drawTextRight(priceLabel, colEnd[1], y - 16, { font: helveticaBold, size: 9, color: WHITE });
  drawTextRight(`DC Price (${symbol})`, colEnd[2], y - 16, { font: helveticaBold, size: 9, color: WHITE });
  drawTextRight("You Save", colEnd[3], y - 16, { font: helveticaBold, size: 9, color: WHITE });
  y -= rowH;

  // Table rows
  for (let i = 0; i < displayProcedures.length; i++) {
    const proc = displayProcedures[i];
    const savings = proc.usPrice - proc.dcPriceDisplay;
    const savePct = proc.usPrice > 0 ? Math.round((savings / proc.usPrice) * 100) : 0;
    const bgColor = i % 2 === 0 ? WHITE : STRIPE_BG;

    drawRect(marginLeft, y - rowH, pageWidth, rowH, bgColor);
    drawText(proc.name, colX[0] + 10, y - 16, { size: 9 });
    drawTextRight(formatAmount(proc.usPrice, symbol), colEnd[1], y - 16, { size: 9, color: TEXT_LIGHT });
    drawTextRight(formatAmount(proc.dcPriceDisplay, symbol), colEnd[2], y - 16, { font: helveticaBold, size: 9, color: PRIMARY_DARK });
    drawTextRight(`${formatAmount(savings, symbol)} (${savePct}%)`, colEnd[3], y - 16, { font: helveticaBold, size: 9, color: GREEN });
    y -= rowH;
  }

  // Table footer (totals)
  const totalRowH = 26;
  drawRect(marginLeft, y - totalRowH, pageWidth, totalRowH, NAVY);
  drawText("TOTAL", colX[0] + 10, y - 17, { font: helveticaBold, size: 10, color: WHITE });
  drawTextRight(formatAmount(totalUs, symbol), colEnd[1], y - 17, { font: helveticaBold, size: 10, color: WHITE });
  drawTextRight(formatAmount(totalDcDisplay, symbol), colEnd[2], y - 17, { font: helveticaBold, size: 10, color: ACCENT });
  drawTextRight(`${formatAmount(totalSavingsDisplay, symbol)} (${savingsPctDisplay}%)`, colEnd[3], y - 17, { font: helveticaBold, size: 10, color: rgb(52 / 255, 211 / 255, 153 / 255) });
  y -= totalRowH + 14;

  // ── SAVINGS HIGHLIGHT BOX ──
  const savingsBoxH = 58;
  drawRect(marginLeft, y - savingsBoxH, pageWidth, savingsBoxH, GREEN_LIGHT_BG);
  page.drawRectangle({ x: marginLeft, y: y - savingsBoxH, width: pageWidth, height: savingsBoxH, borderColor: rgb(167 / 255, 243 / 255, 208 / 255), borderWidth: 1 });
  drawTextCenter(`Dental City Estimate: ${formatAmount(totalDcDisplay, symbol)}`, y - 15, { font: helveticaBold, size: 11, color: PRIMARY_DARK });
  drawTextCenter(`Total Estimated Savings: ${formatAmount(totalSavingsDisplay, symbol)}`, y - 33, { font: helveticaBold, size: 14, color: GREEN });
  drawTextCenter(`That's ${savingsPctDisplay}% less than typical US pricing`, y - 49, { size: 10, color: rgb(6 / 255, 95 / 255, 70 / 255) });
  y -= savingsBoxH + 14;

  // ── DISCLAIMER BOX ──
  const hasConversionNote = currencyDisclaimer.length > 0;
  const disclaimerH = hasConversionNote ? 70 : 58;
  drawRect(marginLeft, y - disclaimerH, pageWidth, disclaimerH, YELLOW_BG);
  page.drawRectangle({ x: marginLeft, y: y - disclaimerH, width: pageWidth, height: disclaimerH, borderColor: rgb(253 / 255, 230 / 255, 138 / 255), borderWidth: 1 });
  drawText("IMPORTANT DISCLAIMER", marginLeft + 14, y - 16, { font: helveticaBold, size: 8.5, color: rgb(146 / 255, 64 / 255, 14 / 255) });
  drawText(
    "This is a preliminary estimate based on AI analysis of the documents you provided. Final treatment plans and pricing",
    marginLeft + 14, y - 30, { size: 8, color: rgb(120 / 255, 53 / 255, 15 / 255) }
  );
  drawText(
    "will be determined after an in-person evaluation by our dental team. We accept USD, CRC, and major credit cards.",
    marginLeft + 14, y - 42, { size: 8, color: rgb(120 / 255, 53 / 255, 15 / 255) }
  );
  if (hasConversionNote) {
    drawText(
      currencyDisclaimer,
      marginLeft + 14, y - 54, { size: 7.5, color: rgb(120 / 255, 53 / 255, 15 / 255) }
    );
  }
  y -= disclaimerH + 14;

  // ── WHAT'S NEXT BOX ──
  const nextH = 70;
  drawRect(marginLeft, y - nextH, pageWidth, nextH, SURFACE_BG);
  page.drawRectangle({ x: marginLeft, y: y - nextH, width: pageWidth, height: nextH, borderColor: rgb(153 / 255, 246 / 255, 228 / 255), borderWidth: 1 });
  drawText("What Happens Next?", marginLeft + 14, y - 16, { font: helveticaBold, size: 10, color: PRIMARY_DARK });
  drawText("•  Our team will review your documents within 48-72 business hours", marginLeft + 18, y - 32, { size: 8.5 });
  drawText(`•  We'll contact you via ${patient.preferredContact}`, marginLeft + 18, y - 45, { size: 8.5 });
  drawText("•  After evaluation, we'll provide a final treatment plan and pricing", marginLeft + 18, y - 58, { size: 8.5 });

  // ── FOOTER BAR ──
  const footerH = 42;
  drawRect(0, 0, width, footerH, NAVY);
  drawTextCenter("Dental City CR  |  Let Your Smile Change the World", 26, { font: helveticaBold, size: 8, color: ACCENT });
  drawTextCenter("Tel: +506 8339 8833   |   Email: info@dentalcitycr.com   |   Web: dentalcitycr.com", 12, { size: 7.5, color: rgb(148 / 255, 163 / 255, 184 / 255) });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
