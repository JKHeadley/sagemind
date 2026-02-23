# Custom Salon Booking System — Scope & Architecture

**Project:** Castro Valley Salon Website
**Date:** 2026-02-23
**Prepared by:** Luna — Sagemind AI

---

## Executive Summary

We can build a custom booking system for the salon client that eliminates monthly SaaS fees (Vagaro charges $30–85/mo per stylist). We already have a working scheduling system on sagemindai.io with Google Calendar integration, email confirmations, and availability checking — roughly 60% of the foundation is reusable.

The custom system adds service selection, variable appointment durations, stylist assignment, and an admin dashboard. No third-party booking platform needed.

---

## What We Already Have (Reusable)

From the existing Sagemind scheduling system:

- **Google Calendar integration** — service account auth, event creation, free/busy queries
- **Multi-calendar conflict detection** — checks multiple calendars before booking
- **Real-time availability engine** — generates time slots based on business hours, skips weekends
- **Email confirmation flow** — owner notification + customer confirmation via Gmail/Nodemailer
- **Rate limiting** — prevents booking spam
- **Timezone handling** — DST-aware, Pacific Time
- **Booking UI pattern** — date picker → time picker → confirmation form → success state
- **Next.js + Vercel infrastructure** — already proven in production

---

## What We Need to Build

### Phase 1 — MVP (Core Booking)

**Service Selection**
- Service catalog with name, description, duration, and price
- Variable appointment lengths (30 min for a trim, 2+ hours for color)
- Service categories (Cuts, Color, Styling, Treatments, etc.)
- Availability engine updated to handle variable durations

**Stylist Selection** (if multi-stylist)
- Each stylist has their own Google Calendar
- Customers pick a stylist or choose "any available"
- Per-stylist availability calculation
- Stylist profiles with photo, specialties, bio

**Enhanced Booking Flow**
1. Select service(s)
2. Select stylist (optional)
3. Pick date
4. Pick available time slot (duration matches service)
5. Enter contact info
6. Confirm booking
7. Receive email confirmation

**Admin Dashboard** (simple, for the salon owner)
- View upcoming appointments
- View today's schedule at a glance
- Cancel/reschedule appointments
- Manage services (add, edit pricing/duration)
- Manage stylists

**Data Storage**
- Lightweight database for services, stylists, and booking history
- Options: Vercel Postgres (free tier), Supabase, or even a simple JSON/Google Sheets approach for MVP
- Google Calendar remains source of truth for availability

### Phase 2 — Enhancements

- **SMS reminders** (Twilio — reduces no-shows by ~30%)
- **Cancellation/rescheduling** by customer (via unique link in confirmation email)
- **Recurring appointments** ("Book again in 6 weeks")
- **Waitlist** for fully-booked time slots
- **Customer profiles** (visit history, preferences, notes)

### Phase 3 — Premium (Optional / White-Label)

- **Payment integration** (Stripe — deposits or full prepay)
- **Loyalty program** (visit tracking, rewards)
- **Multi-location support**
- **White-label mode** — rebrand and offer to other salons/service businesses

---

## Technical Architecture

```
Frontend (Next.js)
├── /book — Customer booking flow
│   ├── Service selection
│   ├── Stylist selection
│   ├── Date/time picker
│   └── Confirmation form
├── /admin — Owner dashboard (auth-protected)
│   ├── Today's schedule
│   ├── Appointment list
│   ├── Service management
│   └── Stylist management
└── Components
    ├── ServiceCard
    ├── StylistCard
    ├── TimeSlotGrid
    └── BookingConfirmation

API Routes (Next.js)
├── /api/services — CRUD for services
├── /api/stylists — CRUD for stylists
├── /api/schedule/slots — Available slots (enhanced)
├── /api/schedule/book — Create booking
├── /api/schedule/cancel — Cancel booking
├── /api/admin/appointments — List/manage bookings
└── /api/admin/auth — Simple admin auth

Integrations
├── Google Calendar API — Availability + event creation
├── Gmail/Nodemailer — Email confirmations
├── Vercel Postgres — Services, stylists, booking records
└── (Phase 2) Twilio — SMS reminders
```

---

## Data Model

**Services**
- id, name, description, category, duration_minutes, price, active

**Stylists**
- id, name, bio, photo_url, specialties, calendar_id, active

**Bookings**
- id, service_id, stylist_id, customer_name, customer_email, customer_phone
- start_time, end_time, status (confirmed/cancelled/completed)
- google_event_id, cancel_token, notes, created_at

---

## Cost to the Salon Client

**Ongoing costs: Near zero**
- Vercel hosting: Free tier covers a salon's traffic easily
- Vercel Postgres: Free tier (256MB) is more than enough
- Google Calendar API: Free
- Gmail sending: Free (up to 500/day)
- Domain: ~$12/year (if not already owned)

**vs. Third-Party Platforms:**
- Vagaro: $30–85/month per stylist = $360–$1,020/year per stylist
- Booksy: $30/month per stylist = $360/year per stylist
- Square Appointments: Free for 1 stylist, $30+/month for multiple

**Bottom line:** The custom system pays for itself immediately and saves the client hundreds per year.

---

## Selling Points for the Client

1. **No monthly booking fees** — ever
2. **Fully integrated** — booking lives on their website, not a third-party redirect
3. **Custom branded** — matches their salon's look and feel perfectly
4. **They own their data** — customer info isn't locked in a platform
5. **We maintain it** — updates, fixes, and improvements included in our service relationship

---

## Reuse Potential

This system can be packaged as a white-label product for any appointment-based small business:
- Hair salons, barbershops
- Nail salons, spas
- Tattoo studios
- Personal trainers, yoga instructors
- Consultants, therapists
- Auto detailing shops

First build it right for this salon, then extract it as a configurable product.

---

## Summary

| | MVP (Phase 1) | Enhanced (Phase 2) | Premium (Phase 3) |
|---|---|---|---|
| Service selection | Yes | Yes | Yes |
| Stylist selection | Yes | Yes | Yes |
| Real-time availability | Yes | Yes | Yes |
| Email confirmations | Yes | Yes | Yes |
| Admin dashboard | Yes | Yes | Yes |
| SMS reminders | — | Yes | Yes |
| Cancel/reschedule | — | Yes | Yes |
| Customer profiles | — | Yes | Yes |
| Payments | — | — | Yes |
| White-label | — | — | Yes |
| Monthly cost to client | $0 | $0 (or ~$1/mo SMS) | $0 + Stripe fees |

---

*Prepared by Luna — Sagemind AI | 2026-02-23*
