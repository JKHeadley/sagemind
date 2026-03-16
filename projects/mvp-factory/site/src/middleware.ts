import { NextResponse, type NextRequest } from "next/server";
import { getAllSiteSlugs } from "@/lib/get-site-config";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Extract subdomain: "kc-auto.sagemindai.io" -> "kc-auto"
  const subdomain = hostname.split(".sagemindai.io")[0];
  const validSlugs = getAllSiteSlugs();

  if (subdomain && subdomain !== hostname && validSlugs.includes(subdomain)) {
    const url = request.nextUrl.clone();
    // Rewrite /services -> /kc-auto/services
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sites/).*)"],
};
