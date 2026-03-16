import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "la-parrilla-loca",
  businessName: "La Parrilla Loca",
  tagline: "Charcoal-Grilled Tijuana Street Food in Oakland",
  industry: "restaurant",

  phone: "(510) 555-0200",
  address: {
    street: "9829 San Leandro St",
    city: "Oakland",
    state: "CA",
    zip: "94603",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154!2d-122.18!3d37.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=La+Parrilla+Loca+Oakland",
  },
  hours: [
    { day: "Wednesday - Monday", hours: "11:00 AM - 9:00 PM" },
    { day: "Tuesday", hours: "Closed" },
  ],

  theme: themes["la-parrilla-loca"],

  layout: {
    heroVariant: "fullscreen",
    headerVariant: "transparent",
    servicesLayout: "grid-2",
    ctaVariant: "image-bg",
    footerVariant: "compact",
  },

  hero: {
    headline: "Fire-Grilled Flavor You Can Taste",
    subheadline:
      "Latina-owned. Charcoal-grilled meats. Hand-carved trompo al pastor. Featured in Oakland's 'best tacos' lists. Come taste why the line is always long.",
    ctaPrimary: { text: "Call to Order", href: "tel:+15105550200" },
    ctaSecondary: { text: "The Menu", href: "/services" },
    backgroundImage: "/sites/la-parrilla-loca/hero.jpg",
    trustBadges: ["112+ Reviews", "Charcoal Grilled", "Latina Owned", "Best of Oakland"],
  },

  services: [
    { name: "Tacos al Carbon", description: "Our signature charcoal-grilled tacos. Carne asada, pollo, chorizo, and more — all kissed by real flame for smoky, authentic flavor." },
    { name: "Al Pastor", description: "Hand-carved from the trompo, our al pastor is marinated in guajillo chiles, pineapple, and spices. A Tijuana street food masterpiece." },
    { name: "Quesadillas & Mulitas", description: "Crispy, cheesy, and loaded with your choice of meat. Served with salsa and guacamole." },
    { name: "Burritos", description: "Massive burritos packed with grilled meat, rice, beans, and all the fixings. One is a full meal." },
    { name: "Weekend Specials", description: "Birria, barbacoa, and seasonal specialties on weekends. Follow our Instagram for what's cooking." },
    { name: "Catering", description: "Bring La Parrilla Loca to your party. Taco bars, platters, and full catering for events of any size." },
  ],

  about: {
    headline: "Charcoal, Tradition, and Heart",
    paragraphs: [
      "La Parrilla Loca is a Latina-owned taco stand that has become an Oakland legend. Everything is cooked over real charcoal, the way it's done in the streets of Tijuana. No shortcuts, no gas grills — just fire and flavor.",
      "Our al pastor is hand-carved from a traditional trompo, marinated for hours in a blend of guajillo chiles, achiote, and fresh pineapple. It's the dish that put us on the map.",
      "Featured in multiple 'best tacos in Oakland' lists, La Parrilla Loca has built a following through word of mouth, Instagram, and the undeniable smell of charcoal smoke that draws people in from blocks away.",
    ],
    stats: [
      { value: "112+", label: "5-Star Reviews" },
      { value: "Real", label: "Charcoal Fire" },
      { value: "Hand", label: "Carved Trompo" },
      { value: "Best of", label: "Oakland Lists" },
    ],
  },

  reviews: {
    averageRating: 4.7,
    totalReviews: 112,
    staticReviews: [
      { text: "The al pastor here is the best I've had outside of Mexico. You can see them carving it off the trompo right in front of you. Incredible.", name: "Luis G.", rating: 5, source: "Yelp" },
      { text: "The charcoal flavor makes ALL the difference. These aren't just tacos — this is an experience. The carne asada is perfection.", name: "Sandra V.", rating: 5, source: "Google" },
      { text: "Found this spot through a best-of Oakland list and it lives up to the hype. Everything is fresh, smoky, and packed with flavor.", name: "Brian C.", rating: 5, source: "Yelp" },
    ],
  },

  faq: [
    { question: "Is everything really cooked over charcoal?", answer: "Yes! All our meats are grilled over real charcoal. It's what gives our tacos their signature smoky flavor." },
    { question: "What is al pastor?", answer: "Al pastor is pork marinated in guajillo chiles, achiote, pineapple, and spices, then cooked on a vertical spit (trompo) and hand-carved to order. It's a Tijuana tradition." },
    { question: "Do you accept credit cards?", answer: "We accept cash, Venmo, and Zelle. We're working on adding card payment soon." },
    { question: "Do you cater events?", answer: "Yes! We offer taco bars and full catering for parties, corporate events, and celebrations. Call us for details." },
    { question: "What days are you open?", answer: "We're open Wednesday through Monday, 11 AM to 9 PM. We're closed on Tuesdays." },
  ],

  socialLinks: {
    instagram: "https://www.instagram.com/la_parrilla_loca_",
    yelp: "https://www.yelp.com/biz/la-parrilla-loca-oakland",
  },

  seo: {
    title: "La Parrilla Loca | Charcoal-Grilled Tacos in Oakland",
    description: "Latina-owned charcoal-grilled taco stand. Hand-carved al pastor, carne asada, and more. 112+ reviews. Featured in Oakland's best taco lists.",
    keywords: ["tacos oakland", "al pastor oakland", "charcoal grilled tacos", "la parrilla loca", "best tacos oakland"],
    schemaType: "Restaurant",
  },
};

export default config;
