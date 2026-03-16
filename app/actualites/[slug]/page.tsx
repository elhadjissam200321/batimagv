'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Calendar, User, Share2, Bookmark } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { AdSection } from '@/components/ad-slot'

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  author: string
  published_at: string
  created_at: string
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])

  useEffect(() => {
    async function fetchArticle() {
      try {
        const supabase = createClient()

        // Fetch main article
        const { data: articleData, error: articleError } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (articleError) throw articleError

        setArticle(articleData)

        // Fetch related articles by category
        const { data: relatedData, error: relatedError } = await supabase
          .from('articles')
          .select('*')
          .eq('category', articleData.category)
          .neq('id', articleData.id)
          .limit(3)

        if (!relatedError) {
          setRelatedArticles(relatedData || [])
        }
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.slug])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-96 bg-slate-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Article non trouvé</h1>
            <Link href="/actualites" className="text-orange-600 hover:text-orange-700 font-semibold">
              Retour aux actualités
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const categoryColors: Record<string, string> = {
    'Infrastructures': 'bg-blue-700',
    'Bâtiment': 'bg-green-700',
    'Génie Civil': 'bg-slate-800',
    'Énergie': 'bg-orange-700',
    'Matériaux': 'bg-slate-600',
    'Réglementation': 'bg-purple-700',
  }

  const publishDate = new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/actualites" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
              <ChevronLeft className="w-4 h-4" />
              Retour aux actualités
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        {article.image_url && (
          <div className="relative h-96 bg-slate-200 overflow-hidden">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Badge */}
              <div className="mb-4">
                <span className={`${categoryColors[article.category] || 'bg-slate-600'} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{publishDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{article.author}</span>
                </div>
                <button className="ml-auto flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Partager</span>
                </button>
                <button className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm">Sauvegarder</span>
                </button>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-slate-700 mb-8 leading-relaxed font-medium">
                {article.excerpt}
              </p>

              {/* Body Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div className="text-slate-700 leading-relaxed space-y-4">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Ad */}
              <AdSection format="leaderboard" className="my-12" />

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <section className="mt-12 pt-12 border-t border-slate-200">
                  <h2 className="text-2xl font-bold text-foreground mb-8">Articles connexes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        href={`/actualites/${relatedArticle.slug}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-orange-300 transition-colors h-full">
                          {relatedArticle.image_url && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={relatedArticle.image_url}
                                alt={relatedArticle.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-4">
                            <span className={`${categoryColors[relatedArticle.category] || 'bg-slate-600'} text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-2`}>
                              {relatedArticle.category}
                            </span>
                            <h3 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors line-clamp-2">
                              {relatedArticle.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Ad Sidebar */}
              <div className="mb-8 sticky top-20">
                <AdSection format="rectangle" />
              </div>

              {/* Newsletter CTA */}
              <div className="bg-orange-600 text-white rounded-lg p-6 mb-8">
                <h3 className="font-bold text-lg mb-2">Restez informé</h3>
                <p className="text-sm mb-4">Recevez les dernières actualités du secteur BATIMAG directement dans votre boîte mail.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-3 py-2 rounded bg-orange-500 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-slate-800 text-white font-semibold py-2 rounded hover:bg-slate-900 transition-colors"
                  >
                    S'abonner
                  </button>
                </form>
              </div>

              {/* Share */}
              <div className="bg-slate-100 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4">Partager cet article</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-sky-500 text-white rounded font-medium hover:bg-sky-600 transition-colors">
                    Twitter
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-slate-700 text-white rounded font-medium hover:bg-slate-800 transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Ad Footer */}
        <AdSection format="billboard" className="py-8" />
      </main>
      <Footer />
    </>
  )
}
