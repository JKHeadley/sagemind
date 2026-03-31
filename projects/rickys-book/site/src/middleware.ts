import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["en", "es", "nl", "fr", "pt"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, and the password page
  if (
    pathname === "/" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/pdfs/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the path starts with a valid language code
  const pathLang = pathname.split("/")[1];
  if (VALID_LANGS.includes(pathLang)) {
    // Check for book access cookie
    const access = request.cookies.get("book_access");
    if (!access || access.value !== "granted") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
