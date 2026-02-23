import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";
import { getServiceById, getStylistById } from "@/lib/config";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.GOOGLE_CALENDAR_ID) {
      return NextResponse.json({ error: "Scheduling is not configured." }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId");
    const stylistId = searchParams.get("stylistId");

    if (!serviceId || !stylistId) {
      return NextResponse.json(
        { error: "serviceId and stylistId are required." },
        { status: 400 }
      );
    }

    const service = getServiceById(serviceId);
    const stylist = getStylistById(stylistId);

    if (!service) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }
    if (!stylist) {
      return NextResponse.json({ error: "Stylist not found." }, { status: 404 });
    }

    const slots = await getAvailableSlots(stylist, service);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch available times." },
      { status: 500 }
    );
  }
}

export const revalidate = 300;
