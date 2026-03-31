import Image from "next/image";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ServiceIcon from "@/components/ServiceIcon";
import VideoPlayer from "@/components/VideoPlayer";

const servicesData = {
  en: [
    {
      name: "Dental Implants",
      desc: "Artificial tooth roots that bond with your natural bone, providing a sturdy base for replacement teeth that look and feel natural.",
    },
    {
      name: "Orthodontics",
      desc: "Over 1,500 completed cases. Straighten your teeth and correct bite issues with modern orthodontic treatments from our specialist.",
    },
    {
      name: "Dental Aesthetics",
      desc: "Veneers, whitening with the award-winning BEYOND POLUS system, and cosmetic procedures for the confident smile you deserve.",
    },
    {
      name: "Root Canal",
      desc: "Save damaged teeth with gentle root canal therapy. We remove infection and seal the tooth to restore its health.",
    },
    {
      name: "Oral Surgery",
      desc: "Expert surgical procedures including extractions, bone grafts, and jaw corrections in a comfortable, modern setting.",
    },
    {
      name: "All-on-Four",
      desc: "Full-arch rehabilitation with just four implants. Replace removable dentures with a permanent, natural-feeling bridge.",
    },
  ],
  es: [
    {
      name: "Implantes Dentales",
      desc: "Raíces dentales artificiales que se integran con su hueso natural, proporcionando una base sólida para dientes de reemplazo que se ven y se sienten naturales.",
    },
    {
      name: "Ortodoncia",
      desc: "Más de 1,500 casos completados. Alinee sus dientes y corrija problemas de mordida con tratamientos ortodónticos modernos de nuestro especialista.",
    },
    {
      name: "Estética Dental",
      desc: "Carillas, blanqueamiento con el sistema premiado BEYOND POLUS y procedimientos cosméticos para la sonrisa segura que usted merece.",
    },
    {
      name: "Endodoncia",
      desc: "Salve dientes dañados con terapia de endodoncia suave. Eliminamos la infección y sellamos el diente para restaurar su salud.",
    },
    {
      name: "Cirugía Oral",
      desc: "Procedimientos quirúrgicos expertos incluyendo extracciones, injertos óseos y correcciones de mandíbula en un entorno cómodo y moderno.",
    },
    {
      name: "All-on-Four",
      desc: "Rehabilitación de arcada completa con solo cuatro implantes. Reemplace las dentaduras removibles con un puente permanente y de sensación natural.",
    },
  ],
};

const statsData = {
  en: [
    { value: "20+", label: "Years Experience" },
    { value: "1,500+", label: "Orthodontic Cases" },
    { value: "59", label: "Five-Star Reviews" },
    { value: "2", label: "Locations" },
  ],
  es: [
    { value: "20+", label: "Años de Experiencia" },
    { value: "1,500+", label: "Casos de Ortodoncia" },
    { value: "59", label: "Reseñas 5 Estrellas" },
    { value: "2", label: "Ubicaciones" },
  ],
};

const dentistsData = {
  en: [
    {
      name: "Dr. Francisco Rodríguez Chaves",
      role: "Founder & CEO |Orthodontics & Dentofacial Orthopedics",
      image: "/images/team-francisco.jpg",
    },
    {
      name: "Dra. Mariela Hernández Bonilla",
      role: "Founder & Oral Surgeon |Dental Implants, Oral Surgery & Facial Harmonization",
      image: "/images/team-dra-hernandez.jpg",
    },
    {
      name: "Dr. Luis Alejandro Carvajal Chavarría",
      role: "General Dentist |Preventive Dentistry",
      image: "/images/team-dr-carvajal.jpg",
    },
  ],
  es: [
    {
      name: "Dr. Francisco Rodríguez Chaves",
      role: "Fundador y Director |Ortodoncia y Ortopedia Dentofacial",
      image: "/images/team-francisco.jpg",
    },
    {
      name: "Dra. Mariela Hernández Bonilla",
      role: "Fundadora y Cirujana Oral |Implantes Dentales, Cirugía Oral y Armonización Facial",
      image: "/images/team-dra-hernandez.jpg",
    },
    {
      name: "Dr. Luis Alejandro Carvajal Chavarría",
      role: "Odontólogo General |Odontología Preventiva",
      image: "/images/team-dr-carvajal.jpg",
    },
  ],
};

