-- Dental City — Phase 1 Migration
-- Run this in the Supabase SQL Editor AFTER the initial migration.sql
-- Adds: submissions pipeline, preferred contact, submission files

-- ============================================
-- 1. Add preferred_contact to profiles
-- ============================================
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS preferred_contact TEXT
    CHECK (preferred_contact IN ('email', 'phone', 'whatsapp'))
    DEFAULT 'email';

-- ============================================
-- 2. Submissions table
-- ============================================
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
  procedures JSONB NOT NULL,
  total_us_price NUMERIC(10,2),
  total_dc_price NUMERIC(10,2),
  total_savings NUMERIC(10,2),
  savings_percentage NUMERIC(5,2),

  -- Drive storage
  drive_folder_id TEXT,
  drive_folder_url TEXT,
  branded_pdf_id TEXT,
  file_count INTEGER DEFAULT 0,

  -- Consent
  consent_given BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,

  -- Case management (used by admin portal in Phase 2)
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'booked', 'closed', 'cancelled')),
  assigned_to TEXT,
  notes TEXT,
  last_contacted_at TIMESTAMPTZ,

  -- AI metadata
  ai_confidence TEXT CHECK (ai_confidence IN ('high', 'medium', 'low')),
  ai_warnings TEXT[]
);

-- ============================================
-- 3. Submission files table
-- ============================================
CREATE TABLE submission_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  drive_file_id TEXT,
  drive_url TEXT,
  is_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. Indexes
-- ============================================
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created ON submissions(created_at DESC);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submission_files_submission ON submission_files(submission_id);

-- ============================================
-- 5. Row Level Security
-- ============================================
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_files ENABLE ROW LEVEL SECURITY;

-- Patients can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON submissions FOR SELECT
  USING (auth.uid() = user_id);

-- Patients can insert their own submissions
CREATE POLICY "Users can insert own submissions"
  ON submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role (backend) can do everything — no policy needed, bypasses RLS

-- Staff can view all submissions (Phase 2 — identified by email domain)
CREATE POLICY "Staff can view all submissions"
  ON submissions FOR SELECT
  USING (
    auth.jwt()->>'email' LIKE '%@dentalcitycr.com'
  );

-- Staff can update all submissions
CREATE POLICY "Staff can update all submissions"
  ON submissions FOR UPDATE
  USING (
    auth.jwt()->>'email' LIKE '%@dentalcitycr.com'
  );

-- Submission files: same policies follow submission access
CREATE POLICY "Users can view own submission files"
  ON submission_files FOR SELECT
  USING (
    submission_id IN (
      SELECT id FROM submissions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own submission files"
  ON submission_files FOR INSERT
  WITH CHECK (
    submission_id IN (
      SELECT id FROM submissions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view all submission files"
  ON submission_files FOR SELECT
  USING (
    auth.jwt()->>'email' LIKE '%@dentalcitycr.com'
  );

-- ============================================
-- 6. Update handle_new_user trigger to include preferred_contact
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, phone, country, preferred_contact, locale)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', ''),
    COALESCE(NEW.raw_user_meta_data->>'preferred_contact', 'email'),
    COALESCE(NEW.raw_user_meta_data->>'locale', 'en')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
