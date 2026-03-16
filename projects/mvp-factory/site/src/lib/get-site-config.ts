import type { SiteConfig } from "@/config/types";

const configs: Record<string, () => Promise<{ default: SiteConfig }>> = {
  // Auto / Body Shops
  "kc-auto": () => import("@/config/businesses/kc-auto"),
  "1701-auto-care": () => import("@/config/businesses/1701-auto-care"),
  "fruitvale-collision": () => import("@/config/businesses/fruitvale-collision"),
  "glenview-automotive": () => import("@/config/businesses/glenview-automotive"),
  "best-auto-care": () => import("@/config/businesses/best-auto-care"),
  "community-auto": () => import("@/config/businesses/community-auto"),
  // Restaurants
  "aguachiles-el-tamarindo": () => import("@/config/businesses/aguachiles-el-tamarindo"),
  "taqueria-el-chacho": () => import("@/config/businesses/taqueria-el-chacho"),
  "la-parrilla-loca": () => import("@/config/businesses/la-parrilla-loca"),
  "pipirin": () => import("@/config/businesses/pipirin"),
  // Bakeries
  "penas-bakery": () => import("@/config/businesses/penas-bakery"),
  "panaderia-la-favorita": () => import("@/config/businesses/panaderia-la-favorita"),
  "panaderia-sevilla": () => import("@/config/businesses/panaderia-sevilla"),
  // Barber
  "supreme-blends": () => import("@/config/businesses/supreme-blends"),
  // Plumbing
  "green-eagle-plumbing": () => import("@/config/businesses/green-eagle-plumbing"),
};

export async function getSiteConfig(slug: string): Promise<SiteConfig | null> {
  const loader = configs[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function getAllSiteSlugs(): string[] {
  return Object.keys(configs);
}
