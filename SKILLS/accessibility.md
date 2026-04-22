# SKILLS — Accessibility

## Purpose
Meet **WCAG 2.2 AA** across all surfaces and exceed it for high-stakes flows. Healthcare a11y is non-negotiable.

See `ACCESSIBILITY.md` for the program-level standards. This file is the engineer/designer rubric.

## What good looks like
- Keyboard-only walkthrough passes for every primary journey.
- Screen reader announces content meaningfully in both Arabic and English.
- Forms label & error states are programmatically associated.
- Color contrast meets 4.5:1 (text) / 3:1 (UI components).
- No information conveyed by color alone.
- Reduced-motion mode looks intentional, not broken.

## Standards
- Use semantic HTML first; ARIA second.
- Visible focus rings on all interactive elements.
- Touch targets ≥ 44×44 CSS px.
- `aria-live` regions used carefully (`polite` default, `assertive` only for critical).
- Time-out warnings + extension options on session-bound flows.
- Captions and transcripts on any video on marketing or in-product content.
- iOS native: VoiceOver labels, Dynamic Type, Bold Text, Reduce Motion all honored.

## Anti-patterns
- `outline: none` without an equivalent visible focus.
- `<div onClick>` instead of `<button>`.
- ARIA roles on elements that already have native semantics.
- Auto-playing audio or video.
- Tooltips as the only label.
- Color-only error states.

## How to implement
- Run axe-core in component tests; serious/critical violations fail CI.
- Storybook a11y addon green for every component before merge.
- Playwright keyboard-only walkthrough scripted per primary journey.
- Dynamic Type / Larger Text testing on iOS during QA.

## How to audit / test
- Automated: axe in CI + Lighthouse a11y budget per page (≥ 95).
- Manual: VoiceOver iOS, VoiceOver macOS, NVDA Windows pass per release.
- Periodic external a11y audit (annually from v0.5.0).
- User testing including assistive-tech users.

## How to scale
- Per-product a11y owner.
- a11y debt tracked in backlog; never closed without a fix or written acceptance.
- Public a11y statement page from v0.7.0.

## AZRI-specific notes
- Alerts must be perceivable via at least three modalities (visual, audio, haptic on mobile).
- Consent flows passable using only switch control.
- Numerals: Arabic-Indic vs Western digits as a user preference, both readable to assistive tech.
- Hijri / Gregorian dates announced in the user's preferred system.

## Open questions
- External a11y audit partner for KSA market.
- Captioning workflow for videos (in-house vs vendor).
