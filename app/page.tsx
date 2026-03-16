"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search, ArrowRight, Newspaper, Building2, GraduationCap,
  Briefcase, CheckCircle2, Quote, Clock, MapPin, ChevronRight,
  Menu, X
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// ─── Shared data ─────────────────────────────────────────────────────────────

const stats = [
  { value: "2 500+", label: "Entreprises" },
  { value: "45", label: "Pays couverts" },
  { value: "800+", label: "Offres d'emploi" },
  { value: "150+", label: "Formations" },
]

const pillars = [
  { icon: Newspaper, title: "Actualités", desc: "Toute l'info BTP en Afrique : projets, marchés, politiques publiques.", href: "/actualites", cta: "Voir les actualités" },
  { icon: Building2, title: "Annuaire", desc: "Constructeurs, bureaux d'études, fournisseurs référencés.", href: "/annuaire", cta: "Parcourir l'annuaire" },
  { icon: GraduationCap, title: "Formations", desc: "Formations professionnelles en génie civil et management.", href: "/formations", cta: "Explorer" },
  { icon: Briefcase, title: "Emploi", desc: "Les meilleures offres d'emploi du secteur BTP africain.", href: "/emplois", cta: "Voir les offres" },
]

const articles = [
  { id: 1, cat: "Infrastructures", title: "Le Maroc lance un plan national d'autoroutes 2026-2032", date: "12 mars 2026", read: "4 min", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" },
  { id: 2, cat: "Bâtiment", title: "Côte d'Ivoire : 50 000 logements sociaux financés par la BAD", date: "10 mars 2026", read: "3 min", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
  { id: 3, cat: "Énergie", title: "Solaire et BTP : les synergies incontournables en Afrique subsaharienne", date: "8 mars 2026", read: "5 min", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" },
  { id: 4, cat: "Génie Civil", title: "Pont de Rosso : le chantier transfrontalier Sénégal-Mauritanie avance", date: "5 mars 2026", read: "4 min", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
]

const jobs = [
  { title: "Ingénieur Structures Senior", company: "VINCI Construction Maroc", loc: "Casablanca", contract: "CDI", posted: "Il y a 2 jours" },
  { title: "Conducteur de Travaux", company: "Eiffage Sénégal", loc: "Dakar", contract: "CDI", posted: "Il y a 3 jours" },
  { title: "Architecte Projet BIM", company: "Bureau ARUP Abidjan", loc: "Abidjan", contract: "CDD", posted: "Il y a 1 jour" },
  { title: "Chef de Projet Infrastructure", company: "STRABAG Afrique", loc: "Rabat", contract: "CDI", posted: "Il y a 4 jours" },
  { title: "Technicien Topographe", company: "BCEOM Cameroun", loc: "Yaoundé", contract: "Stage", posted: "Il y a 5 jours" },
  { title: "Directeur Travaux", company: "Bouygues Maroc", loc: "Tanger", contract: "CDI", posted: "Il y a 1 jour" },
]

const reasons = [
  "Couverture exclusive de 45 pays africains",
  "Réseau de +2 500 entreprises BTP référencées",
  "Journalistes spécialisés dans la construction",
  "Base de données des appels d'offres publics",
  "Partenariats avec les fédérations professionnelles",
  "Veille réglementaire en temps réel",
  "Événements et salons organisés annuellement",
  "Plateforme de mise en relation B2B certifiée",
]

const contractColors: Record<string, string> = {
  CDI: "bg-green-100 text-green-800",
  CDD: "bg-blue-100 text-blue-800",
  Stage: "bg-purple-100 text-purple-800",
}

// ─── Zellige SVG Pattern (inline, works reliably) ───────────────────────────

function ZelligePattern({ opacity = 0.06, color = "#FF9000" }: { opacity?: number; color?: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`zellige-${color.replace("#","")}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill={color} fillOpacity={opacity}>
            <polygon points="30,0 37,22 60,22 42,36 49,58 30,44 11,58 18,36 0,22 23,22" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#zellige-${color.replace("#","")})`} />
    </svg>
  )
}

function DiamondBorder({ color = "#FF9000" }: { color?: string }) {
  return (
    <div className="flex overflow-hidden h-5">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-5 h-5 rotate-45 border"
          style={{ borderColor: color, backgroundColor: "transparent", transform: "rotate(45deg) scale(0.7)", margin: "0 1px" }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERSION 1 — Magazine Editorial (Dark Brown + Orange accents)
// ═══════════════════════════════════════════════════════════════════════════════

function HomeV1() {
  return (
    <div className="bg-[#1a0f0a]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden" style={{ backgroundColor: "#603C2D" }}>
        <ZelligePattern opacity={0.08} color="#FF9000" />
        {/* Zellige border top */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF9000]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#FF9000]/60 px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#FF9000] animate-pulse" />
                <span className="text-[#FF9000] text-xs font-bold tracking-[0.2em] uppercase">Plateforme BTP Africaine</span>
              </div>
              <h1 className="font-serif text-7xl lg:text-8xl font-bold text-white leading-none mb-6">
                BATI<span className="text-[#FF9000]">MAG</span>
              </h1>
              <p className="text-white/60 text-xl font-serif italic mb-3">1ère Plateforme Africaine du BTP</p>
              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
                Actualités, annuaire d'entreprises, formations et offres d'emploi pour les professionnels de la construction en Afrique.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/actualites" className="inline-flex items-center gap-2 bg-[#FF9000] text-white font-bold px-7 py-3.5 hover:bg-orange-500 transition-colors">
                  Explorer les actualités <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/annuaire" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 hover:border-[#FF9000] hover:text-[#FF9000] transition-colors">
                  Annuaire entreprises
                </Link>
              </div>
            </div>
            {/* Stats column */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="border border-[#FF9000]/20 p-6 bg-white/5 backdrop-blur">
                  <p className="text-4xl font-bold text-[#FF9000] font-serif">{s.value}</p>
                  <p className="text-white/50 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diamond border bottom */}
        <div className="relative z-10 mb-0">
          <DiamondBorder color="#FF9000" />
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="bg-[#1a0f0a]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#FF9000]/10">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <Link key={p.title} href={p.href} className="group bg-[#1a0f0a] p-8 flex flex-col gap-4 hover:bg-[#603C2D]/30 transition-colors">
                  <div className="w-11 h-11 bg-[#FF9000]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-[#FF9000] text-sm font-semibold group-hover:gap-3 transition-all">
                    {p.cta} <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Actualites ── */}
      <section className="bg-[#120a07] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="w-1 h-8 bg-[#FF9000]" />
              <h2 className="text-white font-serif text-3xl font-bold">Actualités à la Une</h2>
            </div>
            <Link href="/actualites" className="text-[#FF9000] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Toutes les actualités <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Featured */}
            <Link href="/actualites" className="group lg:col-span-2 relative overflow-hidden block">
              <div className="relative h-72 lg:h-96 overflow-hidden">
                <img src={articles[0].img} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-[#1a0f0a]/30 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#FF9000] text-white text-xs font-bold px-3 py-1 uppercase">{articles[0].cat}</span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-serif text-xl font-bold mb-2 group-hover:text-[#FF9000] transition-colors">{articles[0].title}</h3>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Clock className="w-3 h-3" />{articles[0].read}
                    <span>·</span>{articles[0].date}
                  </div>
                </div>
              </div>
            </Link>
            {/* Side articles */}
            <div className="flex flex-col gap-4">
              {articles.slice(1).map((a) => (
                <Link key={a.id} href="/actualites" className="group flex gap-3 items-start">
                  <div className="relative w-20 h-16 shrink-0 overflow-hidden">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="text-[#FF9000] text-xs font-bold uppercase">{a.cat}</span>
                    <h4 className="text-white/80 text-sm font-semibold group-hover:text-[#FF9000] transition-colors line-clamp-2">{a.title}</h4>
                    <p className="text-white/30 text-xs mt-1">{a.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Jobs ── */}
      <section className="py-16 bg-[#1a0f0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="w-1 h-8 bg-[#FF9000]" />
              <h2 className="text-white font-serif text-3xl font-bold">Offres d'Emploi</h2>
            </div>
            <Link href="/emplois" className="text-[#FF9000] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Toutes les offres <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {jobs.map((j, i) => (
              <Link key={i} href="/emplois" className="group border border-white/5 p-5 bg-[#120a07] hover:border-[#FF9000]/40 hover:bg-[#603C2D]/10 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 bg-[#FF9000]/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-[#FF9000]" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 ${contractColors[j.contract] ?? "bg-gray-100 text-gray-700"}`}>{j.contract}</span>
                </div>
                <h4 className="text-white font-semibold text-sm group-hover:text-[#FF9000] transition-colors mb-1">{j.title}</h4>
                <p className="text-[#FF9000] text-xs font-semibold mb-3">{j.company}</p>
                <div className="flex items-center gap-1 text-white/30 text-xs">
                  <MapPin className="w-3 h-3" /> {j.loc} · {j.posted}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Batimag ── */}
      <section className="py-16 bg-[#603C2D] relative overflow-hidden">
        <ZelligePattern opacity={0.06} color="#FF9000" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-8 bg-[#FF9000]" />
                <h2 className="text-white font-serif text-3xl font-bold">Pourquoi BATIMAG ?</h2>
              </div>
              <p className="text-white/60 leading-relaxed mb-6">La plateforme incontournable pour tous les acteurs de la construction et des infrastructures sur le continent africain.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reasons.map((r) => (
                <div key={r} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF9000] shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERSION 2 — Bright Orange Portal (clean, high-energy)
// ═══════════════════════════════════════════════════════════════════════════════

function HomeV2() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FF9000" }}>
        <ZelligePattern opacity={0.12} color="#603C2D" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-[#603C2D] text-white text-xs font-bold px-4 py-2 mb-8 tracking-widest uppercase">
                1ère Plateforme Africaine du BTP
              </div>
              <h1 className="font-serif text-6xl lg:text-8xl font-bold text-white leading-none mb-4">
                BATIMAG
              </h1>
              <div className="w-24 h-1 bg-[#603C2D] mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                La référence média et business du secteur de la construction, des infrastructures et de l'immobilier en Afrique.
              </p>
              {/* Search */}
              <div className="flex max-w-lg shadow-2xl">
                <input type="text" placeholder="Rechercher entreprise, actualité, formation..." className="flex-1 px-5 py-4 text-sm text-gray-800 focus:outline-none border-0" />
                <button className="bg-[#603C2D] text-white px-6 flex items-center gap-2 font-semibold hover:bg-[#4a2d21] transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur border border-white/20 p-5 flex items-center gap-4">
                  <p className="text-4xl font-bold text-white font-serif min-w-[80px]">{s.value}</p>
                  <p className="text-white/80 text-sm font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Wave / arch cutout */}
        <div className="relative z-10 h-8 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
      </section>

      {/* ── Pillars ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[#603C2D] mb-3">Notre Plateforme</h2>
            <div className="w-16 h-1 bg-[#FF9000] mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <Link key={p.title} href={p.href} className="group border-t-4 border-[#FF9000] p-6 bg-gray-50 hover:bg-[#FF9000] hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-[#FF9000] group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-white group-hover:text-[#FF9000] transition-colors" />
                  </div>
                  <h3 className="text-[#603C2D] group-hover:text-white font-bold text-lg mb-2 transition-colors">{p.title}</h3>
                  <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed mb-4 transition-colors">{p.desc}</p>
                  <span className="text-[#FF9000] group-hover:text-white text-sm font-semibold flex items-center gap-1 transition-colors">
                    {p.cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-4xl font-bold text-[#603C2D]">Actualités à la Une</h2>
              <div className="w-12 h-1 bg-[#FF9000] mt-2" />
            </div>
            <Link href="/actualites" className="hidden md:inline-flex items-center gap-2 border-2 border-[#FF9000] text-[#FF9000] font-bold px-5 py-2.5 hover:bg-[#FF9000] hover:text-white transition-colors">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {articles.map((a, i) => (
              <Link key={a.id} href="/actualites" className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-44 overflow-hidden">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#FF9000] text-white text-xs font-bold px-2 py-0.5 uppercase">{a.cat}</span>
                </div>
                <div className="p-4">
                  <h4 className="text-[#603C2D] font-bold text-sm leading-snug group-hover:text-[#FF9000] transition-colors line-clamp-2 mb-2">{a.title}</h4>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock className="w-3 h-3" /> {a.read} · {a.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jobs ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-4xl font-bold text-[#603C2D]">Offres d'Emploi</h2>
              <div className="w-12 h-1 bg-[#FF9000] mt-2" />
            </div>
            <Link href="/emplois" className="hidden md:inline-flex items-center gap-2 border-2 border-[#FF9000] text-[#FF9000] font-bold px-5 py-2.5 hover:bg-[#FF9000] hover:text-white transition-colors">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((j, i) => (
              <Link key={i} href="/emplois" className="group flex gap-4 items-start p-5 border border-gray-200 hover:border-[#FF9000] hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-[#FF9000]/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-[#FF9000]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[#603C2D] font-bold text-sm group-hover:text-[#FF9000] transition-colors line-clamp-1">{j.title}</h4>
                  <p className="text-[#FF9000] text-xs font-semibold mt-0.5">{j.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{j.loc}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 ${contractColors[j.contract] ?? "bg-gray-100 text-gray-700"}`}>{j.contract}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Batimag ── */}
      <section className="py-16 bg-[#603C2D] relative overflow-hidden">
        <ZelligePattern opacity={0.08} color="#FF9000" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-3">Pourquoi BATIMAG ?</h2>
          <div className="w-16 h-1 bg-[#FF9000] mx-auto mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.slice(0, 4).map((r) => (
              <div key={r} className="bg-white/5 border border-white/10 p-5 flex flex-col items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#FF9000]" />
                <p className="text-white/80 text-sm text-center leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/a-propos" className="bg-[#FF9000] text-white font-bold px-8 py-3.5 hover:bg-orange-500 transition-colors">
              En savoir plus
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-bold px-8 py-3.5 hover:bg-white/10 transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERSION 3 — Bento Grid Editorial (cream background, structured grid)
// ═══════════════════════════════════════════════════════════════════════════════

function HomeV3() {
  return (
    <div style={{ backgroundColor: "#FDF6EE" }}>
      <Navbar />

      {/* ── Hero (asymmetric split) ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[70vh]">
          {/* Left pane: content */}
          <div className="lg:col-span-2 flex flex-col justify-between bg-[#603C2D] p-10 relative overflow-hidden">
            <ZelligePattern opacity={0.1} color="#FF9000" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <span className="text-[#FF9000] text-xs font-bold tracking-[0.3em] uppercase">Plateforme BTP Africaine</span>
              </div>
              <h1 className="font-serif text-[5rem] lg:text-[7rem] font-bold text-white leading-none">
                BATI
                <br />
                <span className="text-[#FF9000]">MAG</span>
              </h1>
            </div>
            <div className="relative z-10">
              <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
                La référence africaine pour tous les acteurs de la construction, des infrastructures et de l'immobilier.
              </p>
              <div className="flex gap-3">
                <Link href="/actualites" className="bg-[#FF9000] text-white font-bold px-6 py-3 inline-flex items-center gap-2 hover:bg-orange-500 transition-colors">
                  Actualités <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/emplois" className="border border-white/30 text-white font-semibold px-6 py-3 hover:border-[#FF9000] hover:text-[#FF9000] transition-colors">
                  Emplois
                </Link>
              </div>
            </div>
          </div>

          {/* Right pane: stats bento */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`p-6 flex flex-col justify-end ${i % 2 === 0 ? "bg-[#FF9000]" : "bg-white border border-[#E8D5C4]"}`}>
                <p className={`text-4xl font-bold font-serif ${i % 2 === 0 ? "text-white" : "text-[#FF9000]"}`}>{s.value}</p>
                <p className={`text-sm mt-1 ${i % 2 === 0 ? "text-white/80" : "text-[#603C2D]/60"}`}>{s.label}</p>
              </div>
            ))}
            <div className="col-span-2 bg-[#603C2D]/10 border border-[#603C2D]/20 p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-[#603C2D] text-xs font-bold tracking-widest uppercase mb-1">Recherche rapide</p>
                <input placeholder="Entreprise, actualité..." className="bg-transparent text-sm text-[#603C2D] placeholder:text-[#603C2D]/40 focus:outline-none w-full" />
              </div>
              <button className="bg-[#FF9000] p-2">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars bento ── */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <Link key={p.title} href={p.href} className="group bg-white border border-[#E8D5C4] p-6 hover:border-[#FF9000] hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-[#FF9000] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#603C2D] font-bold mb-1">{p.title}</h3>
                <p className="text-[#603C2D]/50 text-xs leading-relaxed">{p.desc}</p>
                <div className="mt-4 text-[#FF9000] text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {p.cta} <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── News Bento ── */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-1 h-7 bg-[#FF9000]" />
          <h2 className="font-serif text-3xl font-bold text-[#603C2D]">Actualités</h2>
          <Link href="/actualites" className="ml-auto text-[#FF9000] text-sm font-semibold flex items-center gap-1">
            Tout voir <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Large featured */}
          <Link href="/actualites" className="group lg:col-span-3 relative overflow-hidden block h-72 lg:h-auto">
            <img src={articles[0].img} alt={articles[0].title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#603C2D]/90 via-[#603C2D]/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-[#FF9000] text-white text-xs font-bold px-3 py-1">{articles[0].cat}</span>
            </div>
            <div className="absolute bottom-0 p-6">
              <h3 className="text-white font-serif text-xl font-bold group-hover:text-[#FF9000] transition-colors">{articles[0].title}</h3>
              <p className="text-white/50 text-xs mt-2">{articles[0].date}</p>
            </div>
          </Link>
          {/* Small grid */}
          <div className="lg:col-span-2 grid grid-rows-3 gap-4">
            {articles.slice(1).map((a) => (
              <Link key={a.id} href="/actualites" className="group flex gap-3 bg-white border border-[#E8D5C4] p-4 hover:border-[#FF9000] transition-colors">
                <img src={a.img} alt={a.title} className="w-16 h-14 object-cover shrink-0" />
                <div>
                  <span className="text-[#FF9000] text-xs font-bold uppercase">{a.cat}</span>
                  <h4 className="text-[#603C2D] text-xs font-bold leading-snug group-hover:text-[#FF9000] transition-colors line-clamp-2">{a.title}</h4>
                  <p className="text-[#603C2D]/40 text-xs mt-1">{a.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jobs List ── */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-1 h-7 bg-[#FF9000]" />
          <h2 className="font-serif text-3xl font-bold text-[#603C2D]">Offres d'Emploi</h2>
          <Link href="/emplois" className="ml-auto text-[#FF9000] text-sm font-semibold flex items-center gap-1">
            Tout voir <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobs.map((j, i) => (
            <Link key={i} href="/emplois" className="group flex items-center gap-4 bg-white border border-[#E8D5C4] px-5 py-4 hover:border-[#FF9000] hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-[#FF9000]/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-[#FF9000]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[#603C2D] font-bold text-sm group-hover:text-[#FF9000] transition-colors truncate">{j.title}</h4>
                <p className="text-[#603C2D]/50 text-xs">{j.company} · {j.loc}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 shrink-0 ${contractColors[j.contract] ?? "bg-gray-100 text-gray-700"}`}>{j.contract}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-[#603C2D] p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <ZelligePattern opacity={0.08} color="#FF9000" />
          <div className="relative z-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Rejoignez l'écosystème BATIMAG</h3>
            <p className="text-white/60 text-sm">Référencez votre entreprise et touchez des milliers de professionnels africains.</p>
          </div>
          <div className="flex gap-3 relative z-10 shrink-0">
            <Link href="/annuaire" className="bg-[#FF9000] text-white font-bold px-6 py-3 hover:bg-orange-500 transition-colors">
              Référencer mon entreprise
            </Link>
            <Link href="/emplois" className="border border-white/30 text-white font-semibold px-6 py-3 hover:border-[#FF9000] hover:text-[#FF9000] transition-colors">
              Publier une offre
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SWITCHER — lets user choose the layout version
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const [version, setVersion] = useState<1 | 2 | 3>(1)

  const labels: Record<1 | 2 | 3, string> = {
    1: "V1 — Magazine Sombre",
    2: "V2 — Portail Orange",
    3: "V3 — Bento Editorial",
  }

  return (
    <>
      {/* Version switcher bar (dev tool) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 bg-[#1a0f0a] border border-[#FF9000]/40 px-4 py-2 shadow-2xl">
        <span className="text-[#FF9000] text-xs font-bold uppercase tracking-widest mr-2">Version :</span>
        {([1, 2, 3] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVersion(v)}
            className={`px-4 py-1.5 text-xs font-bold transition-all ${
              version === v
                ? "bg-[#FF9000] text-white"
                : "text-[#FF9000] hover:bg-[#FF9000]/10"
            }`}
          >
            {labels[v]}
          </button>
        ))}
      </div>

      {version === 1 && <HomeV1 />}
      {version === 2 && <HomeV2 />}
      {version === 3 && <HomeV3 />}
    </>
  )
}
