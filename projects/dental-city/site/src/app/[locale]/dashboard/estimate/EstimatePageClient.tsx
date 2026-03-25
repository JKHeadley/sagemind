"use client";

import { useState } from "react";
import EstimateCalculator from "@/components/EstimateCalculator";
import EstimateSubmitFlow from "@/components/EstimateSubmitFlow";
import type { Dictionary } from "@/i18n/dictionaries";

export default function EstimatePageClient({ dict }: { dict: Dictionary }) {
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("upload");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        {dict.estimatePage.estimateTool}
      </h1>
      <p className="text-text-light mb-6">
        {dict.estimatePage.estimateDescription}
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
          {dict.estimatePage.uploadEstimate}
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 text-sm font-medium py-2 px-4 rounded-md transition-colors ${
            activeTab === "manual"
              ? "bg-white text-navy shadow-sm"
              : "text-text-light hover:text-navy"
          }`}
        >
          {dict.estimatePage.explorePricing}
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="mb-6">
          <EstimateSubmitFlow dict={dict} />
        </div>
      )}

      {activeTab === "manual" && (
        <EstimateCalculator dict={dict} />
      )}
    </div>
  );
}
