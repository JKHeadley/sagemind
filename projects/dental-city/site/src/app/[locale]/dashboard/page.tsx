"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const prefix = `/${locale}`;

  return (
    <div className="min-h-screen bg-surface pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-2">
          {locale === "es" ? "Panel de Control" : "Dashboard"}
        </h1>
        <p className="text-text-light mb-8">
          {locale === "es"
            ? `Bienvenido/a, ${user?.user_metadata?.full_name || user?.email}`
            : `Welcome, ${user?.user_metadata?.full_name || user?.email}`}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-navy text-lg mb-2">
              {locale === "es" ? "Herramienta de Estimado" : "Estimate Tool"}
            </h2>
            <p className="text-text-light text-sm mb-4">
              {locale === "es"
                ? "Compare precios de EE.UU. con los de Dental City y vea cuánto puede ahorrar."
                : "Compare US prices with Dental City and see how much you can save."}
            </p>
            <span className="inline-block bg-gray-100 text-text-light text-xs font-medium px-3 py-1.5 rounded-lg">
              {locale === "es" ? "Próximamente" : "Coming Soon"}
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-navy text-lg mb-2">
              {locale === "es" ? "Precios de Dental City" : "Dental City Pricing"}
            </h2>
            <p className="text-text-light text-sm mb-4">
              {locale === "es"
                ? "Vea nuestra lista completa de precios para todos los procedimientos."
                : "View our full price list for all procedures."}
            </p>
            <Link
              href={`${prefix}/pricing`}
              className="inline-block bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {locale === "es" ? "Ver Precios" : "View Prices"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
