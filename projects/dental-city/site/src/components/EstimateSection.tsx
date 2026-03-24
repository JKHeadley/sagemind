"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import EstimateUpload from "@/components/EstimateUpload";
import { procedures } from "@/lib/procedures";

interface ParsedItem {
  procedureName: string;
  amount: number | null;
  confidence: "high" | "medium" | "low";
  matchedSlug: string | null;
}

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function EstimateSection() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";
  const prefix = `/${locale}`;
  const { user } = useAuth();

  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [estimate, setEstimate] = useState<{
    usTotal: number;
    dcMin: number;
    dcMax: number;
    savingsMin: number;
    savingsMax: number;
    procedureCount: number;
    matchedCount: number;
  } | null>(null);

  const handleItemsParsed = useCallback((items: ParsedItem[]) => {
    // Calculate totals from parsed items
    let usTotal = 0;
    let dcMin = 0;
    let dcMax = 0;
    let matchedCount = 0;

    for (const item of items) {
      if (item.amount) {
        usTotal += item.amount;
      }

      if (item.matchedSlug) {
        const proc = procedures.find((p) => p.slug === item.matchedSlug);
        if (proc) {
          matchedCount++;
          dcMin += proc.price;
          dcMax += proc.priceMax || proc.price;
        }
      }
    }

    // Add 10% buffer for incidentals
    const dcMinBuffered = dcMin;
    const dcMaxBuffered = Math.round(dcMax * 1.1);

    setEstimate({
      usTotal,
      dcMin: dcMinBuffered,
      dcMax: dcMaxBuffered,
      savingsMin: Math.max(0, usTotal - dcMaxBuffered),
      savingsMax: Math.max(0, usTotal - dcMinBuffered),
      procedureCount: items.length,
      matchedCount,
    });
  }, []);

  const handleAuthRequired = useCallback(() => {
    setShowAuthPrompt(true);
  }, []);

  return (
    <div className="relative">
      {/* Auth prompt overlay */}
      {showAuthPrompt && !user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">
              {isEs ? "Cree una Cuenta" : "Create an Account"}
            </h3>
            <p className="text-text-light text-sm mb-1">
              {isEs
                ? "Regístrese gratis para usar nuestra herramienta de estimados con IA."
                : "Sign up for free to use our AI estimate tool."}
            </p>
            <p className="text-text-light text-sm mb-6">
              {isEs ? "Solo toma 30 segundos." : "It only takes 30 seconds."}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`${prefix}/auth/register`}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                {isEs ? "Crear Cuenta" : "Create an Account"}
              </Link>
              <Link
                href={`${prefix}/auth/login`}
                className="border border-navy/20 text-navy font-medium px-6 py-2.5 rounded-lg hover:bg-surface transition-colors text-sm"
              >
                {isEs ? "Ya tengo cuenta" : "Sign In"}
              </Link>
              <button
                onClick={() => setShowAuthPrompt(false)}
                className="text-text-light text-sm hover:text-navy transition-colors"
              >
                {isEs ? "Cancelar" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload zone */}
      <EstimateUpload
        onItemsParsed={handleItemsParsed}
        onAuthRequired={handleAuthRequired}
      />

      {/* Savings Summary — shown after AI parsing */}
      {estimate && (
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary/20">
          <h3 className="font-bold text-navy text-xl mb-5 text-center">
            {isEs ? "Su Estimado de Ahorros" : "Your Estimated Savings"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* US Cost */}
            <div className="bg-red-50 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-text-light mb-1 uppercase tracking-wide">
                {isEs ? "Su cotización EE.UU." : "Your US Quote"}
              </p>
              <p className="text-2xl font-bold text-red-600 line-through decoration-2">
                {estimate.usTotal > 0 ? formatCurrency(estimate.usTotal) : "—"}
              </p>
            </div>

            {/* DC Estimate */}
            <div className="bg-primary/5 rounded-xl p-5 text-center border-2 border-primary/20">
              <p className="text-xs font-medium text-text-light mb-1 uppercase tracking-wide">
                {isEs ? "Estimado Dental City" : "Dental City Estimate"}
              </p>
              <p className="text-2xl font-bold text-navy">
                {estimate.matchedCount > 0
                  ? `${formatCurrency(estimate.dcMin)}–${formatCurrency(estimate.dcMax)}`
                  : "—"}
              </p>
            </div>

            {/* Savings */}
            <div className="bg-green-50 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-text-light mb-1 uppercase tracking-wide">
                {isEs ? "Ahorro estimado" : "Estimated Savings"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {estimate.savingsMin > 0
                  ? `${formatCurrency(estimate.savingsMin)}–${formatCurrency(estimate.savingsMax)}`
                  : "—"}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
            <p className="text-xs text-amber-800">
              <strong>{isEs ? "Importante:" : "Important:"}</strong>{" "}
              {isEs
                ? "Este es un estimado aproximado generado por IA basado en su cotización. Los precios finales se determinan después de una consulta con nuestro equipo dental, ya que su tratamiento puede requerir procedimientos adicionales según su caso específico. El estimado incluye un 10% de margen para imprevistos."
                : "This is an approximate AI-generated estimate based on your quote. Final pricing is determined after a consultation with our dental team, as your treatment may require additional procedures based on your specific case. The estimate includes a 10% buffer for incidentals."}
            </p>
          </div>

          {/* Info line */}
          {estimate.matchedCount < estimate.procedureCount && (
            <p className="text-xs text-text-light text-center mb-4">
              {isEs
                ? `${estimate.matchedCount} de ${estimate.procedureCount} procedimientos identificados pudieron ser estimados. Para un estimado completo, solicite una consulta.`
                : `${estimate.matchedCount} of ${estimate.procedureCount} identified procedures could be estimated. For a complete estimate, request a consultation.`}
            </p>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/50683398833?text=${encodeURIComponent(
                isEs
                  ? `Hola, acabo de usar su herramienta de estimados y me gustaría obtener una cotización exacta. Mi cotización de EE.UU. es de ${estimate.usTotal > 0 ? formatCurrency(estimate.usTotal) : "N/A"} para ${estimate.procedureCount} procedimiento(s). ¿Podrían ayudarme?`
                  : `Hi, I just used your estimate tool and would like to get an exact quote. My US quote is ${estimate.usTotal > 0 ? formatCurrency(estimate.usTotal) : "N/A"} for ${estimate.procedureCount} procedure(s). Could you help me?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              {isEs ? "Solicitar Cotización Exacta por WhatsApp" : "Get an Exact Quote via WhatsApp"}
            </a>
            <button
              onClick={() => setEstimate(null)}
              className="text-sm text-text-light hover:text-navy transition-colors py-3 px-4"
            >
              {isEs ? "Subir otra cotización" : "Upload another quote"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
