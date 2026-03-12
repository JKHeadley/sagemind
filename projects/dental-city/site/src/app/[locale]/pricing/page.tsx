import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import EstimateSection from "@/components/EstimateSection";

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
        "Ahorre 50–70% en tratamientos dentales en Costa Rica. Suba su cotización de EE.UU. y obtenga un estimado gratuito con IA.",
    };
  }

  return {
    title: "Pricing | Dental City Costa Rica — Save 50–70%",
    description:
      "Save 50–70% on dental treatment in Costa Rica. Upload your US quote and get a free AI-powered estimate.",
  };
}

const savingsCategories = {
  en: [
    { category: "Dental Implants", savings: "50–65%", icon: "🦷", desc: "Single implants, All-on-4, full-arch rehabilitation" },
    { category: "Crowns & Veneers", savings: "50–75%", icon: "✨", desc: "Porcelain, zirconia, and premium crowns and veneers" },
    { category: "Root Canals", savings: "60–75%", icon: "🔧", desc: "Anterior, premolar, and molar endodontics" },
    { category: "Orthodontics", savings: "70–80%", icon: "😁", desc: "Traditional braces and clear aligners" },
    { category: "Oral Surgery", savings: "55–75%", icon: "⚕️", desc: "Extractions, wisdom teeth, bone grafts" },
    { category: "Cosmetic Dentistry", savings: "45–65%", icon: "💎", desc: "Whitening, smile design, aesthetic treatments" },
  ],
  es: [
    { category: "Implantes Dentales", savings: "50–65%", icon: "🦷", desc: "Implantes individuales, All-on-4, rehabilitación completa" },
    { category: "Coronas y Carillas", savings: "50–75%", icon: "✨", desc: "Coronas y carillas de porcelana, zirconio y premium" },
    { category: "Endodoncias", savings: "60–75%", icon: "🔧", desc: "Endodoncia anterior, premolar y molar" },
    { category: "Ortodoncia", savings: "70–80%", icon: "😁", desc: "Brackets tradicionales y alineadores transparentes" },
    { category: "Cirugía Oral", savings: "55–75%", icon: "⚕️", desc: "Extracciones, cordales, injertos óseos" },
    { category: "Estética Dental", savings: "45–65%", icon: "💎", desc: "Blanqueamiento, diseño de sonrisa, tratamientos estéticos" },
  ],
};

