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
      bio: "Doctor in Odontology and Oral Surgery, University of Costa Rica (UCR) graduate. Dr. Rodriguez Chaves has dedicated 11 years exclusively to orthodontic practice, completing over 1,500 cases. As co-founder and CEO of Dental City, he leads the clinic with a commitment to precision, modern techniques, and personalized treatment plans for every patient.",
    },
    {
      name: "Dr. Zaidy Mariela Hernandez Bonilla",
      role: "Founder & Periodontist",
      specialty: "Dental Implants & Oral Rehabilitation",
      image: "/images/team/dr-hernandez.jpg",
      bio: "Doctor in Odontology and Oral Surgery, University of Costa Rica (UCR) graduate. With specialized training in dental implants and 15 years of experience in aesthetic and restorative dentistry, Dr. Hernandez Bonilla brings a meticulous, compassionate approach to every procedure. She is known for always finding the most viable treatment path for each patient.",
    },
    {
      name: "Dra. Joselyn Vargas Boza",
      role: "Dental Surgeon",
      specialty: "General Dentistry",
      image: "/images/team-member-1.jpg",
      bio: "University of Costa Rica (UCR) graduate. Dra. Vargas Boza provides comprehensive dental care from routine exams and cleanings to complex procedures. Known for her gentle touch and patient-first approach, she ensures every visit is comfortable and productive.",
    },
    {
      name: "Dr. Luis Alejandro Carvajal",
      role: "Dentist",
      specialty: "General Dentistry",
      image: "/images/team-dr-carvajal.jpg",
      bio: "University of Costa Rica (UCR) graduate. Dr. Carvajal joined the Dental City team in October 2025, bringing fresh expertise and a dedication to quality patient care across a wide range of dental treatments.",
    },
    {
      name: "Deinny Alvarez",
      role: "Dental Assistant & Head of Radiological Center",
      specialty: null,
      image: "/images/team-deinny.jpg",
      bio: "With over 11 years at Dental City, Deinny is a cornerstone of the team. She manages the dental imaging center and clinical photography, ensuring every scan and image meets the highest diagnostic standards. Her experience and dedication are invaluable to the quality of care the clinic provides.",
    },
    {
      name: "Marlon Alvarez",
      role: "Patient Coordinator & General Manager",
      specialty: null,
      image: null,
      bio: "Marlon keeps Dental City running smoothly. From scheduling appointments and coordinating patient care to managing day-to-day operations, he ensures every visit is seamless from start to finish. He is often the first friendly face you will meet at the clinic.",
    },
  ],
  es: [
    {
      name: "Dr. Francisco Rodriguez Chaves",
      role: "Fundador y Director",
      specialty: "Ortodoncia y Ortopedia Dentofacial",
      image: "/images/team-francisco.jpg",
      bio: "Doctor en Odontología y Cirugía Oral, graduado de la Universidad de Costa Rica (UCR). El Dr. Rodriguez Chaves ha dedicado 11 años exclusivamente a la práctica ortodóntica, completando más de 1,500 casos. Como cofundador y director de Dental City, lidera la clínica con un compromiso con la precisión, técnicas modernas y planes de tratamiento personalizados para cada paciente.",
    },
    {
      name: "Dra. Zaidy Mariela Hernandez Bonilla",
      role: "Fundadora y Periodoncista",
      specialty: "Implantes Dentales y Rehabilitación Oral",
      image: "/images/team/dr-hernandez.jpg",
      bio: "Doctora en Odontología y Cirugía Oral, graduada de la Universidad de Costa Rica (UCR). Con formación especializada en implantes dentales y 15 años de experiencia en odontología estética y restaurativa, la Dra. Hernandez Bonilla aporta un enfoque meticuloso y compasivo a cada procedimiento. Es conocida por siempre encontrar el camino de tratamiento más viable para cada paciente.",
    },
    {
      name: "Dra. Joselyn Vargas Boza",
      role: "Cirujana Dental",
      specialty: "Odontología General",
      image: "/images/team-member-1.jpg",
      bio: "Graduada de la Universidad de Costa Rica (UCR). La Dra. Vargas Boza brinda atención dental integral desde exámenes de rutina y limpiezas hasta procedimientos complejos. Conocida por su toque suave y enfoque centrado en el paciente, se asegura de que cada visita sea cómoda y productiva.",
    },
    {
      name: "Dr. Luis Alejandro Carvajal",
      role: "Dentista",
      specialty: "Odontología General",
      image: "/images/team-dr-carvajal.jpg",
      bio: "Graduado de la Universidad de Costa Rica (UCR). El Dr. Carvajal se unió al equipo de Dental City en octubre de 2025, aportando experiencia fresca y una dedicación a la atención de calidad al paciente en una amplia gama de tratamientos dentales.",
    },
    {
      name: "Deinny Alvarez",
      role: "Asistente Dental y Jefa del Centro Radiológico",
      specialty: null,
      image: "/images/team-deinny.jpg",
      bio: "Con más de 11 años en Dental City, Deinny es un pilar del equipo. Administra el centro de imágenes dentales y la fotografía clínica, asegurando que cada escaneo e imagen cumpla con los más altos estándares diagnósticos. Su experiencia y dedicación son invaluables para la calidad de atención que brinda la clínica.",
    },
    {
      name: "Marlon Alvarez",
      role: "Coordinador de Pacientes y Gerente General",
      specialty: null,
      image: null,
      bio: "Marlon mantiene Dental City funcionando sin problemas. Desde la programación de citas y la coordinación de la atención al paciente hasta la gestión de las operaciones diarias, se asegura de que cada visita sea fluida de principio a fin. A menudo es la primera cara amable que encontrará en la clínica.",
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
