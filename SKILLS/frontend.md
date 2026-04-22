# SKILLS — Frontend

## Purpose
Build accessible, bilingual, RTL-aware, fast, and maintainable UI for AZRI's patient, caregiver, doctor, and institution surfaces.

## What good looks like
- Loads in under 2 seconds on a mid-range Android in Riyadh on 4G.
- Looks and reads correctly in Arabic/RTL **and** English/LTR with no manual flipping.
- Keyboard-only navigation works end-to-end. Screen readers announce meaningfully.
- Components are composed from a shared, owned design system. No drift.
- State and effects are predictable; data fetching is colocated with the component that needs it.
- Error and empty states are designed, not afterthoughts.

## Standards
- **Framework:** Next.js (App Router) + React Server Components where appropriate.
- **Styling:** Tailwind CSS + design tokens; **logical properties only** for any directional layout.
- **Components:** shadcn/ui copied into `packages/ui` and customized; no untyped wrappers.
- **State:** server state via React Query (or RSC + Server Actions); client state minimal and local.
- **Forms:** React Hook Form + Zod; labels and errors programmatically associated.
- **i18n:** every visible string in the catalog; ICU MessageFormat; no concatenation.
- **Routing:** locale-aware (`/[locale]/…`); `dir` attribute on `<html>` switches with locale.
- **Images:** `next/image`; explicit dimensions; `alt` for every image conveying meaning.
- **Performance:** Lighthouse ≥ 90 (Performance, Best Practices, SEO), ≥ 95 (Accessibility).
- **Bundle hygiene:** route-level code splitting; no >150 KB JS first-load on patient app marketing routes.
- **Errors:** error boundaries per route; user-facing messages free of stack traces and PHI.

## Anti-patterns
- Hard-coded English strings.
- Physical CSS properties (`margin-left`, `padding-right`) for layout.
- `outline: none` without a visible alternative focus state.
- Inline `dangerouslySetInnerHTML` without sanitization.
- Client-side fetching of data that the server can render directly.
- Generic `<div onClick>` instead of buttons/links.
- Putting PHI in URL parameters.
- Toasts as the only feedback mechanism for important actions.

## How to implement
- Start from a shadcn/ui primitive; extend, don't fork.
- Co-locate `Component.tsx`, `Component.test.tsx`, `Component.stories.tsx`.
- Use Storybook (or equivalent) with both `ar`/RTL and `en`/LTR stories.
- Wrap third-party components if they don't pass our a11y bar.

## How to audit / test
- Unit tests with Vitest/RTL.
- a11y tests with axe-core; serious/critical violations fail CI.
- Visual review in both directions.
- Lighthouse-CI budgets per route.
- Playwright keyboard walkthrough for primary journeys.

## How to scale
- Extract repeated patterns into `packages/ui` only after the third use.
- Bundle analyzer on every release; performance budgets enforced.
- RSC-first; ship less JS to the client.
- Consider partial hydration / Islands when complexity grows.

## AZRI-specific notes
- Patient surfaces are **calm**: minimal motion, no scary numbers, no leaderboards or gamification of medical events.
- Alerts have a distinct, restrained visual language; never resemble marketing CTAs.
- Doctor console favors **density + scannability** over decoration.
- Hijri/Gregorian toggle is a first-class user setting.
- Numerals: respect user preference (Arabic-Indic vs Western digits).

## Open questions
- Storybook vs Ladle.
- Visual regression vendor.
- Server actions vs traditional API routes for forms.
