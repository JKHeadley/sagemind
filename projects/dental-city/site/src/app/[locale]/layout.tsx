import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return {
      title: "Dental City Costa Rica | Atención Dental de Calidad en Aguas Zarcas",
      description:
        "Dental City Costa Rica — Deja que tu sonrisa cambie el mundo. Implantes dentales, ortodoncia, estética dental y más a precios accesibles en Aguas Zarcas y Sarapiquí.",
      keywords: [
        "clínica dental Costa Rica",
        "implantes dentales Costa Rica",
        "dentista Aguas Zarcas",
        "atención dental accesible",
        "Dental City",
        "ortodoncia Costa Rica",
        "turismo dental Costa Rica",
        "dentista Sarapiquí",
      ],
      openGraph: {
        title: "Dental City Costa Rica",
        description:
          "Deja que tu sonrisa cambie el mundo. Atención dental de alta calidad y precios accesibles en Aguas Zarcas y Sarapiquí, Costa Rica.",
        locale: "es_CR",
        type: "website",
      },
    };
  }

  return {
    title: "Dental City Costa Rica | Quality Dental Care in Aguas Zarcas",
    description:
      "Dental City Costa Rica — Let your smile change the world. Affordable, high-quality dental implants, orthodontics, cosmetic dentistry, and more in Aguas Zarcas and Sarapiqui.",
    keywords: [
      "dental clinic Costa Rica",
      "dental implants Costa Rica",
      "dentist Aguas Zarcas",
      "affordable dental care",
      "Dental City",
      "orthodontics Costa Rica",
      "dental tourism Costa Rica",
      "dentist Sarapiqui",
    ],
    openGraph: {
      title: "Dental City Costa Rica",
      description:
        "Let your smile change the world. Affordable, high-quality dental care in Aguas Zarcas and Sarapiqui, Costa Rica.",
      locale: "en_US",
      type: "website",
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

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "${locale}";`,
        }}
      />
      <Header locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppButton />
    </>
  );
}
