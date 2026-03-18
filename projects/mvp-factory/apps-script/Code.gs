// =============================================================================
// Sagemind AI — MVP Factory Document Generator
// Google Apps Script (Code.gs)
// =============================================================================

var FOLDER_ID = '1IUYf573hQesg7wsvVAe1gmTbUtQkdGlT';
var SHARE_EMAIL = 'adriana@sagemindai.io';
var LOGO_URL = 'https://sagemindai.io/logo-dark.png';

// Brand colors
var DARK_NAVY = '#02222e';
var BRIGHT_CYAN = '#08f1c7';
var TEAL = '#008276';
var BODY_COLOR = '#333333';
var LIGHT_CYAN_BG = '#e6fff9';
var SUBTLE_GRAY = '#666666';
var FAINT_GRAY = '#999999';
var CALLOUT_BG = '#f0fdfb';
var ALT_ROW_BG = '#f9f9f9';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function applyTitle(paragraph) {
  paragraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 24;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  paragraph.setAttributes(style);
  return paragraph;
}

function applyHeading1(paragraph, text) {
  if (text !== undefined) paragraph.setText(text);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 18;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  return paragraph;
}

function applyHeading2(paragraph, text) {
  if (text !== undefined) paragraph.setText(text);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 14;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEAL;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  return paragraph;
}

function applyHeading3(paragraph, text) {
  if (text !== undefined) paragraph.setText(text);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 12;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING3);
  return paragraph;
}

function applyBody(paragraph) {
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.ITALIC] = false;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  return paragraph;
}

function addStyledTable(body, headers, rows, highlightRowIndex) {
  var numCols = headers.length;
  var numRows = rows.length + 1;
  var table = body.appendTable();

  // Header row
  var headerRow = table.appendTableRow();
  for (var h = 0; h < numCols; h++) {
    var cell = headerRow.appendTableCell(headers[h]);
    cell.setBackgroundColor(BRIGHT_CYAN);
    var cellPara = cell.getChild(0).asParagraph();
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
    style[DocumentApp.Attribute.FONT_SIZE] = 10;
    style[DocumentApp.Attribute.BOLD] = true;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = '#ffffff';
    cellPara.setAttributes(style);
  }

  // Data rows
  for (var r = 0; r < rows.length; r++) {
    var dataRow = table.appendTableRow();
    for (var c = 0; c < numCols; c++) {
      var cellText = (rows[r][c] !== undefined && rows[r][c] !== null) ? String(rows[r][c]) : '';
      var dataCell = dataRow.appendTableCell(cellText);
      var dataPara = dataCell.getChild(0).asParagraph();
      var dStyle = {};
      dStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
      dStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
      dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
      dStyle[DocumentApp.Attribute.BOLD] = false;
      dataPara.setAttributes(dStyle);

      // Alternating rows
      if (r % 2 === 1) {
        dataCell.setBackgroundColor(ALT_ROW_BG);
      }

      // Highlight specific row
      if (highlightRowIndex !== undefined && r === highlightRowIndex) {
        dataCell.setBackgroundColor(LIGHT_CYAN_BG);
      }
    }
  }

  // Remove the empty first row that appendTable creates
  if (table.getNumRows() > numRows) {
    table.removeRow(0);
  }

  body.appendParagraph('').setSpacingAfter(4);
  return table;
}

function addDivider(body) {
  body.appendHorizontalRule();
  body.appendParagraph('').setSpacingAfter(4);
}

function addCalloutBox(body, text) {
  var table = body.appendTable();
  var row = table.appendTableRow();
  var cell = row.appendTableCell(text);
  cell.setBackgroundColor(CALLOUT_BG);
  cell.setPaddingTop(10);
  cell.setPaddingBottom(10);
  cell.setPaddingLeft(14);
  cell.setPaddingRight(14);

  var cellPara = cell.getChild(0).asParagraph();
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  style[DocumentApp.Attribute.ITALIC] = true;
  cellPara.setAttributes(style);

  // Style the table border to simulate left accent
  table.setBorderColor(BRIGHT_CYAN);
  table.setBorderWidth(2);

  // Remove the empty first row
  if (table.getNumRows() > 1) {
    table.removeRow(0);
  }

  body.appendParagraph('').setSpacingAfter(4);
  return table;
}

function addBullets(body, items) {
  for (var i = 0; i < items.length; i++) {
    var li = body.appendListItem(items[i]);
    li.setGlyphType(DocumentApp.GlyphType.BULLET);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
    li.setAttributes(style);
  }
  body.appendParagraph('').setSpacingAfter(2);
}

function addNumberedList(body, items) {
  for (var i = 0; i < items.length; i++) {
    var li = body.appendListItem(items[i]);
    li.setGlyphType(DocumentApp.GlyphType.NUMBER);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
    li.setAttributes(style);
  }
  body.appendParagraph('').setSpacingAfter(2);
}

function addChecklistItems(body, items) {
  for (var i = 0; i < items.length; i++) {
    var li = body.appendListItem(items[i]);
    li.setGlyphType(DocumentApp.GlyphType.BULLET);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
    li.setAttributes(style);
  }
  body.appendParagraph('').setSpacingAfter(2);
}

