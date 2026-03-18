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
      name: "Dr. Francisco Rodríguez Chaves",
      role: "Founder & CEO",
      specialty: "Orthodontics & Dentofacial Orthopedics",
      image: "/images/team-francisco.jpg",
      bio: "With over 15 years of experience and more than 1,500 orthodontic cases completed, Dr. Rodríguez Chaves is one of Costa Rica's most dedicated orthodontic specialists. A graduate of the University of Costa Rica with advanced certifications in orthodontics from both Costa Rica and Brazil's UniCPO Faculty, he holds an international Pitts 21 certification and has devoted 17 years exclusively to transforming smiles. As co-founder and CEO of Dental City, he brings precision, modern techniques, and a genuinely personal approach to every treatment plan — the same level of care you'd expect at a top North American clinic, at a fraction of the cost. His mission: to eliminate the fear of the dental visit and help every patient rediscover their confidence through a beautiful smile.",
    },
    {
      name: "Dra. Mariela Hernández Bonilla",
      role: "Founder & Oral Surgeon",
      specialty: "Dental Implants, Oral Surgery & Facial Harmonization",
      image: "/images/team-dra-hernandez.jpg",
      bio: "With two decades of clinical excellence, Dra. Hernández Bonilla is the driving force behind Dental City and the specialist international patients trust with their most complex cases. A UCR graduate with advanced implant training from the University of Miami and an active member of the International Congress of Oral Implantologists (ICOI), she brings a rare combination of surgical precision and artistic vision to every procedure. Her expertise spans dental implants, full-mouth rehabilitations, and orofacial harmonization — blending oral health with facial aesthetics for results that go beyond the smile. Patients describe her philosophy best: every detail matters when it comes to your comfort and well-being.",
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
      name: "Dr. Francisco Rodríguez Chaves",
      role: "Fundador y CEO",
      specialty: "Ortodoncia y Ortopedia Dentofacial",
      image: "/images/team-francisco.jpg",
      bio: "Con más de 15 años de experiencia y más de 1,500 casos de ortodoncia completados, el Dr. Rodríguez Chaves es uno de los especialistas en ortodoncia más dedicados de Costa Rica. Graduado de la Universidad de Costa Rica con diplomados avanzados en ortodoncia tanto de Costa Rica como de la Facultad UniCPO de Brasil, posee una certificación internacional Pitts 21 y ha dedicado 17 años exclusivamente a transformar sonrisas. Como cofundador y CEO de Dental City, aporta precisión, técnicas modernas y un enfoque genuinamente personal a cada plan de tratamiento — el mismo nivel de atención que esperaría en una clínica de primer nivel en Norteamérica, a una fracción del costo. Su misión: eliminar el miedo a la visita dental y ayudar a cada paciente a redescubrir su confianza a través de una hermosa sonrisa.",
    },
    {
      name: "Dra. Mariela Hernández Bonilla",
      role: "Fundadora y Cirujana Oral",
      specialty: "Implantes Dentales, Cirugía Oral y Armonización Facial",
      image: "/images/team-dra-hernandez.jpg",
      bio: "Con dos décadas de excelencia clínica, la Dra. Hernández Bonilla es la fuerza detrás de Dental City y la especialista en la que confían los pacientes internacionales para sus casos más complejos. Graduada de la UCR con formación avanzada en implantes de la Universidad de Miami y miembro activo del International Congress of Oral Implantologists (ICOI), aporta una combinación única de precisión quirúrgica y visión artística a cada procedimiento. Su experiencia abarca implantes dentales, rehabilitaciones completas y armonización orofacial — integrando la salud oral con la estética facial para resultados que van más allá de la sonrisa. Sus pacientes describen mejor su filosofía: cada detalle importa cuando se trata de su comodidad y bienestar.",
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{dict.team.pageTitle}</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {dict.team.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-10 md:py-14 bg-surface">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-navy text-center mb-6">
            {dict.team.whyTrustTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(dict.team.whyTrustItems as string[]).map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-navy leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
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
                      | {member.specialty}
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
