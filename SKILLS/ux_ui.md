# SKILLS — UX / UI

## Purpose
Design AZRI with dignity, clarity, and trust. Healthcare deserves better than consumer-app patterns.

## What good looks like
- Calm, restrained visuals; the product never feels like an emergency room when you're at home.
- Bilingual mirroring is invisible — both directions feel native.
- Information hierarchy serves the user's task, not the brand.
- Doctor surfaces favor density and scannability; patient surfaces favor reassurance and clarity.

## Standards
- Design system: Tailwind tokens + shadcn/ui (`SKILLS/frontend.md`).
- Type scale supports Arabic body and large-print accessibility.
- Color uses 4.5:1 contrast minimum for text; semantic tokens (success/warn/danger) used consistently.
- Motion is short, purposeful, and `prefers-reduced-motion`-aware.
- Iconography: outline style by default; mirrored when semantically appropriate in RTL.
- Empty, loading, error states designed for every flow.
- Critical actions (consent, alerts, exports) have explicit confirmation steps without dark patterns.

## Anti-patterns
- Marketing-style CTAs in clinical surfaces.
- Color-only state indicators.
- Animations on patient alerts that look celebratory.
- Modals stacked deep enough to lose context.
- Toasts as the only feedback for important actions.
- Skeuomorphic medical visuals that imply more than the data supports.

## How to implement
- Figma library mirrors `packages/ui` token-for-token.
- Components delivered with both directions in Storybook before merge.
- Native KSA Arabic reviewer signs off on patient/clinician copy.

## How to audit / test
- Heuristic review per release (Nielsen, plus our healthcare-specific checks).
- Patient/caregiver usability sessions per significant journey.
- Doctor advisory checks on console workflow.
- a11y audit (`SKILLS/accessibility.md`).

## How to scale
- Design ops: token versioning aligned with `packages/ui`.
- Per-persona design pods as the team grows (patient/clinician/institution).
- Public design system documentation when APIs go public.

## AZRI-specific notes
- Patient hero state is "all is calm" — visual noise must justify itself.
- Caregiver UI emphasizes consent boundaries clearly — what they can and cannot see.
- Doctor UI emphasizes evidence trails (who, when, what) over decoration.
- Institution admin UI looks like enterprise software for a reason; procurement officers expect it.

## Open questions
- Branding refresh cadence.
- Native-app vs web-app design parity strategy.
- Iconography licensing.
