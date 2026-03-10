import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import GatedPriceTable from "@/components/GatedPriceTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return {
      title: "Precios | Dental City Costa Rica — Ahorre 50–70%",
      description:
        "Compare precios de tratamientos dentales en EE.UU. vs Costa Rica. Implantes desde $1,200, All-on-4 desde $7,500. Paquetes de turismo dental disponibles.",
    };
  }

  return {
    title: "Pricing | Dental City Costa Rica — Save 50–70%",
    description:
      "Compare US vs Costa Rica dental prices. Implants from $1,200, All-on-4 from $7,500. Dental tourism packages available.",
  };
}

const pricingData = {
  en: [
    { procedure: "Dental Implant (with crown)", us: "$3,500–$6,000", ours: "$1,200–$1,800", save: "60–70%" },
    { procedure: "All-on-4 Full Arch", us: "$20,000–$35,000", ours: "$7,500–$12,000", save: "55–65%" },
    { procedure: "Dental Crown (porcelain)", us: "$1,000–$2,000", ours: "$350–$600", save: "60–70%" },
    { procedure: "Veneer (per tooth)", us: "$800–$2,500", ours: "$400–$700", save: "50–70%" },
    { procedure: "Root Canal", us: "$700–$1,500", ours: "$290–$500", save: "55–65%" },
    { procedure: "Orthodontics (full)", us: "$4,000–$8,000", ours: "$1,500–$3,000", save: "55–65%" },
    { procedure: "Teeth Whitening (BEYOND POLUS)", us: "$400–$800", ours: "$200–$350", save: "50–65%" },
    { procedure: "Dental Bridge (3 unit)", us: "$2,500–$5,000", ours: "$900–$1,800", save: "55–65%" },
    { procedure: "Composite Filling", us: "$150–$450", ours: "$50–$120", save: "60–75%" },
    { procedure: "Full Denture (per arch)", us: "$1,000–$3,000", ours: "$500–$1,000", save: "50–65%" },
  ],
  es: [
    { procedure: "Implante Dental (con corona)", us: "$3,500–$6,000", ours: "$1,200–$1,800", save: "60–70%" },
    { procedure: "All-on-4 Arcada Completa", us: "$20,000–$35,000", ours: "$7,500–$12,000", save: "55–65%" },
    { procedure: "Corona Dental (porcelana)", us: "$1,000–$2,000", ours: "$350–$600", save: "60–70%" },
    { procedure: "Carilla (por diente)", us: "$800–$2,500", ours: "$400–$700", save: "50–70%" },
    { procedure: "Endodoncia", us: "$700–$1,500", ours: "$290–$500", save: "55–65%" },
    { procedure: "Ortodoncia (completa)", us: "$4,000–$8,000", ours: "$1,500–$3,000", save: "55–65%" },
    { procedure: "Blanqueamiento (BEYOND POLUS)", us: "$400–$800", ours: "$200–$350", save: "50–65%" },
    { procedure: "Puente Dental (3 unidades)", us: "$2,500–$5,000", ours: "$900–$1,800", save: "55–65%" },
    { procedure: "Relleno Compuesto", us: "$150–$450", ours: "$50–$120", save: "60–75%" },
    { procedure: "Dentadura Completa (por arcada)", us: "$1,000–$3,000", ours: "$500–$1,000", save: "50–65%" },
  ],
};

