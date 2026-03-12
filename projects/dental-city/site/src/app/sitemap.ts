import type { MetadataRoute } from "next";

const baseUrl = "https://dentalcitycr.com";

const pages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/team", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/facilities", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/testimonials", priority: 0.8, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${page.path}`,
          es: `${baseUrl}/es${page.path}`,
        },
      },
    }))
  );
}
