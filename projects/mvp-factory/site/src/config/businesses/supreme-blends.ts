import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "supreme-blends",
  businessName: "Supreme Blends Barber Shop",
  tagline: "Premium Cuts in Uptown Oakland",
  industry: "barber",

  phone: "(510) 238-8885",
  address: {
    street: "373 19th St",
    city: "Oakland",
    state: "CA",
    zip: "94612",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.5!2d-122.27!3d37.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Supreme+Blends+Barber+Shop+Oakland",
  },
  hours: [
    { day: "Tuesday - Saturday", hours: "9:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
    { day: "Monday", hours: "Closed" },
  ],

  theme: themes["supreme-blends"],

  layout: {
    heroVariant: "fullscreen",
    headerVariant: "transparent",
    servicesLayout: "grid-2",
    ctaVariant: "image-bg",
    footerVariant: "compact",
  },

  hero: {
    headline: "Your Style. Perfected.",
    subheadline:
      "Oakland's premier inclusive barbershop. Expert fades, precision cuts, and beard grooming in the heart of Uptown.",
    ctaPrimary: { text: "Book Your Cut", href: "tel:+15102388885" },
    ctaSecondary: { text: "See Our Work", href: "/services" },
    backgroundImage: "/sites/supreme-blends/hero.jpg",
    trustBadges: ["100+ Reviews", "Open & Inclusive", "Uptown Oakland", "Walk-ins Welcome"],
  },

  services: [
    { name: "Classic Haircut", description: "Precision cut tailored to your style. Includes consultation, hot towel, and styling." },
    { name: "Fade & Taper", description: "Skin fades, mid fades, and tapers executed with surgical precision. Clean lines guaranteed." },
    { name: "Beard Trim & Shape", description: "Professional beard grooming, shaping, and hot towel treatment. Keep your beard looking sharp." },
    { name: "Kids Haircut", description: "Patient, friendly service for your little ones. We make sure they leave looking and feeling great." },
    { name: "Hot Towel Shave", description: "The classic barbershop experience. Straight razor shave with hot towel and aftershave treatment." },
    { name: "Hair Design", description: "Custom designs, patterns, and artistic details carved into your cut. Express your individuality." },
  ],

  about: {
    headline: "More Than a Barbershop",
    paragraphs: [
      "Supreme Blends is an open and inclusive barbershop in the heart of Uptown Oakland. We believe great grooming is for everyone, regardless of hair type, gender, or background.",
      "Our barbers are masters of their craft, bringing years of experience and a passion for precision to every cut. We take the time to understand your style and deliver results that exceed expectations.",
      "Step in for a cut, stay for the experience. Supreme Blends is where community meets craft.",
    ],
    stats: [
      { value: "100+", label: "5-Star Reviews" },
      { value: "All", label: "Hair Types" },
      { value: "7", label: "Days a Week" },
      { value: "$35+", label: "Starting At" },
    ],
  },

  reviews: {
    averageRating: 4.7,
    totalReviews: 101,
    staticReviews: [
      { text: "Best barbershop in Oakland. The vibe is welcoming, the cuts are clean, and the barbers really listen to what you want.", name: "James T.", rating: 5, source: "Yelp" },
      { text: "Finally found a barber who understands my hair texture. Supreme Blends is the real deal. I'm a customer for life.", name: "Marcus W.", rating: 5, source: "Yelp" },
      { text: "Love the inclusive atmosphere. Everyone is welcome and the quality is consistently excellent. My whole family comes here.", name: "Alex P.", rating: 5, source: "Google" },
    ],
  },

  faq: [
    { question: "Do I need an appointment?", answer: "Walk-ins are always welcome! However, you can also call ahead to reserve your spot and minimize wait time." },
    { question: "What types of hair do you cut?", answer: "We cut all hair types and textures. Our barbers are experienced with straight, wavy, curly, coily, and everything in between." },
    { question: "How much does a haircut cost?", answer: "Haircuts start at $35. Pricing varies by service. Contact us for a full price list." },
    { question: "Do you do kids' haircuts?", answer: "Absolutely! We love working with kids and make sure they have a comfortable, fun experience." },
    { question: "What forms of payment do you accept?", answer: "We accept cash, all major credit cards, Apple Pay, and Google Pay." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/supreme-blends-barber-shop-oakland",
    instagram: "https://www.instagram.com/supremeblends",
  },

  seo: {
    title: "Supreme Blends Barber Shop | Premium Cuts in Uptown Oakland",
    description: "Oakland's premier inclusive barbershop. Expert fades, precision cuts, and beard grooming. 100+ 5-star reviews. Walk-ins welcome.",
    keywords: ["barber oakland", "barbershop uptown oakland", "fade haircut oakland", "best barber oakland"],
    schemaType: "BarberShop",
  },
};

export default config;
