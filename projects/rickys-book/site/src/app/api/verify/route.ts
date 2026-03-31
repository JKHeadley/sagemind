import { NextRequest, NextResponse } from "next/server";

const BOOK_PASSWORD = process.env.BOOK_PASSWORD || "hiddengate2026";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.password === BOOK_PASSWORD) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
