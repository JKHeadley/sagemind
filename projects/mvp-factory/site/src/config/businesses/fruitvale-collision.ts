import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "fruitvale-collision",
  businessName: "Fruitvale Collision Center",
  tagline: "Oakland's Family-Owned Auto Body Experts",
  industry: "auto-body",

  phone: "(510) 536-5894",
  address: {
    street: "3009 Foothill Blvd",
    city: "Oakland",
    state: "CA",
    zip: "94601",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-122.22!3d37.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Fruitvale+Collision+Center+Oakland",
  },
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 5:30 PM" },
    { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  theme: themes["fruitvale-collision"],

  layout: {
    heroVariant: "split",
    headerVariant: "solid",
    servicesLayout: "grid-2",
    ctaVariant: "split",
    footerVariant: "full",
  },

  hero: {
    headline: "Expert Collision Repair, Family Values",
    subheadline:
      "Family-owned since 2010. We restore your vehicle to pre-accident condition with meticulous attention to detail. Insurance claims handled seamlessly.",
    ctaPrimary: { text: "Get a Free Estimate", href: "/contact" },
    ctaSecondary: { text: "Our Services", href: "/services" },
    backgroundImage: "/sites/fruitvale-collision/hero.jpg",
    trustBadges: ["166+ Reviews", "Family Owned", "Since 2010", "Insurance Approved"],
  },

  services: [
    { name: "Collision Repair", description: "Complete auto body repair for all types of collisions — from minor fender benders to major structural damage restoration." },
    { name: "Paint & Refinishing", description: "Factory-match paint technology ensures your vehicle looks brand new. We match any color with precision." },
    { name: "Dent Removal", description: "Paintless dent repair and traditional dent removal for doors, panels, hoods, and bumpers." },
    { name: "Frame Straightening", description: "State-of-the-art frame machines restore your vehicle's structural integrity to factory specifications." },
    { name: "Insurance Claims", description: "We work directly with all major insurance companies. We handle the paperwork so you don't have to." },
    { name: "Free Estimates", description: "Walk in or call for a detailed, no-obligation estimate. We'll explain every step of the repair process." },
  ],

  about: {
    headline: "Family-Owned, Community-Trusted",
    paragraphs: [
      "Fruitvale Collision Center has been serving Oakland's Fruitvale community since 2010. As a family-owned shop, we treat every customer like family and every car like our own.",
      "Our skilled technicians use the latest equipment and techniques to restore your vehicle to its pre-accident condition. We work with all major insurance companies and handle the claims process for you.",
      "With over 166 five-star reviews, our reputation is built on honest work, fair pricing, and results that speak for themselves.",
    ],
    stats: [
      { value: "166+", label: "5-Star Reviews" },
      { value: "14+", label: "Years in Business" },
      { value: "All", label: "Insurance Accepted" },
      { value: "Free", label: "Estimates" },
    ],
  },

  reviews: {
    averageRating: 4.8,
    totalReviews: 166,
    staticReviews: [
      { text: "After my accident, they made the whole process so easy. Dealt with my insurance, kept me updated, and the car looks brand new. Highly recommend!", name: "Ana R.", rating: 5, source: "Yelp" },
      { text: "Best body shop in Oakland. Fair prices, quality work, and they finished ahead of schedule. You can tell it's family-run — they actually care.", name: "Michael T.", rating: 5, source: "Yelp" },
      { text: "They matched my paint perfectly and the repair is invisible. Plus they handled all the insurance paperwork. Five stars all day.", name: "Derek L.", rating: 5, source: "Google" },
    ],
  },

  faq: [
    { question: "Do you work with my insurance company?", answer: "Yes, we work with all major insurance companies including State Farm, Allstate, GEICO, Progressive, and more. We handle the claims process for you." },
    { question: "How long will my repair take?", answer: "Repair timelines vary based on the extent of damage. Minor repairs can be done in 1-3 days, while major collision work may take 1-2 weeks. We'll give you a clear timeline upfront." },
    { question: "Do you offer free estimates?", answer: "Absolutely! Walk in or call us anytime for a free, detailed, no-obligation estimate." },
    { question: "Can you match my car's exact paint color?", answer: "Yes, we use computerized paint matching technology to achieve an exact factory-match color. The repair will be seamless." },
    { question: "Do you offer a warranty on your work?", answer: "Yes, we offer a lifetime warranty on our workmanship for as long as you own the vehicle." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/fruitvale-collision-center-oakland",
    facebook: "https://www.facebook.com/fruitvalecollision",
  },

  seo: {
    title: "Fruitvale Collision Center | Auto Body Repair in Oakland, CA",
    description: "Family-owned auto body shop in Oakland since 2010. Collision repair, paint matching, insurance claims handled. 166+ 5-star reviews. Free estimates.",
    keywords: ["auto body repair oakland", "collision repair oakland", "body shop fruitvale", "car paint oakland", "insurance auto repair oakland"],
    schemaType: "AutoBodyShop",
  },
};

export default config;
