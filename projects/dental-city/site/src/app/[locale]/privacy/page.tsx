import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return {
      title: "Política de Privacidad | Dental City Costa Rica",
      description:
        "Conozca cómo Dental City Costa Rica protege su información personal y datos de salud dental.",
    };
  }

  return {
    title: "Privacy Policy | Dental City Costa Rica",
    description:
      "Learn how Dental City Costa Rica protects your personal information and dental health data.",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const prefix = `/${locale}`;
  const privacy = dict.privacy;

  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-32 pb-16 md:pt-40 md:pb-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href={prefix}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-primary-light transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {dict.common.backToHome}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{privacy.title}</h1>
          <p className="text-white/60 text-sm">{privacy.lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-10">
            {(privacy.sections as { heading: string; content: string }[]).map(
              (section, i) => (
                <div key={i}>
                  <h2 className="text-xl md:text-2xl font-bold text-navy mb-3">
                    {section.heading}
                  </h2>
                  <div className="text-text-light leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
