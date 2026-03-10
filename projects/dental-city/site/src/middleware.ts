import { NextRequest, NextResponse } from "next/server";
import { i18n, type Locale } from "./i18n/config";
import { updateSession } from "./lib/supabase/middleware";

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

// Routes that require authentication (after locale prefix)
const PROTECTED_PATHS = ["/dashboard"];

function isProtectedPath(pathname: string): boolean {
  // Strip locale prefix to check the actual path
  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "");
  return PROTECTED_PATHS.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(`${p}/`)
  );
}

function getLocaleFromPath(pathname: string): Locale | null {
  for (const locale of i18n.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale as Locale;
    }
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // Refresh Supabase session (keeps auth tokens valid)
  const { supabaseResponse, user } = await updateSession(request);

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If this is a protected route and the user is not authenticated, redirect to login
    if (isProtectedPath(pathname) && !user) {
      const locale = getLocaleFromPath(pathname) || i18n.defaultLocale;
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Copy any Supabase cookies to the response
    return supabaseResponse;
  }

  // No locale in path — detect and redirect
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
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  // Copy Supabase auth cookies to the redirect response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value);
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|images|videos|.*\\..*).*)"],
};
