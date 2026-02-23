import { NextRequest, NextResponse } from "next/server";
import { bookAppointment } from "@/lib/google-calendar";
import { sendBookingConfirmations } from "@/lib/email";
import { getServiceById, getStylistById } from "@/lib/config";
import { isRateLimited } from "@/lib/rate-limit";
import type { BookingRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.GOOGLE_CALENDAR_ID) {
      return NextResponse.json({ error: "Scheduling is not configured." }, { status: 503 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip, 20, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many booking attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { serviceId, stylistId, slot, customerName, customerEmail, customerPhone, notes } = body;

    // Validate required fields
    if (!serviceId || !stylistId || !slot?.start || !slot?.end || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const service = getServiceById(serviceId);
    const stylist = getStylistById(stylistId);
    if (!service) return NextResponse.json({ error: "Service not found." }, { status: 404 });
    if (!stylist) return NextResponse.json({ error: "Stylist not found." }, { status: 404 });

    const booking: BookingRequest = { serviceId, stylistId, slot, customerName, customerEmail, customerPhone, notes };
    const result = await bookAppointment(booking, service, stylist);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Send confirmation emails (don't block the response)
    sendBookingConfirmations(
      customerName,
      customerEmail,
      customerPhone,
      service,
      stylist,
      slot.start,
      slot.display,
      notes
    ).catch((err) => console.error("Email error:", err));

    return NextResponse.json({
      success: true,
      message: "Appointment booked! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to book appointment. Please try again." },
      { status: 500 }
    );
  }
}
