import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const featuredArticles = [
  {
    id: 1,
    category: "Infrastructures",
    title: "Le Maroc lance un méga-projet autoroutier de 12 milliards de dirhams reliant Casablanca à Dakhla",
    excerpt:
      "Le gouvernement marocain a officiellement lancé les travaux du plus grand projet routier de son histoire, une autoroute de 1 400 km qui traversera le pays du nord au sud.",
    image: "/images/news-1.jpg",
    readTime: "4 min",
    date: "12 mars 2026",
    featured: true,
  },
  {
    id: 2,
    category: "Bâtiment",
    title: "Abidjan : 50 000 logements sociaux annoncés d'ici 2028 par le gouvernement ivoirien",
    excerpt:
      "Le plan national de l'habitat lancé par la Côte d'Ivoire prévoit la construction de 50 000 unités à prix social dans les zones périurbaines de la capitale économique.",
    image: "/images/news-2.jpg",
    readTime: "3 min",
    date: "11 mars 2026",
    featured: false,
  },
  {
    id: 3,
    category: "Génie Civil",
    title: "Dakar accueille le Salon International du BTP Afrique 2026 en juin prochain",
    excerpt:
      "La capitale sénégalaise sera le théâtre du plus grand salon professionnel dédié à la construction en Afrique subsaharienne avec 320 exposants attendus.",
    image: "/images/news-3.jpg",
    readTime: "2 min",
    date: "10 mars 2026",
    featured: false,
  },
  {
    id: 4,
    category: "Énergie & Infrastructure",
    title: "Barrage de Kandadji au Niger : avancement des travaux à 78% selon le maître d'ouvrage",
    excerpt:
      "Le projet hydroélectrique nigérien, financé par la Banque Africaine de Développement, entre dans sa phase finale avec une mise en service prévue pour 2027.",
    image: "/images/news-4.jpg",
    readTime: "5 min",
    date: "9 mars 2026",
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  Infrastructures: "bg-blue-700",
  Bâtiment: "bg-green-700",
  "Génie Civil": "bg-[#603C2D]",
  "Énergie & Infrastructure": "bg-orange-700",
}

export function NewsHighlights() {
  const [main, ...rest] = featuredArticles

  return (
    <section className="py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Actualités à la une"
          subtitle="Les dernières informations du secteur BTP en Afrique"
          href="/actualites"
          linkLabel="Toutes les actualités"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured main article */}
          <div className="lg:col-span-2">
            <Link href="/actualites" className="group block overflow-hidden border border-border hover:shadow-lg transition-shadow">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={main.image}
                  alt={main.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#603C2D]/40" />
                <span
                  className={`absolute top-4 left-4 ${categoryColors[main.category] ?? "bg-[#603C2D]"} text-white text-xs font-bold px-3 py-1 uppercase tracking-wider`}
                >
                  {main.category}
                </span>
              </div>
              <div className="p-6">
                <                  h3 className="text-xl font-bold text-foreground leading-snug mb-3 group-hover:text-[#FF9000] transition-colors text-balance">
                  {main.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {main.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{main.readTime} de lecture</span>
                    <span className="mx-2">·</span>
                    <span>{main.date}</span>
                  </div>
                  <span className="text-[#FF9000] text-sm font-semibold flex items-center gap-1">
                    Lire l'article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Side articles */}
          <div className="flex flex-col gap-4">
            {rest.map((article) => (
              <Link
                key={article.id}
                href="/actualites"
                className="group flex gap-4 border border-border p-4 hover:shadow-md transition-shadow"
              >
                <div className="relative w-24 h-20 shrink-0 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block ${categoryColors[article.category] ?? "bg-[#603C2D]"} text-white text-xs font-bold px-2 py-0.5 mb-1 uppercase tracking-wider`}
                  >
                    {article.category}
                  </span>
                  <                  h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-[#FF9000] transition-colors line-clamp-2 text-balance">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                    <span className="mx-1">·</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
