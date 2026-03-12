import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ImageCarousel from "@/components/ImageCarousel";
import VideoPlayer from "@/components/VideoPlayer";
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

/* ─── Treatment Videos ─── */

const treatmentVideosData = {
  en: [
    { src: "/videos/cosmetic-results-reel.mp4", caption: "Cosmetic Dentistry Results" },
    { src: "/videos/orthodontics-result.mp4", caption: "Orthodontic Transformation" },
    { src: "/videos/anterior-implant.mp4", caption: "Anterior Dental Implant" },
    { src: "/videos/whitening-session.mp4", caption: "Professional Teeth Whitening" },
    { src: "/videos/botox-before-after-1.mp4", caption: "Botox — Before & After" },
    { src: "/videos/botox-before-after-2.mp4", caption: "Botox Treatment Results" },
  ],
  es: [
    { src: "/videos/cosmetic-results-reel.mp4", caption: "Resultados de Odontología Estética" },
    { src: "/videos/orthodontics-result.mp4", caption: "Transformación de Ortodoncia" },
    { src: "/videos/anterior-implant.mp4", caption: "Implante Dental Anterior" },
    { src: "/videos/whitening-session.mp4", caption: "Blanqueamiento Dental Profesional" },
    { src: "/videos/botox-before-after-1.mp4", caption: "Bótox — Antes y Después" },
    { src: "/videos/botox-before-after-2.mp4", caption: "Resultados de Tratamiento con Bótox" },
  ],
};

/* ─── Before & After Data ─── */

