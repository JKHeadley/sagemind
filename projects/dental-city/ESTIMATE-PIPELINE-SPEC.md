# Dental City — Estimate Pipeline & Admin Portal

> **Status:** Spec Complete — Ready for Phase 1 Development
> **Last Updated:** 2026-03-22
> **Author:** Sagemind AI (Adriana + Luna)

---

## Problem

When a prospective patient uploads their US dental estimate to dentalcitycr.com, the AI tool parses it and shows them a cost comparison — but that's where it ends. The uploaded documents and parsed results **never reach the doctors**. The clinic has no way to see incoming cases, review patient documents, or follow up. The entire lead-to-patient pipeline is broken after the AI parsing step.

## Solution

Complete the pipeline: store patient submissions in Google Drive, notify the clinic, send the patient a confirmation, and give the clinic a dedicated admin portal to manage incoming cases.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  PATIENT FLOW (dentalcitycr.com)                                │
│                                                                 │
│  Sign Up → Profile (name, email, phone, country, preferred      │
│  contact method) → Upload Estimate(s) → AI Parses →             │
│  Cost Comparison → Consent Checkbox → SUBMIT                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND PIPELINE (API route)                                   │
│                                                                 │
│  1. Upload original files → Google Drive (patient folder)       │
│  2. Generate branded PDF estimate → save to same folder         │
│  3. Save submission record to Supabase                          │
│  4. Add row to Google Sheet tracker (Phase 1 interim)           │
│  5. Email clinic: new case notification + Drive link            │
│  6. Email patient: confirmation + 48-72hr response time         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  ADMIN PORTAL (clients.dentalcitycr.com)                        │
│                                                                 │
│  Staff login (@dentalcitycr.com only) → Dashboard with all      │
│  submissions → Case detail view → Drive folder link →           │
│  Reply to patient (email / WhatsApp) → Update status            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1 — Core Pipeline

**Goal:** Every patient submission reaches the doctors with all context.

### 1.1 Patient-Side Changes (dentalcitycr.com)

#### Multi-File Upload
- Allow **multiple files** per submission (estimates, X-rays, treatment plans)
- Supported formats: JPG, PNG, WebP, PDF
- Max 10MB per file, max 10 files per submission
- All files sent to Claude for AI parsing (only parseable documents; images stored as-is)
- UI: update `EstimateUpload.tsx` to support multiple file selection and display file list

#### Preferred Contact Method
- Add field to user profile and registration form
- Options: **Email**, **Phone**, **WhatsApp**
- Stored in Supabase `user_metadata.preferred_contact`
- Displayed in profile page

#### Consent Checkbox
- Appears before the final "Submit Estimate" action (after AI parsing, before pipeline trigger)
- Text (EN): "I consent to sharing my uploaded documents and estimate with Dental City's medical team for review."
- Text (ES): "Consiento compartir mis documentos cargados y mi cotización con el equipo médico de Dental City para su revisión."
- Submission blocked until checked
- Consent timestamp stored in Supabase submission record

### 1.2 Google Drive Storage

#### Service Account
- **Email:** `dental-city-drive@sagemind-website-486022.iam.gserviceaccount.com`
- **GCP Project:** `sagemind-website-486022`
- **Permissions:** Editor access on the shared Drive folder

#### Folder Structure
```
Dental City Estimates/                          ← Root folder (ID: 1rl8s42LSKYl5uB2_6wFV4KHgbBIQ0kkZ)
├── 2026-03-22 / Travel Estimate - John Smith/
│   ├── original-estimate.pdf                   ← Patient's uploaded file
│   ├── xray-panoramic.jpg                      ← Additional upload
│   ├── xray-periapical.png                     ← Additional upload
│   └── Dental City Estimate - John Smith.pdf   ← Branded AI-generated estimate
├── 2026-03-23 / Travel Estimate - María López/
│   ├── cotización-dentista.pdf
│   └── Dental City Estimate - María López.pdf
└── ...
```

