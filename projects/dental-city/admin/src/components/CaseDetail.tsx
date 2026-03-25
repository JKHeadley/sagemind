"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { STAFF_MAP, staffDisplayName } from "@/lib/staff";

interface Procedure {
  name: string;
  usPrice: number;
  dcPrice: number;
  confidence: "high" | "medium" | "low";
}

interface SubmissionFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  drive_url: string | null;
  is_generated: boolean;
}

interface Submission {
  id: string;
  created_at: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string | null;
  patient_country: string | null;
  preferred_contact: string | null;
  locale: string;
  status: string;
  assigned_to: string | null;
  notes: string | null;
  last_contacted_at: string | null;
  procedures: Procedure[];
  total_us_price: number;
  total_dc_price: number;
  total_savings: number;
  savings_percentage: number;
  ai_confidence: string | null;
  drive_folder_url: string | null;
  patient_currency: string | null;
  consent_given: boolean;
  consent_timestamp: string | null;
}

const BUFFER = 1.1;

const STATUS_OPTIONS = [
  { value: "new", label: "New", style: "bg-red-100 text-red-700" },
  {
    value: "contacted",
    label: "Contacted",
    style: "bg-yellow-100 text-yellow-700",
  },
  {
    value: "in_progress",
    label: "In Progress",
    style: "bg-blue-100 text-blue-700",
  },
  { value: "booked", label: "Booked", style: "bg-green-100 text-green-700" },
  { value: "closed", label: "Closed", style: "bg-gray-100 text-gray-500" },
  {
    value: "cancelled",
    label: "Cancelled",
    style: "bg-gray-100 text-gray-400",
  },
];

const STAFF_OPTIONS = [
  { value: "", label: "Unassigned" },
  ...Object.entries(STAFF_MAP).map(([email, name]) => ({
    value: email,
    label: name,
  })),
  { value: "other", label: "Other" },
];

const CONFIDENCE_STYLES: Record<string, string> = {
  high: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-red-100 text-red-700",
};

