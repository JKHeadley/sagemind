import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AuthProvider from "@/components/AuthProvider";
import { getLocalBusinessSchema } from "@/lib/structured-data";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://dentalcitycr.com";

  const shared = {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    robots: { index: true, follow: true },
    twitter: {
      card: "summary_large_image" as const,
      images: [`${baseUrl}/images/hero-francisco.jpg`],
    },
  };

  if (locale === "es") {
    return {
      ...shared,
      title: "Dental City Costa Rica | Turismo Dental Accesible | Implantes y Ortodoncia",
      description:
        "Ahorre 50–70% en implantes dentales, ortodoncia y diseño de sonrisa en Costa Rica. Más de 20 años de experiencia, equipo bilingüe, 59 reseñas 5 estrellas.",
      keywords: [
        "turismo dental Costa Rica",
        "implantes dentales Costa Rica",
        "dentista para americanos Costa Rica",
        "vacaciones dentales Costa Rica",
        "clínica dental Aguas Zarcas",
        "ortodoncia Costa Rica precios",
        "Dental City",
        "dentista Aguas Zarcas zona norte",
        "carillas dentales Costa Rica",
        "All-on-4 Costa Rica",
      ],
      openGraph: {
        title: "Dental City Costa Rica | Turismo Dental Accesible",
        description:
          "Ahorre 50–70% en tratamientos dentales de alta calidad en Costa Rica. Implantes, ortodoncia, diseño de sonrisa y más.",
        locale: "es_CR",
        type: "website",
        images: [{ url: `${baseUrl}/images/hero-francisco.jpg`, width: 1200, height: 630, alt: "Dental City Costa Rica" }],
      },
    };
  }

  return {
    ...shared,
    title: "Dental City Costa Rica | Affordable Dental Tourism | Implants & Orthodontics",
    description:
      "Save 50–70% on dental implants, orthodontics, and smile makeovers in Costa Rica. 20+ years experience, English-speaking team, 59 five-star reviews.",
    keywords: [
      "dental tourism Costa Rica",
      "affordable dental implants Costa Rica",
      "dental vacation Costa Rica",
      "dentist for Americans in Costa Rica",
      "dental clinic Aguas Zarcas",
      "orthodontics Costa Rica prices",
      "Dental City",
      "dentist Aguas Zarcas northern zone",
      "veneers Costa Rica",
      "All-on-4 Costa Rica",
    ],
    openGraph: {
      title: "Dental City Costa Rica | Affordable Dental Tourism",
      description:
        "Save 50–70% on world-class dental care in Costa Rica. Implants, orthodontics, smile makeovers, and more.",
      locale: "en_US",
      type: "website",
      images: [{ url: `${baseUrl}/images/hero-francisco.jpg`, width: 1200, height: 630, alt: "Dental City Costa Rica" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  const structuredData = getLocalBusinessSchema(locale);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "${locale}";`,
        }}
      />
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AuthProvider>
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppButton />
      </AuthProvider>
    </>
  );
}
