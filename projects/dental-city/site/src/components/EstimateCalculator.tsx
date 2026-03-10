"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

interface ProcedureOption {
  slug: string;
  name: string;
  category: string;
  priceMin: number;
  priceMax: number;
  usPriceMin: number;
  usPriceMax: number;
}

interface EstimateRow {
  id: string;
  procedureSlug: string;
  quantity: number;
  usQuote: string; // user's actual US quote (optional)
}

const procedureOptions: Record<string, ProcedureOption[]> = {
  en: [
    { slug: "dental-implant-with-crown", name: "Dental Implant (with crown)", category: "Implants", priceMin: 1200, priceMax: 1800, usPriceMin: 3500, usPriceMax: 6000 },
    { slug: "all-on-4", name: "All-on-4 Full Arch", category: "Implants", priceMin: 7500, priceMax: 12000, usPriceMin: 20000, usPriceMax: 35000 },
    { slug: "dental-crown-porcelain", name: "Dental Crown (porcelain)", category: "Restorations", priceMin: 350, priceMax: 600, usPriceMin: 1000, usPriceMax: 2000 },
    { slug: "veneer-porcelain", name: "Porcelain Veneer (per tooth)", category: "Aesthetics", priceMin: 400, priceMax: 700, usPriceMin: 800, usPriceMax: 2500 },
    { slug: "root-canal", name: "Root Canal", category: "Endodontics", priceMin: 290, priceMax: 500, usPriceMin: 700, usPriceMax: 1500 },
    { slug: "orthodontics-full", name: "Orthodontics (full treatment)", category: "Orthodontics", priceMin: 1500, priceMax: 3000, usPriceMin: 4000, usPriceMax: 8000 },
    { slug: "teeth-whitening", name: "Teeth Whitening (BEYOND POLUS)", category: "Aesthetics", priceMin: 200, priceMax: 350, usPriceMin: 400, usPriceMax: 800 },
    { slug: "dental-bridge-3unit", name: "Dental Bridge (3 unit)", category: "Restorations", priceMin: 900, priceMax: 1800, usPriceMin: 2500, usPriceMax: 5000 },
    { slug: "composite-filling", name: "Composite Filling", category: "General", priceMin: 50, priceMax: 120, usPriceMin: 150, usPriceMax: 450 },
    { slug: "full-denture", name: "Full Denture (per arch)", category: "Prosthetics", priceMin: 500, priceMax: 1000, usPriceMin: 1000, usPriceMax: 3000 },
    { slug: "dental-cleaning", name: "Dental Cleaning", category: "General", priceMin: 50, priceMax: 80, usPriceMin: 100, usPriceMax: 300 },
    { slug: "extraction-simple", name: "Simple Extraction", category: "Surgery", priceMin: 50, priceMax: 100, usPriceMin: 150, usPriceMax: 350 },
    { slug: "extraction-surgical", name: "Surgical Extraction", category: "Surgery", priceMin: 100, priceMax: 250, usPriceMin: 200, usPriceMax: 600 },
    { slug: "bone-graft", name: "Bone Graft", category: "Surgery", priceMin: 200, priceMax: 500, usPriceMin: 500, usPriceMax: 1500 },
    { slug: "panoramic-xray", name: "Panoramic X-Ray", category: "Diagnostics", priceMin: 30, priceMax: 60, usPriceMin: 100, usPriceMax: 250 },
    { slug: "cbct-3d-scan", name: "CBCT 3D Scan", category: "Diagnostics", priceMin: 80, priceMax: 150, usPriceMin: 250, usPriceMax: 600 },
  ],
  es: [
    { slug: "dental-implant-with-crown", name: "Implante Dental (con corona)", category: "Implantes", priceMin: 1200, priceMax: 1800, usPriceMin: 3500, usPriceMax: 6000 },
    { slug: "all-on-4", name: "All-on-4 Arcada Completa", category: "Implantes", priceMin: 7500, priceMax: 12000, usPriceMin: 20000, usPriceMax: 35000 },
    { slug: "dental-crown-porcelain", name: "Corona Dental (porcelana)", category: "Restauraciones", priceMin: 350, priceMax: 600, usPriceMin: 1000, usPriceMax: 2000 },
    { slug: "veneer-porcelain", name: "Carilla de Porcelana (por diente)", category: "Estética", priceMin: 400, priceMax: 700, usPriceMin: 800, usPriceMax: 2500 },
    { slug: "root-canal", name: "Endodoncia", category: "Endodoncia", priceMin: 290, priceMax: 500, usPriceMin: 700, usPriceMax: 1500 },
    { slug: "orthodontics-full", name: "Ortodoncia (tratamiento completo)", category: "Ortodoncia", priceMin: 1500, priceMax: 3000, usPriceMin: 4000, usPriceMax: 8000 },
    { slug: "teeth-whitening", name: "Blanqueamiento Dental (BEYOND POLUS)", category: "Estética", priceMin: 200, priceMax: 350, usPriceMin: 400, usPriceMax: 800 },
    { slug: "dental-bridge-3unit", name: "Puente Dental (3 unidades)", category: "Restauraciones", priceMin: 900, priceMax: 1800, usPriceMin: 2500, usPriceMax: 5000 },
    { slug: "composite-filling", name: "Relleno Compuesto", category: "General", priceMin: 50, priceMax: 120, usPriceMin: 150, usPriceMax: 450 },
    { slug: "full-denture", name: "Dentadura Completa (por arcada)", category: "Prótesis", priceMin: 500, priceMax: 1000, usPriceMin: 1000, usPriceMax: 3000 },
    { slug: "dental-cleaning", name: "Limpieza Dental", category: "General", priceMin: 50, priceMax: 80, usPriceMin: 100, usPriceMax: 300 },
    { slug: "extraction-simple", name: "Extracción Simple", category: "Cirugía", priceMin: 50, priceMax: 100, usPriceMin: 150, usPriceMax: 350 },
    { slug: "extraction-surgical", name: "Extracción Quirúrgica", category: "Cirugía", priceMin: 100, priceMax: 250, usPriceMin: 200, usPriceMax: 600 },
    { slug: "bone-graft", name: "Injerto Óseo", category: "Cirugía", priceMin: 200, priceMax: 500, usPriceMin: 500, usPriceMax: 1500 },
    { slug: "panoramic-xray", name: "Radiografía Panorámica", category: "Diagnóstico", priceMin: 30, priceMax: 60, usPriceMin: 100, usPriceMax: 250 },
    { slug: "cbct-3d-scan", name: "Tomografía CBCT 3D", category: "Diagnóstico", priceMin: 80, priceMax: 150, usPriceMin: 250, usPriceMax: 600 },
  ],
};

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function EstimateCalculator() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";
  const options = procedureOptions[locale] || procedureOptions.en;

  const [rows, setRows] = useState<EstimateRow[]>([
    { id: generateId(), procedureSlug: "", quantity: 1, usQuote: "" },
  ]);

  const addRow = () => {
    setRows([...rows, { id: generateId(), procedureSlug: "", quantity: 1, usQuote: "" }]);
  };

  const removeRow = (id: string) => {
    if (rows.length === 1) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, field: keyof EstimateRow, value: string | number) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  // Calculate totals
  const selectedRows = rows
    .filter((r) => r.procedureSlug)
    .map((r) => {
      const proc = options.find((o) => o.slug === r.procedureSlug)!;
      const qty = r.quantity || 1;
      const usQuoteNum = parseFloat(r.usQuote.replace(/[^0-9.]/g, ""));
      const hasUsQuote = !isNaN(usQuoteNum) && usQuoteNum > 0;

      return {
        ...r,
        proc,
        qty,
        dcMin: proc.priceMin * qty,
        dcMax: proc.priceMax * qty,
        usMin: hasUsQuote ? usQuoteNum : proc.usPriceMin * qty,
        usMax: hasUsQuote ? usQuoteNum : proc.usPriceMax * qty,
        hasUsQuote,
      };
    });

  const totals = selectedRows.reduce(
    (acc, row) => ({
      dcMin: acc.dcMin + row.dcMin,
      dcMax: acc.dcMax + row.dcMax,
      usMin: acc.usMin + row.usMin,
      usMax: acc.usMax + row.usMax,
    }),
    { dcMin: 0, dcMax: 0, usMin: 0, usMax: 0 }
  );

  const savingsMin = totals.usMin - totals.dcMax;
  const savingsMax = totals.usMax - totals.dcMin;
  const hasProcedures = selectedRows.length > 0;

  return (
    <div className="space-y-6">
      {/* Procedure rows */}
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={row.id} className="bg-white rounded-xl shadow-sm p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <label className="block text-xs font-medium text-text-light mb-1">
                    {isEs ? "Procedimiento" : "Procedure"}
                  </label>
                  <select
                    value={row.procedureSlug}
                    onChange={(e) => updateRow(row.id, "procedureSlug", e.target.value)}
                    className="w-full border border-navy/15 rounded-lg px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                  >
                    <option value="">{isEs ? "Seleccione..." : "Select..."}</option>
                    {options.map((opt) => (
                      <option key={opt.slug} value={opt.slug}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-text-light mb-1">
                    {isEs ? "Cantidad" : "Qty"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={32}
                    value={row.quantity}
                    onChange={(e) => updateRow(row.id, "quantity", parseInt(e.target.value) || 1)}
                    className="w-full border border-navy/15 rounded-lg px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-text-light mb-1">
                    {isEs ? "Su cotización EE.UU. (opcional)" : "Your US Quote (optional)"}
                  </label>
                  <input
                    type="text"
                    placeholder="$0.00"
                    value={row.usQuote}
                    onChange={(e) => updateRow(row.id, "usQuote", e.target.value)}
                    className="w-full border border-navy/15 rounded-lg px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="md:col-span-2 flex items-end">
                  {row.procedureSlug && (
                    <div className="text-sm">
                      <span className="text-xs text-text-light block">{isEs ? "Dental City" : "Dental City"}</span>
                      <span className="font-semibold text-navy">
                        {formatCurrency(
                          (options.find((o) => o.slug === row.procedureSlug)?.priceMin || 0) * (row.quantity || 1)
                        )}
                        –
                        {formatCurrency(
                          (options.find((o) => o.slug === row.procedureSlug)?.priceMax || 0) * (row.quantity || 1)
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {rows.length > 1 && (
                <button
                  onClick={() => removeRow(row.id)}
                  className="mt-6 p-1.5 text-text-light hover:text-red-500 transition-colors"
                  aria-label="Remove"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {isEs ? "Agregar otro procedimiento" : "Add another procedure"}
      </button>

      {/* Results summary */}
      {hasProcedures && (
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border-2 border-primary/20">
          <h3 className="font-semibold text-navy text-lg mb-4">
            {isEs ? "Resumen de su Estimado" : "Your Estimate Summary"}
          </h3>

          {/* Line items */}
          <div className="space-y-2 mb-4 pb-4 border-b border-navy/10">
            {selectedRows.map((row) => (
              <div key={row.id} className="flex justify-between text-sm">
                <span className="text-text-light">
                  {row.proc.name} {row.qty > 1 ? `× ${row.qty}` : ""}
                </span>
                <span className="font-medium text-navy">
                  {formatCurrency(row.dcMin)}–{formatCurrency(row.dcMax)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-xs text-text-light mb-1">
                {isEs ? "Costo en EE.UU." : "US Cost"}
              </p>
              <p className="text-lg font-bold text-red-600 line-through decoration-2">
                {formatCurrency(totals.usMin)}–{formatCurrency(totals.usMax)}
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-xs text-text-light mb-1">
                {isEs ? "Costo en Dental City" : "Dental City Cost"}
              </p>
              <p className="text-lg font-bold text-navy">
                {formatCurrency(totals.dcMin)}–{formatCurrency(totals.dcMax)}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-xs text-text-light mb-1">
                {isEs ? "Su Ahorro Estimado" : "Your Estimated Savings"}
              </p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(Math.max(0, savingsMin))}–{formatCurrency(Math.max(0, savingsMax))}
              </p>
            </div>
          </div>

          <p className="text-xs text-text-light mt-4">
            {isEs
              ? "* Este es un estimado preliminar. Los precios finales se determinan después de una consulta con nuestro equipo."
              : "* This is a preliminary estimate. Final prices are determined after a consultation with our team."}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href={`https://wa.me/50683398833?text=${encodeURIComponent(
                isEs
                  ? `Hola, me gustaría obtener una cotización. Mi estimado incluye: ${selectedRows.map((r) => `${r.proc.name} (×${r.qty})`).join(", ")}. Total estimado: ${formatCurrency(totals.dcMin)}–${formatCurrency(totals.dcMax)}.`
                  : `Hi, I'd like to get a quote. My estimate includes: ${selectedRows.map((r) => `${r.proc.name} (×${r.qty})`).join(", ")}. Estimated total: ${formatCurrency(totals.dcMin)}–${formatCurrency(totals.dcMax)}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              {isEs ? "Solicitar Consulta por WhatsApp" : "Get a Consultation via WhatsApp"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
