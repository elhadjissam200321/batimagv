import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-[#603C2D] min-h-[520px] flex flex-col overflow-hidden">
      {/* Top ad banner */}
      <div className="w-full bg-[#F4F5F6] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
          <div className="w-full max-w-4xl h-12 bg-[#E2E5E9] flex items-center justify-center">
            <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Espace Publicitaire – Leaderboard 728×90
            </span>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative flex-1 flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-construction.jpg"
            alt="Construction en Afrique"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        {/* Overlay pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.05) 39px, rgba(255,255,255,0.05) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.05) 39px, rgba(255,255,255,0.05) 40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="max-w-3xl">
            {/* Label */}
              <div className="inline-flex items-center gap-2 bg-[#FF9000] px-3 py-1 mb-6">
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                Plateforme BTP Afrique
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 text-balance">
              La référence média &amp; business de la{" "}
              <span className="text-[#FF9000]">construction en Afrique</span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl text-balance">
              Actualités, annuaire d'entreprises, formations et offres d'emploi
              pour les professionnels du BTP, des infrastructures et de l'immobilier.
            </p>

            {/* Search bar */}
            <div className="flex gap-0 mb-8 max-w-lg">
              <input
                type="text"
                placeholder="Rechercher une actualité, une entreprise..."
                className="flex-1 bg-white px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#FF9000]"
              />
              <button className="bg-[#FF9000] text-white px-5 py-3.5 hover:bg-orange-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 bg-white text-[#603C2D] text-sm font-bold px-6 py-3 hover:bg-[#FF9000] hover:text-white transition-colors"
              >
                Explorer les actualités
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/annuaire"
                className="inline-flex items-center gap-2 border border-white/40 text-white text-sm font-bold px-6 py-3 hover:border-[#FF9000] hover:text-[#FF9000] transition-colors"
              >
                Découvrir les entreprises
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-white/5 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: "2 500+", label: "Entreprises référencées" },
              { value: "150+", label: "Actualités par mois" },
              { value: "800+", label: "Offres d'emploi" },
              { value: "45", label: "Pays couverts" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[#FF9000] text-2xl font-bold">{stat.value}</p>
                <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
