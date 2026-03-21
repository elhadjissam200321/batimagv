import Link from "next/link"
import { MapPin, Building2, Clock, ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const jobs = [
  {
    id: 1,
    title: "Ingénieur Génie Civil – Structures",
    company: "COVEC AFRICA",
    location: "Casablanca, Maroc",
    contract: "CDI",
    sector: "BTP",
    posted: "Il y a 2 jours",
  },
  {
    id: 2,
    title: "Conducteur de Travaux – Bâtiment",
    company: "Bouygues Construction Afrique",
    location: "Abidjan, Côte d'Ivoire",
    contract: "CDI",
    sector: "Construction",
    posted: "Il y a 3 jours",
  },
  {
    id: 3,
    title: "Architecte Urbaniste Senior",
    company: "Cabinet BCEOM",
    location: "Dakar, Sénégal",
    contract: "CDI",
    sector: "Architecture",
    posted: "Il y a 4 jours",
  },
  {
    id: 4,
    title: "Chef de Projet Infrastructure Routière",
    company: "VINCI Construction",
    location: "Nairobi, Kenya",
    contract: "CDD 24 mois",
    sector: "Infrastructure",
    posted: "Il y a 5 jours",
  },
  {
    id: 5,
    title: "Responsable HSE – Grands Travaux",
    company: "Eiffage Sénégal",
    location: "Thiès, Sénégal",
    contract: "CDI",
    sector: "BTP",
    posted: "Il y a 6 jours",
  },
  {
    id: 6,
    title: "Ingénieur Électrotechnicien",
    company: "STRABAG Maroc",
    location: "Rabat, Maroc",
    contract: "CDI",
    sector: "Électricité",
    posted: "Il y a 7 jours",
  },
]

const contractColors: Record<string, string> = {
  CDI: "bg-green-100 text-green-800",
  "CDD 24 mois": "bg-blue-100 text-blue-800",
}

export function JobsPreview() {
  return (
    <section className="py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Offres d'Emploi BTP"
          subtitle="Les meilleures opportunités du secteur en Afrique"
          href="/emplois"
          linkLabel="Toutes les offres"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href="/emplois"
              className="group border border-border p-5 hover:border-[#FF9000] hover:shadow-md transition-all bg-background"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-[#FF9000]" />
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 ${contractColors[job.contract] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {job.contract}
                </span>
              </div>
              <              h4 className="text-sm font-bold text-foreground mb-1 leading-snug group-hover:text-[#FF9000] transition-colors">
                {job.title}
              </h4>
              <p className="text-[#FF9000] text-xs font-semibold mb-3">{job.company}</p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{job.posted}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/emplois"
            className="inline-flex items-center gap-2 bg-[#603C2D] text-white text-sm font-bold px-8 py-3.5 hover:bg-[#FF9000] transition-colors"
          >
            Voir toutes les offres d'emploi
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
