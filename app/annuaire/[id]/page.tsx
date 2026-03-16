import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"

interface CompanyDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: company, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", id)
    .single()

  if (error || !company) {
    notFound()
  }

  const { data: relatedCompanies } = await supabase
    .from("companies")
    .select("*")
    .eq("category", company.category)
    .neq("id", company.id)
    .limit(3)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link href="/annuaire" className="hover:text-white transition-colors flex items-center gap-1">
              <i className="fa-solid fa-building"></i>
              Annuaire
            </Link>
            <i className="fa-solid fa-chevron-right text-xs"></i>
            <span className="text-white">{company.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={120}
                className="rounded-xl border-4 border-white/20 bg-white"
              />
            ) : (
              <div className="size-28 bg-white/10 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-building text-white text-4xl"></i>
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {company.is_verified && (
                  <span className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <i className="fa-solid fa-check-circle"></i> Vérifié
                  </span>
                )}
                {company.is_premium && (
                  <span className="bg-accent text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <i className="fa-solid fa-crown"></i> Premium
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-white/80 text-lg mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-accent"></i>
                  <span>{company.city}, {company.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-folder text-accent"></i>
                  <span>{company.category}</span>
                </div>
                {company.year_founded && (
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-calendar text-accent"></i>
                    <span>Fondée en {company.year_founded}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {company.rating && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-accent mb-1">
                  <i className="fa-solid fa-star"></i>
                  <span className="text-2xl font-bold text-primary">{company.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{company.reviews_count || 0} avis</p>
              </div>
            )}
            {company.projects_completed && (
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{company.projects_completed}+</p>
                <p className="text-sm text-muted-foreground">Projets réalisés</p>
              </div>
            )}
            {company.employees_count && (
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{company.employees_count}</p>
                <p className="text-sm text-muted-foreground">Employés</p>
              </div>
            )}
            {company.year_founded && (
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{new Date().getFullYear() - company.year_founded}</p>
                <p className="text-sm text-muted-foreground">Années d'expérience</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-building text-accent"></i>
                  À propos de {company.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {company.long_description || company.description}
                </p>
              </div>

              {/* Services */}
              {company.services && company.services.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-cogs text-accent"></i>
                    Services proposés
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {company.services.map((service: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                        <i className="fa-solid fa-check-circle text-green-500"></i>
                        <span className="text-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {company.certifications && company.certifications.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-award text-accent"></i>
                    Certifications
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {company.certifications.map((cert: string, idx: number) => (
                      <span key={idx} className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <i className="fa-solid fa-certificate"></i>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-address-card text-accent"></i>
                    Coordonnées
                  </h3>
                  <div className="space-y-4">
                    {company.address && (
                      <div className="flex items-start gap-3">
                        <i className="fa-solid fa-map-marker-alt text-accent mt-1"></i>
                        <div>
                          <p className="text-sm text-muted-foreground">Adresse</p>
                          <p className="font-medium text-foreground">{company.address}</p>
                          <p className="text-sm text-muted-foreground">{company.city}, {company.country}</p>
                        </div>
                      </div>
                    )}
                    {company.phone && (
                      <div className="flex items-start gap-3">
                        <i className="fa-solid fa-phone text-accent mt-1"></i>
                        <div>
                          <p className="text-sm text-muted-foreground">Téléphone</p>
                          <a href={`tel:${company.phone}`} className="font-medium text-foreground hover:text-accent transition-colors">
                            {company.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {company.email && (
                      <div className="flex items-start gap-3">
                        <i className="fa-solid fa-envelope text-accent mt-1"></i>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <a href={`mailto:${company.email}`} className="font-medium text-foreground hover:text-accent transition-colors break-all">
                            {company.email}
                          </a>
                        </div>
                      </div>
                    )}
                    {company.website && (
                      <div className="flex items-start gap-3">
                        <i className="fa-solid fa-globe text-accent mt-1"></i>
                        <div>
                          <p className="text-sm text-muted-foreground">Site web</p>
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-accent transition-colors break-all">
                            {company.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-primary rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-3">Besoin d'un devis ?</h3>
                  <p className="text-white/70 text-sm mb-4">Contactez directement {company.name} pour vos projets.</p>
                  {company.email && (
                    <a 
                      href={`mailto:${company.email}?subject=Demande de devis`}
                      className="block w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                    >
                      <i className="fa-solid fa-paper-plane mr-2"></i>
                      Demander un devis
                    </a>
                  )}
                </div>

                {/* Share Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-share-nodes text-accent"></i>
                    Partager
                  </h3>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white py-2 rounded-lg transition-colors">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </button>
                    <button className="flex-1 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white py-2 rounded-lg transition-colors">
                      <i className="fa-brands fa-facebook-f"></i>
                    </button>
                    <button className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white py-2 rounded-lg transition-colors">
                      <i className="fa-brands fa-whatsapp"></i>
                    </button>
                    <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg transition-colors">
                      <i className="fa-solid fa-link"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Companies */}
      {relatedCompanies && relatedCompanies.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              <i className="fa-solid fa-building text-accent"></i>
              Entreprises similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCompanies.map((relCompany: any) => (
                <Link 
                  key={relCompany.id}
                  href={`/annuaire/${relCompany.slug}`}
                  className="bg-white rounded-xl p-5 border border-border hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {relCompany.logo ? (
                      <Image
                        src={relCompany.logo}
                        alt={relCompany.name}
                        width={56}
                        height={56}
                        className="rounded-lg border border-border"
                      />
                    ) : (
                      <div className="size-14 bg-primary/10 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-building text-primary text-xl"></i>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                        {relCompany.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{relCompany.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relCompany.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-accent"></i>
                      {relCompany.city}, {relCompany.country}
                    </span>
                    {relCompany.rating && (
                      <span className="flex items-center gap-1 text-accent">
                        <i className="fa-solid fa-star"></i>
                        {relCompany.rating}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
