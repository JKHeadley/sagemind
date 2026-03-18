import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Dental City Costa Rica",
  description:
    "See our modern dental clinic, our team in action, and real before-and-after results at Dental City Costa Rica.",
};

const categories = [
  {
    title: "Before & After",
    images: [
      {
        src: "/images/before-after-1.jpg",
        alt: "Veneers and cosmetic bonding before and after",
        caption: "Veneers / Cosmetic Bonding",
      },
      {
        src: "/images/ortho-before.jpg",
        alt: "Orthodontics treatment before",
        caption: "Orthodontics - Before",
      },
      {
        src: "/images/ortho-after.jpg",
        alt: "Orthodontics treatment after",
        caption: "Orthodontics - After",
      },
      {
        src: "/images/fillings-before.jpg",
        alt: "Composite fillings before",
        caption: "Composite Fillings - Before",
      },
      {
        src: "/images/fillings-after.jpg",
        alt: "Composite fillings after",
        caption: "Composite Fillings - After",
      },
      {
        src: "/images/wisdom-teeth.jpg",
        alt: "Wisdom teeth extraction",
        caption: "Wisdom Teeth Extraction",
      },
    ],
  },
  {
    title: "Our Clinic",
    images: [
      {
        src: "/images/action-shot.jpg",
        alt: "Doctor treating patient in full PPE",
        caption: "Expert Care in Action",
      },
      {
        src: "/images/clinic-treatment-room.jpg",
        alt: "Treatment room with whitening system",
        caption: "Treatment Room",
      },
      {
        src: "/images/xray-machine.jpg",
        alt: "CBCT machine with patient",
        caption: "CBCT 3D Imaging",
      },
      {
        src: "/images/3shape-trios.jpg",
        alt: "Dr. Mariela with digital intraoral scanner",
        caption: "3Shape TRIOS 4 Digital Scanner",
      },
      {
        src: "/images/digital-xray.jpg",
        alt: "Portable digital X-ray setup",
        caption: "Digital X-Ray Technology",
      },
    ],
  },
  {
    title: "Our Team",
    images: [
      {
        src: "/images/team-photo.jpg",
        alt: "Full Dental City team photo",
        caption: "The Dental City Family",
      },
      {
        src: "/images/team-francisco.jpg",
        alt: "Dr. Francisco Rodríguez Chaves",
        caption: "Dr. Francisco Rodríguez Chaves",
      },
      {
        src: "/images/team-dr-carvajal.jpg",
        alt: "Dr. Luis Alejandro Carvajal Chavarría - General Dentist",
        caption: "Dr. Luis Alejandro Carvajal Chavarría",
      },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Real results, real patients. Take a look at our clinic, our team,
            and the smiles we help create every day.
          </p>
        </div>
      </section>

      {/* Gallery by Category */}
      {categories.map((category) => (
        <section key={category.title} className="py-16 bg-surface odd:bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">
              {category.title}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.images.map((img) => (
                <div
                  key={img.src}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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
      ))}

      {/* CTA */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="text-white/80 mb-8">
            These results speak for themselves. Schedule a consultation and let
            us create a personalized plan for your smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              Book via WhatsApp
            </a>
            <a
              href="tel:+50624740415"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Call +506 2474 0415
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
