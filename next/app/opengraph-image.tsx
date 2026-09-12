import { ImageResponse } from 'next/og'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { resume } from '@/data/resume'

export const alt = `${resume.name} — ${resume.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Run per-request so the filesystem read isn't attempted during static export.
export const dynamic = 'force-dynamic'

export default async function OpenGraphImage() {
  // Inline the profile pic as base64 so Satori has the bytes directly.
  const profileBytes = await fs.readFile(
    path.join(process.cwd(), 'public/images/profilepic.webp')
  )
  const profileSrc = `data:image/webp;base64,${profileBytes.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 72,
          gap: 56,
          background:
            'linear-gradient(135deg, #1e3a8a 0%, #581c87 35%, #831843 65%, #0f172a 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Profile pic, circular */}
        <div
          style={{
            display: 'flex',
            width: 320,
            height: 320,
            borderRadius: 160,
            overflow: 'hidden',
            border: '6px solid rgba(255,255,255,0.9)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileSrc}
            alt=""
            width={320}
            height={320}
            style={{ width: 320, height: 320, objectFit: 'cover' }}
          />
        </div>

        {/* Text block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            ★ matthew.baldwin
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              marginBottom: 18,
            }}
          >
            {resume.name}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {resume.role}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.4,
              maxWidth: 640,
            }}
          >
            {resume.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
