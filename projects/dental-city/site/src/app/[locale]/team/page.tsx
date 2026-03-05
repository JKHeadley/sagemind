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
      title: "Nuestro Equipo | Dental City Costa Rica",
      description:
        "Conozca a los profesionales dentales experimentados de Dental City Costa Rica. Nuestro equipo de especialistas graduados de la UCR está dedicado a brindarle una atención excepcional.",
    };
  }

  return {
    title: "Our Team | Dental City Costa Rica",
    description:
      "Meet the experienced dental professionals at Dental City Costa Rica. Our team of UCR-trained specialists is dedicated to providing you with exceptional care.",
  };
}

const teamData = {
  en: [
    {
      name: "Dr. Francisco Rodriguez Chaves",
      role: "Founder & CEO",
      specialty: "Orthodontics & Dentofacial Orthopedics",
      image: "/images/team-francisco.jpg",
      bio: "A UCR-trained orthodontist with 11 years of dedicated practice and over 1,500 completed cases, Dr. Rodriguez Chaves co-founded Dental City to bring world-class orthodontic care to patients at a fraction of North American prices. His personalized approach means every treatment plan is crafted specifically for you, using the same modern techniques and technology you'd find in any top US clinic. Patients travel from across the Americas knowing they're in expert hands.",
    },
    {
      name: "Dra. Zaidy Mariela Hernandez Bonilla",
      role: "Founder & Periodontist",
      specialty: "Dental Implants & Oral Rehabilitation",
      image: "/images/team-dra-hernandez.jpg",
      bio: "With 15 years of experience in implant dentistry and aesthetic restorations, Dra. Hernandez Bonilla is the specialist international patients trust for complex dental work. A UCR graduate with advanced training in dental implants, she is known for finding the most effective treatment path for every patient while keeping costs accessible. Her meticulous, compassionate approach has made Dental City a destination for patients seeking implant procedures, full rehabilitations, and smile makeovers they simply couldn't afford back home.",
    },
    {
      name: "Dra. Angie Arcia Umaña",
      role: "Dental Surgeon",
      specialty: "Aesthetic & Functional Dentistry",
      image: "/images/team-dra-arcia.jpg",
      bio: "Dra. Arcia Umaña graduated from the University of Costa Rica and brings 6 years of hands-on experience in aesthetic and functional dentistry. A proud member of the Colegio de Cirujanos Dentistas de Costa Rica, she has a gift for combining beauty and function in every case. Her patients describe her as detail-oriented and genuinely caring, the kind of dentist who makes you feel at ease from the moment you sit down. When she's not transforming smiles, you'll find her exploring Costa Rica's hidden gems or spending time with animals.",
    },
    {
      name: "Dr. Luis Alejandro Carvajal Chavarría",
      role: "General Dentist",
      specialty: "Preventive Dentistry",
      image: "/images/team-dr-carvajal.jpg",
      bio: "A UCR graduate and member of the Colegio de Cirujanos Dentistas de Costa Rica, Dr. Carvajal Chavarría believes the best dental care starts with understanding. He takes time to walk every patient through their diagnosis and treatment options so there are never surprises, only confidence. His focus on preventive dentistry helps patients maintain long-lasting results long after they return home. An avid hiker, he explores a new corner of Costa Rica every month and loves recommending local adventures to visiting patients.",
    },
    {
      name: "Marilyn Fonseca Solis",
      role: "Dental Assistant",
      specialty: null,
      image: "/images/team-marilyn.jpg",
      bio: "Marilyn is the warm, reassuring presence that puts every patient at ease during their visit to Dental City. Currently advancing her dental assistant certification, she is passionate about growing in her field and making sure you feel comfortable, informed, and cared for from start to finish. International patients especially appreciate her attentive, patient-first approach. Outside the clinic, she's an avid football fan and runner.",
    },
    {
      name: "Marlon Granados",
      role: "Patient Coordinator",
      specialty: null,
      image: "/images/team-marlon.jpg",
      bio: "With over 13 years in customer service and 9 years at Dental City, Marlon is the friendly face that greets every patient and the steady hand that keeps everything running smoothly. Certified in customer service, English for services, and IT, he speaks fluent English and goes above and beyond to help international patients feel welcome and taken care of. Currently pursuing a degree in English Education, Marlon is a devoted father who loves cooking, rock music, chess, and hiking Costa Rica's mountains and trails.",
    },
  ],
  es: [
    {
      name: "Dr. Francisco Rodriguez Chaves",
      role: "Fundador y Director",
      specialty: "Ortodoncia y Ortopedia Dentofacial",
      image: "/images/team-francisco.jpg",
      bio: "Ortodoncista graduado de la UCR con 11 años de práctica dedicada y más de 1,500 casos completados, el Dr. Rodriguez Chaves cofundó Dental City para brindar atención ortodóntica de primer nivel a una fracción de los precios en Norteamérica. Su enfoque personalizado significa que cada plan de tratamiento está diseñado específicamente para usted, utilizando las mismas técnicas modernas y tecnología que encontraría en cualquier clínica de primer nivel en EE.UU. Pacientes viajan desde toda América sabiendo que están en manos expertas.",
    },
    {
      name: "Dra. Zaidy Mariela Hernandez Bonilla",
      role: "Fundadora y Periodoncista",
      specialty: "Implantes Dentales y Rehabilitación Oral",
      image: "/images/team-dra-hernandez.jpg",
      bio: "Con 15 años de experiencia en implantología y restauraciones estéticas, la Dra. Hernandez Bonilla es la especialista en la que confían los pacientes internacionales para trabajos dentales complejos. Graduada de la UCR con formación avanzada en implantes dentales, es reconocida por encontrar el camino de tratamiento más efectivo para cada paciente manteniendo los costos accesibles. Su enfoque meticuloso y compasivo ha convertido a Dental City en un destino para pacientes que buscan implantes, rehabilitaciones completas y transformaciones de sonrisa que simplemente no podrían costear en su país.",
    },
    {
      name: "Dra. Angie Arcia Umaña",
      role: "Cirujana Dental",
      specialty: "Odontología Estética y Funcional",
      image: "/images/team-dra-arcia.jpg",
      bio: "La Dra. Arcia Umaña es graduada de la Universidad de Costa Rica y aporta 6 años de experiencia práctica en odontología estética y funcional. Orgullosa miembro del Colegio de Cirujanos Dentistas de Costa Rica, tiene un don para combinar belleza y función en cada caso. Sus pacientes la describen como detallista y genuinamente atenta, el tipo de dentista que te hace sentir cómodo desde el momento en que te sientas. Cuando no está transformando sonrisas, la encontrarás explorando los rincones escondidos de Costa Rica o pasando tiempo con animales.",
    },
    {
      name: "Dr. Luis Alejandro Carvajal Chavarría",
      role: "Odontólogo General",
      specialty: "Odontología Preventiva",
      image: "/images/team-dr-carvajal.jpg",
      bio: "Graduado de la UCR y miembro del Colegio de Cirujanos Dentistas de Costa Rica, el Dr. Carvajal Chavarría cree que la mejor atención dental comienza con el entendimiento. Se toma el tiempo de explicar a cada paciente su diagnóstico y opciones de tratamiento para que nunca haya sorpresas, solo confianza. Su enfoque en odontología preventiva ayuda a los pacientes a mantener resultados duraderos mucho después de regresar a casa. Amante del senderismo, explora un nuevo rincón de Costa Rica cada mes y le encanta recomendar aventuras locales a los pacientes que nos visitan.",
    },
    {
      name: "Marilyn Fonseca Solis",
      role: "Asistente Dental",
      specialty: null,
      image: "/images/team-marilyn.jpg",
      bio: "Marilyn es la presencia cálida y tranquilizadora que pone a cada paciente en confianza durante su visita a Dental City. Actualmente avanzando en su certificación como asistente dental, es apasionada por crecer en su campo y asegurarse de que usted se sienta cómodo, informado y atendido de principio a fin. Los pacientes internacionales especialmente valoran su enfoque atento y centrado en el paciente. Fuera de la clínica, es fanática del fútbol y le encanta correr.",
    },
    {
      name: "Marlon Granados",
      role: "Coordinador de Pacientes",
      specialty: null,
      image: "/images/team-marlon.jpg",
      bio: "Con más de 13 años en servicio al cliente y 9 años en Dental City, Marlon es la cara amable que recibe a cada paciente y la mano firme que mantiene todo funcionando sin problemas. Certificado en servicio al cliente, inglés para servicios e informática, habla inglés con fluidez y hace todo lo posible para que los pacientes internacionales se sientan bienvenidos y atendidos. Actualmente cursando la carrera de Enseñanza del Inglés, Marlon es un padre dedicado al que le apasionan la cocina, la música rock, el ajedrez y las caminatas por las montañas y senderos de Costa Rica.",
    },
  ],
};

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const team = teamData[locale];
  const prefix = `/${locale}`;

  return (
    <>
      {/* Hero with team photo */}
      <section className="relative bg-navy pt-28 pb-12 md:pt-32 md:pb-16 text-white text-center">
        <Image
          src="/images/team-hero.jpg"
          alt="Young patient smiling with dental model at Dental City"
          fill
          className="object-cover opacity-20"
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{dict.team.pageTitle}</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {dict.team.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-10 md:space-y-16">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Photo */}
              <div className="flex-shrink-0">
                {member.image ? (
                  <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl bg-surface flex items-center justify-center shadow-lg">
                    <span className="text-5xl md:text-6xl text-primary/40">
                      {member.name[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-navy">{member.name}</h2>
                <p className="text-primary font-medium mt-1">
                  {member.role}
                  {member.specialty && (
                    <span className="text-text-light">
                      {" "}
                      -- {member.specialty}
                    </span>
                  )}
                </p>
                <p className="text-text-light mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy mb-4">
            {dict.team.ctaTitle}
          </h2>
          <p className="text-text-light mb-8">
            {dict.team.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {dict.common.bookViaWhatsApp}
            </a>
            <a
              href="tel:+50624740415"
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {dict.common.callUs}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
