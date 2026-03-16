import Link from "next/link"
import { Facebook, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerSections = [
  {
    title: "BATIMAG",
    links: [
      { label: "À Propos", href: "/a-propos" },
      { label: "Notre Mission", href: "/a-propos#mission" },
      { label: "Notre Équipe", href: "/a-propos#equipe" },
      { label: "Publicité", href: "/contact" },
      { label: "Mentions légales", href: "/mentions-legales" },
    ],
  },
  {
    title: "Nos Services",
    links: [
      { label: "Actualités BTP", href: "/actualites" },
      { label: "Événements & Salons", href: "/evenements" },
      { label: "Annuaire Entreprises", href: "/annuaire" },
      { label: "Formations", href: "/formations" },
      { label: "Offres d'Emploi", href: "/emplois" },
    ],
  },
  {
    title: "Secteurs",
    links: [
      { label: "Bâtiment & Construction", href: "/actualites" },
      { label: "Infrastructures", href: "/actualites" },
      { label: "Génie Civil", href: "/actualites" },
      { label: "Matériaux de Construction", href: "/actualites" },
      { label: "Équipements BTP", href: "/actualites" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0E1F2F] text-white">
      {/* Newsletter band */}
      <div className="bg-[#F28C28]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-lg">Restez informé</p>
            <p className="text-white/90 text-sm">Recevez chaque semaine les actualités BTP en Afrique</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 md:w-72 px-4 py-2.5 text-sm text-foreground bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-[#0E1F2F] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#1a3044] transition-colors whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#F28C28] flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-white font-bold text-xl tracking-wider">BATIMAG</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              La plateforme média et business de référence pour le secteur de la construction, des infrastructures et de l'immobilier en Afrique.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#F28C28]" />
                <span>Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#F28C28]" />
                <span>+212 (0) 5 22 XX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#F28C28]" />
                <span>contact@batimag.africa</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-[#F28C28] transition-colors"
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

      {/* Digifly Digital Partner band */}
      <div className="border-t border-white/10 bg-[#0a1820]">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F28C28] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <p className="text-white/90 text-sm font-semibold">Partenaire Digital</p>
              <p className="text-white/50 text-xs">Site conçu et développé par Digifly Agency</p>
            </div>
          </div>
          <a
            href="http://digiflyagency.ma/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#F28C28] text-[#F28C28] text-sm font-semibold px-5 py-2 hover:bg-[#F28C28] hover:text-white transition-colors whitespace-nowrap"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Visiter Digifly Agency
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 BATIMAG – Tous droits réservés
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 bg-white/10 hover:bg-[#F28C28] flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
