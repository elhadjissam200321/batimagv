import Link from "next/link"
import { Search, MapPin, Building2, Clock, Briefcase, ChevronRight, ArrowRight, Filter } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"

const jobTypes = ["Tous types", "CDI", "CDD", "Stage", "Mission", "Freelance"]
const sectors = ["Tous secteurs", "Génie Civil", "Architecture", "Management", "Commercial", "HSE", "Études", "Topographie"]
const countries = ["Tous pays", "Maroc", "Côte d'Ivoire", "Sénégal", "Cameroun", "Kenya", "Algérie"]

const jobs = [
  {
    id: 1,
    title: "Ingénieur Génie Civil – Structures",
    company: "COVEC AFRICA",
    location: "Casablanca, Maroc",
    contract: "CDI",
    sector: "Génie Civil",
    experience: "3-5 ans",
    posted: "Il y a 2 jours",
    salary: "15 000 – 20 000 MAD",
    description: "Vous serez en charge du dimensionnement et du suivi des ouvrages de génie civil dans le cadre de grands projets d'infrastructure.",
    featured: true,
  },
  {
    id: 2,
    title: "Conducteur de Travaux – Bâtiment",
    company: "Bouygues Construction Afrique",
    location: "Abidjan, Côte d'Ivoire",
    contract: "CDI",
    sector: "Management",
    experience: "5-8 ans",
    posted: "Il y a 3 jours",
    salary: "Selon profil",
    description: "Piloter l'exécution des travaux de bâtiment en assurant le respect des délais, des coûts et des normes qualité / sécurité.",
    featured: true,
  },
  {
    id: 3,
    title: "Architecte Urbaniste Senior",
    company: "Cabinet BCEOM",
    location: "Dakar, Sénégal",
    contract: "CDI",
    sector: "Architecture",
    experience: "7+ ans",
    posted: "Il y a 4 jours",
    salary: "Selon profil",
    description: "Concevoir et piloter des projets d'urbanisme et d'aménagement urbain durables pour des villes en forte croissance.",
    featured: false,
  },
  {
    id: 4,
    title: "Chef de Projet Infrastructure Routière",
    company: "VINCI Construction",
    location: "Nairobi, Kenya",
    contract: "CDD 24 mois",
    sector: "Génie Civil",
    experience: "8+ ans",
    posted: "Il y a 5 jours",
    salary: "Expat package",
    description: "Diriger la réalisation d'un projet routier de grande envergure en Afrique de l'Est, en coordination avec les équipes locales.",
    featured: false,
  },
  {
    id: 5,
    title: "Responsable HSE – Grands Travaux",
    company: "Eiffage Sénégal",
    location: "Thiès, Sénégal",
    contract: "CDI",
    sector: "HSE",
    experience: "4-6 ans",
    posted: "Il y a 6 jours",
    salary: "Selon profil",
    description: "Mettre en place et animer la politique Hygiène, Sécurité et Environnement sur les chantiers de construction.",
    featured: false,
  },
  {
    id: 6,
    title: "Ingénieur Électrotechnicien",
    company: "STRABAG Maroc",
    location: "Rabat, Maroc",
    contract: "CDI",
    sector: "Études",
    experience: "2-4 ans",
    posted: "Il y a 7 jours",
    salary: "12 000 – 16 000 MAD",
    description: "Réaliser les études électriques d'installations tertiaires et industrielles dans le cadre de projets de construction neuve et de réhabilitation.",
    featured: false,
  },
  {
    id: 7,
    title: "Topographe – Grands Projets",
    company: "COVEC AFRICA",
    location: "Casablanca, Maroc",
    contract: "CDD",
    sector: "Topographie",
    experience: "2-4 ans",
    posted: "Il y a 8 jours",
    salary: "10 000 – 14 000 MAD",
    description: "Réaliser les levés topographiques et assurer le suivi géométrique des ouvrages dans le cadre de projets autoroutiers.",
    featured: false,
  },
  {
    id: 8,
    title: "Ingénieur Commercial BTP",
    company: "LaFarge Holcim Afrique",
    location: "Abidjan, Côte d'Ivoire",
    contract: "CDI",
    sector: "Commercial",
    experience: "3-5 ans",
    posted: "Il y a 10 jours",
    salary: "Selon profil + commissions",
    description: "Développer et fidéliser un portefeuille de clients professionnels (entreprises de construction, promoteurs) dans la zone Afrique de l'Ouest.",
    featured: false,
  },
]

