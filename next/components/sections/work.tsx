import { ArrowUpRight } from 'lucide-react'
import { resume } from '@/data/resume'
import { SectionHeading } from '@/components/section-heading'
import { RevealSection } from '@/components/reveal-section'

export function Work() {
  return (
    <RevealSection id="work" className="container-page py-24 md:py-32">
      <SectionHeading eyebrow="02 — Experience" title="Sixteen years building digital growth engines." />

      <ol className="relative space-y-12 border-l border-[var(--color-border)] pl-8 md:space-y-16">
        {resume.work.map((job) => (
          <li key={job.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.125rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)] [box-shadow:0_0_0_4px_color-mix(in_oklch,var(--color-accent)_20%,transparent)]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)]"
                  >
                    {job.company}
                    <ArrowUpRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                {job.start} — {job.end}
              </span>
            </div>

            <p className="mt-1 text-sm text-[var(--color-muted)] md:text-base">{job.role}</p>

            <ul className="mt-5 space-y-2.5">
              {job.bullets.map((b, i) => (
                <li
                  key={i}
                  className="relative pl-5 text-[var(--color-fg)]/85 md:text-[0.975rem] md:leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.6rem] h-1 w-1 rounded-full bg-[var(--color-accent)]"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </RevealSection>
  )
}
