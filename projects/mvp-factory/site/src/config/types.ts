export type Industry = "auto-repair" | "auto-body" | "restaurant" | "bakery" | "barber" | "plumbing";

export type SchemaType = "AutoRepair" | "AutoBodyShop" | "Restaurant" | "Bakery" | "BarberShop" | "Plumber";

export type HeroVariant = "split" | "fullscreen" | "diagonal" | "minimal" | "centered";
export type HeaderVariant = "transparent" | "solid" | "topbar";
export type ServicesLayout = "grid-3" | "grid-2" | "alternating" | "carousel";
export type CTAVariant = "gradient" | "image-bg" | "split" | "simple";
export type FooterVariant = "full" | "compact" | "centered";
export type BorderRadius = "sharp" | "rounded" | "pill";
export type SiteStyle = "modern" | "classic" | "bold" | "warm" | "industrial";

export interface ThemeConfig {
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    background: string;
    surface: string;
    surfaceAlt: string;
    headerBg: string;
    footerBg: string;
    text: string;
    textLight: string;
    textOnPrimary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: BorderRadius;
  style: SiteStyle;
}

export interface ServiceItem {
  name: string;
  description: string;
  icon?: string;
}

export interface ReviewItem {
  text: string;
  name: string;
  rating: number;
  source?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  category: string;
}

export interface SiteConfig {
  slug: string;
  businessName: string;
  tagline: string;
  industry: Industry;

  phone: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    googleMapsEmbedUrl: string;
    googleMapsUrl: string;
  };
  hours: { day: string; hours: string }[];

  theme: ThemeConfig;

  layout: {
    heroVariant: HeroVariant;
    headerVariant: HeaderVariant;
    servicesLayout: ServicesLayout;
    ctaVariant: CTAVariant;
    footerVariant: FooterVariant;
  };

  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: { text: string; href: string };
    ctaSecondary?: { text: string; href: string };
    backgroundImage?: string;
    trustBadges: string[];
  };

  services: ServiceItem[];

  about: {
    headline: string;
    paragraphs: string[];
    image?: string;
    stats: { value: string; label: string }[];
  };

  reviews: {
    staticReviews: ReviewItem[];
    averageRating: number;
    totalReviews: number;
  };

  faq: FAQItem[];

  socialLinks: {
    facebook?: string;
    instagram?: string;
    yelp?: string;
    google?: string;
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
    schemaType: SchemaType;
  };

  industryFeatures?: {
    menu?: MenuItem[];
    bookingUrl?: string;
  };
}
