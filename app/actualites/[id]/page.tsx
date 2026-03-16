import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Clock, MapPin, Share2, Bookmark, ArrowLeft, Download, TrendingUp } from "lucide-react"

export const revalidate = 3600

interface ArticleDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = await params

  const supabase = await createClient()

  // Fetch the article by slug (id is actually the slug)
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", id)
    .single()

  if (error || !article) {
    notFound()
  }

  // Fetch related articles
  const { data: relatedArticles } = await supabase
    .from("articles")
    .select("*")
    .neq("id", article.id)
    .limit(3)

  // Parse content sections if stored as JSON
  let contentSections: any[] = []
  try {
    if (article.content && typeof article.content === "string") {
      contentSections = JSON.parse(article.content)
    }
  } catch (e) {
    contentSections = []
  }

  const categoryColors: Record<string, string> = {
    "Infrastructures": "bg-blue-700",
    "Bâtiment": "bg-green-700",
    "Génie Civil": "bg-[#0E1F2F]",
    "Énergie": "bg-orange-700",
    "Matériaux": "bg-slate-600",
    "Réglementation": "bg-purple-700",
    "Projets Structurants": "bg-indigo-700",
    "Techniques": "bg-cyan-700",
    "Économie": "bg-amber-700",
    "Architecture Durable": "bg-emerald-700",
  }

  const categoryColor = categoryColors[article.category] || "bg-[#0E1F2F]"

  return (
    <main className="bg-background-light dark:bg-background-dark">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-[#F28C28] transition-colors">
            Accueil
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link href="/actualites" className="hover:text-[#F28C28] transition-colors">
            Actualités
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary dark:text-slate-200 font-medium line-clamp-1">
            {article.title}
          </span>
        </nav>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              <article>
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`${categoryColor} text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded inline-block`}>
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight mb-6 text-balance">
                  {article.title}
                </h1>

                {/* Author Block */}
                <div className="flex items-center gap-4 border-y border-slate-200 dark:border-slate-800 py-4 mb-8">
                  <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-primary dark:text-white">
                      {article.author_name || "BATIMAG"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {article.author_title || "Équipe Éditoriale"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      {new Date(article.published_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center justify-end gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {article.reading_time || "5"} min de lecture
                    </p>
                  </div>
                </div>

                {/* Featured Image */}
                  <div className="rounded-xl overflow-hidden mb-10 shadow-2xl">
                  <div className="aspect-video bg-cover bg-center relative">
                    {article.cover_image ? (
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="bg-slate-200 dark:bg-slate-700 w-full h-full" />
                    )}
                  </div>
                  <p className="bg-slate-50 dark:bg-slate-800/50 p-3 text-xs italic text-slate-500 border-l-4 border-[#F28C28]">
                    {article.image_caption || "© BATIMAG"}
                  </p>
                </div>

                {/* Main Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed space-y-6">
                  {/* Excerpt as intro */}
                  {article.excerpt && (
                    <p className="font-semibold text-xl text-slate-700 dark:text-slate-300">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Article body */}
                  {article.body && (
                    <div
                      className="space-y-6 text-base"
                      dangerouslySetInnerHTML={{ __html: article.body }}
                    />
                  )}

                  {/* Content sections */}
                  {contentSections.length > 0 &&
                    contentSections.map((section: any, idx: number) => (
                      <div key={idx}>
                        {section.type === "heading" && (
                          <h3 className="text-2xl font-bold text-primary dark:text-white pt-4">
                            {section.content}
                          </h3>
                        )}
                        {section.type === "paragraph" && (
                          <p>{section.content}</p>
                        )}
                        {section.type === "quote" && (
                          <div className="my-12 p-8 bg-slate-100 dark:bg-slate-800 rounded-xl border-l-8 border-[#F28C28] relative">
                            <span className="material-symbols-outlined absolute top-4 left-4 text-[#F28C28]/20 text-6xl select-none">
                              format_quote
                            </span>
                            <blockquote className="relative z-10">
                              <p className="text-2xl font-medium italic text-primary dark:text-white leading-snug">
                                "{section.content}"
                              </p>
                              {section.author && (
                                <footer className="mt-6">
                                  <div className="font-bold text-primary dark:text-white">
                                    {section.author}
                                  </div>
                                  <div className="text-sm text-slate-500 uppercase tracking-tighter">
                                    {section.author_title}
                                  </div>
                                </footer>
                              )}
                            </blockquote>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 p-8 bg-primary rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-2">Rapport Spécial : {article.category}</h3>
                    <p className="text-slate-300 text-sm">
                      Téléchargez notre analyse exclusive sur les tendances et opportunités du secteur.
                    </p>
                  </div>
                  <button className="whitespace-nowrap bg-[#F28C28] hover:bg-orange-500 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">download</span>
                    TÉLÉCHARGER LE RAPPORT
                  </button>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              {/* Newsletter */}
              <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="text-lg font-bold text-primary dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="material-symbols-outlined text-[#F28C28]">mail</span>
                  Newsletter BATIMAG
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Recevez chaque mardi l'essentiel de l'actualité BTP et infrastructures en Afrique directement dans votre boîte mail.
                </p>
                <form className="space-y-3">
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-[#F28C28] focus:border-transparent text-sm"
                    placeholder="votre@email.com"
                    type="email"
                  />
                  <button className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                    S'INSCRIRE GRATUITEMENT
                  </button>
                </form>
                <p className="text-[10px] text-slate-400 mt-4 italic text-center">
                  Respect de votre vie privée. Désinscription en un clic.
                </p>
              </div>

              {/* Ad Banner */}
              <div className="bg-slate-200 dark:bg-slate-800 aspect-[4/5] rounded-xl flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
                  Publicité
                </span>
                <h5 className="text-xl font-bold text-slate-500 mb-2">Votre marque ici</h5>
                <p className="text-sm text-slate-400 mb-6">
                  Touchez 50,000+ décideurs du secteur de la construction en Afrique.
                </p>
                <button className="text-[#F28C28] font-bold text-sm underline underline-offset-4">
                  Voir nos tarifs régie
                </button>
              </div>

              {/* Most Read */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#F28C28]">trending_up</span>
                    Les plus lus
                  </h4>
                  <div className="space-y-6">
                    {relatedArticles.slice(0, 3).map((related: any, idx: number) => (
                      <Link
                        key={related.id}
                        href={`/actualites/${related.id}`}
                        className="group flex gap-4 hover:opacity-80 transition-opacity"
                      >
                        <span className="text-3xl font-black text-slate-200 dark:text-slate-800 transition-colors group-hover:text-[#F28C28]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h5 className="font-bold text-sm leading-snug group-hover:text-[#F28C28] transition-colors">
                            {related.title}
                          </h5>
                          <p className="text-xs text-slate-500 mt-1">
                            {related.reading_time || "5"} min de lecture
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

        {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col max-w-md mx-auto">
        {/* Mobile Header */}
        <div className="sticky top-16 z-40 flex items-center justify-between bg-white/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-primary/10">
          <Link href="/actualites" className="flex items-center justify-center size-10 rounded-full hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-primary dark:text-slate-100">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-primary dark:text-slate-100">bookmark</span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-primary dark:text-slate-100">share</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Hero Image */}
          <div className="relative w-full aspect-video group">
            {article.cover_image ? (
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="bg-slate-200 dark:bg-slate-700 w-full h-full" />
            )}
            <div className="absolute bottom-2 right-4 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white uppercase tracking-wider">
              © BATIMAG
            </div>
          </div>

          <article className="px-5 pt-6">
            {/* Category Badge */}
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-md ${categoryColor}/10 text-[#F28C28] text-xs font-bold uppercase tracking-widest mb-4`}>
              {article.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-tight text-primary dark:text-slate-100 mb-6 text-balance">
              {article.title}
            </h1>

            {/* Author Block */}
            <div className="flex items-center gap-3 pb-8 mb-8 border-b border-primary/5">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-primary dark:text-slate-200">
                  {article.author_name || "BATIMAG"}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>
                    {new Date(article.published_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="size-1 rounded-full bg-slate-300" />
                  <span>{article.reading_time || "5"} min de lecture</span>
                </div>
              </div>
            </div>

            {/* Long Form Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {article.excerpt && (
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                  {article.excerpt}
                </p>
              )}

              {article.body && (
                <div
                  className="space-y-6 text-base"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />
              )}

              {/* Content sections */}
              {contentSections.length > 0 &&
                contentSections.map((section: any, idx: number) => (
                  <div key={idx}>
                    {section.type === "heading" && (
                      <h3 className="text-xl font-bold text-primary dark:text-slate-100 pt-4">
                        {section.content}
                      </h3>
                    )}
                    {section.type === "paragraph" && (
                      <p>{section.content}</p>
                    )}
                    {section.type === "quote" && (
                      <div className="my-10 pl-6 border-l-4 border-[#F28C28] bg-background-light dark:bg-primary/20 py-6 pr-4 rounded-r-xl">
                        <span className="material-symbols-outlined text-[#F28C28] text-4xl mb-2">
                          format_quote
                        </span>
                        <blockquote className="text-xl font-bold text-primary dark:text-slate-100 leading-snug">
                          "{section.content}"
                        </blockquote>
                        {section.author && (
                          <cite className="block mt-4 text-sm font-semibold text-[#F28C28] not-italic">
                            — {section.author}
                          </cite>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Special Report CTA */}
            <div className="mt-12 p-6 bg-primary rounded-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Dossier Spécial : {article.category}</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Téléchargez notre étude complète sur les opportunités et tendances du secteur.
                </p>
                <button className="flex items-center gap-2 bg-[#F28C28] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-all w-full justify-center">
                  <span className="material-symbols-outlined">download</span>
                  Télécharger le PDF
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 size-32 bg-[#F28C28]/20 rounded-full blur-3xl" />
            </div>

            {/* Read Also Section */}
            {relatedArticles && relatedArticles.length > 0 && (
              <section className="mt-16 pb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-primary dark:text-slate-100">À lire aussi</h2>
                  <span className="h-px flex-1 bg-primary/10 ml-4" />
                </div>
                <div className="space-y-6">
                  {relatedArticles.slice(0, 2).map((related: any) => (
                    <Link
                      key={related.id}
                      href={`/actualites/${related.id}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-24 h-24 shrink-0 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0" />
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-[#F28C28] uppercase mb-1">
                          {related.category}
                        </span>
                        <h4 className="text-sm font-bold text-primary group-hover:text-[#F28C28] transition-colors leading-tight">
                          {related.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {related.read_time || "5"} min de lecture
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-primary/10 flex justify-around items-center px-2 py-3 z-50">
          <Link href="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Accueil</span>
          </Link>
          <a href="#" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-[10px] font-medium">Annuaire</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">school</span>
            <span className="text-[10px] font-medium">Cours</span>
          </a>
          <Link href="/actualites" className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined font-bold">newspaper</span>
            <span className="text-[10px] font-bold">Actualités</span>
            <div className="w-1 h-1 bg-[#F28C28] rounded-full" />
          </Link>
          <a href="#" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">work</span>
            <span className="text-[10px] font-medium">Emplois</span>
          </a>
        </nav>
      </div>

      <div className="hidden lg:block">
        {/* Desktop "À lire aussi" section */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-20 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-10 flex items-center gap-3">
                <span className="size-2 bg-[#F28C28] rounded-full" />
                À lire aussi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((related: any) => (
                  <Link
                    key={related.id}
                    href={`/actualites/${related.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-700 rounded-xl mb-4 overflow-hidden">
                      <div className="w-full h-full bg-primary/0 group-hover:bg-primary/20 transition-all" />
                    </div>
                    <span className="text-[#F28C28] text-[10px] font-bold uppercase tracking-widest">
                      {related.category}
                    </span>
                    <h3 className="text-lg font-bold text-primary dark:text-white mt-2 group-hover:text-[#F28C28] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <Footer />
      </div>
    </main>
  )
}
