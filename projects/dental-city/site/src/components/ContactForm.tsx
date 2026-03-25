"use client";

import { useState } from "react";

interface ContactFormProps {
  locale: string;
  dict: {
    contactForm: {
      name: string;
      email: string;
      phone: string;
      country: string;
      service: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      required: string;
      selectCountry: string;
      selectService: string;
      consentText?: string;
      privacyLink?: string;
    };
  };
}

const countries = [
  "United States", "Canada", "United Kingdom", "Costa Rica", "Mexico",
  "Colombia", "Brazil", "Argentina", "Germany", "Spain", "France",
  "Australia", "Other",
];

const servicesEn = [
  "Dental Implants", "All-on-4", "Orthodontics", "Veneers",
  "Dental Crowns", "Root Canal", "Teeth Whitening", "Oral Surgery",
  "Full Rehabilitation", "General Checkup", "Other",
];

const servicesEs = [
  "Implantes Dentales", "All-on-4", "Ortodoncia", "Carillas",
  "Coronas Dentales", "Endodoncia", "Blanqueamiento", "Cirugía Oral",
  "Rehabilitación Completa", "Revisión General", "Otro",
];

export default function ContactForm({ locale, dict }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "", service: "", message: "", honey: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const services = locale === "es" ? servicesEs : servicesEn;

  const validate = () => {
    const errs: Record<string, boolean> = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    if (!consent) errs.consent = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.honey) return; // honeypot

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          service: form.service,
          message: form.message,
          locale,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", country: "", service: "", message: "", honey: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (field: string) =>
    `w-full px-4 py-2.5 rounded-lg border ${errors[field] ? "border-red-400 bg-red-50/50" : "border-navy/10 bg-white"} text-navy text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors`;

  const d = dict.contactForm;

  if (status === "success") {
    return (
      <div className="bg-primary/10 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-navy font-semibold text-lg">{d.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input
          tabIndex={-1}
          autoComplete="off"
          name="website"
          value={form.honey}
          onChange={(e) => setForm({ ...form, honey: e.target.value })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder={d.name + " *"}
            className={inputCls("name")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{d.required}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder={d.email + " *"}
            className={inputCls("email")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{d.required}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder={d.phone}
          className={inputCls("phone")}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <select
          className={inputCls("country")}
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        >
          <option value="">{d.selectCountry}</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <select
        className={inputCls("service")}
        value={form.service}
        onChange={(e) => setForm({ ...form, service: e.target.value })}
      >
        <option value="">{d.selectService}</option>
        {services.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <div>
        <textarea
          rows={4}
          placeholder={d.message + " *"}
          className={inputCls("message")}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{d.required}</p>}
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setErrors((prev) => ({ ...prev, consent: false }));
            }}
            className="mt-1 h-4 w-4 rounded border-navy/10 text-primary focus:ring-primary/30 shrink-0"
          />
          <span className={`text-xs leading-relaxed ${errors.consent ? "text-red-400" : "text-text-light"}`}>
            {d.consentText || "I consent to Dental City processing my personal information to respond to my inquiry. I can request deletion of my data at any time by contacting info@dentalcitycr.com."}
          </span>
        </label>
        <a
          href={`/${locale}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs text-primary hover:underline ml-7 mt-1"
        >
          {d.privacyLink || "Privacy Policy"} →
        </a>
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">{d.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !consent}
        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {status === "sending" ? d.sending : d.submit}
      </button>
    </form>
  );
}