const beforeAfterData = {
  en: [
    {
      before: "/images/before-after/implant-prosthetics-before.jpg",
      after: "/images/before-after/implant-prosthetics-after.jpg",
      beforeAlt: "Patient with missing and damaged teeth before implant prosthetics",
      afterAlt: "Complete restored smile after implant-supported prosthetics",
      label: "Implant-Supported Prosthetics",
    },
    {
      before: "/images/before-after/orthodontics-1-before.jpg",
      after: "/images/before-after/orthodontics-1-after.jpg",
      beforeAlt: "Crowded misaligned teeth before orthodontic treatment",
      afterAlt: "Aligned straightened teeth after orthodontic treatment",
      label: "Orthodontics",
    },
    {
      before: "/images/before-after/implants-before.jpg",
      after: "/images/before-after/implants-after.jpg",
      beforeAlt: "Missing upper teeth with implant abutment visible",
      afterAlt: "Full row of teeth restored on dental implants",
      label: "Dental Implants",
    },
    {
      before: "/images/before-after/cosmetic-restorations-before.jpg",
      after: "/images/before-after/cosmetic-restorations-after.jpg",
      beforeAlt: "Old silver amalgam fillings before cosmetic restoration",
      afterAlt: "Tooth-colored composite restorations replacing amalgam",
      label: "Cosmetic Restorations",
    },
    {
      before: "/images/before-after/orthodontics-2-before.jpg",
      after: "/images/before-after/orthodontics-2-after.jpg",
      beforeAlt: "Crowded overlapping teeth with crossbite before treatment",
      afterAlt: "Well-aligned dental arch after orthodontic treatment",
      label: "Orthodontics – Case 2",
    },
    {
      before: "/images/before-after/whitening-before.jpg",
      after: "/images/before-after/whitening-after.jpg",
      beforeAlt: "Natural tooth color before professional whitening",
      afterAlt: "Brighter whiter teeth after professional whitening",
      label: "Teeth Whitening",
    },
    {
      before: "/images/before-after/smile-asymmetry-before.jpg",
      after: "/images/before-after/smile-asymmetry-after.jpg",
      beforeAlt: "Asymmetric smile before facial harmonization",
      afterAlt: "Symmetrical smile after facial harmonization treatment",
      label: "Facial Harmonization",
    },
    {
      before: "/images/before-after/wrinkle-treatment-before.jpg",
      after: "/images/before-after/wrinkle-treatment-after.jpg",
      beforeAlt: "Perioral wrinkles before treatment",
      afterAlt: "Smooth skin after wrinkle treatment",
      label: "Wrinkle Treatment",
    },
    {
      before: "/images/before-after/lip-augmentation-before.jpg",
      after: "/images/before-after/lip-augmentation-after.jpg",
      beforeAlt: "Natural thin lips before augmentation",
      afterAlt: "Fuller defined lips after augmentation",
      label: "Lip Augmentation",
    },
    {
      before: "/images/before-after/lip-augmentation-2-before.jpg",
      after: "/images/before-after/lip-augmentation-2-after.jpg",
      beforeAlt: "Lips before volume enhancement",
      afterAlt: "Noticeably fuller lips after volume enhancement",
      label: "Lip Augmentation – Case 2",
    },
    {
      before: "/images/before-after/gummy-smile-before.jpg",
      after: "/images/before-after/gummy-smile-after.jpg",
      beforeAlt: "Excessive gum display when smiling before correction",
      afterAlt: "Proportional gumline after gummy smile correction",
      label: "Gummy Smile Correction",
    },
  ],
  es: [
    {
      before: "/images/before-after/implant-prosthetics-before.jpg",
      after: "/images/before-after/implant-prosthetics-after.jpg",
      beforeAlt: "Paciente con dientes faltantes y dañados antes de prótesis sobre implantes",
      afterAlt: "Sonrisa completa restaurada con prótesis sobre implantes",
      label: "Prótesis sobre Implantes",
    },
    {
      before: "/images/before-after/orthodontics-1-before.jpg",
      after: "/images/before-after/orthodontics-1-after.jpg",
      beforeAlt: "Dientes apiñados y desalineados antes de ortodoncia",
      afterAlt: "Dientes alineados después de tratamiento de ortodoncia",
      label: "Ortodoncia",
    },
    {
      before: "/images/before-after/implants-before.jpg",
      after: "/images/before-after/implants-after.jpg",
      beforeAlt: "Dientes superiores faltantes con pilar de implante visible",
      afterAlt: "Fila completa de dientes restaurada con implantes dentales",
      label: "Implantes Dentales",
    },
    {
      before: "/images/before-after/cosmetic-restorations-before.jpg",
      after: "/images/before-after/cosmetic-restorations-after.jpg",
      beforeAlt: "Antiguas amalgamas de plata antes de restauración estética",
      afterAlt: "Restauraciones de resina del color del diente reemplazando amalgamas",
      label: "Restauraciones Estéticas",
    },
    {
      before: "/images/before-after/orthodontics-2-before.jpg",
      after: "/images/before-after/orthodontics-2-after.jpg",
      beforeAlt: "Dientes apiñados con mordida cruzada antes del tratamiento",
      afterAlt: "Arco dental bien alineado después de ortodoncia",
      label: "Ortodoncia – Caso 2",
    },
    {
      before: "/images/before-after/whitening-before.jpg",
      after: "/images/before-after/whitening-after.jpg",
      beforeAlt: "Color natural de dientes antes de blanqueamiento profesional",
      afterAlt: "Dientes más blancos y brillantes después de blanqueamiento",
      label: "Blanqueamiento Dental",
    },
    {
      before: "/images/before-after/smile-asymmetry-before.jpg",
      after: "/images/before-after/smile-asymmetry-after.jpg",
      beforeAlt: "Sonrisa asimétrica antes de armonización facial",
      afterAlt: "Sonrisa simétrica después de tratamiento de armonización facial",
      label: "Armonización Facial",
    },
    {
      before: "/images/before-after/wrinkle-treatment-before.jpg",
      after: "/images/before-after/wrinkle-treatment-after.jpg",
      beforeAlt: "Arrugas periorales antes del tratamiento",
      afterAlt: "Piel suave después del tratamiento de arrugas",
      label: "Tratamiento de Arrugas",
    },
    {
      before: "/images/before-after/lip-augmentation-before.jpg",
      after: "/images/before-after/lip-augmentation-after.jpg",
      beforeAlt: "Labios naturales delgados antes de aumento",
      afterAlt: "Labios más llenos y definidos después del aumento",
      label: "Aumento de Labios",
    },
    {
      before: "/images/before-after/lip-augmentation-2-before.jpg",
      after: "/images/before-after/lip-augmentation-2-after.jpg",
      beforeAlt: "Labios antes de aumento de volumen",
      afterAlt: "Labios notablemente más llenos después del aumento de volumen",
      label: "Aumento de Labios – Caso 2",
    },
    {
      before: "/images/before-after/gummy-smile-before.jpg",
      after: "/images/before-after/gummy-smile-after.jpg",
      beforeAlt: "Exposición excesiva de encía al sonreír antes de corrección",
      afterAlt: "Línea de encía proporcional después de corrección de sonrisa gingival",
      label: "Corrección de Sonrisa Gingival",
    },
  ],
};

/* ─── Cosmetic Showcase ─── */

