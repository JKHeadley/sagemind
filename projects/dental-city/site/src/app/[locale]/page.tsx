import Image from "next/image";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const ServiceIcon = ({ name }: { name: string }) => {
  const cls = "w-8 h-8 text-primary";
  switch (name) {
    case "Dental Implants":
    case "Implantes Dentales":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C10.5 2 9 3.5 9 5.5c0 1.5.5 2.5 1 3.5.5 1 1 2 1 4s-.5 4-1 5.5C9.5 20 9 21 9 22h6c0-1-.5-2-1-3.5-.5-1.5-1-3.5-1-5.5s.5-3 1-4c.5-1 1-2 1-3.5C15 3.5 13.5 2 12 2z" />
        </svg>
      );
    case "Orthodontics":
    case "Ortodoncia":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M7 8h10M7 16h10M9 4l-2 4M15 4l2 4M9 20l-2-4M15 20l2-4" />
        </svg>
      );
    case "Dental Aesthetics":
    case "Estética Dental":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      );
    case "Root Canal":
    case "Endodoncia":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
        </svg>
      );
    case "Oral Surgery":
    case "Cirugía Oral":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-5.383a1.5 1.5 0 010-2.121l.707-.707a1.5 1.5 0 012.121 0L12 10.086l3.136-3.127a1.5 1.5 0 012.121 0l.707.707a1.5 1.5 0 010 2.121L12.58 15.17a.75.75 0 01-1.06.1l-.1-.1z" />
        </svg>
      );
    case "All-on-Four":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      );
  }
};

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
      name: "Dr. Francisco Rodriguez Chaves",
      role: "Founder & CEO -- Orthodontics & Dentofacial Orthopedics",
      image: "/images/team-francisco.jpg",
    },
    {
      name: "Dr. Zaidy Mariela Hernandez Bonilla",
      role: "Founder & Periodontist -- Dental Implants & Oral Rehabilitation",
      image: "/images/team/dr-hernandez.jpg",
    },
    {
      name: "Dra. Joselyn Vargas Boza",
      role: "Dental Surgeon",
      image: "/images/team-member-1.jpg",
    },
  ],
  es: [
    {
      name: "Dr. Francisco Rodriguez Chaves",
      role: "Fundador y Director -- Ortodoncia y Ortopedia Dentofacial",
      image: "/images/team-francisco.jpg",
    },
    {
      name: "Dra. Zaidy Mariela Hernandez Bonilla",
      role: "Fundadora y Periodoncista -- Implantes Dentales y Rehabilitación Oral",
      image: "/images/team/dr-hernandez.jpg",
    },
    {
      name: "Dra. Joselyn Vargas Boza",
      role: "Cirujana Dental",
      image: "/images/team-member-1.jpg",
    },
  ],
};

const technologyData = {
  en: [
    {
      name: "3Shape TRIOS 4",
      desc: "Premium digital intraoral scanner. No messy molds, more accurate results.",
      image: "/images/3shape-trios.jpg",
    },
    {
      name: "CBCT / Panoramic X-Ray",
      desc: "In-house 3D diagnostic imaging for precise treatment planning.",
      image: "/images/xray-machine.jpg",
    },
    {
      name: "BEYOND POLUS ADVANCE",
      desc: "Award-winning whitening system, Top Whitening System winner 8 consecutive years.",
      image: "/images/clinic-treatment-room.jpg",
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
      image: "/images/3shape-trios.jpg",
    },
    {
      name: "CBCT / Radiografía Panorámica",
      desc: "Imágenes diagnósticas 3D en nuestras instalaciones para una planificación de tratamiento precisa.",
      image: "/images/xray-machine.jpg",
    },
    {
      name: "BEYOND POLUS ADVANCE",
      desc: "Sistema de blanqueamiento premiado, ganador del Top Whitening System por 8 años consecutivos.",
      image: "/images/clinic-treatment-room.jpg",
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
          alt="Dr. Francisco Rodriguez treating a patient at Dental City"
          fill
          className="object-cover opacity-30 object-right md:object-center"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32 text-center text-white">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight">
            DENTAL CITY
            <span className="block text-primary-light text-lg md:text-2xl font-normal tracking-[0.3em] mt-2">
              COSTA RICA
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto font-light italic">
            {dict.hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              {dict.hero.bookWhatsApp}
            </a>
            <a
              href="tel:+50624740415"
              className="border-2 border-white/30 hover:border-primary-light text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              {dict.hero.callUs}
            </a>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span>{dict.hero.recommended}</span>
            <span className="hidden sm:inline">|</span>
            <span>{dict.hero.reviews}</span>
            <span className="hidden sm:inline">|</span>
            <span>{dict.hero.experience}</span>
            <span className="hidden sm:inline">|</span>
            <span>{dict.hero.locations}</span>
          </div>
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
            {services.map((svc) => (
              <div
                key={svc.name}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3"><ServiceIcon name={svc.name} /></div>
                <h3 className="font-semibold text-lg text-navy mb-2">
                  {svc.name}
                </h3>
                <p className="text-text-light text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </div>
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
            {technology.map((tech) => (
              <div
                key={tech.name}
                className="group bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-navy mb-1">{tech.name}</h3>
                  <p className="text-text-light text-sm leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </div>
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
                <div className="text-primary text-4xl leading-none mb-3">
                  &ldquo;
                </div>
                <p className="text-text-light text-sm leading-relaxed mb-4">
                  {t.text}
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

      {/* Contact */}
      <section id="contact" className="py-12 md:py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            {dict.contact.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Location 1 - Aguas Zarcas */}
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
                    href="mailto:3dradiologico@gmail.com"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    3dradiologico@gmail.com
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

            {/* Location 2 - Sarapiqui */}
            <div className="bg-navy-light rounded-xl p-5 md:p-8">
              <h3 className="text-xl font-bold text-primary-light mb-6">
                La Virgen, Sarapiqui
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.address}</h4>
                  <p className="text-white/60 text-sm">
                    Edificio Dental City Frente a la Plaza de Deportes, La Virgen, Sarapiqui, Costa Rica, 41002
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.phone}</h4>
                  <a
                    href="tel:+50683883535"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    +506 8388 3535
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">{dict.contact.email}</h4>
                  <a
                    href="mailto:dentalcitycostarica@gmail.com"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    dentalcitycostarica@gmail.com
                  </a>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="tel:+50683883535"
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    {dict.common.callToBook}
                  </a>
                  <a
                    href="https://www.facebook.com/dentalcitysarapiqui"
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
