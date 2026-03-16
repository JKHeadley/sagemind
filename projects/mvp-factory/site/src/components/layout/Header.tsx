"use client";

import { useState } from "react";
import Link from "next/link";
import type { SiteConfig } from "@/config/types";

const navLinks = [
  { label: "Home", href: "" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ config }: { config: SiteConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefix = `/${config.slug}`;
  const isTransparent = config.layout.headerVariant === "transparent";
  const digits = config.phone.replace(/\D/g, "");

  return (
    <header
      className={`sticky top-0 z-50 ${isTransparent ? "bg-header-bg/90 backdrop-blur-md" : "bg-header-bg"}`}
    >
      {config.layout.headerVariant === "topbar" && (
        <div className="bg-primary text-text-on-primary text-sm py-1.5 px-4 text-center">
          <a href={`tel:+1${digits}`} className="hover:underline">
            Call us: {config.phone}
          </a>
          <span className="mx-3">|</span>
          <span>{config.address.street}, {config.address.city}</span>
        </div>
      )}
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={prefix} className="text-xl font-bold text-white tracking-tight">
          {config.businessName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={`${prefix}${link.href}`}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:+1${digits}`}
            className="bg-primary hover:bg-primary-dark text-text-on-primary text-sm font-semibold px-5 py-2 transition-colors"
            style={{ borderRadius: "var(--site-radius, 12px)" }}
          >
            {config.phone}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mobile-menu-enter bg-header-bg border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={`${prefix}${link.href}`}
              className="block py-3 text-white/80 hover:text-white border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:+1${digits}`}
            className="block mt-3 text-center bg-primary hover:bg-primary-dark text-text-on-primary font-semibold px-5 py-3 transition-colors"
            style={{ borderRadius: "var(--site-radius, 12px)" }}
          >
            Call {config.phone}
          </a>
        </div>
      )}
    </header>
  );
}
