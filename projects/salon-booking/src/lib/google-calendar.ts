// ============================================================
// Google Calendar Integration — Enhanced for Salon Booking
// Supports variable appointment durations & per-stylist calendars
// ============================================================

import { google } from "googleapis";
import { salon } from "./config";
import type { TimeSlot, BookingRequest, BookingResult, Stylist, Service } from "./types";

function getCalendarClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
    clientOptions: {
      subject: process.env.GOOGLE_CALENDAR_ID || "primary",
    },
  });
  return google.calendar({ version: "v3", auth });
}

// Day name lookup (0 = Sunday)
const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getPacificOffset(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  if (month === 2) {
    const firstDay = new Date(Date.UTC(year, 2, 1)).getUTCDay();
    const secondSunday = firstDay === 0 ? 8 : 15 - firstDay;
    if (day >= secondSunday) return -7;
  } else if (month === 10) {
    const firstDay = new Date(Date.UTC(year, 10, 1)).getUTCDay();
    const firstSunday = firstDay === 0 ? 1 : 8 - firstDay;
    if (day < firstSunday) return -7;
  } else if (month > 2 && month < 10) {
    return -7;
  }
  return -8;
}

function createPacificDate(baseDate: Date, hour: number, minute: number): Date {
  const offset = getPacificOffset(baseDate);
  const utcHour = hour - offset;
  return new Date(Date.UTC(
    baseDate.getUTCFullYear(),
    baseDate.getUTCMonth(),
    baseDate.getUTCDate(),
    utcHour,
    minute,
    0,
    0
  ));
}

/**
 * Get available slots for a specific stylist and service duration.
 */
export async function getAvailableSlots(
  stylist: Stylist,
  service: Service
): Promise<Record<string, TimeSlot[]>> {
  const calendar = getCalendarClient();
  const now = new Date();
  const duration = service.durationMinutes;

  const tomorrowUTC = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1
  ));
  const endDateUTC = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + salon.daysAhead
  ));

  // Query this stylist's calendar for busy times
  const busyResponse = await calendar.freebusy.query({
    requestBody: {
      timeMin: tomorrowUTC.toISOString(),
      timeMax: endDateUTC.toISOString(),
      timeZone: salon.timezone,
      items: [{ id: stylist.calendarId }],
    },
  });

  const busyTimes = busyResponse.data.calendars?.[stylist.calendarId]?.busy || [];
  const slotsByDay: Record<string, TimeSlot[]> = {};

  for (let d = 0; d < salon.daysAhead; d++) {
    const dayDate = new Date(Date.UTC(
      tomorrowUTC.getUTCFullYear(),
      tomorrowUTC.getUTCMonth(),
      tomorrowUTC.getUTCDate() + d
    ));

    // Check business hours for this day of week
    const offset = getPacificOffset(dayDate);
    const pacificDayOfWeek = new Date(dayDate.getTime() + offset * 60 * 60 * 1000).getUTCDay();
    const dayName = DAY_NAMES[pacificDayOfWeek];
    const hours = salon.businessHours[dayName];

    if (!hours) continue; // Salon closed this day

    const dateKey = dayDate.toISOString().split("T")[0];
    const slots: TimeSlot[] = [];

    // Generate slots in 15-minute increments
    const slotIncrement = 15;
    for (let hour = hours.open; hour < hours.close; hour++) {
      for (let minute = 0; minute < 60; minute += slotIncrement) {
        const slotStart = createPacificDate(dayDate, hour, minute);
        const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);

        // Check appointment doesn't extend past closing time
        const closingTime = createPacificDate(dayDate, hours.close, 0);
        if (slotEnd > closingTime) continue;

        // Skip past slots
        if (slotStart <= now) continue;

        // Check for conflicts
        const isConflict = busyTimes.some((busy) => {
          const busyStart = new Date(busy.start!);
          const busyEnd = new Date(busy.end!);
          return slotStart < busyEnd && slotEnd > busyStart;
        });

        if (!isConflict) {
          const period = hour >= 12 ? "PM" : "AM";
          const displayHour = hour % 12 || 12;
          const displayMinutes = minute.toString().padStart(2, "0");
          slots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            display: `${displayHour}:${displayMinutes} ${period}`,
          });
        }
      }
    }

    if (slots.length > 0) {
      slotsByDay[dateKey] = slots;
    }
  }

  return slotsByDay;
}

/**
 * Book an appointment on the stylist's calendar.
 */
export async function bookAppointment(
  booking: BookingRequest,
  service: Service,
  stylist: Stylist
): Promise<BookingResult> {
  const calendar = getCalendarClient();

  try {
    // Re-verify the slot is still available
    const busyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: booking.slot.start,
        timeMax: booking.slot.end,
        timeZone: salon.timezone,
        items: [{ id: stylist.calendarId }],
      },
    });

    const busyTimes = busyResponse.data.calendars?.[stylist.calendarId]?.busy || [];
    if (busyTimes.length > 0) {
      return { success: false, error: "This time slot is no longer available." };
    }

    // Create calendar event
    const event = await calendar.events.insert({
      calendarId: stylist.calendarId,
      sendUpdates: "all",
      requestBody: {
        summary: `${service.name}: ${booking.customerName}`,
        description: [
          `Service: ${service.name} (${service.durationMinutes} min)`,
          `Client: ${booking.customerName}`,
          `Email: ${booking.customerEmail}`,
          `Phone: ${booking.customerPhone}`,
          booking.notes ? `Notes: ${booking.notes}` : "",
          "",
          `Booked via ${salon.name} website`,
        ].filter(Boolean).join("\n"),
        start: {
          dateTime: booking.slot.start,
          timeZone: salon.timezone,
        },
        end: {
          dateTime: booking.slot.end,
          timeZone: salon.timezone,
        },
        attendees: [
          { email: booking.customerEmail, displayName: booking.customerName },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "email", minutes: 60 },
          ],
        },
      },
    });

    return {
      success: true,
      eventId: event.data.id || undefined,
    };
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("Booking error:", err.message);
    return { success: false, error: "Failed to create booking. Please try again." };
  }
}

/**
 * Get upcoming appointments for a stylist (for admin view).
 */
export async function getUpcomingAppointments(
  calendarId: string,
  maxResults = 50
): Promise<{ summary: string; start: string; end: string; description: string }[]> {
  const calendar = getCalendarClient();
  const now = new Date();

  const response = await calendar.events.list({
    calendarId,
    timeMin: now.toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: "startTime",
  });

  return (response.data.items || []).map((event) => ({
    summary: event.summary || "",
    start: event.start?.dateTime || event.start?.date || "",
    end: event.end?.dateTime || event.end?.date || "",
    description: event.description || "",
  }));
}
