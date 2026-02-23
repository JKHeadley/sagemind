// ============================================================
// Salon Configuration — Innovations Salon & Spa
// 19581 Center St, Castro Valley, CA 94546
//
// Edit this file to update services, stylists, hours, etc.
// This is the single source of truth for all salon details.
// ============================================================

import { SalonConfig, Service, Stylist } from "./types";

export const salon: SalonConfig = {
  name: "Innovations Salon & Spa",
  tagline: "Hair Salon and Boutique — Castro Valley since 2001",
  phone: "(510) 886-7330",
  email: "hello@innovationssalonscv.com", // TODO: confirm with client
  address: "19581 Center St",
  city: "Castro Valley",
  state: "CA",
  zip: "94546",
  timezone: process.env.TIMEZONE || "America/Los_Angeles",
  businessHours: {
    // TODO: confirm hours with client — conflicting info online
    sunday: null, // closed
    monday: null, // closed
    tuesday: { open: 9, close: 18 },
    wednesday: { open: 9, close: 18 },
    thursday: { open: 9, close: 18 },
    friday: { open: 9, close: 18 },
    saturday: { open: 10, close: 16 },
  },
  daysAhead: 14,
  colors: {
    primary: "#b08968",
    primaryDark: "#8c6d4f",
    accent: "#d4a574",
    background: "#faf8f5",
    surface: "#ffffff",
    text: "#2d2926",
    textMuted: "#8c8279",
  },
};

export const services: Service[] = [
  // Women's Hair
  {
    id: "womens-cut-blowdry",
    name: "Haircut with Blow Dry",
    description: "Consultation, shampoo, precision cut, and blow dry styling",
    category: "Women's Hair",
    durationMinutes: 60,
    price: 70,
    active: true,
  },
  {
    id: "womens-cut",
    name: "Haircut Only",
    description: "Consultation and precision cut",
    category: "Women's Hair",
    durationMinutes: 45,
    price: 65,
    active: true,
  },
  {
    id: "blowdry-style",
    name: "Blow Dry / Style",
    description: "Shampoo and professional blow dry styling",
    category: "Women's Hair",
    durationMinutes: 45,
    price: 45,
    active: true,
  },
  {
    id: "upstyles",
    name: "Upstyles",
    description: "Formal updos for weddings, proms, and special events",
    category: "Women's Hair",
    durationMinutes: 60,
    price: 85,
    active: true,
  },

  // Color
  {
    id: "color-retouch",
    name: "Color Retouch",
    description: "Roots only color application",
    category: "Color",
    durationMinutes: 60,
    price: 80,
    active: true,
  },
  {
    id: "semi-color",
    name: "Semi Color",
    description: "Semi-permanent full color application",
    category: "Color",
    durationMinutes: 75,
    price: 95,
    active: true,
  },
  {
    id: "full-weave",
    name: "Full Weave (Highlights)",
    description: "Full head foil highlights",
    category: "Color",
    durationMinutes: 120,
    price: 130,
    active: true,
  },
  {
    id: "partial-weave",
    name: "Partial Weave",
    description: "Partial foil highlights",
    category: "Color",
    durationMinutes: 90,
    price: 115,
    active: true,
  },
  {
    id: "balayage",
    name: "Balayage / Ombre",
    description: "Hand-painted highlights for a natural sun-kissed look",
    category: "Color",
    durationMinutes: 150,
    price: 150,
    active: true,
  },
  {
    id: "color-correction",
    name: "Color Correction",
    description: "Custom color correction — price determined by consultation",
    category: "Color",
    durationMinutes: 180,
    price: 0, // by quote
    active: true,
  },

  // Treatments
  {
    id: "conditioning",
    name: "Conditioning Treatment",
    description: "Deep moisture and repair treatment",
    category: "Treatments",
    durationMinutes: 30,
    price: 25,
    active: true,
  },
  {
    id: "permanent-wave",
    name: "Permanent Wave",
    description: "Classic perm for lasting curls and body",
    category: "Treatments",
    durationMinutes: 120,
    price: 100,
    active: true,
  },
  {
    id: "brazilian-blowout",
    name: "Brazilian Blowout",
    description: "Smoothing treatment for frizz-free, shiny hair",
    category: "Treatments",
    durationMinutes: 120,
    price: 199,
    active: true,
  },
  {
    id: "cezanne",
    name: "Cezanne Treatment",
    description: "Keratin smoothing treatment for long-lasting results",
    category: "Treatments",
    durationMinutes: 150,
    price: 250,
    active: true,
  },

  // Men's & Kids
  {
    id: "mens-cut",
    name: "Men's Haircut",
    description: "Consultation, cut, and style",
    category: "Men's & Kids",
    durationMinutes: 30,
    price: 40,
    active: true,
  },
  {
    id: "kids-cut",
    name: "Kids' Haircut",
    description: "Haircut for children under 10",
    category: "Men's & Kids",
    durationMinutes: 30,
    price: 35,
    active: true,
  },

  // Threading
  {
    id: "threading-full-face",
    name: "Full Face Threading",
    description: "Complete facial threading",
    category: "Threading",
    durationMinutes: 30,
    price: 35,
    active: true,
  },
  {
    id: "threading-eyebrow",
    name: "Eyebrow Threading",
    description: "Precision eyebrow shaping",
    category: "Threading",
    durationMinutes: 15,
    price: 13,
    active: true,
  },
  {
    id: "threading-upper-lip",
    name: "Upper Lip Threading",
    description: "Upper lip hair removal",
    category: "Threading",
    durationMinutes: 10,
    price: 6,
    active: true,
  },
  {
    id: "threading-chin",
    name: "Chin Threading",
    description: "Chin hair removal",
    category: "Threading",
    durationMinutes: 10,
    price: 9,
    active: true,
  },
  {
    id: "threading-forehead",
    name: "Forehead Threading",
    description: "Forehead hair removal",
    category: "Threading",
    durationMinutes: 10,
    price: 9,
    active: true,
  },
  {
    id: "threading-sideburns",
    name: "Sideburns Threading",
    description: "Sideburn hair removal",
    category: "Threading",
    durationMinutes: 10,
    price: 10,
    active: true,
  },

  // Lashes
  {
    id: "lash-extensions",
    name: "Eyelash Extensions",
    description: "Full set of individual lash extensions",
    category: "Lashes",
    durationMinutes: 90,
    price: 100,
    active: true,
  },
  {
    id: "lash-application",
    name: "Eyelash Application",
    description: "Strip lash application",
    category: "Lashes",
    durationMinutes: 30,
    price: 40,
    active: true,
  },

  // Skin Care
  {
    id: "micro-channeling",
    name: "Micro-channeling",
    description: "Face, chest, and neck treatment — buy 3 get 4th free",
    category: "Skin Care",
    durationMinutes: 60,
    price: 275,
    active: true,
  },
];