const technologyData = {
  en: [
    {
      name: "3Shape TRIOS 4",
      desc: "Premium digital intraoral scanner. No messy molds, more accurate results.",
      image: "/images/technology/equipment-3shape-scanner.jpg",
    },
    {
      name: "CBCT / Panoramic X-Ray",
      desc: "In-house 3D diagnostic imaging for precise treatment planning.",
      image: "/images/technology/equipment-panoramic-xray.jpg",
    },
    {
      name: "BEYOND POLUS ADVANCE",
      desc: "Award-winning whitening system, Top Whitening System winner 8 consecutive years.",
      image: "/images/technology/treatment-whitening-session.jpg",
    },
    {
      name: "Digital X-Ray Sensors",
      desc: "Lower radiation, instant results, higher resolution diagnostics.",
      image: "/images/digital-xray.jpg",
    },
  ],
  es: [
    {
      name: "3Shape TRIOS 4",
      desc: "Escáner intraoral digital premium. Sin moldes incómodos, resultados más precisos.",
      image: "/images/technology/equipment-3shape-scanner.jpg",
    },
    {
      name: "CBCT / Radiografía Panorámica",
      desc: "Imágenes diagnósticas 3D en nuestras instalaciones para una planificación de tratamiento precisa.",
      image: "/images/technology/equipment-panoramic-xray.jpg",
    },
    {
      name: "BEYOND POLUS ADVANCE",
      desc: "Sistema de blanqueamiento premiado, ganador del Top Whitening System por 8 años consecutivos.",
      image: "/images/technology/treatment-whitening-session.jpg",
    },
    {
      name: "Sensores de Rayos X Digitales",
      desc: "Menor radiación, resultados instantáneos, diagnósticos de mayor resolución.",
      image: "/images/digital-xray.jpg",
    },
  ],
};

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const services = servicesData[locale];
  const stats = statsData[locale];
  const dentists = dentistsData[locale];
  const technology = technologyData[locale];
  const testimonials = testimonialsData[locale];
  const prefix = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center bg-navy">
        <Image
          src="/images/hero-francisco.jpg"
          alt="Dr. Francisco Rodríguez treating a patient at Dental City"
          fill
          className="object-cover opacity-30 object-right md:object-center"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32 text-center text-white">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight">
            DENTAL CITY
            <span className="block text-primary-light text-lg md:text-2xl font-normal tracking-[0.3em] mt-2">
              COSTA RICA
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-white font-semibold mb-3 max-w-3xl mx-auto">
            {dict.hero.tagline}
          </p>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto font-light">
            {dict.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={`${prefix}/dashboard/estimate`}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              {dict.hero.getQuote}
            </a>
            <a
              href={`${prefix}/pricing`}
              className="border-2 border-white/30 hover:border-primary-light text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              {dict.hero.seePrices}
            </a>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-light" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              {dict.hero.adaStandards}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-light" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm-6.5-5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013.5 10zm13 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" /></svg>
              {dict.hero.englishSpeaking}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>
              {dict.hero.reviews}
            </span>
            <span className="hidden sm:inline">|</span>
            <span>{dict.hero.experience}</span>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-surface-alt py-4 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3 text-sm text-text-light">
            <span className="font-medium text-navy">{dict.socialProof.trustedBy}</span>
            <span title="United States">US</span>
            <span title="Canada">CA</span>
            <span title="United Kingdom">UK</span>
            <span title="Costa Rica">CR</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-navy/10" />
          <p className="text-sm text-text-light italic">
            &ldquo;{dict.socialProof.patientQuote}&rdquo;{" "}
            <span className="font-medium not-italic text-navy">{dict.socialProof.patientName}</span>
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-navy mb-4 md:mb-6">
              {dict.about.title}
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              {dict.about.p1}
            </p>
            <p className="text-text-light leading-relaxed mb-4">
              {dict.about.p2}
            </p>
            <p className="text-text-light leading-relaxed">
              {dict.about.p3}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/clinic/P1100279.JPG"
              alt="Dental City team in front of the clinic building"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facility Tour */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-navy mb-4">
            {locale === "es" ? "Conozca Nuestras Instalaciones" : "Tour Our Facilities"}
          </h2>
          <p className="text-text-light mb-8 max-w-2xl mx-auto">
            {locale === "es"
              ? "Instalaciones modernas diseñadas para su comodidad. Vea por dentro lo que nos hace diferentes."
              : "Modern facilities designed for your comfort. See firsthand what sets us apart."}
          </p>
          <div className="max-w-3xl mx-auto">
            <VideoPlayer src="/videos/facility-tour.mp4" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-bold mb-1">
                {s.value}
              </div>
              <div className="text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Savings Comparison */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-navy text-center mb-4">
            {dict.savings.title}
          </h2>
          <p className="text-text-light text-center mb-10 max-w-2xl mx-auto">
            {dict.savings.subtitle}
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full max-w-3xl mx-auto text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  <th className="py-3 pr-4 text-navy font-semibold text-sm">{dict.savings.procedure}</th>
                  <th className="py-3 px-4 text-navy font-semibold text-sm text-right">{dict.savings.usPrice}</th>
                  <th className="py-3 pl-4 text-primary font-semibold text-sm text-right">{dict.savings.youSave}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { procedure: locale === "es" ? "Implante Dental (con corona)" : "Dental Implant (with crown)", us: "$3,500–$6,000", save: "50–70%" },
                  { procedure: "All-on-4", us: "$20,000–$35,000", save: "55–65%" },
                  { procedure: locale === "es" ? "Corona Dental (porcelana)" : "Dental Crown (porcelain)", us: "$1,000–$2,000", save: "60–70%" },
                  { procedure: locale === "es" ? "Carilla (por diente)" : "Veneer (per tooth)", us: "$800–$2,500", save: "50–70%" },
                  { procedure: locale === "es" ? "Endodoncia" : "Root Canal", us: "$700–$1,500", save: "55–65%" },
                  { procedure: locale === "es" ? "Ortodoncia" : "Orthodontics", us: "$4,000–$8,000", save: "55–65%" },
                ].map((row) => (
                  <tr key={row.procedure} className="border-b border-navy/5 hover:bg-surface/50 transition-colors">
                    <td className="py-3 pr-4 font-medium text-navy">{row.procedure}</td>
                    <td className="py-3 px-4 text-text-light text-right">{row.us}</td>
                    <td className="py-3 pl-4 text-primary font-bold text-right">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-light text-center mb-4">{dict.savings.disclaimer}</p>
          <div className="text-center mb-8">
            <Link
              href={`${prefix}/pricing#estimate`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              {locale === "es" ? "Suba su Cotización y Vea Cuánto Puede Ahorrar" : "Upload Your Quote & See How Much You Can Save"}
            </Link>
          </div>
          <div className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-4">
            {[dict.savings.bullet1, dict.savings.bullet2, dict.savings.bullet3].map((bullet, i) => (
              <div key={i} className="flex items-start gap-3 bg-surface rounded-lg p-4">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-navy">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-navy text-center mb-4">
            {dict.services.title}
          </h2>
          <p className="text-text-light text-center mb-12 max-w-2xl mx-auto">
            {dict.services.subtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <AnimateOnScroll key={svc.name} delay={i < 3 ? ((i * 100) as 100 | 200 | 300) : undefined}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="mb-3"><ServiceIcon name={svc.name} /></div>
                  <h3 className="font-semibold text-lg text-navy mb-2">
                    {svc.name}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`${prefix}/services`}
              className="inline-block bg-navy hover:bg-navy-light text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {dict.common.viewAllServices}
            </Link>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-navy text-center mb-4">
            {dict.technology.title}
          </h2>
          <p className="text-text-light text-center mb-12 max-w-2xl mx-auto">
            {dict.technology.subtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technology.map((tech, i) => (
              <AnimateOnScroll key={tech.name} delay={i < 3 ? ((i * 100) as 100 | 200 | 300) : undefined}>
                <div className="group bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tech.image}
                      alt={tech.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-navy mb-1">{tech.name}</h3>
                    <p className="text-text-light text-sm leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Dentists */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-navy text-center mb-8 md:mb-12">
            {dict.dentists.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {dentists.map((doc) => (
              <div key={doc.name} className="text-center group">
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-navy text-lg">{doc.name}</h3>
                <p className="text-text-light text-sm mt-1">{doc.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`${prefix}/team`}
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              {dict.common.meetFullTeam} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-navy text-center mb-8 md:mb-12">
            {dict.testimonials.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-surface rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
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
          <div className="text-center mt-10">
            <Link
              href={`${prefix}/testimonials`}
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              {locale === "es" ? "Ver todos los testimonios" : "See all testimonials"} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-navy text-center mb-3">
            {dict.faq.title}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-xl mx-auto">
            {dict.faq.subtitle}
          </p>
          <FAQ items={dict.faq.items as unknown as { question: string; answer: string }[]} />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-navy text-center mb-3">
            {dict.contactForm.formTitle}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-xl mx-auto">
            {dict.contactForm.formSubtitle}
          </p>
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm relative">
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 md:py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            {dict.contact.title}
          </h2>
          <div className="max-w-xl mx-auto">
            {/* Location - Aguas Zarcas */}
            <div className="bg-navy-light rounded-xl p-5 md:p-8">
              <h3 className="text-xl font-bold text-primary-light mb-6">
                Aguas Zarcas ({dict.contact.main})
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.address}</h4>
                  <p className="text-white/60 text-sm">
                    Edificio Dental City, 300 oeste del CTP, Aguas Zarcas, Costa Rica
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.phone}</h4>
                  <a
                    href="tel:+50624740415"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    +506 2474 0415
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.whatsapp}</h4>
                  <a
                    href="https://wa.me/50683398833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    +506 8339 8833
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.email}</h4>
                  <a
                    href="mailto:info@dentalcitycr.com"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    info@dentalcitycr.com
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.hours}</h4>
                  <div className="text-white/60 space-y-1 text-sm">
                    <p>{dict.contact.hoursAZ1}</p>
                    <p>{dict.contact.hoursAZ2}</p>
                    <p>{dict.contact.hoursAZ3}</p>
                    <p>{dict.contact.hoursAZ4}</p>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/50683398833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    {dict.common.whatsappUs}
                  </a>
                  <a
                    href="https://www.facebook.com/dentalcityaz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/30 hover:border-primary-light text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    {dict.common.facebook}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
