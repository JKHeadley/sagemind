-- Add patient_currency column to submissions table
-- Stores the ISO 4217 currency code detected from the patient's uploaded documents
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS patient_currency TEXT DEFAULT 'USD';
