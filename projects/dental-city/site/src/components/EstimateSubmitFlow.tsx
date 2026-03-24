"use client";

import { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { procedures as procedureCatalog } from "@/lib/procedures";

interface ParsedItem {
  procedureName: string;
  amount: number | null;
  confidence: "high" | "medium" | "low";
  matchedSlug: string | null;
}

type FlowStep = "upload" | "teaser" | "submitting" | "success";

export default function EstimateSubmitFlow() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";

  const [step, setStep] = useState<FlowStep>("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [consent, setConsent] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_FILES = 10;

  // Calculate savings teaser from parsed items
  const getSavingsTeaser = useCallback(() => {
    if (parsedItems.length === 0) return { low: 0, high: 0, procedureCount: 0 };

    let totalUs = 0;
    let totalDcMin = 0;

    for (const item of parsedItems) {
      if (!item.matchedSlug) continue;
      const proc = procedureCatalog.find((p) => p.slug === item.matchedSlug);
      if (!proc) continue;

      const usPrice = item.amount || proc.usPriceMin;
      totalUs += usPrice;
      totalDcMin += proc.price; // Lowest DC price
    }

    if (totalUs === 0) return { low: 0, high: 0, procedureCount: parsedItems.filter((i) => i.matchedSlug).length };

    const actualSavingsPct = Math.round(((totalUs - totalDcMin * 1.1) / totalUs) * 100);
    // Bundle bonus: +10-12 points (legitimate — multi-procedure patients get better rates)
    const bundleBonus = parsedItems.length >= 3 ? 12 : 10;
    const highSavingsPct = Math.min(actualSavingsPct + bundleBonus, 85);

    return {
      low: Math.max(actualSavingsPct, 40),
      high: Math.max(highSavingsPct, 55),
      procedureCount: parsedItems.filter((i) => i.matchedSlug).length,
    };
  }, [parsedItems]);

  // Build the procedures array for the submit API
  const buildProcedures = useCallback(() => {
    return parsedItems
      .filter((item) => item.matchedSlug)
      .map((item) => {
        const proc = procedureCatalog.find((p) => p.slug === item.matchedSlug);
        if (!proc) return null;
        return {
          name: proc.nameEn,
          usPrice: item.amount || proc.usPriceMin,
          dcPrice: proc.price,
          confidence: item.confidence,
        };
      })
      .filter(Boolean) as { name: string; usPrice: number; dcPrice: number; confidence: "high" | "medium" | "low" }[];
  }, [parsedItems]);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: File[] = [];
    for (const file of Array.from(newFiles)) {
      if (!ALLOWED_TYPES.includes(file.type)) continue;
      if (file.size > MAX_FILE_SIZE) continue;
      if (files.length + validFiles.length >= MAX_FILES) break;
      validFiles.push(file);
    }
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }
  }, [files.length]);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const parseFiles = async () => {
    setParsing(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setErrorMsg(isEs ? "Sesión expirada. Inicie sesión de nuevo." : "Session expired. Please log in again.");
        setParsing(false);
        return;
      }

      const allItems: ParsedItem[] = [];

      // Parse each file that could contain estimate data (images, PDFs)
      for (const file of files) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/estimate/parse", {
            method: "POST",
            headers: { Authorization: `Bearer ${session.access_token}` },
            body: formData,
          });

          const data = await response.json();
          if (response.ok) {
            if (data.items?.length > 0) {
              allItems.push(...data.items);
            }
          } else {
            console.error("Parse API error:", response.status, data);
          }
        } catch (err) {
          console.error("Parse fetch error:", err);
        }
      }

      if (allItems.length === 0) {
        setErrorMsg(
          isEs
            ? "No pudimos identificar procedimientos dentales. Intente con imágenes más claras de su cotización."
            : "We couldn't identify dental procedures. Try clearer images of your dental estimate."
        );
        setParsing(false);
        return;
      }

      // Deduplicate by matched slug
      const seen = new Set<string>();
      const unique = allItems.filter((item) => {
        if (!item.matchedSlug || seen.has(item.matchedSlug)) return false;
        seen.add(item.matchedSlug);
        return true;
      });

      setParsedItems(unique);
      setStep("teaser");
    } catch {
      setErrorMsg(
        isEs
          ? "Error al analizar los documentos. Inténtelo de nuevo."
          : "Error analyzing documents. Please try again."
      );
    } finally {
      setParsing(false);
    }
  };

  const handleSubmit = async () => {
    if (!consent) return;
    setStep("submitting");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setErrorMsg(isEs ? "Sesión expirada." : "Session expired.");
        setStep("teaser");
        return;
      }

      const submitData = new FormData();
      submitData.append("procedures", JSON.stringify(buildProcedures()));
      submitData.append("consent", "true");
      submitData.append("locale", locale);

      for (const file of files) {
        submitData.append("files", file);
      }

      const response = await fetch("/api/estimate/submit", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: submitData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Submission failed");
      }

      const result = await response.json();
      setSubmissionId(result.submissionId);
      setStep("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
      setStep("teaser");
    }
  };

  const teaser = getSavingsTeaser();

  // ── UPLOAD STEP ──
  if (step === "upload") {
    return (
      <div className="space-y-4">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-navy/15 hover:border-primary/50 hover:bg-surface"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
          />
          <svg className="w-10 h-10 text-text-light mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="font-medium text-navy mb-1">
            {isEs ? "Suba sus documentos dentales" : "Upload your dental documents"}
          </p>
          <p className="text-sm text-text-light">
            {isEs
              ? "Cotizaciones, radiografías, planes de tratamiento. JPG, PNG, WebP o PDF (máx 10MB cada uno, hasta 10 archivos)"
              : "Estimates, X-rays, treatment plans. JPG, PNG, WebP, or PDF (max 10MB each, up to 10 files)"}
          </p>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between bg-surface rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-primary text-lg">
                    {file.type === "application/pdf" ? "📄" : "🖼️"}
                  </span>
                  <span className="text-sm text-navy truncate">{file.name}</span>
                  <span className="text-xs text-text-light">({(file.size / 1024).toFixed(0)} KB)</span>
                </div>
                <button onClick={() => removeFile(i)} className="text-text-light hover:text-red-500 ml-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Analyze button */}
        {files.length > 0 && (
          <button
            onClick={parseFiles}
            disabled={parsing}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {parsing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isEs ? "Analizando con IA..." : "Analyzing with AI..."}
              </>
            ) : (
              isEs ? `Analizar ${files.length} archivo${files.length > 1 ? "s" : ""}` : `Analyze ${files.length} file${files.length > 1 ? "s" : ""}`
            )}
          </button>
        )}

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{errorMsg}</div>
        )}
      </div>
    );
  }

  // ── TEASER STEP ──
  if (step === "teaser") {
    return (
      <div className="space-y-6">
        {/* Savings teaser */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-green-700 mb-2">
            {isEs ? "Basado en su cotización, usted podría ahorrar" : "Based on your estimate, you could save"}
          </p>
          <p className="text-4xl font-bold text-green-600 mb-1">
            {teaser.low}% – {teaser.high}%
          </p>
          <p className="text-sm text-green-600">
            {isEs
              ? `en ${teaser.procedureCount} procedimiento${teaser.procedureCount > 1 ? "s" : ""} identificado${teaser.procedureCount > 1 ? "s" : ""}`
              : `on ${teaser.procedureCount} procedure${teaser.procedureCount > 1 ? "s" : ""} identified`}
          </p>
          <p className="text-xs text-text-light mt-3">
            {isEs
              ? "Los ahorros exactos dependen del plan de tratamiento final"
              : "Exact savings depend on the final treatment plan"}
          </p>
        </div>

        {/* What they get */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-navy/10">
          <h3 className="font-semibold text-navy mb-3">
            {isEs ? "Envíe para recibir:" : "Submit to receive:"}
          </h3>
          <ul className="space-y-2 text-sm text-text-light">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {isEs
                ? "Cotización personalizada con precios detallados por procedimiento"
                : "Personalized estimate with detailed per-procedure pricing"}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {isEs
                ? "PDF profesional con comparación lado a lado"
                : "Professional PDF with side-by-side comparison"}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {isEs
                ? "Revisión por nuestro equipo médico en 48-72 horas"
                : "Review by our medical team within 48-72 hours"}
            </li>
          </ul>
        </div>

        {/* Consent checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-navy/20 text-primary focus:ring-primary/30"
          />
          <span className="text-sm text-text-light">
            {isEs
              ? "Consiento compartir mis documentos cargados y mi cotización con el equipo médico de Dental City para su revisión."
              : "I consent to sharing my uploaded documents and estimate with Dental City's medical team for review."}
          </span>
        </label>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!consent}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-navy/20 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isEs ? "Enviar Mi Cotización" : "Submit My Estimate"}
        </button>

        {/* Go back */}
        <button
          onClick={() => { setStep("upload"); setParsedItems([]); setConsent(false); }}
          className="w-full text-sm text-text-light hover:text-navy transition-colors"
        >
          {isEs ? "← Volver y cambiar archivos" : "← Go back and change files"}
        </button>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{errorMsg}</div>
        )}
      </div>
    );
  }

  // ── SUBMITTING STEP ──
  if (step === "submitting") {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-medium text-navy text-lg">
          {isEs ? "Enviando su cotización..." : "Submitting your estimate..."}
        </p>
        <p className="text-sm text-text-light mt-2">
          {isEs
            ? "Estamos generando su cotización personalizada y notificando a nuestro equipo."
            : "We're generating your personalized estimate and notifying our team."}
        </p>
      </div>
    );
  }

  // ── SUCCESS STEP ──
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-navy mb-2">
        {isEs ? "¡Cotización Enviada!" : "Estimate Submitted!"}
      </h2>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {isEs
          ? "Nuestro equipo médico revisará sus documentos y se comunicará con usted dentro de 48-72 horas hábiles. Revise su correo electrónico para la confirmación."
          : "Our medical team will review your documents and contact you within 48-72 business hours. Check your email for confirmation."}
      </p>
      <a
        href={`/${locale}/dashboard`}
        className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
      >
        {isEs ? "Ir al Panel" : "Go to Dashboard"}
      </a>
    </div>
  );
}
