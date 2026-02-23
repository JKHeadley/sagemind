import { NextRequest, NextResponse } from "next/server";
import { getUpcomingAppointments } from "@/lib/google-calendar";
import { stylists } from "@/lib/config";

export async function GET(request: NextRequest) {
  try {
    const password = request.headers.get("x-admin-password");
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      return NextResponse.json({ error: "Calendar not configured." }, { status: 503 });
    }

    const allAppointments: { stylist: string; appointments: Awaited<ReturnType<typeof getUpcomingAppointments>> }[] = [];

    for (const stylist of stylists.filter((s) => s.active)) {
      const appointments = await getUpcomingAppointments(stylist.calendarId);
      allAppointments.push({ stylist: stylist.name, appointments });
    }

    return NextResponse.json({ data: allAppointments });
  } catch (error) {
    console.error("Admin appointments error:", error);
    return NextResponse.json({ error: "Failed to fetch appointments." }, { status: 500 });
  }
}
