import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VideoPlayer from "@/components/VideoPlayer";
import ImageCarousel from "@/components/ImageCarousel";
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
        "Vea nuestra clínica dental moderna, nuestro equipo en acción y resultados reales de antes y después en Dental City Costa Rica.",
    };
  }

  return {
    title: "Gallery | Dental City Costa Rica",
    description:
      "See our modern dental clinic, our team in action, and real before-and-after results at Dental City Costa Rica.",
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
    },
    {
      before: "/images/fillings-before.jpg",
      after: "/images/fillings-after.jpg",
      beforeAlt: "Teeth before composite fillings",
      afterAlt: "Teeth after composite fillings",
      label: "Composite Fillings",
    },
    {
      before: "/images/restorations-before.jpg",
      after: "/images/restorations-after.jpg",
      beforeAlt: "Teeth with cavities before restoration",
      afterAlt: "Teeth after dental restoration",
      label: "Dental Restorations",
    },
    {
      before: "/images/veneers-before.jpg",
      after: "/images/veneers-after.jpg",
      beforeAlt: "Smile before dental veneers",
      afterAlt: "Bright uniform smile after dental veneers",
      label: "Dental Veneers",
    },
    {
      before: "/images/implants-before.jpg",
      after: "/images/implants-after.jpg",
      beforeAlt: "Implant post placed in gum before crown",
      afterAlt: "Completed dental implant with crown",
      label: "Dental Implants",
    },
    {
      before: "/images/allon4-before.jpg",
      after: "/images/allon4-after.jpg",
      beforeAlt: "Patient with missing teeth before full rehabilitation",
      afterAlt: "Full smile restored after oral rehabilitation",
      label: "Full Oral Rehabilitation",
    },
  ],
  es: [
    {
      before: "/images/ortho-before.jpg",
      after: "/images/ortho-after.jpg",
      beforeAlt: "Dientes antes de tratamiento de ortodoncia",
      afterAlt: "Dientes después de tratamiento de ortodoncia",
      label: "Ortodoncia",
    },
    {
      before: "/images/fillings-before.jpg",
      after: "/images/fillings-after.jpg",
      beforeAlt: "Dientes antes de restauraciones de resina",
      afterAlt: "Dientes después de restauraciones de resina",
      label: "Restauraciones de Resina",
    },
    {
      before: "/images/restorations-before.jpg",
      after: "/images/restorations-after.jpg",
      beforeAlt: "Dientes con caries antes de la restauración",
      afterAlt: "Dientes después de la restauración dental",
      label: "Restauraciones Dentales",
    },
    {
      before: "/images/veneers-before.jpg",
      after: "/images/veneers-after.jpg",
      beforeAlt: "Sonrisa antes de carillas dentales",
      afterAlt: "Sonrisa brillante y uniforme después de carillas dentales",
      label: "Carillas Dentales",
    },
    {
      before: "/images/implants-before.jpg",
      after: "/images/implants-after.jpg",
      beforeAlt: "Poste de implante colocado en encía antes de corona",
      afterAlt: "Implante dental completado con corona",
      label: "Implantes Dentales",
    },
    {
      before: "/images/allon4-before.jpg",
      after: "/images/allon4-after.jpg",
      beforeAlt: "Paciente con dientes faltantes antes de rehabilitación completa",
      afterAlt: "Sonrisa completa restaurada después de rehabilitación oral",
      label: "Rehabilitación Oral Completa",
    },
  ],
};

