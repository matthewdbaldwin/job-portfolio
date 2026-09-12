import { resume } from '@/data/resume'
import { SectionHeading } from '@/components/section-heading'
import { RevealSection } from '@/components/reveal-section'

const stats = [
  { value: '$12M+', label: 'Revenue impact' },
  { value: '425%', label: 'Lead-flow growth' },
  { value: '37%', label: 'Conversion lift' },
  { value: '50M+', label: 'Email sends / yr' },
]

export function About() {
  return (
    <RevealSection id="about" className="container-page py-24 md:py-32">
      <SectionHeading eyebrow="01 — About" title="Strategy meets technical fluency.">
        <p>{resume.about[0]}</p>
      </SectionHeading>

      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="space-y-5 text-[var(--color-fg)]/85">
            {resume.about.slice(1).map((p, i) => (
              <p key={i} className="text-pretty text-base leading-relaxed md:text-lg">
                {p}
              </p>
            ))}
            <p className="text-pretty text-base leading-relaxed md:text-lg">
              {resume.aboutSecondary}
            </p>
          </div>
        </div>

        <aside className="md:col-span-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-subtle)]/60 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              By the numbers
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs text-[var(--color-muted)]">{s.label}</dt>
                  <dd className="mt-1 font-mono text-2xl font-semibold tracking-tight text-[var(--color-fg)] md:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </RevealSection>
  )
}
