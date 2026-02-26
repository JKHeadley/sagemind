import type { Metadata } from "next";
import Image from "next/image";
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
      title: "Testimonios | Dental City Costa Rica",
      description:
        "Lea y vea testimonios reales de pacientes de Dental City Costa Rica. Reseñas de Google, videos de pacientes y sonrisas felices.",
    };
  }

  return {
    title: "Testimonials | Dental City Costa Rica",
    description:
      "Read and watch real patient testimonials from Dental City Costa Rica. Google reviews, patient videos, and happy smiles.",
  };
}

const testimonialsData = {
  en: [
    {
      text: "I was extremely happy and satisfied with the service and the end results. The staff was very friendly, the doctors took their time with me and I never felt rushed. They carefully reviewed my plan of care along with the costs which was like a quarter of what I was quoted in the US. Their new location is very nice and it makes you feel calmed and relaxed. I highly recommend them!",
      name: "Adriana Headley",
    },
    {
      text: "I have been getting all my dental care and treatments with Dr. Mariela for years. From the beginning, she has been super friendly and incredibly careful with her work, and she always finds the most affordable option for me. Highly recommended. Excellent dentists and wonderful human beings.",
      name: "Jesse Adler",
    },
    {
      text: "The attention from all the staff is excellent, the facilities are super comfortable. I love the prices and the results are remarkable.",
      name: "Monse Rojas",
    },
  ],
  es: [
    {
      text: "Estuve extremadamente feliz y satisfecha con el servicio y los resultados finales. El personal fue muy amable, los doctores se tomaron su tiempo conmigo y nunca me sentí apurada. Revisaron cuidadosamente mi plan de tratamiento junto con los costos, que eran como una cuarta parte de lo que me cotizaron en EE.UU. Su nueva sede es muy bonita y te hace sentir tranquila y relajada. ¡Los recomiendo mucho!",
      name: "Adriana Headley",
    },
    {
      text: "Tengo años de hacerme todos mis cuidados dentales y tratamientos con la Doctora Mariela, desde el principio super amable y además super cuidadosa con lo que te está haciendo, y siempre encuentra la manera más viable para mí. Super recomendada. Excelentes dentistas y seres humanos.",
      name: "Jesse Adler",
    },
    {
      text: "La atención de parte de todos los funcionarios es excelente, las instalaciones super cómodas. Me gustan muchísimo los precios y además los resultados son notables.",
      name: "Monse Rojas",
    },
  ],
};

const kidsImagesData = {
  en: [
    { src: "/images/kids/kid-with-dentist-1.jpg", alt: "Smiling little girl with safety goggles and dental assistant", caption: "All Smiles After Treatment" },
    { src: "/images/kids/kid-with-dentist-2.jpg", alt: "Dental assistant with happy little girl in the treatment room", caption: "Fun at the Dentist" },
    { src: "/images/kids/kid-smiling-boy.jpg", alt: "Happy boy smiling in the dental chair", caption: "Happy Patient" },
    { src: "/images/kids/kid-with-prizes.jpg", alt: "Girl showing off prizes and stickers after dental visit", caption: "Prizes for Brave Patients" },
    { src: "/images/kids/kid-thumbs-up.jpg", alt: "Girl with braces giving thumbs up", caption: "Thumbs Up for Braces" },
    { src: "/images/kids/kids-collage.jpg", alt: "Collage of happy little patients at Dental City", caption: "Our Little Patients Love Us" },
  ],
  es: [
    { src: "/images/kids/kid-with-dentist-1.jpg", alt: "Niña sonriente con gafas de seguridad y asistente dental", caption: "Sonrisas Después del Tratamiento" },
    { src: "/images/kids/kid-with-dentist-2.jpg", alt: "Asistente dental con niña feliz en la sala de tratamiento", caption: "Diversión en el Dentista" },
    { src: "/images/kids/kid-smiling-boy.jpg", alt: "Niño feliz sonriendo en el sillón dental", caption: "Paciente Feliz" },
    { src: "/images/kids/kid-with-prizes.jpg", alt: "Niña mostrando premios y stickers después de la visita dental", caption: "Premios para Pacientes Valientes" },
    { src: "/images/kids/kid-thumbs-up.jpg", alt: "Niña con brackets levantando el pulgar", caption: "Aprobación para los Brackets" },
    { src: "/images/kids/kids-collage.jpg", alt: "Collage de pequeños pacientes felices en Dental City", caption: "Nuestros Pequeños Pacientes nos Aman" },
  ],
};

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const testimonials = testimonialsData[locale];
  const kidsImages = kidsImagesData[locale];
  const prefix = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-28 pb-12 md:pt-32 md:pb-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href={prefix}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-primary-light transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {dict.common.backToHome}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{dict.testimonialsPage.pageTitle}</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {dict.testimonialsPage.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-8">
            {dict.testimonialsPage.reviewsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-light text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="font-semibold text-navy">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Placeholder */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {dict.testimonialsPage.googleReviewsTitle}
          </h2>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-surface rounded-full px-5 py-2.5">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-text-light text-sm font-medium">
                {locale === "es" ? "59 Reseñas · 5.0" : "59 Reviews · 5.0"}
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center">
            <a
              href="https://www.google.com/maps/place/Dental+City/@10.3445,-84.2256,15z/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {locale === "es" ? "Ver Reseñas en Google" : "View Reviews on Google"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Happy Patients Gallery */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {dict.testimonialsPage.happyPatientsTitle}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-2xl mx-auto">
            {dict.testimonialsPage.happyPatientsSubtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kidsImages.map((img) => (
              <div
                key={img.src}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="absolute bottom-4 left-4 text-white font-medium text-sm">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {dict.testimonialsPage.ctaTitle}
          </h2>
          <p className="text-white/80 mb-8">
            {dict.testimonialsPage.ctaText}
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
