import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "1701-auto-care",
  businessName: "1701 Auto Care",
  tagline: "Alameda's Trusted Auto Repair Shop",
  industry: "auto-repair",

  phone: "(510) 522-1701",
  address: {
    street: "1701 Buena Vista Ave",
    city: "Alameda",
    state: "CA",
    zip: "94501",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-122.26!3d37.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=1701+Auto+Care+Alameda",
  },
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "By Appointment" },
    { day: "Sunday", hours: "Closed" },
  ],

  theme: themes["1701-auto-care"],

  layout: {
    heroVariant: "fullscreen",
    headerVariant: "solid",
    servicesLayout: "grid-3",
    ctaVariant: "gradient",
    footerVariant: "full",
  },

  hero: {
    headline: "Honest Auto Repair You Can Count On",
    subheadline:
      "Two ASE-certified owners with over 30 years of combined experience. 200+ five-star reviews from Alameda drivers who trust us with their vehicles.",
    ctaPrimary: { text: "Call Now", href: "tel:+15105221701" },
    ctaSecondary: { text: "Our Services", href: "/services" },
    backgroundImage: "/sites/1701-auto-care/hero.jpg",
    trustBadges: ["200+ Reviews", "ASE Certified", "30+ Years Experience", "All Makes & Models"],
  },

  services: [
    { name: "Brake Service", description: "Complete brake inspections, pad and rotor replacement, brake fluid flush, and ABS diagnostics." },
    { name: "Engine Repair", description: "From check engine light diagnostics to complete engine overhauls. We handle it all with precision." },
    { name: "Oil Change & Tune-Up", description: "Conventional and synthetic oil changes, filter replacements, and scheduled maintenance to keep your car running smoothly." },
    { name: "Transmission Service", description: "Fluid changes, diagnostics, and repair for automatic and manual transmissions." },
    { name: "Electrical Systems", description: "Battery testing and replacement, alternator repair, starter motor service, and full electrical diagnostics." },
    { name: "Suspension & Steering", description: "Shocks, struts, ball joints, tie rods, and alignment services for a smooth, safe ride." },
  ],

  about: {
    headline: "Two Owners, One Mission: Honest Auto Care",
    paragraphs: [
      "1701 Auto Care is owned and operated by Malcolm and Sebastian, two ASE-certified mechanics with a combined 34 years of experience. They opened the shop with a simple mission: provide honest, high-quality auto repair at fair prices.",
      "Located on Buena Vista Avenue in Alameda, the shop has built a loyal customer base with over 200 five-star reviews. Every vehicle that comes through the door gets the same careful attention, whether it's a routine oil change or a major engine repair.",
      "We believe in transparency — you'll always get a clear explanation of what's wrong, what needs to be fixed, and exactly what it will cost before we start any work.",
    ],
    stats: [
      { value: "200+", label: "5-Star Reviews" },
      { value: "34", label: "Years Combined" },
      { value: "2", label: "ASE Owners" },
      { value: "All", label: "Makes & Models" },
    ],
  },

  reviews: {
    averageRating: 4.9,
    totalReviews: 203,
    staticReviews: [
      { text: "Malcolm and Sebastian are the real deal. Honest, fair, and they do excellent work. I've been bringing both my cars here for years.", name: "Patricia M.", rating: 5, source: "Yelp" },
      { text: "They found and fixed an issue that two other shops missed. Didn't try to upsell me on anything I didn't need. Finally found my forever mechanic.", name: "Robert K.", rating: 5, source: "Yelp" },
      { text: "Best auto shop in Alameda. They explain everything clearly, pricing is fair, and the work is always done right the first time.", name: "Jennifer S.", rating: 5, source: "Google" },
    ],
  },

  faq: [
    { question: "Do you work on all makes and models?", answer: "Yes! We service all domestic and foreign vehicles — cars, trucks, and SUVs." },
    { question: "Do I need an appointment?", answer: "We recommend calling ahead to schedule, especially for larger repairs. We'll do our best to accommodate same-day requests." },
    { question: "Are both owners ASE certified?", answer: "Yes, both Malcolm (16 years experience) and Sebastian (18 years experience) are ASE-certified master technicians." },
    { question: "Do you offer warranties on your work?", answer: "Yes, we provide a 12-month / 12,000-mile warranty on parts and labor for most repairs." },
    { question: "What payment methods do you accept?", answer: "We accept cash, checks, and all major credit/debit cards." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/1701-auto-care-alameda",
    facebook: "https://www.facebook.com/1701autocare",
  },

  seo: {
    title: "1701 Auto Care | Trusted Auto Repair in Alameda, CA",
    description: "ASE-certified auto repair in Alameda. 200+ 5-star reviews. Honest service, fair prices, all makes and models. Malcolm & Sebastian, owners.",
    keywords: ["auto repair alameda", "mechanic alameda ca", "car repair alameda", "1701 auto care", "ase certified alameda"],
    schemaType: "AutoRepair",
  },
};

export default config;
