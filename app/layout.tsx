import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = 'https://siddu-portfolio-omega.vercel.app'
const TITLE = 'Siddardha Bodavula — AI Builder & AI Associate'
const DESCRIPTION =
  'Siddardha Bodavula builds AI-powered websites, automation workflows, and agents for clients — and brings the same systems thinking to data & AI roles.'

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
        alt: 'Siddardha Bodavula — AI Builder & AI Associate',
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
  themeColor: '#05060b',
  width: 'device-width',
  initialScale: 1,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Siddardha Bodavula',
  alternateName: 'Bodavula Naga Venkata Siddardha',
  jobTitle: 'AI Builder / AI Associate',
  url: SITE_URL,
  sameAs: ['https://github.com/bodavulasiddardha-png'],
  knowsAbout: [
    'Excel (Pivot Tables, Power Query, XLOOKUP, DAX)',
    'SQL',
    'Power BI',
    'Python (Pandas, NumPy)',
    'Tableau',
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