const contractColors: Record<string, string> = {
  CDI: "bg-green-100 text-green-800",
  CDD: "bg-blue-100 text-blue-800",
  "CDD 24 mois": "bg-blue-100 text-blue-800",
  Stage: "bg-purple-100 text-purple-800",
  Mission: "bg-orange-100 text-orange-800",
}

export default function EmploisPage() {
  return (
    <main>
      <Navbar />

      {/* Page header */}
      <section className="bg-[#0E1F2F] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-3">
            <Link href="/" className="hover:text-[#F28C28] transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">Offres d'Emploi</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Offres d'Emploi BTP</h1>
          <p className="text-white/60 text-base">
            Trouvez votre prochain poste dans le secteur de la construction en Afrique
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-secondary border-b border-border py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Titre de poste, entreprise..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
              />
            </div>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground">
              {sectors.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground">
              {jobTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground">
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button className="bg-[#F28C28] text-white text-sm font-bold px-6 py-2.5 hover:bg-orange-600 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
              Rechercher
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: "850+", label: "Offres actives" },
            { value: "320", label: "Entreprises recrutent" },
            { value: "45", label: "Pays couverts" },
            { value: "2 400+", label: "Candidats inscrits" },
          ].map((stat) => (
            <div key={stat.label} className="bg-secondary border border-border p-4 text-center">
              <p className="text-[#F28C28] text-2xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job listings */}
          <div className="lg:col-span-2">
            <SectionHeader
              title="Offres du moment"
              subtitle={`${jobs.length} offres disponibles`}
            />
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href="#"
                  className={`group block border p-5 hover:shadow-md transition-all bg-background ${
                    job.featured ? "border-[#F28C28]/40" : "border-border hover:border-[#F28C28]/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-secondary border border-border flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-[#F28C28]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="text-base font-bold text-foreground group-hover:text-[#F28C28] transition-colors leading-snug">
                            {job.title}
                          </h3>
                          <p className="text-[#F28C28] text-sm font-semibold mt-0.5">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {job.featured && (
                            <span className="bg-[#F28C28] text-white text-xs font-bold px-2 py-0.5">Urgent</span>
                          )}
                          <span className={`text-xs font-bold px-2.5 py-1 ${contractColors[job.contract] ?? "bg-gray-100 text-gray-700"}`}>
                            {job.contract}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-[#F28C28]" />
                          {job.sector}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#F28C28]" />
                          {job.posted}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className="text-foreground text-sm font-semibold">{job.salary}</span>
                        <span className="text-[#F28C28] text-sm font-semibold flex items-center gap-1">
                          Postuler <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Post job CTA */}
            <div className="bg-[#0E1F2F] p-6 text-center">
              <Briefcase className="w-8 h-8 text-[#F28C28] mx-auto mb-3" />
              <h4 className="text-white font-bold text-lg mb-2">Vous recrutez ?</h4>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                Publiez vos offres d'emploi et atteignez des milliers de professionnels BTP en Afrique.
              </p>
              <Link
                href="/contact"
                className="w-full inline-block text-center bg-[#F28C28] text-white text-sm font-bold py-3 hover:bg-orange-600 transition-colors"
              >
                Publier une offre
              </Link>
            </div>

            {/* Ad space */}
            <div className="bg-secondary border border-border p-4 flex items-center justify-center h-52">
              <span className="text-muted-foreground text-xs uppercase tracking-widest">Espace publicitaire</span>
            </div>

            {/* Sectors */}
            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                Par secteur
              </h4>
              <div className="space-y-2">
                {sectors.slice(1).map((sector) => (
                  <button
                    key={sector}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-secondary hover:text-[#F28C28] transition-colors text-left"
                  >
                    <span>{sector}</span>
                    <span className="text-muted-foreground text-xs">
                      {Math.floor(Math.random() * 50) + 10}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  )
}
