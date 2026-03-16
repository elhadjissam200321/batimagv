-- ===========================================
-- PROPERTIES TABLE (Offres Immobilières)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Maison', 'Appartement', 'Bureau', 'Commercial', 'Terrain', 'Duplex', 'Villa')),
  status TEXT NOT NULL CHECK (status IN ('À vendre', 'À louer', 'Vendu', 'Loué')),
  price NUMERIC(15,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  price_unit TEXT DEFAULT '',
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  surface NUMERIC(10,2) NOT NULL,
  land_area NUMERIC(10,2) DEFAULT 0,
  year_built INTEGER,
  images TEXT[] NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  features TEXT[],
  amenities JSONB,
  agent_name TEXT NOT NULL,
  agent_title TEXT,
  agent_phone TEXT,
  agent_email TEXT,
  agent_image TEXT,
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- PROPERTIES INDEXES
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_country ON public.properties(country);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_published_at ON public.properties(published_at DESC);

-- ===========================================
-- ROW LEVEL SECURITY FOR PROPERTIES
-- ===========================================
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for properties" ON public.properties FOR SELECT USING (true);
