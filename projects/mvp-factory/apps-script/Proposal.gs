function createProposal() {
  var doc = DocumentApp.create('Sagemind AI \u2014 MVP Factory Proposal');
  var body = doc.getBody();
  body.clear();
  setupPageStyle(body);

  // ---- COVER ----
  addCoverSection(body,
    'MVP Factory Proposal',
    'Launch-Ready Websites for Local Businesses \u2014 Built Once, Owned Forever',
    'Prepared by Adriana  |  For Justin Headley  |  March 16, 2026'
  );

  // ---- SECTION 1: EXECUTIVE SUMMARY ----
  applyHeading1(body.appendParagraph(''), 'Executive Summary');

  addBodyText(body, "We've built 15 fully functional, production-ready websites for Bay Area small businesses that currently have no website. Each site is custom-designed, mobile-responsive, SEO-optimized, and includes an AI chatbot \u2014 all running from a single Next.js application.");

  addCalloutBox(body, 'The model: We deploy a sample site at business-name.sagemindai.io, cold-pitch the owner with a direct link, and close them on a premium, one-time website build. They pay once, they own it outright. No monthly fees. No subscriptions. No strings attached.');

  addBodyBold(body, 'Why this works:');
  addBullets(body, [
    'Small business owners are tired of monthly fees \u2014 they want to own their website',
    '27% of US small businesses (~8-10M) still have no website',
    'The spec site makes the pitch concrete \u2014 they see their business live before spending a dollar',
    'Our build cost per site is near zero (single codebase, config-driven) \u2014 the margin on each sale is 85-90%+',
    'No ongoing support burden means we can focus entirely on building and selling'
  ]);

  addKeyMetrics(body, [
    ['15', 'Spec sites built'],
    ['$1,999', 'Flat-fee price'],
    ['$0', 'Ongoing cost'],
    ['~87%', 'Gross margin']
  ]);

  // ---- SECTION 2: WHAT WE BUILT ----
  applyHeading1(body.appendParagraph(''), 'What We Built');

  applyHeading2(body.appendParagraph(''), '15 Custom Websites \u2014 Single Codebase');

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

  addBodyText(body, 'These 15 demo sites serve as the spec pitch \u2014 live proof of what we can build. The final client site is polished with their real photos, content, and branding.');

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
  applyHeading1(body.appendParagraph(''), 'How It Works \u2014 The Client Journey');

  addBodyText(body, 'A simple, 6-step process from first contact to handoff:');

  addStyledTable(body,
    ['Step', 'What Happens', 'Timeline'],
    [
      ['1. Spec Pitch', 'We email the business owner a link to their live demo site.', 'Day 1'],
      ['2. Discovery Call', '15-min call to walk through the site and close the sale. 50% deposit collected.', 'Days 2\u20137'],
      ['3. Content Gathering', 'Client sends photos, logo, menu/services, and requests via our checklist.', 'Days 7\u201314'],
      ['4. We Build v1', 'Polished site with real content. Custom design, AI chatbot, full SEO.', 'Days 14\u201321'],
      ['5. Review & Revise', 'Client reviews. Up to 2 rounds of revisions.', 'Days 21\u201328'],
      ['6. Handoff', 'Site goes live on their domain. They own everything. Final 50% collected.', 'Day 28\u201330']
    ]
  );

  addCalloutBox(body, 'Total turnaround: ~4 weeks from yes to live site. The client gets a premium, custom website they fully own \u2014 no monthly fees, no lock-in, no vendor dependency.');

  // ---- SECTION 4: MARKET OPPORTUNITY ----
  applyHeading1(body.appendParagraph(''), 'Market Opportunity');

  applyHeading2(body.appendParagraph(''), 'The Problem');

  addBullets(body, [
    '27% of US small businesses have no website (8\u201310 million businesses)',
    '81% of consumers research businesses online before buying',
    '97% of consumers search online to find local businesses'
  ]);

  addBodyText(body, "Most small business owners don't get a website because:");

  addNumberedList(body, [
    '"Too expensive" \u2014 they imagine $3,000\u2013$10,000',
    '"I don\'t want another monthly bill" \u2014 subscription fatigue is real',
    '"I don\'t have time to manage it" \u2014 they need done-for-you',
    '"I got burned before" \u2014 bad freelancer experience'
  ]);

  addCalloutBox(body, "Our pitch addresses every objection: it's affordable ($1,999 vs $5K\u2013$10K), it's one-time (no monthly fees), it's completely done-for-you (they just send photos), and they can see the quality before committing (the spec site).");

  applyHeading2(body.appendParagraph(''), 'Competitive Landscape');

  addStyledTable(body,
    ['Competitor Type', 'Price', 'Ownership', 'Ongoing Fees'],
    [
      ['DIY (Wix, Squarespace)', '$25\u201340/mo forever', 'No \u2014 locked to platform', 'Yes forever'],
      ['AI Builders (Durable, 10Web)', '$12\u201325/mo forever', 'No \u2014 locked to platform', 'Yes forever'],
      ['Freelancers (Fiverr/Upwork)', '$500\u20133,500 one-time', 'Yes (usually)', 'None (but no support)'],
      ['Local Agencies', '$3,000\u201310,000+', 'Yes', 'Optional maintenance'],
      ['Done-for-you (Hibu, Thryv)', '$300\u20131,500/mo', 'No \u2014 they own it', 'Yes forever'],
      ['Sagemind AI', '$1,999 one-time', 'Yes \u2014 fully yours', 'None']
    ],
    5
  );

  // ---- SECTION 5: THE PACKAGE ----
  applyHeading1(body.appendParagraph(''), 'The Package');

  addBodyText(body, 'One package. One price. Everything included.');

  addPriceBanner(body, '$1,999', 'One-Time, All-Inclusive');

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
    'We hand over the complete site code \u2014 they can host it anywhere',
    'No platform lock-in, no proprietary CMS',
    'Built on modern, open-source technology (Next.js, React, Tailwind)',
    'We assist with domain registration and initial hosting setup',
    'Full documentation on how to make basic updates'
  ]);

  applyHeading2(body.appendParagraph(''), 'Optional Add-Ons (After Handoff)');

  addStyledTable(body,
    ['Service', 'Price', 'Details'],
    [
      ['Site updates / changes', '$75\u2013150/hr', 'Come back anytime'],
      ['Managed hosting', '$19/mo', 'We host and maintain \u2014 totally optional'],
      ['Advanced SEO campaign', '$500\u20131,500', 'Deep keyword research + optimization'],
      ['Google Ads setup', '$499', 'Campaign setup + 30 days management'],
      ['Additional pages', '$200\u2013400/page', 'Gallery, team bios, testimonials, etc.']
    ]
  );

  // ---- SECTION 6: WHAT THE CLIENT NEEDS ----
  applyHeading1(body.appendParagraph(''), 'What the Client Needs');

  addBodyText(body, 'After handoff, the client is responsible for three things:');

  addStyledTable(body,
    ['Item', 'Cost', 'Notes'],
    [
      ['Vercel account (hosting)', '$0/mo', 'Free tier \u2014 more than enough for a small business site'],
      ['Domain name', '~$10\u201315/year', 'Client buys their own (we walk them through it)'],
      ['AI chatbot API key', '~$2\u20133/month', 'Client chooses provider: OpenAI, Anthropic, or Google AI']
    ]
  );

  addBodyText(body, 'Total ongoing cost to the client: approximately $12\u201318/month. We never buy anything on their behalf.');

  // ---- SECTION 7: UNIT ECONOMICS ----
  applyHeading1(body.appendParagraph(''), 'Unit Economics');

  applyHeading2(body.appendParagraph(''), 'Our Costs Per Build');

  addStyledTable(body,
    ['Item', 'Time/Cost', 'Notes'],
    [
      ['Development', '~4\u20138 hours', 'Config-driven \u2014 templated structure we customize'],
      ['Content gathering / communication', '~2\u20133 hours', 'Checklist-driven intake and review calls'],
      ['Revisions (2 rounds)', '~2\u20134 hours', 'Budgeted at 2 rounds max'],
      ['Domain / hosting setup', '~1 hour', 'DNS, deployment, SSL'],
      ['Total Time Per Client', '~10\u201316 hours', ''],
      ['Hard costs', '~$10\u201320 total', 'Near-zero marginal cost']
    ]
  );

  applyHeading2(body.appendParagraph(''), 'Margins');

  addKeyMetrics(body, [
    ['$1,999', 'Price per build'],
    ['~12 hrs', 'Average time'],
    ['$166/hr', 'Effective rate'],
    ['~87%', 'Gross margin']
  ]);

  applyHeading2(body.appendParagraph(''), 'Revenue Projections');

  addStyledTable(body,
    ['Timeline', 'Clients', 'Avg Sale', 'Revenue', 'Cumulative'],
    [
      ['Month 1 (free portfolio)', '3\u20135', '$0 (free)', '$0', '$0'],
      ['Months 2\u20133', '5\u20138', '$1,999', '$10K\u2013$16K', '$10K\u2013$16K'],
      ['Months 4\u20136 (referrals)', '8\u201312', '$1,999', '$16K\u2013$24K', '$26K\u2013$40K'],
      ['Months 7\u201312', '15\u201325', '$1,999', '$30K\u2013$50K', '$56K\u2013$90K'],
      ['Year 1 Total', '31\u201350', '\u2014', '\u2014', '$56,000\u2013$90,000']
    ],
    4
  );

  addBodyItalic(body, 'Assumptions: 20% close rate on cold pitches, referral rate of 1 per 3 happy clients starting month 4. First 3\u20135 clients are free for portfolio building.');

  // ---- SECTION 8: THE SPEC PITCH STRATEGY ----
  applyHeading1(body.appendParagraph(''), 'The "Spec Pitch" Strategy');

  applyHeading2(body.appendParagraph(''), 'Why This Beats Normal Cold Outreach');

  addStyledTable(body,
    ['Approach', 'Response Rate', 'Close Rate'],
    [
      ['Generic cold email', '~9%', '~1\u20132%'],
      ['Personalized cold email', '~18%', '~3\u20135%'],
      ['Spec site + personalized email', '25\u201335% (est.)', '15\u201325% (est.)']
    ],
    2
  );

  addCalloutBox(body, "The spec site triggers ownership psychology \u2014 they see their business name, their address, their reviews on a professional website. And because our model is one-time with no strings, the ask is simple: 'Want us to make this yours? One price, you own it forever.'");

  applyHeading2(body.appendParagraph(''), 'Outreach Timeline');

  addStyledTable(body,
    ['Days', 'Action'],
    [
      ['Day 1\u20132', 'Deploy all 15 spec sites, verify functionality'],
      ['Day 3\u20134', 'Research owner names, emails, phone numbers'],
      ['Day 5\u20136', 'Send first round of personalized pitch emails (stagger 5/day)'],
      ['Day 10\u201311', 'Follow-up email to non-responders'],
      ['Day 15', 'Phone call follow-up to remaining non-responders'],
      ['Day 20+', 'Discovery calls with interested leads, collect deposits, begin builds']
    ]
  );

  // ---- SECTION 9: LAUNCH STRATEGY ----
  applyHeading1(body.appendParagraph(''), 'Launch Strategy \u2014 Free Portfolio Clients');

  addBodyText(body, 'The first 3\u20135 clients receive their website at no cost in exchange for:');

  addBullets(body, [
    'A written or video testimonial within 30 days of launch',
    'Permission to display their site as a portfolio piece on sagemindai.io',
    'Permission to use their business name/logo in Sagemind marketing materials'
  ]);

  addBodyText(body, 'A simple written agreement covers these terms. After the portfolio is established, all subsequent clients pay the full $1,999.');

  addCalloutBox(body, 'These 3\u20135 case studies become our most powerful sales tool. Real businesses, real sites, real testimonials \u2014 worth far more than any ad spend.');

  // ---- SECTION 10: TECHNICAL ARCHITECTURE ----
  applyHeading1(body.appendParagraph(''), 'Technical Architecture');

  addBullets(body, [
    'Framework: Next.js 16, React 19, TypeScript, Tailwind CSS v4',
    'Architecture: Single app, dynamic routing \u2014 one codebase serves all spec sites',
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
      ['Low close rate (<10%)', 'Medium', 'Costs near-zero per pitch; expand target list to 50\u2013100'],
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

  // ---- FOOTER ----
  addDocumentFooter(body, 'This proposal represents near-zero hard costs invested with potential for $56,000\u2013$90,000+ in revenue within 12 months. Each closed client generates $1,999 with ~87% margins and no ongoing support obligation.');

  setupHeaderFooter(doc);
  doc.saveAndClose();
  pinAllTableHeaders(doc.getId());
  var url = moveAndShare(doc);
  Logger.log('Proposal created: ' + url);
  return url;
}
