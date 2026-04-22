# ACCESSIBILITY

> Accessibility standards for AZRI. Healthcare context = a11y is not optional.

## Target

- **WCAG 2.2 AA** across patient, caregiver, doctor, and institution surfaces.
- AAA where reasonable for high-stakes flows (consent, alerts, medication).
- Native platform best practices (Apple HIG accessibility) for iOS and Watch.

## Non-negotiables

1. **Keyboard-only operation** for every web journey end-to-end.
2. **Visible focus** on every interactive element. No `outline: none` without an equivalent.
3. **Form labels and error association** — programmatic, not just visual.
4. **Sufficient contrast** — 4.5:1 text, 3:1 large text and UI components.
5. **Touch targets** ≥ 44×44 CSS px on mobile.
6. **Motion respect** — honor `prefers-reduced-motion`.
7. **No information conveyed by color alone.**
8. **Live regions** used carefully — alerts announced once, politely (`aria-live="polite"`) unless critical (`assertive`).

## RTL & a11y intersect

- Logical CSS properties (`margin-inline-start`, `padding-inline-end`) for layout — automatic for both directions.
- Direction-aware iconography (chevrons, back arrows mirror in RTL when semantically appropriate; numerals do not).
- Screen reader testing in Arabic with VoiceOver (iOS) and NVDA (Windows) using Arabic voices.

## Healthcare-specific patterns

- **Consent flows:** plain language, large readable type, explicit confirmation step, no dark patterns.
- **Alerts:** distinguishable by shape + color + text, never color alone; haptic + audio + visual on mobile.
- **Numerical readouts:** units always announced; locale-aware number formatting (Arabic-Indic digits as a configurable option).
- **Time:** Hijri / Gregorian toggle; screen reader announces both when relevant.
- **Emergency contacts:** reachable in ≤ 2 keypresses / taps from any screen.

## Tooling

- `axe-core` integrated in component tests; serious/critical violations fail CI.
- Playwright keyboard-only walkthroughs for primary journeys.
- Lighthouse a11y score budget per page (target ≥ 95).
- Manual screen-reader pass on every release: VoiceOver iOS, VoiceOver macOS, NVDA Windows.
- Color contrast lints in design tokens.

## Accessibility review checklist (PR template enforced)

- [ ] Keyboard-only walkthrough passes.
- [ ] Visible focus on all new interactive elements.
- [ ] Labels and error messages programmatically associated.
- [ ] Contrast verified for any new colors.
- [ ] Tested with screen reader in Arabic and English.
- [ ] Reduced-motion path verified.
- [ ] No new `aria-*` misuse (validated by `eslint-plugin-jsx-a11y` and axe).

## Continuous improvement

- Quarterly a11y audit by an external specialist starting v0.5.0.
- Public a11y statement page at v0.7.0 launch.
- Patient/caregiver feedback loop for a11y issues with a dedicated tag in support.

## Open items

- Decide on a11y testing platform for native iOS (XCTest + manual; possibly Sauce/BrowserStack equivalents).
- Pick a captioning workflow for any video content on the marketing site.
