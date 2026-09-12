import { resume } from '@/data/resume'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-page flex flex-col items-start justify-between gap-3 py-10 md:flex-row md:items-center">
        <p className="text-sm text-[var(--color-muted)]">
          © {year} {resume.name} · {resume.address}
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
          Built with Next 15 · Tailwind v4 · React 19
        </p>
      </div>
    </footer>
  )
}
