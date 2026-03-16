"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Search } from "lucide-react"

const navLinks = [
  { label: "Accueil", href: "/" },
  {
    label: "Actualites",
    href: "/actualites",
    children: [
      { label: "Actualites BTP", href: "/actualites" },
      { label: "Evenements & Salons", href: "/evenements" },
      { label: "Appels d'offres", href: "/actualites#appels-offres" },
    ],
  },
  { label: "Annuaire", href: "/annuaire" },
  { label: "Formations", href: "/formations" },
  { label: "Emplois", href: "/emplois" },
  { label: "A Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="w-full bg-[#603C2D] sticky top-0 z-50 shadow-lg">
      {/* Moroccan decorative top border */}
      <div className="h-1 w-full bg-[#FF9000]" />
      
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <p className="text-white/60 text-xs font-medium tracking-wide">
            1ere Plateforme Africaine du BTP
          </p>
          <div className="flex items-center gap-4">
            <Link href="/actualites" className="text-white/60 text-xs hover:text-[#FF9000] transition-colors">
              Newsletters
            </Link>
            <Link href="/contact" className="text-white/60 text-xs hover:text-[#FF9000] transition-colors">
              Publicite
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo-batimag-white.png"
              alt="BATIMAG"
              width={140}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-white/90 hover:text-[#FF9000] text-sm font-medium px-3 py-2 transition-colors">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-xl rounded-b-lg overflow-hidden z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#603C2D] hover:bg-[#FFF8F0] hover:text-[#FF9000] border-b border-[#E8D5C4] last:border-0 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/90 hover:text-[#FF9000] text-sm font-medium px-3 py-2 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white/80 hover:text-[#FF9000] p-2 transition-colors"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white shadow-xl rounded-lg z-50 overflow-hidden border border-[#E8D5C4]">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-[#603C2D]"
                    autoFocus
                  />
                  <div className="p-3 border-t border-[#E8D5C4] bg-[#FFF8F0]">
                    <p className="text-xs text-[#603C2D]/70 text-center">Recherchez articles, entreprises...</p>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/emplois"
              className="hidden md:inline-flex items-center bg-[#FF9000] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#E68200] transition-colors shadow-md"
            >
              Publier une offre
            </Link>

            <Link
              href="/annuaire"
              className="hidden lg:inline-flex items-center bg-white/10 text-white text-sm font-semibold px-4 py-2 border border-white/30 rounded hover:bg-white/20 transition-colors"
            >
              Referencer mon entreprise
            </Link>

            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#603C2D] border-t border-white/10 px-4 py-4">
          {/* Mobile Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#603C2D]/50" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2.5 rounded bg-white text-[#603C2D] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9000]"
              />
            </div>
          </div>
          
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-white/90 hover:text-[#FF9000] text-sm font-medium py-2.5 border-b border-white/10 last:border-0 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile CTAs */}
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/emplois"
              className="block text-center bg-[#FF9000] text-white text-sm font-semibold px-4 py-2.5 rounded hover:bg-[#E68200] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Publier une offre
            </Link>
            <Link
              href="/annuaire"
              className="block text-center bg-white/10 text-white text-sm font-semibold px-4 py-2.5 border border-white/30 rounded hover:bg-white/20 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Referencer mon entreprise
            </Link>
          </div>
        </div>
      )}
      
      {/* Moroccan decorative bottom border */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9000]/0 via-[#FF9000] to-[#FF9000]/0" />
    </header>
  )
}
