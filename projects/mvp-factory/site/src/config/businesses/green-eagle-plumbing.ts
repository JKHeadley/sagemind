import { themes } from "@/config/themes";
import type { SiteConfig } from "@/config/types";

const config: SiteConfig = {
  slug: "green-eagle-plumbing",
  businessName: "Green Eagle Plumbing",
  tagline: "Berkeley & Kensington's Most Trusted Plumber",
  industry: "plumbing",

  phone: "(510) 526-4444",
  address: {
    street: "Kensington / Berkeley Area",
    city: "Berkeley",
    state: "CA",
    zip: "94707",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149!2d-122.28!3d37.90!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0!5e0!3m2!1sen!2sus!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Green+Eagle+Plumbing+Berkeley",
  },
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "By Appointment" },
    { day: "Sunday", hours: "Emergency Only" },
  ],

  theme: themes["green-eagle-plumbing"],

  layout: {
    heroVariant: "split",
    headerVariant: "topbar",
    servicesLayout: "grid-3",
    ctaVariant: "gradient",
    footerVariant: "full",
  },

  hero: {
    headline: "Honest Plumbing From a Plumber You Can Trust",
    subheadline:
      "Owner Anam has earned praise across Berkeley Parents Network, Nextdoor, and Yelp for honesty, responsiveness, and quality workmanship. 60+ five-star reviews. No job too big or small.",
    ctaPrimary: { text: "Call Now", href: "tel:+15105264444" },
    ctaSecondary: { text: "Our Services", href: "/services" },
    backgroundImage: "/sites/green-eagle-plumbing/hero.jpg",
    trustBadges: ["60+ Reviews", "Licensed & Insured", "Emergency Service", "Restaurant Specialist"],
  },

  services: [
    { name: "Emergency Plumbing", description: "Burst pipes, major leaks, sewer backups — we respond fast when you need us most. Available evenings and weekends for emergencies." },
    { name: "Water Heater Service", description: "Traditional and tankless water heater installation, repair, and maintenance. We'll help you choose the right system for your home." },
    { name: "Drain Cleaning", description: "Clogged drains, slow drains, and sewer line cleaning using professional equipment. We clear the toughest blockages." },
    { name: "Bathroom & Kitchen Remodel", description: "Complete plumbing for bathroom and kitchen renovations. Fixture installation, pipe rerouting, and code-compliant work." },
    { name: "Restaurant Plumbing", description: "Specialized commercial plumbing for restaurants and food service. Grease traps, commercial water heaters, and health code compliance." },
    { name: "Earthquake Preparedness", description: "Seismic shut-off valves, flexible gas connectors, and water heater strapping to protect your home in an earthquake." },
  ],

  about: {
    headline: "Meet Anam — Your Neighborhood Plumber",
    paragraphs: [
      "Green Eagle Plumbing is owned and operated by Anam, a licensed plumber who has built a reputation across Berkeley and Kensington for honesty, fair pricing, and exceptional workmanship.",
      "Recommended across Berkeley Parents Network, Nextdoor, and Yelp, Anam is known for responding quickly, explaining issues clearly, and never recommending work you don't need. His specialty in restaurant plumbing has made him the go-to plumber for local food businesses.",
      "From emergency repairs to earthquake preparedness, Green Eagle Plumbing handles everything with the same attention to detail and commitment to doing it right.",
    ],
    stats: [
      { value: "60+", label: "5-Star Reviews" },
      { value: "Licensed", label: "& Insured" },
      { value: "Fast", label: "Response Time" },
      { value: "Restaurants", label: "Specialist" },
    ],
  },

  reviews: {
    averageRating: 4.9,
    totalReviews: 60,
    staticReviews: [
      { text: "Anam is the most honest plumber we've ever worked with. He actually pointed out things we DIDN'T need to fix, saving us hundreds. Unheard of in this industry.", name: "Sarah K.", rating: 5, source: "Berkeley Parents Network" },
      { text: "Called at 9 PM with a burst pipe. Anam was there in 30 minutes. Fixed the problem quickly and the price was incredibly fair. Our plumber for life.", name: "David L.", rating: 5, source: "Yelp" },
      { text: "Hired him for our restaurant's commercial plumbing. He knows the health code requirements inside and out. Professional, reliable, and fair.", name: "Chef Michael B.", rating: 5, source: "Google" },
    ],
  },

  faq: [
    { question: "Do you handle emergency plumbing?", answer: "Yes! We offer emergency plumbing service for urgent issues like burst pipes, major leaks, and sewer backups. Call us anytime — we'll get there as fast as possible." },
    { question: "Are you licensed and insured?", answer: "Yes, Green Eagle Plumbing is fully licensed, bonded, and insured in the state of California." },
    { question: "What areas do you serve?", answer: "We serve Berkeley, Kensington, El Cerrito, Albany, and surrounding East Bay communities." },
    { question: "Do you work on commercial properties?", answer: "Yes, we specialize in restaurant and commercial plumbing, including grease trap installation and maintenance, commercial water heaters, and health code compliance." },
    { question: "Can you help earthquake-proof my plumbing?", answer: "Absolutely. We install seismic shut-off valves, flexible gas connectors, and water heater strapping to protect your home in an earthquake." },
    { question: "Do you give free estimates?", answer: "Yes, we provide free estimates for all non-emergency work. We'll explain the issue, the solution, and the cost before any work begins." },
  ],

  socialLinks: {
    yelp: "https://www.yelp.com/biz/green-eagle-plumbing-berkeley",
  },

  seo: {
    title: "Green Eagle Plumbing | Trusted Plumber in Berkeley & Kensington, CA",
    description: "Licensed plumber in Berkeley. 60+ 5-star reviews. Emergency service, tankless water heaters, restaurant plumbing, earthquake prep. Owner Anam.",
    keywords: ["plumber berkeley", "emergency plumber kensington", "plumbing repair berkeley ca", "restaurant plumber east bay", "green eagle plumbing"],
    schemaType: "Plumber",
  },
};

export default config;
