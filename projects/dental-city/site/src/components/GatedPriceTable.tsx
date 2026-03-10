"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useParams } from "next/navigation";

interface Procedure {
  name: string;
  category: string;
  priceRange: string;
  usPriceRange: string;
  savings: string;
}

// Dental City's actual price list (from procedures table seed data)
const procedures: Record<string, Procedure[]> = {
  en: [
    { name: "Dental Implant (with crown)", category: "Implants", priceRange: "$1,200–$1,800", usPriceRange: "$3,500–$6,000", savings: "60–70%" },
    { name: "All-on-4 Full Arch", category: "Implants", priceRange: "$7,500–$12,000", usPriceRange: "$20,000–$35,000", savings: "55–65%" },
    { name: "Dental Crown (porcelain)", category: "Restorations", priceRange: "$350–$600", usPriceRange: "$1,000–$2,000", savings: "60–70%" },
    { name: "Porcelain Veneer (per tooth)", category: "Aesthetics", priceRange: "$400–$700", usPriceRange: "$800–$2,500", savings: "50–70%" },
    { name: "Root Canal", category: "Endodontics", priceRange: "$290–$500", usPriceRange: "$700–$1,500", savings: "55–65%" },
    { name: "Orthodontics (full treatment)", category: "Orthodontics", priceRange: "$1,500–$3,000", usPriceRange: "$4,000–$8,000", savings: "55–65%" },
    { name: "Teeth Whitening (BEYOND POLUS)", category: "Aesthetics", priceRange: "$200–$350", usPriceRange: "$400–$800", savings: "50–65%" },
    { name: "Dental Bridge (3 unit)", category: "Restorations", priceRange: "$900–$1,800", usPriceRange: "$2,500–$5,000", savings: "55–65%" },
    { name: "Composite Filling", category: "General", priceRange: "$50–$120", usPriceRange: "$150–$450", savings: "60–75%" },
    { name: "Full Denture (per arch)", category: "Prosthetics", priceRange: "$500–$1,000", usPriceRange: "$1,000–$3,000", savings: "50–65%" },
    { name: "Dental Cleaning", category: "General", priceRange: "$50–$80", usPriceRange: "$100–$300", savings: "50–75%" },
    { name: "Simple Extraction", category: "Surgery", priceRange: "$50–$100", usPriceRange: "$150–$350", savings: "65–70%" },
    { name: "Surgical Extraction", category: "Surgery", priceRange: "$100–$250", usPriceRange: "$200–$600", savings: "50–60%" },
    { name: "Bone Graft", category: "Surgery", priceRange: "$200–$500", usPriceRange: "$500–$1,500", savings: "60–65%" },
    { name: "Panoramic X-Ray", category: "Diagnostics", priceRange: "$30–$60", usPriceRange: "$100–$250", savings: "70–75%" },
    { name: "CBCT 3D Scan", category: "Diagnostics", priceRange: "$80–$150", usPriceRange: "$250–$600", savings: "65–75%" },
  ],
  es: [
    { name: "Implante Dental (con corona)", category: "Implantes", priceRange: "$1,200–$1,800", usPriceRange: "$3,500–$6,000", savings: "60–70%" },
    { name: "All-on-4 Arcada Completa", category: "Implantes", priceRange: "$7,500–$12,000", usPriceRange: "$20,000–$35,000", savings: "55–65%" },
    { name: "Corona Dental (porcelana)", category: "Restauraciones", priceRange: "$350–$600", usPriceRange: "$1,000–$2,000", savings: "60–70%" },
    { name: "Carilla de Porcelana (por diente)", category: "Estética", priceRange: "$400–$700", usPriceRange: "$800–$2,500", savings: "50–70%" },
    { name: "Endodoncia", category: "Endodoncia", priceRange: "$290–$500", usPriceRange: "$700–$1,500", savings: "55–65%" },
    { name: "Ortodoncia (tratamiento completo)", category: "Ortodoncia", priceRange: "$1,500–$3,000", usPriceRange: "$4,000–$8,000", savings: "55–65%" },
    { name: "Blanqueamiento Dental (BEYOND POLUS)", category: "Estética", priceRange: "$200–$350", usPriceRange: "$400–$800", savings: "50–65%" },
    { name: "Puente Dental (3 unidades)", category: "Restauraciones", priceRange: "$900–$1,800", usPriceRange: "$2,500–$5,000", savings: "55–65%" },
    { name: "Relleno Compuesto", category: "General", priceRange: "$50–$120", usPriceRange: "$150–$450", savings: "60–75%" },
    { name: "Dentadura Completa (por arcada)", category: "Prótesis", priceRange: "$500–$1,000", usPriceRange: "$1,000–$3,000", savings: "50–65%" },
    { name: "Limpieza Dental", category: "General", priceRange: "$50–$80", usPriceRange: "$100–$300", savings: "50–75%" },
    { name: "Extracción Simple", category: "Cirugía", priceRange: "$50–$100", usPriceRange: "$150–$350", savings: "65–70%" },
    { name: "Extracción Quirúrgica", category: "Cirugía", priceRange: "$100–$250", usPriceRange: "$200–$600", savings: "50–60%" },
    { name: "Injerto Óseo", category: "Cirugía", priceRange: "$200–$500", usPriceRange: "$500–$1,500", savings: "60–65%" },
    { name: "Radiografía Panorámica", category: "Diagnóstico", priceRange: "$30–$60", usPriceRange: "$100–$250", savings: "70–75%" },
    { name: "Tomografía CBCT 3D", category: "Diagnóstico", priceRange: "$80–$150", usPriceRange: "$250–$600", savings: "65–75%" },
  ],
};

