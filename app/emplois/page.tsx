import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"
import { createClient } from "@/lib/supabase/server"

const jobTypes = ["Tous types", "CDI", "CDD", "Stage", "Mission", "Freelance"]
const sectors = ["Tous secteurs", "Génie Civil", "Architecture", "Management", "Commercial", "HSE", "Études", "Topographie"]
const countries = ["Tous pays", "Maroc", "Côte d'Ivoire", "Sénégal", "Cameroun", "Kenya", "Algérie"]

const contractColors: Record<string, string> = {
  CDI: "bg-green-100 text-green-800",
  CDD: "bg-blue-100 text-blue-800",
  Stage: "bg-purple-100 text-purple-800",
  Mission: "bg-orange-100 text-orange-800",
  Freelance: "bg-teal-100 text-teal-800",
}

export default async function EmploisPage() {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from("jobs")
    .select("*")
    .order("published_at", { ascending: false })

  const jobs = data || []

  return (
    <main>
      <Navbar />

      {/* Page header */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-3">
            <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-white/70">Offres d'Emploi</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-briefcase text-accent text-2xl"></i>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Offres d'Emploi BTP</h1>
          </div>
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
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
              <input
                type="text"
                placeholder="Titre de poste, entreprise..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
              />
            </div>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground rounded-lg">
              {sectors.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground rounded-lg">
              {jobTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select className="px-4 py-2.5 text-sm bg-background border border-border focus:outline-none text-foreground rounded-lg">
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button className="bg-accent text-white text-sm font-bold px-6 py-2.5 hover:bg-accent/90 transition-colors flex items-center gap-2 rounded-lg">
              <i className="fa-solid fa-search"></i>
              Rechercher
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: "fa-solid fa-briefcase", value: `${jobs.length}+`, label: "Offres actives" },
            { icon: "fa-solid fa-building", value: "320", label: "Entreprises recrutent" },
            { icon: "fa-solid fa-globe-africa", value: "45", label: "Pays couverts" },
            { icon: "fa-solid fa-users", value: "2 400+", label: "Candidats inscrits" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-border p-4 text-center rounded-xl shadow-sm">
              <i className={`${stat.icon} text-accent text-xl mb-2`}></i>
              <p className="text-primary text-2xl font-bold">{stat.value}</p>
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
            <div className="space-y-4 mt-6">
              {jobs.map((job: any) => (
                <Link
                  key={job.id}
                  href={`/emplois/${job.slug}`}
                  className={`group block border p-5 hover:shadow-md transition-all bg-background rounded-xl ${
                    job.is_featured ? "border-accent/40 ring-1 ring-accent/20" : "border-border hover:border-accent/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {job.company_logo ? (
                      <Image
                        src={job.company_logo}
                        alt={job.company_name}
                        width={48}
                        height={48}
                        className="rounded-lg border border-border"
                      />
                    ) : (
                      <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-building text-primary"></i>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                            {job.title}
                          </h3>
                          <p className="text-accent text-sm font-semibold mt-0.5">{job.company_name}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {job.is_urgent && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                              <i className="fa-solid fa-fire"></i> Urgent
                            </span>
                          )}
                          <span className={`text-xs font-bold px-2.5 py-1 rounded ${contractColors[job.contract_type] ?? "bg-gray-100 text-gray-700"}`}>
                            {job.contract_type}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-location-dot text-accent"></i>
                          {job.location}, {job.country}
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-industry text-accent"></i>
                          {job.sector}
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fa-regular fa-clock text-accent"></i>
                          {new Date(job.published_at).toLocaleDateString("fr-FR")}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className="text-foreground text-sm font-semibold">
                          {job.salary_range || "Selon profil"}
                        </span>
                        <span className="text-accent text-sm font-semibold flex items-center gap-1">
                          Voir l'offre <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {jobs.length === 0 && (
                <div className="text-center py-16 bg-secondary rounded-xl">
                  <i className="fa-solid fa-briefcase text-5xl text-muted-foreground mb-4"></i>
                  <h3 className="text-xl font-semibold text-primary mb-2">Aucune offre disponible</h3>
                  <p className="text-muted-foreground">Revenez bientôt pour découvrir nos nouvelles offres d'emploi.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Post job CTA */}
            <div className="bg-primary p-6 text-center rounded-xl">
              <i className="fa-solid fa-bullhorn text-accent text-3xl mb-3"></i>
              <h4 className="text-white font-bold text-lg mb-2">Vous recrutez ?</h4>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                Publiez vos offres d'emploi et atteignez des milliers de professionnels BTP en Afrique.
              </p>
              <Link
                href="/contact"
                className="w-full inline-block text-center bg-accent text-white text-sm font-bold py-3 hover:bg-accent/90 transition-colors rounded-lg"
              >
                <i className="fa-solid fa-plus mr-2"></i>
                Publier une offre
              </Link>
            </div>

            {/* Newsletter */}
            <div className="bg-white border border-border p-6 rounded-xl">
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                <i className="fa-solid fa-bell text-accent"></i>
                Alertes emploi
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Recevez les nouvelles offres correspondant à votre profil.
              </p>
              <input 
                type="email" 
                placeholder="votre@email.com"
                className="w-full px-4 py-2.5 text-sm border border-border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="w-full bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                <i className="fa-solid fa-paper-plane mr-2"></i>
                S'abonner
              </button>
            </div>

            {/* Sectors */}
            <div className="bg-white border border-border p-6 rounded-xl">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-filter text-accent"></i>
                Par secteur
              </h4>
              <div className="space-y-2">
                {sectors.slice(1).map((sector) => (
                  <button
                    key={sector}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-secondary hover:text-accent transition-colors text-left rounded-lg"
                  >
                    <span>{sector}</span>
                    <span className="text-muted-foreground text-xs bg-secondary px-2 py-0.5 rounded">
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
