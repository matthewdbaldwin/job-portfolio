import { type ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  children?: ReactNode
}

export function SectionHeading({ eyebrow, title, children }: Props) {
  return (
    <div className="mb-12 max-w-3xl md:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-pretty text-base text-[var(--color-muted)] md:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  )
}
