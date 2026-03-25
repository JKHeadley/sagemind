"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { staffDisplayName } from "@/lib/staff";

interface Submission {
  id: string;
  created_at: string;
  patient_name: string;
  patient_email: string;
  patient_country: string | null;
  status: string;
  assigned_to: string | null;
  total_us_price: number;
  total_dc_price: number;
  total_savings: number;
  savings_percentage: number;
  procedures: { name: string }[];
  ai_confidence: string | null;
  preferred_contact: string | null;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Cases" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In Progress" },
  { value: "booked", label: "Booked" },
  { value: "closed", label: "Closed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-red-100 text-red-700",
  contacted: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  booked: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
  cancelled: "bg-gray-100 text-gray-400",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  booked: "Booked",
  closed: "Closed",
  cancelled: "Cancelled",
};

export default function CaseList({
  submissions,
}: {
  submissions: Submission[];
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");

  // Unique assignees for the dropdown
  const assignees = useMemo(() => {
    const set = new Set<string>();
    for (const sub of submissions) {
      if (sub.assigned_to) set.add(sub.assigned_to);
    }
    return Array.from(set).sort();
  }, [submissions]);

  const filtered = useMemo(() => {
    return submissions.filter((sub) => {
      if (statusFilter !== "all" && sub.status !== statusFilter) return false;
      if (assigneeFilter === "unassigned" && sub.assigned_to) return false;
      if (
        assigneeFilter !== "all" &&
        assigneeFilter !== "unassigned" &&
        sub.assigned_to !== assigneeFilter
      )
        return false;
      if (dateFrom) {
        const subDate = sub.created_at.slice(0, 10);
        if (subDate < dateFrom) return false;
      }
      if (dateTo) {
        const subDate = sub.created_at.slice(0, 10);
        if (subDate > dateTo) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (
          !sub.patient_name.toLowerCase().includes(q) &&
          !sub.patient_email.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [submissions, statusFilter, assigneeFilter, dateFrom, dateTo, search]);

  // Count per status for badges
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: submissions.length };
    for (const sub of submissions) {
      c[sub.status] = (c[sub.status] || 0) + 1;
    }
    return c;
  }, [submissions]);

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Cases"
          value={submissions.length}
          color="text-gray-900"
        />
        <StatCard
          label="New (Unactioned)"
          value={counts.new || 0}
          color="text-red-600"
        />
        <StatCard
          label="In Progress"
          value={(counts.contacted || 0) + (counts.in_progress || 0)}
          color="text-blue-600"
        />
        <StatCard
          label="Booked"
          value={counts.booked || 0}
          color="text-green-600"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} {counts[opt.value] ? `(${counts[opt.value]})` : ""}
              </option>
            ))}
          </select>
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            {assignees.map((email) => (
              <option key={email} value={email}>
                {staffDisplayName(email)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 whitespace-nowrap">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 whitespace-nowrap">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {(dateFrom || dateTo || statusFilter !== "all" || assigneeFilter !== "all" || search) && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setAssigneeFilter("all");
                setDateFrom("");
                setDateTo("");
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-1">Date</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Procedures</div>
          <div className="col-span-2 text-right">Value</div>
          <div className="col-span-1 text-right">Savings</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Assigned</div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-gray-400 text-sm">
            {search || statusFilter !== "all" || assigneeFilter !== "all" || dateFrom || dateTo
              ? "No cases match your filters."
              : "No submissions yet."}
          </div>
        ) : (
          filtered.map((sub) => (
            <Link
              key={sub.id}
              href={`/case/${sub.id}`}
              className="block border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Desktop row */}
              <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm">
                <div className="col-span-1 text-gray-500 text-xs">
                  {new Date(sub.created_at).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="col-span-3">
                  <p className="font-medium text-gray-900 truncate">
                    {sub.patient_name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {sub.patient_email}
                    {sub.patient_country ? ` · ${sub.patient_country}` : ""}
                  </p>
                </div>
                <div className="col-span-2 text-gray-600 text-xs truncate">
                  {Array.isArray(sub.procedures)
                    ? sub.procedures.map((p) => p.name).join(", ")
                    : "—"}
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-gray-900 font-medium">
                    ${sub.total_dc_price?.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">
                    / ${sub.total_us_price?.toLocaleString()}
                  </span>
                </div>
                <div className="col-span-1 text-right text-green-600 font-medium">
                  {sub.savings_percentage}%
                </div>
                <div className="col-span-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      STATUS_STYLES[sub.status] || STATUS_STYLES.new
                    }`}
                  >
                    {STATUS_LABELS[sub.status] || sub.status}
                  </span>
                </div>
                <div className="col-span-2 text-xs text-gray-400 truncate">
                  {staffDisplayName(sub.assigned_to)}
                </div>
              </div>

              {/* Mobile card */}
              <div className="md:hidden px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 text-sm truncate">
                    {sub.patient_name}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      STATUS_STYLES[sub.status] || STATUS_STYLES.new
                    }`}
                  >
                    {STATUS_LABELS[sub.status] || sub.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {new Date(sub.created_at).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                    })}
                    {sub.patient_country ? ` · ${sub.patient_country}` : ""}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {sub.savings_percentage}% savings
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3 text-right">
        {filtered.length} of {submissions.length} cases
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