#### Vercel Environment Variables
| Variable | Value | Status |
|----------|-------|--------|
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Service account JSON | ✅ Set |
| `GOOGLE_DRIVE_FOLDER_ID` | `1rl8s42LSKYl5uB2_6wFV4KHgbBIQ0kkZ` | ✅ Set |

### 1.3 Branded PDF Estimate

A professional PDF document generated server-side for each submission.

#### Layout
```
┌─────────────────────────────────────────────────┐
│  [Dental City Logo]          DENTAL CITY CR     │
│  Aguas Zarcas & Sarapiquí, Costa Rica           │
│  info@dentalcitycr.com | dentalcitycr.com       │
├─────────────────────────────────────────────────┤
│                                                 │
│  PRELIMINARY DENTAL ESTIMATE                    │
│  Date: March 22, 2026                           │
│                                                 │
│  Patient Information                            │
│  ─────────────────                              │
│  Name: John Smith                               │
│  Email: john@email.com                          │
│  Phone: +1 555-123-4567                         │
│  Country: United States                         │
│  Preferred Contact: WhatsApp                    │
│                                                 │
│  Procedures Identified                          │
│  ┌──────────────┬──────────┬──────────┬───────┐ │
│  │ Procedure    │ US Price │ DC Price │ Save  │ │
│  ├──────────────┼──────────┼──────────┼───────┤ │
│  │ Dental Impl. │ $3,500   │ $850     │ 76%   │ │
│  │ Crown (Zirc.)│ $1,500   │ $350     │ 77%   │ │
│  │ Root Canal   │ $1,200   │ $250     │ 79%   │ │
│  ├──────────────┼──────────┼──────────┼───────┤ │
│  │ TOTAL        │ $6,200   │ $1,450   │ $4,750│ │
│  └──────────────┴──────────┴──────────┴───────┘ │
│                                                 │
│  Total Estimated Savings: $4,750 (77%)          │
│                                                 │
│  ─────────────────────────────────────────────  │
│  DISCLAIMER: This is a preliminary estimate     │
│  based on the documents provided. Final         │
│  treatment plans and pricing will be            │
│  determined after an in-person evaluation       │
│  by our dental team.                            │
│                                                 │
│  AI Confidence: Procedures marked with *        │
│  had medium/low parsing confidence and may      │
│  require manual review.                         │
├─────────────────────────────────────────────────┤
│  Dental City CR | Where Quality Meets Savings   │
│  📞 +506 8339 8833 | 📧 info@dentalcitycr.com  │
└─────────────────────────────────────────────────┘
```

#### Technical Approach
- Use `@react-pdf/renderer` or `pdf-lib` for server-side PDF generation
- Dental City logo embedded as base64 asset
- Bilingual: generated in the locale the patient used
- Filename: `Dental City Estimate - [Patient Name].pdf`

### 1.4 Email Notifications

#### Email to Clinic (info@dentalcitycr.com)

**Subject:** New Estimate Submission — [Patient Name] ([Country])

**Body:**
```
New Case Received

Patient: John Smith
Email: john@email.com
Phone: +1 555-123-4567
Country: United States
Preferred Contact: WhatsApp
Submitted: March 22, 2026 at 2:34 PM PST

Procedures Detected:
• Dental Implant — DC Price: $850 (US: $3,500)
• Zirconia Crown — DC Price: $350 (US: $1,500)
• Root Canal (Molar) — DC Price: $250 (US: $1,200)

Estimated Total: $1,450 (Savings: $4,750 / 77%)

📁 View Case Files: [Google Drive Link]

Files Uploaded: 3 (original-estimate.pdf, xray-1.jpg, xray-2.png)
```

- Sent via existing nodemailer/Gmail SMTP setup
- Uses `GMAIL_USER` and `GMAIL_APP_PASSWORD` env vars already configured

#### Email to Patient

