import { CheckCircle2 } from "lucide-react"

const reasons = [
  "Couverture exclusive de 45 pays africains",
  "Réseau de +2 500 entreprises BTP référencées",
  "Journalistes spécialisés dans le secteur de la construction",
  "Base de données exhaustive des appels d'offres publics",
  "Partenariats avec les fédérations professionnelles du BTP",
  "Veille réglementaire et normative en temps réel",
  "Événements et salons professionnels organisés annuellement",
  "Plateforme de mise en relation B2B certifiée",
]

export function WhyBatimag() {
  return (
    <section className="py-14 bg-[#0E1F2F]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: heading */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-8 bg-[#F28C28] inline-block" />
              <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
                Pourquoi choisir BATIMAG ?
              </h2>
            </div>
            <p className="text-white/60 text-base leading-relaxed mb-8 pl-4">
              BATIMAG s'impose comme la plateforme incontournable pour tous les acteurs de la construction, des infrastructures et de l'immobilier sur le continent africain.
            </p>
            <div className="pl-4">
              <p className="text-white/50 text-sm mb-2">Nos partenaires institutionnels</p>
              <div className="flex flex-wrap gap-3">
                {["FNBTP", "BAD", "ONUDI", "UEMOA", "CCI Afrique"].map((partner) => (
                  <span
                    key={partner}
                    className="border border-white/20 text-white/60 text-xs font-semibold px-3 py-1.5 hover:border-[#F28C28] hover:text-[#F28C28] transition-colors cursor-default"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: reasons list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
