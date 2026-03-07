import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
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
      title: "Galería | Dental City Costa Rica",
      description:
        "Vea resultados reales de antes y después de tratamientos dentales en Dental City Costa Rica.",
    };
  }

  return {
    title: "Gallery | Dental City Costa Rica",
    description:
      "See real before-and-after results from dental treatments at Dental City Costa Rica.",
  };
}

const beforeAfterData = {
  en: [
    {
      before: "/images/ortho-before.jpg",
      after: "/images/ortho-after.jpg",
      beforeAlt: "Teeth before orthodontic treatment",
      afterAlt: "Teeth after orthodontic treatment",
      label: "Orthodontics",
      beforePosition: "center 60%",
      afterPosition: "center 60%",
    },
    {
      before: "/images/fillings-before.jpg",
      after: "/images/fillings-after.jpg",
      beforeAlt: "Teeth before composite fillings",
      afterAlt: "Teeth after composite fillings",
      label: "Composite Fillings",
      beforePosition: "center 45%",
      afterPosition: "center 45%",
    },
    {
      before: "/images/restorations-before.jpg",
      after: "/images/restorations-after.jpg",
      beforeAlt: "Teeth with cavities before restoration",
      afterAlt: "Teeth after dental restoration",
      label: "Dental Restorations",
      beforePosition: "center 45%",
      afterPosition: "center 40%",
    },
    {
      before: "/images/veneers-before.jpg",
      after: "/images/veneers-after.jpg",
      beforeAlt: "Smile before dental veneers",
      afterAlt: "Bright uniform smile after dental veneers",
      label: "Dental Veneers",
      beforePosition: "center 50%",
      afterPosition: "center 35%",
    },
    {
      before: "/images/implants-before.jpg",
      after: "/images/implants-after.jpg",
      beforeAlt: "Implant post placed in gum before crown",
      afterAlt: "Completed dental implant with crown",
      label: "Dental Implants",
      beforePosition: "center 40%",
      afterPosition: "center 40%",
    },
    {
      before: "/images/allon4-before.jpg",
      after: "/images/allon4-after.jpg",
      beforeAlt: "Patient with missing teeth before full rehabilitation",
      afterAlt: "Full smile restored after oral rehabilitation",
      label: "Full Oral Rehabilitation",
      beforePosition: "center 50%",
      afterPosition: "center 55%",
    },
  ],
  es: [
    {
      before: "/images/ortho-before.jpg",
      after: "/images/ortho-after.jpg",
      beforeAlt: "Dientes antes de tratamiento de ortodoncia",
      afterAlt: "Dientes después de tratamiento de ortodoncia",
      label: "Ortodoncia",
      beforePosition: "center 60%",
      afterPosition: "center 60%",
    },
    {
      before: "/images/fillings-before.jpg",
      after: "/images/fillings-after.jpg",
      beforeAlt: "Dientes antes de restauraciones de resina",
      afterAlt: "Dientes después de restauraciones de resina",
      label: "Restauraciones de Resina",
      beforePosition: "center 45%",
      afterPosition: "center 45%",
    },
    {
      before: "/images/restorations-before.jpg",
      after: "/images/restorations-after.jpg",
      beforeAlt: "Dientes con caries antes de la restauración",
      afterAlt: "Dientes después de la restauración dental",
      label: "Restauraciones Dentales",
      beforePosition: "center 45%",
      afterPosition: "center 40%",
    },
    {
      before: "/images/veneers-before.jpg",
      after: "/images/veneers-after.jpg",
      beforeAlt: "Sonrisa antes de carillas dentales",
      afterAlt: "Sonrisa brillante y uniforme después de carillas dentales",
      label: "Carillas Dentales",
      beforePosition: "center 50%",
      afterPosition: "center 35%",
    },
    {
      before: "/images/implants-before.jpg",
      after: "/images/implants-after.jpg",
      beforeAlt: "Poste de implante colocado en encía antes de corona",
      afterAlt: "Implante dental completado con corona",
      label: "Implantes Dentales",
      beforePosition: "center 40%",
      afterPosition: "center 40%",
    },
    {
      before: "/images/allon4-before.jpg",
      after: "/images/allon4-after.jpg",
      beforeAlt: "Paciente con dientes faltantes antes de rehabilitación completa",
      afterAlt: "Sonrisa completa restaurada después de rehabilitación oral",
      label: "Rehabilitación Oral Completa",
      beforePosition: "center 50%",
      afterPosition: "center 55%",
    },
  ],
};

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const beforeAfterCases = beforeAfterData[locale];
  const prefix = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-40 md:pb-24 text-white text-center">
        <Image
          src="/images/hero-dental-tech.jpg"
          alt="Futuristic dental technology abstract design"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Link
            href={prefix}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-primary-light transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {dict.common.backToHome}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{dict.gallery.pageTitle}</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {dict.gallery.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">
            {dict.gallery.beforeAfter}
          </h2>
          <p className="text-text-light mb-8">
            {dict.gallery.beforeAfterDesc}
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {beforeAfterCases.map((c) => (
              <BeforeAfterSlider
                key={c.label}
                before={c.before}
                after={c.after}
                beforeAlt={c.beforeAlt}
                afterAlt={c.afterAlt}
                label={c.label}
                beforeLabel={dict.common.before}
                afterLabel={dict.common.after}
                beforePosition={c.beforePosition}
                afterPosition={c.afterPosition}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {dict.gallery.ctaTitle}
          </h2>
          <p className="text-white/80 mb-8">
            {dict.gallery.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              {dict.common.bookViaWhatsApp}
            </a>
            <a
              href="tel:+50624740415"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {dict.hero.callUs}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
