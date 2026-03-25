"use client";

import { useState, useRef, useCallback } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

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
  dict: Dictionary;
  onItemsParsed: (items: ParsedItem[]) => void;
  onAuthRequired?: () => void;
}

export default function EstimateUpload({ dict, onItemsParsed, onAuthRequired }: Props) {
  const t = dict.estimateUpload;

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
      setErrorMsg(t.invalidFileType);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus("error");
      setErrorMsg(t.fileTooLarge);
      return;
    }

    setStatus("uploading");
    setErrorMsg("");
    setResult(null);
    setUploading(true);

    try {
      // Get auth token
      const supabase = (await import("@/lib/supabase/client")).createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (onAuthRequired) {
          onAuthRequired();
          setStatus("idle");
          return;
        }
        setStatus("error");
        setErrorMsg(t.sessionExpiredLogin);
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
        setErrorMsg(t.noProceduresFound);
        return;
      }

      setStatus("done");
      onItemsParsed(data.items);
    } catch (err) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("timed out") || msg.includes("took too long")) {
        setErrorMsg(t.timeoutError);
      } else if (msg.includes("Rate limit")) {
        setErrorMsg(t.rateLimitError);
      } else {
        setErrorMsg(t.failedAnalyze);
      }
    } finally {
      setUploading(false);
    }
  }, [t, onItemsParsed, onAuthRequired]);

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
              {t.uploadUsEstimate}
            </p>
            <p className="text-sm text-text-light">
              {t.dragDrop}
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-medium text-navy">
              {status === "uploading" ? t.uploading : t.analyzing}
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
            {t.tryAgain}
          </button>
        </div>
      )}
    </div>
  );
}
