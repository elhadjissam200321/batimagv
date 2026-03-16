"use client"

import { cn } from "@/lib/utils"

interface ZelligeBorderProps {
  className?: string
  variant?: "top" | "bottom" | "both"
}

export function ZelligeBorder({ className, variant = "both" }: ZelligeBorderProps) {
  return (
    <div className={cn("w-full", className)}>
      {(variant === "top" || variant === "both") && (
        <div className="h-3 w-full bg-repeat-x" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath fill='%23FF9000' d='M12 0L24 12H0L12 0z'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 12px'
        }} />
      )}
      {(variant === "bottom" || variant === "both") && (
        <div className="h-3 w-full bg-repeat-x" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath fill='%23FF9000' d='M12 12L0 0H24L12 12z'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 12px'
        }} />
      )}
    </div>
  )
}

interface ZelligeBackgroundProps {
  children: React.ReactNode
  className?: string
  pattern?: "diamond" | "star" | "geometric"
  opacity?: number
}

export function ZelligeBackground({ 
  children, 
  className, 
  pattern = "diamond",
  opacity = 0.08 
}: ZelligeBackgroundProps) {
  const patterns = {
    diamond: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23FF9000' fill-opacity='${opacity}'%3E%3Cpath d='M40 0L0 40L40 80L80 40L40 0zM40 10L70 40L40 70L10 40L40 10z'/%3E%3C/g%3E%3C/svg%3E")`,
    star: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23FF9000' fill-opacity='${opacity}'%3E%3Cpolygon points='30,0 37,22 60,22 42,36 49,58 30,44 11,58 18,36 0,22 23,22'/%3E%3C/g%3E%3C/svg%3E")`,
    geometric: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23FF9000' fill-opacity='${opacity}'%3E%3Cpath d='M50 0L100 50L50 100L0 50L50 0zM50 20L80 50L50 80L20 50L50 20z'/%3E%3Ccircle cx='50' cy='50' r='10'/%3E%3C/g%3E%3C/svg%3E")`
  }

  return (
    <div 
      className={cn("relative", className)}
      style={{ backgroundImage: patterns[pattern] }}
    >
      {children}
    </div>
  )
}

interface MoroccanArchProps {
  children: React.ReactNode
  className?: string
}

export function MoroccanArch({ children, className }: MoroccanArchProps) {
  return (
    <div className={cn(
      "relative overflow-hidden",
      "before:absolute before:top-0 before:left-0 before:right-0 before:h-1/3",
      "before:rounded-[50%_50%_0_0/100%_100%_0_0]",
      "before:border-4 before:border-[#FF9000] before:border-b-0",
      className
    )}>
      {children}
    </div>
  )
}

interface DecorativeDividerProps {
  className?: string
}

export function DecorativeDivider({ className }: DecorativeDividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-4", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FF9000]/30 to-[#FF9000]" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#FF9000]">
        <path d="M12 2L14.5 9.5H22L16 14L18.5 22L12 17L5.5 22L8 14L2 9.5H9.5L12 2Z" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#FF9000]/30 to-[#FF9000]" />
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