**Subject (EN):** Your Dental City Estimate Has Been Received
**Subject (ES):** Su Cotización de Dental City Ha Sido Recibida

**Body (EN):**
```
Dear John,

Thank you for submitting your dental estimate to Dental City!

Our medical team is reviewing your documents and will contact you
within 48-72 business hours via your preferred method (WhatsApp).

In the meantime, you can view your estimate comparison anytime
by logging into your account at dentalcitycr.com.

If you have questions, contact us at info@dentalcitycr.com.

Warm regards,
The Dental City Team
Aguas Zarcas & Sarapiquí, Costa Rica
dentalcitycr.com
```

- Locale-matched (EN or ES based on patient's session)
- Branded HTML email with Dental City colors/logo

### 1.5 Supabase Schema Changes

#### New Table: `submissions`
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Patient snapshot (denormalized for admin portal queries)
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT,
  patient_country TEXT,
  preferred_contact TEXT CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
  locale TEXT DEFAULT 'en',

  -- Estimate data
  procedures JSONB NOT NULL,          -- Array of parsed procedures with prices
  total_us_price NUMERIC(10,2),
  total_dc_price NUMERIC(10,2),
  total_savings NUMERIC(10,2),
  savings_percentage NUMERIC(5,2),

  -- Drive storage
  drive_folder_id TEXT,               -- Google Drive folder ID for this submission
  drive_folder_url TEXT,              -- Direct link to folder
  branded_pdf_id TEXT,                -- Drive file ID of generated PDF
  file_count INTEGER DEFAULT 0,

  -- Consent
  consent_given BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,

  -- Case management (used by admin portal)
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'booked', 'closed', 'cancelled')),
  assigned_to TEXT,                   -- Staff email handling this case
  notes TEXT,                         -- Internal staff notes
  last_contacted_at TIMESTAMPTZ,

  -- AI metadata
  ai_confidence TEXT CHECK (ai_confidence IN ('high', 'medium', 'low')),
  ai_warnings TEXT[]
);

-- Index for admin portal queries
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created ON submissions(created_at DESC);
CREATE INDEX idx_submissions_user ON submissions(user_id);
```

#### New Table: `submission_files`
```sql
CREATE TABLE submission_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,            -- MIME type
  file_size INTEGER,                  -- bytes
  drive_file_id TEXT,                 -- Google Drive file ID
  drive_url TEXT,                     -- Direct Drive link
  is_generated BOOLEAN DEFAULT false, -- true for branded PDF
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 1.6 API Route: Submit Estimate

**Endpoint:** `POST /api/estimate/submit`

**Flow:**
1. Verify Supabase auth (existing pattern)
2. Validate consent checkbox = true
3. Create Google Drive subfolder: `YYYY-MM-DD / Travel Estimate - [Name]`
4. Upload all original files to Drive subfolder
5. Generate branded PDF estimate → upload to Drive subfolder
6. Insert `submissions` row + `submission_files` rows in Supabase
7. Send clinic notification email
8. Send patient confirmation email
9. Return success with submission ID

**Error Handling:**
- If Drive upload fails → still save to Supabase, flag for manual upload, notify clinic
- If email fails → still save submission, log error, retry later
- If PDF generation fails → still submit, generate PDF async later

### 1.7 Patient Dashboard Update

After submission, the patient's dashboard should show:
- Submission history with status
- "Your estimate is being reviewed" state
- Status updates as the clinic progresses the case

---

## Phase 2 — Admin Portal (clients.dentalcitycr.com)

**Goal:** Give the clinic staff a dedicated interface to manage all incoming cases.

### 2.1 Project Setup

- **Separate Vercel project** in `projects/dental-city/admin/`
- **Same Supabase instance** as the patient site (shared database)
- **Tech stack:** Next.js, React, Tailwind CSS, TypeScript (same as patient site)
- **Domain:** `clients.dentalcitycr.com` (new DNS CNAME via Vercel)
- **Auth:** Supabase auth, restricted to `@dentalcitycr.com` email domain

