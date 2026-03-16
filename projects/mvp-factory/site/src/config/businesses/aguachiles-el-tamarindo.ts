import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "aguachiles-el-tamarindo",
  businessName: "Aguachiles El Tamarindo",
  tagline: "Oakland's Legendary Baja-Style Seafood",
  industry: "restaurant",

  phone: "(510) 261-0220",
  address: {
    street: "3053 International Blvd",
    city: "Oakland",
    state: "CA",
    zip: "94601",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-122.23!3d37.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Aguachiles+El+Tamarindo+Oakland",
  },
  hours: [
    { day: "Monday - Thursday", hours: "10:00 AM - 8:00 PM" },
    { day: "Friday - Saturday", hours: "10:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 7:00 PM" },
  ],

  theme: themes["aguachiles-el-tamarindo"],

  layout: {
    heroVariant: "fullscreen",
    headerVariant: "transparent",
    servicesLayout: "grid-3",
    ctaVariant: "image-bg",
    footerVariant: "full",
  },

  hero: {
    headline: "Fresh Baja Seafood, Oakland Soul",
    subheadline:
      "35+ years of authentic aguachiles, seafood towers, ceviche, and Baja fish tacos. Part of the Mi Grullense family. 436+ five-star reviews and counting.",
    ctaPrimary: { text: "Call to Order", href: "tel:+15102610220" },
    ctaSecondary: { text: "Our Menu", href: "/services" },
    backgroundImage: "/sites/aguachiles-el-tamarindo/hero.jpg",
    trustBadges: ["436+ Reviews", "35+ Years", "Mi Grullense Family", "Fresh Daily"],
  },

  services: [
    { name: "Aguachiles", description: "Our signature dish. Fresh shrimp marinated in lime and chili, served with cucumber, onion, and avocado. Available in multiple heat levels." },
    { name: "Seafood Towers", description: "Stunning towers of shrimp, octopus, ceviche, and more. A showstopper for sharing. Perfect for celebrations." },
    { name: "Ceviche", description: "Traditional Baja-style ceviche with fresh fish, lime, tomato, onion, cilantro, and serrano peppers." },
    { name: "Baja Fish Tacos", description: "Crispy beer-battered fish tacos with cabbage, crema, and salsa. A Baja California classic done right." },
    { name: "Shrimp Cocktail", description: "Our famous coctel de camarones — chilled shrimp in a tangy tomato-based broth with avocado and crackers." },
    { name: "Catering & Events", description: "Bring the taste of Baja to your next event. We cater parties, corporate events, and celebrations of all sizes." },
  ],

  about: {
    headline: "35+ Years of Baja Flavor in Oakland",
    paragraphs: [
      "Aguachiles El Tamarindo is part of the beloved Mi Grullense family of restaurants, serving Oakland's International Boulevard corridor for over 35 years. We specialize in fresh Baja-style seafood that transports you straight to the coast.",
      "Every dish starts with the freshest seafood, prepared daily using recipes perfected over three decades. Our aguachiles, seafood towers, and ceviches have made us one of the most reviewed restaurants in Oakland.",
      "With 436+ reviews and a dedicated following, Aguachiles El Tamarindo is more than a restaurant — it's an Oakland institution.",
    ],
    stats: [
      { value: "436+", label: "5-Star Reviews" },
      { value: "35+", label: "Years Serving Oakland" },
      { value: "Fresh", label: "Daily Seafood" },
      { value: "7", label: "Days a Week" },
    ],
  },

  reviews: {
    averageRating: 4.7,
    totalReviews: 436,
    staticReviews: [
      { text: "The best aguachiles in the Bay Area, no question. The seafood tower is insane — fresh, flavorful, and absolutely massive. Worth every penny.", name: "Oscar R.", rating: 5, source: "Yelp" },
      { text: "This place is an Oakland gem. The shrimp cocktail is addictive and the fish tacos are perfectly crispy. We come here every weekend.", name: "Diana M.", rating: 5, source: "Google" },
      { text: "35 years in business and they haven't lost a step. Everything is fresh, the portions are generous, and the flavors are incredible.", name: "Jorge L.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "What is aguachiles?", answer: "Aguachiles is a traditional Baja Mexican dish of raw shrimp marinated in a spicy lime-chili sauce, similar to ceviche but with a bolder, spicier flavor. It's our specialty and namesake." },
    { question: "Do you offer catering?", answer: "Yes! We cater events of all sizes — parties, corporate events, quinceañeras, and more. Call us to discuss your menu and group size." },
    { question: "Is the seafood fresh?", answer: "Absolutely. We source fresh seafood daily. Our commitment to freshness is what has kept customers coming back for over 35 years." },
    { question: "Do you have parking?", answer: "Street parking is available on International Blvd. There are also several parking lots nearby." },
    { question: "Can I order for pickup?", answer: "Yes! Call ahead and we'll have your order ready when you arrive." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/aguachiles-el-tamarindo-oakland",
    facebook: "https://www.facebook.com/aguachileseltamarindo",
    instagram: "https://www.instagram.com/aguachileseltamarindo",
  },

  seo: {
    title: "Aguachiles El Tamarindo | Baja Seafood in Oakland Since 1990",
    description: "Fresh aguachiles, seafood towers, ceviche & Baja fish tacos. 436+ reviews. Oakland's legendary Baja-style seafood restaurant. 35+ years.",
    keywords: ["aguachiles oakland", "seafood oakland", "mexican seafood oakland", "baja fish tacos oakland", "ceviche oakland"],
    schemaType: "Restaurant",
  },
};

export default config;
