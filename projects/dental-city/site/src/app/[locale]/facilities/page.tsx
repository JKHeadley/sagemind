import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      title: "Instalaciones | Dental City Costa Rica",
      description:
        "Conozca nuestras instalaciones modernas, salas de tratamiento y tecnología dental de última generación en Dental City Costa Rica.",
    };
  }

  return {
    title: "Facilities | Dental City Costa Rica",
    description:
      "Explore our modern facilities, treatment rooms, and cutting-edge dental technology at Dental City Costa Rica.",
  };
}

const clinicImagesData = {
  en: [
    { src: "/images/clinic/small-image1.jpeg", alt: "Dental City building exterior at night with illuminated signage", caption: "Dental City at Night" },
    { src: "/images/clinic/P1100279.JPG", alt: "Dental City building exterior with team in matching uniforms", caption: "Our Building & Team" },
    { src: "/images/clinic/P1100251.JPG", alt: "Staff greeting patient at the reception desk", caption: "Welcoming Reception" },
    { src: "/images/clinic/sarapiqui-lobby.jpg", alt: "Modern reception lobby with Dental City branding and marble floors", caption: "Reception Lobby" },
    { src: "/images/clinic/image8.jpeg", alt: "Dental City reception area with branded front desk", caption: "Reception Area" },
    { src: "/images/clinic/image4.jpeg", alt: "Modern glass staircase and lobby interior", caption: "Clinic Interior" },
    { src: "/images/clinic/treatment-chair-closeup.jpg", alt: "Modern dental treatment station with advanced ZC-5700 equipment", caption: "Treatment Station" },
    { src: "/images/clinic/treatment-room-cappadocia.jpg", alt: "Treatment room with orange dental chair and Cappadocia wall art", caption: "Treatment Room" },
    { src: "/images/clinic/image5.jpeg", alt: "Treatment room with dental chair and scenic wall art", caption: "Treatment Room" },
    { src: "/images/clinic/upstairs-treatment-wide.jpg", alt: "Upstairs open treatment bay with multiple stations and glass partitions", caption: "Upstairs Treatment Area" },
    { src: "/images/clinic/image3.jpeg", alt: "Treatment room with Cappadocia hot air balloon wall art and glass window", caption: "Treatment Room" },
    { src: "/images/clinic/treatment-room-roma.jpg", alt: "Treatment room with red dental chair and Roma, Italia wall art", caption: "Treatment Room" },
    { src: "/images/clinic/patient-restroom-wide.jpg", alt: "Upscale patient restroom with black marble vessel sinks and panoramic windows", caption: "Patient Restroom" },
    { src: "/images/clinic/upstairs-gallery.jpg", alt: "Upper staircase with Eiffel Tower art and modern concrete columns", caption: "Upstairs Gallery" },
  ],
  es: [
    { src: "/images/clinic/small-image1.jpeg", alt: "Exterior del edificio Dental City de noche con señalización iluminada", caption: "Dental City de Noche" },
    { src: "/images/clinic/P1100279.JPG", alt: "Exterior del edificio Dental City con el equipo en uniformes", caption: "Nuestro Edificio y Equipo" },
    { src: "/images/clinic/P1100251.JPG", alt: "Personal saludando a paciente en la recepción", caption: "Recepción" },
    { src: "/images/clinic/sarapiqui-lobby.jpg", alt: "Recepción moderna con marca Dental City y pisos de mármol", caption: "Recepción" },
    { src: "/images/clinic/image8.jpeg", alt: "Área de recepción de Dental City con mostrador de la marca", caption: "Área de Recepción" },
    { src: "/images/clinic/image4.jpeg", alt: "Escalera de vidrio moderna e interior del vestíbulo", caption: "Interior de la Clínica" },
    { src: "/images/clinic/treatment-chair-closeup.jpg", alt: "Estación de tratamiento dental moderna con equipo avanzado ZC-5700", caption: "Estación de Tratamiento" },
    { src: "/images/clinic/treatment-room-cappadocia.jpg", alt: "Sala de tratamiento con sillón dental naranja y arte de Capadocia", caption: "Sala de Tratamiento" },
    { src: "/images/clinic/image5.jpeg", alt: "Sala de tratamiento con sillón dental y arte escénico en la pared", caption: "Sala de Tratamiento" },
    { src: "/images/clinic/upstairs-treatment-wide.jpg", alt: "Área de tratamiento abierta con múltiples estaciones y divisiones de vidrio", caption: "Área de Tratamiento Superior" },
    { src: "/images/clinic/image3.jpeg", alt: "Sala de tratamiento con arte de globos aerostáticos de Capadocia", caption: "Sala de Tratamiento" },
    { src: "/images/clinic/treatment-room-roma.jpg", alt: "Sala de tratamiento con sillón rojo y arte de Roma, Italia", caption: "Sala de Tratamiento" },
    { src: "/images/clinic/patient-restroom-wide.jpg", alt: "Baño de lujo con lavamanos de mármol negro y ventanales panorámicos", caption: "Baño de Pacientes" },
    { src: "/images/clinic/upstairs-gallery.jpg", alt: "Escalera superior con arte de la Torre Eiffel y columnas de concreto modernas", caption: "Galería Superior" },
  ],
};

