const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const logoPath = path.join(__dirname, "../site/public/images/logos/logo-blue-full.png");
const outputPath = path.join(__dirname, "../sample-estimate.pdf");

// Brand colors
const NAVY = "#0c1e2b";
const PRIMARY = "#0e7490";
const PRIMARY_DARK = "#155e75";
const ACCENT = "#06b6d4";
const TEXT = "#1e293b";
const TEXT_LIGHT = "#64748b";
const SURFACE = "#f0fdfa";
const WHITE = "#ffffff";
const LIGHT_BORDER = "#e2e8f0";
const GREEN = "#059669";
const GREEN_LIGHT = "#ecfdf5";

// Sample patient data
const patient = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@gmail.com",
  phone: "+1 (555) 432-8901",
  country: "United States",
  preferredContact: "WhatsApp",
  date: "March 23, 2026",
};

// Sample parsed procedures (realistic US estimate)
const procedures = [
  { name: "Dental Implant (fixture only)", usPrice: 3200, dcPrice: 830, confidence: "high" },
  { name: "Zirconia Crown", usPrice: 1800, dcPrice: 465, confidence: "high" },
  { name: "Root Canal (Molar) — Specialist", usPrice: 1400, dcPrice: 391, confidence: "high" },
  { name: "Porcelain Crown", usPrice: 1500, dcPrice: 465, confidence: "medium" },
  { name: "Bone Graft with Membrane", usPrice: 1200, dcPrice: 500, confidence: "high" },
  { name: "Dental Cleaning", usPrice: 200, dcPrice: 59, confidence: "high" },
];

const totalUs = procedures.reduce((sum, p) => sum + p.usPrice, 0);
const totalDc = procedures.reduce((sum, p) => sum + p.dcPrice, 0);
const totalSavings = totalUs - totalDc;
const savingsPct = Math.round((totalSavings / totalUs) * 100);

// Apply 10% buffer to DC prices for display
const BUFFER = 1.10;
const displayProcedures = procedures.map(p => ({
  ...p,
  dcPriceDisplay: Math.round(p.dcPrice * BUFFER),
}));
const totalDcDisplay = displayProcedures.reduce((sum, p) => sum + p.dcPriceDisplay, 0);
const totalSavingsDisplay = totalUs - totalDcDisplay;
const savingsPctDisplay = Math.round((totalSavingsDisplay / totalUs) * 100);

function formatUSD(amount) {
  return "$" + amount.toLocaleString("en-US");
}

// Create PDF
const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 30, bottom: 30, left: 50, right: 50 },
  info: {
    Title: `Dental City Estimate - ${patient.name}`,
    Author: "Dental City Costa Rica",
    Subject: "Preliminary Dental Estimate",
  },
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
let y = doc.page.margins.top;

// ── HEADER BAR ──
doc.rect(0, 0, doc.page.width, 72).fill(NAVY);

// Logo
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 50, 10, { height: 52 });
}

// Header text (right side)
doc.font("Helvetica-Bold").fontSize(16).fillColor(WHITE)
  .text("DENTAL CITY", 320, 14, { width: 230, align: "right" });
doc.font("Helvetica").fontSize(8).fillColor(ACCENT)
  .text("Let Your Smile Change the World", 320, 33, { width: 230, align: "right" });
doc.fontSize(7.5).fillColor("#94a3b8")
  .text("Aguas Zarcas, Costa Rica", 320, 46, { width: 230, align: "right" })
  .text("info@dentalcitycr.com  |  dentalcitycr.com", 320, 57, { width: 230, align: "right" });

y = 82;

// ── TITLE ──
doc.font("Helvetica-Bold").fontSize(13).fillColor(PRIMARY_DARK)
  .text("PRELIMINARY DENTAL ESTIMATE", 50, y, { width: pageWidth, align: "center" });
y += 18;
doc.font("Helvetica").fontSize(8).fillColor(TEXT_LIGHT)
  .text(patient.date, 50, y, { width: pageWidth, align: "center" });
y += 18;

// ── PATIENT INFO BOX ──
const boxLeft = 50;
const boxWidth = pageWidth;
doc.roundedRect(boxLeft, y, boxWidth, 72, 4).fill(SURFACE);
doc.roundedRect(boxLeft, y, boxWidth, 72, 4).stroke(LIGHT_BORDER);

const col1 = boxLeft + 12;
const col2 = boxLeft + boxWidth / 2 + 10;
const infoY = y + 8;

doc.font("Helvetica-Bold").fontSize(8.5).fillColor(PRIMARY_DARK)
  .text("Patient Information", col1, infoY);

doc.font("Helvetica").fontSize(8).fillColor(TEXT_LIGHT);
doc.text("Name:", col1, infoY + 16);
doc.text("Email:", col1, infoY + 28);
doc.text("Phone:", col1, infoY + 40);
doc.text("Country:", col2, infoY + 16);
doc.text("Preferred Contact:", col2, infoY + 28);

doc.font("Helvetica-Bold").fontSize(8).fillColor(TEXT);
doc.text(patient.name, col1 + 42, infoY + 16);
doc.text(patient.email, col1 + 42, infoY + 28);
doc.text(patient.phone, col1 + 42, infoY + 40);
doc.text(patient.country, col2 + 95, infoY + 16);
doc.text(patient.preferredContact, col2 + 95, infoY + 28);

y += 82;

// ── PROCEDURES TABLE ──
doc.font("Helvetica-Bold").fontSize(9).fillColor(PRIMARY_DARK)
  .text("Procedures Identified", 50, y);
y += 16;

// Table header
const colWidths = [220, 90, 90, 110];
const colX = [50, 270, 360, 450];

