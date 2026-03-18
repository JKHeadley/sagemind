// =============================================================================
// Sagemind AI — MVP Factory Document Generator (Gamma-Quality Design)
// =============================================================================

var SHARE_EMAIL = 'adriana@sagemindai.io';
var LOGO_URL = 'https://sagemindai.io/logo-dark.png';

// Brand colors — Sagemind palette
var DARK_NAVY = '#02222e';
var BRIGHT_CYAN = '#08f1c7';
var TEAL = '#008276';
var DARK_TEAL = '#014f4f';

// Typography colors (never pure black — Gamma principle)
var TEXT_PRIMARY = '#1a1a2e';
var TEXT_BODY = '#374151';
var TEXT_MUTED = '#6b7280';
var TEXT_FAINT = '#9ca3af';

// Background colors
var BG_WHITE = '#ffffff';
var BG_LIGHT = '#f8fafa';
var BG_CARD = '#f0fdfa';
var BG_CALLOUT = '#ecfdf5';
var BG_HIGHLIGHT = '#e6fff9';
var BG_HEADER = '#02222e';
var BG_ALT_ROW = '#f9fafb';
var BG_COVER = '#f0fdfa';

// Accent & border
var BORDER_LIGHT = '#e5e7eb';
var BORDER_ACCENT = '#08f1c7';
var ACCENT_SOFT = '#d1fae5';

// ============================================================================
// PAGE SETUP
// ============================================================================

function setupPageStyle(body) {
  // Generous margins for premium feel
  body.setMarginTop(54);    // 0.75"
  body.setMarginBottom(54);
  body.setMarginLeft(62);   // ~0.86"
  body.setMarginRight(62);

  // Default body style
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
  style[DocumentApp.Attribute.LINE_SPACING] = 1.5;
  body.setAttributes(style);
}

// ============================================================================
// TYPOGRAPHY
// ============================================================================

function applyTitle(paragraph) {
  paragraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  paragraph.setSpacingAfter(4);
  paragraph.setLineSpacing(1.15);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 30;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  paragraph.setAttributes(style);
  return paragraph;
}

function applyHeading1(paragraph, text) {
  if (text !== undefined) paragraph.setText(text);
  paragraph.setSpacingBefore(18);
  paragraph.setSpacingAfter(6);
  paragraph.setLineSpacing(1.2);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 22;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  return paragraph;
}

function applyHeading2(paragraph, text) {
  if (text !== undefined) paragraph.setText(text);
  paragraph.setSpacingBefore(14);
  paragraph.setSpacingAfter(4);
  paragraph.setLineSpacing(1.25);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 16;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEAL;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  return paragraph;
}

function applyHeading3(paragraph, text) {
  if (text !== undefined) paragraph.setText(text);
  paragraph.setSpacingBefore(16);
  paragraph.setSpacingAfter(4);
  paragraph.setLineSpacing(1.25);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  style[DocumentApp.Attribute.FONT_SIZE] = 13;
  style[DocumentApp.Attribute.BOLD] = true;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING3);
  return paragraph;
}

function applyBody(paragraph) {
  paragraph.setSpacingAfter(4);
  paragraph.setLineSpacing(1.4);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
  style[DocumentApp.Attribute.BOLD] = false;
  style[DocumentApp.Attribute.ITALIC] = false;
  paragraph.setAttributes(style);
  paragraph.setHeading(DocumentApp.ParagraphHeading.NORMAL);
  return paragraph;
}

// ============================================================================
// COVER SECTION — Full-width branded cover card
// ============================================================================

