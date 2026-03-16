import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "kc-auto",
  businessName: "K & C Auto Service",
  tagline: "San Francisco's Trusted European Auto Specialists",
  industry: "auto-repair",

  phone: "(415) 777-5522",
  address: {
    street: "400 5th St",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5!2d-122.4!3d37.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=K+%26+C+Auto+Service+San+Francisco",
  },
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 5:30 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  theme: themes["kc-auto"],

  layout: {
    heroVariant: "split",
    headerVariant: "solid",
    servicesLayout: "grid-3",
    ctaVariant: "gradient",
    footerVariant: "full",
  },

  hero: {
    headline: "Expert European Auto Care in the Heart of SoMa",
    subheadline:
      "Specialized service for BMW, Mercedes, Audi, VW, Mini Cooper & Subaru. 300+ five-star reviews from San Francisco drivers who trust us with their vehicles.",
    ctaPrimary: { text: "Call Now", href: "tel:+14157775522" },
    ctaSecondary: { text: "Our Services", href: "/services" },
    backgroundImage: "/sites/kc-auto/hero.jpg",
    trustBadges: ["300+ Reviews", "European Specialists", "Since 1998", "ASE Certified"],
  },

  services: [
    { name: "European Auto Repair", description: "Expert diagnostics and repair for BMW, Mercedes-Benz, Audi, Volkswagen, Mini Cooper, and Subaru vehicles." },
    { name: "Brake Service", description: "Complete brake inspection, pad replacement, rotor resurfacing, and brake fluid flush for all European makes." },
    { name: "Engine Diagnostics", description: "Advanced computer diagnostics to identify and resolve check engine lights, performance issues, and electrical problems." },
    { name: "Oil Change & Maintenance", description: "Factory-recommended oil changes and scheduled maintenance to keep your vehicle running at peak performance." },
    { name: "Transmission Service", description: "Transmission fluid changes, diagnostics, and repair for both automatic and manual transmissions." },
    { name: "Cooling System", description: "Radiator repair, coolant flush, thermostat replacement, and water pump service to prevent overheating." },
  ],

  about: {
    headline: "Your Neighborhood European Auto Experts",
    paragraphs: [
      "K & C Auto Service has been a trusted fixture in San Francisco's SoMa neighborhood since 1998. We specialize exclusively in European vehicles, giving our mechanics deep expertise in the brands you drive.",
      "With over 300 five-star reviews on Yelp, our reputation speaks for itself. We believe in honest diagnostics, transparent pricing, and getting it right the first time.",
      "Whether it's a routine oil change or a complex engine rebuild, our ASE-certified technicians treat every car like their own.",
    ],
    stats: [
      { value: "300+", label: "5-Star Reviews" },
      { value: "25+", label: "Years in Business" },
      { value: "6", label: "European Brands" },
      { value: "ASE", label: "Certified Techs" },
    ],
  },

  reviews: {
    averageRating: 4.8,
    totalReviews: 300,
    staticReviews: [
      { text: "Best mechanic in SF, hands down. Honest, fair pricing, and they really know European cars. I've been bringing my BMW here for years.", name: "Michael R.", rating: 5, source: "Yelp" },
      { text: "Found them after my dealership quoted me $3,000 for a repair. K&C did it for $900 and it's been perfect ever since. Can't recommend enough.", name: "Sarah L.", rating: 5, source: "Yelp" },
      { text: "They diagnosed an issue three other shops missed on my Audi. Fair prices, great communication, and the car runs like new.", name: "David K.", rating: 5, source: "Google" },
    ],
  },

  faq: [
    { question: "What European car brands do you service?", answer: "We specialize in BMW, Mercedes-Benz, Audi, Volkswagen, Mini Cooper, and Subaru. Our technicians have specific training and experience with these brands." },
    { question: "Do I need an appointment?", answer: "While walk-ins are welcome, we recommend calling ahead to ensure we can accommodate you promptly. This also allows us to prepare for your specific vehicle's needs." },
    { question: "Are your mechanics ASE certified?", answer: "Yes, all of our technicians are ASE certified and have extensive experience specifically with European vehicles." },
    { question: "Do you offer a warranty on repairs?", answer: "Yes, we stand behind our work with a 12-month / 12,000-mile warranty on parts and labor for most repairs." },
    { question: "How are your prices compared to the dealership?", answer: "On average, our customers save 30-50% compared to dealership pricing, with the same quality parts and expert service." },
    { question: "Do you provide shuttle service or loaner cars?", answer: "We can help arrange transportation while your vehicle is being serviced. Please ask when you schedule your appointment." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/k-and-c-auto-service-san-francisco",
  },

  seo: {
    title: "K & C Auto Service | European Auto Repair in San Francisco",
    description: "Expert BMW, Mercedes, Audi, VW repair in SoMa, SF. 300+ 5-star reviews. ASE certified mechanics. Fair prices, honest service since 1998.",
    keywords: ["european auto repair sf", "bmw mechanic san francisco", "mercedes repair soma", "audi service sf", "k and c auto"],
    schemaType: "AutoRepair",
  },
};

export default config;