doc.rect(50, y, pageWidth, 20).fill(PRIMARY_DARK);
doc.font("Helvetica-Bold").fontSize(8).fillColor(WHITE);
doc.text("Procedure", colX[0] + 10, y + 5, { width: colWidths[0] });
doc.text("US Price", colX[1], y + 5, { width: colWidths[1], align: "right" });
doc.text("DC Price", colX[2], y + 5, { width: colWidths[2], align: "right" });
doc.text("You Save", colX[3], y + 5, { width: colWidths[3] - 10, align: "right" });
y += 20;

// Table rows
displayProcedures.forEach((proc, i) => {
  const rowBg = i % 2 === 0 ? WHITE : "#f8fafc";
  const savings = proc.usPrice - proc.dcPriceDisplay;
  const savePct = Math.round((savings / proc.usPrice) * 100);
  const rowHeight = 20;

  doc.rect(50, y, pageWidth, rowHeight).fill(rowBg);

  doc.font("Helvetica").fontSize(8).fillColor(TEXT);
  doc.text(proc.name, colX[0] + 10, y + 5, { width: colWidths[0] - 10 });

  doc.fillColor(TEXT_LIGHT);
  doc.text(formatUSD(proc.usPrice), colX[1], y + 5, { width: colWidths[1], align: "right" });

  doc.font("Helvetica-Bold").fillColor(PRIMARY_DARK);
  doc.text(formatUSD(proc.dcPriceDisplay), colX[2], y + 5, { width: colWidths[2], align: "right" });

  doc.font("Helvetica-Bold").fillColor(GREEN);
  doc.text(`${formatUSD(savings)} (${savePct}%)`, colX[3], y + 5, { width: colWidths[3] - 10, align: "right" });

  y += rowHeight;
});

// Table footer (totals)
doc.rect(50, y, pageWidth, 22).fill(NAVY);
doc.font("Helvetica-Bold").fontSize(8.5).fillColor(WHITE);
doc.text("TOTAL", colX[0] + 10, y + 6, { width: colWidths[0] });
doc.text(formatUSD(totalUs), colX[1], y + 6, { width: colWidths[1], align: "right" });

doc.fillColor(ACCENT);
doc.text(formatUSD(totalDcDisplay), colX[2], y + 6, { width: colWidths[2], align: "right" });

doc.fillColor("#34d399");
doc.text(`${formatUSD(totalSavingsDisplay)} (${savingsPctDisplay}%)`, colX[3], y + 6, { width: colWidths[3] - 10, align: "right" });
y += 22;

// ── SAVINGS HIGHLIGHT BOX ──
y += 10;
doc.roundedRect(50, y, pageWidth, 36, 4).fill(GREEN_LIGHT);
doc.roundedRect(50, y, pageWidth, 36, 4).stroke("#a7f3d0");

doc.font("Helvetica-Bold").fontSize(12).fillColor(GREEN)
  .text(`Total Estimated Savings: ${formatUSD(totalSavingsDisplay)}`, 50, y + 6, { width: pageWidth, align: "center" });
doc.font("Helvetica").fontSize(9).fillColor("#065f46")
  .text(`That's ${savingsPctDisplay}% less than typical US pricing`, 50, y + 22, { width: pageWidth, align: "center" });
y += 46;

// Confidence notes removed — internal only, not shown to patients

// ── DISCLAIMER BOX ──
doc.roundedRect(50, y, pageWidth, 52, 4).fill("#fefce8");
doc.roundedRect(50, y, pageWidth, 52, 4).stroke("#fde68a");

doc.font("Helvetica-Bold").fontSize(7.5).fillColor("#92400e")
  .text("IMPORTANT DISCLAIMER", 62, y + 7);
doc.font("Helvetica").fontSize(7).fillColor("#78350f")
  .text(
    "This is a preliminary estimate based on AI analysis of the documents you provided. " +
    "Final treatment plans and pricing will be determined after an in-person evaluation " +
    "by our dental team. We accept USD, CRC, and major credit cards.",
    62, y + 19, { width: pageWidth - 24, lineGap: 1.5 }
  );
y += 60;

// ── FOOTER (draw before list to prevent page overflow) ──
const footerY = doc.page.height - 42;
doc.rect(0, footerY, doc.page.width, 42).fill(NAVY);

doc.font("Helvetica-Bold").fontSize(8).fillColor(ACCENT)
  .text("Dental City CR  |  Where Quality Meets Savings", 0, footerY + 8, { width: doc.page.width, align: "center", lineBreak: false, height: 12 });
doc.font("Helvetica").fontSize(7.5).fillColor("#94a3b8")
  .text("Tel: +506 8339 8833   |   Email: info@dentalcitycr.com   |   Web: dentalcitycr.com", 0, footerY + 22, { width: doc.page.width, align: "center", lineBreak: false, height: 12 });

// ── WHAT'S NEXT BOX ──
doc.roundedRect(50, y, pageWidth, 52, 4).fill(SURFACE);
doc.roundedRect(50, y, pageWidth, 52, 4).stroke("#99f6e4");

doc.font("Helvetica-Bold").fontSize(8).fillColor(PRIMARY_DARK)
  .text("What Happens Next?", 62, y + 7, { lineBreak: false, height: 10 });
doc.font("Helvetica").fontSize(7.5).fillColor(TEXT);
doc.text("  •  Our team will review your documents within 48-72 business hours", 62, y + 20, { lineBreak: false, height: 10 });
doc.text(`  •  We'll contact you via ${patient.preferredContact}`, 62, y + 31, { lineBreak: false, height: 10 });
doc.text("  •  After evaluation, we'll provide a final treatment plan and pricing", 62, y + 42, { lineBreak: false, height: 10 });

// Finalize
doc.end();

stream.on("finish", () => {
  console.log(`✅ Sample PDF generated: ${outputPath}`);
  console.log(`   File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
});
