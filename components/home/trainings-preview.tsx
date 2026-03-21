import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, GraduationCap, ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const trainings = [
  {
    id: 1,
    title: "Management de Projet BTP – Niveau Expert",
    institution: "Institut Africain du Bâtiment",
    location: "Casablanca, Maroc",
    duration: "6 mois",
    level: "Bac+3",
    mode: "Présentiel",
    image: "/images/training-1.jpg",
  },
  {
    id: 2,
    title: "Géotechnique et Fondations Profondes",
    institution: "École Polytechnique d'Abidjan",
    location: "Abidjan, Côte d'Ivoire",
    duration: "3 mois",
    level: "Bac+5",
    mode: "E-learning",
    image: "/images/training-1.jpg",
  },
  {
    id: 3,
    title: "BIM – Modélisation des Informations du Bâtiment",
    institution: "ENITA Campus Dakar",
    location: "Dakar, Sénégal",
    duration: "4 mois",
    level: "Bac+2",
    mode: "Hybride",
    image: "/images/training-1.jpg",
  },
]

const modeColors: Record<string, string> = {
  Présentiel: "bg-[#603C2D] text-white",
  "E-learning": "bg-[#FF9000] text-white",
  Hybride: "bg-secondary text-foreground border border-border",
}

export function TrainingsPreview() {
  return (
    <section className="py-14 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Formations Professionnelles"
          subtitle="Développez vos compétences dans le secteur de la construction"
          href="/formations"
          linkLabel="Toutes les formations"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainings.map((training) => (
            <Link
              key={training.id}
              href="/formations"
              className="group bg-background border border-border overflow-hidden hover:shadow-lg transition-shadow"
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
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <GraduationCap className="w-4 h-4 text-[#FF9000]" />
                  <span className="text-[#FF9000] text-xs font-semibold">{training.level}</span>
                </div>
                <                h4 className="text-sm font-bold text-foreground mb-1 leading-snug group-hover:text-[#FF9000] transition-colors text-balance">
                  {training.title}
                </h4>
                <p className="text-muted-foreground text-xs mb-3">{training.institution}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{training.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{training.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
