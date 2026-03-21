import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "Voir tout",
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 mb-8",
        centered && "flex-col items-center text-center",
        className
      )}
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1 h-6 bg-[#FF9000] inline-block" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">{title}</h2>
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
          className="flex items-center gap-1.5 text-sm font-semibold text-[#FF9000] hover:text-orange-700 transition-colors whitespace-nowrap shrink-0"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
