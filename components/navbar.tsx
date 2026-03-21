"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { label: "Accueil", href: "/" },
  {
    label: "Actualités & Événements",
    href: "/actualites",
    children: [
      { label: "Actualités BTP", href: "/actualites" },
      { label: "Événements & Salons", href: "/evenements" },
    ],
  },
  { label: "Annuaire Entreprises", href: "/annuaire" },
  { label: "Offres Immobilières", href: "/offres-immobilieres" },
  { label: "Formations", href: "/formations" },
  { label: "Offres d'Emploi", href: "/emplois" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="w-full bg-[#603C2D] sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <p className="text-white/50 text-xs">
            La référence média &amp; business de la construction en Afrique
          </p>
          <div className="flex items-center gap-4">
            <Link href="/actualites" className="text-white/50 text-xs hover:text-[#FF9000] transition-colors">
              Newsletters
            </Link>
            <Link href="/contact" className="text-white/50 text-xs hover:text-[#FF9000] transition-colors">
              Publicité
            </Link>
            <a
              href="http://digiflyagency.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#FF9000]/20 border border-[#FF9000]/40 text-[#FF9000] text-xs font-semibold px-2.5 py-0.5 hover:bg-[#FF9000] hover:text-white transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Services Digitaux
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#FF9000] flex items-center justify-center">
                <span className="text-white font-bold text-sm leading-none">B</span>
              </div>
              <span className="text-white font-bold text-xl tracking-wider">BATIMAG</span>
            </div>
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
                  <button                   className="flex items-center gap-1 text-white/80 hover:text-[#FF9000] text-sm font-medium px-3 py-2 transition-colors">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-xl border border-border z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-[#FF9000] border-b border-border last:border-0 transition-colors"
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
                  className="text-white/80 hover:text-[#FF9000] text-sm font-medium px-3 py-2 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/emplois"
              className="hidden md:inline-flex items-center bg-[#FF9000] text-white text-sm font-semibold px-4 py-2 hover:bg-orange-600 transition-colors"
            >
              Offres d'emploi
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
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-white/80 hover:text-[#FF9000] text-sm font-medium py-2.5 border-b border-white/10 last:border-0 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