### 2.2 Auth & Access Control

- Login page with email/password
- Registration restricted: only `@dentalcitycr.com` emails can sign up
- Supabase RLS policies:
  - Staff can read/update all submissions
  - Patients can only read their own submissions
  - Staff identified by `user_metadata.role = 'staff'` or email domain check

### 2.3 Dashboard Views

#### Case List (Home)
- Table/card view of all submissions
- Columns: Date, Patient Name, Country, Procedures (summary), Total Savings, Status, Assigned To
- Filters: Status, Date range, Assigned to
- Sort: Newest first (default), by status, by value
- Search: Patient name, email
- Color-coded status badges: New (red), Contacted (yellow), In Progress (blue), Booked (green), Closed (gray)
- Mobile: Card-based layout with swipe actions

#### Case Detail View
- Full patient info (name, email, phone, country, preferred contact)
- All procedures with pricing table (same as branded PDF)
- Link to Google Drive folder (opens in new tab)
- Uploaded files list with thumbnails (images) and icons (PDFs)
- Status selector dropdown
- Internal notes field (free text, staff-only)
- Action buttons:
  - **Email Patient** → opens compose with pre-filled template
  - **WhatsApp Patient** → opens `wa.me/[phone]` with pre-filled message
  - **Mark as Contacted** → updates status + timestamp
- Activity log: status changes, notes, contact attempts with timestamps

#### Quick Actions
- Bulk status update (select multiple → change status)
- Export to CSV (for reporting)

### 2.4 Reply Templates

Pre-built response templates staff can customize before sending:

**Initial Contact (EN):**
```
Hello [Name],

Thank you for your interest in Dental City! We've reviewed your dental
estimate and would love to discuss your treatment options.

Based on your documents, we estimate savings of [savings]% compared to
US pricing.

Would you be available for a brief call/video consultation to discuss
next steps?

Best regards,
[Staff Name]
Dental City CR
```

**Initial Contact (ES):**
```
Hola [Nombre],

¡Gracias por su interés en Dental City! Hemos revisado su cotización
dental y nos encantaría discutir sus opciones de tratamiento.

Según sus documentos, estimamos un ahorro del [savings]% en comparación
con los precios en EE.UU.

¿Estaría disponible para una breve llamada/consulta por video para
discutir los próximos pasos?

Saludos cordiales,
[Nombre del Personal]
Dental City CR
```

### 2.5 Notifications

- Browser push notifications when new submissions arrive (optional)
- Daily digest email: summary of new/pending cases if any are unactioned after 24hrs

---

## Phase 3 — Analytics & Optimization

**Goal:** Understand the pipeline performance and optimize conversion.

### 3.1 Analytics Dashboard

- **Submissions over time** (daily/weekly/monthly chart)
- **Conversion funnel:** Signup → Upload → Submission → Contacted → Booked
- **Average response time:** Time from submission to first contact
- **Top procedures requested**
- **Patient geography:** Country breakdown
- **Revenue potential:** Total estimated value of pending/booked cases
- **Staff performance:** Cases per staff member, avg response time

### 3.2 Automated Follow-ups

- If status = "new" for 48+ hours → auto-reminder to assigned staff
- If status = "contacted" for 7+ days → auto-follow-up email to patient
- Configurable reminder intervals

### 3.3 Patient Portal Enhancements

- Real-time status updates visible to patient
- Secure messaging between patient and clinic (in-app)
- Document request: clinic can request additional files from patient
- Appointment scheduling integration

---

## Technical Dependencies

### NPM Packages (New)

| Package | Purpose | Phase |
|---------|---------|-------|
| `googleapis` | Google Drive API client | 1 |
| `@react-pdf/renderer` or `pdf-lib` | Server-side PDF generation | 1 |
| `nodemailer` | Email (already installed) | 1 |

### Environment Variables (New)

