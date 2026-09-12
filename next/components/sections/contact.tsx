import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { resume } from '@/data/resume'
import { SectionHeading } from '@/components/section-heading'
import { RevealSection } from '@/components/reveal-section'

const iconFor = (id: string) => {
  switch (id) {
    case 'linkedin':
      return Linkedin
    case 'github':
      return Github
    default:
      return Mail
  }
}

export function Contact() {
  return (
    <RevealSection id="contact" className="container-page py-24 md:py-32">
      <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[radial-gradient(60%_60%_at_70%_30%,color-mix(in_oklch,var(--color-accent)_22%,transparent),transparent_70%)] p-10 md:p-16">
        <SectionHeading eyebrow="06 — Contact" title="Let’s build something great.">
          <p>
            Open to senior digital product, marketing leadership, and contract engagements.
            The fastest path is email.
          </p>
        </SectionHeading>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${resume.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
          >
            {resume.email}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          {resume.socialLinks.map((s) => {
            const Icon = iconFor(s.id)
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/50 px-4 py-2 text-sm font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Icon className="h-4 w-4" />
                {s.name}
              </a>
            )
          })}
        </div>
      </div>
    </RevealSection>
  )
}
