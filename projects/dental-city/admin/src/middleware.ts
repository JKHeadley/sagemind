import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → redirect to login
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in but not @dentalcitycr.com → block access
  const email = user.email || "";
  if (!email.endsWith("@dentalcitycr.com")) {
    // Sign them out and redirect to login with error
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/login?error=unauthorized", request.url)
    );
  }

  // Must change password → redirect to change-password page
  const meta = user.user_metadata || {};
  const isChangePasswordPage = request.nextUrl.pathname === "/change-password";
  if (meta.must_change_password && !isChangePasswordPage) {
    return NextResponse.redirect(new URL("/change-password", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Protect everything except login, API routes, and static files
    "/((?!login|_next/static|_next/image|favicon.ico|api).*)",
  ],
};