export default function GatedPriceTable() {
  const { user, loading } = useAuth();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";
  const prefix = `/${locale}`;
  const data = procedures[locale] || procedures.en;

  // Group by category
  const categories = data.reduce<Record<string, Procedure[]>>((acc, proc) => {
    if (!acc[proc.category]) acc[proc.category] = [];
    acc[proc.category].push(proc);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative">
        {/* Blurred preview */}
        <div className="blur-[6px] pointer-events-none select-none" aria-hidden="true">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-navy/10">
                <th className="py-3 pr-4 text-navy font-semibold text-sm">
                  {isEs ? "Procedimiento" : "Procedure"}
                </th>
                <th className="py-3 px-4 text-navy font-semibold text-sm text-right">
                  {isEs ? "Precio Dental City" : "Dental City Price"}
                </th>
                <th className="py-3 px-4 text-navy font-semibold text-sm text-right">
                  {isEs ? "Precio EE.UU." : "US Price"}
                </th>
                <th className="py-3 pl-4 text-primary font-semibold text-sm text-right">
                  {isEs ? "Ahorro" : "Savings"}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.slice(0, 6).map((proc) => (
                <tr key={proc.name} className="border-b border-navy/5">
                  <td className="py-3 pr-4 font-medium text-navy">{proc.name}</td>
                  <td className="py-3 px-4 text-navy font-semibold text-right">{proc.priceRange}</td>
                  <td className="py-3 px-4 text-text-light text-right line-through decoration-red-300">{proc.usPriceRange}</td>
                  <td className="py-3 pl-4 text-primary font-bold text-right">{proc.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
          <div className="text-center px-6 py-8 max-w-md">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">
              {isEs ? "Cree una Cuenta Gratuita para Ver Nuestros Precios" : "Create a Free Account to See Our Exact Prices"}
            </h3>
            <p className="text-text-light text-sm mb-6">
              {isEs
                ? "Regístrese gratis para acceder a nuestra lista completa de precios, herramienta de estimados y comparaciones personalizadas."
                : "Sign up for free to access our full price list, estimate tool, and personalized comparisons."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`${prefix}/auth/register`}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                {isEs ? "Crear Cuenta Gratis" : "Create Free Account"}
              </Link>
              <Link
                href={`${prefix}/auth/login`}
                className="border border-navy/20 text-navy font-medium px-6 py-2.5 rounded-lg hover:bg-surface transition-colors text-sm"
              >
                {isEs ? "Ya tengo cuenta" : "I Have an Account"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in — show full price list grouped by category
  return (
    <div className="space-y-8">
      {Object.entries(categories).map(([category, procs]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-navy mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            {category}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  <th className="py-2.5 pr-4 text-navy font-semibold text-sm">
                    {isEs ? "Procedimiento" : "Procedure"}
                  </th>
                  <th className="py-2.5 px-4 text-navy font-semibold text-sm text-right">
                    {isEs ? "Precio Dental City" : "Dental City Price"}
                  </th>
                  <th className="py-2.5 px-4 text-navy font-semibold text-sm text-right">
                    {isEs ? "Precio EE.UU." : "US Price"}
                  </th>
                  <th className="py-2.5 pl-4 text-primary font-semibold text-sm text-right">
                    {isEs ? "Ahorro" : "Savings"}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {procs.map((proc) => (
                  <tr key={proc.name} className="border-b border-navy/5 hover:bg-surface/50 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-navy">{proc.name}</td>
                    <td className="py-2.5 px-4 text-navy font-semibold text-right">{proc.priceRange}</td>
                    <td className="py-2.5 px-4 text-text-light text-right line-through decoration-red-300">{proc.usPriceRange}</td>
                    <td className="py-2.5 pl-4 text-primary font-bold text-right">{proc.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="text-xs text-text-light text-center pt-4">
        {isEs
          ? "* Los precios son rangos estimados y pueden variar según la complejidad del caso. Contáctenos para una cotización personalizada."
          : "* Prices are estimated ranges and may vary based on case complexity. Contact us for a personalized quote."}
      </p>
    </div>
  );
}
