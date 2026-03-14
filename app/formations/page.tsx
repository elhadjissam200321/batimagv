import Link from "next/link"
import Image from "next/image"
import { Search, Clock, MapPin, GraduationCap, ChevronRight, ArrowRight, BookOpen, Monitor, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"

const levels = ["Tous niveaux", "Bac+2", "Bac+3", "Bac+5", "Formation Continue", "Certification"]
const modes = ["Tous modes", "Présentiel", "E-learning", "Hybride"]
const domains = [
  "Tous domaines", "Génie Civil", "Architecture", "Management BTP", "BIM", "HSE", "Géotechnique", "Topographie", "Électricité"
]

const trainings = [
  {
    id: 1,
    title: "Management de Projet BTP – Niveau Expert",
    institution: "Institut Africain du Bâtiment",
    location: "Casablanca, Maroc",
    duration: "6 mois",
    level: "Bac+3",
    mode: "Présentiel",
    domain: "Management BTP",
    students: 120,
    image: "/images/training-1.jpg",
    price: "25 000 MAD",
    featured: true,
  },
  {
    id: 2,
    title: "BIM – Modélisation des Informations du Bâtiment",
    institution: "ENITA Campus Dakar",
    location: "Dakar, Sénégal",
    duration: "4 mois",
    level: "Bac+2",
    mode: "Hybride",
    domain: "BIM",
    students: 80,
    image: "/images/training-1.jpg",
    price: "1 200 000 FCFA",
    featured: true,
  },
  {
    id: 3,
    title: "Géotechnique et Fondations Profondes",
    institution: "École Polytechnique d'Abidjan",
    location: "Abidjan, Côte d'Ivoire",
    duration: "3 mois",
    level: "Bac+5",
    mode: "E-learning",
    domain: "Géotechnique",
    students: 45,
    image: "/images/training-1.jpg",
    price: "900 000 FCFA",
    featured: false,
  },
  {
    id: 4,
    title: "Conducteur de Travaux – Certification Professionnelle",
    institution: "CIFOP Maroc",
    location: "Rabat, Maroc",
    duration: "1 an",
    level: "Formation Continue",
    mode: "Présentiel",
    domain: "Génie Civil",
    students: 60,
    image: "/images/training-1.jpg",
    price: "18 000 MAD",
    featured: false,
  },
  {
    id: 5,
    title: "Topographie et SIG Appliqués au BTP",
    institution: "Institut de Topographie de Nairobi",
    location: "Nairobi, Kenya",
    duration: "5 mois",
    level: "Bac+2",
    mode: "E-learning",
    domain: "Topographie",
    students: 90,
    image: "/images/training-1.jpg",
    price: "45 000 KES",
    featured: false,
  },
  {
    id: 6,
    title: "HSE – Hygiène Sécurité Environnement sur Chantier",
    institution: "CFCA – Centre de Formation Construction Afrique",
    location: "Dakar, Sénégal",
    duration: "2 mois",
    level: "Certification",
    mode: "Présentiel",
    domain: "HSE",
    students: 35,
    image: "/images/training-1.jpg",
    price: "650 000 FCFA",
    featured: false,
  },
]

const modeIcons = {
  Présentiel: Users,
  "E-learning": Monitor,
  Hybride: BookOpen,
}

const modeColors: Record<string, string> = {
  Présentiel: "bg-[#0E1F2F] text-white",
  "E-learning": "bg-[#F28C28] text-white",
  Hybride: "bg-secondary text-foreground border border-border",
}

export default function FormationsPage() {
  return (
    <main>
      <Navbar />

      {/* Page header */}
      <section className="bg-[#0E1F2F] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-3">
            <Link href="/" className="hover:text-[#F28C28] transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">Formations</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Formations Professionnelles BTP</h1>
          <p className="text-white/60 text-base">
            Développez vos compétences avec les meilleures formations du secteur de la construction en Afrique
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "320+", label: "Formations disponibles" },
              { value: "48", label: "Institutions partenaires" },
              { value: "15 000+", label: "Étudiants formés" },
              { value: "22", label: "Pays couverts" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[#F28C28] text-xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & filters */}
      <div className="bg-background border-b border-border py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Titre de formation, institution..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
              />
            </div>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground">
              {domains.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground">
              {levels.map((l) => <option key={l}>{l}</option>)}
            </select>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground">
              {modes.map((m) => <option key={m}>{m}</option>)}
            </select>
            <button className="bg-[#F28C28] text-white text-sm font-bold px-6 py-2.5 hover:bg-orange-600 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
              Chercher
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured */}
        <div className="mb-12">
          <SectionHeader title="Formations à la une" subtitle="Sélection des meilleures formations du moment" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainings.filter((t) => t.featured).map((training) => (
              <Link
                key={training.id}
                href={`/formations/${training.id}`}
                className="group flex gap-0 bg-background border border-[#F28C28]/40 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-44 shrink-0 overflow-hidden">
                  <Image
                    src={training.image}
                    alt={training.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0E1F2F]/30" />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 ${modeColors[training.mode] ?? "bg-secondary"}`}>
                      {training.mode}
                    </span>
                    <span className="bg-[#F28C28] text-white text-xs font-bold px-2 py-0.5">À la une</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1 leading-snug group-hover:text-[#F28C28] transition-colors text-balance">
                    {training.title}
                  </h3>
                  <p className="text-[#F28C28] text-xs font-semibold mb-3">{training.institution}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
                      {training.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F28C28]" />
                      {training.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#F28C28]" />
                      {training.level}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-foreground font-bold text-sm">{training.price}</span>
                    <span className="text-[#F28C28] text-xs font-semibold flex items-center gap-1">
                      Voir <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All trainings */}
        <SectionHeader title="Toutes les formations" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainings.map((training) => {
            const ModeIcon = modeIcons[training.mode as keyof typeof modeIcons] ?? BookOpen
            return (
              <Link
                key={training.id}
                href={`/formations/${training.id}`}
                className="group bg-background border border-border overflow-hidden hover:shadow-lg hover:border-[#F28C28]/40 transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={training.image}
                    alt={training.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-2.5 py-1 ${modeColors[training.mode] ?? "bg-secondary"}`}>
                      {training.mode}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 text-foreground text-xs font-bold px-2 py-0.5">
                      {training.domain}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1 leading-snug group-hover:text-[#F28C28] transition-colors text-balance">
                    {training.title}
                  </h4>
                  <p className="text-[#F28C28] text-xs font-semibold mb-3">{training.institution}</p>
                  <div className="grid grid-cols-2 gap-y-1 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{training.location.split(",")[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{training.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />{training.level}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />{training.students} étudiants
                    </div>
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="text-foreground font-bold text-sm">{training.price}</span>
                    <span className="text-[#F28C28] text-xs font-semibold flex items-center gap-1">
                      Voir <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <Footer />
    </main>
  )
}
