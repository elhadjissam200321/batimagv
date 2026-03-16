'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heart, MapPin, Bed, Bath, Maximize2, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const ITEMS_PER_PAGE = 9;

const propertyTypes = ['Tous types', 'Villa', 'Appartement', 'Bureau', 'Terrain', 'Duplex', 'Commercial', 'Maison'];
const countries = ['Tous pays', 'Maroc', 'Sénégal', 'Côte d\'Ivoire', 'Cameroun', 'Kenya', 'Tunisie', 'Nigeria'];

function PropertyCard({ property }: { property: any }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };

  return (
    <Link
      href={`/offres-immobilieres/${property.slug}`}
      className="group block bg-background rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[currentImage]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex gap-2">
          {property.is_new && (
            <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
              Nouveau
            </span>
          )}
          {property.is_featured && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              En vedette
            </span>
          )}
        </div>

        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 size-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
        >
          <Heart
            className={`size-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`}
          />
        </button>

        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
            >
              <ChevronLeft className="size-5 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
            >
              <ChevronRight className="size-5 text-foreground" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, idx: number) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImage(idx);
                  }}
                  className={`size-2 rounded-full transition-all ${
                    idx === currentImage ? 'bg-white w-4' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
          <MapPin className="size-4 text-accent" />
          <span className="text-sm">{property.location}, {property.country}</span>
        </div>

        <h3 className="font-semibold text-foreground text-lg mb-3 line-clamp-1 group-hover:text-accent transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="size-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath className="size-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Maximize2 className="size-4" />
            <span>{Math.round(property.surface)} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-lg font-bold text-primary">
            {formatPrice(property.price, property.currency)}
            {property.price_unit && (
              <span className="text-xs font-normal text-muted-foreground ml-1">{property.price_unit}</span>
            )}
          </span>
          <span className="text-accent text-sm font-semibold flex items-center gap-1">
            Voir <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function OffresImmobilieresPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const currentPage = parseInt(searchParams.get('page') || '1');
  const [propertiesData, setPropertiesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/properties?search=${encodeURIComponent(searchTerm)}&type=${encodeURIComponent(propertyType)}&country=${encodeURIComponent(country)}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );
        const data = await res.json();
        setPropertiesData(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchTerm, propertyType, country, currentPage]);

  const properties = propertiesData?.data || [];
  const totalPages = propertiesData?.totalPages || 1;
  const total = propertiesData?.total || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/offres-immobilieres?search=${encodeURIComponent(searchTerm)}&type=${encodeURIComponent(propertyType)}&country=${encodeURIComponent(country)}&page=1`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/offres-immobilieres?search=${encodeURIComponent(searchTerm)}&type=${encodeURIComponent(propertyType)}&country=${encodeURIComponent(country)}&page=${page}`);
  };

  const handleReset = () => {
    setSearchTerm('');
    setPropertyType('');
    setCountry('');
    router.push('/offres-immobilieres');
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-white/70">Offres Immobilières</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <i className="fa-solid fa-building text-accent text-2xl md:text-3xl"></i>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
              Offres Immobilières
            </h1>
          </div>
          <p className="text-white/60 text-base md:text-lg max-w-2xl">
            Découvrez les meilleures opportunités immobilières en Afrique : villas, appartements, bureaux et terrains.
          </p>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <div className="bg-background border-b border-border sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex flex-col gap-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="text"
                placeholder="Rechercher une propriété..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent rounded-xl"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 py-3 bg-secondary border border-border rounded-xl text-sm font-medium"
            >
              <SlidersHorizontal className="size-4" />
              Filtres
            </button>
          </form>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="text"
                placeholder="Rechercher par ville, quartier ou titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent rounded-xl"
              />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl min-w-[140px]"
            >
              {propertyTypes.map((t) => <option key={t} value={t === 'Tous types' ? '' : t}>{t}</option>)}
            </select>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl min-w-[140px]"
            >
              {countries.map((c) => <option key={c} value={c === 'Tous pays' ? '' : c}>{c}</option>)}
            </select>
            <button type="submit" className="bg-accent text-white text-sm font-bold px-6 py-3 hover:bg-accent/90 transition-colors flex items-center gap-2 rounded-xl">
              <Search className="size-4" />
              Rechercher
            </button>
          </form>

          {/* Mobile filters */}
          {showFilters && (
            <form onSubmit={handleSearch} className="md:hidden mt-3 pt-3 border-t border-border space-y-3">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl"
              >
                {propertyTypes.map((t) => <option key={t} value={t === 'Tous types' ? '' : t}>{t}</option>)}
              </select>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl"
              >
                {countries.map((c) => <option key={c} value={c === 'Tous pays' ? '' : c}>{c}</option>)}
              </select>
              <button type="submit" className="w-full bg-accent text-white text-sm font-bold px-6 py-3 hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 rounded-xl">
                <Search className="size-4" />
                Rechercher
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {total} bien{total !== 1 ? 's' : ''} disponible{total !== 1 ? 's' : ''}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {searchTerm || propertyType || country ? 'Résultats de votre recherche' : 'Trouvez votre bien idéal parmi notre sélection'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Vue:</span>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <Grid3x3 className="size-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {properties.length > 0 ? (
          <>
            {/* Property grid/list */}
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {properties.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = Math.max(1, currentPage - 2) + i;
                  return pageNum <= totalPages ? pageNum : null;
                }).filter(Boolean).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-border hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-border">
            <i className="fa-solid fa-search text-5xl text-muted-foreground mb-4"></i>
            <h3 className="text-xl font-semibold text-primary mb-2">Aucun bien trouvé</h3>
            <p className="text-muted-foreground mb-6">Essayez une autre recherche ou réinitialisez les filtres</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center">
          <i className="fa-solid fa-house-chimney text-accent text-4xl mb-4"></i>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Vous avez un bien à vendre ou à louer ?
          </h3>
          <p className="text-white/60 max-w-xl mx-auto mb-6">
            Publiez votre annonce sur BATIMAG et touchez des milliers de professionnels et particuliers en Afrique.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white font-bold px-8 py-3 rounded-xl hover:bg-accent/90 transition-colors"
          >
            <i className="fa-solid fa-plus"></i>
            Déposer une annonce
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
