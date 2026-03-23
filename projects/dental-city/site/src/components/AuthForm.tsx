"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Dictionary } from "@/i18n/dictionaries";

interface AuthFormProps {
  mode: "login" | "register" | "reset" | "update-password";
  locale: string;
  dict: Dictionary;
}

const countries = [
  "United States", "Canada", "Costa Rica", "Mexico", "Colombia",
  "United Kingdom", "Germany", "France", "Spain", "Brazil",
  "Argentina", "Chile", "Peru", "Ecuador", "Panama",
  "Guatemala", "Honduras", "El Salvador", "Nicaragua",
  "Dominican Republic", "Puerto Rico", "Other",
];

export default function AuthForm({ mode, locale, dict }: AuthFormProps) {
  const t = dict.auth;
  const supabase = createClient();
  const prefix = `/${locale}`;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    country: "",
    preferredContact: "whatsapp",
    confirmPassword: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (mode !== "update-password" && !formData.email.trim()) {
      errors.email = t.required;
    } else if (mode !== "update-password" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.invalidEmail;
    }

    if ((mode === "login" || mode === "register" || mode === "update-password") && !formData.password) {
      errors.password = t.required;
    } else if ((mode === "register" || mode === "update-password") && formData.password.length < 8) {
      errors.password = t.passwordMin;
    }

    if (mode === "register") {
      if (!formData.fullName.trim()) errors.fullName = t.required;
      if (!formData.country) errors.country = t.required;
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = t.passwordMismatch;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;

        // Redirect to dashboard or intended page
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect") || `${prefix}/dashboard`;
        window.location.href = redirect;
        return;
      }

      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone,
              country: formData.country,
              preferred_contact: formData.preferredContact,
              locale,
            },
            emailRedirectTo: `${window.location.origin}${prefix}/auth/callback`,
          },
        });
        if (error) throw error;
        setStatus("success");
        return;
      }

      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}${prefix}/auth/update-password`,
        });
        if (error) throw error;
        setStatus("success");
        return;
      }

      if (mode === "update-password") {
        const { error } = await supabase.auth.updateUser({
          password: formData.password,
        });
        if (error) throw error;
        setStatus("success");
        setTimeout(() => {
          window.location.href = `${prefix}/dashboard`;
        }, 2000);
        return;
      }
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : t.genericError;
      setErrorMessage(message);
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  const inputCls =
    "w-full px-4 py-2.5 rounded-lg border border-navy/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm";
  const errorCls = "text-red-500 text-xs mt-1";
  const labelCls = "block text-sm font-medium text-navy mb-1";

  // Success states
  if (status === "success" && mode === "register") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-navy mb-2">{t.checkEmail}</h2>
        <p className="text-text-light text-sm">{t.confirmEmailSent}</p>
      </div>
    );
  }

  if (status === "success" && mode === "reset") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-navy mb-2">{t.checkEmail}</h2>
        <p className="text-text-light text-sm">{t.resetEmailSent}</p>
      </div>
    );
  }

  if (status === "success" && mode === "update-password") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-navy mb-2">{t.passwordUpdated}</h2>
        <p className="text-text-light text-sm">{t.redirecting}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {errorMessage}
        </div>
      )}

      {mode === "register" && (
        <div>
          <label className={labelCls}>{t.fullName}</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={inputCls}
            placeholder={t.fullNamePlaceholder}
          />
          {fieldErrors.fullName && <p className={errorCls}>{fieldErrors.fullName}</p>}
        </div>
      )}

      {mode !== "update-password" && (
        <div>
          <label className={labelCls}>{t.email}</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputCls}
            placeholder={t.emailPlaceholder}
          />
          {fieldErrors.email && <p className={errorCls}>{fieldErrors.email}</p>}
        </div>
      )}

      {mode === "register" && (
        <>
          <div>
            <label className={labelCls}>{t.phone}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={inputCls}
              placeholder={t.phonePlaceholder}
            />
          </div>
          <div>
            <label className={labelCls}>{t.country} *</label>
            <select
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
              className={inputCls}
            >
              <option value="">{t.selectCountry}</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {fieldErrors.country && <p className={errorCls}>{fieldErrors.country}</p>}
          </div>
          <div>
            <label className={labelCls}>
              {locale === "es" ? "Método de contacto preferido" : "Preferred contact method"}
            </label>
            <select
              value={formData.preferredContact}
              onChange={(e) => updateField("preferredContact", e.target.value)}
              className={inputCls}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="email">{locale === "es" ? "Correo electrónico" : "Email"}</option>
              <option value="phone">{locale === "es" ? "Teléfono" : "Phone"}</option>
            </select>
          </div>
        </>
      )}

      {(mode === "login" || mode === "register" || mode === "update-password") && (
        <div>
          <label className={labelCls}>
            {mode === "update-password" ? t.newPassword : t.password}
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className={inputCls}
            placeholder={mode === "register" || mode === "update-password" ? t.passwordMinHint : ""}
          />
          {fieldErrors.password && <p className={errorCls}>{fieldErrors.password}</p>}
        </div>
      )}

      {mode === "register" && (
        <div>
          <label className={labelCls}>{t.confirmPassword}</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            className={inputCls}
          />
          {fieldErrors.confirmPassword && <p className={errorCls}>{fieldErrors.confirmPassword}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading"
          ? t.loading
          : mode === "login"
            ? t.loginButton
            : mode === "register"
              ? t.registerButton
              : mode === "reset"
                ? t.resetButton
                : t.updatePasswordButton}
      </button>

      {/* Links */}
      <div className="text-center text-sm space-y-2">
        {mode === "login" && (
          <>
            <p>
              <Link href={`${prefix}/auth/reset-password`} className="text-primary hover:underline">
                {t.forgotPassword}
              </Link>
            </p>
            <p className="text-text-light">
              {t.noAccount}{" "}
              <Link href={`${prefix}/auth/register`} className="text-primary hover:underline">
                {t.registerLink}
              </Link>
            </p>
          </>
        )}
        {mode === "register" && (
          <p className="text-text-light">
            {t.haveAccount}{" "}
            <Link href={`${prefix}/auth/login`} className="text-primary hover:underline">
              {t.loginLink}
            </Link>
          </p>
        )}
        {mode === "reset" && (
          <p className="text-text-light">
            <Link href={`${prefix}/auth/login`} className="text-primary hover:underline">
              {t.backToLogin}
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
