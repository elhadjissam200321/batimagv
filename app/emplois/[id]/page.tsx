import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", id)
    .single()

  if (error || !job) {
    notFound()
  }

  const { data: relatedJobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("sector", job.sector)
    .neq("id", job.id)
    .limit(3)

  const contractTypeColors: Record<string, string> = {
    "CDI": "bg-green-100 text-green-700",
    "CDD": "bg-blue-100 text-blue-700",
    "Stage": "bg-purple-100 text-purple-700",
    "Freelance": "bg-orange-100 text-orange-700",
  }

  return (
    <main className="min-h-screen flex flex-col bg-secondary">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/emplois" className="hover:text-accent transition-colors flex items-center gap-1">
              <i className="fa-solid fa-briefcase"></i>
              Emplois
            </Link>
            <i className="fa-solid fa-chevron-right text-xs"></i>
            <span className="text-foreground">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4 mb-6">
                {job.company_logo ? (
                  <Image
                    src={job.company_logo}
                    alt={job.company_name}
                    width={80}
                    height={80}
                    className="rounded-xl border border-border"
                  />
                ) : (
                  <div className="size-20 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-building text-primary text-2xl"></i>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {job.is_urgent && (
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold rounded flex items-center gap-1">
                        <i className="fa-solid fa-fire"></i> Urgent
                      </span>
                    )}
                    {job.is_featured && (
                      <span className="bg-accent/10 text-accent px-2 py-0.5 text-xs font-semibold rounded flex items-center gap-1">
                        <i className="fa-solid fa-star"></i> En vedette
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">{job.title}</h1>
                  <p className="text-lg text-muted-foreground">{job.company_name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <i className="fa-solid fa-location-dot text-accent"></i>
                  <span>{job.location}, {job.country}</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${contractTypeColors[job.contract_type] || "bg-slate-100 text-slate-700"}`}>
                  <i className="fa-solid fa-file-contract"></i>
                  {job.contract_type}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <i className="fa-solid fa-industry text-accent"></i>
                  <span>{job.sector}</span>
                </div>
                {job.experience_level && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <i className="fa-solid fa-chart-line text-accent"></i>
                    <span>{job.experience_level}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <i className="fa-solid fa-file-lines text-accent"></i>
                Description du poste
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-accent"></i>
                  Profil recherché
                </h2>
                <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                  {job.requirements}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                {job.salary_range && (
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">Salaire</p>
                    <p className="text-2xl font-bold text-primary">{job.salary_range}</p>
                  </div>
                )}
                
                {job.application_url && (
                  <a 
                    href={job.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors mb-3"
                  >
                    <i className="fa-solid fa-paper-plane mr-2"></i>
                    Postuler maintenant
                  </a>
                )}
                {job.application_email && (
                  <a 
                    href={`mailto:${job.application_email}?subject=Candidature: ${job.title}`}
                    className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                  >
                    <i className="fa-solid fa-envelope mr-2"></i>
                    Envoyer par email
                  </a>
                )}

                {job.expires_at && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    <i className="fa-regular fa-clock mr-1"></i>
                    Expire le {new Date(job.expires_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
              </div>

              {/* Job Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-circle-info text-accent"></i>
                  Informations
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-calendar text-accent mt-1"></i>
                    <div>
                      <p className="text-sm text-muted-foreground">Publié le</p>
                      <p className="font-medium text-foreground">
                        {new Date(job.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-briefcase text-accent mt-1"></i>
                    <div>
                      <p className="text-sm text-muted-foreground">Type de contrat</p>
                      <p className="font-medium text-foreground">{job.contract_type}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-building text-accent mt-1"></i>
                    <div>
                      <p className="text-sm text-muted-foreground">Secteur</p>
                      <p className="font-medium text-foreground">{job.sector}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-share-nodes text-accent"></i>
                  Partager cette offre
                </h3>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white py-2 rounded-lg transition-colors">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </button>
                  <button className="flex-1 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white py-2 rounded-lg transition-colors">
                    <i className="fa-brands fa-facebook-f"></i>
                  </button>
                  <button className="flex-1 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white py-2 rounded-lg transition-colors">
                    <i className="fa-brands fa-twitter"></i>
                  </button>
                  <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg transition-colors">
                    <i className="fa-solid fa-link"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        {relatedJobs && relatedJobs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <i className="fa-solid fa-briefcase text-accent"></i>
              Offres similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedJobs.map((relJob: any) => (
                <Link 
                  key={relJob.id}
                  href={`/emplois/${relJob.slug}`}
                  className="bg-white rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {relJob.company_logo ? (
                      <Image
                        src={relJob.company_logo}
                        alt={relJob.company_name}
                        width={48}
                        height={48}
                        className="rounded-lg border border-border"
                      />
                    ) : (
                      <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-building text-primary"></i>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-1">
                        {relJob.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{relJob.company_name}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-secondary px-2 py-1 rounded flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-accent"></i>
                      {relJob.location}
                    </span>
                    <span className={`px-2 py-1 rounded ${contractTypeColors[relJob.contract_type] || "bg-slate-100 text-slate-700"}`}>
                      {relJob.contract_type}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}
