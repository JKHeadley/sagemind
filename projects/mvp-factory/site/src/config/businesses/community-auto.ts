import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "community-auto",
  businessName: "Community Auto Center",
  tagline: "Building Community, One Car at a Time",
  industry: "auto-repair",

  phone: "(510) 535-0808",
  address: {
    street: "2701 Foothill Blvd",
    city: "Oakland",
    state: "CA",
    zip: "94601",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-122.23!3d37.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Community+Auto+Center+Oakland",
  },
  hours: [
    { day: "Monday - Friday", hours: "8:30 AM - 5:30 PM" },
    { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  theme: themes["community-auto"],

  layout: {
    heroVariant: "split",
    headerVariant: "solid",
    servicesLayout: "grid-2",
    ctaVariant: "gradient",
    footerVariant: "centered",
  },

  hero: {
    headline: "Your Neighborhood Auto Shop, Built on Trust",
    subheadline:
      "Community Auto Center is more than a repair shop — it's a place where relationships come first. Honest diagnostics, transparent pricing, and work we stand behind.",
    ctaPrimary: { text: "Call Us", href: "tel:+15105350808" },
    ctaSecondary: { text: "Our Services", href: "/services" },
    backgroundImage: "/sites/community-auto/hero.jpg",
    trustBadges: ["62+ Reviews", "Est. 2017", "Community First", "All Makes & Models"],
  },

  services: [
    { name: "General Auto Repair", description: "Comprehensive repair services for all makes and models. From minor fixes to major overhauls, we handle it all." },
    { name: "Brake Service", description: "Complete brake system inspection and repair. Pads, rotors, calipers, lines, and ABS diagnostics." },
    { name: "Engine Diagnostics", description: "Advanced computer diagnostics to pinpoint check engine lights and performance problems accurately." },
    { name: "Oil Change & Maintenance", description: "Keep your vehicle running reliably with regular oil changes, fluid checks, and scheduled maintenance." },
    { name: "Tire Service", description: "Tire rotation, balancing, flat repair, and new tire installation. We help you stay safe on the road." },
    { name: "Pre-Purchase Inspection", description: "Buying a used car? Let us inspect it first. We'll give you an honest assessment so you can buy with confidence." },
  ],

  about: {
    headline: "Building Community Through Relationships, One Car at a Time",
    paragraphs: [
      "Community Auto Center was founded in 2017 with a simple belief: auto repair should be built on relationships, not transactions. Located on Foothill Blvd in Oakland, we're a neighborhood shop that treats every customer like a neighbor.",
      "We know that car trouble is stressful. That's why we focus on clear communication, honest assessments, and fair pricing. You'll always know exactly what's going on with your vehicle and what it will cost to fix it.",
      "Our growing community of loyal customers is a testament to our approach. When you come to Community Auto Center, you're not just getting a repair — you're joining a community.",
    ],
    stats: [
      { value: "62+", label: "5-Star Reviews" },
      { value: "2017", label: "Established" },
      { value: "All", label: "Makes & Models" },
      { value: "Free", label: "Estimates" },
    ],
  },

  reviews: {
    averageRating: 4.7,
    totalReviews: 62,
    staticReviews: [
      { text: "These guys are the real deal. Honest, fair, and they take the time to explain everything. I've recommended them to all my friends and family.", name: "Tony G.", rating: 5, source: "Yelp" },
      { text: "First time here and they earned a customer for life. Diagnosed my issue quickly, gave me options, and the repair was affordable. No pressure.", name: "Lisa M.", rating: 5, source: "Google" },
      { text: "Finally found a shop I can trust in Oakland. They don't try to upsell you and the work is always solid. Community-minded business.", name: "James C.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "Do you work on all types of vehicles?", answer: "Yes, we service all makes and models — domestic, import, cars, trucks, and SUVs." },
    { question: "Do you offer free estimates?", answer: "Yes! We're happy to provide free estimates for any repair work. Just stop by or give us a call." },
    { question: "What makes Community Auto Center different?", answer: "We're built on relationships. We take the time to explain what's going on with your car, give you honest recommendations, and never push unnecessary repairs." },
    { question: "Can you do pre-purchase inspections?", answer: "Absolutely. Before you buy a used vehicle, bring it in and we'll give you an honest, thorough inspection so you know exactly what you're getting." },
    { question: "Do you have Saturday hours?", answer: "Yes, we're open Saturdays from 9 AM to 3 PM for your convenience." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/community-auto-center-oakland",
    facebook: "https://www.facebook.com/communityautocenter",
  },

  seo: {
    title: "Community Auto Center | Honest Auto Repair in Oakland, CA",
    description: "Community-focused auto repair in Oakland. Honest diagnostics, transparent pricing. All makes and models. 62+ 5-star reviews since 2017.",
    keywords: ["auto repair oakland", "mechanic foothill blvd oakland", "honest car repair oakland", "community auto center"],
    schemaType: "AutoRepair",
  },
};

export default config;
