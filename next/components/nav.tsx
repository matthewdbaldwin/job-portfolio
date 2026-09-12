'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#testimonials', label: 'Praise' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-bg)_85%,transparent)] backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-[var(--color-fg)]"
        >
          <span className="text-[var(--color-accent)]">★</span>{' '}
          <span className="font-semibold">matthew.baldwin</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:bg-[var(--color-subtle)] hover:text-[var(--color-fg)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-subtle)] text-[var(--color-fg)] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden">
          <nav className="container-page flex flex-col py-2" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-[var(--color-fg)] hover:bg-[var(--color-subtle)]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