const packagesData = {
  en: [
    {
      name: "Smile Makeover",
      icon: "✨",
      includes: ["6–10 porcelain veneers", "Professional teeth whitening", "Digital smile design", "Follow-up adjustments"],
      duration: "5–7 days",
      startingAt: "$3,090",
    },
    {
      name: "Implant Package",
      icon: "🦷",
      includes: ["Dental implant (titanium)", "Porcelain crown", "CBCT 3D scan", "All follow-up visits"],
      duration: "2 visits (3–4 months apart)",
      startingAt: "$1,765",
    },
    {
      name: "Full Rehabilitation",
      icon: "⭐",
      includes: ["All-on-4 or All-on-6 implants", "Full-arch prosthesis", "CBCT + digital planning", "Temporary prosthesis included"],
      duration: "2–3 visits over 4–6 months",
      startingAt: "$10,850",
    },
  ],
  es: [
    {
      name: "Diseño de Sonrisa",
      icon: "✨",
      includes: ["6–10 carillas de porcelana", "Blanqueamiento profesional", "Diseño digital de sonrisa", "Ajustes de seguimiento"],
      duration: "5–7 días",
      startingAt: "$3,090",
    },
    {
      name: "Paquete de Implantes",
      icon: "🦷",
      includes: ["Implante dental (titanio)", "Corona de porcelana", "Escaneo CBCT 3D", "Todas las visitas de seguimiento"],
      duration: "2 visitas (3–4 meses de diferencia)",
      startingAt: "$1,765",
    },
    {
      name: "Rehabilitación Completa",
      icon: "⭐",
      includes: ["Implantes All-on-4 o All-on-6", "Prótesis de arcada completa", "CBCT + planificación digital", "Prótesis temporal incluida"],
      duration: "2–3 visitas en 4–6 meses",
      startingAt: "$10,850",
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
  const packages = packagesData[locale];
  const savings = savingsCategories[locale];
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
            {isEs ? "Ahorre 50–70% en Tratamientos Dentales" : "Save 50–70% on Dental Treatment"}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {isEs
              ? "Suba su cotización dental de EE.UU. y descubra al instante cuánto puede ahorrar en Dental City, Costa Rica."
              : "Upload your US dental quote and instantly discover how much you can save at Dental City, Costa Rica."}
          </p>
          <a
            href="#estimate"
            className="inline-block mt-6 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {isEs ? "Obtener Estimado Gratis" : "Get Free Estimate"}
          </a>
        </div>
      </section>

      {/* Savings by Category */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {isEs ? "Cuánto Puede Ahorrar" : "How Much You Can Save"}
          </h2>
          <p className="text-text-light text-center mb-10 max-w-2xl mx-auto">
            {isEs
              ? "Pacientes de EE.UU. y Canadá ahorran significativamente en todos los procedimientos dentales."
              : "Patients from the US and Canada save significantly across all dental procedures."}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savings.map((item) => (
              <div key={item.category} className="bg-surface rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-navy text-lg mb-1">{item.category}</h3>
                <p className="text-3xl font-bold text-primary mb-2">{item.savings}</p>
                <p className="text-sm text-text-light">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-light text-center mt-6">
            {isEs
              ? "* Los porcentajes de ahorro son comparados con precios promedio en EE.UU. y pueden variar según el caso."
              : "* Savings percentages are compared to average US prices and may vary based on individual cases."}
          </p>
        </div>
      </section>

      {/* Estimate Tool */}
      <section id="estimate" className="py-12 md:py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {isEs ? "Obtenga su Estimado con IA" : "Get Your AI-Powered Estimate"}
          </h2>
          <p className="text-text-light text-center mb-8 max-w-2xl mx-auto">
            {isEs
              ? "Suba una foto o PDF de su cotización dental de EE.UU. y nuestra IA calculará un estimado aproximado de sus ahorros."
              : "Upload a photo or PDF of your US dental quote and our AI will calculate an approximate estimate of your savings."}
          </p>
          <EstimateSection />
        </div>
      </section>

      {/* Treatment Packages */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            {isEs ? "Paquetes Todo Incluido" : "All-Inclusive Packages"}
          </h2>
          <p className="text-text-light text-center mb-10 max-w-2xl mx-auto">
            {isEs
              ? "Paquetes populares para pacientes internacionales. Precio fijo, sin costos ocultos."
              : "Popular packages for international patients. Fixed price, no hidden costs."}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-surface rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
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
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-10">
            {isEs ? "¿Cómo Funciona?" : "How It Works"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: isEs ? "Suba su cotización" : "Upload Your Quote",
                desc: isEs
                  ? "Suba una foto o PDF de su cotización dental de EE.UU. Nuestra IA la analiza al instante."
                  : "Upload a photo or PDF of your US dental quote. Our AI analyzes it instantly.",
              },
              {
                step: "2",
                title: isEs ? "Vea sus ahorros" : "See Your Savings",
                desc: isEs
                  ? "Reciba un estimado aproximado de cuánto puede ahorrar en Dental City."
                  : "Get an approximate estimate of how much you can save at Dental City.",
              },
              {
                step: "3",
                title: isEs ? "Consulta gratuita" : "Free Consultation",
                desc: isEs
                  ? "Nuestro equipo revisa su caso y le envía un plan de tratamiento detallado."
                  : "Our team reviews your case and sends you a detailed treatment plan.",
              },
              {
                step: "4",
                title: isEs ? "Transforme su sonrisa" : "Transform Your Smile",
                desc: isEs
                  ? "Viaje a Costa Rica y reciba tratamiento de clase mundial."
                  : "Travel to Costa Rica and receive world-class treatment.",
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
            {isEs ? "¿Listo para Ahorrar?" : "Ready to Save?"}
          </h2>
          <p className="text-white/80 mb-8">
            {isEs
              ? "Suba su cotización arriba para un estimado instantáneo, o envíenos sus radiografías por WhatsApp para una cotización personalizada."
              : "Upload your quote above for an instant estimate, or send us your X-rays via WhatsApp for a personalized quote."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#estimate"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              {isEs ? "Subir Cotización" : "Upload Your Quote"}
            </a>
            <a
              href="https://wa.me/50683398833?text=Hi%2C%20I%27d%20like%20a%20free%20quote%20for%20dental%20treatment."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isEs ? "Cotización por WhatsApp" : "Quote via WhatsApp"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
