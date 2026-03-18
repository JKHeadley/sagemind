function createChecklist() {
  var doc = DocumentApp.create('MVP Factory \u2014 Client Onboarding Checklist');
  var body = doc.getBody();
  body.clear();
  setupPageStyle(body);

  // ---- COVER ----
  addCoverSection(body,
    'Client Onboarding Checklist',
    'Everything you need to get your new website launched',
    null
  );

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
    '\u2610 Logo (high resolution \u2014 PNG or SVG preferred)',
    '\u2610 Photos (at least 5\u201310 of your business, team, products/services)',
    '\u2610 Services or menu list with descriptions',
    '\u2610 About your business (a paragraph or two \u2014 your story, mission, what makes you special)',
    '\u2610 FAQ (5\u201310 common questions your customers ask)',
    '\u2610 Social media links (Instagram, Facebook, Yelp, etc.)',
    '\u2610 Any specific requests or preferences',
    '\u2610 Google Business Profile login (optional \u2014 for SEO optimization)'
  ]);

  // ---- STEP 2 ----
  applyHeading1(body.appendParagraph(''), 'Step 2: Accounts You Need to Create');

  addBodyText(body, "You'll need these three accounts. We'll help you set everything up.");

  applyHeading2(body.appendParagraph(''), 'Domain Name (~$10\u201315/year)');
  addBodyText(body, 'This is your website address (e.g., yourbusiness.com).');
  addNumberedList(body, [
    'Go to namecheap.com or domains.google.com',
    'Search for your business name',
    'Buy the .com version (~$10\u201315/year)',
    "We'll help you point it to your website"
  ]);

  applyHeading2(body.appendParagraph(''), 'Vercel Account (Free)');
  addBodyText(body, 'This is where your website lives. The free tier is all you need.');
  addNumberedList(body, [
    'Go to vercel.com',
    'Click "Sign Up" \u2014 use your email',
    "That's it \u2014 we handle the rest"
  ]);

  applyHeading2(body.appendParagraph(''), 'AI Chatbot API Key (~$2\u20133/month)');
  addBodyText(body, 'Your website includes an AI chatbot that answers customer questions. You choose which AI provider to use:');

  addStyledTable(body,
    ['Provider', 'Estimated Cost', 'Sign Up'],
    [
      ['OpenAI', '~$2\u20133/month', 'platform.openai.com'],
      ['Anthropic', '~$2\u20133/month', 'console.anthropic.com'],
      ['Google AI', '~$1\u20132/month', 'aistudio.google.com']
    ]
  );

  addBodyText(body, "We'll set up the chatbot for you \u2014 you just need to create an account and give us the API key.");

  // ---- STEP 3 ----
  applyHeading1(body.appendParagraph(''), 'Step 3: Review Process');

  addNumberedList(body, [
    'We build your site with your real content (~1\u20132 weeks after receiving it)',
    'You get a preview link to review',
    'Round 1: Send us your feedback',
    'We make changes',
    'Round 2: Final tweaks',
    'Done! (Additional revisions beyond 2 rounds are $75\u2013150/hr)'
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
      ['AI Chatbot', '~$2\u20133/month', 'You (your API key)'],
      ['Domain renewal', '~$10\u201315/year', 'You'],
      ['Site updates (optional)', '$75\u2013150/hour', 'Us (on request)'],
      ['Managed hosting (optional)', '$19/month', 'Us (if you want hands-off)']
    ]
  );

  addBodyBold(body, 'Total ongoing cost: approximately $10\u201315/year for the domain + $2\u20133/month for the chatbot. That\'s it.');

  // ---- QUESTIONS ----
  addDocumentFooter(body, null);

  applyHeading1(body.appendParagraph(''), 'Questions?');

  addCenteredText(body, 'Email us at adriana@sagemindai.io or visit sagemindai.io', 12, TEAL, false, false);

  setupHeaderFooter(doc);
  doc.saveAndClose();
  pinAllTableHeaders(doc.getId());
  var url = moveAndShare(doc);
  Logger.log('Checklist created: ' + url);
  return url;
}
