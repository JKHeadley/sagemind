import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "panaderia-sevilla",
  businessName: "Panaderia Sevilla",
  tagline: "Where Mexico, Guatemala & El Salvador Meet in Every Bite",
  industry: "bakery",

  phone: "(510) 569-0100",
  address: {
    street: "11000 San Leandro St",
    city: "Oakland",
    state: "CA",
    zip: "94603",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154!2d-122.18!3d37.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Panaderia+Sevilla+Oakland",
  },
  hours: [
    { day: "Monday - Saturday", hours: "6:00 AM - 8:00 PM" },
    { day: "Sunday", hours: "6:00 AM - 6:00 PM" },
  ],

  theme: themes["panaderia-sevilla"],

  layout: {
    heroVariant: "diagonal",
    headerVariant: "solid",
    servicesLayout: "grid-3",
    ctaVariant: "gradient",
    footerVariant: "full",
  },

  hero: {
    headline: "Three Cultures, One Bakery",
    subheadline:
      "A unique bakery blending bread traditions from Mexico, Guatemala, and El Salvador. Two Oakland locations since 2014. Custom cakes for every celebration.",
    ctaPrimary: { text: "Order a Cake", href: "/contact" },
    ctaSecondary: { text: "Our Bakery", href: "/services" },
    backgroundImage: "/sites/panaderia-sevilla/hero.jpg",
    trustBadges: ["Since 2014", "2 Locations", "3 Cultures", "Custom Cakes"],
  },

  services: [
    { name: "Mexican Pan Dulce", description: "Traditional conchas, cuernos, orejas, polvorones, and more — classic Mexican sweet bread baked fresh every morning." },
    { name: "Guatemalan Bread", description: "Pan de manteca, champurradas, shecas, and other Guatemalan favorites you won't find at most Bay Area bakeries." },
    { name: "Salvadoran Pastries", description: "Semitas, quesadillas dulces, marquesote, and traditional Salvadoran baked goods made with authentic recipes." },
    { name: "Custom Cakes", description: "Stunning custom cakes for quinceañeras, birthdays, weddings, and every occasion. Multiple flavors and designs available." },
    { name: "Savory Breads", description: "Fresh bolillos, teleras, and Central American bread rolls — perfect for sandwiches and family meals." },
    { name: "Event Platters", description: "Assorted pastry platters for parties, church events, and gatherings. Mix breads from all three traditions." },
  ],

  about: {
    headline: "A Bakery That Celebrates Three Cultures",
    paragraphs: [
      "Panaderia Sevilla opened in 2014 with a unique vision: combine the baking traditions of Mexico, Guatemala, and El Salvador under one roof. In Oakland's diverse community, this multi-cultural approach resonated immediately.",
      "Today, with two Oakland locations, we serve customers who come for Mexican conchas, Guatemalan champurradas, and Salvadoran semitas — often in the same tray. It's a celebration of Central American and Mexican baking heritage.",
      "Our custom cakes have become a neighborhood institution for quinceañeras, birthdays, and celebrations. Every cake is made to order, designed to make your special day even sweeter.",
    ],
    stats: [
      { value: "2", label: "Oakland Locations" },
      { value: "3", label: "Cultural Traditions" },
      { value: "2014", label: "Established" },
      { value: "29+", label: "5-Star Reviews" },
    ],
  },

  reviews: {
    averageRating: 4.5,
    totalReviews: 29,
    staticReviews: [
      { text: "The only bakery where I can get Guatemalan champurradas AND Mexican conchas. This place understands our community. Everything is fresh and delicious.", name: "Ana C.", rating: 5, source: "Yelp" },
      { text: "Ordered a three-tier cake for my daughter's quinceañera and it was absolutely stunning. The taste matched the beauty. Highly recommend.", name: "Carmen R.", rating: 5, source: "Google" },
      { text: "Love the variety here. Mexican, Guatemalan, Salvadoran breads all under one roof. Fresh, affordable, and the staff is always friendly.", name: "Pedro M.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "What makes Panaderia Sevilla unique?", answer: "We're one of the few bakeries that combines Mexican, Guatemalan, and Salvadoran bread traditions. Our customers can find favorites from all three cultures in one place." },
    { question: "Where are your two locations?", answer: "Our main location is at 11000 San Leandro St, Oakland. Our second location is at 1414 Fruitvale Ave, Oakland." },
    { question: "Do you make custom cakes?", answer: "Yes! We specialize in custom cakes for quinceañeras, birthdays, weddings, and all celebrations. Please order 5-7 days in advance for custom designs." },
    { question: "What Guatemalan breads do you offer?", answer: "We bake pan de manteca, champurradas, shecas, cubiletes, and other traditional Guatemalan breads. Ask about our full selection when you visit." },
    { question: "Is everything baked in-house?", answer: "Yes, everything is baked fresh in our kitchen daily using authentic recipes from Mexico, Guatemala, and El Salvador." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/panaderia-sevilla-oakland",
    facebook: "https://www.facebook.com/panaderiasevilla",
  },

  seo: {
    title: "Panaderia Sevilla | Mexican, Guatemalan & Salvadoran Bakery — Oakland",
    description: "Multi-cultural bakery blending Mexican, Guatemalan & Salvadoran bread traditions. Custom cakes, fresh pan dulce. 2 Oakland locations since 2014.",
    keywords: ["panaderia oakland", "guatemalan bakery oakland", "salvadoran bakery", "mexican bakery oakland", "custom cakes oakland"],
    schemaType: "Bakery",
  },
};

export default config;
