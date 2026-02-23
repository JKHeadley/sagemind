import { NextResponse } from "next/server";
import { stylists } from "@/lib/config";

export async function GET() {
  return NextResponse.json({
    stylists: stylists.filter((s) => s.active),
  });
}
