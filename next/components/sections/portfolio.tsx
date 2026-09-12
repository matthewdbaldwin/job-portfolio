'use client'

import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowUpRight } from 'lucide-react'
import { resume } from '@/data/resume'
import { SectionHeading } from '@/components/section-heading'
import { RevealSection } from '@/components/reveal-section'

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false })
import 'yet-another-react-lightbox/styles.css'

export function Portfolio() {
  const featured = resume.portfolio
  const gallery = resume.portfolioGallery

  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = gallery.map((g) => ({
    src: g.url.startsWith('http') ? g.image : g.url,
    alt: g.alt,
    description: g.description,
    title: g.name,
  }))

  return (
    <RevealSection id="portfolio" className="container-page py-24 md:py-32">
      <SectionHeading eyebrow="04 — Selected work" title="Sites I've shipped, scaled, or saved.">
        <p>External links go live; gallery thumbnails open larger views.</p>
      </SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-subtle)]/40 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(15%_0.01_264_/_0.55)] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-[var(--color-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
              </div>
              <p className="mt-1.5 text-sm text-[var(--color-muted)]">{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-20">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
          Design samples
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {gallery.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                setIndex(i)
                setOpen(true)
              }}
              aria-label={`Open ${g.name} in lightbox`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <Image
                src={g.image}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Always-visible caption with gradient scrim — touch-friendly */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[oklch(8%_0.01_264_/_0.85)] via-[oklch(8%_0.01_264_/_0.3)] to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 p-3 text-left text-xs font-medium text-white">
                {g.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </RevealSection>
  )
}
