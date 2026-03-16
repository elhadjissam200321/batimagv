import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ZelligeBorder } from "@/components/moroccan-patterns"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
  className?: string
  centered?: boolean
  showPattern?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "Voir tout",
  className,
  centered = false,
  showPattern = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 mb-8 relative",
        centered && "flex-col items-center text-center",
        className
      )}
    >
      {/* Decorative zellige */}
      {showPattern && (
        <div className="absolute -left-8 -top-8 w-24 h-24 opacity-5 pointer-events-none">
          <ZelligeBorder size="medium" className="w-full h-full" />
        </div>
      )}

      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-8 bg-gradient-to-b from-moroccan-accent to-moroccan-accent/50 inline-block rounded" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance font-serif">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl pl-4">
            {subtitle}
          </p>
        )}
      </div>
      {href && !centered && (
        <Link
          href={href}
          className="flex items-center gap-1.5 text-sm font-semibold text-moroccan-accent hover:text-orange-700 transition-colors whitespace-nowrap shrink-0"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
