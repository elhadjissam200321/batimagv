import Link from "next/link"
import { ArrowRight, Newspaper, Building2, GraduationCap, Briefcase } from "lucide-react"

const sections = [
  {
    icon: Newspaper,
    title: "Actualités & Événements",
    description:
      "Suivez toute l'actualité du BTP en Afrique : projets, marchés, politiques publiques, appels d'offres et événements professionnels.",
    href: "/actualites",
    cta: "Voir les actualités",
    color: "bg-[#0E1F2F]",
  },
  {
    icon: Building2,
    title: "Annuaire Entreprises BTP",
    description:
      "Retrouvez les entreprises leaders du secteur : constructeurs, bureaux d'études, fournisseurs de matériaux et équipementiers.",
    href: "/annuaire",
    cta: "Parcourir l'annuaire",
    color: "bg-[#1a3044]",
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description:
      "Découvrez les meilleures formations professionnelles en génie civil, management de projet et métiers de la construction.",
    href: "/formations",
    cta: "Explorer les formations",
    color: "bg-[#0E1F2F]",
  },
  {
    icon: Briefcase,
    title: "Offres d'Emploi",
    description:
      "Trouvez votre prochain poste dans le BTP : ingénieurs, conducteurs de travaux, architectes, gestionnaires de projet et plus.",
    href: "/emplois",
    cta: "Voir les offres",
    color: "bg-[#1a3044]",
  },
]

export function PlatformSections() {
  return (
    <section className="bg-secondary py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Link
                key={section.title}
                href={section.href}
                className={`group ${section.color} p-8 flex flex-col gap-4 hover:brightness-110 transition-all`}
              >
                <div className="w-12 h-12 bg-[#F28C28] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2 leading-snug">
                    {section.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-[#F28C28] text-sm font-semibold group-hover:gap-3 transition-all">
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
