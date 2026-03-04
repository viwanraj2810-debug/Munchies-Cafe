import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'
import { restaurantInfo } from '@/lib/data'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Munchies Cafe — Fine Dining',
  description:
    'Experience the finest North Indian & Mughlai cuisine at Munchies Cafe. Crafted with care, served with love. Fine dining in the heart of New Patna.',
  keywords: [
    'Munchies Cafe',
    'fine dining',
    'Indian restaurant',
    'North Indian cuisine',
    'Mughlai',
    'New Patna',
  ],
  icons: {
    icon: '/images/logo/logo ICON.png',
    apple: '/images/logo/logo ICON.png',
  },
  openGraph: {
    title: 'Munchies Cafe — Fine Dining',
    description:
      'Where every plate tells a story. Fine dining in New Patna.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e0e0e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-bg-primary text-brand-primary font-body antialiased pb-[72px]">
        <Header />
        {children}
        <StickyBar info={restaurantInfo} />
        <Footer />
      </body>
    </html>
  )
}
