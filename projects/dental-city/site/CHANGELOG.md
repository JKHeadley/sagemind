# Dental City Website — Changelog

## 2026-03-09: Dental Tourism Overhaul

Complete website overhaul focused on converting international dental tourism patients. All changes are bilingual (EN/ES).

### Phase 1: Dental Tourism Content + SEO

**Hero Section Rewrite** (`src/app/[locale]/page.tsx`)
- New savings-focused tagline: "Save 50-70% on Dental Care in Costa Rica"
- Two CTAs: "Get a Free Quote" (WhatsApp with pre-filled message) + "See Our Prices" (links to pricing page)
- Trust badges: ADA-equivalent standards, English-speaking staff, 59 five-star reviews, 20+ years experience
- Social proof strip with US/Canada country flags and patient testimonial quote

**Savings Comparison Table** (`src/app/[locale]/page.tsx`)
- Side-by-side price comparison: US prices vs Dental City prices for 6 common procedures
- Procedures: implants ($3,000–$5,000 vs $800–$1,200), All-on-4, crowns, veneers, root canal, orthodontics
- Supporting bullet points about materials, specialists, and vacation benefits

**JSON-LD Structured Data** (`src/lib/structured-data.ts`)
- LocalBusiness/Dentist schema for both clinic locations (Aguas Zarcas + Sarapiquí)
- FAQPage schema wired to FAQ content
- BreadcrumbList schema for navigation
- Injected into `[locale]/layout.tsx`

**SEO Meta Tags** (`src/app/[locale]/layout.tsx`)
- Dental tourism keywords in page titles and descriptions
- Canonical URLs and hreflang alternates (en/es)
- Open Graph images with dimensions
- Twitter card metadata
- Robots directive and metadataBase

**Team Page Enhancements** (`src/app/[locale]/team/page.tsx`)
- "Why International Patients Trust Us" section with 4 credential cards
- UCR training, bilingual care, ADA-equivalent materials, 20+ years experience

### Phase 2: New Features

**Contact/Inquiry Form** (`src/components/ContactForm.tsx`, `src/app/api/contact/route.ts`)
- Fields: name, email, phone, country (dropdown), service interest (dropdown), message
- Honeypot spam prevention (no CAPTCHA)
- Client-side validation with inline error messages
- Email delivery via nodemailer (Gmail SMTP) with HTML-formatted email
- Graceful fallback if email env vars not configured (logs to console)
- Success/error states with bilingual messaging

**FAQ Accordion** (`src/components/FAQ.tsx`)
- 8 dental tourism questions covering savings, qualifications, English speakers, trip planning, insurance, payment, hotels, safety
- Smooth open/close animation using CSS grid `grid-rows-[1fr]/[0fr]`
- One-at-a-time accordion behavior
- Wired to FAQPage JSON-LD structured data

**Pricing Page** (`src/app/[locale]/pricing/page.tsx`)
- Expanded price comparison table (10 procedures with strikethrough US prices)
- 3 treatment packages: Smile Makeover ($2,500–$5,000), Implant Package ($3,000–$8,000), Full Rehabilitation ($8,000–$15,000)
- Each package: included treatments, estimated duration, price range, "Get a Quote" WhatsApp CTA
- "How It Works" 4-step process (consultation, treatment plan, travel, treatment)
- Navigation links added to Header and Footer

### Phase 3: Visual Polish + UX

**Scroll Animations** (`src/components/AnimateOnScroll.tsx`, `src/app/globals.css`)
- IntersectionObserver-based fade-in-up animations
- Staggered delays (100ms, 200ms, 300ms) for card grids
- `prefers-reduced-motion` media query disables animations for accessibility
- Applied to service cards, technology cards, and content sections

**Mobile Navigation** (`src/components/Header.tsx`)
- Dark backdrop overlay on mobile menu open (click to close)
- Slide-down animation for mobile menu panel
- Improved touch targets

### Phase 4: Cleanup + Performance

**Shared ServiceIcon Component** (`src/components/ServiceIcon.tsx`)
- Extracted duplicated icon logic from homepage and services page into shared component
- Handles both EN and ES service name variants
- 14 service icons: implants, fillings, crowns, bridges, veneers/aesthetics, root canal, All-on-Four, orthodontics, periodontics, X-rays, oral surgery, prosthetics, teeth whitening, plus default

**Next.js Configuration** (`next.config.ts`)
- Image optimization: AVIF + WebP formats enabled
- `poweredByHeader: false` for security
- `compress: true` for Gzip
- Security headers: X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (origin-when-cross-origin)

### i18n Keys Added

All new content added to both `en.json` and `es.json`:
- `hero.*` — tagline, subtitle, CTAs, trust badges
- `nav.pricing` — pricing navigation label
- `header.bookAppointment` — CTA button text
- `contactForm.*` — 15 keys for form labels, placeholders, validation, success/error messages
- `savings.*` — 8 keys for comparison table headers and content
- `faq.*` — title, subtitle, 8 Q&A items array
- `socialProof.*` — 3 keys for international patient proof strip
- `team.whyTrustTitle` + `team.whyTrustItems` — trust section content

### Dependencies Added

- `nodemailer` — Email delivery for contact form
- `@types/nodemailer` — TypeScript types (dev dependency)

### Files Created

| File | Purpose |
|------|---------|
| `src/components/ContactForm.tsx` | Contact/inquiry form with validation |
| `src/components/FAQ.tsx` | Accordion FAQ component |
| `src/components/AnimateOnScroll.tsx` | Scroll animation wrapper |
| `src/components/ServiceIcon.tsx` | Shared SVG icon component |
| `src/app/api/contact/route.ts` | Contact form API endpoint |
| `src/app/[locale]/pricing/page.tsx` | Pricing & packages page |
| `src/lib/structured-data.ts` | JSON-LD schema generators |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/[locale]/page.tsx` | Hero rewrite, savings table, FAQ, contact form, animations |
| `src/app/[locale]/layout.tsx` | Meta tags, structured data, SEO |
| `src/app/[locale]/team/page.tsx` | "Why Trust Us" section |
| `src/app/[locale]/services/page.tsx` | Shared ServiceIcon import |
| `src/components/Header.tsx` | Pricing nav link, mobile menu animation |
| `src/components/Footer.tsx` | Pricing quick link |
| `src/app/globals.css` | Animation classes, mobile menu keyframes |
| `next.config.ts` | Image formats, security headers |
| `src/i18n/dictionaries/en.json` | All new English content |
| `src/i18n/dictionaries/es.json` | All new Spanish content |
| `package.json` | nodemailer dependency |

### Environment Variables Required

For the contact form to send emails, these must be set in Vercel:

| Variable | Description |
|----------|-------------|
| `GMAIL_USER` | Gmail address for sending |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not regular password) |
| `CONTACT_EMAIL` | Email address to receive form submissions |
