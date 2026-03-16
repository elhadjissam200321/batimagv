import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", id)
    .single()

  if (error || !event) {
    notFound()
  }

  const { data: relatedEvents } = await supabase
    .from("events")
    .select("*")
    .neq("id", event.id)
    .limit(3)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        {event.cover_image ? (
          <Image
            src={event.cover_image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-gradient-to-br from-primary to-primary/80 w-full h-full" />
        )}
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-4">
              <Link href="/evenements" className="hover:text-white transition-colors">
                <i className="fa-solid fa-arrow-left mr-2"></i>Événements
              </Link>
            </nav>
            <div className="inline-flex items-center gap-2 bg-accent text-white px-3 py-1 rounded text-sm font-semibold mb-4">
              <i className="fa-solid fa-tag"></i>
              {event.event_type}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-calendar text-accent"></i>
                <span>{new Date(event.start_date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-accent"></i>
                <span>{event.location || `${event.city}, ${event.country}`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-slate max-w-none">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-primary mb-6">
                  <i className="fa-solid fa-circle-info text-accent"></i>
                  À propos de l'événement
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {event.description}
                </p>
                {event.long_description && (
                  <div className="text-foreground leading-relaxed">
                    {event.long_description}
                  </div>
                )}
              </div>

              {/* Event Details Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <i className="fa-regular fa-calendar-check text-accent text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date de début</p>
                      <p className="font-semibold text-primary">
                        {new Date(event.start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <i className="fa-regular fa-calendar-xmark text-accent text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date de fin</p>
                      <p className="font-semibold text-primary">
                        {new Date(event.end_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-map-marker-alt text-accent text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lieu</p>
                      <p className="font-semibold text-primary">{event.location || `${event.city}, ${event.country}`}</p>
                      {event.address && <p className="text-sm text-muted-foreground">{event.address}</p>}
                    </div>
                  </div>
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-users text-accent text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capacité</p>
                      <p className="font-semibold text-primary">{event.max_attendees || "Illimitée"} participants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Registration Card */}
                <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                  <div className="text-center mb-6">
                    {event.price > 0 ? (
                      <>
                        <p className="text-sm text-muted-foreground">Tarif d'entrée</p>
                        <p className="text-4xl font-bold text-primary">{event.price} <span className="text-lg">{event.currency}</span></p>
                      </>
                    ) : (
                      <p className="text-2xl font-bold text-green-600">
                        <i className="fa-solid fa-gift mr-2"></i>Gratuit
                      </p>
                    )}
                  </div>
                  {event.registration_url && (
                    <a 
                      href={event.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors mb-3"
                    >
                      <i className="fa-solid fa-ticket mr-2"></i>S'inscrire maintenant
                    </a>
                  )}
                  {event.is_online && event.online_url && (
                    <a 
                      href={event.online_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                    >
                      <i className="fa-solid fa-video mr-2"></i>Rejoindre en ligne
                    </a>
                  )}
                </div>

                {/* Organizer Card */}
                {event.organizer_name && (
                  <div className="bg-secondary rounded-xl p-6">
                    <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-building text-accent"></i>
                      Organisateur
                    </h4>
                    <div className="flex items-center gap-3">
                      {event.organizer_logo ? (
                        <Image
                          src={event.organizer_logo}
                          alt={event.organizer_name}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <i className="fa-solid fa-building text-primary"></i>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-primary">{event.organizer_name}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Share Card */}
                <div className="bg-white border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-share-nodes text-accent"></i>
                    Partager
                  </h4>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white py-2 rounded-lg transition-colors">
                      <i className="fa-brands fa-facebook-f"></i>
                    </button>
                    <button className="flex-1 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white py-2 rounded-lg transition-colors">
                      <i className="fa-brands fa-twitter"></i>
                    </button>
                    <button className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white py-2 rounded-lg transition-colors">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </button>
                    <button className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white py-2 rounded-lg transition-colors">
                      <i className="fa-brands fa-whatsapp"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents && relatedEvents.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              <i className="fa-solid fa-calendar-plus text-accent"></i>
              Autres événements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEvents.map((relEvent: any) => (
                <Link 
                  key={relEvent.id}
                  href={`/evenements/${relEvent.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-40">
                    {relEvent.cover_image ? (
                      <Image
                        src={relEvent.cover_image}
                        alt={relEvent.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="bg-slate-100 w-full h-full flex items-center justify-center">
                        <i className="fa-solid fa-calendar text-slate-300 text-3xl"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <i className="fa-regular fa-calendar text-accent"></i>
                      {new Date(relEvent.start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </p>
                    <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                      {relEvent.title}
                    </h3>
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
