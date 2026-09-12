'use client'

import { motion, type Variants } from 'motion/react'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { resume } from '@/data/resume'

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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container-page">
        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-balance"
        >
          <span className="block text-5xl font-semibold tracking-tight md:text-7xl lg:text-[5.5rem] lg:leading-[0.95]">
            <span className="nebula-text">{resume.name}.</span>
          </span>
          <span className="mt-4 block text-xl font-medium tracking-tight text-[var(--color-muted)] md:text-2xl md:mt-6">
            {resume.role}
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 max-w-2xl text-pretty text-lg text-[var(--color-muted)] md:text-xl"
        >
          {resume.tagline}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
          >
            See my work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={`mailto:${resume.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:bg-[var(--color-subtle)]"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
        </motion.div>

        <motion.ul
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex items-center gap-3"
          aria-label="Social links"
        >
          {resume.socialLinks.map((s) => {
            const Icon = iconFor(s.id)
            return (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