function insertCenteredLogo(body, index) {
  try {
    var blob = UrlFetchApp.fetch(LOGO_URL).getBlob();
    var img;
    if (index === 0) {
      var para = body.insertParagraph(0, '');
      para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      img = para.appendInlineImage(blob);
    } else {
      var para = body.appendParagraph('');
      para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      img = para.appendInlineImage(blob);
    }
    img.setWidth(180).setHeight(50);
    return img;
  } catch (e) {
    var para = body.appendParagraph('[ SAGEMIND AI ]');
    para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
    style[DocumentApp.Attribute.FONT_SIZE] = 18;
    style[DocumentApp.Attribute.BOLD] = true;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
    para.setAttributes(style);
    return null;
  }
}

function setupHeaderFooter(doc) {
  var header = doc.addHeader();
  var headerPara = header.appendParagraph('SAGEMIND AI');
  var hStyle = {};
  hStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  hStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
  hStyle[DocumentApp.Attribute.BOLD] = true;
  hStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  headerPara.setAttributes(hStyle);

  var footer = doc.addFooter();
  var footerPara = footer.appendParagraph('Sagemind AI LLC  |  sagemindai.io  |  Confidential');
  footerPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var fStyle = {};
  fStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  fStyle[DocumentApp.Attribute.FONT_SIZE] = 9;
  fStyle[DocumentApp.Attribute.ITALIC] = true;
  fStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = SUBTLE_GRAY;
  footerPara.setAttributes(fStyle);
}

function moveAndShare(doc) {
  var file = DriveApp.getFileById(doc.getId());
  var folder = DriveApp.getFolderById(FOLDER_ID);
  file.moveTo(folder);
  file.addEditor(SHARE_EMAIL);
  return doc.getUrl();
}

function addCenteredText(body, text, fontSize, color, bold, italic) {
  var para = body.appendParagraph(text);
  para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = (bold) ? 'Montserrat' : 'Open Sans';
  style[DocumentApp.Attribute.FONT_SIZE] = fontSize;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = color;
  style[DocumentApp.Attribute.BOLD] = !!bold;
  style[DocumentApp.Attribute.ITALIC] = !!italic;
  para.setAttributes(style);
  return para;
}

function addBodyText(body, text) {
  var para = body.appendParagraph(text);
  applyBody(para);
  return para;
}

function addBodyItalic(body, text) {
  var para = body.appendParagraph(text);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
  style[DocumentApp.Attribute.ITALIC] = true;
  para.setAttributes(style);
  return para;
}

function addBodyBold(body, text) {
  var para = body.appendParagraph(text);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
  style[DocumentApp.Attribute.BOLD] = true;
  para.setAttributes(style);
  return para;
}

// Key metric: bold number left, description right — in a 2-col table without headers
function addKeyMetrics(body, metrics) {
  var table = body.appendTable();
  for (var i = 0; i < metrics.length; i++) {
    var row = table.appendTableRow();
    var numCell = row.appendTableCell(metrics[i][0]);
    numCell.setBackgroundColor('#ffffff');
    var numPara = numCell.getChild(0).asParagraph();
    numPara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
    var nStyle = {};
    nStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
    nStyle[DocumentApp.Attribute.FONT_SIZE] = 14;
    nStyle[DocumentApp.Attribute.BOLD] = true;
    nStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
    numPara.setAttributes(nStyle);

    var descCell = row.appendTableCell(metrics[i][1]);
    descCell.setBackgroundColor('#ffffff');
    var descPara = descCell.getChild(0).asParagraph();
    var dStyle = {};
    dStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
    dStyle[DocumentApp.Attribute.FONT_SIZE] = 11;
    dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
    descPara.setAttributes(dStyle);
  }
  // Remove empty first row
  if (table.getNumRows() > metrics.length) {
    table.removeRow(0);
  }
  table.setBorderColor('#e0e0e0');
  table.setBorderWidth(1);
  body.appendParagraph('').setSpacingAfter(4);
  return table;
}

// ============================================================================
// DOCUMENT 1: PROPOSAL
// ============================================================================

