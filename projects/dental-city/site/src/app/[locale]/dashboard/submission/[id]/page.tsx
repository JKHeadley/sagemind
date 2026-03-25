"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useDict } from "@/i18n/useDict";

interface Procedure {
  name: string;
  usPrice: number;
  dcPrice: number;
  confidence: "high" | "medium" | "low";
}

interface Submission {
  id: string;
  created_at: string;
  status: string;
  procedures: Procedure[];
  total_us_price: number;
  total_dc_price: number;
  total_savings: number;
  savings_percentage: number;
  patient_name: string;
}

const BUFFER = 1.1;

const statusColors: Record<string, string> = {
  new: "bg-red-100 text-red-700",
  contacted: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  booked: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
  cancelled: "bg-gray-100 text-gray-400",
};

const statusLabels: Record<string, { en: string; es: string }> = {
  new: { en: "Under Review", es: "En Revisión" },
  contacted: { en: "Contacted", es: "Contactado" },
  in_progress: { en: "In Progress", es: "En Proceso" },
  booked: { en: "Booked", es: "Reservado" },
  closed: { en: "Closed", es: "Cerrado" },
  cancelled: { en: "Cancelled", es: "Cancelado" },
};

export default function SubmissionDetailPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const submissionId = params.id as string;
  const isEs = locale === "es";
  const prefix = `/${locale}`;
  const dict = useDict();

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  async function handleDownloadPdf() {
    setDownloading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch(`/api/estimate/pdf?id=${submissionId}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Dental City Estimate - ${submission?.patient_name || "Estimate"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silently fail
    } finally {
      setDownloading(false);
    }
  }

  useEffect(() => {
    async function fetchSubmission() {
      const supabase = createClient();
      const { data, error: dbError } = await supabase
        .from("submissions")
        .select("id, created_at, status, procedures, total_us_price, total_dc_price, total_savings, savings_percentage, patient_name")
        .eq("id", submissionId)
        .single();

      if (dbError || !data) {
        setError(dict.submissionDetail.notFound);
      } else {
        setSubmission(data);
      }
      setLoading(false);
    }
    fetchSubmission();
  }, [submissionId, dict]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="text-center py-12">
        <p className="text-text-light mb-4">{error}</p>
        <Link href={`${prefix}/dashboard`} className="text-primary hover:underline text-sm">
          {dict.submissionDetail.backToDashboard}
        </Link>
      </div>
    );
  }

  const procedures = submission.procedures || [];
  const totalUs = procedures.reduce((s, p) => s + p.usPrice, 0);
  const totalDc = procedures.reduce((s, p) => s + Math.round(p.dcPrice * BUFFER), 0);
  const totalSavings = totalUs - totalDc;
  const savingsPct = totalUs > 0 ? Math.round((totalSavings / totalUs) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href={`${prefix}/dashboard`} className="text-sm text-primary hover:underline mb-2 inline-block">
            {dict.submissionDetail.backToDashboard}
          </Link>
          <h1 className="text-2xl font-bold text-navy">
            {dict.submissionDetail.myEstimate}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[submission.status] || statusColors.new}`}>
              {statusLabels[submission.status]?.[isEs ? "es" : "en"] || submission.status}
            </span>
            <span className="text-sm text-text-light">
              {new Date(submission.created_at).toLocaleDateString(isEs ? "es" : "en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <button
          onClick={handleDownloadPdf}
          disabled={downloading}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {downloading ? dict.submissionDetail.downloading : dict.submissionDetail.downloadPdf}
        </button>
      </div>

      {/* Savings summary */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700 font-medium">
              {dict.submissionDetail.totalEstimatedSavings}
            </p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              ${totalSavings.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-green-600">{savingsPct}%</p>
            <p className="text-xs text-green-600">
              {dict.submissionDetail.savings}
            </p>
          </div>
        </div>
      </div>

      {/* Procedure comparison table */}
      <div className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-navy/10">
          <h2 className="font-semibold text-navy">
            {dict.submissionDetail.priceComparison}
          </h2>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-navy/5 text-xs font-semibold text-navy uppercase tracking-wide">
          <div className="col-span-5">{dict.submissionDetail.procedure}</div>
          <div className="col-span-2 text-right">{dict.submissionDetail.usPrice}</div>
          <div className="col-span-3 text-right">{dict.submissionDetail.dentalCity}</div>
          <div className="col-span-2 text-right">{dict.submissionDetail.savingsCol}</div>
        </div>

        {/* Rows */}
        {procedures.map((proc, i) => {
          const dc = Math.round(proc.dcPrice * BUFFER);
          const saved = proc.usPrice - dc;
          const pct = proc.usPrice > 0 ? Math.round((saved / proc.usPrice) * 100) : 0;
          return (
            <div
              key={i}
              className={`grid grid-cols-12 gap-2 px-5 py-3 text-sm ${
                i % 2 === 0 ? "bg-white" : "bg-surface/50"
              } border-b border-navy/5 last:border-b-0`}
            >
              <div className="col-span-5 text-navy font-medium">{proc.name}</div>
              <div className="col-span-2 text-right text-text-light">
                ${proc.usPrice.toLocaleString()}
              </div>
              <div className="col-span-3 text-right font-semibold text-navy">
                ${dc.toLocaleString()}
              </div>
              <div className="col-span-2 text-right text-green-600 font-semibold">
                {pct}%
              </div>
            </div>
          );
        })}

        {/* Totals */}
        <div className="grid grid-cols-12 gap-2 px-5 py-4 bg-navy/5 font-semibold text-sm">
          <div className="col-span-5 text-navy">
            {dict.submissionDetail.total}
          </div>
          <div className="col-span-2 text-right text-text-light line-through">
            ${totalUs.toLocaleString()}
          </div>
          <div className="col-span-3 text-right text-navy text-base">
            ${totalDc.toLocaleString()}
          </div>
          <div className="col-span-2 text-right text-green-600">
            {savingsPct}%
          </div>
        </div>
      </div>

      {/* What's next */}
      <div className="bg-white rounded-xl shadow-sm border border-navy/10 p-5">
        <h3 className="font-semibold text-navy mb-3">
          {dict.submissionDetail.whatsNext}
        </h3>
        <ul className="space-y-2 text-sm text-text-light">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">1.</span>
            {dict.submissionDetail.teamReview}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">2.</span>
            {dict.submissionDetail.contact4872}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">3.</span>
            {dict.submissionDetail.helpPlan}
          </li>
        </ul>
      </div>
    </div>
  );
}
