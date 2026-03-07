import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FacebookPageEmbed from "@/components/FacebookPageEmbed";
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

// NOTE: These are different from the homepage testimonials (Adriana Headley, Jesse Adler, Monse Rojas).
// Replace with real reviews from your Google listing when available.
const testimonialsData = {
  en: [
    {
      text: "Dr. Francisco and his team were amazing. I came all the way from the US for dental implants and the whole experience was seamless. The clinic is beautiful, the staff speaks English, and the cost was a fraction of what I was quoted back home. I'll definitely be coming back!",
      name: "Carlos M.",
    },
    {
      text: "My kids used to be terrified of the dentist. Since we started coming to Dental City, they actually look forward to their visits! The team is so patient and kind with children. Dr. Mariela is the best.",
      name: "Laura Vargas",
    },
    {
      text: "I got my braces at Dental City and the results are incredible. The orthodontic treatment was well planned and Dr. Francisco explained every step. The new clinic is gorgeous and very comfortable. 100% recommended!",
      name: "Daniela R.",
    },
  ],
  es: [
    {
      text: "El Dr. Francisco y su equipo fueron increíbles. Viajé desde Estados Unidos para implantes dentales y toda la experiencia fue impecable. La clínica es hermosa, el personal habla inglés, y el costo fue una fracción de lo que me cotizaron en mi país. ¡Definitivamente volveré!",
      name: "Carlos M.",
    },
    {
      text: "Mis hijos solían tener terror al dentista. Desde que empezamos a venir a Dental City, ¡realmente esperan con gusto sus citas! El equipo es muy paciente y amable con los niños. La Dra. Mariela es la mejor.",
      name: "Laura Vargas",
    },
    {
      text: "Me hice los brackets en Dental City y los resultados son increíbles. El tratamiento de ortodoncia fue bien planificado y el Dr. Francisco me explicó cada paso. La nueva clínica es preciosa y muy cómoda. ¡100% recomendado!",
      name: "Daniela R.",
    },
  ],
};

const happyPatientsData = {
  en: [
    { src: "/images/kids/kid-with-dentist-1.jpg", alt: "Smiling little girl with safety goggles and dental assistant", caption: "All Smiles After Treatment" },
    { src: "/images/kids/kid-with-dentist-2.jpg", alt: "Dental assistant with happy little girl in the treatment room", caption: "Fun at the Dentist" },
    { src: "/images/kids/kid-smiling-boy.jpg", alt: "Happy boy smiling in the dental chair", caption: "Happy Patient" },
    { src: "/images/kids/kid-with-prizes.jpg", alt: "Girl showing off prizes and stickers after dental visit", caption: "Prizes for Brave Patients" },
    { src: "/images/kids/kid-thumbs-up.jpg", alt: "Girl with braces giving thumbs up", caption: "Thumbs Up for Braces" },
    { src: "/images/kids/kids-collage.jpg", alt: "Collage of happy little patients at Dental City", caption: "Our Little Patients Love Us" },
    { src: "/images/technology/patient-clear-aligners.jpg", alt: "Patient smiling with clear aligners", caption: "Clear Aligners" },
    { src: "/images/technology/patient-smiling-consultation.jpg", alt: "Patient smiling during consultation", caption: "Smiling at Consultation" },
    { src: "/images/technology/patient-kid-smiling.jpg", alt: "Young patient smiling happily", caption: "Happy Young Patient" },
    { src: "/images/technology/patient-with-dr-francisco.jpg", alt: "Patient with Dr. Francisco after treatment", caption: "With Dr. Francisco" },
    { src: "/images/technology/patient-with-dr-francisco-2.jpg", alt: "Happy patient with Dr. Francisco", caption: "Another Happy Patient" },
  ],
  es: [
    { src: "/images/kids/kid-with-dentist-1.jpg", alt: "Niña sonriente con gafas de seguridad y asistente dental", caption: "Sonrisas Después del Tratamiento" },
    { src: "/images/kids/kid-with-dentist-2.jpg", alt: "Asistente dental con niña feliz en la sala de tratamiento", caption: "Diversión en el Dentista" },
    { src: "/images/kids/kid-smiling-boy.jpg", alt: "Niño feliz sonriendo en el sillón dental", caption: "Paciente Feliz" },
    { src: "/images/kids/kid-with-prizes.jpg", alt: "Niña mostrando premios y stickers después de la visita dental", caption: "Premios para Pacientes Valientes" },
    { src: "/images/kids/kid-thumbs-up.jpg", alt: "Niña con brackets levantando el pulgar", caption: "Aprobación para los Brackets" },
    { src: "/images/kids/kids-collage.jpg", alt: "Collage de pequeños pacientes felices en Dental City", caption: "Nuestros Pequeños Pacientes nos Aman" },
    { src: "/images/technology/patient-clear-aligners.jpg", alt: "Paciente sonriendo con alineadores transparentes", caption: "Alineadores Transparentes" },
    { src: "/images/technology/patient-smiling-consultation.jpg", alt: "Paciente sonriendo durante la consulta", caption: "Sonrisa en Consulta" },
    { src: "/images/technology/patient-kid-smiling.jpg", alt: "Paciente joven sonriendo felizmente", caption: "Joven Paciente Feliz" },
    { src: "/images/technology/patient-with-dr-francisco.jpg", alt: "Paciente con el Dr. Francisco después del tratamiento", caption: "Con el Dr. Francisco" },
    { src: "/images/technology/patient-with-dr-francisco-2.jpg", alt: "Paciente feliz con el Dr. Francisco", caption: "Otro Paciente Feliz" },
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
  const happyPatients = happyPatientsData[locale];
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

      {/* Google Reviews */}
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

      {/* Facebook */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {dict.testimonialsPage.followFacebook}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-2xl mx-auto">
            {dict.testimonialsPage.followFacebookDesc}
          </p>
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-lg mx-auto">
              <FacebookPageEmbed locale={locale} />
            </div>
            <a
              href="https://www.facebook.com/dentalcityaz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              {dict.testimonialsPage.likeFacebook}
            </a>
          </div>
        </div>
      </section>

      {/* Happy Patients Gallery */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {dict.testimonialsPage.happyPatientsTitle}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-2xl mx-auto">
            {dict.testimonialsPage.happyPatientsSubtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {happyPatients.map((img) => (
              <div
                key={img.src}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
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
