'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import useSWR from 'swr';
import { ChevronRight } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SectorsPage() {
  const { data: sectorsData } = useSWR('/api/sectors', fetcher);
  const { data: companiesData } = useSWR('/api/companies?limit=1000', fetcher);

  const sectors = sectorsData?.data || [];
  const companies = companiesData?.data || [];

  // Calculate company count per sector
  const sectorStats = sectors.map((sector: any) => ({
    ...sector,
    count: companies.filter((c: any) => c.sector === sector.slug).length,
  }));

  return (
    <div className="min-h-screen bg-secondary font-sans text-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden bg-primary px-4 py-16">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/hero-construction.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <h1 className="mb-3 text-4xl font-black text-white md:text-5xl text-balance">
            Tous les Secteurs
          </h1>
          <p className="text-lg text-slate-300">
            Découvrez les différents secteurs d'activité du bâtiment et de la construction
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {sectorStats.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectorStats.map((sector: any) => (
                <Link
                  key={sector.id}
                  href={`/annuaire?sector=${sector.slug}`}
                  className="group flex flex-col rounded-xl bg-white border border-border p-6 transition-all hover:shadow-lg hover:border-primary"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors flex-1">
                      {sector.name}
                    </h3>
                    <span className="ml-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {sector.count || 0}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                    {sector.description || 'Découvrez les entreprises de ce secteur'}
                  </p>
                  <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    Voir les entreprises <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 p-8 bg-white rounded-xl border border-border">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{sectorStats.length}</div>
                <p className="text-muted-foreground">Secteurs d'activité</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{companies.length}</div>
                <p className="text-muted-foreground">Entreprises inscrites</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{Math.max(...sectorStats.map((s: any) => s.count || 0)) || 0}</div>
                <p className="text-muted-foreground">Max. entreprises/secteur</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-border">
            <i className="fa-solid fa-th-large text-5xl text-muted-foreground mb-4"></i>
            <h3 className="text-xl font-semibold text-primary mb-2">Aucun secteur trouvé</h3>
            <p className="text-muted-foreground">Revenez bientôt pour découvrir nos secteurs.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
