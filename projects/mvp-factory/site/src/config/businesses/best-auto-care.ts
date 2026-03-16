import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "best-auto-care",
  businessName: "Best Auto Care",
  tagline: "San Francisco's Best-Value Auto Repair Since the 1980s",
  industry: "auto-repair",

  phone: "(415) 585-2800",
  address: {
    street: "1800 Alemany Blvd",
    city: "San Francisco",
    state: "CA",
    zip: "94112",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154!2d-122.44!3d37.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Best+Auto+Care+San+Francisco",
  },
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 5:30 PM" },
    { day: "Saturday", hours: "8:00 AM - 3:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  theme: themes["best-auto-care"],

  layout: {
    heroVariant: "centered",
    headerVariant: "topbar",
    servicesLayout: "grid-3",
    ctaVariant: "simple",
    footerVariant: "full",
  },

  hero: {
    headline: "Quality Auto Repair, Prices 18% Below Average",
    subheadline:
      "Family business since the mid-1980s. ASE-certified mechanics. Rated 92% 'Superior' by Checkbook. Honest repairs at prices that won't break the bank.",
    ctaPrimary: { text: "Call for Appointment", href: "tel:+14155852800" },
    ctaSecondary: { text: "See Our Services", href: "/services" },
    backgroundImage: "/sites/best-auto-care/hero.jpg",
    trustBadges: ["Since 1985", "92% Superior Rating", "18% Below Average Pricing", "ASE Certified"],
  },

  services: [
    { name: "Oil Change & Lube", description: "Quick, affordable oil changes using quality conventional or synthetic oils. Includes multi-point inspection." },
    { name: "Brake Service", description: "Complete brake system service — pads, rotors, calipers, brake fluid, and ABS diagnostics." },
    { name: "Engine Repair", description: "From tune-ups to complete engine rebuilds. Our ASE-certified technicians handle all engine work." },
    { name: "Transmission", description: "Automatic and manual transmission service, fluid changes, and complete rebuilds." },
    { name: "Electrical & Diagnostics", description: "Check engine light diagnostics, battery testing, alternator and starter repair, wiring issues." },
    { name: "Smog Check", description: "California smog inspections and repairs. We'll get your vehicle compliant and back on the road." },
  ],

  about: {
    headline: "A Family Legacy of Honest Auto Care",
    paragraphs: [
      "Best Auto Care has been serving San Francisco drivers since the mid-1980s. What started as a small family shop on Alemany Blvd has grown into one of the city's most trusted auto repair businesses.",
      "Reopened in 2016, the shop continues its tradition of honest, high-quality work at fair prices. Consumer Checkbook rates us 92% 'Superior' with prices 18% below the San Francisco average.",
      "Our ASE-certified mechanics work on all makes and models. We believe every San Francisco driver deserves reliable auto care they can afford.",
    ],
    stats: [
      { value: "40+", label: "Years Legacy" },
      { value: "92%", label: "Superior Rating" },
      { value: "18%", label: "Below Avg. Price" },
      { value: "105", label: "Yelp Reviews" },
    ],
  },

  reviews: {
    averageRating: 4.6,
    totalReviews: 105,
    staticReviews: [
      { text: "Finally, an honest mechanic in SF. They told me what I actually needed and didn't try to sell me extras. Price was way lower than the dealer quoted.", name: "Chris M.", rating: 5, source: "Yelp" },
      { text: "Been coming here for years. Consistent quality, fair prices, and they always explain what they're doing and why. The way auto repair should be.", name: "Maria L.", rating: 5, source: "Google" },
      { text: "Got my smog check done here — fast, affordable, no games. They also caught a small issue and fixed it at a very reasonable price.", name: "Dave R.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "How are your prices compared to other SF shops?", answer: "Consumer Checkbook rates our prices 18% below the San Francisco average for comparable quality work." },
    { question: "Do you do smog checks?", answer: "Yes! We perform California smog inspections and can handle any necessary repairs to get your vehicle compliant." },
    { question: "How long have you been in business?", answer: "Our family has been in the auto repair business since the mid-1980s. We reopened at our current location in 2016." },
    { question: "Do you work on all car brands?", answer: "Yes, our ASE-certified mechanics service all makes and models — domestic and import." },
    { question: "Do I need an appointment?", answer: "We recommend calling ahead for major repairs. Oil changes and quick services can often be accommodated same-day." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/best-auto-care-san-francisco",
  },

  seo: {
    title: "Best Auto Care | Affordable Auto Repair in San Francisco Since 1985",
    description: "ASE-certified auto repair in SF. 92% Superior rated. Prices 18% below average. Family-owned since 1985. 105+ Yelp reviews.",
    keywords: ["auto repair san francisco", "cheap mechanic sf", "best auto care sf", "smog check san francisco", "affordable car repair sf"],
    schemaType: "AutoRepair",
  },
};

export default config;