| Variable | Purpose | Phase | Status |
|----------|---------|-------|--------|
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Drive API auth | 1 | ✅ Set |
| `GOOGLE_DRIVE_FOLDER_ID` | Root estimates folder | 1 | ✅ Set |

### DNS (New)

| Record | Type | Value | Phase |
|--------|------|-------|-------|
| `clients.dentalcitycr.com` | CNAME | `cname.vercel-dns.com` | 2 |

### External Services

| Service | Purpose | Phase |
|---------|---------|-------|
| Google Drive API | File storage | 1 |
| Supabase | Auth + database | 1 |
| Gmail SMTP | Email notifications | 1 |
| Vercel | Hosting (both sites) | 1-2 |
| WhatsApp Business | Click-to-chat links | 2 |

---

## File Changes Summary (Phase 1)

### New Files
```
site/src/app/api/estimate/submit/route.ts     — Submission pipeline endpoint
site/src/lib/google-drive.ts                   — Drive API helper (auth, upload, create folder)
site/src/lib/pdf-estimate.ts                   — Branded PDF generator
site/src/lib/email-templates.ts                — HTML email templates (clinic + patient)
site/src/components/ConsentCheckbox.tsx         — Consent UI component
site/src/components/MultiFileUpload.tsx         — Multi-file upload (replaces single)
```

### Modified Files
```
site/src/components/EstimateUpload.tsx          — Integrate multi-file + consent + submit
site/src/components/AuthForm.tsx                — Add preferred contact method field
site/src/app/[locale]/dashboard/profile/page.tsx — Display preferred contact
site/src/app/[locale]/dashboard/estimate/page.tsx — Add submission flow after parsing
site/src/i18n/dictionaries/en.json             — New i18n keys
site/src/i18n/dictionaries/es.json             — New i18n keys
```

---

## Resolved Questions

| # | Question | Answer |
|---|----------|--------|
| 1 | Clinic phone number | **+506 8339 8833** |
| 2 | Logo assets | `site/public/images/logo.png` (in codebase); full logo pack on Drive (`logos -3-001 (1).zip`) |
| 3 | WhatsApp Business number | **+506 8339 8833** (same as phone) |
| 4 | Doctor feedback on PDF | Build sample first → Adriana approves → then pre-approve with doctors |
| 5 | Supabase plan limits | **Free tier sufficient.** 500 MB DB (files go to Drive, not Supabase), 50K MAUs, no row limit. Shared Supabase instance for both patient site + admin portal (counts as 1 project). |
| 6 | Branded PDF visibility | The estimate the **patient sees** IS the branded PDF — generated immediately after AI parsing, shown to patient, and also saved to Drive for doctors. |

## Resolved Questions (Continued)

| # | Question | Answer |
|---|----------|--------|
| 7 | DNS for admin portal | Sagemind manages dentalcitycr.com DNS — we add the `clients` CNAME ourselves |
| 8 | Staff email accounts | Only `info@dentalcitycr.com` exists for now. Staff will share one login for the admin portal initially. No individual accounts yet. |

## Open Questions

1. **Shared login UX** — With shared `info@dentalcitycr.com` login, "Assigned To" field in case management won't identify individual staff. Acceptable for Phase 2 launch? Individual accounts can come later.
2. **RLS policy** — With single shared account, RLS simplifies to: staff email = `info@dentalcitycr.com` gets full access. Patients see only their own submissions.

---

## Phasing Summary

| Phase | Scope | Depends On |
|-------|-------|------------|
| **Phase 1** | Multi-file upload, Drive storage, branded PDF, email notifications, consent, Supabase schema | Service account ✅, Drive folder ✅ |
| **Phase 2** | Admin portal (clients.dentalcitycr.com), case management, reply templates, WhatsApp integration | Phase 1, DNS setup |
| **Phase 3** | Analytics dashboard, automated follow-ups, patient portal enhancements, secure messaging | Phase 2 |
