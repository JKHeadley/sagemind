import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const keyPrefix = process.env.ANTHROPIC_API_KEY?.slice(0, 10) || "NOT SET";
  const hasSupa = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasService = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasDrive = !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const hasGmail = !!process.env.GMAIL_USER;

  return NextResponse.json({
    anthropic: { set: hasKey, prefix: keyPrefix },
    supabase: { url: hasSupa, serviceKey: hasService },
    drive: hasDrive,
    gmail: hasGmail,
  });
}
