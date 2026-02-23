/**
 * Innovations Salon — New Website Intake Form
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire script
 * 4. Click Run → createIntakeForm
 * 5. Authorize when prompted
 * 6. Check your Google Drive — the form will be there
 * 7. Share the form link with the client
 */

function createIntakeForm() {
  const form = FormApp.create('Innovations Salon — New Website Intake');
  form.setDescription(
    'Hi! We\'re building your new website with built-in online booking — no monthly fees like Vagaro or Booksy.\n\n' +
    'We\'ve already pulled a lot of your info from your current site and public listings. ' +
    'This form just confirms a few things and fills in the gaps.\n\n' +
    'Should take about 10 minutes. Thanks!'
  );
  form.setConfirmationMessage('Thank you! We have everything we need to get started. We\'ll be in touch soon.');
  form.setAllowResponseEdits(true);

  // ===== SECTION 1: Business Basics =====
  form.addSectionHeaderItem()
    .setTitle('Business Basics')
    .setHelpText('We found this info online — please confirm or correct.');

  form.addTextItem()
    .setTitle('Business name')
    .setHelpText('We have: Innovations Salon and Spa')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Address')
    .setHelpText('We have: 19581 Center St, Castro Valley, CA 94546')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Phone number')
    .setHelpText('We have: (510) 886-7330')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Email for website contact & booking notifications')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Anything above that needs correcting?')
    .setRequired(false);

  // ===== SECTION 2: Hours =====
  form.addSectionHeaderItem()
    .setTitle('Hours of Operation')
    .setHelpText('We found conflicting hours online. Please confirm your current schedule.');

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var defaults = ['Closed', 'Closed', '9:00 AM – 6:00 PM', '9:00 AM – 6:00 PM', '9:00 AM – 6:00 PM', '9:00 AM – 6:00 PM', '10:00 AM – 4:00 PM'];

  for (var i = 0; i < days.length; i++) {
    form.addTextItem()
      .setTitle(days[i] + ' hours')
      .setHelpText('Our best guess: ' + defaults[i])
      .setRequired(false);
  }

  form.addMultipleChoiceItem()
    .setTitle('Do you take appointments only, or walk-ins too?')
    .setChoiceValues(['Appointments only', 'Walk-ins welcome', 'Both — appointments preferred but walk-ins accepted'])
    .setRequired(true);

  // ===== SECTION 3: Services =====
  form.addSectionHeaderItem()
    .setTitle('Services & Pricing')
    .setHelpText('We pulled this from your current website (innovationssalonscv.com). Just let us know what needs updating.');

  form.addMultipleChoiceItem()
    .setTitle('Is this service list still accurate?')
    .setHelpText(
      'Women\'s Hair:\n' +
      '• Haircut with Blow Dry — $70\n' +
      '• Haircut Only — $65\n' +
      '• Blow Dry / Style — $45\n' +
      '• Upstyles — $85\n\n' +
      'Color:\n' +
      '• Color Retouch — $80\n' +
      '• Semi Color — $95\n' +
      '• Full Weave (Highlights) — $130\n' +
      '• Partial Weave — $115\n' +
      '• Balayage / Ombre — $150\n' +
      '• Color Correction — By quote\n\n' +
      'Treatments:\n' +
      '• Conditioning Treatment — $25\n' +
      '• Permanent Wave — $100\n' +
      '• Brazilian Blowout — $199\n' +
      '• Cezanne Treatment — $250\n\n' +
      'Men\'s & Kids:\n' +
      '• Men\'s Haircut — $40\n' +
      '• Kids (under 10) — $35\n\n' +
      'Threading:\n' +
      '• Full Face — $35 | Eyebrow — $13 | Upper Lip — $6\n' +
      '• Chin — $9 | Forehead — $9 | Sideburns — $10\n\n' +
      'Lashes:\n' +
      '• Eyelash Extensions — $100\n' +
      '• Eyelash Application — $40\n\n' +
      'Skin Care:\n' +
      '• Micro-channeling — $275'
    )
    .setChoiceValues(['Yes, this is accurate', 'Mostly accurate — minor changes (see below)', 'Needs significant updates (see below)'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Service/pricing changes needed')
    .setHelpText('Any services to add, remove, or re-price?')
    .setRequired(false);

  // ===== SECTION 4: Team =====
  form.addSectionHeaderItem()
    .setTitle('Your Team')
    .setHelpText('We found these stylists mentioned in your reviews. Help us confirm who\'s on the team.');

  form.addCheckboxItem()
    .setTitle('Which of these stylists currently work at the salon?')
    .setChoiceValues(['Marsha', 'Ashley / Ashlee', 'Michele / Michelle', 'Christina', 'Gina K'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Any other stylists we missed?')
    .setHelpText('Name and specialty, if possible')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Who is the salon owner?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Short bios for each stylist (optional)')
    .setHelpText('1-2 sentences each. Example: "Ashley — Versatile stylist who loves making clients feel confident. Specializes in cuts and color." We can write these for you if you prefer — just say the word!')
    .setRequired(false);

  // ===== SECTION 5: Booking =====
  form.addSectionHeaderItem()
    .setTitle('Online Booking Preferences')
    .setHelpText('Your new website will have built-in online booking — no monthly fees.');

  form.addCheckboxItem()
    .setTitle('Which stylists should be bookable online?')
    .setChoiceValues(['Marsha', 'Ashley / Ashlee', 'Michele / Michelle', 'Christina', 'Gina K', 'All stylists'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Should customers be able to pick a specific stylist?')
    .setChoiceValues([
      'Yes — let them choose their stylist',
      'No — assign based on availability',
      'Both — let them choose or select "any available"'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Allow same-day booking online?')
    .setChoiceValues(['Yes', 'No — require at least 24 hours notice', 'No — require at least 48 hours notice'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Do certain stylists only do certain services?')
    .setHelpText('For example, does only one stylist do threading?')
    .setChoiceValues(['No — any stylist can do any service', 'Yes (please explain below)'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('If yes, which stylists do which services?')
    .setRequired(false);

  // ===== SECTION 6: Photos & Branding =====
  form.addSectionHeaderItem()
    .setTitle('Photos & Branding')
    .setHelpText('Great photos are the #1 thing that drives salon bookings. We\'ll need a few things from you.');

  form.addCheckboxItem()
    .setTitle('Which of these can you provide?')
    .setChoiceValues([
      'Salon interior photos (3-5 shots)',
      'Stylist headshots / photos',
      'Before & after gallery photos',
      'Logo file (PNG or SVG)',
      'None of these yet — I\'ll need help'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Do you have a logo you want to keep?')
    .setChoiceValues(['Yes — I\'ll send it over', 'Yes but it needs updating', 'No — please design something'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Any color/style preferences for the website?')
    .setHelpText('E.g. "warm and earthy", "modern and clean", "match our current branding"')
    .setRequired(false);

  // ===== SECTION 7: Extra Features =====
  form.addSectionHeaderItem()
    .setTitle('Extra Features')
    .setHelpText('Optional — let us know if any of these interest you.');

  form.addCheckboxItem()
    .setTitle('Any of these sound useful?')
    .setChoiceValues([
      'Instagram feed on the website',
      'Google reviews displayed on homepage',
      'Gift cards / promotions section',
      'Blog / hair tips section',
      'Product retail / boutique section',
      'None of these'
    ])
    .setRequired(false);

  // ===== SECTION 8: Anything Else =====
  form.addSectionHeaderItem()
    .setTitle('Anything Else?');

  form.addParagraphTextItem()
    .setTitle('Is there anything about your current website you like or dislike?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Anything else you\'d like on the new site?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Best way to reach you for follow-up questions?')
    .setHelpText('Phone, email, text, etc.')
    .setRequired(true);

  // Log the form URL
  Logger.log('Form created! URL: ' + form.getEditUrl());
  Logger.log('Share this link with the client: ' + form.getPublishedUrl());

  return form.getPublishedUrl();
}
