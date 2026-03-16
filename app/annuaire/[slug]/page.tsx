'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, MapPin, Phone, Mail, Globe, Star, Users, Briefcase } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { AdSection } from '@/components/ad-slot'

interface Company {
  id: string
  slug: string
  name: string
  logo_url: string
  description: string
  sector: string
  city: string
  country: string
  email: string
  phone: string
  website: string
  employees_count: number
  verified: boolean
  rating: number
  created_at: string
}

interface CompanyJob {
  id: string
  title: string
  job_type: string
  company_id: string
}

export default function CompanyDetailPage({ params }: { params: { slug: string } }) {
  const [company, setCompany] = useState<Company | null>(null)
  const [jobs, setJobs] = useState<CompanyJob[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCompany() {
      try {
        const supabase = createClient()

        // Fetch company
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (companyError) throw companyError

        setCompany(companyData)

        // Fetch company jobs
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('id, title, job_type, company_id')
          .eq('company_id', companyData.id)
          .limit(5)

        if (!jobsError) {
          setJobs(jobsData || [])
        }
      } catch (error) {
        console.error('Error fetching company:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [params.slug])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/3"></div>
              <div className="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!company) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Entreprise non trouvée</h1>
            <Link href="/annuaire" className="text-orange-600 hover:text-orange-700 font-semibold">
              Retour à l'annuaire
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const sectorColors: Record<string, string> = {
    'Construction': 'bg-blue-700',
    'Immobilier': 'bg-green-700',
    'Énergie': 'bg-orange-700',
    'Matériaux': 'bg-slate-600',
    'Génie Civil': 'bg-slate-800',
    'Architecture': 'bg-purple-700',
  }

  const jobTypeColors: Record<string, string> = {
    'CDI': 'bg-green-100 text-green-800',
    'CDD': 'bg-blue-100 text-blue-800',
    'Stage': 'bg-purple-100 text-purple-800',
    'Mission': 'bg-orange-100 text-orange-800',
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Link href="/annuaire" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
              <ChevronLeft className="w-4 h-4" />
              Retour à l'annuaire
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-start gap-8">
              {/* Logo */}
              {company.logo_url ? (
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={company.logo_url}
                      alt={company.name}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center text-2xl font-bold text-slate-800">
                    {company.name.charAt(0)}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{company.name}</h1>
                  {company.verified && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ✓ Vérifié
                    </span>
                  )}
                </div>
                <span className={`${sectorColors[company.sector] || 'bg-slate-600'} text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4`}>
                  {company.sector}
                </span>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{company.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{company.employees_count} employés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{company.city}, {company.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">À propos</h2>
                <p className="text-slate-700 leading-relaxed">
                  {company.description}
                </p>
              </section>

              {/* Ad */}
              <AdSection format="leaderboard" />

              {/* Active Jobs */}
              {jobs.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-foreground">Offres d'emploi</h2>
                    <Link href="/emplois" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                      Voir tous
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <Link
                        key={job.id}
                        href={`/emplois/${job.id}`}
                        className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground hover:text-orange-600 transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                              {company.name}
                            </p>
                          </div>
                          <span className={`${jobTypeColors[job.job_type] || 'bg-slate-100 text-slate-800'} text-xs font-bold px-2 py-1 rounded`}>
                            {job.job_type}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Contact CTA */}
              <div className="bg-orange-600 text-white rounded-lg p-6 sticky top-20">
                <h3 className="font-bold text-lg mb-4">Contactez-nous</h3>

                {company.phone && (
                  <a href={`tel:${company.phone}`} className="flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{company.phone}</span>
                  </a>
                )}

                {company.email && (
                  <a href={`mailto:${company.email}`} className="flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium text-sm break-all">{company.email}</span>
                  </a>
                )}

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-medium text-sm">Visiter le site</span>
                  </a>
                )}

                <button className="w-full bg-slate-800 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-slate-900 transition-colors">
                  Demander une info
                </button>
              </div>

              {/* Ad Sidebar */}
              <div>
                <AdSection format="rectangle" />
              </div>

              {/* Location Info */}
              <div className="bg-slate-100 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4">Localisation</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">{company.city}</p>
                      <p className="text-sm text-slate-600">{company.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Stats */}
              <div className="bg-slate-100 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4">Informations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Collaborateurs</span>
                    <span className="font-semibold">{company.employees_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Secteur</span>
                    <span className="font-semibold">{company.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Note</span>
                    <span className="font-semibold flex items-center gap-1">
                      {company.rating.toFixed(1)}
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </span>
                  </div>
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
