"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { procedures, type Procedure } from "@/lib/procedures";
import type { Dictionary } from "@/i18n/dictionaries";

interface EstimateRow {
  id: string;
  procedureSlug: string;
  quantity: number;
  usQuote: string; // user's actual US quote (optional)
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

interface InitialItem {
  procedureName: string;
  amount: number | null;
  matchedSlug: string | null;
}

export default function EstimateCalculator({ dict, initialItems = [] }: { dict: Dictionary; initialItems?: InitialItem[] }) {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";

  // Group procedures by category for the dropdown
  const groupedOptions = procedures.reduce<Record<string, Procedure[]>>((acc, proc) => {
    const cat = isEs ? proc.categoryEs : proc.categoryEn;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(proc);
    return acc;
  }, {});

  const [rows, setRows] = useState<EstimateRow[]>([
    { id: generateId(), procedureSlug: "", quantity: 1, usQuote: "" },
  ]);

  // Populate from AI upload results
  useEffect(() => {
    if (initialItems.length === 0) return;
    const newRows = initialItems
      .filter((item) => item.matchedSlug)
      .map((item) => ({
        id: generateId(),
        procedureSlug: item.matchedSlug!,
        quantity: 1,
        usQuote: item.amount ? `$${item.amount}` : "",
      }));
    if (newRows.length > 0) {
      setRows(newRows);
    }
  }, [initialItems]);

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

  const getProc = (slug: string): Procedure | undefined =>
    procedures.find((p) => p.slug === slug);

  // Calculate totals
  const selectedRows = rows
    .filter((r) => r.procedureSlug)
    .map((r) => {
      const proc = getProc(r.procedureSlug)!;
      const qty = r.quantity || 1;
      const usQuoteNum = parseFloat(r.usQuote.replace(/[^0-9.]/g, ""));
      const hasUsQuote = !isNaN(usQuoteNum) && usQuoteNum > 0;
      const dcMin = proc.price * qty;
      const dcMax = (proc.priceMax || proc.price) * qty;

      return {
        ...r,
        proc,
        qty,
        dcMin,
        dcMax,
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
        {rows.map((row) => {
          const proc = row.procedureSlug ? getProc(row.procedureSlug) : undefined;
          return (
            <div key={row.id} className="bg-white rounded-xl shadow-sm p-4 md:p-5">
              <div className="flex items-start gap-3">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-5">
                    <label className="block text-xs font-medium text-text-light mb-1">
                      {dict.estimateCalc.procedure}
                    </label>
                    <select
                      value={row.procedureSlug}
                      onChange={(e) => updateRow(row.id, "procedureSlug", e.target.value)}
                      className="w-full border border-navy/15 rounded-lg px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                    >
                      <option value="">{dict.estimateCalc.select}</option>
                      {Object.entries(groupedOptions).map(([cat, procs]) => (
                        <optgroup key={cat} label={cat}>
                          {procs.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              {isEs ? p.nameEs : p.nameEn}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-text-light mb-1">
                      {dict.estimateCalc.qty}
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
                      {dict.estimateCalc.usQuoteOptional}
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
                    {proc && (
                      <div className="text-sm">
                        <span className="text-xs text-text-light block">{dict.estimateCalc.dentalCity}</span>
                        <span className="font-semibold text-navy">
                          {formatCurrency(proc.price * (row.quantity || 1))}
                          {proc.priceMax ? `–${formatCurrency(proc.priceMax * (row.quantity || 1))}` : ""}
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
          );
        })}
      </div>

      <button
        onClick={addRow}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {dict.estimateCalc.addAnother}
      </button>

      {/* Results summary */}
      {hasProcedures && (
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border-2 border-primary/20">
          <h3 className="font-semibold text-navy text-lg mb-4">
            {dict.estimateCalc.estimateSummary}
          </h3>

          {/* Line items */}
          <div className="space-y-2 mb-4 pb-4 border-b border-navy/10">
            {selectedRows.map((row) => (
              <div key={row.id} className="flex justify-between text-sm">
                <span className="text-text-light">
                  {isEs ? row.proc.nameEs : row.proc.nameEn} {row.qty > 1 ? `× ${row.qty}` : ""}
                </span>
                <span className="font-medium text-navy">
                  {formatCurrency(row.dcMin)}{row.dcMin !== row.dcMax ? `–${formatCurrency(row.dcMax)}` : ""}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-xs text-text-light mb-1">
                {dict.estimateCalc.usCost}
              </p>
              <p className="text-lg font-bold text-red-600 line-through decoration-2">
                {formatCurrency(totals.usMin)}{totals.usMin !== totals.usMax ? `–${formatCurrency(totals.usMax)}` : ""}
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-xs text-text-light mb-1">
                {dict.estimateCalc.dentalCityCost}
              </p>
              <p className="text-lg font-bold text-navy">
                {formatCurrency(totals.dcMin)}{totals.dcMin !== totals.dcMax ? `–${formatCurrency(totals.dcMax)}` : ""}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-xs text-text-light mb-1">
                {dict.estimateCalc.estimatedSavings}
              </p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(Math.max(0, savingsMin))}{savingsMin !== savingsMax ? `–${formatCurrency(Math.max(0, savingsMax))}` : ""}
              </p>
            </div>
          </div>

          <p className="text-xs text-text-light mt-4">
            {dict.estimateCalc.preliminaryEstimate}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href={`https://wa.me/50683398833?text=${encodeURIComponent(
                isEs
                  ? `Hola, me gustaría obtener una cotización. Mi estimado incluye: ${selectedRows.map((r) => `${r.proc.nameEs} (×${r.qty})`).join(", ")}. Total estimado: ${formatCurrency(totals.dcMin)}${totals.dcMin !== totals.dcMax ? `–${formatCurrency(totals.dcMax)}` : ""}.`
                  : `Hi, I'd like to get a quote. My estimate includes: ${selectedRows.map((r) => `${r.proc.nameEn} (×${r.qty})`).join(", ")}. Estimated total: ${formatCurrency(totals.dcMin)}${totals.dcMin !== totals.dcMax ? `–${formatCurrency(totals.dcMax)}` : ""}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              {dict.estimateCalc.requestConsultation}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
