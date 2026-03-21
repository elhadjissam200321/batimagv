-- Create sectors table
CREATE TABLE IF NOT EXISTS sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sector TEXT NOT NULL,
  location TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  image_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  company_id UUID REFERENCES companies(id),
  location TEXT,
  job_type TEXT,
  salary_min DECIMAL,
  salary_max DECIMAL,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create trainings table
CREATE TABLE IF NOT EXISTS trainings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  location TEXT,
  duration TEXT,
  level TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  location TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create real estate listings table
CREATE TABLE IF NOT EXISTS real_estate_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  property_type TEXT,
  price DECIMAL,
  location TEXT,
  area DECIMAL,
  rooms INTEGER,
  bathrooms INTEGER,
  image_url TEXT,
  images_urls TEXT[],
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample sectors
INSERT INTO sectors (name, slug, description, icon) VALUES
  ('Maçonnerie', 'maconnerie', 'Services de maçonnerie et construction', 'fa-hammer'),
  ('Électricité', 'electricite', 'Services électriques et installation', 'fa-bolt'),
  ('Plomberie', 'plomberie', 'Services de plomberie et tuyauterie', 'fa-water'),
  ('Charpente', 'charpente', 'Services de charpente et menuiserie', 'fa-tree'),
  ('Carrelage', 'carrelage', 'Services de carrelage et revêtement', 'fa-square'),
  ('Peinture', 'peinture', 'Services de peinture et décoration', 'fa-paintbrush')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample real estate listings
INSERT INTO real_estate_listings (title, slug, description, property_type, price, location, area, rooms, bathrooms, contact_name, contact_phone, contact_email, published) VALUES
  ('Villa moderne - 200m²', 'villa-moderne-200m2', 'Superbe villa avec jardin et garage', 'Maison', 450000, 'Casablanca', 200, 4, 2, 'Ahmed Hassan', '+212 612 345 678', 'ahmed@example.com', TRUE),
  ('Appartement T3 - Centre ville', 'appartement-t3-centre', 'Appartement spacieux en plein centre', 'Appartement', 250000, 'Rabat', 120, 3, 1, 'Fatima Zainab', '+212 623 456 789', 'fatima@example.com', TRUE),
  ('Terrain constructible 500m²', 'terrain-500m2', 'Terrain bien situé pour construction', 'Terrain', 100000, 'Fes', 500, 0, 0, 'Mohamed Saidi', '+212 634 567 890', 'mohamed@example.com', TRUE)
ON CONFLICT (slug) DO NOTHING;