export default function CaseDetail({
  submission,
  files,
  staffEmail,
}: {
  submission: Submission;
  files: SubmissionFile[];
  staffEmail: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(submission.status);
  const [assignedTo, setAssignedTo] = useState(submission.assigned_to || staffEmail || "");
  const [customAssignee, setCustomAssignee] = useState("");
  const [notes, setNotes] = useState(submission.notes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // If the current assigned_to isn't in the preset list, treat it as "other"
  const isCustomAssignee =
    assignedTo !== "" &&
    !STAFF_OPTIONS.some((o) => o.value === assignedTo && o.value !== "other");

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const supabase = createClient();

    const resolvedAssignee =
      assignedTo === "other" ? customAssignee.trim() || null : assignedTo || null;

    const updates: Record<string, unknown> = {
      status,
      notes: notes || null,
      assigned_to: resolvedAssignee,
    };

    // Auto-set last_contacted_at when moving to "contacted"
    if (status === "contacted" && submission.status === "new") {
      updates.last_contacted_at = new Date().toISOString();
    }

    await supabase.from("submissions").update(updates).eq("id", submission.id);

    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
  };

  const procedures = submission.procedures || [];
  const totalUs = procedures.reduce((s, p) => s + p.usPrice, 0);
  const totalDc = procedures.reduce(
    (s, p) => s + Math.round(p.dcPrice * BUFFER),
    0
  );
  const totalSavings = totalUs - totalDc;
  const savingsPct =
    totalUs > 0 ? Math.round((totalSavings / totalUs) * 100) : 0;

  const whatsappNumber = (submission.patient_phone || "").replace(/\D/g, "");

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left: Patient info + procedures */}
      <div className="lg:col-span-2 space-y-6">
        {/* Patient info card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">
            Patient Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="Name" value={submission.patient_name} />
            <Field label="Email" value={submission.patient_email} />
            <Field label="Phone" value={submission.patient_phone || "—"} />
            <Field label="Country" value={submission.patient_country || "—"} />
            <Field
              label="Preferred Contact"
              value={submission.preferred_contact || "email"}
            />
            <Field label="Language" value={submission.locale === "es" ? "Spanish" : "English"} />
            <Field
              label="Submitted"
              value={new Date(submission.created_at).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                timeZone: "America/Costa_Rica",
              })}
            />
            <Field
              label="AI Confidence"
              value={
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    CONFIDENCE_STYLES[submission.ai_confidence || "medium"]
                  }`}
                >
                  {submission.ai_confidence || "unknown"}
                </span>
              }
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-100">
            <a
              href={`https://mail.google.com/mail/?authuser=info@dentalcitycr.com&view=cm&to=${encodeURIComponent(submission.patient_email)}&su=${encodeURIComponent("Your Dental City Estimate")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Email Patient
            </a>
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                WhatsApp
              </a>
            )}
            {submission.drive_folder_url && (
              <a
                href={submission.drive_folder_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                Drive Folder
              </a>
            )}
          </div>
        </div>

        {/* Procedures table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Procedures ({procedures.length})
            </h2>
          </div>

          <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
            <div className="col-span-5">Procedure</div>
            <div className="col-span-2 text-right">US Price</div>
            <div className="col-span-2 text-right">DC Price</div>
            <div className="col-span-2 text-right">Savings</div>
            <div className="col-span-1 text-center">Conf.</div>
          </div>

          {procedures.map((proc, i) => {
            const dc = Math.round(proc.dcPrice * BUFFER);
            const saved = proc.usPrice - dc;
            const pct =
              proc.usPrice > 0
                ? Math.round((saved / proc.usPrice) * 100)
                : 0;
            return (
              <div
                key={i}
                className={`grid grid-cols-12 gap-2 px-5 py-3 text-sm border-b border-gray-50 last:border-0 ${
                  i % 2 === 0 ? "" : "bg-gray-50/50"
                }`}
              >
                <div className="col-span-5 font-medium text-gray-900">
                  {proc.name}
                </div>
                <div className="col-span-2 text-right text-gray-500">
                  ${proc.usPrice.toLocaleString()}
                </div>
                <div className="col-span-2 text-right font-medium text-gray-900">
                  ${dc.toLocaleString()}
                </div>
                <div className="col-span-2 text-right text-green-600 font-medium">
                  ${saved.toLocaleString()} ({pct}%)
                </div>
                <div className="col-span-1 text-center">
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      CONFIDENCE_STYLES[proc.confidence] ||
                      CONFIDENCE_STYLES.medium
                    }`}
                  >
                    {proc.confidence}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Totals */}
          <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-gray-100 font-semibold text-sm">
            <div className="col-span-5 text-gray-900">Total</div>
            <div className="col-span-2 text-right text-gray-500 line-through">
              ${totalUs.toLocaleString()}
            </div>
            <div className="col-span-2 text-right text-gray-900">
              ${totalDc.toLocaleString()}
            </div>
            <div className="col-span-2 text-right text-green-600">
              ${totalSavings.toLocaleString()} ({savingsPct}%)
            </div>
            <div className="col-span-1" />
          </div>
        </div>

        {/* Uploaded files */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">
              Files ({files.length})
            </h2>
            <div className="space-y-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-400">
                      {f.file_type?.includes("pdf") ? "📄" : "🖼️"}
                    </span>
                    <span className="truncate text-gray-700">
                      {f.file_name}
                    </span>
                    {f.is_generated && (
                      <span className="text-[10px] bg-cyan-50 text-cyan-600 px-1.5 py-0.5 rounded">
                        Generated
                      </span>
                    )}
                  </div>
                  {f.drive_url && (
                    <a
                      href={f.drive_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:text-cyan-800 text-xs shrink-0 ml-2"
                    >
                      Open in Drive →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar: Status + Notes */}
      <div className="space-y-6">
        {/* Status & assignment */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Case Management</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Assigned To
              </label>
              <select
                value={isCustomAssignee ? "other" : assignedTo}
                onChange={(e) => {
                  setAssignedTo(e.target.value);
                  if (e.target.value !== "other") setCustomAssignee("");
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {STAFF_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {(assignedTo === "other" || isCustomAssignee) && (
                <input
                  type="text"
                  value={isCustomAssignee && assignedTo !== "other" ? assignedTo : customAssignee}
                  onChange={(e) => {
                    setCustomAssignee(e.target.value);
                    setAssignedTo("other");
                  }}
                  placeholder="Enter name..."
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              )}
            </div>

            {submission.last_contacted_at && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Last Contacted
                </label>
                <p className="text-sm text-gray-700">
                  {new Date(submission.last_contacted_at).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Internal notes */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Internal Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Add notes about this case..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-300 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
        >
          {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
        </button>

        {/* Savings summary */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs text-green-600 font-medium mb-1">
            Patient Savings
          </p>
          <p className="text-3xl font-bold text-green-600">{savingsPct}%</p>
          <p className="text-sm text-green-700 mt-1">
            ${totalSavings.toLocaleString()} saved
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  );
}
