"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import EstimateCalculator from "@/components/EstimateCalculator";
import EstimateUpload from "@/components/EstimateUpload";

export default function EstimatePage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";

  const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual");
  const [parsedItems, setParsedItems] = useState<
    Array<{ procedureName: string; amount: number | null; matchedSlug: string | null }>
  >([]);

  const handleItemsParsed = useCallback(
    (items: Array<{ procedureName: string; amount: number | null; matchedSlug: string | null }>) => {
      setParsedItems(items);
      setActiveTab("manual"); // Switch to calculator to show results
    },
    []
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        {isEs ? "Herramienta de Estimado" : "Estimate Tool"}
      </h1>
      <p className="text-text-light mb-6">
        {isEs
          ? "Seleccione procedimientos manualmente o suba su cotización de EE.UU. para una comparación automática."
          : "Select procedures manually or upload your US estimate for an automatic comparison."}
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy/5 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 text-sm font-medium py-2 px-4 rounded-md transition-colors ${
            activeTab === "manual"
              ? "bg-white text-navy shadow-sm"
              : "text-text-light hover:text-navy"
          }`}
        >
          {isEs ? "Seleccionar Procedimientos" : "Select Procedures"}
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 text-sm font-medium py-2 px-4 rounded-md transition-colors ${
            activeTab === "upload"
              ? "bg-white text-navy shadow-sm"
              : "text-text-light hover:text-navy"
          }`}
        >
          {isEs ? "Subir Cotización" : "Upload Estimate"}
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="mb-6">
          <EstimateUpload onItemsParsed={handleItemsParsed} />
        </div>
      )}

      {activeTab === "manual" && (
        <EstimateCalculator initialItems={parsedItems} />
      )}
    </div>
  );
}
