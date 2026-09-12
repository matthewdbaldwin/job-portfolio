import { resume } from '@/data/resume'
import { SectionHeading } from '@/components/section-heading'
import { RevealSection } from '@/components/reveal-section'
import { cn } from '@/lib/utils'

export function Skills() {
  const tier1 = resume.skills.filter((s) => s.tier === 1)
  const tier2 = resume.skills.filter((s) => s.tier === 2)

  return (
    <RevealSection id="skills" className="container-page py-24 md:py-32">
      <SectionHeading
        eyebrow="03 — Skills"
        title="Strategic, operational, technical."
      >
        <p>
          Click any pill to view my verified LinkedIn skills.
        </p>
      </SectionHeading>

      <div className="space-y-10">
        <SkillRow label="Core" skills={tier1} primary />
        <SkillRow label="Supporting" skills={tier2} />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {resume.education.map((edu) => (
          <article
            key={edu.id}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-subtle)]/60 p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {edu.graduated}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{edu.school}</h3>
            <p className="mt-2 text-[var(--color-muted)]">{edu.field}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{edu.achievement}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  )
}

function SkillRow({
  label,
  skills,
  primary = false,
}: {
  label: string
  skills: { id: string; name: string }[]
  primary?: boolean
}) {
  const href = `https://www.linkedin.com/in/${resume.linkedinId}/details/skills/`
  return (
    <div>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <li key={s.id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex rounded-full border px-3.5 py-1.5 text-sm transition-all',
                primary
                  ? 'border-[color-mix(in_oklch,var(--color-accent)_55%,var(--color-border))] bg-[var(--color-accent-soft)] text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:-translate-y-0.5'
                  : 'border-[var(--color-border)] bg-[var(--color-subtle)] text-[var(--color-muted)] hover:text-[var(--color-fg)]'
              )}
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
