import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = "https://asr-work.netlify.app/" // 🔁 Replace with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Aman Rawat | ML Engineer & Full Stack Developer',
    template: '%s | Aman Rawat',
  },
  description: 'Portfolio of Aman Rawat — Machine Learning Engineer, Full Stack Developer, and Open Source Contributor. Building intelligent systems at the intersection of AI and software engineering.',
  keywords: [
    'Aman Rawat',
    'ML Engineer',
    'Machine Learning',
    'Full Stack Developer',
    'Next.js',
    'Python',
    'React',
    'Deep Learning',
    'Open Source',
    'Software Engineer',
    'AI Engineer',
    'Portfolio',
  ],
  authors: [{ name: 'Aman Rawat', url: siteUrl }],
  creator: 'Aman Rawat',

  // Open Graph — controls how your link looks on LinkedIn, WhatsApp, Slack, etc.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Aman Rawat',
    title: 'Aman Rawat | ML Engineer & Full Stack Developer',
    description: 'Machine Learning Engineer & Full Stack Developer building intelligent systems at the intersection of AI and software engineering.',
    images: [
      {
        url: '/og-image.png', // 🔁 Add a 1200×630 image to /public/og-image.png
        width: 1200,
        height: 630,
        alt: 'Aman Rawat — ML Engineer & Full Stack Developer',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Rawat | ML Engineer & Full Stack Developer',
    description: 'Machine Learning Engineer & Full Stack Developer building intelligent systems at the intersection of AI and software engineering.',
    creator: '@amanrawat', // 🔁 Replace with your actual handle
    images: ['/og-image.png'],
  },

  // Canonical + robots
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}