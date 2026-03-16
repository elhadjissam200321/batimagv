"use client"

import { cn } from "@/lib/utils"

interface ZelligeBorderProps {
  className?: string
  variant?: "top" | "bottom" | "both"
  size?: "small" | "medium" | "large"
}

export function ZelligeBorder({ className, variant = "both", size = "medium" }: ZelligeBorderProps) {
  const heights = {
    small: "h-1",
    medium: "h-2",
    large: "h-3"
  }

  return (
    <div className={cn("w-full", className)}>
      {(variant === "top" || variant === "both") && (
        <div className={cn(heights[size], "w-full bg-[#FF9000]")} />
      )}
      {(variant === "bottom" || variant === "both") && (
        <div className={cn(heights[size], "w-full bg-[#FF9000]")} />
      )}
    </div>
  )
}

interface ZelligeBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: "light" | "dark" | "neutral"
}

/**
 * Subtle Moroccan zellige pattern background (3-5% opacity)
 * Use for hero sections, footer, and section separators
 */
export function ZelligeBackground({ 
  children, 
  className, 
  variant = "light"
}: ZelligeBackgroundProps) {
  const patternClass = {
    light: "zellige-pattern-light",
    dark: "zellige-pattern-dark",
    neutral: "zellige-pattern"
  }

  return (
    <div className={cn("relative", patternClass[variant], className)}>
      {children}
    </div>
  )
}

interface SectionSeparatorProps {
  className?: string
  withPattern?: boolean
}

/**
 * Professional section separator with optional subtle zellige pattern
 */
export function SectionSeparator({ className, withPattern = false }: SectionSeparatorProps) {
  return (
    <div className={cn("relative py-8", withPattern && "zellige-pattern", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-separator" />
      </div>
    </div>
  )
}

interface DecorativeDividerProps {
  className?: string
}

export function DecorativeDivider({ className }: DecorativeDividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-4", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E6DED6] to-[#E6DED6]" />
      <div className="w-2 h-2 bg-[#FF9000] rotate-45" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#E6DED6] to-[#E6DED6]" />
    </div>
  )
}

export function MoroccanStar({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={cn("text-[#FF9000]", className)}
    >
      <path 
        d="M12 0L14.47 8.26L23.41 9.27L16.71 14.74L18.82 23.41L12 18.9L5.18 23.41L7.29 14.74L0.59 9.27L9.53 8.26L12 0Z" 
        fill="currentColor" 
      />
    </svg>
  )
}

/**
 * Subtle inline zellige pattern SVG for backgrounds
 * Returns an SVG data URI with very low opacity (3-5%)
 */
export function getZelligePatternSVG(color: string = "#603C2D", opacity: number = 0.035): string {
  const encodedColor = encodeURIComponent(color)
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='${encodedColor}' fill-opacity='${opacity}'%3E%3Cpath d='M60 0L120 60L60 120L0 60L60 0zM60 15L105 60L60 105L15 60L60 15z'/%3E%3Cpath d='M60 30L90 60L60 90L30 60L60 30zM60 40L80 60L60 80L40 60L60 40z'/%3E%3C/g%3E%3C/svg%3E")`
}
