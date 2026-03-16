import type { Metadata } from 'next'
import { DM_Sans, Libre_Baskerville } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'BATIMAG – La référence média & business de la construction en Afrique',
  description: 'BATIMAG est la plateforme média et business de référence pour le secteur de la construction, des infrastructures et de l\'immobilier en Afrique.',
  keywords: 'construction Afrique, BTP Afrique, infrastructure Afrique, immobilier Afrique, génie civil',
  openGraph: {
    title: 'BATIMAG – La référence BTP en Afrique',
    description: 'Plateforme média et business pour le secteur de la construction, des infrastructures et de l\'immobilier en Afrique.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${libreBaskerville.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
