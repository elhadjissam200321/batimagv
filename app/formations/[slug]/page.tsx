import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"

interface FormationDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function FormationDetailPage({ params }: FormationDetailPageProps) {
  const { slug } = await params

  const supabase = await createClient()

  const { data: training, error } = await supabase
    .from("trainings")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !training) {
    notFound()
  }

  const { data: relatedTrainings } = await supabase
    .from("trainings")
    .select("*")
    .neq("id", training.id)
    .eq("domain", training.domain)
    .limit(3)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <Link href="/formations" className="text-white/70 hover:text-white flex items-center gap-2">
                <i className="fas fa-arrow-left"></i>
                Retour aux formations
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-balance">{training.title}</h1>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="bg-accent text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2">
                <i className="fas fa-chart-line"></i>
                {training.level}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2">
                <i className={`fas fa-${training.mode === "Presentiel" ? "building" : training.mode === "E-learning" ? "laptop" : "wifi"}`}></i>
                {training.mode}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2">
                <i className="fas fa-clock"></i>
                {training.duration}
              </span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <i className="fas fa-info-circle text-accent"></i>
                  À Propos de cette Formation
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  {training.description}
                </p>
              </div>

              {/* Objectives */}
              {training.objectives && training.objectives.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                    <i className="fas fa-target text-accent"></i>
                    Objectifs
                  </h2>
                  <ul className="space-y-3">
                    {training.objectives.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                        <i className="fas fa-check text-accent mt-1"></i>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Program */}
              {training.program && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                    <i className="fas fa-book text-accent"></i>
                    Programme Détaillé
                  </h2>
                  <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                    <p>{training.program}</p>
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {training.prerequisites && training.prerequisites.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                    <i className="fas fa-graduation-cap text-accent"></i>
                    Prérequis
                  </h2>
                  <ul className="space-y-3">
                    {training.prerequisites.map((prereq: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                        <i className="fas fa-check-circle text-accent mt-1"></i>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certification */}
              {training.certification && (
                <div className="bg-accent/10 border-l-4 border-accent p-6 rounded">
                  <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                    <i className="fas fa-certificate text-accent"></i>
                    Certification
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">{training.certification}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Key Info Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 sticky top-24">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <i className="fas fa-building text-3xl text-accent"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Institution</p>
                      <p className="font-bold text-primary">{training.institution}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex-shrink-0">
                      <i className="fas fa-calendar text-3xl text-accent"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Durée</p>
                      <p className="font-bold text-primary">{training.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-3xl text-accent"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Lieu</p>
                      <p className="font-bold text-primary">{training.location || "À déterminer"}</p>
                    </div>
                  </div>

                  {training.max_participants && (
                    <div className="flex items-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex-shrink-0">
                        <i className="fas fa-users text-3xl text-accent"></i>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold">Places Limités</p>
                        <p className="font-bold text-primary">{training.max_participants} participants max</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex-shrink-0">
                      <i className="fas fa-tag text-3xl text-accent"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Prix</p>
                      <p className="font-bold text-primary text-lg">
                        {training.price ? `${training.price} ${training.currency}` : "Gratuit"}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6">
                    <i className="fas fa-graduation-cap"></i>
                    S'Inscrire Maintenant
                  </button>

                  <button className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <i className="fas fa-envelope"></i>
                    Demander Plus d'Info
                  </button>
                </div>
              </div>

              {/* Share Section */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <i className="fas fa-share-alt"></i>
                  Partager
                </h3>
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2">
                    <i className="fab fa-facebook"></i>
                  </button>
                  <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded flex items-center justify-center gap-2">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded flex items-center justify-center gap-2">
                    <i className="fab fa-linkedin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Trainings */}
        {relatedTrainings && relatedTrainings.length > 0 && (
          <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 flex items-center gap-3">
                <i className="fas fa-book-open text-accent"></i>
                Formations Similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTrainings.map((related: any) => (
                  <Link key={related.id} href={`/formations/${related.slug}`} className="group">
                    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                      <div className="bg-gradient-to-r from-primary to-accent p-6">
                        <h3 className="text-lg font-bold text-white line-clamp-2">{related.title}</h3>
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{related.institution}</p>
                        <div className="space-y-2 text-sm flex-grow">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <i className="fas fa-clock w-4 text-accent"></i>
                            <span>{related.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <i className="fas fa-chart-line w-4 text-accent"></i>
                            <span>{related.level}</span>
                          </div>
                        </div>
                        <div className="text-accent font-bold mt-4 flex items-center gap-1">
                          Voir <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
