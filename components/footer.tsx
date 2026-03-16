import Link from "next/link"
import { Facebook, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerSections = [
  {
    title: "BATIMAG",
    links: [
      { label: "A Propos", href: "/a-propos" },
      { label: "Notre Mission", href: "/a-propos#mission" },
      { label: "Notre Equipe", href: "/a-propos#equipe" },
      { label: "Publicite", href: "/contact" },
      { label: "Mentions legales", href: "/mentions-legales" },
    ],
  },
  {
    title: "Nos Services",
    links: [
      { label: "Actualites BTP", href: "/actualites" },
      { label: "Evenements & Salons", href: "/evenements" },
      { label: "Annuaire Entreprises", href: "/annuaire" },
      { label: "Formations", href: "/formations" },
      { label: "Offres d'Emploi", href: "/emplois" },
    ],
  },
  {
    title: "Secteurs",
    links: [
      { label: "Batiment & Construction", href: "/actualites" },
      { label: "Infrastructures", href: "/actualites" },
      { label: "Genie Civil", href: "/actualites" },
      { label: "Materiaux de Construction", href: "/actualites" },
      { label: "Equipements BTP", href: "/actualites" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#603C2D] text-white relative">
      
      {/* Moroccan decorative top border */}
      <div className="h-2 w-full bg-[#FF9000]" />
      <div className="h-1 w-full bg-[#D4A574]" />
      
      {/* Newsletter band */}
      <div className="bg-[#FF9000] relative">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif font-bold text-white text-xl">Restez informe</p>
            <p className="text-white/90 text-sm mt-1">Recevez chaque semaine les actualites BTP en Afrique</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 md:w-80 px-4 py-3 text-sm text-[#603C2D] bg-white rounded-l focus:outline-none focus:ring-2 focus:ring-[#603C2D]"
            />
            <button
              type="submit"
              className="bg-[#603C2D] text-white px-6 py-3 text-sm font-semibold rounded-r hover:bg-[#7A4E3D] transition-colors whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="mb-4">
              <span className="font-serif font-bold text-3xl text-white tracking-tight">
                BATI<span className="text-[#FF9000]">MAG</span>
              </span>
              <p className="text-white/50 text-xs mt-0.5 tracking-widest uppercase">1ere Plateforme Africaine du BTP</p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              La plateforme media et business de reference pour le secteur de la construction, des infrastructures et de l'immobilier en Afrique.
            </p>
            <div className="space-y-2.5 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#FF9000]" />
                <span>Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#FF9000]" />
                <span>+212 (0) 5 22 XX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#FF9000]" />
                <span>contact@batimag.africa</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#FF9000]/30 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF9000] rotate-45" />
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 text-sm hover:text-[#FF9000] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            2026 BATIMAG - Tous droits reserves
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Facebook, label: "Facebook", href: "#" },
              { icon: Twitter, label: "Twitter", href: "#" },
              { icon: Youtube, label: "YouTube", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 bg-white/10 hover:bg-[#FF9000] rounded flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Moroccan decorative bottom pattern */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9000] via-[#D4A574] to-[#FF9000]" />
    </footer>
  )
}
