import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600'],
  style: ['normal', 'italic'],
})

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = 'https://siddu-portfolio-omega.vercel.app'
const TITLE = 'Siddardha Bodavula — AI Automation Builder & Agentic AI Engineer'
const DESCRIPTION =
  'Siddardha Bodavula builds AI agents, automation pipelines and agentic systems that ship to production — open to AI Automation, AI Engineer and Agentic AI roles.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Siddardha Bodavula — AI Automation Builder & Agentic AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0806',
  width: 'device-width',
  initialScale: 1,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Siddardha Bodavula',
  alternateName: 'Bodavula Naga Venkata Siddardha',
  jobTitle: 'AI Automation Builder / Agentic AI Engineer',
  url: SITE_URL,
  sameAs: ['https://github.com/bodavulasiddardha-png'],
  knowsAbout: [
    'Embeddings & vector search',
    'RAG pipelines',
    'FastAPI',
    'LLM/Claude API integration',
    'Prompt & model evaluation',
    'n8n',
    'API/webhook integration',
    'GitHub Actions',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
