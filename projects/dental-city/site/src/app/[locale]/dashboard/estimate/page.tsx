"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import EstimateCalculator from "@/components/EstimateCalculator";
import EstimateSubmitFlow from "@/components/EstimateSubmitFlow";

export default function EstimatePage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";

  const [activeTab, setActiveTab] = useState<"manual" | "upload">("upload");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        {isEs ? "Herramienta de Estimado" : "Estimate Tool"}
      </h1>
      <p className="text-text-light mb-6">
        {isEs
          ? "Suba su cotización dental para una comparación de ahorro personalizada, o explore nuestros precios manualmente."
          : "Upload your dental estimate for a personalized savings comparison, or explore our pricing manually."}
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy/5 rounded-lg p-1 mb-6">
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
        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 text-sm font-medium py-2 px-4 rounded-md transition-colors ${
            activeTab === "manual"
              ? "bg-white text-navy shadow-sm"
              : "text-text-light hover:text-navy"
          }`}
        >
          {isEs ? "Explorar Precios" : "Explore Pricing"}
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="mb-6">
          <EstimateSubmitFlow />
        </div>
      )}

      {activeTab === "manual" && (
        <EstimateCalculator />
      )}
    </div>
  );
}
