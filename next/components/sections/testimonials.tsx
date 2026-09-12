import { resume } from '@/data/resume'
import { SectionHeading } from '@/components/section-heading'
import { RevealSection } from '@/components/reveal-section'

export function Testimonials() {
  return (
    <RevealSection
      id="testimonials"
      className="testimonials-section container-page relative isolate py-24 md:py-32"
    >
      <div className="testimonials-bg-layer" aria-hidden />
      <SectionHeading eyebrow="05 — Praise" title="What colleagues say." />

      <div className="grid gap-6 md:grid-cols-3">
        {resume.testimonials.map((t) => (
          <figure
            key={t.id}
            className="flex h-full flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/85 p-6 backdrop-blur"
          >
            <blockquote className="text-lg leading-snug text-[var(--color-fg)]">
              <span aria-hidden className="mb-2 block font-mono text-3xl text-[var(--color-accent)]">
                &ldquo;
              </span>
              <p className="text-pretty">{t.quote}</p>
            </blockquote>
            <figcaption className="mt-6 border-t border-[var(--color-border)] pt-4">
              <p className="font-semibold tracking-tight">{t.author}</p>
              <p className="text-sm text-[var(--color-muted)]">
                {t.role} · {t.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </RevealSection>
  )
}
