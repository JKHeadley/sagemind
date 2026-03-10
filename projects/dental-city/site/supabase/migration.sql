-- Dental City — Database Schema
-- Run this in the Supabase SQL Editor after creating your project

-- ============================================
-- 1. Procedures (Dental City's actual price list)
-- ============================================
CREATE TABLE procedures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL,
  category_en TEXT NOT NULL,
  category_es TEXT NOT NULL,
  price_min NUMERIC(10,2) NOT NULL,
  price_max NUMERIC(10,2) NOT NULL,
  us_price_min NUMERIC(10,2),
  us_price_max NUMERIC(10,2),
  description_en TEXT,
  description_es TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. User Profiles (extends Supabase auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. Saved Estimates
-- ============================================
CREATE TABLE estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  source_type TEXT NOT NULL CHECK (source_type IN ('manual', 'ai_upload')),
  source_file_url TEXT,
  items JSONB NOT NULL,
  us_total NUMERIC(10,2),
  dc_total NUMERIC(10,2),
  savings_total NUMERIC(10,2),
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. Row Level Security (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Estimates: users can CRUD their own
CREATE POLICY "Users can view own estimates"
  ON estimates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own estimates"
  ON estimates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own estimates"
  ON estimates FOR DELETE
  USING (auth.uid() = user_id);

-- Procedures: readable by any authenticated user
CREATE POLICY "Authenticated users can view active procedures"
  ON procedures FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_active = true);

-- ============================================
-- 5. Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, phone, country, locale)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', ''),
    COALESCE(NEW.raw_user_meta_data->>'locale', 'en')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 6. Seed initial procedure data
-- (Research-verified ranges — replace with actual clinic prices)
-- ============================================
INSERT INTO procedures (slug, name_en, name_es, category_en, category_es, price_min, price_max, us_price_min, us_price_max, sort_order) VALUES
  ('dental-implant-with-crown', 'Dental Implant (with crown)', 'Implante Dental (con corona)', 'Implants', 'Implantes', 1200, 1800, 3500, 6000, 1),
  ('all-on-4', 'All-on-4 Full Arch', 'All-on-4 Arcada Completa', 'Implants', 'Implantes', 7500, 12000, 20000, 35000, 2),
  ('dental-crown-porcelain', 'Dental Crown (porcelain)', 'Corona Dental (porcelana)', 'Restorations', 'Restauraciones', 350, 600, 1000, 2000, 3),
  ('veneer-porcelain', 'Porcelain Veneer (per tooth)', 'Carilla de Porcelana (por diente)', 'Aesthetics', 'Estética', 400, 700, 800, 2500, 4),
  ('root-canal', 'Root Canal', 'Endodoncia', 'Endodontics', 'Endodoncia', 290, 500, 700, 1500, 5),
  ('orthodontics-full', 'Orthodontics (full treatment)', 'Ortodoncia (tratamiento completo)', 'Orthodontics', 'Ortodoncia', 1500, 3000, 4000, 8000, 6),
  ('teeth-whitening', 'Teeth Whitening (BEYOND POLUS)', 'Blanqueamiento Dental (BEYOND POLUS)', 'Aesthetics', 'Estética', 200, 350, 400, 800, 7),
  ('dental-bridge-3unit', 'Dental Bridge (3 unit)', 'Puente Dental (3 unidades)', 'Restorations', 'Restauraciones', 900, 1800, 2500, 5000, 8),
  ('composite-filling', 'Composite Filling', 'Relleno Compuesto', 'General', 'General', 50, 120, 150, 450, 9),
  ('full-denture', 'Full Denture (per arch)', 'Dentadura Completa (por arcada)', 'Prosthetics', 'Prótesis', 500, 1000, 1000, 3000, 10),
  ('dental-cleaning', 'Dental Cleaning', 'Limpieza Dental', 'General', 'General', 50, 80, 100, 300, 11),
  ('extraction-simple', 'Simple Extraction', 'Extracción Simple', 'Surgery', 'Cirugía', 50, 100, 150, 350, 12),
  ('extraction-surgical', 'Surgical Extraction', 'Extracción Quirúrgica', 'Surgery', 'Cirugía', 100, 250, 200, 600, 13),
  ('bone-graft', 'Bone Graft', 'Injerto Óseo', 'Surgery', 'Cirugía', 200, 500, 500, 1500, 14),
  ('panoramic-xray', 'Panoramic X-Ray', 'Radiografía Panorámica', 'Diagnostics', 'Diagnóstico', 30, 60, 100, 250, 15),
  ('cbct-3d-scan', 'CBCT 3D Scan', 'Tomografía CBCT 3D', 'Diagnostics', 'Diagnóstico', 80, 150, 250, 600, 16);

-- ============================================
-- 7. Create storage bucket for estimate uploads
-- ============================================
-- Run this separately in the Supabase dashboard:
-- Storage > New Bucket > "estimate-uploads" > Private
-- Then add a policy:
--   SELECT: auth.uid() = (storage.foldername(name))[1]::uuid
--   INSERT: auth.uid() = (storage.foldername(name))[1]::uuid
