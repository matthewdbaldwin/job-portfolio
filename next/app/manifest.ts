import type { MetadataRoute } from 'next'
import { resume } from '@/data/resume'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${resume.name} — Portfolio`,
    short_name: 'M. Baldwin',
    description: resume.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f1d',
    theme_color: '#0a0f1d',
    orientation: 'portrait',
    categories: ['portfolio', 'business', 'productivity'],
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'See my work',
        short_name: 'Portfolio',
        description: 'Jump to selected work',
        url: '/#portfolio',
      },
      {
        name: 'Get in touch',
        short_name: 'Contact',
        description: 'Jump to contact details',
        url: '/#contact',
      },
    ],
  }
}
