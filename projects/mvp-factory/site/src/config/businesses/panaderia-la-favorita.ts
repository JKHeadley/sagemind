import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "panaderia-la-favorita",
  businessName: "Panaderia La Favorita",
  tagline: "Fruitvale's Favorite Mexican Bakery",
  industry: "bakery",

  phone: "(510) 536-3288",
  address: {
    street: "1433 Fruitvale Ave",
    city: "Oakland",
    state: "CA",
    zip: "94601",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-122.22!3d37.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Panaderia+La+Favorita+Oakland",
  },
  hours: [
    { day: "Monday - Saturday", hours: "6:00 AM - 8:00 PM" },
    { day: "Sunday", hours: "6:00 AM - 6:00 PM" },
  ],

  theme: themes["panaderia-la-favorita"],

  layout: {
    heroVariant: "centered",
    headerVariant: "solid",
    servicesLayout: "grid-3",
    ctaVariant: "simple",
    footerVariant: "centered",
  },

  hero: {
    headline: "The Taste of Home, Baked Fresh Daily",
    subheadline:
      "Authentic pan dulce, custom cakes, and traditional pastries on Fruitvale's busiest avenue. Walk in to the aroma of fresh-baked conchas, cuernos, and empanadas every morning.",
    ctaPrimary: { text: "Order a Cake", href: "/contact" },
    ctaSecondary: { text: "Our Bakery", href: "/services" },
    backgroundImage: "/sites/panaderia-la-favorita/hero.jpg",
    trustBadges: ["47+ Reviews", "Fresh Daily", "Custom Cakes", "Fruitvale Ave"],
  },

  services: [
    { name: "Pan Dulce", description: "Conchas, cuernos, orejas, polvorones, campechanas, and dozens more varieties of traditional Mexican sweet bread — baked fresh daily." },
    { name: "Custom Cakes", description: "Beautiful custom cakes for birthdays, quinceañeras, weddings, and celebrations. Designed to your specifications." },
    { name: "Tres Leches", description: "Our beloved tres leches cake — moist, creamy, and available by the slice or as a full cake for your event." },
    { name: "Empanadas", description: "Sweet and savory empanadas with fillings like pineapple, pumpkin, cream cheese, and more. Fresh from the oven." },
    { name: "Bolillos & Teleras", description: "Crusty bolillos and soft teleras baked daily — perfect for your tortas and family meals." },
    { name: "Special Orders", description: "Large orders for parties and events. Custom pastry platters, cake orders, and bread trays available with advance notice." },
  ],

  about: {
    headline: "A Fruitvale Tradition",
    paragraphs: [
      "Panaderia La Favorita sits on Fruitvale Avenue — one of Oakland's busiest and most vibrant commercial corridors. Every morning, the bakery fills the street with the irresistible aroma of fresh-baked pan dulce.",
      "We bake dozens of traditional Mexican pastries daily using time-honored recipes. From fluffy conchas to flaky empanadas, every item is made from scratch with quality ingredients.",
      "Our custom cakes are a neighborhood favorite for quinceañeras, birthdays, and celebrations of all kinds. Stop by, pick your favorites, and taste why we're Fruitvale's favorite bakery.",
    ],
    stats: [
      { value: "47+", label: "5-Star Reviews" },
      { value: "Fresh", label: "Baked Daily" },
      { value: "6AM", label: "We Open" },
      { value: "Custom", label: "Cakes Available" },
    ],
  },

  reviews: {
    averageRating: 4.5,
    totalReviews: 47,
    staticReviews: [
      { text: "The conchas here are the best in Oakland. Soft, fresh, and perfectly sweet. I stop by every Saturday morning — it's become a ritual.", name: "Alejandra P.", rating: 5, source: "Yelp" },
      { text: "Ordered a tres leches cake for my daughter's birthday and it was absolutely perfect. Beautiful decoration and the taste was incredible.", name: "Veronica H.", rating: 5, source: "Google" },
      { text: "Walking into this bakery is like being transported to Mexico. The smell, the pastries, the warmth. A Fruitvale gem.", name: "Marcos D.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "What time do you start baking?", answer: "Our bakers start early in the morning so that everything is fresh when we open at 6 AM. The best selection is in the morning!" },
    { question: "Can I order a custom cake?", answer: "Yes! We do custom cakes for all occasions. Please call at least 3-5 days in advance, or a week for more elaborate designs." },
    { question: "Do you do large orders for events?", answer: "Absolutely. We can prepare pastry platters, bread trays, and custom cake orders for parties and events. Call us to discuss your needs." },
    { question: "What are your most popular items?", answer: "Our conchas, tres leches cake, cuernos, and empanadas are customer favorites. But honestly, everything is delicious!" },
    { question: "Is everything baked fresh daily?", answer: "Yes, every item in our bakery is baked fresh daily. We don't sell day-old bread — when it's gone, it's gone." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/panaderia-la-favorita-oakland",
  },

  seo: {
    title: "Panaderia La Favorita | Mexican Bakery on Fruitvale Ave, Oakland",
    description: "Fresh pan dulce, custom cakes, and traditional pastries baked daily. On Fruitvale Ave in Oakland. 47+ reviews. Open 6 AM.",
    keywords: ["panaderia oakland", "mexican bakery fruitvale", "pan dulce oakland", "custom cakes oakland", "bakery fruitvale ave"],
    schemaType: "Bakery",
  },
};

export default config;
