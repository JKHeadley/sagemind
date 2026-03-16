import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "taqueria-el-chacho",
  businessName: "Taqueria El Chacho",
  tagline: "Tijuana-Style Street Tacos, Now Across the Bay Area",
  industry: "restaurant",

  phone: "(408) 555-0100",
  address: {
    street: "Multiple Bay Area Locations",
    city: "San Jose",
    state: "CA",
    zip: "95112",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172!2d-121.89!3d37.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Taqueria+El+Chacho",
  },
  hours: [
    { day: "Monday - Thursday", hours: "10:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", hours: "10:00 AM - 12:00 AM" },
    { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
  ],

  theme: themes["taqueria-el-chacho"],

  layout: {
    heroVariant: "fullscreen",
    headerVariant: "solid",
    servicesLayout: "grid-3",
    ctaVariant: "gradient",
    footerVariant: "full",
  },

  hero: {
    headline: "Real Tijuana Tacos. Five Bay Area Locations.",
    subheadline:
      "From Arizona to the Bay Area — El Chacho brings authentic Tijuana-style street tacos to San Jose, San Leandro, San Mateo, Berkeley, and Alameda. Fresh tortillas. Real flavor. No shortcuts.",
    ctaPrimary: { text: "Find a Location", href: "/contact" },
    ctaSecondary: { text: "Our Menu", href: "/services" },
    backgroundImage: "/sites/taqueria-el-chacho/hero.jpg",
    trustBadges: ["5+ Locations", "Tijuana Style", "Fresh Tortillas", "Growing Fast"],
  },

  services: [
    { name: "Street Tacos", description: "Authentic Tijuana-style tacos on fresh corn tortillas. Carne asada, al pastor, pollo, birria, tripa, lengua, and more." },
    { name: "Burritos", description: "Massive, loaded burritos with your choice of meat, rice, beans, cheese, guacamole, and fresh salsa." },
    { name: "Quesadillas", description: "Crispy quesadillas stuffed with melted cheese and your choice of protein. Simple, perfect, satisfying." },
    { name: "Birria", description: "Slow-braised birria tacos and birria ramen. Rich, flavorful consommé for dipping. Our most viral item." },
    { name: "Mulitas", description: "Two tortillas grilled with cheese and meat in between — the Tijuana street food classic." },
    { name: "Aguas Frescas", description: "House-made horchata, jamaica, tamarindo, and seasonal fruit waters. The perfect complement to your meal." },
  ],

  about: {
    headline: "From Tijuana to the Bay, One Taco at a Time",
    paragraphs: [
      "Taqueria El Chacho started in Arizona with one mission: bring real Tijuana-style street tacos to people who know the difference. The Bay Area expansion has been rapid — 5+ locations and counting.",
      "Every location serves the same commitment to authenticity: fresh tortillas made in-house, quality meats seasoned the traditional way, and salsas prepared daily. No shortcuts, no substitutes.",
      "Whether you're in San Jose, San Leandro, San Mateo, Berkeley, or Alameda — El Chacho delivers the same Tijuana flavor that has earned us a loyal following on TikTok and in person.",
    ],
    stats: [
      { value: "5+", label: "Bay Area Locations" },
      { value: "Fresh", label: "Tortillas Daily" },
      { value: "TJ", label: "Authentic Style" },
      { value: "Growing", label: "Fast" },
    ],
  },

  reviews: {
    averageRating: 4.5,
    totalReviews: 150,
    staticReviews: [
      { text: "These are the closest thing to actual Tijuana street tacos I've found in the Bay. The carne asada is perfectly seasoned and the tortillas are fresh. I'm hooked.", name: "Miguel A.", rating: 5, source: "Google" },
      { text: "Found them on TikTok and had to try it. Did NOT disappoint. The birria tacos are insane and the consommé is rich and flavorful.", name: "Stephanie R.", rating: 5, source: "Yelp" },
      { text: "Love that they're opening more locations. The San Mateo spot is clutch. Authentic tacos, friendly staff, and the mulitas are a must-order.", name: "Kevin T.", rating: 5, source: "Google" },
    ],
  },

  faq: [
    { question: "Where are your locations?", answer: "We currently have locations in San Jose, San Leandro, San Mateo, Berkeley, and Alameda — with more coming soon." },
    { question: "What makes your tacos 'Tijuana-style'?", answer: "Tijuana-style means small corn tortillas, high-quality meats seasoned with traditional spices, and simple toppings — onion, cilantro, and salsa. No fillers, just flavor." },
    { question: "Do you make your tortillas fresh?", answer: "Yes! Our tortillas are made in-house daily at each location. Fresh tortillas make all the difference." },
    { question: "Do you have vegetarian options?", answer: "Yes, we offer cheese quesadillas, bean burritos, and vegetable tacos at all locations." },
    { question: "Can I order for catering or large groups?", answer: "Absolutely! Contact your nearest location for catering orders and party trays." },
  ],

  socialLinks: {
    instagram: "https://www.instagram.com/taqueriaelchacho",
    yelp: "https://www.yelp.com/biz/taqueria-el-chacho",
  },

  seo: {
    title: "Taqueria El Chacho | Tijuana-Style Street Tacos — Bay Area",
    description: "Authentic Tijuana street tacos across 5+ Bay Area locations. Fresh tortillas, real flavor. San Jose, San Leandro, San Mateo, Berkeley, Alameda.",
    keywords: ["tijuana tacos bay area", "taqueria el chacho", "street tacos san jose", "birria tacos bay area", "mexican food san mateo"],
    schemaType: "Restaurant",
  },
};

export default config;
