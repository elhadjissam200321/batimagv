-- Seed properties data
INSERT INTO properties (title, slug, type, status, price, currency, price_unit, location, address, country, bedrooms, bathrooms, surface, land_area, year_built, description, images, is_featured, is_new, amenities_json, agent_json, published_at, latitude, longitude) VALUES
('Villa Moderne avec Piscine', 'villa-moderne-piscine', 'Villa', 'À vendre', 350000000, 'XOF', '', 'Almadies, Dakar', 'Rue des Almadies, Dakar', 'Sénégal', 4, 3, 450, 1200, 2022, 'Superbe villa moderne de 450 m² avec piscine privée, jardin paysagé et vue sur l''océan. Climatisation centrale, cuisine équipée, cave à vin et home cinéma.', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80","https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80","https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"]', true, true, '{"interior":["Climatisation","Cuisine équipée","Home cinéma","Cave"],"exterior":["Piscine","Jardin","Terrasse"]}', '{"name":"Ahmed Sall","phone":"+221 77 123 45 67"}', NOW(), 14.6895, -17.5432),
('Appartement Haut Standing', 'appartement-haut-standing', 'Appartement', 'À vendre', 150000000, 'XOF', '', 'Plateau, Dakar', 'Immeuble Prestige, Avenue Bourguiba', 'Sénégal', 3, 2, 180, 0, 2023, 'Bel appartement de 180 m² avec vue panoramique sur la baie. Électroménagers haut de gamme, parquet massif et finitions luxueuses.', '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80","https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1200&q=80"]', true, false, '{"interior":["Climatisation","Cuisine équipée"],"security":["Interphone","Digicode"]}', '{"name":"Fatou Diop","phone":"+221 78 234 56 78"}', NOW(), 14.6928, -17.4467),
('Bureau Standing au Plateau', 'bureau-plateau-dakar', 'Bureau', 'À louer', 2500000, 'XOF', '/mois', 'Plateau, Dakar', 'Business Center, Avenue Léopold Sédar Senghor', 'Sénégal', 0, 2, 250, 0, 2021, 'Espace de bureau moderne de 250 m² avec fibre optique et climatisation. Idéal pour les professionnels.', '["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"]', true, false, '{"interior":["Climatisation","Fibre optique"],"security":["Sécurité 24h"]}', '{"name":"Ibrahima Diallo","phone":"+221 77 345 67 89"}', NOW(), 14.6928, -17.4467),
('Terrain Constructible Marrakech', 'terrain-constructible-marrakech', 'Terrain', 'À vendre', 800000, 'MAD', '', 'Route de l''Ourika, Marrakech', 'Km 15, Route de l''Ourika', 'Maroc', 0, 0, 2000, 2000, 0, 'Magnifique terrain de 2000 m² avec vue sur l''Atlas. Viabilisé et titre foncier en règle.', '["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80"]', false, false, '{"exterior":["Vue montagne","Titre foncier"]}', '{"name":"Youssef El Amrani","phone":"+212 6 78 90 12 34"}', NOW(), 31.6295, -7.9811),
('Duplex Moderne Douala', 'duplex-moderne-douala', 'Duplex', 'À vendre', 85000000, 'XAF', '', 'Bonanjo, Douala', 'Résidence Les Palmiers, Rue de la Liberté', 'Cameroun', 4, 3, 280, 0, 2023, 'Duplex contemporain de 280 m² avec terrasse panoramique. Finitions modernes et prestations haut de gamme.', '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"]', true, true, '{"interior":["Climatisation","Cuisine équipée"],"exterior":["Terrasse 50m2"]}', '{"name":"Estelle Mbarga","phone":"+237 6 91 23 45 67"}', NOW(), 4.0511, 9.7679),
('Local Commercial CBD Nairobi', 'local-commercial-nairobi', 'Commercial', 'À louer', 3500, 'USD', '/mois', 'CBD, Nairobi', 'Kimathi Street, Central Business District', 'Kenya', 0, 1, 150, 0, 2019, 'Local commercial de 150 m² avec grande vitrine. Emplacement premium au cœur du centre-ville.', '["https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=1200&q=80"]', false, false, '{"interior":["Vitrine grande","Climatisation"],"security":["Alarme","Rideau métallique"]}', '{"name":"David Ochieng","phone":"+254 722 123 456"}', NOW(), -1.2921, 36.8219),
('Studio Moderne Abidjan', 'studio-moderne-abidjan', 'Studio', 'À louer', 250000, 'XOF', '/mois', 'Cocody, Abidjan', 'Immeuble Résidence, Boulevard Giscard d''Estaing', 'Côte d''Ivoire', 1, 1, 50, 0, 2022, 'Studio moderne et lumineux de 50 m² avec cuisine ouverte. Immeuble sécurisé avec ascenseur et gardien.', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"]', false, true, '{"interior":["Cuisine ouverte","Climatisation"],"security":["Gardien","Ascenseur"]}', '{"name":"Marie Kouassi","phone":"+225 07 89 12 34 56"}', NOW(), 6.8276, -5.2893),
('Maison Traditionnelle Djerba', 'maison-traditionnelle-djerba', 'Maison', 'À vendre', 250000, 'TND', '', 'Djerba, Médenine', 'Quartier Touristique, Djerba', 'Tunisie', 3, 2, 200, 800, 1995, 'Charmante maison traditionnelle tunisienne de 200 m² avec riad intérieur et patio. Idéale pour guesthouse ou résidence.', '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80"]', false, false, '{"interior":["Riad","Patio"],"exterior":["Jardin"]}', '{"name":"Hassan Ben Ali","phone":"+216 95 123 456"}', NOW(), 33.8869, 10.3863),
('Penthouse Casablanca', 'penthouse-casablanca', 'Penthouse', 'À vendre', 15000000, 'MAD', '', 'Centre-Ville, Casablanca', 'Corniche, Casablanca', 'Maroc', 4, 3, 320, 0, 2024, 'Penthouse prestige de 320 m² en première ligne de corniche avec vue panoramique sur l''océan Atlantique. Piscine privée et terrasse.', '["https://images.unsplash.com/photo-1600121848371-bb4dc53f3a86?w=1200&q=80","https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"]', true, true, '{"interior":["Piscine privée","Vue océan"],"exterior":["Terrasse grande","Jardin zen"]}', '{"name":"Karim El Fassi","phone":"+212 5 22 12 34 56"}', NOW(), 33.5573, -7.5898),
('Loft Industriel Lagos', 'loft-industriel-lagos', 'Loft', 'À louer', 5000, 'USD', '/mois', 'Ikoyi, Lagos', 'Renovated Warehouse, Ikoyi Road', 'Nigeria', 2, 2, 200, 0, 2021, 'Loft industriel chic de 200 m² avec hauts plafonds et grandes baies vitrées. Parking inclus et accès 24h/24.', '["https://images.unsplash.com/photo-1600585154891-36fee85dbd8e?w=1200&q=80"]', false, false, '{"interior":["Hauts plafonds","Baies vitrées"],"exterior":["Parking inclus"]}', '{"name":"Chioma Okafor","phone":"+234 703 123 4567"}', NOW(), 6.4969, 3.5636);

-- Create sectors/industries table for "Voir tous les secteurs"
CREATE TABLE IF NOT EXISTS sectors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(7),
  company_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for sectors
CREATE POLICY "Public read access" ON sectors
  FOR SELECT USING (true);

-- Seed sectors
INSERT INTO sectors (name, slug, description, company_count) VALUES
('Construction', 'construction', 'Entreprises de construction civile et travaux publics', 45),
('Immobilier', 'immobilier', 'Agences immobilières et promoteurs immobiliers', 32),
('Architecture', 'architecture', 'Cabinet d''architecture et design', 28),
('Ingénierie', 'ingenierie', 'Bureaux d''études et ingénierie', 35),
('Matériaux de construction', 'materiaux-construction', 'Fournisseurs de matériaux de construction', 52),
('Électricité', 'electricite', 'Entreprises d''électricité et électrotechnique', 40),
('Plomberie', 'plomberie', 'Installations et réparations de plomberie', 25),
('Menuiserie', 'menuiserie', 'Menuiserie aluminium, bois et PVC', 38),
('Décoration', 'decoration', 'Décoration d''intérieur et design', 22),
('Jardinage', 'jardinage', 'Espaces verts et paysagisme', 18);
