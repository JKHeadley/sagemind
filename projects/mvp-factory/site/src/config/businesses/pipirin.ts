import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "pipirin",
  businessName: "Pipirin",
  tagline: "29 Years of Guadalajara Flavors in Oakland's Fruitvale",
  industry: "restaurant",

  phone: "(510) 555-0300",
  address: {
    street: "34th Ave & Farnam St",
    city: "Oakland",
    state: "CA",
    zip: "94601",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153!2d-122.21!3d37.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Pipirin+Oakland+Fruitvale",
  },
  hours: [
    { day: "Thursday - Tuesday", hours: "8:00 AM - 4:00 PM" },
    { day: "Wednesday", hours: "Closed" },
  ],

  theme: themes["pipirin"],

  layout: {
    heroVariant: "centered",
    headerVariant: "solid",
    servicesLayout: "grid-2",
    ctaVariant: "simple",
    footerVariant: "centered",
  },

  hero: {
    headline: "A Fruitvale Institution Since 1997",
    subheadline:
      "Jorge Ayllon brought the flavors of Guadalajara to Oakland 29 years ago. Featured in KQED's '5 Fruitvale Food Trucks That Put Regional Mexican Plates on the Map.' Come taste a legend.",
    ctaPrimary: { text: "Find Us", href: "/contact" },
    ctaSecondary: { text: "Our Story", href: "/about" },
    backgroundImage: "/sites/pipirin/hero.jpg",
    trustBadges: ["29 Years", "KQED Featured", "Guadalajara Flavors", "Fruitvale Landmark"],
  },

  services: [
    { name: "Barbacoa", description: "Our signature slow-cooked barbacoa, prepared the traditional Guadalajara way. Rich, tender, and deeply flavorful." },
    { name: "Birria", description: "Slow-braised birria in a complex chili broth. Served with fresh tortillas, onion, cilantro, and lime." },
    { name: "Tacos", description: "Authentic street tacos with handmade tortillas. Carne asada, al pastor, carnitas, and our legendary barbacoa." },
    { name: "Tortas", description: "Loaded Mexican sandwiches on fresh bolillo rolls. Stacked with meat, avocado, beans, cheese, and pickled jalapeños." },
    { name: "Pozole", description: "Hearty traditional pozole with hominy, pork, and a rich chile broth. A weekend specialty." },
    { name: "Aguas Frescas", description: "House-made horchata, jamaica, tamarindo, and seasonal fruit waters to complement your meal." },
  ],

  about: {
    headline: "The Story of Pipirin",
    paragraphs: [
      "In 1997, Jorge Ayllon set up a food truck at 34th Avenue and Farnam Street in Oakland's Fruitvale neighborhood. He brought with him the recipes and flavors of his hometown: Guadalajara, Mexico.",
      "29 years later, Pipirin is a Fruitvale landmark. KQED named it one of '5 Fruitvale Food Trucks That Put Regional Mexican Plates on the Map.' The barbacoa and birria are legendary, drawing customers from across the Bay Area.",
      "Jorge's mission has always been simple: serve the food he grew up eating, made with the same care and tradition, to a community that has become his second home.",
    ],
    stats: [
      { value: "29", label: "Years in Oakland" },
      { value: "KQED", label: "Featured" },
      { value: "40+", label: "5-Star Reviews" },
      { value: "1997", label: "Since" },
    ],
  },

  reviews: {
    averageRating: 4.6,
    totalReviews: 40,
    staticReviews: [
      { text: "The barbacoa here is unlike anything else in the Bay. Rich, tender, and the broth is incredible. This is the real deal from Guadalajara.", name: "Fernando S.", rating: 5, source: "Yelp" },
      { text: "A Fruitvale institution. I've been coming for 15 years and the quality has never dropped. The birria on weekends is a must.", name: "Elena R.", rating: 5, source: "Google" },
      { text: "After KQED featured them, I had to try it. Worth the trip from SF. Simple, authentic, and absolutely delicious.", name: "Daniel W.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "Where exactly are you located?", answer: "We're at the corner of 34th Avenue and Farnam Street in Oakland's Fruitvale neighborhood. Look for the food truck — you can't miss us." },
    { question: "What is barbacoa?", answer: "Barbacoa is a traditional Mexican slow-cooked beef dish, originally from Guadalajara. The meat is seasoned, wrapped, and slow-cooked for hours until it's incredibly tender and flavorful." },
    { question: "Do you only serve from a food truck?", answer: "Yes, we are a food truck operation. We've been at our location on 34th and Farnam for 29 years." },
    { question: "What days are you open?", answer: "We're open Thursday through Tuesday, 8 AM to 4 PM. We're closed on Wednesdays." },
    { question: "Do you accept credit cards?", answer: "Please call ahead to confirm current payment methods. We want to make sure your visit goes smoothly." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/pipirin-oakland",
  },

  seo: {
    title: "Pipirin | Guadalajara-Style Barbacoa in Oakland's Fruitvale",
    description: "29-year Oakland institution. KQED featured. Authentic Guadalajara barbacoa, birria, and street tacos. Fruitvale food truck landmark.",
    keywords: ["barbacoa oakland", "pipirin oakland", "fruitvale food truck", "birria oakland", "mexican food fruitvale"],
    schemaType: "Restaurant",
  },
};

export default config;
