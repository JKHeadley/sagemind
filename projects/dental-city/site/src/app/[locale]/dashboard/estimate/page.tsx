"use client";

import { useParams } from "next/navigation";
import EstimateCalculator from "@/components/EstimateCalculator";

export default function EstimatePage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        {isEs ? "Herramienta de Estimado" : "Estimate Tool"}
      </h1>
      <p className="text-text-light mb-6">
        {isEs
          ? "Seleccione los procedimientos que necesita, agregue su cotización de EE.UU. si la tiene, y vea cuánto puede ahorrar."
          : "Select the procedures you need, add your US quote if you have one, and see how much you can save."}
      </p>
      <EstimateCalculator />
    </div>
  );
}
