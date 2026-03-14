import Link from "next/link"
import {
  Search,
  MapPin,
  Building2,
  Star,
  BadgeCheck,
  Map,
  HardHat,
  PaintBucket,
  Wrench,
  Zap,
  Cog,
  Ruler,
  Share2,
  Users,
  Rss,
  ChevronDown,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Annuaire B2B du Bâtiment | BATIMAG",
  description:
    "Trouvez vos partenaires, fournisseurs et prestataires au Maroc et en Afrique.",
}

const sectors = [
  { icon: HardHat, label: "Gros Œuvre" },
  { icon: PaintBucket, label: "Second Œuvre" },
  { icon: Wrench, label: "Travaux Publics" },
  { icon: Zap, label: "Lots Techniques" },
  { icon: Ruler, label: "Ingénierie" },
  { icon: Cog, label: "Équipements" },
]

const popularTags = ["Gros Œuvre", "Architectes", "Cimenterie", "Énergie Solaire"]

const premiumCompanies = [
  {
    name: "Holcim Maroc",
    sector: "Cimenterie & Gros Œuvre",
    city: "Casablanca",
    rating: "4.9",
    initials: "HM",
    bg: "#e8f0e8",
    fg: "#2d5a2d",
  },
  {
    name: "Jet Contractors",
    sector: "Ingénierie & Façades",
    city: "Rabat",
    rating: "4.8",
    initials: "JC",
    bg: "#1a3044",
    fg: "#ffffff",
  },
  {
    name: "Schneider Electric",
    sector: "Équipements Électriques",
    city: "Casablanca",
    rating: "5.0",
    initials: "SE",
    bg: "#1a3044",
    fg: "#ffffff",
  },
]

const footerSolutions = ["Annuaire Pro", "Espace Appels d'offres", "Publicité & Visibilité", "Marketplace Matériaux"]
const footerCompany = ["À propos", "Contactez-nous", "Mentions légales", "Aide & Support"]

export default function AnnuairePage() {
  return (
    <div className="min-h-screen bg-[#f6f7f8] font-sans text-[#0e1f2f]">
      <Navbar />

      {/* Hero Search */}
      <section
        className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-[#0e1f2f] px-4 py-20"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/hero-construction.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <h1 className="mb-3 text-4xl font-black text-white md:text-6xl text-balance">
            Annuaire B2B du Bâtiment
          </h1>
          <p className="mb-10 text-lg text-slate-300">
            Trouvez vos partenaires, fournisseurs et prestataires au Maroc et en Afrique.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:flex-row">
            <div className="flex flex-1 items-center gap-2 border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Entreprise, produit ou service..."
                className="w-full border-none bg-transparent text-sm text-[#0e1f2f] placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 px-4 py-3">
              <MapPin size={18} className="shrink-0 text-slate-400" />
              <select className="w-full cursor-pointer appearance-none border-none bg-transparent text-sm text-[#0e1f2f] focus:outline-none">
                <option>Tout le Maroc</option>
                <option>Afrique du Nord</option>
                <option>Afrique de l&apos;Ouest</option>
                <option>International</option>
              </select>
              <ChevronDown size={14} className="shrink-0 text-slate-400" />
            </div>
            <button className="flex shrink-0 items-center justify-center gap-2 bg-[#0e1f2f] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#1a3044]">
              <Search size={16} />
              Rechercher
            </button>
          </div>

          {/* Popular Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
            <span className="font-medium">Populaire :</span>
            {popularTags.map((tag) => (
              <a
                key={tag}
                href="#"
                className="underline underline-offset-2 transition-colors hover:text-white"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0e1f2f]">Explorer par Secteur</h2>
            <p className="mt-1 text-sm text-slate-500">
              Naviguez à travers nos catégories professionnelles spécialisées
            </p>
          </div>
          <a
            href="#"
            className="whitespace-nowrap text-sm font-bold text-[#0e1f2f] underline underline-offset-2 transition-colors hover:text-[#F28C28]"
          >
            Voir tous les secteurs
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sectors.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-[#0e1f2f] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0e1f2f]/10 text-[#0e1f2f] transition-colors group-hover:bg-[#0e1f2f] group-hover:text-white">
                <Icon size={22} />
              </div>
              <span className="text-center text-sm font-bold text-[#0e1f2f]">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Premium Companies + Geographic Search */}
      <section className="bg-slate-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8">
          {/* Companies List */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0e1f2f]">Entreprises Premium</h2>
              <span className="text-sm font-medium text-slate-500">Mise en avant</span>
            </div>
            <div className="flex flex-col gap-4">
              {premiumCompanies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-base font-black"
                    style={{ backgroundColor: company.bg, color: company.fg }}
                  >
                    {company.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-bold text-[#0e1f2f]">{company.name}</h3>
                      <BadgeCheck size={16} className="shrink-0 text-blue-500" />
                    </div>
                    <p className="truncate text-sm text-slate-500">{company.sector}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {company.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={11} /> {company.rating}
                      </span>
                    </div>
                  </div>
                  <button className="shrink-0 rounded-lg border border-[#0e1f2f] px-3 py-1.5 text-xs font-bold text-[#0e1f2f] transition-colors hover:bg-[#0e1f2f] hover:text-white">
                    Profil
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Search Card */}
          <div
            className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl shadow-xl"
            style={{
              backgroundImage: "url('/images/company-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[#0e1f2f]/70" />
            <div className="relative z-10 flex flex-col items-center p-12 text-center text-white">
              <Map size={52} className="mb-4 opacity-80" />
              <h3 className="mb-4 text-3xl font-black">Recherche Géographique</h3>
              <p className="mb-8 max-w-xs leading-relaxed text-slate-200">
                Localisez les entreprises les plus proches de vos chantiers sur
                l&apos;ensemble du territoire national et panafricain.
              </p>
              <button className="rounded-lg bg-white px-8 py-3 font-bold text-[#0e1f2f] shadow-lg transition-transform hover:scale-105">
                Ouvrir la carte interactive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-[#0e1f2f] px-10 py-14 md:flex-row">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="mb-4 text-3xl font-black text-white text-balance">
              Augmentez votre visibilité professionnelle
            </h2>
            <p className="leading-relaxed text-slate-400">
              Rejoignez le premier annuaire B2B de la construction au Maroc. Générez des
              leads qualifiés et trouvez vos futurs partenaires stratégiques.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <button className="rounded-xl bg-white px-8 py-4 text-sm font-black text-[#0e1f2f] transition-colors hover:bg-slate-100">
              Inscrire mon entreprise
            </button>
            <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white/20">
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
