'use client';

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, ChevronLeft, Search, X } from "lucide-react"

const sectorOptions = [
  { icon: "fa-solid fa-hard-hat", label: "Gros Œuvre", slug: "gros-oeuvre" },
  { icon: "fa-solid fa-paint-roller", label: "Second Œuvre", slug: "second-oeuvre" },
  { icon: "fa-solid fa-road", label: "Travaux Publics", slug: "travaux-publics" },
  { icon: "fa-solid fa-bolt", label: "Lots Techniques", slug: "lots-techniques" },
  { icon: "fa-solid fa-drafting-compass", label: "Ingénierie", slug: "ingenierie" },
  { icon: "fa-solid fa-cogs", label: "Équipements", slug: "equipements" },
]

const ITEMS_PER_PAGE = 9

export default function AnnuairePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedSector, setSelectedSector] = useState(searchParams.get('sector') || '')
  const currentPage = parseInt(searchParams.get('page') || '1')
  const [companiesData, setCompaniesData] = useState<any>(null)
  const [sectorsData, setSectorsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [companiesRes, sectorsRes] = await Promise.all([
          fetch(`/api/companies?search=${encodeURIComponent(searchTerm)}&sector=${encodeURIComponent(selectedSector)}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`),
          fetch('/api/sectors')
        ])
        const companies = await companiesRes.json()
        const sectors = await sectorsRes.json()
        setCompaniesData(companies)
        setSectorsData(sectors)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }
    fetchData()
  }, [searchTerm, selectedSector, currentPage])
  
  const premiumCompanies = useMemo(() => {
    return (companiesData?.data || []).filter((c: any) => c.is_premium).slice(0, 3)
  }, [companiesData])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/annuaire?search=${encodeURIComponent(searchTerm)}&sector=${encodeURIComponent(selectedSector)}&page=1`)
  }

  const handleSectorClick = (sectorSlug: string) => {
    setSelectedSector(sectorSlug)
    router.push(`/annuaire?search=${encodeURIComponent(searchTerm)}&sector=${encodeURIComponent(sectorSlug)}&page=1`)
  }

  const handlePageChange = (page: number) => {
    router.push(`/annuaire?search=${encodeURIComponent(searchTerm)}&sector=${encodeURIComponent(selectedSector)}&page=${page}`)
  }

  const totalPages = companiesData?.totalPages || 1
  const companies = companiesData?.data || []
  const sectors = sectorsData?.data || []
  const total = companiesData?.total || 0

  return (
    <div className="min-h-screen bg-secondary font-sans text-primary">
      <Navbar />

      {/* Hero Search */}
      <section className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-primary px-4 py-20">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/hero-construction.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="fa-solid fa-building text-accent text-3xl"></i>
          </div>
          <h1 className="mb-3 text-4xl font-black text-white md:text-6xl text-balance">
            Annuaire B2B du Bâtiment
          </h1>
          <p className="mb-10 text-lg text-slate-300">
            Trouvez vos partenaires, fournisseurs et prestataires au Maroc et en Afrique.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:flex-row">
            <div className="flex flex-1 items-center gap-2 border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Entreprise, produit ou service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-none bg-transparent text-sm text-primary placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button 
              type="submit"
              className="flex shrink-0 items-center justify-center gap-2 bg-primary px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Sectors */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <i className="fa-solid fa-th-large text-accent"></i>
              Explorer par Secteur
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Naviguez à travers nos catégories professionnelles spécialisées
            </p>
          </div>
          <Link
            href="/annuaire/secteurs"
            className="whitespace-nowrap text-sm font-bold text-primary underline underline-offset-2 transition-colors hover:text-accent flex items-center gap-1"
          >
            Voir tous les secteurs <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sectorOptions.map(({ icon, label, slug }) => (
            <button
              key={slug}
              onClick={() => handleSectorClick(slug)}
              className={`group flex cursor-pointer flex-col items-center gap-4 rounded-xl border transition-all p-6 ${
                selectedSector === slug
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-white hover:border-primary hover:shadow-lg'
              }`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                selectedSector === slug
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
              }`}>
                <i className={`${icon} text-lg`}></i>
              </div>
              <span className="text-center text-sm font-bold text-primary">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Premium Companies */}
      {premiumCompanies.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <i className="fa-solid fa-crown text-accent"></i>
                Entreprises Premium
              </h2>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <i className="fa-solid fa-star text-accent"></i>
                Mise en avant
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumCompanies.map((company: any) => (
                <Link
                  key={company.id}
                  href={`/annuaire/${company.slug}`}
                  className="group flex flex-col rounded-xl bg-white border-2 border-accent/20 p-5 shadow-sm transition-all hover:shadow-lg hover:border-accent"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={64}
                        height={64}
                        className="rounded-lg border border-border"
                      />
                    ) : (
                      <div className="size-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-building text-primary text-2xl"></i>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-bold text-primary group-hover:text-accent transition-colors">
                          {company.name}
                        </h3>
                        {company.is_verified && (
                          <i className="fa-solid fa-check-circle text-blue-500"></i>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{company.sector}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-location-dot text-accent"></i>
                          {company.city}
                        </span>
                        {company.rating && (
                          <span className="flex items-center gap-1">
                            <i className="fa-solid fa-star text-accent"></i>
                            {company.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{company.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <i className="fa-solid fa-crown"></i> Premium
                    </span>
                    <span className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Voir le profil <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Companies */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <i className="fa-solid fa-building text-accent"></i>
              Résultats
            </h2>
            <span className="text-sm text-muted-foreground">{total} entreprises trouvées</span>
          </div>

          {companies.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {companies.map((company: any) => (
                  <Link
                    key={company.id}
                    href={`/annuaire/${company.slug}`}
                    className="group flex flex-col rounded-xl bg-white border border-border p-5 transition-all hover:shadow-lg hover:border-accent/40"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
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
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-bold text-primary group-hover:text-accent transition-colors">
                            {company.name}
                          </h3>
                          {company.is_verified && (
                            <i className="fa-solid fa-check-circle text-blue-500 text-sm"></i>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{company.sector}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{company.description}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-location-dot text-accent"></i>
                        {company.city}, {company.country}
                      </span>
                      {company.rating && (
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-star text-accent"></i>
                          {company.rating}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = Math.max(1, currentPage - 2) + i;
                    return pageNum <= totalPages ? pageNum : null;
                  }).filter(Boolean).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`w-10 h-10 rounded-lg transition ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'border border-border hover:bg-muted'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-border">
              <i className="fa-solid fa-search text-5xl text-muted-foreground mb-4"></i>
              <h3 className="text-xl font-semibold text-primary mb-2">Aucune entreprise trouvée</h3>
              <p className="text-muted-foreground mb-6">Essayez une autre recherche ou réinitialisez les filtres</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSector('')
                  router.push('/annuaire')
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-primary px-10 py-14 md:flex-row">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="mb-4 text-3xl font-black text-white text-balance flex items-center gap-3">
              <i className="fa-solid fa-rocket text-accent"></i>
              Augmentez votre visibilité
            </h2>
            <p className="leading-relaxed text-slate-400">
              Rejoignez le premier annuaire B2B de la construction au Maroc. Générez des
              leads qualifiés et trouvez vos futurs partenaires stratégiques.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Link 
              href="/contact"
              className="rounded-xl bg-white px-8 py-4 text-sm font-black text-primary transition-colors hover:bg-slate-100 flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              Inscrire mon entreprise
            </Link>
            <Link 
              href="/contact"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white/20 flex items-center gap-2"
            >
              <i className="fa-solid fa-file-invoice"></i>
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
