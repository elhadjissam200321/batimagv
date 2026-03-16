'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SectionHeader from '@/components/section-header'
import { AdSection } from '@/components/ad-slot'
import NewsletterForm from '@/components/newsletter-form'

interface Event {
  id: string
  title: string
  description: string
  image_url: string
  location: string
  event_date: string
  event_type: string
  capacity: number
  registered_count: number
  created_at: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchEvents() {
      try {
        const supabase = createClient()

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true })

        if (error) throw error

        setEvents(data || [])
        setFilteredEvents(data || [])
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter((event) => event.event_type === selectedType)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [selectedType, searchQuery, events])

  const eventTypes = ['Salon', 'Conférence', 'Formation', 'Séminaire', 'Workshop']

  const typeColors: Record<string, string> = {
    'Salon': 'bg-blue-700',
    'Conférence': 'bg-purple-700',
    'Formation': 'bg-green-700',
    'Séminaire': 'bg-orange-700',
    'Workshop': 'bg-slate-700',
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const upcomingEvents = filteredEvents.filter((e) => new Date(e.event_date) > new Date())
  const pastEvents = filteredEvents.filter((e) => new Date(e.event_date) <= new Date())

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-start justify-between gap-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">Événements & Salons</h1>
                <p className="text-lg text-slate-300 max-w-2xl">
                  Découvrez les prochains événements, salons et séminaires du secteur de la construction en Afrique
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher un événement ou une localité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                    selectedType === 'all'
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tous
                </button>
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-orange-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-48 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Événements à venir</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {upcomingEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={`/evenements/${event.id}`}
                        className="group bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Image */}
                        {event.image_url && (
                          <div className="relative h-48 overflow-hidden bg-slate-200">
                            <Image
                              src={event.image_url}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute top-4 left-4">
                              <span className={`${typeColors[event.event_type] || 'bg-slate-600'} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                                {event.event_type}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-orange-600 transition-colors mb-3 line-clamp-2">
                            {event.title}
                          </h3>

                          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                            {event.description}
                          </p>

                          {/* Meta */}
                          <div className="space-y-2 border-t border-slate-200 pt-4">
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(event.event_date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                              <Users className="w-4 h-4" />
                              <span>{event.registered_count} inscriptions</span>
                            </div>
                          </div>

                          <button className="w-full mt-4 bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition-colors">
                            S'inscrire
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Ad */}
              <AdSection format="leaderboard" />

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Événements passés</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {pastEvents.slice(0, 6).map((event) => (
                      <Link
                        key={event.id}
                        href={`/evenements/${event.id}`}
                        className="group bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-orange-300 transition-colors"
                      >
                        {event.image_url && (
                          <div className="relative h-32 overflow-hidden bg-slate-200">
                            <Image
                              src={event.image_url}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-75"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors line-clamp-2 text-sm">
                            {event.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-2">
                            {formatDate(event.event_date)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* No Events */}
              {filteredEvents.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">Aucun événement trouvé</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <section className="bg-slate-50 py-12">
          <div className="max-w-2xl mx-auto px-4">
            <NewsletterForm variant="compact" />
          </div>
        </section>

        {/* Ad Footer */}
        <AdSection format="billboard" className="py-8" />
      </main>
      <Footer />
    </>
  )
}
