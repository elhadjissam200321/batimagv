"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  Heart, MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight, 
  Share2, Phone, Mail, Calendar, Check, X, Building, Car, Trees,
  Wifi, Wind, Waves, Shield, Home, Grid3X3
} from "lucide-react"

// Mock property data
const propertiesData: Record<string, any> = {
  "villa-moderne-casablanca": {
    id: "1",
    slug: "villa-moderne-casablanca",
    title: "Villa Moderne avec Piscine",
    type: "Villa",
    status: "À vendre",
    price: 2500000,
    currency: "MAD",
    priceUnit: "",
    location: "Ain Diab, Casablanca",
    address: "123 Boulevard de l'Océan, Ain Diab",
    country: "Maroc",
    bedrooms: 5,
    bathrooms: 4,
    surface: 450,
    landArea: 800,
    yearBuilt: 2022,
    description: `Magnifique villa contemporaine située dans le quartier prisé d'Ain Diab à Casablanca. Cette propriété d'exception offre une vue imprenable sur l'océan Atlantique et bénéficie d'une architecture moderne alliant élégance et confort.

La villa s'étend sur 450 m² habitables et comprend un vaste séjour avec cheminée, une cuisine équipée haut de gamme, 5 chambres spacieuses dont une suite parentale avec dressing et salle de bain privative.

L'extérieur propose une piscine à débordement, un jardin paysager, une terrasse avec coin barbecue et un garage pouvant accueillir 3 véhicules.`,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    isFeatured: true,
    isNew: true,
    features: ["Piscine", "Jardin", "Garage", "Vue mer", "Climatisation", "Système d'alarme"],
    amenities: {
      interior: ["Climatisation centrale", "Chauffage au sol", "Cheminée", "Cuisine équipée", "Dressing", "Home cinéma"],
      exterior: ["Piscine à débordement", "Jardin paysager", "Terrasse", "Barbecue", "Garage 3 voitures"],
      security: ["Système d'alarme", "Vidéosurveillance", "Gardien", "Portail automatique"],
    },
    agent: {
      name: "Ahmed Benali",
      title: "Agent Immobilier Senior",
      phone: "+212 6 12 34 56 78",
      email: "ahmed.benali@batimag.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
    publishedAt: "2024-01-15",
    coordinates: { lat: 33.5731, lng: -7.6298 },
  },
  "appartement-luxe-abidjan": {
    id: "2",
    slug: "appartement-luxe-abidjan",
    title: "Appartement de Luxe Vue Lagune",
    type: "Appartement",
    status: "À vendre",
    price: 150000000,
    currency: "XOF",
    priceUnit: "",
    location: "Cocody, Abidjan",
    address: "Résidence Les Jardins de Cocody, Rue des Ambassades",
    country: "Côte d'Ivoire",
    bedrooms: 3,
    bathrooms: 2,
    surface: 180,
    landArea: 0,
    yearBuilt: 2023,
    description: `Superbe appartement de standing dans la prestigieuse résidence Les Jardins de Cocody. Situé au 8ème étage, il offre une vue panoramique exceptionnelle sur la lagune Ébrié.

L'appartement comprend un grand séjour lumineux avec accès à une terrasse spacieuse, une cuisine américaine entièrement équipée, 3 chambres dont une suite parentale, et 2 salles de bain modernes.

La résidence dispose d'une piscine, d'une salle de sport, d'un parking souterrain sécurisé et d'un service de conciergerie 24h/24.`,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
    ],
    isFeatured: false,
    isNew: true,
    features: ["Terrasse", "Vue lagune", "Parking", "Sécurité 24h", "Piscine résidence", "Ascenseur"],
    amenities: {
      interior: ["Climatisation", "Cuisine équipée", "Parquet", "Placards intégrés", "Double vitrage"],
      exterior: ["Grande terrasse", "Piscine résidence", "Salle de sport", "Parking souterrain"],
      security: ["Gardien 24h/24", "Digicode", "Interphone vidéo", "Ascenseur sécurisé"],
    },
    agent: {
      name: "Marie Kouassi",
      title: "Directrice Commerciale",
      phone: "+225 07 12 34 56 78",
      email: "marie.kouassi@batimag.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    publishedAt: "2024-02-01",
    coordinates: { lat: 5.3600, lng: -4.0083 },
  },
}

// Default property for unknown slugs
const defaultProperty = propertiesData["villa-moderne-casablanca"]

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = use(params)
  const property = propertiesData[id] || defaultProperty

  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "amenities" | "location">("description")

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " " + currency
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const amenityIcons: Record<string, any> = {
    "Climatisation": Wind,
    "Piscine": Waves,
    "Sécurité": Shield,
    "Parking": Car,
    "Jardin": Trees,
    "Wifi": Wifi,
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
            <ChevronRight className="size-3" />
            <Link href="/offres-immobilieres" className="hover:text-accent transition-colors">
              Offres Immobilières
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground line-clamp-1">{property.title}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Desktop: Bento grid */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden">
            {/* Main large image */}
            <div 
              className="col-span-2 row-span-2 relative cursor-pointer group"
              onClick={() => setShowAllPhotos(true)}
            >
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            
            {/* Secondary images */}
            {property.images.slice(1, 5).map((img: string, idx: number) => (
              <div 
                key={idx}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => {
                  setCurrentImage(idx + 1)
                  setShowAllPhotos(true)
                }}
              >
                <Image
                  src={img}
                  alt={`${property.title} - Photo ${idx + 2}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                {/* Show all photos button on last image */}
                {idx === 3 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      +{property.images.length - 5} photos
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={property.images[currentImage]}
              alt={property.title}
              fill
              className="object-cover"
            />
            
            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              aria-label="Image précédente"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              aria-label="Image suivante"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full">
              {currentImage + 1} / {property.images.length}
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {property.isNew && (
                <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Nouveau
                </span>
              )}
              <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {property.status}
              </span>
            </div>
          </div>

          {/* View all photos button (desktop) */}
          <div className="hidden md:flex justify-end mt-3">
            <button
              onClick={() => setShowAllPhotos(true)}
              className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Grid3X3 className="size-4" />
              Voir toutes les photos ({property.images.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                    {property.type}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {property.status}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 text-accent" />
                  <span>{property.address}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="size-10 border border-border rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`size-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button
                  className="size-10 border border-border rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Partager"
                >
                  <Share2 className="size-5" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.bedrooms > 0 && (
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <Bed className="size-6 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                  <p className="text-sm text-muted-foreground">Chambres</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <Bath className="size-6 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                  <p className="text-sm text-muted-foreground">Salles de bain</p>
                </div>
              )}
              <div className="bg-secondary rounded-xl p-4 text-center">
                <Maximize className="size-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{property.surface}</p>
                <p className="text-sm text-muted-foreground">m² habitables</p>
              </div>
              <div className="bg-secondary rounded-xl p-4 text-center">
                <Calendar className="size-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{property.yearBuilt}</p>
                <p className="text-sm text-muted-foreground">Année</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex gap-6">
                {[
                  { key: "description", label: "Description" },
                  { key: "amenities", label: "Équipements" },
                  { key: "location", label: "Localisation" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? "border-accent text-accent"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <div className="prose prose-slate max-w-none">
                    {property.description.split("\n\n").map((paragraph: string, idx: number) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Features tags */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Points forts</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature: string) => (
                        <span
                          key={feature}
                          className="bg-secondary text-foreground text-sm px-4 py-2 rounded-full flex items-center gap-2"
                        >
                          <Check className="size-4 text-accent" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "amenities" && (
                <div className="space-y-8">
                  {/* Interior */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Home className="size-5 text-accent" />
                      Intérieur
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.amenities.interior.map((item: string) => (
                        <div key={item} className="flex items-center gap-3 text-muted-foreground">
                          <Check className="size-5 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exterior */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Trees className="size-5 text-accent" />
                      Extérieur
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.amenities.exterior.map((item: string) => (
                        <div key={item} className="flex items-center gap-3 text-muted-foreground">
                          <Check className="size-5 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Shield className="size-5 text-accent" />
                      Sécurité
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.amenities.security.map((item: string) => (
                        <div key={item} className="flex items-center gap-3 text-muted-foreground">
                          <Check className="size-5 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="size-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{property.address}</p>
                      <p className="text-muted-foreground">{property.location}, {property.country}</p>
                    </div>
                  </div>
                  
                  {/* Map placeholder */}
                  <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center border border-border">
                    <div className="text-center">
                      <MapPin className="size-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Carte interactive</p>
                      <p className="text-sm text-muted-foreground/70">
                        {property.location}, {property.country}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sticky Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-6 pb-6 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Prix</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(property.price, property.currency)}
                    {property.priceUnit && (
                      <span className="text-base font-normal text-muted-foreground">{property.priceUnit}</span>
                    )}
                  </p>
                </div>

                {/* Agent info */}
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={property.agent.image}
                    alt={property.agent.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{property.agent.name}</p>
                    <p className="text-sm text-muted-foreground">{property.agent.title}</p>
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    <Phone className="size-5" />
                    Appeler
                  </a>
                  <a
                    href={`mailto:${property.agent.email}?subject=Demande d'information: ${property.title}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    <Mail className="size-5" />
                    Envoyer un email
                  </a>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Publié le {new Date(property.publishedAt).toLocaleDateString("fr-FR", { 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric" 
                  })}
                </p>
              </div>

              {/* Quick info */}
              <div className="bg-secondary rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Informations rapides</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type de bien</span>
                    <span className="font-medium text-foreground">{property.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Surface habitable</span>
                    <span className="font-medium text-foreground">{property.surface} m²</span>
                  </div>
                  {property.landArea > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Surface terrain</span>
                      <span className="font-medium text-foreground">{property.landArea} m²</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Année de construction</span>
                    <span className="font-medium text-foreground">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pays</span>
                    <span className="font-medium text-foreground">{property.country}</span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-background border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="size-5 text-accent" />
                  Partager cette annonce
                </h3>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white py-2.5 rounded-lg transition-colors">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </button>
                  <button className="flex-1 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white py-2.5 rounded-lg transition-colors">
                    <i className="fa-brands fa-facebook-f"></i>
                  </button>
                  <button className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white py-2.5 rounded-lg transition-colors">
                    <i className="fa-brands fa-whatsapp"></i>
                  </button>
                  <button className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground py-2.5 rounded-lg transition-colors border border-border">
                    <i className="fa-solid fa-link"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full screen gallery modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
          <div className="sticky top-0 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between z-10">
            <h2 className="text-white font-semibold">
              {property.title} - Photos ({property.images.length})
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="size-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <X className="size-6 text-white" />
            </button>
          </div>
          <div className="p-4 max-w-5xl mx-auto space-y-4">
            {property.images.map((img: string, idx: number) => (
              <div key={idx} className="relative aspect-video">
                <Image
                  src={img}
                  alt={`${property.title} - Photo ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
