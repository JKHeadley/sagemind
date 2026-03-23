# Dental City — Complete Project History

> **Client:** Dental City Costa Rica
> **Project Start:** February 25, 2026
> **Live Site:** https://dentalcitycr.com
> **Managed By:** Sagemind AI LLC (Adriana Headley)
> **Last Updated:** March 22, 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Discovery & Planning](#discovery--planning)
3. [Content Collection](#content-collection)
4. [Asset Inventory](#asset-inventory)
5. [Website Development Timeline](#website-development-timeline)
6. [Features Built](#features-built)
7. [Grupo Argus / Doctor Dent Integration Research](#grupo-argus--doctor-dent-integration-research)
8. [Current State](#current-state)
9. [Next Phase: Estimate Pipeline](#next-phase-estimate-pipeline)

---

## Project Overview

Dental City is a dental practice with two locations in Costa Rica:
- **Aguas Zarcas** (primary location)
- **Sarapiquí** (secondary location; La Virgen location was later removed from the site)

The clinic is led by:
- **Dr. Francisco Rodríguez Chaves** — Founder, orthodontist, 15+ years experience
- **Dr. Luis Alejandro Carvajal** — Dental surgeon
- **Dra. Joselyn Arcia** — General dentist
- **Dra. Mariela Hernández** — Facial harmonization / aesthetics
- **Marilyn Fonseca** — Dental assistant
- **Marlón Granados** — Patient coordinator / office manager (primary contact)
- **Deinny** — Staff member

**Practice Management System:** Nebbia Solutions (by Grupo Argus, grupoargus.co.cr) — used for appointments & electronic invoicing

**Contact:**
- Phone/WhatsApp: +506 8339 8833
- Email: info@dentalcitycr.com
- Facebook: facebook.com/dentalcityaz (Aguas Zarcas), facebook.com/dentalcitysarapiqui

---

## Discovery & Planning

### Initial Engagement (Late February 2026)

Sagemind was engaged to build a modern website for Dental City with a focus on **dental tourism** — attracting international patients (primarily US/Canada) who can save 50-70% on dental procedures compared to US pricing.

### Research Phase

Before building, we:
1. Scraped existing online presence (Facebook pages, Google Business listings)
2. Identified services, team members, and locations from public information
3. Pre-populated forms with known data so the client only had to confirm/correct
4. Created bilingual (EN/ES) Google Forms for structured data collection

---

## Content Collection

### Google Forms

Two custom Google Forms were created (in Spanish) and sent to the clinic staff:

#### 1. Business Information Form
- **Form:** [Dental City Costa Rica — Informacion para el Sitio Web](https://docs.google.com/forms/d/1Oudhthlxk_Flry9q4QZ4ayOM1M7VDIGeqvpVb-Fasjs/edit)
- **Responses:** [Spreadsheet](https://docs.google.com/spreadsheets/d/1GJ314JMx1m78-yniSf1DgCG5-0phMQ93KYTtGQDeDyw/edit)
- **59 questions** covering:
  - Business name, contact info, WhatsApp
  - Operating hours (both locations)
  - Social media accounts
  - Services list (confirmation/corrections)
  - Pricing preferences
  - Payment methods & insurance
  - Locations & Google Maps links
  - Languages spoken
  - Mission, vision, values
  - Dental tourism priorities
  - Feedback & suggestions
- **Apps Script generator:** `forms/create-business-info-form.gs`

#### 2. Staff Profile Form
- **Form:** [Dental City Costa Rica — Perfil del Equipo](https://docs.google.com/forms/d/12PFfTGQI4hZLW3KjgF6J0expUp2eu5tYy7B5xrZFHsw/edit)
- **Responses:** [Spreadsheet](https://docs.google.com/spreadsheets/d/1GJ314JMx1m78-yniSf1DgCG5-0phMQ93KYTtGQDeDyw/edit) (shared)
- **27 questions** covering:
  - Full name, title, role, location
  - Specialty, education, certifications
  - Years of experience (total + at Dental City)
  - Professional biography (3-5 sentences)
  - Languages spoken
  - Professional photo upload
  - Personal touch (fun facts, hobbies, message to patients)
- **Apps Script generator:** `forms/create-staff-profile-form.gs`

Both forms were completed by the staff via Marlón (coordinator).

### Media Assets Received

Assets were received via **WeTransfer** from Marlón and saved locally.

---

## Asset Inventory

### Local Files (`projects/dental-city/Pictures /`)

Received via WeTransfer and stored as zip archives + extracted folders:

| File | Contents |
|------|----------|
| `logos -3-001.zip` | Dental City logo files |
| `PERSONAL DC-3-001.zip` | Staff/team photos |
| `INSTALACIONES DC -3-001.zip` | Clinic facility photos |
| `TECNOLOGIA Y TRATAMIENTOS -3-001.zip` | Technology & treatment equipment photos |
| `wetransfer_antes-despues_2026-03-11_2044.zip` | Before/after case photos and videos |

#### Before/After Cases (`antes-despues/ANTES - DESPUES/`)

Organized by treatment category (as sent by Marlón):

| Category | Contents |
|----------|----------|
| **ARMONIZACION FACIAL** | Smile asymmetry corrections, lip fillers, botox before/after (photos + videos) |
| **IMPLANTES DENTALES** | Dental implant cases — before/after photos + video |
| **INVEASYBLE** (invisible orthodontics) | Inveasyble system cases — photos + videos |
| **NIÑOS DENTAL CITY** | Pediatric patients — photos |
| **ODONTOLOGIA ESTETICA** | Cosmetic dentistry — diastema closure, final results (photos + video) |
| **ORTODONCIA** | Orthodontic cases A through D — before/after pairs |
| **PROTESIS CON IMPLANTES DENTALES** | Implant-supported prosthetics — before/after + X-rays |
| **blaqueamientos dentales** | Teeth whitening cases — before/after + procedure videos |
| **protesis removibles** | Removable prosthetics — before/after photos |

### Processed Assets (Live on Site)

#### Images (`site/public/images/`)

| Directory | Contents |
|-----------|----------|
| `before-after/` | Processed before/after case images for gallery |
| `cosmetic-showcase/` | 16 cosmetic dentistry showcase images |
| `clinic/` | Clinic facility photos |
| `team/` | Processed team photos |
| `technology/` | Equipment/technology photos |
| `logos/` | Logo variations |
| `kids/` | Pediatric patient photos |
| `email/` | Email template assets |
| `logo.png` | Primary logo (used across site) |

#### Videos (`site/public/videos/`)

| Video | Content |
|-------|---------|
| `cosmetic-results-reel.mp4` | Cosmetic dentistry results compilation |
| `orthodontics-result.mp4` | Orthodontic treatment result |
| `anterior-implant.mp4` | Anterior dental implant procedure |
| `whitening-session.mp4` | Whitening treatment session |
| `botox-before-after-1.mp4` | Botox before/after #1 |
| `botox-before-after-2.mp4` | Botox before/after #2 |
| `tour-lobby-reception.mp4` | Clinic tour — lobby/reception |
| `tour-lobby-sculptures.mp4` | Clinic tour — lobby sculptures |
| `tour-waiting-lounge.mp4` | Clinic tour — waiting area |
| `tour-treatment-room.mp4` | Clinic tour — treatment room |

### WhatsApp Files (Repo Root — Unprocessed)

Received from Marlón via WhatsApp on March 19, 2026:

| File | Size | Description |
|------|------|-------------|
| `WhatsApp Video 2026-03-19 at 09.09.21.mp4` | 3.7 MB | Video from Marlón |
| `WhatsApp Video 2026-03-19 at 09.09.31.mp4` | 6.1 MB | Video from Marlón |
| `WhatsApp Audio 2026-03-19 at 09.15.25.opus` | 72 KB | Audio message from Marlón |
| `3ca94946-...de.mov` (in dental-city/) | 8.2 MB | Additional video |

**Status:** Not yet processed or integrated into the site.

### Google Drive Assets

| Folder/File | Drive Location | Contents |
|-------------|---------------|----------|
| [Dental City](https://drive.google.com/drive/folders/1rWrs9OMCSB3HrpPWdYdITcf7GRGWiu64) | Root folder | Parent folder for all DC assets |
| [Dental City Assets](https://drive.google.com/drive/folders/1rl8s42LSKYl5uB2_6wFV4KHgbBIQ0kkZ) | Subfolder | New folder for estimate pipeline (shared with service account) |
| [Intake Forms](https://drive.google.com/drive/folders/1kif0eXwP6yM_YAInG-TnfTXeWlI3tr4y) | Subfolder | Google Form responses & related files |
| [Dental City videos](https://drive.google.com/drive/folders/1dHjGyeeOtJijOL2nIoCRK_APnHHujtIL) | Subfolder | Video assets from clinic |
| [Dental City - Photos](https://drive.google.com/drive/folders/16Jk9lEypgIj9ejmcy6OpIWVgh4oRggQW) | Subfolder | Photo assets |
| [Staff Profile Form Responses](https://drive.google.com/drive/folders/1hBSCsf50ATjk0kpqA5JzcA7QDgANZotXt1QFeAHMvSYw781cs_AKPpWVkIq55UtKc3R3TfSt) | Form uploads | Staff profile photos uploaded via form |
| [Dental City Passwords](https://docs.google.com/spreadsheets/d/1zqy1ZZgilZsehaai8V-sduaUcBnwNer59kgcLRQY1KU/edit) | Spreadsheet | Credential storage (restricted) |

---

## Website Development Timeline

### Week 1: Project Setup & Initial Build (Feb 25 – Mar 4)

| Date | Commit | What Happened |
|------|--------|---------------|
| **Feb 25** | `406f390` | Project created. Next.js 16 + React 19 + Tailwind v4 + TypeScript. Bilingual (EN/ES) i18n system. Initial pages: home, services, team, facilities, testimonials, gallery. Deployed to Vercel. |
| **Mar 4** | `bdf9c7f` | Team photos and bios populated from staff profile form responses. Content updated for dental tourism focus. |

### Week 2: Content Polish & Tourism Overhaul (Mar 6 – Mar 10)

| Date | Commit | What Happened |
|------|--------|---------------|
| **Mar 6** | `e3cda54` | Image optimization pass. Removed unused assets. Refined content copy across all pages. |
| **Mar 9** | `8b194dc` | **Major: User authentication system.** Supabase Auth (email/password). Database schema with `estimates` table. Patient dashboard with profile page. |
| **Mar 9** | `8d0b9fd` | Facilities page: fixed image rotations, added high-res clinic photos and tour videos from WeTransfer delivery. |
| **Mar 10** | `f4d3e97` | **Major: AI-powered estimate upload.** Claude Sonnet 4 vision parsing. Drag-and-drop file upload. Extracts procedures + costs from dental estimate photos/PDFs. 5 uploads/day rate limit. |
| **Mar 10** | `2828b80` | Gated pricing (requires auth). Dashboard layout. Estimate calculator with manual procedure selection + AI-parsed results. 90-procedure catalog with US vs DC pricing. |
| **Mar 10** | `0aadd99` | Removed specific prices from public homepage. Added signup CTA to funnel users to authenticated pricing. |

### Week 3: Gallery & Content Expansion (Mar 12 – Mar 18)

| Date | Commit | What Happened |
|------|--------|---------------|
| **Mar 12** | `ead7f15` | **Gallery overhaul.** Reorganized before/after images from WeTransfer delivery. Added treatment videos (cosmetic, orthodontics, implants, whitening, botox). Estimate section improvements. SEO enhancements. |
| **Mar 18** | `d59ea20` | Removed La Virgen location (per client feedback). Fixed Mariela's name and years of experience. Stripped audio from treatment videos. |
| **Mar 18** | `0da08a6` | Removed duplicate botox video from gallery. |
| **Mar 18** | `0ee1f1f` | Updated Francisco's bio from latest staff form submission. Fixed accented characters in names. Updated combined experience to 35+ years. |

### Week 4: Polish & Current (Mar 21 – Mar 22)

| Date | Commit | What Happened |
|------|--------|---------------|
| **Mar 21** | `66b7ac9` | Updated contact email to info@dentalcitycr.com (previously used gmail addresses). Narrowed contact card layout. |
| **Mar 22** | — | Estimate pipeline spec completed. Google Drive service account created. Drive folder set up and shared. Planning for Phase 1 (estimate submission pipeline). |

---

## Features Built

### Dental Tourism Overhaul (March 9, 2026)

Documented in detail in `site/CHANGELOG.md`. Four phases:

**Phase 1 — Content + SEO:**
- Savings-focused hero ("Save 50-70% on Dental Care in Costa Rica")
- Side-by-side price comparison table (6 procedures)
- JSON-LD structured data (LocalBusiness/Dentist, FAQPage, BreadcrumbList)
- SEO meta tags, canonical URLs, hreflang alternates

**Phase 2 — New Features:**
- Contact/inquiry form (nodemailer + Gmail SMTP, honeypot spam prevention)
- FAQ accordion (8 dental tourism questions)
- Pricing page with 3 treatment packages + "How It Works" flow

**Phase 3 — Visual Polish:**
- Scroll animations (IntersectionObserver, prefers-reduced-motion)
- Mobile navigation improvements

**Phase 4 — Performance:**
- Shared ServiceIcon component (14 service icons)
- Image optimization (AVIF + WebP)
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

### User Authentication & Dashboard

- Supabase Auth (email/password registration)
- Registration collects: full name, email, phone, country
- Dashboard pages: profile, estimate calculator
- Gated pricing — signup required to see detailed pricing

### AI-Powered Estimate Parser

- Drag-and-drop file upload (JPG, PNG, WebP, PDF, max 10MB)
- Claude Sonnet 4 vision model parses dental estimate documents
- Extracts procedure names and costs with confidence levels (high/medium/low)
- Fuzzy keyword matching (156 mappings across 51 procedure slugs) to internal catalog
- Bilingual support (recognizes both English and Spanish procedure names)
- 90-procedure catalog with Dental City vs US pricing for savings comparison
- Rate limited: 5 AI uploads per user per day

### Gallery

- Treatment videos (5 categories)
- Before/after slider cases (11 cases with bilingual labels)
- Cosmetic showcase carousel (16 images)
- All content sourced from WeTransfer delivery + Marlón's direct submissions

### Internationalization

- Full bilingual support: English (en) + Spanish (es)
- URL-based locale routing (`/en/...`, `/es/...`)
- Dictionary files: `site/src/i18n/dictionaries/en.json`, `es.json`

---

## Grupo Argus / Nebbia Solutions Integration Research

### Background

Dental City uses **Nebbia Solutions** (managed by **Grupo Argus**, grupoargus.co.cr) for practice management — specifically **appointment scheduling and electronic invoicing**. We are exploring API integration to automate clinic workflows.

### Discovery Questions for Client

A comprehensive set of 24 questions was drafted to understand the clinic's current workflow (documented in Instar view `002b88a9`). Categories:
- Current system usage
- Appointment workflow
- Patient intake & records
- Integration wishlist
- Technical access level

### Email to Grupo Argus — SENT

**Sent:** March 21, 2026 at 8:32 PM from info@dentalcitycr.com to ventas@grupoargus.co.cr
**Subject:** Solicitud de acceso a API — Clínica Dental City (Centro Odontológico Aguas Zarcas)
**Forwarded to:** adriana@sagemindai.io on March 22, 2026

The email (sent in Spanish, from the clinic's own email) requested:

1. **Appointment API access:**
   - Query scheduled appointments by date range
   - Patient data (name, phone, email)
   - Assigned doctor, treatment type, time, duration

2. **Billing/Invoice API access:**
   - Query electronic invoices (issued and received)
   - Invoice data (amount, date, sender/receiver, invoice number)
   - Invoice status

3. **Specific questions asked:**
   - Does Nebbia have a REST API available to clients?
   - Is there technical documentation we can review?
   - Is there an additional cost for API access?

**Status:** Sent, **awaiting response** from Grupo Argus as of March 22, 2026.

**Additional clinic contact info revealed:**
- Landline: +506 2474 0415
- Official business name: Centro Odontológico Aguas Zarcas

**Next Steps:**
- Follow up with Grupo Argus if no response within 5-7 business days
- Send the discovery questions to Marlón to understand current workflow in detail
- Once API access is confirmed/denied, scope the automation features

---

## Current State

### What's Live
- Full bilingual website at dentalcitycr.com
- User authentication + dashboard
- AI estimate parser (documents parsed but not forwarded to clinic)
- Gallery with treatment videos and before/after cases
- Contact form sending to info@dentalcitycr.com
- All content from Google Forms integrated

### What's Set Up (Not Yet Built)
- Google Drive service account (`dental-city-drive@sagemind-website-486022.iam.gserviceaccount.com`)
- Drive folder for estimates (`1rl8s42LSKYl5uB2_6wFV4KHgbBIQ0kkZ`)
- Vercel env vars: `GOOGLE_SERVICE_ACCOUNT_KEY`, `GOOGLE_DRIVE_FOLDER_ID`

### What's Pending
- Estimate submission pipeline (files → Drive → emails → PDF)
- Admin portal (clients.dentalcitycr.com)
- Doctor Dent / Grupo Argus API integration
- WhatsApp files from Marlón (March 19) — not yet processed
- Unprocessed `.mov` file in project root

### Infrastructure
- **Hosting:** Vercel (sagemind team)
- **Database:** Supabase (project: `emwkbwsryxwxrftlckwb`, free tier)
- **Email:** Gmail SMTP (info@dentalcitycr.com)
- **DNS:** Managed by Sagemind via Vercel DNS
- **GCP:** Service account in `sagemind-website-486022`
- **Domain:** dentalcitycr.com (registered, DNS via Vercel)

---

## Next Phase: Estimate Pipeline

Full specification: **[ESTIMATE-PIPELINE-SPEC.md](./ESTIMATE-PIPELINE-SPEC.md)**

### Phase 1 — Core Pipeline
Multi-file upload → Google Drive storage → branded PDF estimate → email notifications (clinic + patient) → consent management → Supabase submission tracking

### Phase 2 — Admin Portal
Standalone app at clients.dentalcitycr.com → staff login (info@dentalcitycr.com) → case management dashboard → reply templates → WhatsApp integration → mobile-responsive

### Phase 3 — Analytics & Automation
Conversion funnel tracking → automated follow-ups → patient portal enhancements → secure messaging