export const stylists: Stylist[] = [
  // TODO: confirm active stylists with client, get bios and photos
  {
    id: "marsha",
    name: "Marsha",
    bio: "Senior stylist and salon founder with over 25 years of experience.",
    photoUrl: "/stylists/marsha.jpg",
    specialties: ["Cuts", "Color", "Styling"],
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    active: true,
  },
  {
    id: "ashley",
    name: "Ashley",
    bio: "Versatile stylist known for making every client leave feeling beautiful.",
    photoUrl: "/stylists/ashley.jpg",
    specialties: ["Cuts", "Color", "Styling"],
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    active: true,
  },
  {
    id: "michele",
    name: "Michele",
    bio: "Highlights and color specialist with a loyal following of clients.",
    photoUrl: "/stylists/michele.jpg",
    specialties: ["Highlights", "Color", "Cuts"],
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    active: true,
  },
  {
    id: "christina",
    name: "Christina",
    bio: "Skilled stylist with a warm, welcoming approach to every appointment.",
    photoUrl: "/stylists/christina.jpg",
    specialties: ["Cuts", "Styling", "Treatments"],
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    active: true,
  },
  {
    id: "gina-k",
    name: "Gina K",
    bio: "Experienced stylist with a dedicated clientele and an eye for detail.",
    photoUrl: "/stylists/gina.jpg",
    specialties: ["Cuts", "Color", "Styling"],
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    active: true,
  },
];

// Helper to get active services grouped by category
export function getServicesByCategory(): Record<string, Service[]> {
  const grouped: Record<string, Service[]> = {};
  for (const service of services) {
    if (!service.active) continue;
    if (!grouped[service.category]) grouped[service.category] = [];
    grouped[service.category].push(service);
  }
  return grouped;
}

// Helper to find service/stylist by ID
export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id && s.active);
}

export function getStylistById(id: string): Stylist | undefined {
  return stylists.find((s) => s.id === id && s.active);
}
