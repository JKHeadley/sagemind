function createAgreement() {
  var doc = DocumentApp.create('MVP Factory \u2014 Free Client Agreement');
  var body = doc.getBody();
  body.clear();
  setupPageStyle(body);

  // ---- COVER ----
  addCoverSection(body,
    'Website Development Agreement',
    'Portfolio Program',
    null
  );

  // ---- PARTIES ----
  applyHeading1(body.appendParagraph(''), 'Parties');

  addBodyText(body, 'This agreement is between Sagemind AI LLC ("Developer") and _________________________ ("Client"), business name: _________________________.');

  // ---- OVERVIEW ----
  addCalloutBox(body, 'Sagemind AI is building you a custom website at no cost. In return, you agree to provide a testimonial and allow us to showcase your website as an example of our work. This is a simple, good-faith arrangement \u2014 not a binding legal contract.');

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
      ['Domain name', '~$10\u201315/year', 'Your registrar (Namecheap, Google, etc.)'],
      ['Hosting (Vercel)', '$0/month', 'Vercel (free tier)'],
      ['AI Chatbot API', '~$2\u20133/month', 'Your chosen provider (OpenAI, Anthropic, etc.)']
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
    'Additional revisions will be billed at $75\u2013150/hour'
  ]);

  // ---- SECTION 7 ----
  applyHeading1(body.appendParagraph(''), 'Section 7: After Handoff');

  addBullets(body, [
    'Sagemind delivers the site in working condition',
    'After handoff, you are responsible for maintenance and updates',
    'Optional support is available at $75\u2013150/hour'
  ]);

  // ---- SIGNATURE BLOCK ----
  addDivider(body);
  applyHeading1(body.appendParagraph(''), 'Signatures');

  // Signature table — 2 columns, clean styling
  var sigTable = body.appendTable();
  var sigRow = sigTable.appendTableRow();

  // Left column — Sagemind
  var leftCell = sigRow.appendTableCell('');
  leftCell.setBackgroundColor(BG_LIGHT);
  leftCell.setPaddingTop(20);
  leftCell.setPaddingBottom(20);
  leftCell.setPaddingLeft(20);
  leftCell.setPaddingRight(20);

  var lTitle = leftCell.appendParagraph('Sagemind AI LLC');
  var ltStyle = {};
  ltStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  ltStyle[DocumentApp.Attribute.FONT_SIZE] = 13;
  ltStyle[DocumentApp.Attribute.BOLD] = true;
  ltStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  lTitle.setAttributes(ltStyle);
  lTitle.setSpacingAfter(16);

  var lSig = leftCell.appendParagraph('Signature: ________________________');
  applyBody(lSig); lSig.setSpacingAfter(12);
  var lName = leftCell.appendParagraph('Name: ________________________');
  applyBody(lName); lName.setSpacingAfter(12);
  var lDate = leftCell.appendParagraph('Date: ________________________');
  applyBody(lDate);

  // Right column — Client
  var rightCell = sigRow.appendTableCell('');
  rightCell.setBackgroundColor(BG_LIGHT);
  rightCell.setPaddingTop(20);
  rightCell.setPaddingBottom(20);
  rightCell.setPaddingLeft(20);
  rightCell.setPaddingRight(20);

  var rTitle = rightCell.appendParagraph('Client');
  var rtStyle = {};
  rtStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Montserrat';
  rtStyle[DocumentApp.Attribute.FONT_SIZE] = 13;
  rtStyle[DocumentApp.Attribute.BOLD] = true;
  rtStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = DARK_NAVY;
  rTitle.setAttributes(rtStyle);
  rTitle.setSpacingAfter(16);

  var rSig = rightCell.appendParagraph('Signature: ________________________');
  applyBody(rSig); rSig.setSpacingAfter(12);
  var rName = rightCell.appendParagraph('Name: ________________________');
  applyBody(rName); rName.setSpacingAfter(12);
  var rBiz = rightCell.appendParagraph('Business: ________________________');
  applyBody(rBiz); rBiz.setSpacingAfter(12);
  var rDate = rightCell.appendParagraph('Date: ________________________');
  applyBody(rDate);

  // Remove empty first row
  if (sigTable.getNumRows() > 1) {
    sigTable.removeRow(0);
  }

  sigTable.setBorderColor(BORDER_LIGHT);
  sigTable.setBorderWidth(1);

  // Remove empty first paragraph in cells
  try {
    var leftFirst = leftCell.getChild(0);
    if (leftFirst.getType() === DocumentApp.ElementType.PARAGRAPH && leftFirst.asParagraph().getText() === '') {
      leftCell.removeChild(leftFirst);
    }
    var rightFirst = rightCell.getChild(0);
    if (rightFirst.getType() === DocumentApp.ElementType.PARAGRAPH && rightFirst.asParagraph().getText() === '') {
      rightCell.removeChild(rightFirst);
    }
  } catch (e) {}

  body.appendParagraph('').setSpacingAfter(8);

  // ---- FOOTER ----
  addDocumentFooter(body, null);

  setupHeaderFooter(doc);
  doc.saveAndClose();
  pinAllTableHeaders(doc.getId());
  var url = moveAndShare(doc);
  Logger.log('Agreement created: ' + url);
  return url;
}
