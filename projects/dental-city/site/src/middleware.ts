import { NextRequest, NextResponse } from "next/server";
import { i18n, type Locale } from "./i18n/config";

// Spanish-speaking countries (ISO 3166-1 alpha-2)
const spanishCountries = new Set([
  "CR", // Costa Rica
  "MX", // Mexico
  "ES", // Spain
  "CO", // Colombia
  "AR", // Argentina
  "PE", // Peru
  "VE", // Venezuela
  "CL", // Chile
  "EC", // Ecuador
  "GT", // Guatemala
  "CU", // Cuba
  "BO", // Bolivia
  "DO", // Dominican Republic
  "HN", // Honduras
  "PY", // Paraguay
  "SV", // El Salvador
  "NI", // Nicaragua
  "PA", // Panama
  "UY", // Uruguay
  "GQ", // Equatorial Guinea
]);

function getLocaleFromCountry(country: string | null): Locale | null {
  if (!country) return null;
  return spanishCountries.has(country.toUpperCase()) ? "es" : "en";
}

function getLocaleFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  // Parse Accept-Language: es-CR,es;q=0.9,en-US;q=0.8,en;q=0.7
  const languages = header.split(",").map((lang) => {
    const [code] = lang.trim().split(";");
    return code.trim().split("-")[0].toLowerCase();
  });
  for (const lang of languages) {
    if (i18n.locales.includes(lang as Locale)) return lang as Locale;
  }
  return null;
}

const LOCALE_COOKIE = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Skip for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname.includes(".") // static files like favicon.ico
  ) {
    return;
  }

  // Priority: 1) Cookie (user chose), 2) Geo IP, 3) Accept-Language, 4) Default
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value as Locale | undefined;
  const locale =
    (cookieLocale && i18n.locales.includes(cookieLocale) ? cookieLocale : null) ||
    getLocaleFromCountry(request.headers.get("x-vercel-ip-country")) ||
    getLocaleFromAcceptLanguage(request.headers.get("accept-language")) ||
    i18n.defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);

  // Set cookie so the language switcher choice persists
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  return response;
}

export const config = {
  // Match all paths except static files and API routes
  matcher: ["/((?!_next|api|images|videos|.*\\..*).*)"],
};