function createProposal() {
  var doc = DocumentApp.create('Sagemind AI — MVP Factory Proposal');
  var body = doc.getBody();

  // Set default font
  var defaultStyle = {};
  defaultStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  defaultStyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  defaultStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
  body.setAttributes(defaultStyle);

  // Remove default empty paragraph
  body.clear();

  // ---- COVER SECTION ----
  insertCenteredLogo(body);
  body.appendParagraph('').setSpacingAfter(8);

  var titlePara = body.appendParagraph('MVP Factory Proposal');
  applyTitle(titlePara);

  addCenteredText(body, 'Launch-Ready Websites for Local Businesses — Built Once, Owned Forever', 13, BODY_COLOR, false, true);
  addCenteredText(body, 'Prepared by Adriana  |  For Justin Headley  |  March 16, 2026', 11, SUBTLE_GRAY, false, false);
  addCenteredText(body, 'CONFIDENTIAL — Sagemind AI LLC', 9, FAINT_GRAY, false, true);
  addDivider(body);

  // ---- SECTION 1: EXECUTIVE SUMMARY ----
  applyHeading1(body.appendParagraph(''), 'Executive Summary');

  addBodyText(body, "We've built 15 fully functional, production-ready websites for Bay Area small businesses that currently have no website. Each site is custom-designed, mobile-responsive, SEO-optimized, and includes an AI chatbot — all running from a single Next.js application.");

  addCalloutBox(body, 'The model: We deploy a sample site at business-name.sagemindai.io, cold-pitch the owner with a direct link, and close them on a premium, one-time website build. They pay once, they own it outright. No monthly fees. No subscriptions. No strings attached.');

  addBodyBold(body, 'Why this works:');
  addBullets(body, [
    'Small business owners are tired of monthly fees — they want to own their website',
    '27% of US small businesses (~8-10M) still have no website',
    'The spec site makes the pitch concrete — they see their business live before spending a dollar',
    'Our build cost per site is near zero (single codebase, config-driven) — the margin on each sale is 85-90%+',
    'No ongoing support burden means we can focus entirely on building and selling'
  ]);

  addKeyMetrics(body, [
    ['15', 'Spec sites pre-built and live'],
    ['$1,999', 'Single flat-fee price'],
    ['$0', 'Ongoing costs for Sagemind post-handoff'],
    ['~87%', 'Gross margin per build']
  ]);

  // ---- SECTION 2: WHAT WE BUILT ----
  applyHeading1(body.appendParagraph(''), 'What We Built');

  applyHeading2(body.appendParagraph(''), '15 Custom Websites — Single Codebase');

  addBodyText(body, 'A single Next.js 16 app serves all 15 sites using dynamic routing. Each business gets a unique site with:');

  addBullets(body, [
    '5 pages: Homepage, Services, About, Contact, FAQ',
    'Unique design: Different color palettes, typography, hero layouts, and visual styles',
    'AI chatbot: Answers questions about the business (hours, services, location, pricing)',
    'Click-to-call: Floating phone button on mobile',
    'Google Maps: Embedded on contact page',
    'Schema markup: LocalBusiness + FAQPage + BreadcrumbList for SEO',
    'Contact form: Email notifications to the business owner'
  ]);

  addBodyText(body, 'These 15 demo sites serve as the spec pitch — live proof of what we can build. The final client site is polished with their real photos, content, and branding.');

  applyHeading2(body.appendParagraph(''), 'Target Businesses');

  addStyledTable(body,
    ['#', 'Business', 'Industry', 'Location'],
    [
      ['1', 'K & C Auto Service', 'European Auto Repair', 'San Francisco'],
      ['2', 'Best Auto Care', 'Auto Repair', 'San Francisco'],
      ['3', '1701 Auto Care', 'Auto Repair', 'Alameda'],
      ['4', 'Community Auto Center', 'Auto Repair', 'Oakland'],
      ['5', 'Glenview Automotive', 'Auto Repair', 'Oakland'],
      ['6', 'Fruitvale Collision Center', 'Auto Body', 'Oakland'],
      ['7', 'Supreme Blends Barber Shop', 'Barber', 'Oakland'],
      ['8', 'Aguachiles El Tamarindo', 'Restaurant', 'Oakland'],
      ['9', 'Taqueria El Chacho', 'Restaurant', 'San Jose'],
      ['10', 'La Parrilla Loca', 'Restaurant', 'Oakland'],
      ['11', 'Pipirin', 'Restaurant', 'Oakland'],
      ['12', "Pena's Bakery", 'Bakery', 'Oakland'],
      ['13', 'Panaderia La Favorita', 'Bakery', 'Oakland'],
      ['14', 'Panaderia Sevilla', 'Bakery', 'Oakland'],
      ['15', 'Green Eagle Plumbing', 'Plumbing', 'Berkeley']
    ]
  );

  addBodyItalic(body, 'All are real Bay Area businesses with active Google Business Profiles but no website or a broken/placeholder site.');

  // ---- SECTION 3: HOW IT WORKS ----
  applyHeading1(body.appendParagraph(''), 'How It Works — The Client Journey');

  addBodyText(body, 'A simple, 6-step process from first contact to handoff:');

  addStyledTable(body,
    ['Step', 'What Happens', 'Timeline'],
    [
      ['1. Spec Pitch', 'We email the business owner a link to their live demo site. They see their business on a real, professional website.', 'Day 1'],
      ['2. Discovery Call', '15-minute call to walk them through the site, understand their vision, close the sale. 50% deposit collected.', 'Days 2-7'],
      ['3. Content Gathering', 'Client sends real photos, logo, menu/services, story, and specific requests. We provide a simple content checklist.', 'Days 7-14'],
      ['4. We Build v1', 'Polished, production-ready site with their real content. Custom design, AI chatbot, full SEO setup.', 'Days 14-21'],
      ['5. Review & Revise', 'Client reviews. Up to 2 rounds of revisions to get everything perfect.', 'Days 21-28'],
      ['6. Handoff', 'Site goes live on their domain. We hand over everything — they own it. Final 50% collected.', 'Day 28-30']
    ]
  );

  addCalloutBox(body, 'Total turnaround: ~4 weeks from yes to live site. The client gets a premium, custom website they fully own — no monthly fees, no lock-in, no vendor dependency.');

  // ---- SECTION 4: MARKET OPPORTUNITY ----
  applyHeading1(body.appendParagraph(''), 'Market Opportunity');

  applyHeading2(body.appendParagraph(''), 'The Problem');

  addBullets(body, [
    '27% of US small businesses have no website (8-10 million businesses)',
    '81% of consumers research businesses online before buying',
    '97% of consumers search online to find local businesses'
  ]);

  addBodyText(body, "Most small business owners don't get a website because:");

  addNumberedList(body, [
    '"Too expensive" — they imagine $3,000-$10,000',
    '"I don\'t want another monthly bill" — subscription fatigue is real',
    '"I don\'t have time to manage it" — they need done-for-you',
    '"I got burned before" — bad freelancer experience'
  ]);

  addCalloutBox(body, "Our pitch addresses every single objection: it's affordable ($1,999 vs. $5K-$10K), it's one-time (no monthly fees), it's completely done-for-you (they just send photos), and they can see the quality before committing (the spec site).");

  applyHeading2(body.appendParagraph(''), 'Competitive Landscape');

  addStyledTable(body,
    ['Competitor Type', 'Price', 'Ownership', 'Ongoing Fees'],
    [
      ['DIY (Wix, Squarespace)', '$25-40/mo forever', 'No — locked to platform', 'Yes forever'],
      ['AI Builders (Durable, 10Web)', '$12-25/mo forever', 'No — locked to platform', 'Yes forever'],
      ['Freelancers (Fiverr/Upwork)', '$500-3,500 one-time', 'Yes (usually)', 'None (but no support)'],
      ['Local Agencies', '$3,000-10,000+ one-time', 'Yes', 'Optional maintenance'],
      ['Done-for-you (Hibu, Thryv)', '$300-1,500/mo', 'No — they own it', 'Yes forever'],
      ['Sagemind AI', '$1,999 one-time', 'Yes — fully yours', 'None']
    ],
    5 // highlight last row (Sagemind AI)
  );

  // ---- SECTION 5: THE PACKAGE ----
  applyHeading1(body.appendParagraph(''), 'The Package');

  addBodyText(body, 'One package. One price. Everything included.');

  var pricePara = body.appendParagraph('$1,999 — One-Time, All-Inclusive');
  pricePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var priceStyle = {};
  priceStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  priceStyle[DocumentApp.Attribute.FONT_SIZE] = 18;
  priceStyle[DocumentApp.Attribute.BOLD] = true;
  priceStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  pricePara.setAttributes(priceStyle);
  body.appendParagraph('').setSpacingAfter(4);

  applyHeading2(body.appendParagraph(''), "What's Included");

  addBullets(body, [
    'Custom 5-page website (Homepage, Services, About, Contact, FAQ)',
    'Mobile-responsive design',
    'AI chatbot trained on their business data',
    'Click-to-call on mobile',
    'Google Maps integration',
    'Contact form with email notifications',
    'SEO foundation (Schema markup, meta tags, sitemap)',
    '2 rounds of revisions',
    'Domain setup and deployment assistance',
    'Complete source code and documentation at handoff',
    'Permanent backup maintained by Sagemind'
  ]);

  applyHeading2(body.appendParagraph(''), 'Payment Structure');

  addStyledTable(body,
    ['When', 'Amount', 'Details'],
    [
      ['At signing', '50% deposit ($999.50)', 'Non-refundable. Secures the project. We begin building.'],
      ['At handoff', '50% final ($999.50)', 'Site goes live. Client owns everything.']
    ]
  );

  addBodyText(body, 'Client has 30 days to provide content after signing. If content is not received within 30 days, project goes on hold.');

  applyHeading2(body.appendParagraph(''), "What 'You Own It' Means");

  addBullets(body, [
    'We hand over the complete site code — they can host it anywhere',
    'No platform lock-in, no proprietary CMS',
    'Built on modern, open-source technology (Next.js, React, Tailwind)',
    'We assist with domain registration and initial hosting setup',
    'Full documentation on how to make basic updates'
  ]);

  applyHeading2(body.appendParagraph(''), 'Optional Add-Ons (After Handoff)');

  addStyledTable(body,
    ['Service', 'Price', 'Details'],
    [
      ['Site updates / changes', '$75-150/hr', 'Come back anytime'],
      ['Managed hosting', '$19/mo', 'We host and maintain — totally optional'],
      ['Advanced SEO campaign', '$500-1,500 one-time', 'Deep keyword research + optimization'],
      ['Google Ads setup', '$499 one-time', 'Campaign setup + 30 days management'],
      ['Additional pages', '$200-400/page', 'Gallery, team bios, testimonials, etc.']
    ]
  );

  // ---- SECTION 6: WHAT THE CLIENT NEEDS ----
  applyHeading1(body.appendParagraph(''), 'What the Client Needs');

  addBodyText(body, 'After handoff, the client is responsible for three things:');

  addStyledTable(body,
    ['Item', 'Cost', 'Notes'],
    [
      ['Vercel account (hosting)', '$0/mo', 'Free tier — more than enough for a small business site'],
      ['Domain name', '~$10-15/year', 'Client buys their own (we walk them through it)'],
      ['AI chatbot API key', '~$2-3/month', 'Client chooses provider: OpenAI, Anthropic, or Google AI']
    ]
  );

  addBodyText(body, 'Total ongoing cost to the client: approximately $12-18/month. We never buy anything on their behalf.');

  // ---- SECTION 7: UNIT ECONOMICS ----
  applyHeading1(body.appendParagraph(''), 'Unit Economics');

  applyHeading2(body.appendParagraph(''), 'Our Costs Per Build');

  addStyledTable(body,
    ['Item', 'Time/Cost', 'Notes'],
    [
      ['Development', '~4-8 hours', 'Config-driven — templated structure we customize'],
      ['Content gathering / communication', '~2-3 hours', 'Checklist-driven intake and review calls'],
      ['Revisions (2 rounds)', '~2-4 hours', 'Budgeted at 2 rounds max'],
      ['Domain / hosting setup', '~1 hour', 'DNS deployment SSL'],
      ['Total Time Per Client', '~10-16 hours', ''],
      ['Hard costs', '~$10-20 total', 'Near-zero marginal cost']
    ]
  );

  applyHeading2(body.appendParagraph(''), 'Margins');

  addStyledTable(body,
    ['Metric', 'Value'],
    [
      ['Price', '$1,999'],
      ['Average hours', '~12'],
      ['Effective hourly rate', '~$166/hr'],
      ['Gross margin', '~87%']
    ]
  );

  applyHeading2(body.appendParagraph(''), 'Revenue Projections');

  addStyledTable(body,
    ['Timeline', 'Clients', 'Avg Sale', 'Revenue', 'Cumulative'],
    [
      ['Month 1 (free portfolio clients)', '3-5', '$0 (free)', '$0', '$0'],
      ['Months 2-3', '5-8', '$1,999', '$10,000-16,000', '$10K-16K'],
      ['Months 4-6 (referrals kick in)', '8-12', '$1,999', '$16,000-24,000', '$26K-40K'],
      ['Months 7-12', '15-25', '$1,999', '$30,000-50,000', '$56K-90K'],
      ['Year 1 Total', '31-50', '—', '—', '$56,000-90,000']
    ],
    4 // highlight last row
  );

  addBodyItalic(body, 'Assumptions: 20% close rate on cold pitches, referral rate of 1 per 3 happy clients starting month 4. First 3-5 clients are free for portfolio building.');

  // ---- SECTION 8: THE "SPEC PITCH" STRATEGY ----
  applyHeading1(body.appendParagraph(''), 'The "Spec Pitch" Strategy');

  applyHeading2(body.appendParagraph(''), 'Why This Beats Normal Cold Outreach');

  addStyledTable(body,
    ['Approach', 'Response Rate', 'Close Rate'],
    [
      ['Generic cold email', '~9%', '~1-2%'],
      ['Personalized cold email', '~18%', '~3-5%'],
      ['Spec site + personalized email', '25-35% (est.)', '15-25% (est.)']
    ],
    2 // highlight last row
  );

  addCalloutBox(body, "The spec site triggers ownership psychology — they see their business name, their address, their reviews on a professional website. And because our model is one-time with no strings, the ask is simple: 'Want us to make this yours? One price, you own it forever.'");

  applyHeading2(body.appendParagraph(''), 'Outreach Timeline');

  addStyledTable(body,
    ['Days', 'Action'],
    [
      ['Day 1-2', 'Deploy all 15 spec sites, verify functionality'],
      ['Day 3-4', 'Research owner names, emails, phone numbers'],
      ['Day 5-6', 'Send first round of personalized pitch emails (stagger 5/day)'],
      ['Day 10-11', 'Follow-up email to non-responders'],
      ['Day 15', 'Phone call follow-up to remaining non-responders'],
      ['Day 20+', 'Discovery calls with interested leads, collect deposits, begin builds']
    ]
  );

  // ---- SECTION 9: LAUNCH STRATEGY ----
  applyHeading1(body.appendParagraph(''), 'Launch Strategy — Free Portfolio Clients');

  addBodyText(body, 'The first 3-5 clients receive their website at no cost in exchange for:');

  addBullets(body, [
    'A written or video testimonial within 30 days of launch',
    'Permission to display their site as a portfolio piece on sagemindai.io',
    'Permission to use their business name/logo in Sagemind marketing materials'
  ]);

  addBodyText(body, 'A simple written agreement covers these terms. After the portfolio is established, all subsequent clients pay the full $1,999.');

  addCalloutBox(body, 'These 3-5 case studies become our most powerful sales tool. Real businesses, real sites, real testimonials — worth far more than any ad spend.');

  // ---- SECTION 10: TECHNICAL ARCHITECTURE ----
  applyHeading1(body.appendParagraph(''), 'Technical Architecture');

  addBullets(body, [
    'Framework: Next.js 16, React 19, TypeScript, Tailwind CSS v4',
    'Architecture: Single app, dynamic routing — one codebase serves all spec sites',
    'Client sites: Each client gets their own standalone deployment',
    'Config-driven: Each business = one TypeScript config file (~200 lines)',
    'Performance: Targeting Lighthouse 90+ across all sites',
    'Handoff-ready: Clean codebase the client (or any developer) can maintain'
  ]);

  applyHeading2(body.appendParagraph(''), 'What the Client Receives at Handoff');

  addBullets(body, [
    'Complete source code (zip file; GitHub repo available on request)',
    'Deployed, live website on their domain',
    'Documentation for basic content updates',
    'All assets (images, fonts, icons)',
    'SEO configuration and sitemap',
    'Sagemind maintains a permanent private backup'
  ]);

  // ---- SECTION 11: RISKS & MITIGATIONS ----
  applyHeading1(body.appendParagraph(''), 'Risks & Mitigations');

  addStyledTable(body,
    ['Risk', 'Likelihood', 'Mitigation'],
    [
      ['Low close rate (<10%)', 'Medium', 'Costs near-zero per pitch; expand target list to 50-100'],
      ['Scope creep during revisions', 'Medium', 'Contract defines 2 rounds; additional work billed hourly'],
      ['Client never sends content', 'Medium', '50% deposit is non-refundable; 30-day content deadline'],
      ['Legal concerns about spec sites', 'Low', 'Public info only; sites are complimentary; remove on request']
    ]
  );

  // ---- SECTION 12: NEXT STEPS ----
  applyHeading1(body.appendParagraph(''), 'Next Steps');

  addStyledTable(body,
    ['Status', 'Action Item'],
    [
      ['\u2713', 'Build 15 spec websites'],
      ['\u2713', 'AI chatbot on every site'],
      ['\u2713', 'Sagemind branding on every site'],
      ['\u2713', 'Market research & pricing analysis'],
      ['\u2610', 'Justin reviews & approves this proposal'],
      ['\u2610', 'Finalize contract template'],
      ['\u2610', 'Deploy 15 spec sites to Vercel with subdomains'],
      ['\u2610', 'Set up DNS records (15 CNAME entries)'],
      ['\u2610', 'Research owner contact info for all 15 businesses'],
      ['\u2610', 'Draft personalized pitch emails'],
      ['\u2610', 'Set up Stripe for invoicing / deposits'],
      ['\u2610', 'Begin outreach']
    ]
  );

  // ---- FOOTER SECTION ----
  addDivider(body);

  addCenteredText(body, 'This proposal represents near-zero hard costs invested with potential for $56,000\u2013$90,000+ in revenue within 12 months. Each closed client generates $1,999 with ~87% margins and no ongoing support obligation.', 11, BODY_COLOR, false, true);
  addCenteredText(body, 'Sagemind AI LLC  |  sagemindai.io  |  Confidential', 9, FAINT_GRAY, false, false);

  // Header & Footer
  setupHeaderFooter(doc);

  // Save, move, share
  doc.saveAndClose();
  var url = moveAndShare(doc);
  Logger.log('Proposal created: ' + url);
  return url;
}

