const pedagogicalPartners = [
  "FNBTP", "STRABAG", "Bouygues", "Eiffage", "VINCI", "COVEC", "BCEOM",
]

const institutionalPartners = [
  "BAD", "ONUDI", "UEMOA", "CEDEAO", "Banque Mondiale",
]

export function Partners() {
  return (
    <section className="py-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-center text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-6">
            Partenaires Institutionnels
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {institutionalPartners.map((name) => (
              <div
                key={name}
                className="h-10 px-6 bg-secondary flex items-center justify-center text-muted-foreground font-bold text-sm hover:bg-[#603C2D] hover:text-white transition-colors cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-6">
            Entreprises Partenaires
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {pedagogicalPartners.map((name) => (
              <div
                key={name}
                className="h-10 px-6 bg-secondary flex items-center justify-center text-muted-foreground font-bold text-sm hover:bg-[#FF9000] hover:text-white transition-colors cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
