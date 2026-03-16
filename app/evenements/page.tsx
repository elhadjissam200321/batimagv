import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"
import { createClient } from "@/lib/supabase/server"

export default async function EvenementsPage() {
  const supabase = await createClient()
  
  const { data: events = [] } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true })

  const featuredEvent = events.find((e: any) => e.is_featured) || events[0]
  const upcomingEvents = events.filter((e: any) => e.id !== featuredEvent?.id)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-calendar-days text-accent text-2xl"></i>
            <span className="text-accent font-semibold uppercase tracking-wider text-sm">Événements & Salons</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Calendrier des Événements BTP</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Retrouvez tous les salons, conférences et événements majeurs du secteur de la construction en Afrique.
          </p>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="bg-secondary py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  {featuredEvent.cover_image ? (
                    <Image
                      src={featuredEvent.cover_image}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-slate-200 w-full h-full flex items-center justify-center">
                      <i className="fa-solid fa-image text-slate-400 text-4xl"></i>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-xs font-bold uppercase rounded">
                    <i className="fa-solid fa-star mr-1"></i> À la une
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-accent text-sm font-semibold mb-3">
                    <i className="fa-solid fa-tag"></i>
                    <span>{featuredEvent.event_type}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{featuredEvent.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredEvent.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar text-accent"></i>
                      <span>{new Date(featuredEvent.start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-accent"></i>
                      <span>{featuredEvent.city}, {featuredEvent.country}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/evenements/${featuredEvent.slug}`}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-fit"
                  >
                    <i className="fa-solid fa-circle-info"></i>
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Prochains Événements" subtitle="Ne manquez aucun rendez-vous du secteur" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {upcomingEvents.map((event: any) => (
              <Link 
                key={event.id} 
                href={`/evenements/${event.slug}`}
                className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-48">
                  {event.cover_image ? (
                    <Image
                      src={event.cover_image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="bg-slate-100 w-full h-full flex items-center justify-center">
                      <i className="fa-solid fa-calendar-day text-slate-300 text-4xl"></i>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 text-xs font-semibold rounded">
                    {event.event_type}
                  </div>
                  {event.is_online && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded flex items-center gap-1">
                      <i className="fa-solid fa-video"></i> En ligne
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <i className="fa-regular fa-calendar text-accent"></i>
                    <span>{new Date(event.start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{event.city}, {event.country}</span>
                  </div>
                  {event.price > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-accent">
                      <i className="fa-solid fa-ticket"></i>
                      <span>{event.price} {event.currency}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-16 bg-secondary rounded-xl mt-10">
              <i className="fa-regular fa-calendar-xmark text-5xl text-muted-foreground mb-4"></i>
              <h3 className="text-xl font-semibold text-primary mb-2">Aucun événement à venir</h3>
              <p className="text-muted-foreground">Revenez bientôt pour découvrir nos prochains événements.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <i className="fa-solid fa-bell text-accent text-4xl mb-4"></i>
          <h2 className="text-3xl font-bold text-white mb-4">Ne manquez aucun événement</h2>
          <p className="text-white/70 mb-8">Inscrivez-vous à notre newsletter pour recevoir les invitations en avant-première.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <i className="fa-solid fa-paper-plane"></i>
              S'inscrire
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
