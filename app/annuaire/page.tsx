import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Annuaire B2B du Bâtiment | BATIMAG",
  description:
    "Trouvez vos partenaires, fournisseurs et prestataires au Maroc et en Afrique.",
}

const sectors = [
  { icon: "fa-solid fa-hard-hat", label: "Gros Œuvre" },
  { icon: "fa-solid fa-paint-roller", label: "Second Œuvre" },
  { icon: "fa-solid fa-road", label: "Travaux Publics" },
  { icon: "fa-solid fa-bolt", label: "Lots Techniques" },
  { icon: "fa-solid fa-drafting-compass", label: "Ingénierie" },
  { icon: "fa-solid fa-cogs", label: "Équipements" },
]

const popularTags = ["Gros Œuvre", "Architectes", "Cimenterie", "Énergie Solaire"]

export default async function AnnuairePage() {
  const supabase = await createClient()
  
  const { data: companies = [] } = await supabase
    .from("companies")
    .select("*")
    .order("is_premium", { ascending: false })
    .limit(20)

  const premiumCompanies = companies.filter((c: any) => c.is_premium)
  const regularCompanies = companies.filter((c: any) => !c.is_premium)

  return (
    <div className="min-h-screen bg-secondary font-sans text-primary">
      <Navbar />

      {/* Hero Search */}
      <section className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-primary px-4 py-20">
        <div
          className="absolute inset-0 opacity-10"
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
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:flex-row">
            <div className="flex flex-1 items-center gap-2 border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r">
              <i className="fa-solid fa-search text-slate-400"></i>
              <input
                type="text"
                placeholder="Entreprise, produit ou service..."
                className="w-full border-none bg-transparent text-sm text-primary placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 px-4 py-3">
              <i className="fa-solid fa-location-dot text-slate-400"></i>
              <select className="w-full cursor-pointer appearance-none border-none bg-transparent text-sm text-primary focus:outline-none">
                <option>Tout le Maroc</option>
                <option>Afrique du Nord</option>
                <option>Afrique de l&apos;Ouest</option>
                <option>International</option>
              </select>
              <i className="fa-solid fa-chevron-down text-slate-400 text-xs"></i>
            </div>
            <button className="flex shrink-0 items-center justify-center gap-2 bg-primary px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary/90">
              <i className="fa-solid fa-search"></i>
              Rechercher
            </button>
          </div>

          {/* Popular Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
            <span className="font-medium">Populaire :</span>
            {popularTags.map((tag) => (
              <a
                key={tag}
                href="#"
                className="underline underline-offset-2 transition-colors hover:text-white"
              >
                {tag}
              </a>
            ))}
          </div>
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
          <a
            href="#"
            className="whitespace-nowrap text-sm font-bold text-primary underline underline-offset-2 transition-colors hover:text-accent"
          >
            Voir tous les secteurs
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sectors.map(({ icon, label }) => (
            <button
              key={label}
              className="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-border bg-white p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
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
                      <p className="text-sm text-muted-foreground truncate">{company.category}</p>
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
                      Voir le profil <i className="fa-solid fa-arrow-right"></i>
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
              Toutes les entreprises
            </h2>
            <span className="text-sm text-muted-foreground">{companies.length} entreprises</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCompanies.map((company: any) => (
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
                    <p className="text-sm text-muted-foreground truncate">{company.category}</p>
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

          {companies.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-border">
              <i className="fa-solid fa-building text-5xl text-muted-foreground mb-4"></i>
              <h3 className="text-xl font-semibold text-primary mb-2">Aucune entreprise trouvée</h3>
              <p className="text-muted-foreground">Revenez bientôt pour découvrir notre annuaire.</p>
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
