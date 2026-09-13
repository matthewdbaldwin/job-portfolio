import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { resume } from '@/data/resume'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://portfolio-production-259a.up.railway.app'

const SITE_NAME = `${resume.name} — Portfolio`
const TITLE = `${resume.name} — ${resume.role}`
const DESCRIPTION =
  `${resume.tagline} 18 years driving $12M+ revenue impact, 425% lead-flow growth, ` +
  `and 37% conversion lift across global B2B brands.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${resume.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: resume.name, url: SITE_URL }],
  creator: resume.name,
  publisher: resume.name,
  keywords: [
    resume.name,
    'Digital Product Leader',
    'Website Strategy',
    'Digital Governance',
    'Marketing Operations',
    'B2B Marketing',
    'GTM Strategy',
    'HubSpot',
    'Salesforce',
    'Portfolio',
  ],
  category: 'portfolio',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    firstName: resume.name.split(' ')[0],
    lastName: resume.name.split(' ').slice(1).join(' '),
    // openGraph.images is auto-populated by app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    // twitter.images is auto-populated by app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

// JSON-LD Person + WebSite structured data for search engines.
const [givenName, ...rest] = resume.name.split(' ')
const familyName = rest.join(' ')

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: resume.name,
      givenName,
      familyName,
      jobTitle: resume.role,
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/images/profilepic.webp`,
      email: `mailto:${resume.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: resume.address,
      },
      sameAs: resume.socialLinks.map((s) => s.url),
      knowsAbout: resume.skills.filter((s) => s.tier === 1).map((s) => s.name),
      alumniOf: resume.education.map((e) => ({
        '@type': 'EducationalOrganization',
        name: e.school,
      })),
      worksFor: resume.work[0]?.companyUrl
        ? {
            '@type': 'Organization',
            name: resume.work[0].company,
            url: resume.work[0].companyUrl,
          }
        : undefined,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}#person` },
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* rel="me" identity verification — React 19 hoists these to <head>.
            Connects this site to Mastodon, LinkedIn, GitHub for ownership badges. */}
        {resume.socialLinks.map((s) => (
          <link key={s.id} rel="me" href={s.url} />
        ))}
        <link rel="me" href={`mailto:${resume.email}`} />

        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
