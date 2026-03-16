import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'BATIMAG - 1ere Plateforme Africaine du BTP',
  description: 'BATIMAG est la plateforme media et business de reference pour le secteur de la construction, des infrastructures et de l\'immobilier en Afrique.',
  keywords: 'construction Afrique, BTP Afrique, infrastructure Afrique, immobilier Afrique, genie civil, Maroc',
  openGraph: {
    title: 'BATIMAG - 1ere Plateforme Africaine du BTP',
    description: 'Plateforme media et business pour le secteur de la construction, des infrastructures et de l\'immobilier en Afrique.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
