import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "penas-bakery",
  businessName: "Pena's Bakery",
  tagline: "Authentic Mexican Bakery Since 1997",
  industry: "bakery",

  phone: "(510) 535-6700",
  address: {
    street: "3355 Foothill Blvd",
    city: "Oakland",
    state: "CA",
    zip: "94601",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-122.22!3d37.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Penas+Bakery+Oakland",
  },
  hours: [
    { day: "Monday - Saturday", hours: "6:00 AM - 8:00 PM" },
    { day: "Sunday", hours: "6:00 AM - 6:00 PM" },
  ],

  theme: themes["penas-bakery"],

  layout: {
    heroVariant: "minimal",
    headerVariant: "solid",
    servicesLayout: "grid-3",
    ctaVariant: "simple",
    footerVariant: "centered",
  },

  hero: {
    headline: "Baked Fresh Every Morning",
    subheadline:
      "Two generations of authentic Mexican baking. Over 100 varieties of pan dulce, custom cakes, and traditional pastries made from scratch daily at our two Oakland locations.",
    ctaPrimary: { text: "Order a Custom Cake", href: "/contact" },
    ctaSecondary: { text: "Our Pastries", href: "/services" },
    backgroundImage: "/sites/penas-bakery/hero.jpg",
    trustBadges: ["Since 1997", "2 Locations", "100+ Varieties", "Custom Cakes"],
  },

  services: [
    { name: "Pan Dulce", description: "Over 100 varieties of traditional Mexican sweet bread baked fresh daily. Conchas, cuernos, orejas, polvorones, and more." },
    { name: "Custom Cakes", description: "Beautiful custom cakes for birthdays, quinceañeras, weddings, and every special occasion. Designed to your vision." },
    { name: "Tres Leches", description: "Our famous tres leches cake, soaked in three milks and topped with whipped cream. Available by the slice or whole cake." },
    { name: "Savory Breads", description: "Fresh bolillos, teleras, and other savory breads perfect for tortas and your family meals." },
    { name: "Pastries & Cookies", description: "Traditional Mexican cookies, empanadas, and pastries. Perfect for sharing or gifting." },
    { name: "Catering & Events", description: "Large orders for parties, corporate events, and celebrations. Custom assortments and platters available." },
  ],

  about: {
    headline: "A Family Tradition Since 1997",
    paragraphs: [
      "Pena's Bakery has been serving Oakland's Fruitvale and East Oakland communities with authentic Mexican baked goods for over 25 years. What started as a small family bakery has grown into two beloved locations.",
      "Every morning before dawn, our bakers begin crafting over 100 varieties of pan dulce, pastries, and breads using recipes passed down through generations. We use traditional techniques and quality ingredients because we believe you can taste the difference.",
      "Whether you're picking up conchas for breakfast or ordering a custom cake for your quinceañera, Pena's Bakery is your neighborhood panaderia.",
    ],
    stats: [
      { value: "25+", label: "Years Baking" },
      { value: "100+", label: "Daily Varieties" },
      { value: "2", label: "Oakland Locations" },
      { value: "4AM", label: "Baking Starts" },
    ],
  },

  reviews: {
    averageRating: 4.5,
    totalReviews: 80,
    staticReviews: [
      { text: "The best pan dulce in Oakland, hands down. Their conchas are perfectly fluffy and the tres leches cake is to die for.", name: "Maria G.", rating: 5, source: "Yelp" },
      { text: "Ordered a custom cake for my daughter's quinceañera and it was absolutely stunning. Tasted even better than it looked!", name: "Rosa M.", rating: 5, source: "Google" },
      { text: "I've been coming here since they opened. Everything is fresh, the prices are fair, and the staff is always so friendly.", name: "Carlos V.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "How far in advance should I order a custom cake?", answer: "We recommend ordering at least 3-5 days in advance for custom cakes. For elaborate designs or large orders, please give us at least a week." },
    { question: "Do you have a second location?", answer: "Yes! Our second location is at 3912 International Blvd, Oakland, CA 94601. Both locations carry our full selection of baked goods." },
    { question: "What are your most popular items?", answer: "Our conchas, tres leches cake, and cuernos are customer favorites. We also recommend our empanadas and polvorones." },
    { question: "Do you offer catering for events?", answer: "Yes! We offer catering platters and large orders for parties, corporate events, and celebrations. Call us to discuss your needs." },
    { question: "Are your products made fresh daily?", answer: "Absolutely. Our bakers start at 4 AM every day to ensure everything is fresh when we open. We bake over 100 varieties daily." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/penas-bakery-oakland",
    facebook: "https://www.facebook.com/penasbakery",
  },

  seo: {
    title: "Pena's Bakery | Authentic Mexican Bakery in Oakland Since 1997",
    description: "Fresh pan dulce, custom cakes, and traditional Mexican pastries baked daily. 100+ varieties. Two Oakland locations. Family-owned since 1997.",
    keywords: ["mexican bakery oakland", "pan dulce oakland", "custom cakes oakland", "panaderia oakland", "penas bakery"],
    schemaType: "Bakery",
  },
};

export default config;
