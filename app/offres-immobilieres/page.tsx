"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Heart, MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Grid, List } from "lucide-react"

// Mock data for properties
const properties = [
  {
    id: "1",
    slug: "villa-moderne-casablanca",
    title: "Villa Moderne avec Piscine",
    type: "Villa",
    price: 2500000,
    currency: "MAD",
    priceUnit: "",
    location: "Ain Diab, Casablanca",
    country: "Maroc",
    bedrooms: 5,
    bathrooms: 4,
    surface: 450,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    isFeatured: true,
    isNew: true,
    features: ["Piscine", "Jardin", "Garage", "Vue mer"],
  },
  {
    id: "2",
    slug: "appartement-luxe-abidjan",
    title: "Appartement de Luxe Vue Lagune",
    type: "Appartement",
    price: 150000000,
    currency: "XOF",
    priceUnit: "",
    location: "Cocody, Abidjan",
    country: "Côte d'Ivoire",
    bedrooms: 3,
    bathrooms: 2,
    surface: 180,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80",
    ],
    isFeatured: false,
    isNew: true,
    features: ["Terrasse", "Vue lagune", "Parking", "Sécurité 24h"],
  },
  {
    id: "3",
    slug: "bureau-plateau-dakar",
    title: "Bureau Standing au Plateau",
    type: "Bureau",
    price: 2500000,
    currency: "XOF",
    priceUnit: "/mois",
    location: "Plateau, Dakar",
    country: "Sénégal",
    bedrooms: 0,
    bathrooms: 2,
    surface: 250,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    ],
    isFeatured: true,
    isNew: false,
    features: ["Climatisation", "Open space", "Salle de réunion", "Fibre optique"],
  },
  {
    id: "4",
    slug: "terrain-constructible-marrakech",
    title: "Terrain Constructible avec Vue Atlas",
    type: "Terrain",
    price: 800000,
    currency: "MAD",
    priceUnit: "",
    location: "Route de l'Ourika, Marrakech",
    country: "Maroc",
    bedrooms: 0,
    bathrooms: 0,
    surface: 2000,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
    ],
    isFeatured: false,
    isNew: false,
    features: ["Vue montagne", "Titre foncier", "Accès facile", "Viabilisé"],
  },
  {
    id: "5",
    slug: "duplex-moderne-douala",
    title: "Duplex Moderne avec Terrasse",
    type: "Duplex",
    price: 85000000,
    currency: "XAF",
    priceUnit: "",
    location: "Bonanjo, Douala",
    country: "Cameroun",
    bedrooms: 4,
    bathrooms: 3,
    surface: 280,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    ],
    isFeatured: true,
    isNew: true,
    features: ["Terrasse panoramique", "Cuisine équipée", "Dressing", "Cave"],
  },
  {
    id: "6",
    slug: "local-commercial-nairobi",
    title: "Local Commercial Centre-Ville",
    type: "Commercial",
    price: 3500,
    currency: "USD",
    priceUnit: "/mois",
    location: "CBD, Nairobi",
    country: "Kenya",
    bedrooms: 0,
    bathrooms: 1,
    surface: 150,
    images: [
      "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80",
    ],
    isFeatured: false,
    isNew: false,
    features: ["Vitrine", "Stockage", "Accès handicapé", "Alarme"],
  },
]

const propertyTypes = ["Tous types", "Villa", "Appartement", "Bureau", "Terrain", "Duplex", "Commercial"]
const countries = ["Tous pays", "Maroc", "Côte d'Ivoire", "Sénégal", "Cameroun", "Kenya", "Algérie"]
const priceRanges = ["Tous budgets", "< 100M XOF", "100M - 300M XOF", "> 300M XOF"]

function PropertyCard({ property }: { property: typeof properties[0] }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " " + currency
  }

  return (
    <Link
      href={`/offres-immobilieres/${property.slug}`}
      className="group block bg-background rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
    >
      {/* Image carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[currentImage]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isNew && (
            <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
              Nouveau
            </span>
          )}
          {property.isFeatured && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              En vedette
            </span>
          )}
        </div>

        {/* Like button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 size-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className={`size-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Image navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
              aria-label="Image précédente"
            >
              <ChevronLeft className="size-5 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
              aria-label="Image suivante"
            >
              <ChevronRight className="size-5 text-foreground" />
            </button>

            {/* Image dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImage(idx)
                  }}
                  className={`size-2 rounded-full transition-all ${
                    idx === currentImage ? "bg-white w-4" : "bg-white/60"
                  }`}
                  aria-label={`Image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Property type tag */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
          <MapPin className="size-4 text-accent" />
          <span className="text-sm">{property.location}, {property.country}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground text-lg mb-3 line-clamp-1 group-hover:text-accent transition-colors">
          {property.title}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="size-4" />
              <span>{property.bedrooms} ch.</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath className="size-4" />
              <span>{property.bathrooms} sdb.</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Maximize className="size-4" />
            <span>{property.surface} m²</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xl font-bold text-primary">
            {formatPrice(property.price, property.currency)}
            {property.priceUnit && (
              <span className="text-sm font-normal text-muted-foreground">{property.priceUnit}</span>
            )}
          </span>
          <span className="text-accent text-sm font-semibold flex items-center gap-1">
            Voir <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function OffresImmobilieresPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

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
          {/* Mobile: Compact search */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="text"
                placeholder="Rechercher une propriété..."
                className="w-full pl-10 pr-4 py-3 text-sm bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent rounded-xl"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 py-3 bg-secondary border border-border rounded-xl text-sm font-medium"
            >
              <SlidersHorizontal className="size-4" />
              Filtres
            </button>
          </div>

          {/* Desktop: Full search bar */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="text"
                placeholder="Rechercher par ville, quartier ou titre..."
                className="w-full pl-12 pr-4 py-3 text-sm bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent rounded-xl"
              />
            </div>
            <select className="px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl min-w-[140px]">
              {propertyTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select className="px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl min-w-[140px]">
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl min-w-[160px]">
              {priceRanges.map((p) => <option key={p}>{p}</option>)}
            </select>
            <button className="bg-accent text-white text-sm font-bold px-6 py-3 hover:bg-accent/90 transition-colors flex items-center gap-2 rounded-xl">
              <Search className="size-4" />
              Rechercher
            </button>
          </div>

          {/* Mobile filters dropdown */}
          {showFilters && (
            <div className="md:hidden mt-3 pt-3 border-t border-border space-y-3">
              <select className="w-full px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl">
                {propertyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select className="w-full px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl">
                {countries.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select className="w-full px-4 py-3 text-sm bg-secondary border border-border focus:outline-none text-foreground rounded-xl">
                {priceRanges.map((p) => <option key={p}>{p}</option>)}
              </select>
              <button className="w-full bg-accent text-white text-sm font-bold px-6 py-3 hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 rounded-xl">
                <Search className="size-4" />
                Rechercher
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {properties.length} biens disponibles
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Trouvez votre bien idéal parmi notre sélection
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Vue:</span>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
                aria-label="Vue grille"
              >
                <Grid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
                aria-label="Vue liste"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Property grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors">
            Charger plus de biens
            <ChevronRight className="size-4" />
          </button>
        </div>

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
  )
}
