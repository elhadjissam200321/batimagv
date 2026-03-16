'use client'

import React from 'react'

type AdFormat = 'leaderboard' | 'rectangle' | 'billboard'

interface AdSlotProps {
  format: AdFormat
  className?: string
}

const formatDimensions: Record<AdFormat, { width: string; height: string }> = {
  leaderboard: { width: '728px', height: '90px' },
  rectangle: { width: '300px', height: '250px' },
  billboard: { width: '970px', height: '250px' },
}

const formatClasses: Record<AdFormat, string> = {
  leaderboard: 'w-[728px] h-[90px] mx-auto',
  rectangle: 'w-[300px] h-[250px]',
  billboard: 'w-[970px] h-[250px] mx-auto',
}

export default function AdSlot({ format = 'rectangle', className = '' }: AdSlotProps) {
  const dimensions = formatDimensions[format]

  return (
    <div
      className={`${formatClasses[format]} ${className} flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300 rounded-lg overflow-hidden relative group`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {/* Placeholder Ad Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 group-hover:bg-opacity-100 transition-all duration-300">
        <div className="text-center px-4">
          <p className="text-sm font-semibold text-slate-600">Espace publicitaire</p>
          <p className="text-xs text-slate-500 mt-1">
            {dimensions.width} × {dimensions.height}
          </p>
        </div>
      </div>

      {/* Decorative Background Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={`pattern-${format}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#pattern-${format})`} />
      </svg>
    </div>
  )
}

export function AdSection({
  format = 'leaderboard',
  label = 'Publicité',
  className = '',
}: {
  format?: AdFormat
  label?: string
  className?: string
}) {
  return (
    <section className={`py-8 ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
      <AdSlot format={format} />
    </section>
  )
}
