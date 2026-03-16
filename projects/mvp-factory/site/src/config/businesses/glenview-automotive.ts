import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "glenview-automotive",
  businessName: "Glenview Automotive",
  tagline: "30+ Years of Trusted Auto Repair in Oakland",
  industry: "auto-repair",

  phone: "(510) 530-1413",
  address: {
    street: "1499 MacArthur Blvd",
    city: "Oakland",
    state: "CA",
    zip: "94602",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-122.21!3d37.80!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Glenview+Automotive+Oakland",
  },
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday - Sunday", hours: "Closed" },
  ],

  theme: themes["glenview-automotive"],

  layout: {
    heroVariant: "diagonal",
    headerVariant: "solid",
    servicesLayout: "grid-3",
    ctaVariant: "gradient",
    footerVariant: "compact",
  },

  hero: {
    headline: "Your Car Deserves a Mechanic Who Cares",
    subheadline:
      "Simon Ho brings 30+ years of master-level experience to every repair. Perfect 5-star rating on CARFAX. Oakland's best-kept secret in auto repair.",
    ctaPrimary: { text: "Call Simon", href: "tel:+15105301413" },
    ctaSecondary: { text: "Services", href: "/services" },
    backgroundImage: "/sites/glenview-automotive/hero.jpg",
    trustBadges: ["5.0 ★ CARFAX", "30+ Years", "81 Reviews", "All Makes"],
  },

  services: [
    { name: "Complete Diagnostics", description: "Advanced computer diagnostics for check engine lights, performance issues, and electrical problems. We find the real problem." },
    { name: "Brake Service", description: "Brake pad replacement, rotor resurfacing, caliper repair, brake line service, and ABS troubleshooting." },
    { name: "Engine Service", description: "From timing belts to head gaskets, Simon has seen and fixed it all in 30+ years. Expert engine work at fair prices." },
    { name: "Scheduled Maintenance", description: "Oil changes, fluid flushes, filter replacements, and manufacturer-recommended service to keep your car reliable." },
    { name: "Cooling & Heating", description: "Radiator repair, water pump replacement, thermostat service, and A/C diagnostics and recharge." },
    { name: "Exhaust & Emissions", description: "Catalytic converter, muffler, exhaust pipe repair and replacement. Smog check preparation." },
  ],

  about: {
    headline: "Master Mechanic Simon Ho — 30+ Years of Excellence",
    paragraphs: [
      "Glenview Automotive is the personal workshop of Simon Ho, a master mechanic with over 30 years of experience. Located on MacArthur Blvd in Oakland's Glenview neighborhood, the shop has earned a perfect 5-star rating on CARFAX.",
      "Simon believes in old-school values: honest diagnostics, fair pricing, and doing the job right the first time. He takes the time to explain what's wrong with your car in plain English and never recommends work you don't need.",
      "His loyal customers drive from all over the East Bay because they know they can trust Simon with their vehicles. Many have been coming for over a decade.",
    ],
    stats: [
      { value: "5.0", label: "CARFAX Rating" },
      { value: "30+", label: "Years Experience" },
      { value: "81", label: "5-Star Reviews" },
      { value: "1", label: "Master Mechanic" },
    ],
  },

  reviews: {
    averageRating: 5.0,
    totalReviews: 81,
    staticReviews: [
      { text: "Simon is the most honest mechanic I've ever met. He actually talked me out of a repair I didn't need and saved me $800. That's integrity.", name: "Linda W.", rating: 5, source: "CARFAX" },
      { text: "Been going to Simon for 12 years. He's never steered me wrong. Fair prices, great work, and he treats you like family.", name: "Tom H.", rating: 5, source: "Yelp" },
      { text: "Found Simon after being ripped off by a chain shop. He diagnosed the real problem in 20 minutes and fixed it for half the quote. Highly recommend.", name: "Karen P.", rating: 5, source: "Google" },
    ],
  },

  faq: [
    { question: "What types of vehicles do you service?", answer: "We service all makes and models — domestic and foreign, cars, trucks, and SUVs." },
    { question: "How long has Simon been a mechanic?", answer: "Simon Ho has over 30 years of hands-on experience as a master mechanic, specializing in diagnostics and engine work." },
    { question: "Do I need an appointment?", answer: "Yes, we recommend calling ahead as Simon works with each vehicle personally and gives it his full attention." },
    { question: "Why is your CARFAX rating 5.0?", answer: "Every customer who has rated us on CARFAX has given us 5 stars. We believe this reflects our commitment to honest, quality work." },
    { question: "Are your prices competitive?", answer: "Absolutely. Our overhead is low because we're a small, owner-operated shop. That means lower prices with the same quality as bigger shops." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/glenview-automotive-oakland",
  },

  seo: {
    title: "Glenview Automotive | Master Mechanic Simon Ho — Oakland, CA",
    description: "30+ years experience. Perfect 5.0 CARFAX rating. Honest auto repair in Oakland's Glenview neighborhood. All makes and models.",
    keywords: ["mechanic oakland", "auto repair glenview oakland", "simon ho mechanic", "honest mechanic oakland", "car repair macarthur blvd"],
    schemaType: "AutoRepair",
  },
};

export default config;