// ============================================================================
// DOCUMENT 2: CLIENT ONBOARDING CHECKLIST
// ============================================================================

function createChecklist() {
  var doc = DocumentApp.create('MVP Factory — Client Onboarding Checklist');
  var body = doc.getBody();

  var defaultStyle = {};
  defaultStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  defaultStyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  defaultStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
  body.setAttributes(defaultStyle);
  body.clear();

  // ---- COVER ----
  insertCenteredLogo(body);
  body.appendParagraph('').setSpacingAfter(8);

  var titlePara = body.appendParagraph('Client Onboarding Checklist');
  applyTitle(titlePara);

  addCenteredText(body, 'Everything you need to get your new website launched', 13, BODY_COLOR, false, true);
  addDivider(body);

  // ---- WELCOME ----
  applyHeading1(body.appendParagraph(''), 'Welcome');

  addBodyText(body, "Welcome! We're excited to build your new website. This checklist walks you through everything you need to do. The entire process takes about 4 weeks from start to launch.");

  addCalloutBox(body, 'Important: You have 30 days from signing to send us your content. After 30 days without content, your project will be placed on hold.');

  // ---- STEP 1 ----
  applyHeading1(body.appendParagraph(''), 'Step 1: Content We Need From You');

  addBodyText(body, 'Please gather and send us the following:');

  addChecklistItems(body, [
    '\u2610 Business name (as you want it displayed)',
    '\u2610 Business address',
    '\u2610 Phone number',
    '\u2610 Email address (for contact form notifications)',
    '\u2610 Business hours',
    '\u2610 Logo (high resolution — PNG or SVG preferred)',
    '\u2610 Photos (at least 5-10 of your business, team, products/services)',
    '\u2610 Services or menu list with descriptions',
    '\u2610 About your business (a paragraph or two — your story, mission, what makes you special)',
    '\u2610 FAQ (5-10 common questions your customers ask)',
    '\u2610 Social media links (Instagram, Facebook, Yelp, etc.)',
    '\u2610 Any specific requests or preferences',
    '\u2610 Google Business Profile login (optional — for SEO optimization)'
  ]);

  // ---- STEP 2 ----
  applyHeading1(body.appendParagraph(''), 'Step 2: Accounts You Need to Create');

  addBodyText(body, "You'll need these three accounts. We'll help you set everything up.");

  applyHeading2(body.appendParagraph(''), 'Domain Name (~$10-15/year)');
  addBodyText(body, 'This is your website address (e.g., yourbusiness.com).');
  addNumberedList(body, [
    'Go to namecheap.com or domains.google.com',
    'Search for your business name',
    'Buy the .com version (~$10-15/year)',
    "We'll help you point it to your website"
  ]);

  applyHeading2(body.appendParagraph(''), 'Vercel Account (Free)');
  addBodyText(body, 'This is where your website lives. The free tier is all you need.');
  addNumberedList(body, [
    'Go to vercel.com',
    'Click "Sign Up" — use your email',
    "That's it — we handle the rest"
  ]);

  applyHeading2(body.appendParagraph(''), 'AI Chatbot API Key (~$2-3/month)');
  addBodyText(body, 'Your website includes an AI chatbot that answers customer questions. You choose which AI provider to use:');

  addStyledTable(body,
    ['Provider', 'Estimated Cost', 'Sign Up'],
    [
      ['OpenAI', '~$2-3/month', 'platform.openai.com'],
      ['Anthropic', '~$2-3/month', 'console.anthropic.com'],
      ['Google AI', '~$1-2/month', 'aistudio.google.com']
    ]
  );

  addBodyText(body, "We'll set up the chatbot for you — you just need to create an account and give us the API key.");

  // ---- STEP 3 ----
  applyHeading1(body.appendParagraph(''), 'Step 3: Review Process');

  addNumberedList(body, [
    'We build your site with your real content (~1-2 weeks after receiving it)',
    'You get a preview link to review',
    'Round 1: Send us your feedback',
    'We make changes',
    'Round 2: Final tweaks',
    'Done! (Additional revisions beyond 2 rounds are $75-150/hr)'
  ]);

  // ---- STEP 4 ----
  applyHeading1(body.appendParagraph(''), 'Step 4: Launch & Handoff');

  applyHeading2(body.appendParagraph(''), 'What Happens at Launch');

  addBullets(body, [
    'Site goes live on your domain',
    'You receive a zip file with all your code and assets',
    'You receive documentation on making basic updates',
    'We keep a permanent backup of your site',
    'Final 50% payment collected'
  ]);

  applyHeading2(body.appendParagraph(''), 'What You Own');

  addBullets(body, [
    'Complete website source code',
    'All images, fonts, and assets',
    'SEO configuration and sitemap',
    'Full documentation'
  ]);

  // ---- AFTER LAUNCH ----
  applyHeading1(body.appendParagraph(''), 'After Launch');

  addBodyText(body, "Your site is yours. Here's what to expect going forward:");

  addStyledTable(body,
    ['Item', 'Cost', 'Who Manages It'],
    [
      ['Hosting (Vercel)', '$0/month', 'You (free tier)'],
      ['AI Chatbot', '~$2-3/month', 'You (your API key)'],
      ['Domain renewal', '~$10-15/year', 'You'],
      ['Site updates (optional)', '$75-150/hour', 'Us (on request)'],
      ['Managed hosting (optional)', '$19/month', 'Us (if you want hands-off)']
    ]
  );

  addBodyBold(body, 'Total ongoing cost: approximately $12-18/year for the domain + $2-3/month for the chatbot. That\'s it.');

  // ---- QUESTIONS ----
  addDivider(body);

  applyHeading1(body.appendParagraph(''), 'Questions?');

  addCenteredText(body, 'Email us at adriana@sagemindai.io or visit sagemindai.io', 12, TEAL, false, false);

  addCenteredText(body, 'Sagemind AI LLC  |  sagemindai.io', 9, FAINT_GRAY, false, false);

  // Header & Footer
  setupHeaderFooter(doc);

  doc.saveAndClose();
  var url = moveAndShare(doc);
  Logger.log('Checklist created: ' + url);
  return url;
}

