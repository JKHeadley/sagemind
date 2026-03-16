"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm({
  businessSlug,
  businessName,
  services,
}: {
  businessSlug: string;
  businessName: string;
  services: string[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot check
    if (data.website) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, businessSlug, businessName }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-text-light">We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2.5 border border-gray-300 bg-white text-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            style={{ borderRadius: "var(--site-radius, 12px)" }}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-2.5 border border-gray-300 bg-white text-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            style={{ borderRadius: "var(--site-radius, 12px)" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2.5 border border-gray-300 bg-white text-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          style={{ borderRadius: "var(--site-radius, 12px)" }}
        />
      </div>

      {services.length > 0 && (
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">Service Interested In</label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-2.5 border border-gray-300 bg-white text-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            style={{ borderRadius: "var(--site-radius, 12px)" }}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2.5 border border-gray-300 bg-white text-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-y"
          style={{ borderRadius: "var(--site-radius, 12px)" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-primary hover:bg-primary-dark text-text-on-primary font-semibold py-3 transition-colors disabled:opacity-60"
        style={{ borderRadius: "var(--site-radius, 12px)" }}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm text-center">Something went wrong. Please try again or call us directly.</p>
      )}
    </form>
  );
}
