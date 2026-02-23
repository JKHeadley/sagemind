// ============================================================
// Salon Booking System — Type Definitions
// ============================================================

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  price: number;
  active: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  specialties: string[];
  calendarId: string; // Google Calendar ID for this stylist
  active: boolean;
}

export interface TimeSlot {
  start: string; // ISO string in UTC
  end: string; // ISO string in UTC
  display: string; // Human-readable time (e.g. "10:00 AM")
}

export interface BookingRequest {
  serviceId: string;
  stylistId: string;
  slot: TimeSlot;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}

export interface BookingResult {
  success: boolean;
  eventId?: string;
  error?: string;
}

export interface SalonConfig {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  timezone: string;
  businessHours: {
    [day: string]: { open: number; close: number } | null; // null = closed
  };
  daysAhead: number;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };
}