// ============================================================================
// DOCUMENT 3: FREE CLIENT AGREEMENT
// ============================================================================

function createAgreement() {
  var doc = DocumentApp.create('MVP Factory — Free Client Agreement');
  var body = doc.getBody();

  var defaultStyle = {};
  defaultStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  defaultStyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  defaultStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = BODY_COLOR;
  body.setAttributes(defaultStyle);
  body.clear();

  // ---- COVER ----
  insertCenteredLogo(body);
  body.appendParagraph('').setSpacingAfter(8);

  var titlePara = body.appendParagraph('Website Development Agreement');
  applyTitle(titlePara);

  addCenteredText(body, 'Portfolio Program', 14, TEAL, false, false);
  addDivider(body);

  // ---- PARTIES ----
  applyHeading1(body.appendParagraph(''), 'Parties');

  addBodyText(body, 'This agreement is between Sagemind AI LLC ("Developer") and _________________________ ("Client"), business name: _________________________.');

  // ---- OVERVIEW ----
  addCalloutBox(body, 'Sagemind AI is building you a custom website at no cost. In return, you agree to provide a testimonial and allow us to showcase your website as an example of our work. This is a simple, good-faith arrangement — not a binding legal contract.');

  // ---- SECTION 1 ----
  applyHeading1(body.appendParagraph(''), 'Section 1: What Sagemind Will Provide');

  addBullets(body, [
    'Custom 5-page website (Homepage, Services, About, Contact, FAQ)',
    'Mobile-responsive design',
    'AI chatbot setup trained on your business data',
    'SEO foundation (Schema markup, meta tags, sitemap)',
    'Google Maps integration, click-to-call, contact form',
    '2 rounds of revisions',
    'Domain setup and deployment assistance',
    'Complete source code and documentation at handoff',
    'Permanent backup of your website maintained by Sagemind'
  ]);

  // ---- SECTION 2 ----
  applyHeading1(body.appendParagraph(''), 'Section 2: What You Agree To');

  addBullets(body, [
    'Provide a written or video testimonial within 30 days of site launch',
    'Allow Sagemind to display your website as a portfolio piece on sagemindai.io and in marketing materials',
    'Allow Sagemind to use your business name and logo in portfolio-related marketing',
    'Provide all required content (photos, business info, etc.) within 30 days of signing',
    'Set up and maintain your own accounts (domain, Vercel hosting, AI chatbot API)'
  ]);

  // ---- SECTION 3 ----
  applyHeading1(body.appendParagraph(''), 'Section 3: Ownership & Rights');

  addBullets(body, [
    'You own your website. The source code, content, and all custom assets are yours.',
    'Sagemind retains the right to showcase the work in our portfolio.',
    'Either party may request removal of portfolio display with 30 days written notice.'
  ]);

  // ---- SECTION 4 ----
  applyHeading1(body.appendParagraph(''), 'Section 4: Your Ongoing Costs');

  addBodyText(body, 'After handoff, you are responsible for:');

  addStyledTable(body,
    ['Service', 'Estimated Cost', 'Paid To'],
    [
      ['Domain name', '~$10-15/year', 'Your registrar (Namecheap, Google, etc.)'],
      ['Hosting (Vercel)', '$0/month', 'Vercel (free tier)'],
      ['AI Chatbot API', '~$2-3/month', 'Your chosen provider (OpenAI, Anthropic, etc.)']
    ]
  );

  addBodyText(body, 'Sagemind has no ongoing costs or obligations after handoff.');

  // ---- SECTION 5 ----
  applyHeading1(body.appendParagraph(''), 'Section 5: Content Deadline');

  addBullets(body, [
    'You must provide all content within 30 days of signing this agreement',
    'If content is not received within 30 days, the project may be placed on hold',
    'Sagemind reserves the right to cancel this agreement if content is not provided within 60 days'
  ]);

  // ---- SECTION 6 ----
  applyHeading1(body.appendParagraph(''), 'Section 6: Revisions');

  addBullets(body, [
    '2 rounds of revisions are included at no cost',
    'Additional revisions will be billed at $75-150/hour'
  ]);

  // ---- SECTION 7 ----
  applyHeading1(body.appendParagraph(''), 'Section 7: After Handoff');

  addBullets(body, [
    'Sagemind delivers the site in working condition',
    'After handoff, you are responsible for maintenance and updates',
    'Optional support is available at $75-150/hour'
  ]);

  // ---- SIGNATURE BLOCK ----
  addDivider(body);
  applyHeading1(body.appendParagraph(''), 'Signatures');

  // Create a 2-column table for signatures
  var sigTable = body.appendTable();
  var sigRow = sigTable.appendTableRow();

  // Left column — Sagemind
  var leftCell = sigRow.appendTableCell('');
  leftCell.setPaddingTop(12);
  leftCell.setPaddingBottom(12);
  leftCell.setPaddingLeft(12);
  leftCell.setPaddingRight(12);

  var lTitle = leftCell.appendParagraph('Sagemind AI LLC');
  var ltStyle = {};
  ltStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  ltStyle[DocumentApp.Attribute.FONT_SIZE] = 12;
  ltStyle[DocumentApp.Attribute.BOLD] = true;
  ltStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  lTitle.setAttributes(ltStyle);

  var lSig = leftCell.appendParagraph('\nSignature: ________________________');
  applyBody(lSig);
  var lName = leftCell.appendParagraph('\nName: ________________________');
  applyBody(lName);
  var lDate = leftCell.appendParagraph('\nDate: ________________________');
  applyBody(lDate);

  // Right column — Client
  var rightCell = sigRow.appendTableCell('');
  rightCell.setPaddingTop(12);
  rightCell.setPaddingBottom(12);
  rightCell.setPaddingLeft(12);
  rightCell.setPaddingRight(12);

  var rTitle = rightCell.appendParagraph('Client');
  var rtStyle = {};
  rtStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  rtStyle[DocumentApp.Attribute.FONT_SIZE] = 12;
  rtStyle[DocumentApp.Attribute.BOLD] = true;
  rtStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  rTitle.setAttributes(rtStyle);

  var rSig = rightCell.appendParagraph('\nSignature: ________________________');
  applyBody(rSig);
  var rName = rightCell.appendParagraph('\nName: ________________________');
  applyBody(rName);
  var rBiz = rightCell.appendParagraph('\nBusiness: ________________________');
  applyBody(rBiz);
  var rDate = rightCell.appendParagraph('\nDate: ________________________');
  applyBody(rDate);

  // Remove empty first row
  if (sigTable.getNumRows() > 1) {
    sigTable.removeRow(0);
  }

  sigTable.setBorderColor('#e0e0e0');
  sigTable.setBorderWidth(1);

  // Remove the default empty paragraph in each cell (first child)
  try {
    var leftFirst = leftCell.getChild(0);
    if (leftFirst.getType() === DocumentApp.ElementType.PARAGRAPH && leftFirst.asParagraph().getText() === '') {
      leftCell.removeChild(leftFirst);
    }
    var rightFirst = rightCell.getChild(0);
    if (rightFirst.getType() === DocumentApp.ElementType.PARAGRAPH && rightFirst.asParagraph().getText() === '') {
      rightCell.removeChild(rightFirst);
    }
  } catch (e) {
    // Ignore — some cells may not have a blank first paragraph
  }

  body.appendParagraph('').setSpacingAfter(8);

  // ---- FOOTER ----
  addCenteredText(body, 'Sagemind AI LLC  |  sagemindai.io  |  Confidential', 9, FAINT_GRAY, false, false);

  // Header & Footer
  setupHeaderFooter(doc);

  doc.saveAndClose();
  var url = moveAndShare(doc);
  Logger.log('Agreement created: ' + url);
  return url;
}

// ============================================================================
// RUN ALL — Creates all 3 documents
// ============================================================================

function createAllDocuments() {
  var proposalUrl = createProposal();
  var checklistUrl = createChecklist();
  var agreementUrl = createAgreement();

  Logger.log('=== ALL DOCUMENTS CREATED ===');
  Logger.log('Proposal:  ' + proposalUrl);
  Logger.log('Checklist: ' + checklistUrl);
  Logger.log('Agreement: ' + agreementUrl);

  return {
    proposal: proposalUrl,
    checklist: checklistUrl,
    agreement: agreementUrl
  };
}
