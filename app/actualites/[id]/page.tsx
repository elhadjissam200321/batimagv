import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Bookmark, Share2, Clock, Eye, ChevronRight, Download } from "lucide-react"

interface ArticleDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = await params

  const supabase = await createClient()

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", id)
    .single()

  if (error || !article) {
    notFound()
  }

  const { data: relatedRaw } = await supabase
    .from("articles")
    .select("*")
    .neq("id", article.id)
    .limit(3)

  const relatedArticles = relatedRaw || []

  const publishedDate = new Date(article.published_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* ── DESKTOP ─────────────────────────────────────────── */}
      <main className="hidden lg:flex flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/actualites" className="hover:text-accent transition-colors">Actualités</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent font-medium">{article.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary font-medium line-clamp-1">{article.title}</span>
          </nav>

          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-8">
              <article>
                <span className="inline-block bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded mb-4">
                  {article.category}
                </span>
                <h1 className="text-5xl font-extrabold text-primary leading-tight mb-6 text-balance">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 border-y border-slate-200 py-4 mb-8">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {(article.author_name || "B")[0]}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-primary">{article.author_name || "BATIMAG"}</p>
                    <p className="text-xs text-slate-500">{article.author_title || "Équipe Éditoriale"}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.reading_time || "5"} min de lecture
                    </span>
                    <span>{publishedDate}</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden mb-10 shadow-xl aspect-video relative">
                  {article.cover_image ? (
                    <Image src={article.cover_image} alt={article.title} fill className="object-cover" priority />
                  ) : (
                    <div className="bg-slate-200 w-full h-full" />
                  )}
                </div>
                <div className="prose prose-slate max-w-none text-lg leading-relaxed space-y-6">
                  <p className="font-semibold text-xl text-slate-700">{article.excerpt}</p>
                  <p>{article.content || "Le contenu de l'article sera affiché ici."}</p>
                </div>
                <div className="mt-16 p-8 bg-primary rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-2">Rapport Spécial : {article.category}</h3>
                    <p className="text-slate-300 text-sm">Téléchargez notre analyse exclusive sur les tendances du secteur en Afrique.</p>
                  </div>
                  <button className="whitespace-nowrap bg-accent hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0">
                    <Download className="w-4 h-4" /> TÉLÉCHARGER
                  </button>
                </div>
              </article>
            </div>

            <aside className="col-span-4 space-y-10">
              <div className="p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-primary mb-4 border-b border-slate-100 pb-2">Newsletter BATIMAG</h4>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">Recevez chaque semaine l'essentiel de l'actualité BTP en Afrique.</p>
                <form className="space-y-3">
                  <input className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="votre@email.com" type="email" />
                  <button className="w-full bg-primary text-white font-bold py-3 rounded-lg text-sm hover:bg-primary/90 transition-colors">S'INSCRIRE</button>
                </form>
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary mb-6">Les plus lus</h4>
                <div className="space-y-6">
                  {relatedArticles.slice(0, 3).map((related, idx) => (
                    <Link key={related.id} href={`/actualites/${related.slug}`} className="group flex gap-4">
                      <span className="text-3xl font-black text-slate-200 group-hover:text-accent transition-colors">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h5 className="font-bold text-sm leading-snug group-hover:text-accent transition-colors">{related.title}</h5>
                        <p className="text-xs text-slate-500 mt-1">{related.reading_time || "5"} min de lecture</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ── MOBILE ──────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col bg-[#f8f9fa]">

        {/* Full-bleed Hero */}
        <div className="relative w-full h-[55vw] min-h-[220px] max-h-[340px] bg-slate-900">
          {article.cover_image ? (
            <Image src={article.cover_image} alt={article.title} fill className="object-cover opacity-80" priority />
          ) : (
            <div className="bg-primary w-full h-full" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
            <Link href="/actualites" className="flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category + title over image */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <span className="inline-block bg-accent text-white text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-3">
              {article.category}
            </span>
            <h1 className="text-white text-2xl font-extrabold leading-tight text-balance line-clamp-3">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Author strip */}
        <div className="bg-white border-b border-slate-100 px-5 py-3 flex items-center gap-3">
          <div className="size-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">{(article.author_name || "B")[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary truncate">{article.author_name || "BATIMAG"}</p>
            <p className="text-[11px] text-slate-500 truncate">{article.author_title || "Équipe Éditoriale"}</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 shrink-0">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.reading_time || "5"} min
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.view_count ?? "—"}
            </span>
          </div>
        </div>

        {/* Meta chips */}
        <div className="bg-white px-5 pt-3 pb-4 flex items-center gap-2 border-b border-slate-100 overflow-x-auto">
          <span className="shrink-0 text-[11px] text-slate-400 font-medium">{publishedDate}</span>
          <span className="shrink-0 w-1 h-1 rounded-full bg-slate-300" />
          {[article.category, "BTP", "Afrique"].filter(Boolean).map((tag) => (
            <span key={tag} className="shrink-0 bg-primary/8 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full border border-primary/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Body */}
        <div className="bg-white mx-4 mt-4 rounded-2xl shadow-sm overflow-hidden">
          {/* Excerpt / lead */}
          <div className="px-5 pt-6 pb-5 border-b border-slate-100">
            <p className="text-base font-semibold text-slate-700 leading-relaxed italic">
              {article.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="px-5 pt-5 pb-8">
            <p className="text-[15px] text-slate-600 leading-[1.75]">
              {article.content || "Le contenu complet de l'article sera affiché ici."}
            </p>
          </div>
        </div>

        {/* Share actions */}
        <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Partager cet article</p>
          <div className="flex items-center gap-3">
            {[
              { label: "Facebook", bg: "bg-[#1877F2]", icon: "f" },
              { label: "Twitter/X", bg: "bg-[#0f0f0f]", icon: "𝕏" },
              { label: "WhatsApp", bg: "bg-[#25D366]", icon: "W" },
              { label: "LinkedIn", bg: "bg-[#0A66C2]", icon: "in" },
            ].map(({ label, bg, icon }) => (
              <button key={label} className={`${bg} text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm flex-1`}>
                {icon}
              </button>
            ))}
            <button className="bg-slate-100 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center flex-1">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Download CTA */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden">
          <div className="bg-primary px-5 py-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <span className="text-accent text-xs font-black uppercase tracking-wider">Dossier Spécial</span>
              <h3 className="text-white text-lg font-extrabold mt-1 mb-2 text-balance">{article.category} — Rapport Exclusif</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">Analyse complète des tendances du secteur BTP en Afrique. Gratuit.</p>
              <button className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors">
                <Download className="w-4 h-4" />
                Télécharger le PDF
              </button>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mx-4 mt-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-extrabold text-primary uppercase tracking-wide">À lire aussi</h2>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <div className="space-y-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/actualites/${related.slug}`}
                  className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm active:opacity-80 transition-opacity"
                >
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 relative">
                    {related.cover_image ? (
                      <Image src={related.cover_image} alt={related.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary/40 text-2xl font-black">{(related.category || "B")[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-1 min-w-0">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">{related.category}</span>
                    <h4 className="text-sm font-bold text-primary leading-snug line-clamp-2">{related.title}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{related.reading_time || "5"} min de lecture</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="mx-4 mb-8 bg-slate-900 rounded-2xl p-6">
          <h3 className="text-white font-extrabold text-base mb-1">Newsletter BATIMAG</h3>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">L'essentiel du BTP africain, chaque semaine dans votre boite mail.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="w-full bg-accent text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-500 transition-colors">
              S'inscrire gratuitement
            </button>
          </form>
        </div>

      </div>
      {/* ── END MOBILE ─────────────────────────────────────── */}

      <Footer />
    </div>
  )
}

    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Desktop Layout */}
      <main className="hidden lg:flex flex-grow bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <Link href="/actualites" className="hover:text-accent">Accueil</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href="/actualites" className="hover:text-accent">{article.category}</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary dark:text-slate-200 font-medium line-clamp-1">{article.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <article>
                <div className="mb-4">
                  <span className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded">
                    {article.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight mb-6 text-balance">
                  {article.title}
                </h1>

                <div className="flex items-center gap-4 border-y border-slate-200 dark:border-slate-800 py-4 mb-8">
                  <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
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
                  <p className="bg-slate-50 dark:bg-slate-800/50 p-3 text-xs italic text-slate-500 border-l-4 border-accent">
                    {article.image_caption || "© BATIMAG"}
                  </p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed space-y-6">
                  <p className="font-semibold text-xl text-slate-700 dark:text-slate-300">
                    {article.excerpt}
                  </p>
                  <p>{article.content || "Article content will be displayed here."}</p>
                </div>

                <div className="mt-16 p-8 bg-primary rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-2">Rapport Spécial : {article.category}</h3>
                    <p className="text-slate-300 text-sm">Téléchargez notre analyse exclusive sur les tendances du secteur en Afrique.</p>
                  </div>
                  <button className="whitespace-nowrap bg-accent hover:bg-orange-500 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">download</span>
                    TÉLÉCHARGER
                  </button>
                </div>
              </article>
            </div>

            <aside className="lg:col-span-4 space-y-10">
              <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="text-lg font-bold text-primary dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="material-symbols-outlined text-accent">mail</span>
                  Newsletter BATIMAG
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Recevez chaque semaine l'essentiel de l'actualité BTP et infrastructures en Afrique.
                </p>
                <form className="space-y-3">
                  <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700 focus:ring-accent focus:border-accent text-sm" placeholder="votre@email.com" type="email" />
                  <button className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors text-sm">S'INSCRIRE</button>
                </form>
              </div>

              <div className="bg-slate-200 dark:bg-slate-800 aspect-[4/5] rounded-xl flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Publicité</span>
                <h5 className="text-xl font-bold text-slate-500 mb-2">Votre marque ici</h5>
                <p className="text-sm text-slate-400 mb-6">Touchez 50,000+ décideurs du secteur.</p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent">trending_up</span>
                  Les plus lus
                </h4>
                <div className="space-y-6">
                  {relatedArticles.slice(0, 3).map((related, idx) => (
                    <Link key={related.id} href={`/actualites/${related.slug}`} className="group flex gap-4">
                      <span className="text-3xl font-black text-slate-200 dark:text-slate-800 transition-colors group-hover:text-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h5 className="font-bold text-sm leading-snug group-hover:text-accent transition-colors">
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
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col max-w-md mx-auto w-full bg-white dark:bg-background-dark overflow-x-hidden">
        <header className="sticky top-16 z-40 flex items-center justify-between bg-white/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-primary/10">
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
        </header>

        <main className="flex-1 pb-24 overflow-y-auto">
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
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              {article.category}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-primary dark:text-slate-100 mb-6 text-balance">
              {article.title}
            </h1>

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

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                {article.excerpt}
              </p>
              <p>{article.content || "Article content will be displayed here."}</p>
            </div>

            <div className="mt-12 p-6 bg-primary rounded-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Dossier Spécial : {article.category}</h3>
                <p className="text-sm text-slate-300 mb-4">Téléchargez notre étude complète sur les tendances du secteur.</p>
                <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-lg transition-all w-full justify-center">
                  <span className="material-symbols-outlined">download</span>
                  Télécharger le PDF
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 size-32 bg-accent/20 rounded-full blur-3xl"></div>
            </div>

            <section className="mt-16 pb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary dark:text-slate-100">À lire aussi</h2>
                <span className="h-px flex-1 bg-primary/10 ml-4"></span>
              </div>
              <div className="space-y-6">
                {relatedArticles.slice(0, 2).map((related) => (
                  <Link key={related.id} href={`/actualites/${related.slug}`} className="flex gap-4 group">
                    <div className="w-24 h-24 shrink-0 rounded-lg bg-cover bg-center overflow-hidden">
                      {related.cover_image && (
                        <Image
                          src={related.cover_image}
                          alt={related.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-accent uppercase mb-1">
                        {related.category}
                      </span>
                      <h4 className="text-sm font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                        {related.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {related.reading_time || "5"} min de lecture
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-primary/10 flex justify-around items-center px-2 py-3 z-50">
          <Link href="/" className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Accueil</span>
          </Link>
          <Link href="/annuaire" className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-[10px] font-medium">Annuaire</span>
          </Link>
          <Link href="/courses" className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">school</span>
            <span className="text-[10px] font-medium">Cours</span>
          </Link>
          <Link href="/actualites" className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined font-bold">newspaper</span>
            <span className="text-[10px] font-bold">Actualités</span>
            <div className="w-1 h-1 bg-accent rounded-full"></div>
          </Link>
          <Link href="/jobs" className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">work</span>
            <span className="text-[10px] font-medium">Emplois</span>
          </Link>
        </nav>
      </div>

      <Footer />
    </div>
  )
}
