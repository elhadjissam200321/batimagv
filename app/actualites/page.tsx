import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Calendar, Search, ArrowRight, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"
import { createClient } from "@/lib/supabase/server"

const categories = [
  "Tous", "Infrastructures", "Bâtiment", "Génie Civil", "Matériaux", "Énergie", "Réglementation",
]

const categoryColors: Record<string, string> = {
  "infrastructures": "bg-blue-700",
  "batiment": "bg-green-700",
  "genie-civil": "bg-[#0E1F2F]",
  "energie": "bg-orange-700",
  "materiaux": "bg-slate-600",
  "reglementation": "bg-purple-700",
  "Infrastructures": "bg-blue-700",
  "Bâtiment": "bg-green-700",
  "Génie Civil": "bg-[#0E1F2F]",
  "Énergie": "bg-orange-700",
  "Matériaux": "bg-slate-600",
  "Réglementation": "bg-purple-700",
}

const events = [
  {
    id: 1,
    title: "Salon International BTP Afrique 2026",
    location: "Dakar, Sénégal",
    date: "15 – 18 juin 2026",
    type: "Salon",
  },
  {
    id: 2,
    title: "Forum Africain des Infrastructures",
    location: "Casablanca, Maroc",
    date: "22 – 23 juillet 2026",
    type: "Forum",
  },
  {
    id: 3,
    title: "Conférence Logement Durable Afrique",
    location: "Abidjan, Côte d'Ivoire",
    date: "10 septembre 2026",
    type: "Conférence",
  },
]

export default async function ActualitesPage() {
  const supabase = await createClient()
  
  const { data: articles = [], error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching articles:", error)
  }

  const main = articles[0]
  const rest = articles.slice(1)

  return (
    <main>
      <Navbar />

      {/* Page header */}
      <section className="bg-[#0E1F2F] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-3">
            <Link href="/" className="hover:text-[#F28C28] transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">Actualités & Événements</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Actualités & Événements</h1>
          <p className="text-white/60 text-base">
            Toute l'actualité du BTP, des infrastructures et de l'immobilier en Afrique
          </p>
        </div>
      </section>

      {/* Search & filter bar */}
      <div className="bg-secondary border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 py-3">
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une actualité..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`shrink-0 text-xs font-semibold px-3 py-1.5 transition-colors ${
                    cat === "Tous"
                      ? "bg-[#0E1F2F] text-white"
                      : "bg-background border border-border text-foreground hover:border-[#F28C28] hover:text-[#F28C28]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Featured article */}
            {main && (
              <div className="mb-8">
                <Link href={`/actualites/${main.slug}`} className="group block border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-72 overflow-hidden">
                    {main.cover_image ? (
                      <Image
                        src={main.cover_image}
                        alt={main.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="bg-slate-200 dark:bg-slate-700 w-full h-full" />
                    )}
                    <div className="absolute inset-0 bg-[#0E1F2F]/30" />
                    <span className={`absolute top-4 left-4 ${categoryColors[main.category] ?? "bg-[#0E1F2F]"} text-white text-xs font-bold px-3 py-1 uppercase tracking-wider`}>
                      {main.category}
                    </span>
                    <span className="absolute top-4 right-4 bg-[#F28C28] text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
                      À la une
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#F28C28] transition-colors text-balance">
                      {main.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{main.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{main.reading_time || 5} min de lecture · {new Date(main.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                      <span className="text-[#F28C28] text-sm font-semibold flex items-center gap-1">
                        Lire <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Other articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {rest.map((article: any) => (
                <Link key={article.id} href={`/actualites/${article.slug}`} className="group border border-border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40 overflow-hidden">
                    {article.cover_image ? (
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="bg-slate-200 dark:bg-slate-700 w-full h-full" />
                    )}
                    <span className={`absolute top-3 left-3 ${categoryColors[article.category] ?? "bg-[#0E1F2F]"} text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground mb-2 leading-snug group-hover:text-[#F28C28] transition-colors line-clamp-2 text-balance">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{article.reading_time || 5} min · {new Date(article.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Ad banner */}
            <div className="bg-secondary border border-border p-4 flex items-center justify-center h-64">
              <span className="text-muted-foreground text-xs uppercase tracking-widest">Espace publicitaire</span>
            </div>

            {/* Events */}
            <div>
              <SectionHeader title="Événements" />
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="border border-border p-4 hover:border-[#F28C28] transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#0E1F2F] flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-[#F28C28]" />
                      </div>
                      <div>
                        <span className="text-[#F28C28] text-xs font-bold uppercase tracking-wider">{event.type}</span>
                        <h4 className="text-sm font-bold text-foreground leading-snug mt-0.5">{event.title}</h4>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-0.5">{event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-[#0E1F2F] p-6">
              <h4 className="text-white font-bold mb-2">Newsletter BATIMAG</h4>
              <p className="text-white/60 text-sm mb-4">Recevez les actualités BTP chaque semaine directement dans votre boîte mail.</p>
              <input
                type="email"
                placeholder="Votre e-mail"
                className="w-full px-3 py-2 text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-[#F28C28] mb-3"
              />
              <button className="w-full bg-[#F28C28] text-white text-sm font-bold py-2.5 hover:bg-orange-600 transition-colors">
                S'abonner
              </button>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  )
}
