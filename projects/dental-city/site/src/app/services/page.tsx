import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dental Services | Dental City Costa Rica",
  description:
    "Comprehensive dental services including implants, crowns, bridges, veneers, root canals, All-on-Four, teeth whitening, and more at Dental City Costa Rica.",
};

const services = [
  {
    name: "Dental Implants",
    description:
      "Think of dental implants as artificial tooth roots, similar in shape to screws. When dental implants are placed in your jawbone, they bond with your natural bone. They become a sturdy base for supporting one or more artificial teeth, called crowns.\n\nModern dental implants have been used successfully for over 30 years. They are the strongest devices available to support replacement teeth and even better, they allow these new teeth to feel, look and function naturally.",
  },
  {
    name: "Dental Fillings",
    description:
      "To treat a cavity your dentist will remove the decayed portion of the tooth and then fill the area on the tooth where the decayed material was removed. Filling material is then inserted where the affected area was and the original shape of the tooth is restored.\n\nFillings are also used to repair cracked or broken teeth and teeth that have been worn down from misuse (such as from nail-biting or tooth grinding).",
  },
  {
    name: "Dental Crowns",
    description:
      "A dental crown is a tooth-shaped cap that is placed over a tooth to cover the tooth to restore its shape and size, strength, and improve its appearance. The crowns, when cemented into place, fully encase the entire visible portion of a tooth that lies at and above the gum line.\n\nA dental crown may be needed to protect a weak tooth from breaking, restore an already broken tooth, cover and support a tooth with a large filling, hold a dental bridge in place, cover misshapen or severely discolored teeth, cover a dental implant, or make a cosmetic modification.",
  },
  {
    name: "Dental Bridges",
    description:
      "A bridge is made up of two or more crowns for the teeth on either side of the gap. These anchoring teeth are called abutment teeth, and the false teeth in between are called pontics. Pontics can be made from gold, alloys, porcelain, or a combination of these materials. Dental bridges are supported by natural teeth or implants.",
  },
  {
    name: "Dental Veneers",
    description:
      "Dental veneers (sometimes called porcelain veneers or dental porcelain laminates) are wafer-thin, custom-made shells of tooth-colored materials designed to cover the front surface of teeth to improve your appearance. These shells are bonded to the front of the teeth changing their color, shape, size, or length.",
  },
  {
    name: "Root Canal",
    description:
      "A root canal is a treatment used to repair and save a tooth that is badly decayed or becomes infected. During a root canal procedure, the nerve and pulp are removed and the inside of the tooth is cleaned and sealed. Without treatment, the tissue surrounding the tooth will become infected and abscesses may form.",
  },
  {
    name: "All-on-Four",
    description:
      "The term All-on-4 refers to all teeth being supported on four dental implants. It is a surgical and prosthetic procedure for total rehabilitation of patients with badly broken down, decayed, or compromised teeth due to gum disease.\n\nIt is a great way to replace removable full dentures with a permanent, non-removable bridge. This alternative creates much more stability and does not allow movement as it is attached to your dental implants. Additionally, you will not have your palate compromised, improving your sense of taste.",
  },
  {
    name: "Orthodontics",
    description:
      "Led by Dr. Francisco Rodríguez Chaves with over 15 years of exclusive orthodontic practice and over 1,500 completed cases. Our orthodontic treatments straighten teeth and correct bite issues using the latest techniques. Whether you need traditional braces or modern aligners, a personalized treatment plan will be created to give you a perfect smile.",
  },
  {
    name: "Periodontics",
    description:
      "Our specialists focus on the prevention, diagnosis, and treatment of gum disease. From deep cleanings to gum surgery, we protect the foundation of your smile: your gums and the bone that supports your teeth.",
  },
  {
    name: "Dental X-Rays & CAT Scans",
    description:
      "Our clinic is equipped with state-of-the-art digital imaging technology including CBCT (cone beam computed tomography) and panoramic X-ray systems. Digital X-ray sensors provide lower radiation exposure, instant results, and higher resolution images for precise diagnosis and treatment planning.",
  },
  {
    name: "Oral Surgery",
    description:
      "Led by Dra. Mariela Hernández Bonilla with 20 years of surgical experience, advanced implant training from the University of Miami, and membership in the International Congress of Oral Implantologists (ICOI). From wisdom tooth extractions to complex surgical procedures, you're in the hands of one of the most experienced oral surgeons in the region.\n\nHer philosophy is simple: every detail matters when it comes to your comfort and well-being. Patients trust her with their most complex cases knowing they'll receive world-class care at a fraction of what they'd pay back home.",
  },
  {
    name: "Facial Harmonization",
    description:
      "Dra. Hernández Bonilla combines her deep expertise in oral surgery with advanced training in orofacial harmonization to offer treatments that go beyond the smile. Using collagen biostimulators and the latest non-surgical techniques, she enhances facial balance and aesthetics for a naturally refreshed appearance.\n\nThis unique combination of dental and facial expertise means your treatment plan considers the complete picture — your smile, your facial structure, and your confidence — all under one roof.",
  },
  {
    name: "Dental Prosthetics",
    description:
      "Custom-crafted dentures, partial dentures, and other prosthetic solutions to restore your smile and chewing function. We use high-quality materials for natural-looking, comfortable results that fit your lifestyle.",
  },
  {
    name: "Teeth Whitening",
    description:
      "We use the BEYOND POLUS ADVANCE whitening system, winner of the Top Whitening System award for 8 consecutive years. This professional-grade system delivers dramatically whiter teeth in a single visit, safely and comfortably.\n\nThe BEYOND POLUS ADVANCE uses a combination of halogen and LED light technology to accelerate the whitening process while minimizing sensitivity. Results are visible immediately, giving you a brighter, more confident smile.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Dental Services
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Comprehensive dental care with modern technology, experienced
            specialists, and prices that make quality accessible to everyone.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-navy mb-3">
                      {svc.name}
                    </h2>
                    {svc.description.split("\n\n").map((p, i) => (
                      <p
                        key={i}
                        className="text-text-light text-sm leading-relaxed mb-3 last:mb-0"
                      >
                        {p}
                      </p>
                    ))}
                    <a
                      href={`https://wa.me/50683398833?text=${encodeURIComponent(`Hi! I'm interested in ${svc.name}. Can I get more information?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Ask about {svc.name}
                    </a>
                  </div>
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
            Ready to Transform Your Smile?
          </h2>
          <p className="text-white/80 mb-8">
            Contact us today for a consultation. Our team will review your needs
            and create a personalized treatment plan, all at a fraction of US costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+50624740415"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Call +506 2474 0415
            </a>
            <Link
              href="/#contact"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              All Locations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
