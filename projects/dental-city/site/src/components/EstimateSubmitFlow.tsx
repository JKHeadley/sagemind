"use client";

import { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { procedures as procedureCatalog } from "@/lib/procedures";
import type { Dictionary } from "@/i18n/dictionaries";

interface ParsedItem {
  procedureName: string;
  amount: number | null;
  originalAmount: number | null;
  originalCurrency: string;
  confidence: "high" | "medium" | "low";
  matchedSlug: string | null;
}

type FlowStep = "upload" | "teaser" | "submitting" | "success";

export default function EstimateSubmitFlow({ dict }: { dict: Dictionary }) {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [step, setStep] = useState<FlowStep>("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([]);
  const [detectedCurrency, setDetectedCurrency] = useState("USD");
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
        setErrorMsg(dict.estimateFlow.sessionExpiredLogin);
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

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            console.error("Parse API error:", response.status, errData);
            setErrorMsg(errData.error || `Analysis failed (${response.status})`);
            setParsing(false);
            return;
          }
          const data = await response.json();
          if (data.currency && data.currency !== "USD") {
            setDetectedCurrency(data.currency);
          }
          if (data.items?.length > 0) {
            allItems.push(...data.items);
          }
        } catch (err) {
          console.error("Parse fetch error:", err);
        }
      }

      if (allItems.length === 0) {
        setErrorMsg(dict.estimateFlow.noProceduresFound);
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
      setErrorMsg(dict.estimateFlow.errorAnalyzing);
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
        setErrorMsg(dict.estimateFlow.sessionExpired);
        setStep("teaser");
        return;
      }

      const submitData = new FormData();
      submitData.append("procedures", JSON.stringify(buildProcedures()));
      submitData.append("consent", "true");
      submitData.append("locale", locale);
      submitData.append("currency", detectedCurrency);

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
            {dict.estimateFlow.uploadDocuments}
          </p>
          <p className="text-sm text-text-light">
            {dict.estimateFlow.uploadHelp}
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
                {dict.estimateFlow.analyzingAi}
              </>
            ) : (
              (files.length > 1 ? dict.estimateFlow.analyzeFiles : dict.estimateFlow.analyzeFile).replace("{count}", String(files.length))
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
            {dict.estimateFlow.basedOnEstimate}
          </p>
          <p className="text-4xl font-bold text-green-600 mb-1">
            {teaser.low}% – {teaser.high}%
          </p>
          <p className="text-sm text-green-600">
            {(teaser.procedureCount > 1 ? dict.estimateFlow.onProcedures : dict.estimateFlow.onProcedure).replace("{count}", String(teaser.procedureCount))}
          </p>
          <p className="text-xs text-text-light mt-3">
            {dict.estimateFlow.exactSavingsDepend}
          </p>
        </div>

        {/* What they get */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-navy/10">
          <h3 className="font-semibold text-navy mb-3">
            {dict.estimateFlow.submitToReceive}
          </h3>
          <ul className="space-y-2 text-sm text-text-light">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {dict.estimateFlow.personalizedEstimate}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {dict.estimateFlow.professionalPdf}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {dict.estimateFlow.medicalTeamReview}
            </li>
          </ul>
        </div>

        {/* Consent checkbox */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-navy/20 text-primary focus:ring-primary/30 shrink-0"
            />
            <span className="text-sm text-text-light leading-relaxed">
              {dict.estimateFlow.consentText}
            </span>
          </label>
          <a
            href={`/${locale}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-primary hover:underline ml-7"
          >
            {dict.estimateFlow.consentPrivacyLink} →
          </a>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!consent}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-navy/20 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {dict.estimateFlow.submitEstimate}
        </button>

        {/* Go back */}
        <button
          onClick={() => { setStep("upload"); setParsedItems([]); setConsent(false); }}
          className="w-full text-sm text-text-light hover:text-navy transition-colors"
        >
          {dict.estimateFlow.backAndChange}
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
          {dict.estimateFlow.submittingEstimate}
        </p>
        <p className="text-sm text-text-light mt-2">
          {dict.estimateFlow.generatingEstimate}
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
        {dict.estimateFlow.estimateSubmitted}
      </h2>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {dict.estimateFlow.teamWillReview}
      </p>
      <a
        href={`/${locale}/dashboard/submission/${submissionId}`}
        className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
      >
        {dict.estimateFlow.viewEstimate}
      </a>
    </div>
  );
}
