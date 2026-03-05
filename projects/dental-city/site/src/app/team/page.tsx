import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Team | Dental City Costa Rica",
  description:
    "Meet the experienced dental professionals at Dental City Costa Rica. Our team of UCR-trained specialists is dedicated to providing you with exceptional care.",
};

const team = [
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
];

export default function TeamPage() {
  return (
    <>
      {/* Hero with team photo */}
      <section className="relative bg-navy pt-32 pb-16 text-white text-center">
        <Image
          src="/images/team-photo.jpg"
          alt="Dental City team"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            UCR-trained professionals with over 26 combined years of experience,
            dedicated to your comfort and care.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-16">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Photo */}
              <div className="flex-shrink-0">
                {member.image ? (
                  <div className="relative w-52 h-52 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-52 h-52 rounded-2xl bg-surface flex items-center justify-center shadow-lg">
                    <span className="text-6xl text-primary/40">
                      {member.name[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <h2 className="text-2xl font-bold text-navy">{member.name}</h2>
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
            Ready to Meet Our Team?
          </h2>
          <p className="text-text-light mb-8">
            Schedule a consultation and experience the Dental City difference.
            Our team is here to help you achieve the smile you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Book via WhatsApp
            </a>
            <a
              href="tel:+50624740415"
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