const packagesData = {
  en: [
    {
      name: "Smile Makeover",
      icon: "✨",
      includes: ["6–10 porcelain veneers", "Professional teeth whitening", "Digital smile design", "Follow-up adjustments"],
      duration: "5–7 days",
      startingAt: "$3,500",
    },
    {
      name: "Implant Package",
      icon: "🦷",
      includes: ["Dental implant (titanium)", "Porcelain crown", "CBCT 3D scan", "All follow-up visits"],
      duration: "2 visits (3–4 months apart)",
      startingAt: "$1,500",
    },
    {
      name: "Full Rehabilitation",
      icon: "⭐",
      includes: ["All-on-4 or All-on-6 implants", "Full-arch prosthesis", "CBCT + digital planning", "Temporary prosthesis included"],
      duration: "2–3 visits over 4–6 months",
      startingAt: "$7,500",
    },
  ],
  es: [
    {
      name: "Diseño de Sonrisa",
      icon: "✨",
      includes: ["6–10 carillas de porcelana", "Blanqueamiento profesional", "Diseño digital de sonrisa", "Ajustes de seguimiento"],
      duration: "5–7 días",
      startingAt: "$3,500",
    },
    {
      name: "Paquete de Implantes",
      icon: "🦷",
      includes: ["Implante dental (titanio)", "Corona de porcelana", "Escaneo CBCT 3D", "Todas las visitas de seguimiento"],
      duration: "2 visitas (3–4 meses de diferencia)",
      startingAt: "$1,500",
    },
    {
      name: "Rehabilitación Completa",
      icon: "⭐",
      includes: ["Implantes All-on-4 o All-on-6", "Prótesis de arcada completa", "CBCT + planificación digital", "Prótesis temporal incluida"],
      duration: "2–3 visitas en 4–6 meses",
      startingAt: "$7,500",
    },
  ],
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const pricing = pricingData[locale];
  const packages = packagesData[locale];
  const prefix = `/${locale}`;
  const isEs = locale === "es";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-40 md:pb-24 text-white text-center">
        <Image
          src="/images/hero-dental-tech.jpg"
          alt="Dental technology abstract"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {isEs ? "Precios y Paquetes" : "Pricing & Packages"}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {isEs
              ? "Precios transparentes. Sin sorpresas. Ahorre 50–70% comparado con EE.UU. y Canadá."
              : "Transparent pricing. No surprises. Save 50–70% compared to US and Canada."}
          </p>
        </div>
      </section>

      {/* Price Comparison Table */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {isEs ? "Comparación de Precios" : "Price Comparison"}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-2xl mx-auto">
            {isEs
              ? "Vea cuánto puede ahorrar en los procedimientos dentales más comunes."
              : "See how much you can save on the most common dental procedures."}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  <th className="py-3 pr-4 text-navy font-semibold text-sm">
                    {isEs ? "Procedimiento" : "Procedure"}
                  </th>
                  <th className="py-3 px-4 text-navy font-semibold text-sm text-right">
                    {isEs ? "Precio EE.UU." : "US Price"}
                  </th>
                  <th className="py-3 px-4 text-navy font-semibold text-sm text-right">
                    {isEs ? "Nuestro Precio" : "Our Price"}
                  </th>
                  <th className="py-3 pl-4 text-primary font-semibold text-sm text-right">
                    {isEs ? "Ahorro" : "You Save"}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {pricing.map((row) => (
                  <tr key={row.procedure} className="border-b border-navy/5 hover:bg-surface/50 transition-colors">
                    <td className="py-3 pr-4 font-medium text-navy">{row.procedure}</td>
                    <td className="py-3 px-4 text-text-light text-right line-through decoration-red-300">{row.us}</td>
                    <td className="py-3 px-4 text-navy font-semibold text-right">{row.ours}</td>
                    <td className="py-3 pl-4 text-primary font-bold text-right">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-light text-center mt-4">
            {isEs
              ? "* Los precios son estimados y varían según el caso. Contáctenos para una cotización personalizada."
              : "* Prices are estimates and vary by case. Contact us for a personalized quote."}
          </p>
        </div>
      </section>

      {/* Dental City Actual Prices (Gated) */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {isEs ? "Lista de Precios de Dental City" : "Dental City Price List"}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-2xl mx-auto">
            {isEs
              ? "Nuestra lista completa de precios con 16 procedimientos. Cree una cuenta gratuita para ver los precios exactos."
              : "Our full price list with 16 procedures. Create a free account to see exact prices."}
          </p>
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
            <GatedPriceTable />
          </div>
        </div>
      </section>

      {/* Treatment Packages */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {isEs ? "Paquetes de Tratamiento" : "Treatment Packages"}
          </h2>
          <p className="text-text-light text-center mb-10 max-w-2xl mx-auto">
            {isEs
              ? "Paquetes populares para pacientes internacionales. Todo incluido, sin costos ocultos."
              : "Popular packages for international patients. All-inclusive, no hidden costs."}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="text-3xl mb-3">{pkg.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3">{pkg.name}</h3>
                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-light">
                      <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-navy/5 pt-4">
                  <p className="text-xs text-text-light mb-1">
                    {isEs ? "Duración estimada" : "Estimated duration"}: {pkg.duration}
                  </p>
                  <p className="text-2xl font-bold text-navy">
                    {isEs ? "Desde" : "From"} {pkg.startingAt}
                  </p>
                </div>
                <a
                  href={`https://wa.me/50683398833?text=${encodeURIComponent(
                    isEs ? `Hola, me interesa el paquete de ${pkg.name}. ¿Podrían enviarme más información?` : `Hi, I'm interested in the ${pkg.name} package. Could you send me more information?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                >
                  {isEs ? "Solicitar Cotización" : "Get a Quote"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-10">
            {isEs ? "¿Cómo Funciona?" : "How It Works"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: isEs ? "Envíe sus radiografías" : "Send Your X-Rays",
                desc: isEs
                  ? "Envíenos sus radiografías o fotos por WhatsApp. Es gratis y sin compromiso."
                  : "Send us your X-rays or photos via WhatsApp. It's free and no-obligation.",
              },
              {
                step: "2",
                title: isEs ? "Reciba su plan" : "Get Your Plan",
                desc: isEs
                  ? "En 24 horas recibirá un plan de tratamiento detallado con costos claros."
                  : "Within 24 hours you'll receive a detailed treatment plan with clear costs.",
              },
              {
                step: "3",
                title: isEs ? "Reserve su viaje" : "Book Your Trip",
                desc: isEs
                  ? "Reserve sus vuelos y alojamiento. Le ayudamos con recomendaciones locales."
                  : "Book your flights and accommodation. We'll help with local recommendations.",
              },
              {
                step: "4",
                title: isEs ? "Transforme su sonrisa" : "Transform Your Smile",
                desc: isEs
                  ? "Reciba tratamiento de clase mundial y disfrute Costa Rica."
                  : "Get world-class treatment and enjoy Costa Rica.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-text-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {isEs ? "¿Listo para Ahorrar en Su Tratamiento Dental?" : "Ready to Save on Your Dental Treatment?"}
          </h2>
          <p className="text-white/80 mb-8">
            {isEs
              ? "Envíenos sus radiografías por WhatsApp y recibirá una cotización personalizada en menos de 24 horas."
              : "Send us your X-rays via WhatsApp and receive a personalized quote within 24 hours."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/50683398833?text=Hi%2C%20I%27d%20like%20a%20free%20quote%20for%20dental%20treatment."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              {isEs ? "Cotización por WhatsApp" : "Get a Quote via WhatsApp"}
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