const cosmeticShowcaseData = {
  en: [
    { src: "/images/cosmetic-showcase/smile-makeover-before.jpg", alt: "Worn stained teeth before smile makeover", caption: "Smile Makeover — Before" },
    { src: "/images/cosmetic-showcase/smile-makeover-after.jpg", alt: "Stunning uniform smile after full makeover", caption: "Smile Makeover — After" },
    { src: "/images/cosmetic-showcase/restoration-before.jpg", alt: "Broken stained teeth before restoration", caption: "Full Restoration — Before" },
    { src: "/images/cosmetic-showcase/restoration-after.jpg", alt: "Restored teeth after comprehensive treatment", caption: "Full Restoration — After" },
    { src: "/images/cosmetic-showcase/smile-improvement-before.jpg", alt: "Irregular teeth with spacing before treatment", caption: "Smile Improvement — Before" },
    { src: "/images/cosmetic-showcase/smile-improvement-after.jpg", alt: "Beautifully aligned uniform smile after treatment", caption: "Smile Improvement — After" },
    { src: "/images/cosmetic-showcase/veneer-1-before-smile.jpg", alt: "Smile with diastema before veneers", caption: "Veneers — Before (Smile)" },
    { src: "/images/cosmetic-showcase/veneer-2-after-smile.jpg", alt: "Improved smile after veneer placement", caption: "Veneers — After (Smile)" },
    { src: "/images/cosmetic-showcase/veneer-3-before-clinical.jpg", alt: "Clinical view showing gap between teeth", caption: "Veneers — Before (Clinical)" },
    { src: "/images/cosmetic-showcase/veneer-4-after-clinical.jpg", alt: "Clinical view after veneer placement with gap closed", caption: "Veneers — After (Clinical)" },
    { src: "/images/cosmetic-showcase/amalgam-before.jpg", alt: "Dark silver amalgam fillings", caption: "Amalgam Replacement — Before" },
    { src: "/images/cosmetic-showcase/amalgam-after.jpg", alt: "Natural tooth-colored composite restorations", caption: "Amalgam Replacement — After" },
    { src: "/images/cosmetic-showcase/posterior-before.jpg", alt: "Cavities and deteriorated fillings", caption: "Posterior Restoration — Before" },
    { src: "/images/cosmetic-showcase/posterior-after.jpg", alt: "Natural-looking composite restorations", caption: "Posterior Restoration — After" },
    { src: "/images/cosmetic-showcase/filling-before.jpg", alt: "Worn dental restoration", caption: "Filling Replacement — Before" },
    { src: "/images/cosmetic-showcase/filling-after.jpg", alt: "Fresh natural composite filling", caption: "Filling Replacement — After" },
  ],
  es: [
    { src: "/images/cosmetic-showcase/smile-makeover-before.jpg", alt: "Dientes desgastados y manchados antes del diseño de sonrisa", caption: "Diseño de Sonrisa — Antes" },
    { src: "/images/cosmetic-showcase/smile-makeover-after.jpg", alt: "Sonrisa uniforme y brillante después del diseño completo", caption: "Diseño de Sonrisa — Después" },
    { src: "/images/cosmetic-showcase/restoration-before.jpg", alt: "Dientes dañados y manchados antes de restauración", caption: "Restauración Completa — Antes" },
    { src: "/images/cosmetic-showcase/restoration-after.jpg", alt: "Dientes restaurados después de tratamiento integral", caption: "Restauración Completa — Después" },
    { src: "/images/cosmetic-showcase/smile-improvement-before.jpg", alt: "Dientes irregulares con espacios antes del tratamiento", caption: "Mejora de Sonrisa — Antes" },
    { src: "/images/cosmetic-showcase/smile-improvement-after.jpg", alt: "Sonrisa uniforme y alineada después del tratamiento", caption: "Mejora de Sonrisa — Después" },
    { src: "/images/cosmetic-showcase/veneer-1-before-smile.jpg", alt: "Sonrisa con diastema antes de carillas", caption: "Carillas — Antes (Sonrisa)" },
    { src: "/images/cosmetic-showcase/veneer-2-after-smile.jpg", alt: "Sonrisa mejorada después de colocación de carillas", caption: "Carillas — Después (Sonrisa)" },
    { src: "/images/cosmetic-showcase/veneer-3-before-clinical.jpg", alt: "Vista clínica mostrando espacio entre dientes", caption: "Carillas — Antes (Clínico)" },
    { src: "/images/cosmetic-showcase/veneer-4-after-clinical.jpg", alt: "Vista clínica después de colocación con espacio cerrado", caption: "Carillas — Después (Clínico)" },
    { src: "/images/cosmetic-showcase/amalgam-before.jpg", alt: "Restauraciones de amalgama de plata oscuras", caption: "Reemplazo de Amalgama — Antes" },
    { src: "/images/cosmetic-showcase/amalgam-after.jpg", alt: "Restauraciones de resina del color del diente", caption: "Reemplazo de Amalgama — Después" },
    { src: "/images/cosmetic-showcase/posterior-before.jpg", alt: "Caries y restauraciones deterioradas", caption: "Restauración Posterior — Antes" },
    { src: "/images/cosmetic-showcase/posterior-after.jpg", alt: "Restauraciones de composite de aspecto natural", caption: "Restauración Posterior — Después" },
    { src: "/images/cosmetic-showcase/filling-before.jpg", alt: "Restauración dental desgastada", caption: "Reemplazo de Relleno — Antes" },
    { src: "/images/cosmetic-showcase/filling-after.jpg", alt: "Relleno de composite natural y fresco", caption: "Reemplazo de Relleno — Después" },
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
  const videos = treatmentVideosData[locale];
  const cosmeticImages = cosmeticShowcaseData[locale];
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

      {/* Treatment Videos */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">
            {dict.gallery.treatmentVideos}
          </h2>
          <p className="text-text-light mb-8">
            {dict.gallery.treatmentVideosDesc}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.src} className="flex flex-col">
                <VideoPlayer src={v.src} aspect="aspect-square" contain />
                <p className="text-center text-sm font-medium text-navy mt-3">{v.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-12 md:py-16 bg-surface">
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cosmetic Dentistry Showcase */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">
            {dict.gallery.cosmeticShowcase}
          </h2>
          <p className="text-text-light mb-8">
            {dict.gallery.cosmeticShowcaseDesc}
          </p>
          <ImageCarousel images={cosmeticImages} interval={5000} />
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
