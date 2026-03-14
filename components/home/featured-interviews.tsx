import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Quote } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const interviews = [
  {
    id: 1,
    name: "Ibrahim Al-Rashid",
    role: "Directeur Général, STRABAG Maroc",
    topic: "L'innovation dans la construction africaine",
    quote:
      "L'Afrique a besoin de solutions locales pour ses défis d'infrastructure. Nous ne pouvons plus simplement importer des modèles étrangers – l'adaptation est clé.",
    image: "/images/interview-1.jpg",
    date: "8 mars 2026",
  },
  {
    id: 2,
    name: "Aminata Koné",
    role: "Architecte Urbaniste, Cabinet AKA",
    topic: "Logement et développement urbain durable",
    quote:
      "Les villes africaines grandissent à une vitesse phénoménale. Notre responsabilité est de construire des espaces qui préservent la dignité des habitants tout en anticipant les besoins de demain.",
    image: "/images/interview-2.jpg",
    date: "5 mars 2026",
  },
]

export function FeaturedInterviews() {
  return (
    <section className="py-14 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Interviews & Portraits"
          subtitle="Les leaders du secteur BTP s'expriment"
          href="/actualites"
          linkLabel="Toutes les interviews"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interviews.map((interview) => (
            <Link
              key={interview.id}
              href="/actualites"
              className="group flex flex-col md:flex-row gap-0 bg-background border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative w-full md:w-48 h-52 md:h-auto shrink-0 overflow-hidden">
                <Image
                  src={interview.image}
                  alt={interview.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0E1F2F]/20" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#F28C28] text-white text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                      Interview
                    </span>
                    <span className="text-muted-foreground text-xs">{interview.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-[#F28C28] transition-colors">
                    {interview.topic}
                  </h3>
                  <div className="flex items-start gap-2 mt-3 mb-4">
                    <Quote className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 italic">
                      {interview.quote}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">{interview.name}</p>
                    <p className="text-muted-foreground text-xs">{interview.role}</p>
                  </div>
                  <span className="text-[#F28C28] flex items-center gap-1 text-sm font-semibold">
                    Lire <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
