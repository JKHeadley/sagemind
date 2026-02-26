"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  // Replace the current locale prefix with the other locale
  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <Link
        href={switchLocale("es")}
        onClick={() => setLocaleCookie("es")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "es"
            ? "bg-primary text-white font-semibold"
            : "text-white/60 hover:text-white"
        }`}
      >
        ES
      </Link>
      <span className="text-white/30">|</span>
      <Link
        href={switchLocale("en")}
        onClick={() => setLocaleCookie("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-primary text-white font-semibold"
            : "text-white/60 hover:text-white"
        }`}
      >
        EN
      </Link>
    </div>
  );
}

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const prefix = `/${locale}`;

  const navLinks = [
    { href: prefix, label: dict.nav.home },
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/team`, label: dict.nav.team },
    { href: `${prefix}/gallery`, label: dict.nav.gallery },
    { href: `${prefix}/testimonials`, label: dict.nav.testimonials },
    { href: `${prefix}/#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm text-white">
      {/* Top bar */}
      <div className="bg-primary-dark text-white text-xs md:text-sm py-1 md:py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="tel:+50624740415"
              className="hover:text-primary-light transition-colors"
            >
              +506 2474 0415
            </a>
            <span className="hidden sm:inline text-white/50">|</span>
            <a
              href="https://wa.me/50683398833"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-primary-light transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden md:inline text-white/70">
              {dict.header.hours}
            </span>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 md:h-16">
        <Link href={prefix} className="flex items-center gap-2 md:gap-3">
          <Image
            src="/images/logo.png"
            alt="Dental City Costa Rica"
            width={48}
            height={35}
            className="h-7 md:h-9 w-auto"
          />
          <div className="leading-tight">
            <span className="font-bold text-lg tracking-wide">
              DENTAL CITY
            </span>
            <span className="block text-[10px] text-primary-light tracking-[0.2em] uppercase">
              Costa Rica
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-primary-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/50683398833"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {dict.header.bookAppointment}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-white/80 hover:text-primary-light border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/50683398833"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            {dict.header.bookAppointment}
          </a>
          <div className="mt-3 flex justify-center">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
