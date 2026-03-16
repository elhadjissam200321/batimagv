-- BATIMAG Database Schema
-- Tables for: articles, companies, jobs, trainings, events, newsletter_subscribers

-- ===========================================
-- ARTICLES TABLE (Actualites)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL CHECK (category IN ('infrastructures', 'batiment', 'genie-civil', 'energie', 'materiaux', 'reglementation')),
  author_name TEXT NOT NULL DEFAULT 'Redaction BATIMAG',
  author_avatar TEXT,
  reading_time INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- COMPANIES TABLE (Annuaire B2B)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  long_description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Guinee',
  phone TEXT,
  email TEXT,
  website TEXT,
  year_founded INTEGER,
  employees_count TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  rating NUMERIC(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  certifications TEXT[],
  services TEXT[],
  projects_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- JOBS TABLE (Emplois)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  location TEXT NOT NULL,
  country TEXT DEFAULT 'Guinee',
  contract_type TEXT NOT NULL CHECK (contract_type IN ('CDI', 'CDD', 'Stage', 'Mission', 'Freelance')),
  sector TEXT NOT NULL,
  salary_range TEXT,
  is_urgent BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  experience_level TEXT,
  application_url TEXT,
  application_email TEXT,
  expires_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- TRAININGS TABLE (Formations)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.trainings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  institution_logo TEXT,
  description TEXT NOT NULL,
  objectives TEXT[],
  program TEXT,
  prerequisites TEXT[],
  domain TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Debutant', 'Intermediaire', 'Avance', 'Expert')),
  mode TEXT NOT NULL CHECK (mode IN ('Presentiel', 'E-learning', 'Hybride')),
  duration TEXT NOT NULL,
  price NUMERIC(10,2),
  currency TEXT DEFAULT 'GNF',
  max_participants INTEGER,
  location TEXT,
  start_date DATE,
  end_date DATE,
  certification TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- EVENTS TABLE (Evenements)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  cover_image TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('conference', 'salon', 'webinaire', 'formation', 'networking', 'autre')),
  location TEXT NOT NULL,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Guinee',
  is_online BOOLEAN DEFAULT false,
  online_url TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  registration_url TEXT,
  price NUMERIC(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'GNF',
  organizer_name TEXT NOT NULL,
  organizer_logo TEXT,
  max_attendees INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  interests TEXT[],
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON public.articles(is_featured);

CREATE INDEX IF NOT EXISTS idx_companies_slug ON public.companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_category ON public.companies(category);
CREATE INDEX IF NOT EXISTS idx_companies_city ON public.companies(city);
CREATE INDEX IF NOT EXISTS idx_companies_is_premium ON public.companies(is_premium);

CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_sector ON public.jobs(sector);
CREATE INDEX IF NOT EXISTS idx_jobs_contract_type ON public.jobs(contract_type);
CREATE INDEX IF NOT EXISTS idx_jobs_country ON public.jobs(country);
CREATE INDEX IF NOT EXISTS idx_jobs_is_urgent ON public.jobs(is_urgent);

CREATE INDEX IF NOT EXISTS idx_trainings_slug ON public.trainings(slug);
CREATE INDEX IF NOT EXISTS idx_trainings_domain ON public.trainings(domain);
CREATE INDEX IF NOT EXISTS idx_trainings_level ON public.trainings(level);
CREATE INDEX IF NOT EXISTS idx_trainings_mode ON public.trainings(mode);

CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON public.events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON public.events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_city ON public.events(city);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);

-- ===========================================
-- ROW LEVEL SECURITY (Public Read Access)
-- ===========================================
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read access for articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public read access for companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Public read access for jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Public read access for trainings" ON public.trainings FOR SELECT USING (true);
CREATE POLICY "Public read access for events" ON public.events FOR SELECT USING (true);

-- Newsletter: anyone can insert (subscribe), but only admins can read
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
