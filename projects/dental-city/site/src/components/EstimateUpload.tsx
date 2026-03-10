"use client";

import { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface ParsedItem {
  procedureName: string;
  amount: number | null;
  confidence: "high" | "medium" | "low";
  matchedSlug: string | null;
}

interface ParseResult {
  items: ParsedItem[];
  warnings: string[];
}

interface Props {
  onItemsParsed: (items: ParsedItem[]) => void;
}

export default function EstimateUpload({ onItemsParsed }: Props) {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isEs = locale === "es";

  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "parsing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setStatus("error");
      setErrorMsg(isEs ? "Tipo de archivo no válido. Use JPG, PNG, WebP o PDF." : "Invalid file type. Use JPG, PNG, WebP, or PDF.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus("error");
      setErrorMsg(isEs ? "Archivo muy grande. Máximo 10MB." : "File too large. Maximum 10MB.");
      return;
    }

    setStatus("uploading");
    setErrorMsg("");
    setResult(null);
    setUploading(true);

    try {
      // Get auth token
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setStatus("error");
        setErrorMsg(isEs ? "Sesión expirada. Inicie sesión de nuevo." : "Session expired. Please log in again.");
        return;
      }

      setStatus("parsing");

      // Send to parse API
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/estimate/parse", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Upload failed");
      }

      const data: ParseResult = await response.json();
      setResult(data);
      setStatus("done");

      // Auto-populate the calculator with matched items
      if (data.items.length > 0) {
        onItemsParsed(data.items);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setUploading(false);
    }
  }, [isEs, onItemsParsed]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const confidenceColor = (c: string) => {
    if (c === "high") return "text-green-600 bg-green-50";
    if (c === "medium") return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-navy/15 hover:border-primary/50 hover:bg-surface"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />

        {status === "idle" || status === "error" || status === "done" ? (
          <>
            <svg className="w-10 h-10 text-text-light mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="font-medium text-navy mb-1">
              {isEs ? "Suba su cotización dental de EE.UU." : "Upload your US dental estimate"}
            </p>
            <p className="text-sm text-text-light">
              {isEs
                ? "Arrastre aquí o haga clic para seleccionar. JPG, PNG, WebP o PDF (máx 10MB)"
                : "Drag & drop or click to select. JPG, PNG, WebP, or PDF (max 10MB)"}
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-medium text-navy">
              {status === "uploading"
                ? (isEs ? "Subiendo..." : "Uploading...")
                : (isEs ? "Analizando su estimado con IA..." : "Analyzing your estimate with AI...")}
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      {/* Results */}
      {result && result.items.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
          <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {isEs
              ? `${result.items.length} procedimientos encontrados`
              : `${result.items.length} procedures found`}
          </h4>
          <div className="space-y-2">
            {result.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-navy/5 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${confidenceColor(item.confidence)}`}>
                    {item.confidence}
                  </span>
                  <span className="text-navy">{item.procedureName}</span>
                  {item.matchedSlug && (
                    <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-navy">
                  {item.amount ? `$${item.amount.toLocaleString()}` : "—"}
                </span>
              </div>
            ))}
          </div>
          {result.warnings.length > 0 && (
            <div className="mt-3 text-xs text-text-light">
              {result.warnings.map((w, i) => (
                <p key={i}>* {w}</p>
              ))}
            </div>
          )}
          <p className="text-xs text-primary mt-3 font-medium">
            {isEs
              ? "Los procedimientos encontrados se agregaron al calculador abajo."
              : "Found procedures have been added to the calculator below."}
          </p>
        </div>
      )}
    </div>
  );
}
