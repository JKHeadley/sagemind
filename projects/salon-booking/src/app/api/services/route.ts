import { NextResponse } from "next/server";
import { services, getServicesByCategory } from "@/lib/config";

export async function GET() {
  return NextResponse.json({
    services: services.filter((s) => s.active),
    byCategory: getServicesByCategory(),
  });
}