const clinicImagesData = {
  en: [
    { src: "/images/clinic/small-image1.jpeg", alt: "Dental City building exterior at night with illuminated signage", caption: "Dental City at Night" },
    { src: "/images/clinic/P1100279.JPG", alt: "Dental City building exterior with team in matching uniforms", caption: "Our Building & Team" },
    { src: "/images/clinic/P1100251.JPG", alt: "Staff greeting patient at the reception desk", caption: "Welcoming Reception" },
    { src: "/images/clinic/image8.jpeg", alt: "Dental City reception area with branded front desk", caption: "Reception Area" },
    { src: "/images/email/clinica-image12.jpg", alt: "Patient waiting lounge with inspirational quote and coffee station", caption: "Waiting Lounge" },
    { src: "/images/clinic/image4.jpeg", alt: "Modern glass staircase and lobby interior", caption: "Clinic Interior" },
    { src: "/images/clinic/image2.jpeg", alt: "Dental treatment room with modern equipment and ceiling TV", caption: "Treatment Room" },
    { src: "/images/clinic/image5.jpeg", alt: "Treatment room with dental chair and scenic wall art", caption: "Treatment Room" },
    { src: "/images/clinic/image9.jpeg", alt: "Open treatment bay with multiple stations and floor-to-ceiling windows", caption: "Upstairs Treatment Area" },
    { src: "/images/email/clinica-image13.jpg", alt: "Private consultation office with iMac and glass partition", caption: "Consultation Office" },
    { src: "/images/email/clinica-image11.jpg", alt: "Upscale restroom with black marble vessel sinks and LED mirrors", caption: "Patient Restroom" },
    { src: "/images/clinic/treatment-cinque-terre.jpg", alt: "Treatment room with dental chair and Cinque Terre wall art", caption: "Treatment Room" },
    { src: "/images/clinic/image3.jpeg", alt: "Treatment room with Cappadocia hot air balloon wall art and glass window", caption: "Treatment Room" },
    { src: "/images/email/clinica-image05.jpg", alt: "Treatment room with red dental chair and Roma, Italia wall art", caption: "Treatment Room" },
    { src: "/images/email/clinica-image04.jpg", alt: "Upper staircase with Eiffel Tower art and modern concrete columns", caption: "Upstairs Gallery" },
  ],
  es: [
    { src: "/images/clinic/small-image1.jpeg", alt: "Exterior del edificio Dental City de noche con señalización iluminada", caption: "Dental City de Noche" },
    { src: "/images/clinic/P1100279.JPG", alt: "Exterior del edificio Dental City con el equipo en uniformes", caption: "Nuestro Edificio y Equipo" },
    { src: "/images/clinic/P1100251.JPG", alt: "Personal saludando a paciente en la recepción", caption: "Recepción" },
    { src: "/images/clinic/image8.jpeg", alt: "Área de recepción de Dental City con mostrador de la marca", caption: "Área de Recepción" },
    { src: "/images/email/clinica-image12.jpg", alt: "Sala de espera con frase inspiradora y estación de café", caption: "Sala de Espera" },
    { src: "/images/clinic/image4.jpeg", alt: "Escalera de vidrio moderna e interior del vestíbulo", caption: "Interior de la Clínica" },
    { src: "/images/clinic/image2.jpeg", alt: "Sala de tratamiento dental con equipo moderno y TV en el techo", caption: "Sala de Tratamiento" },
    { src: "/images/clinic/image5.jpeg", alt: "Sala de tratamiento con sillón dental y arte escénico en la pared", caption: "Sala de Tratamiento" },
    { src: "/images/clinic/image9.jpeg", alt: "Área de tratamiento abierta con múltiples estaciones y ventanales", caption: "Área de Tratamiento Superior" },
    { src: "/images/email/clinica-image13.jpg", alt: "Oficina de consulta privada con iMac y división de vidrio", caption: "Oficina de Consulta" },
    { src: "/images/email/clinica-image11.jpg", alt: "Baño de lujo con lavamanos de mármol negro y espejos LED", caption: "Baño de Pacientes" },
    { src: "/images/clinic/treatment-cinque-terre.jpg", alt: "Sala de tratamiento con sillón dental y arte de Cinque Terre", caption: "Sala de Tratamiento" },
    { src: "/images/clinic/image3.jpeg", alt: "Sala de tratamiento con arte de globos aerostáticos de Capadocia", caption: "Sala de Tratamiento" },
    { src: "/images/email/clinica-image05.jpg", alt: "Sala de tratamiento con sillón rojo y arte de Roma, Italia", caption: "Sala de Tratamiento" },
    { src: "/images/email/clinica-image04.jpg", alt: "Escalera superior con arte de la Torre Eiffel y columnas de concreto modernas", caption: "Galería Superior" },
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

const technologyImagesData = {
  en: [
    { src: "/images/clinic/image7.jpeg", alt: "Dentist in full PPE performing a dental procedure", caption: "Expert Care in Action" },
    { src: "/images/clinic/image6.jpeg", alt: "Clinical dental photography with professional camera equipment", caption: "Clinical Documentation" },
    { src: "/images/clinic-treatment-room.jpg", alt: "Treatment room with BEYOND POLUS ADVANCE whitening system", caption: "BEYOND Whitening System" },
    { src: "/images/xray-machine.jpg", alt: "CBCT 3D imaging machine", caption: "CBCT 3D Imaging" },
    { src: "/images/3shape-trios.jpg", alt: "Dr. Mariela with 3Shape TRIOS 4 digital intraoral scanner", caption: "3Shape TRIOS 4 Scanner", objectPosition: "center 80%" },
    { src: "/images/digital-xray.jpg", alt: "Portable digital X-ray setup", caption: "Digital X-Ray Technology" },
  ],
  es: [
    { src: "/images/clinic/image7.jpeg", alt: "Dentista con equipo de protección completo realizando un procedimiento", caption: "Atención Experta en Acción" },
    { src: "/images/clinic/image6.jpeg", alt: "Fotografía dental clínica con equipo profesional de cámara", caption: "Documentación Clínica" },
    { src: "/images/clinic-treatment-room.jpg", alt: "Sala de tratamiento con sistema de blanqueamiento BEYOND POLUS ADVANCE", caption: "Sistema de Blanqueamiento BEYOND" },
    { src: "/images/xray-machine.jpg", alt: "Máquina de imágenes 3D CBCT", caption: "Imágenes 3D CBCT" },
    { src: "/images/3shape-trios.jpg", alt: "Dra. Mariela con escáner intraoral digital 3Shape TRIOS 4", caption: "Escáner 3Shape TRIOS 4", objectPosition: "center 80%" },
    { src: "/images/digital-xray.jpg", alt: "Configuración portátil de rayos X digitales", caption: "Tecnología de Rayos X Digital" },
  ],
};


function ImageGrid({ images }: { images: { src: string; alt: string; caption: string; objectPosition?: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img) => (
        <div
          key={img.src}
          className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="absolute bottom-4 left-4 text-white font-medium text-sm">
              {img.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const beforeAfterCases = beforeAfterData[locale];
  const clinicImages = clinicImagesData[locale];
  const kidsImages = kidsImagesData[locale];
  const technologyImages = technologyImagesData[locale];
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
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
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

      {/* Our Facilities */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
            {dict.gallery.ourFacilities}
          </h2>
          <p className="text-text-light mb-8 max-w-2xl">
            {dict.gallery.ourFacilitiesDesc}
          </p>

          {/* Auto-sliding photo carousel */}
          <div className="mb-8">
            <ImageCarousel images={clinicImages} interval={4000} />
          </div>

          {/* Facility tour videos */}
          <div className="grid md:grid-cols-2 gap-6">
            <VideoPlayer src="/videos/demo-1.mp4" />
            <VideoPlayer src="/videos/demo-2.mp4" />
          </div>
        </div>
      </section>

      {/* Technology & Equipment */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">
            {dict.gallery.technologyEquipment}
          </h2>
          <ImageGrid images={technologyImages} />
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
