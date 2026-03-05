import Image from "next/image";
import Link from "next/link";

const services = [
  {
    name: "Dental Implants",
    icon: "🦷",
    desc: "Artificial tooth roots that bond with your natural bone, providing a sturdy base for replacement teeth that look and feel natural.",
  },
  {
    name: "Orthodontics",
    icon: "😁",
    desc: "Over 1,500 completed cases. Straighten your teeth and correct bite issues with modern orthodontic treatments from our specialist.",
  },
  {
    name: "Dental Aesthetics",
    icon: "✨",
    desc: "Veneers, whitening with the award-winning BEYOND POLUS system, and cosmetic procedures for the confident smile you deserve.",
  },
  {
    name: "Root Canal",
    icon: "🔬",
    desc: "Save damaged teeth with gentle root canal therapy. We remove infection and seal the tooth to restore its health.",
  },
  {
    name: "Oral Surgery",
    icon: "⚕️",
    desc: "Expert surgical procedures including extractions, bone grafts, and jaw corrections in a comfortable, modern setting.",
  },
  {
    name: "All-on-Four",
    icon: "💎",
    desc: "Full-arch rehabilitation with just four implants. Replace removable dentures with a permanent, natural-feeling bridge.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "1,500+", label: "Orthodontic Cases" },
  { value: "59", label: "Five-Star Reviews" },
  { value: "2", label: "Locations" },
];

const dentists = [
  {
    name: "Dr. Francisco Rodriguez Chaves",
    role: "Founder & CEO -- Orthodontics & Dentofacial Orthopedics",
    image: "/images/team-francisco.jpg",
  },
  {
    name: "Dra. Zaidy Mariela Hernandez Bonilla",
    role: "Founder & Periodontist -- Dental Implants & Oral Rehabilitation",
    image: "/images/team-dra-hernandez.jpg",
  },
  {
    name: "Dr. Luis Alejandro Carvajal Chavarría",
    role: "General Dentist -- Preventive Dentistry",
    image: "/images/team-dr-carvajal.jpg",
  },
];

const technology = [
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
];

const testimonials = [
  {
    text: "I was extremely happy and satisfied with the service and the end results. The staff was very friendly, the doctors took their time with me and I never felt rushed. They carefully reviewed my plan of care along with the costs which was like a quarter of what I was quoted in the US. Their new location is very nice and it makes you feel calmed and relaxed. I highly recommend them!",
    name: "Adriana Headley",
  },
  {
    text: "Tengo anos de hacerme todos mis cuidados dentales y tratamientos con la Doctora Mariela, desde el principio super amable y ademas super cuidadosa con lo que te esta haciendo, y siempre encuentra la manera mas viable para mi. Super recomendada. Excelentes dentistas y seres humanos.",
    name: "Jesse Adler",
  },
  {
    text: "La atencion de parte de todos los funcionarios es excelente, las instalaciones super comodas. Me gustan muchisimo los precios y ademas los resultados son notables.",
    name: "Monse Rojas",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-navy">
        <Image
          src="/images/team-photo.jpg"
          alt="Dental City Costa Rica team"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            DENTAL CITY
            <span className="block text-primary-light text-lg md:text-2xl font-normal tracking-[0.3em] mt-2">
              COSTA RICA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto font-light italic">
            Let Your Smile Change the World
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              Book via WhatsApp
            </a>
            <a
              href="tel:+50624740415"
              className="border-2 border-white/30 hover:border-primary-light text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              Call +506 2474 0415
            </a>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span>100% Recommended</span>
            <span className="hidden sm:inline">|</span>
            <span>59 Reviews</span>
            <span className="hidden sm:inline">|</span>
            <span>15+ Years Experience</span>
            <span className="hidden sm:inline">|</span>
            <span>2 Locations</span>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              About Dental City
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              Founded by two graduates of the University of Costa Rica (UCR),
              Dr. Francisco Rodriguez Chaves and Dr. Zaidy Mariela Hernandez
              Bonilla, Dental City Costa Rica has grown into a trusted name in
              dental care with over 26 combined years of clinical experience.
            </p>
            <p className="text-text-light leading-relaxed mb-4">
              With two locations serving Aguas Zarcas and La Virgen de
              Sarapiqui, we offer a comprehensive range of services from
              routine care and orthodontics to advanced implant procedures,
              full-mouth rehabilitation, and in-house 3D diagnostic imaging.
            </p>
            <p className="text-text-light leading-relaxed">
              Whether you&apos;re a local resident or traveling to Costa Rica for
              affordable, high-quality dental care, our bilingual team is here to
              make your experience comfortable and stress-free.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/team-photo.jpg"
              alt="Dental City team photo"
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
      <section id="services" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">
            Our Services
          </h2>
          <p className="text-text-light text-center mb-12 max-w-2xl mx-auto">
            From preventive care to complex restorations, we offer a full
            spectrum of dental services at a fraction of US prices.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{svc.icon}</div>
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
              href="/services"
              className="inline-block bg-navy hover:bg-navy-light text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">
            Our Technology
          </h2>
          <p className="text-text-light text-center mb-12 max-w-2xl mx-auto">
            We invest in the latest dental technology to deliver more accurate
            diagnoses, more comfortable procedures, and better results.
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
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Our Dentists
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {dentists.map((doc) => (
              <div key={doc.name} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
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
              href="/team"
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              Meet the full team &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            What Our Patients Say
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
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Location 1 - Aguas Zarcas */}
            <div className="bg-navy-light rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-light mb-6">
                Aguas Zarcas (Main)
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">Address</h4>
                  <p className="text-white/60 text-sm">
                    Edificio Dental City, 300 oeste del CTP, Aguas Zarcas, Costa Rica
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">Phone</h4>
                  <a
                    href="tel:+50624740415"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    +506 2474 0415
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">WhatsApp</h4>
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
                  <h4 className="font-semibold text-white/90 mb-1">Email</h4>
                  <a
                    href="mailto:3dradiologico@gmail.com"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    3dradiologico@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">Hours</h4>
                  <div className="text-white/60 space-y-1 text-sm">
                    <p>Mon / Tue / Wed / Fri: 7:30AM - 6PM</p>
                    <p>Thursday: 8AM - 6PM</p>
                    <p>Saturday: 7AM - 1PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/50683398833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    WhatsApp Us
                  </a>
                  <a
                    href="https://www.facebook.com/dentalcityaz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/30 hover:border-primary-light text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Location 2 - Sarapiqui */}
            <div className="bg-navy-light rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-light mb-6">
                La Virgen, Sarapiqui
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">Address</h4>
                  <p className="text-white/60 text-sm">
                    Edificio Dental City Frente a la Plaza de Deportes, La Virgen, Sarapiqui, Costa Rica, 41002
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">Phone</h4>
                  <a
                    href="tel:+50683883535"
                    className="text-white/60 hover:text-primary-light transition-colors text-sm"
                  >
                    +506 8388 3535
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 mb-1">Email</h4>
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
                    Call to Book
                  </a>
                  <a
                    href="https://www.facebook.com/dentalcitysarapiqui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/30 hover:border-primary-light text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Facebook
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
