# Matthew Baldwin — Portfolio (Next 15)

Modern minimalist rebuild of the portfolio at `matthewdbaldwin.com`.

## Stack

- **Next.js 15** (App Router, React 19, Turbopack dev)
- **Tailwind CSS v4** (CSS-first config, no JS config file)
- **TypeScript** (strict)
- **next-themes** for dark / light mode
- **motion** (formerly Framer Motion) for entrance animations
- **yet-another-react-lightbox** for portfolio gallery
- **lucide-react** for icons
- **Geist Sans / Mono** via `next/font/google`

## Local development

```bash
cd next
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

Build output uses `output: 'standalone'` so the runtime container only needs `node server.js`.

## Deploy to Railway

The Dockerfile + `railway.toml` are pre-configured.

```bash
cd next
railway init      # create a new Railway project (or link to existing)
railway up        # build + deploy
```

To point a custom domain:

```bash
railway domain    # generate Railway URL, or
railway domain add matthewdbaldwin.com
```

Then update DNS at your registrar to the CNAME Railway provides.

## Architecture notes

- All section components are React Server Components except where interactivity is required (Nav, Hero animations, Portfolio lightbox, ThemeToggle).
- Resume data lives in `data/resume.ts` as typed TypeScript — single source of truth.
- Design tokens live in `app/globals.css` under Tailwind v4's `@theme` block (OKLCH color space).
- Dark mode prefers system theme; user toggle persists via `next-themes`.
- Scroll-driven reveal animations use the native CSS `animation-timeline: view()` feature (progressive enhancement; older browsers see static layout).