function addCoverSection(body, title, subtitle, metaLine) {
  // Cover card — tinted background table
  var coverTable = body.appendTable();
  var coverRow = coverTable.appendTableRow();
  var coverCell = coverRow.appendTableCell('');
  coverCell.setBackgroundColor(BG_COVER);
  coverCell.setPaddingTop(36);
  coverCell.setPaddingBottom(30);
  coverCell.setPaddingLeft(28);
  coverCell.setPaddingRight(28);

  // Text-based logo (cleaner than image on light backgrounds)
  var logoPara = coverCell.appendParagraph('SAGEMIND AI');
  logoPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  logoPara.setSpacingAfter(12);
  var logoStyle = {};
  logoStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  logoStyle[DocumentApp.Attribute.FONT_SIZE] = 16;
  logoStyle[DocumentApp.Attribute.BOLD] = true;
  logoStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  logoPara.setAttributes(logoStyle);
  // Color the "MIND" portion in teal
  var logoText = logoPara.editAsText();
  logoText.setForegroundColor(4, 7, TEAL); // "MIND" chars 4-7

  // Thin accent line
  var accentLine = coverCell.appendParagraph('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  accentLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var accentStyle = {};
  accentStyle[DocumentApp.Attribute.FONT_SIZE] = 8;
  accentStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = BRIGHT_CYAN;
  accentLine.setAttributes(accentStyle);
  accentLine.setSpacingAfter(12);

  // Title
  var titlePara = coverCell.appendParagraph(title);
  titlePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  titlePara.setLineSpacing(1.15);
  titlePara.setSpacingAfter(8);
  var tStyle = {};
  tStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  tStyle[DocumentApp.Attribute.FONT_SIZE] = 28;
  tStyle[DocumentApp.Attribute.BOLD] = true;
  tStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  titlePara.setAttributes(tStyle);

  // Subtitle
  if (subtitle) {
    var subPara = coverCell.appendParagraph(subtitle);
    subPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    subPara.setSpacingAfter(12);
    var sStyle = {};
    sStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
    sStyle[DocumentApp.Attribute.FONT_SIZE] = 12;
    sStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
    sStyle[DocumentApp.Attribute.ITALIC] = true;
    subPara.setAttributes(sStyle);
  }

  // Meta line (date, author, etc.)
  if (metaLine) {
    var metaPara = coverCell.appendParagraph(metaLine);
    metaPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    metaPara.setSpacingAfter(4);
    var mStyle = {};
    mStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
    mStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
    mStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_MUTED;
    metaPara.setAttributes(mStyle);
  }

  // Confidential badge
  var confPara = coverCell.appendParagraph('CONFIDENTIAL');
  confPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var cStyle = {};
  cStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  cStyle[DocumentApp.Attribute.FONT_SIZE] = 8;
  cStyle[DocumentApp.Attribute.BOLD] = true;
  cStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_FAINT;
  confPara.setAttributes(cStyle);

  coverTable.setBorderColor(BORDER_LIGHT);
  coverTable.setBorderWidth(0);

  // Remove empty first row
  if (coverTable.getNumRows() > 1) coverTable.removeRow(0);

  // Remove empty first paragraph in cell
  try {
    var first = coverCell.getChild(0);
    if (first.getType() === DocumentApp.ElementType.PARAGRAPH && first.asParagraph().getText() === '') {
      coverCell.removeChild(first);
    }
  } catch (e) {}

  body.appendParagraph('').setSpacingAfter(6);
  return coverTable;
}

// ============================================================================
// SECTION CARD — Wraps content sections in a card-like block
// ============================================================================

function addSectionCard(body, bgColor) {
  var table = body.appendTable();
  var row = table.appendTableRow();
  var cell = row.appendTableCell('');
  cell.setBackgroundColor(bgColor || BG_WHITE);
  cell.setPaddingTop(20);
  cell.setPaddingBottom(16);
  cell.setPaddingLeft(20);
  cell.setPaddingRight(20);

  table.setBorderColor(BORDER_LIGHT);
  table.setBorderWidth(1);

  // Remove empty first row
  if (table.getNumRows() > 1) table.removeRow(0);

  // Remove empty first paragraph
  try {
    var first = cell.getChild(0);
    if (first.getType() === DocumentApp.ElementType.PARAGRAPH && first.asParagraph().getText() === '') {
      cell.removeChild(first);
    }
  } catch (e) {}

  return cell;
}

// ============================================================================
// TABLES — Clean, modern styling (no vertical borders look)
// ============================================================================

function addStyledTable(body, headers, rows, highlightRowIndex) {
  var numCols = headers.length;
  var numRows = rows.length + 1;
  var table = body.appendTable();

  // Header row — dark navy background, white text
  var headerRow = table.appendTableRow();
  for (var h = 0; h < numCols; h++) {
    var cell = headerRow.appendTableCell(headers[h]);
    cell.setBackgroundColor(DARK_NAVY);
    cell.setPaddingTop(10);
    cell.setPaddingBottom(10);
    cell.setPaddingLeft(12);
    cell.setPaddingRight(12);
    var cellPara = cell.getChild(0).asParagraph();
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
    style[DocumentApp.Attribute.FONT_SIZE] = 10;
    style[DocumentApp.Attribute.BOLD] = true;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = '#ffffff';
    cellPara.setAttributes(style);
  }

  // Data rows — generous padding, alternating backgrounds
  for (var r = 0; r < rows.length; r++) {
    var dataRow = table.appendTableRow();
    for (var c = 0; c < numCols; c++) {
      var cellText = (rows[r][c] !== undefined && rows[r][c] !== null) ? String(rows[r][c]) : '';
      var dataCell = dataRow.appendTableCell(cellText);
      dataCell.setPaddingTop(8);
      dataCell.setPaddingBottom(8);
      dataCell.setPaddingLeft(12);
      dataCell.setPaddingRight(12);

      var dataPara = dataCell.getChild(0).asParagraph();
      dataPara.setLineSpacing(1.4);
      var dStyle = {};
      dStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
      dStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
      dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
      dStyle[DocumentApp.Attribute.BOLD] = false;
      dataPara.setAttributes(dStyle);

      // Alternating row colors
      if (r % 2 === 1) {
        dataCell.setBackgroundColor(BG_ALT_ROW);
      }

      // Highlight specific row (accent background)
      if (highlightRowIndex !== undefined && r === highlightRowIndex) {
        dataCell.setBackgroundColor(BG_HIGHLIGHT);
        dStyle[DocumentApp.Attribute.BOLD] = true;
        dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
        dataPara.setAttributes(dStyle);
      }
    }
  }

  // Remove the empty first row that appendTable creates
  if (table.getNumRows() > numRows) {
    table.removeRow(0);
  }

  table.setBorderColor(BORDER_LIGHT);
  table.setBorderWidth(1);

  body.appendParagraph('').setSpacingAfter(4);
  return table;
}

// Same but for use inside a card cell
function addStyledTableInCell(cell, headers, rows, highlightRowIndex) {
  var numCols = headers.length;
  var table = cell.appendTable([ headers ]);

  // Style header row
  var headerRow = table.getRow(0);
  for (var h = 0; h < numCols; h++) {
    var hCell = headerRow.getCell(h);
    hCell.setBackgroundColor(DARK_NAVY);
    hCell.setPaddingTop(10);
    hCell.setPaddingBottom(10);
    hCell.setPaddingLeft(12);
    hCell.setPaddingRight(12);
    var hPara = hCell.getChild(0).asParagraph();
    var hStyle = {};
    hStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
    hStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
    hStyle[DocumentApp.Attribute.BOLD] = true;
    hStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = '#ffffff';
    hPara.setAttributes(hStyle);
  }

  // Data rows
  for (var r = 0; r < rows.length; r++) {
    var dataRow = table.appendTableRow();
    for (var c = 0; c < numCols; c++) {
      var cellText = (rows[r][c] !== undefined && rows[r][c] !== null) ? String(rows[r][c]) : '';
      var dataCell = dataRow.appendTableCell(cellText);
      dataCell.setPaddingTop(8);
      dataCell.setPaddingBottom(8);
      dataCell.setPaddingLeft(12);
      dataCell.setPaddingRight(12);

      var dataPara = dataCell.getChild(0).asParagraph();
      dataPara.setLineSpacing(1.4);
      var dStyle = {};
      dStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
      dStyle[DocumentApp.Attribute.FONT_SIZE] = 10;
      dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
      dStyle[DocumentApp.Attribute.BOLD] = false;
      dataPara.setAttributes(dStyle);

      if (r % 2 === 1) dataCell.setBackgroundColor(BG_ALT_ROW);

      if (highlightRowIndex !== undefined && r === highlightRowIndex) {
        dataCell.setBackgroundColor(BG_HIGHLIGHT);
        dStyle[DocumentApp.Attribute.BOLD] = true;
        dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
        dataPara.setAttributes(dStyle);
      }
    }
  }

  table.setBorderColor(BORDER_LIGHT);
  table.setBorderWidth(1);
  return table;
}

// ============================================================================
// CALLOUT BOX — Premium left-accent style
// ============================================================================

function addCalloutBox(body, text) {
  // Small spacer before the callout box
  body.appendParagraph('').setSpacingAfter(4);
  var table = body.appendTable();
  var row = table.appendTableRow();

  // Accent stripe cell (narrow colored column)
  var accentCell = row.appendTableCell('');
  accentCell.setBackgroundColor(BRIGHT_CYAN);
  accentCell.setPaddingTop(0);
  accentCell.setPaddingBottom(0);
  accentCell.setPaddingLeft(0);
  accentCell.setPaddingRight(0);
  accentCell.setWidth(6);

  // Content cell
  var contentCell = row.appendTableCell(text);
  contentCell.setBackgroundColor(BG_CALLOUT);
  contentCell.setPaddingTop(14);
  contentCell.setPaddingBottom(14);
  contentCell.setPaddingLeft(16);
  contentCell.setPaddingRight(16);

  var cellPara = contentCell.getChild(0).asParagraph();
  cellPara.setLineSpacing(1.5);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  style[DocumentApp.Attribute.ITALIC] = false;
  cellPara.setAttributes(style);

  table.setBorderColor(BG_CALLOUT);
  table.setBorderWidth(0);

  // Remove empty first row
  if (table.getNumRows() > 1) table.removeRow(0);

  body.appendParagraph('').setSpacingAfter(4);
  return table;
}

// Callout inside a card cell
function addCalloutBoxInCell(cell, text) {
  var table = cell.appendTable([['', text]]);

  var row = table.getRow(0);
  var accentCell = row.getCell(0);
  accentCell.setBackgroundColor(BRIGHT_CYAN);
  accentCell.setPaddingTop(0);
  accentCell.setPaddingBottom(0);
  accentCell.setPaddingLeft(0);
  accentCell.setPaddingRight(0);
  accentCell.setWidth(6);

  var contentCell = row.getCell(1);
  contentCell.setBackgroundColor(BG_CALLOUT);
  contentCell.setPaddingTop(14);
  contentCell.setPaddingBottom(14);
  contentCell.setPaddingLeft(16);
  contentCell.setPaddingRight(16);

  var cellPara = contentCell.getChild(0).asParagraph();
  cellPara.setLineSpacing(1.5);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  style[DocumentApp.Attribute.ITALIC] = false;
  cellPara.setAttributes(style);

  table.setBorderColor(BG_CALLOUT);
  table.setBorderWidth(0);
  return table;
}

// ============================================================================
// KEY METRICS — Large numbers in a horizontal card grid
// ============================================================================

function addKeyMetrics(body, metrics) {
  var table = body.appendTable();
  var row = table.appendTableRow();

  for (var i = 0; i < metrics.length; i++) {
    var cell = row.appendTableCell('');
    cell.setBackgroundColor(BG_LIGHT);
    cell.setPaddingTop(16);
    cell.setPaddingBottom(16);
    cell.setPaddingLeft(14);
    cell.setPaddingRight(14);

    // Large number
    var numPara = cell.appendParagraph(metrics[i][0]);
    numPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    numPara.setSpacingAfter(4);
    var nStyle = {};
    nStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
    nStyle[DocumentApp.Attribute.FONT_SIZE] = 22;
    nStyle[DocumentApp.Attribute.BOLD] = true;
    nStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEAL;
    numPara.setAttributes(nStyle);

    // Description
    var descPara = cell.appendParagraph(metrics[i][1]);
    descPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    var dStyle = {};
    dStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
    dStyle[DocumentApp.Attribute.FONT_SIZE] = 9;
    dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_MUTED;
    descPara.setAttributes(dStyle);

    // Remove empty first paragraph
    try {
      var first = cell.getChild(0);
      if (first.getType() === DocumentApp.ElementType.PARAGRAPH && first.asParagraph().getText() === '') {
        cell.removeChild(first);
      }
    } catch (e) {}
  }

  // Remove empty first row
  if (table.getNumRows() > 1) table.removeRow(0);

  table.setBorderColor(BORDER_LIGHT);
  table.setBorderWidth(1);

  body.appendParagraph('').setSpacingAfter(4);
  return table;
}

// ============================================================================
// LISTS — Styled bullets and numbered lists
// ============================================================================

function addBullets(body, items) {
  for (var i = 0; i < items.length; i++) {
    var li = body.appendListItem(items[i]);
    li.setGlyphType(DocumentApp.GlyphType.BULLET);
    li.setLineSpacing(1.35);
    li.setSpacingAfter(2);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
    li.setAttributes(style);
  }
  body.appendParagraph('').setSpacingAfter(2);
}

function addNumberedList(body, items) {
  for (var i = 0; i < items.length; i++) {
    var li = body.appendListItem(items[i]);
    li.setGlyphType(DocumentApp.GlyphType.NUMBER);
    li.setLineSpacing(1.35);
    li.setSpacingAfter(2);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
    li.setAttributes(style);
  }
  body.appendParagraph('').setSpacingAfter(2);
}

function addChecklistItems(body, items) {
  for (var i = 0; i < items.length; i++) {
    var li = body.appendListItem(items[i]);
    li.setGlyphType(DocumentApp.GlyphType.BULLET);
    li.setLineSpacing(1.4);
    li.setSpacingAfter(2);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
    li.setAttributes(style);
  }
  body.appendParagraph('').setSpacingAfter(2);
}

// ============================================================================
// PAGE BREAK — Force content to start on a new page
// ============================================================================

function addPageBreak(body) {
  var para = body.appendParagraph('');
  para.setSpacingBefore(0);
  para.setSpacingAfter(0);
  para.appendPageBreak();
}

// ============================================================================
// DIVIDER
// ============================================================================

function addDivider(body) {
  var divPara = body.appendParagraph('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  divPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var style = {};
  style[DocumentApp.Attribute.FONT_SIZE] = 6;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = BORDER_LIGHT;
  divPara.setAttributes(style);
  divPara.setSpacingBefore(12);
  divPara.setSpacingAfter(12);
}

// ============================================================================
// TEXT HELPERS
// ============================================================================

function addCenteredText(body, text, fontSize, color, bold, italic) {
  var para = body.appendParagraph(text);
  para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  para.setLineSpacing(1.4);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = (bold) ? 'Montserrat' : 'Inter';
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
  para.setLineSpacing(1.5);
  para.setSpacingAfter(8);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  style[DocumentApp.Attribute.FONT_SIZE] = 10;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_MUTED;
  style[DocumentApp.Attribute.ITALIC] = true;
  para.setAttributes(style);
  return para;
}

function addBodyBold(body, text) {
  var para = body.appendParagraph(text);
  para.setLineSpacing(1.5);
  para.setSpacingAfter(6);
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_PRIMARY;
  style[DocumentApp.Attribute.BOLD] = true;
  para.setAttributes(style);
  return para;
}

// ============================================================================
// PRICE BANNER — Big centered price callout
// ============================================================================

function addPriceBanner(body, price, description) {
  var table = body.appendTable();
  var row = table.appendTableRow();
  var cell = row.appendTableCell('');
  cell.setBackgroundColor(BG_COVER);
  cell.setPaddingTop(24);
  cell.setPaddingBottom(24);
  cell.setPaddingLeft(20);
  cell.setPaddingRight(20);

  var pricePara = cell.appendParagraph(price);
  pricePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  pricePara.setSpacingAfter(4);
  var pStyle = {};
  pStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  pStyle[DocumentApp.Attribute.FONT_SIZE] = 26;
  pStyle[DocumentApp.Attribute.BOLD] = true;
  pStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  pricePara.setAttributes(pStyle);

  var descPara = cell.appendParagraph(description);
  descPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var dStyle = {};
  dStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  dStyle[DocumentApp.Attribute.FONT_SIZE] = 12;
  dStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEAL;
  dStyle[DocumentApp.Attribute.BOLD] = true;
  descPara.setAttributes(dStyle);

  table.setBorderColor(BORDER_ACCENT);
  table.setBorderWidth(2);

  // Remove empty first row & paragraph
  if (table.getNumRows() > 1) table.removeRow(0);
  try {
    var first = cell.getChild(0);
    if (first.getType() === DocumentApp.ElementType.PARAGRAPH && first.asParagraph().getText() === '') {
      cell.removeChild(first);
    }
  } catch (e) {}

  body.appendParagraph('').setSpacingAfter(4);
  return table;
}

// ============================================================================
// HEADER & FOOTER
// ============================================================================

function setupHeaderFooter(doc) {
  var header = doc.addHeader();
  var headerPara = header.appendParagraph('SAGEMIND AI');
  headerPara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
  var hStyle = {};
  hStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  hStyle[DocumentApp.Attribute.FONT_SIZE] = 8;
  hStyle[DocumentApp.Attribute.BOLD] = true;
  hStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_FAINT;
  headerPara.setAttributes(hStyle);

  var footer = doc.addFooter();
  var footerPara = footer.appendParagraph('Sagemind AI LLC  \u00b7  sagemindai.io  \u00b7  Confidential');
  footerPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var fStyle = {};
  fStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  fStyle[DocumentApp.Attribute.FONT_SIZE] = 8;
  fStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_FAINT;
  footerPara.setAttributes(fStyle);
}

// ============================================================================
// PIN HEADER ROWS — Uses Docs Advanced Service to repeat headers across pages
// ============================================================================

function pinAllTableHeaders(docId) {
  var doc = Docs.Documents.get(docId);
  var body = doc.body;

  // Collect table start indices for data tables (3+ rows, 2+ cols)
  var tableIndices = [];
  for (var i = 0; i < body.content.length; i++) {
    var element = body.content[i];
    if (!element.table) continue;

    var table = element.table;
    var numRows = table.tableRows.length;
    var numCols = table.tableRows[0].tableCells.length;

    if (numRows < 3 || numCols < 2) continue;
    tableIndices.push(element.startIndex);
  }

  // Pin each table header one at a time to handle errors gracefully
  for (var t = 0; t < tableIndices.length; t++) {
    try {
      Docs.Documents.batchUpdate({
        requests: [{
          pinTableHeaderRows: {
            tableStartLocation: { index: tableIndices[t] },
            pinnedHeaderRowsCount: 1
          }
        }]
      }, docId);
    } catch (e) {
      Logger.log('Could not pin header for table at index ' + tableIndices[t] + ': ' + e.message);
    }
  }
}

// ============================================================================
// MOVE & SHARE
// ============================================================================

function moveAndShare(doc) {
  var file = DriveApp.getFileById(doc.getId());
  // Docs stay in root Drive
  return doc.getUrl();
}

// ============================================================================
// DOCUMENT FOOTER SECTION
// ============================================================================

function addDocumentFooter(body, closingText) {
  addDivider(body);

  if (closingText) {
    var closePara = body.appendParagraph(closingText);
    closePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    closePara.setLineSpacing(1.5);
    closePara.setSpacingAfter(8);
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_BODY;
    style[DocumentApp.Attribute.ITALIC] = true;
    closePara.setAttributes(style);
  }

  var brandPara = body.appendParagraph('Sagemind AI LLC  \u00b7  sagemindai.io');
  brandPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var bStyle = {};
  bStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Inter';
  bStyle[DocumentApp.Attribute.FONT_SIZE] = 9;
  bStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_FAINT;
  brandPara.setAttributes(bStyle);
}
