# @azri/web

> **Scaffold.** Next.js (App Router) marketing site, Arabic-first with
> RTL, consuming bilingual copy from `@azri/content`. No authentication,
> no database, no AI. Expand as v0.2.0+ features land.

## What's here

- `/` → redirects to the KSA-first default locale `/ar`.
- `/ar` and `/en` → localized home page (hero, why-AZRI, Apple-Watch readiness).
- `/ar/pricing` and `/en/pricing` → pricing plans rendered from the shipped
  `@azri/content` pricing section (four tiers that mirror the live
  `azri.ai` site — see `BUSINESS_CONTEXT.md` for the aspirational target).
- Language switcher in the header.
- RTL-aware root layout; Tailwind v4 via `@tailwindcss/postcss`.
- Medical disclaimer rendered in the footer on every page.

## Design decisions

- **Framework:** Next.js App Router 15 + React 19. See ADR-0011.
- **Styling:** Tailwind v4 with `@tailwindcss/postcss`. Logical CSS
  properties encouraged; `margin-left` / `padding-right` are visibly
  flagged in `globals.css` as a reviewer hint.
- **Content:** all visible copy comes from `@azri/content` via `pick`.
  No inline strings.
- **Locale routing:** `app/[locale]/…` with `generateStaticParams` for
  `ar` and `en`. Root `/` redirects to default locale (Arabic).
- **Security headers:** `X-Content-Type-Options`, `Referrer-Policy`,
  and a conservative `Permissions-Policy` set in `next.config.ts`.
  CSP belongs on a full edge proxy; added later.

## What's deliberately missing

- **Auth.** Blocked on ADR-0004.
- **CMS / MDX.** TODO open item in the "Discovered while doing v0.1.0"
  section of `TODO.md`.
- **shadcn/ui components.** ADR-0006 proposes them; will land as
  `packages/ui` once the first non-trivial UI flow needs them.
- **Arabic-reviewer-approved copy.** All strings come from
  `@azri/content`, which carries the same bilingual posture; any new
  strings introduced in the web layer must go through the native-speaker
  review gate in `I18N_L10N.md`.
- **Live API integration.** `NEXT_PUBLIC_API_BASE_URL` is documented in
  `.env.example` but no client fetches it yet.

## Local development

```bash
cd web
cp .env.example .env.local
npm install
npm run dev     # → http://localhost:3000
```

Endpoints to hit:
- `/` (redirects to `/ar`)
- `/ar`, `/en`
- `/ar/pricing`, `/en/pricing`

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `next lint` |

## Structure

```
web/
├── app/
│   ├── layout.tsx                  root html wrapper
│   ├── page.tsx                    redirects / → /ar
│   ├── not-found.tsx               localized 404 (default locale)
│   ├── globals.css                 tailwind + tokens
│   ├── lib/locale.ts               locale guards
│   └── [locale]/
│       ├── layout.tsx              header + footer + lang/dir
│       ├── page.tsx                home: hero + whyAzri + appleWatch
│       ├── pricing/page.tsx        pricing plans
│       └── _components/
│           ├── LanguageSwitcher.tsx
│           └── Footer.tsx
├── next.config.ts                  security headers, transpilePackages
├── postcss.config.mjs              tailwind v4
└── tsconfig.json
```