const equipmentData = {
  en: [
    { src: "/images/technology/equipment-3shape-scanner.jpg", alt: "3Shape TRIOS 4 digital intraoral scanner", caption: "3Shape TRIOS 4 Scanner" },
    { src: "/images/technology/equipment-panoramic-xray.jpg", alt: "CBCT panoramic X-ray machine", caption: "CBCT / Panoramic X-Ray" },
    { src: "/images/technology/treatment-whitening-session.jpg", alt: "BEYOND POLUS ADVANCE whitening session", caption: "BEYOND POLUS Whitening" },
    { src: "/images/digital-xray.jpg", alt: "Portable digital X-ray setup", caption: "Digital X-Ray Sensors" },
    { src: "/images/technology/equipment-dental-camera.jpg", alt: "Professional dental photography camera", caption: "Dental Camera" },
    { src: "/images/technology/equipment-implant-handpiece.jpg", alt: "Precision implant handpiece", caption: "Implant Handpiece" },
    { src: "/images/technology/equipment-zumax-loupes.jpg", alt: "ZUMAX surgical loupes with LED light", caption: "ZUMAX Surgical Loupes" },
    { src: "/images/technology/equipment-ortho-elastics.jpg", alt: "Orthodontic elastics and accessories", caption: "Orthodontic Supplies" },
  ],
  es: [
    { src: "/images/technology/equipment-3shape-scanner.jpg", alt: "Escáner intraoral digital 3Shape TRIOS 4", caption: "Escáner 3Shape TRIOS 4" },
    { src: "/images/technology/equipment-panoramic-xray.jpg", alt: "Máquina de rayos X panorámicos CBCT", caption: "Rayos X CBCT / Panorámicos" },
    { src: "/images/technology/treatment-whitening-session.jpg", alt: "Sesión de blanqueamiento BEYOND POLUS ADVANCE", caption: "Blanqueamiento BEYOND POLUS" },
    { src: "/images/digital-xray.jpg", alt: "Configuración portátil de rayos X digitales", caption: "Sensores de Rayos X Digital" },
    { src: "/images/technology/equipment-dental-camera.jpg", alt: "Cámara profesional de fotografía dental", caption: "Cámara Dental" },
    { src: "/images/technology/equipment-implant-handpiece.jpg", alt: "Pieza de mano de precisión para implantes", caption: "Pieza de Mano para Implantes" },
    { src: "/images/technology/equipment-zumax-loupes.jpg", alt: "Lupas quirúrgicas ZUMAX con luz LED", caption: "Lupas Quirúrgicas ZUMAX" },
    { src: "/images/technology/equipment-ortho-elastics.jpg", alt: "Elásticos y accesorios de ortodoncia", caption: "Suministros de Ortodoncia" },
  ],
};

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const clinicImages = clinicImagesData[locale];
  const equipment = equipmentData[locale];
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{dict.facilities.pageTitle}</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {dict.facilities.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Our Clinic */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
            {dict.facilities.ourClinic}
          </h2>
          <p className="text-text-light mb-8 max-w-2xl">
            {dict.facilities.ourClinicDesc}
          </p>
          <ImageCarousel images={clinicImages} interval={4000} />
        </div>
      </section>

      {/* Facility Tour Videos */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
            {dict.facilities.facilityTour}
          </h2>
          <p className="text-text-light mb-8 max-w-2xl">
            {dict.facilities.facilityTourDesc}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <VideoPlayer src="/videos/tour-waiting-lounge.mp4" />
            <VideoPlayer src="/videos/tour-lobby-reception.mp4" />
            <VideoPlayer src="/videos/tour-lobby-sculptures.mp4" />
            <VideoPlayer src="/videos/tour-treatment-room.mp4" />
          </div>
        </div>
      </section>

      {/* Technology & Equipment */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
            {dict.facilities.technologyEquipment}
          </h2>
          <p className="text-text-light mb-8 max-w-2xl">
            {dict.facilities.technologyEquipmentDesc}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((img) => (
              <div
                key={img.src}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-navy/5"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
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
            {dict.facilities.ctaTitle}
          </h2>
          <p className="text-white/80 mb-8">
            {dict.facilities.ctaText}
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
