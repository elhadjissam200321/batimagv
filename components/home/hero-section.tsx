import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight } from "lucide-react"
import { ZelligeBorder } from "@/components/moroccan-patterns"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-moroccan-primary to-moroccan-primary/95 min-h-screen flex flex-col overflow-hidden">
      {/* Zellige pattern background overlay */}
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        <ZelligeBorder size="large" className="w-full h-full" />
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-10 pointer-events-none">
        <ZelligeBorder size="large" className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-0 w-56 h-56 opacity-5 pointer-events-none">
        <ZelligeBorder size="large" className="w-full h-full" />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-moroccan-accent/20 border border-moroccan-accent/40 px-4 py-2 mb-8 rounded-lg backdrop-blur">
                <span className="w-2 h-2 bg-moroccan-accent rounded-full" />
                <span className="text-moroccan-accent text-xs font-bold tracking-widest uppercase">
                  Plateforme BTP Africaine
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 text-balance font-serif">
                BATIMAG
              </h1>
              
              <p className="text-2xl text-moroccan-accent font-serif mb-8">
                1ère Plateforme Africaine du BTP
              </p>

              <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-lg">
                Connectez-vous avec les leaders du secteur du bâtiment et des travaux publics en Afrique. Accédez aux meilleures formations, offres d'emploi, actualités et partenaires du secteur.
              </p>

              {/* Search bar */}
              <div className="flex gap-0 mb-8 max-w-lg">
                <input
                  type="text"
                  placeholder="Rechercher une actualité, une entreprise..."
                  className="flex-1 bg-white px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-moroccan-accent rounded-l-lg"
                />
                <button className="bg-moroccan-accent text-white px-5 py-3.5 hover:bg-orange-600 transition-colors rounded-r-lg">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/formations"
                  className="inline-flex items-center gap-2 bg-moroccan-accent text-white font-bold px-6 py-3 hover:bg-orange-600 transition-colors rounded-lg"
                >
                  Découvrir les formations
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/emplois"
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 hover:bg-white/10 transition-colors rounded-lg"
                >
                  Voir les offres d'emploi
                </Link>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-6">
                <div className="border-l-4 border-moroccan-accent pl-4">
                  <p className="text-3xl font-bold text-moroccan-accent font-serif">500+</p>
                  <p className="text-white/70 text-sm mt-1">Entreprises</p>
                </div>
                <div className="border-l-4 border-moroccan-accent pl-4">
                  <p className="text-3xl font-bold text-moroccan-accent font-serif">2000+</p>
                  <p className="text-white/70 text-sm mt-1">Offres d'emploi</p>
                </div>
                <div className="border-l-4 border-moroccan-accent pl-4">
                  <p className="text-3xl font-bold text-moroccan-accent font-serif">150+</p>
                  <p className="text-white/70 text-sm mt-1">Formations</p>
                </div>
              </div>
            </div>

            {/* Right: Logo showcase */}
            <div className="flex justify-center items-center">
              <div className="relative">
                {/* Zellige frame borders */}
                <div className="absolute inset-0 border-4 border-moroccan-accent/30 rounded-lg transform -rotate-3 opacity-50"></div>
                <div className="absolute inset-2 border-2 border-moroccan-accent/20 rounded-lg transform rotate-1 opacity-50"></div>

                {/* Logo container with shadow */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-moroccan-accent/20">
                  <Image
                    src="/images/logo-batimag-white.png"
                    alt="BATIMAG Logo"
                    width={350}
                    height={350}
                    className="drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Decorative zellige corner */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 pointer-events-none">
                  <ZelligeBorder size="large" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom zellige border */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10 pointer-events-none">
        <ZelligeBorder size="medium" className="w-full h-full" />
      </div>
    </section>
  )
}
