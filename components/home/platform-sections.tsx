import Link from "next/link"
import { ArrowRight, Newspaper, Building2, GraduationCap, Briefcase } from "lucide-react"
import { ZelligeBorder } from "@/components/moroccan-patterns"

const sections = [
  {
    icon: Newspaper,
    title: "Actualités & Événements",
    description:
      "Suivez toute l'actualité du BTP en Afrique : projets, marchés, politiques publiques, appels d'offres et événements professionnels.",
    href: "/actualites",
    cta: "Voir les actualités",
    color: "bg-moroccan-secondary",
  },
  {
    icon: Building2,
    title: "Annuaire Entreprises BTP",
    description:
      "Retrouvez les entreprises leaders du secteur : constructeurs, bureaux d'études, fournisseurs de matériaux et équipementiers.",
    href: "/annuaire",
    cta: "Parcourir l'annuaire",
    color: "bg-moroccan-secondary/90",
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description:
      "Découvrez les meilleures formations professionnelles en génie civil, management de projet et métiers de la construction.",
    href: "/formations",
    cta: "Explorer les formations",
    color: "bg-moroccan-secondary",
  },
  {
    icon: Briefcase,
    title: "Offres d'Emploi",
    description:
      "Trouvez votre prochain poste dans le BTP : ingénieurs, conducteurs de travaux, architectes, gestionnaires de projet et plus.",
    href: "/emplois",
    cta: "Voir les offres",
    color: "bg-moroccan-secondary/90",
  },
]

export function PlatformSections() {
  return (
    <section className="bg-background py-16 relative overflow-hidden">
      {/* Decorative zellige background */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <ZelligeBorder size="large" className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l-4 border-moroccan-accent">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Link
                key={section.title}
                href={section.href}
                className={`group ${section.color} p-8 flex flex-col gap-4 hover:shadow-xl transition-all border-r-4 border-moroccan-accent/30 hover:border-moroccan-accent/60 relative overflow-hidden`}
              >
                {/* Zellige accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                  <ZelligeBorder size="small" className="w-full h-full" />
                </div>

                <div className="w-12 h-12 bg-moroccan-accent flex items-center justify-center shrink-0 rounded-md relative z-10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-2 leading-snug font-serif">
                    {section.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-moroccan-accent text-sm font-semibold group-hover:gap-3 transition-all relative z-10">
                  {section.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
