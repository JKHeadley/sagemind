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
  onAuthRequired?: () => void;
}

export default function EstimateUpload({ onItemsParsed, onAuthRequired }: Props) {
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
        if (onAuthRequired) {
          onAuthRequired();
          setStatus("idle");
          return;
        }
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

      if (data.items.length === 0) {
        setStatus("error");
        setErrorMsg(
          isEs
            ? "No pudimos identificar procedimientos dentales en este documento. Intente con una imagen más clara o un PDF de su cotización."
            : "We couldn't identify dental procedures in this document. Try a clearer image or PDF of your dental estimate."
        );
        return;
      }

      setStatus("done");
      onItemsParsed(data.items);
    } catch (err) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("timed out") || msg.includes("took too long")) {
        setErrorMsg(
          isEs
            ? "El análisis tardó demasiado. Intente con un archivo más pequeño o más claro."
            : "Analysis took too long. Please try a smaller or clearer file."
        );
      } else if (msg.includes("Rate limit")) {
        setErrorMsg(
          isEs
            ? "Ha alcanzado el límite diario de 5 estimados. Intente de nuevo mañana."
            : "You've reached the daily limit of 5 estimates. Please try again tomorrow."
        );
      } else {
        setErrorMsg(
          isEs
            ? "No se pudo analizar el documento. Por favor, inténtelo de nuevo."
            : "Failed to analyze your document. Please try again."
        );
      }
    } finally {
      setUploading(false);
    }
  }, [isEs, onItemsParsed, onAuthRequired]);

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
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start justify-between gap-3">
          <span>{errorMsg}</span>
          <button
            onClick={() => { setStatus("idle"); setErrorMsg(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
            className="text-red-600 hover:text-red-800 font-medium whitespace-nowrap text-sm underline"
          >
            {isEs ? "Reintentar" : "Try again"}
          </button>
        </div>
      )}
    </div>
  );
}
