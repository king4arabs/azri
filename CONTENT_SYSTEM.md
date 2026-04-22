# CONTENT_SYSTEM

> Architecture and authoring workflow for AZRI's bilingual (Arabic / English) content system.
> Source of truth: [`packages/content/`](./packages/content).
> First introduced in `Unreleased` (planned for `v0.2.0`) — see [`CHANGELOG.md`](./CHANGELOG.md).

## Goals

1. **One source of truth** for AZRI marketing + product copy across the website, patient app, doctor dashboard, institutional platform, and wearable companion.
2. **Bilingual-first.** Every visible string carries both Arabic (`ar`) and English (`en`). Arabic is reviewed by a native KSA speaker per [`I18N_L10N.md`](./I18N_L10N.md).
3. **Typed.** Strict TypeScript schema catches missing translations, missing sections, and broken page bindings at compile time.
4. **Framework-agnostic.** No React / Next / Tailwind / Expo imports in the content package — both web and app consume it identically.
5. **Healthcare-safe wording.** Authoring rules enforce careful medical language and forbid invented claims, in line with [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md).
6. **Easy to maintain.** A single content file. A single changelog entry per content update. Tests prove completeness.

## Where the content lives

```
packages/content/
├── package.json                  # @azri/content (private workspace package)
├── tsconfig.json                 # strict TS, types: ["node"]
├── README.md                     # package-local quickstart
└── src/
    ├── index.ts                  # public API (re-exports)
    ├── types.ts                  # strict schema for all 27 sections
    ├── locale.ts                 # locale resolution + RTL/LTR helpers
    ├── page-bindings.ts          # web pages & app screens → section keys
    ├── data/
    │   └── azri.ts               # bilingual source of truth
    └── __tests__/
        └── azri.test.ts          # node:test sanity checks
```

## Schema (`src/types.ts`)

The root content type is `AzriContent` with **27 named sections** (mirroring the bilingual brief):

| Group | Sections |
| --- | --- |
| Brand & hero | `brand`, `hero`, `supportingNote`, `brandMessage` |
| Marketing flow | `whyAzri`, `audienceSegments`, `valuePropositions`, `productSuite`, `howItWorks`, `appleWatch`, `benefits`, `pricing`, `trustAndResponsibility`, `finalCTA` |
| Pages | `aboutPage`, `solutionsPage`, `patientsFamiliesPage`, `doctorsPage`, `institutionsPage`, `technologyPage`, `faqPage`, `contactPage` |
| Cross-cutting | `uiMicrocopy`, `seo`, `footer`, `medicalDisclaimer`, `sitemap` |

### Reusable building blocks

| Type | Purpose |
| --- | --- |
| `Bilingual<T>` | `{ ar, en }` pair — required for every visible string. |
| `BilingualList` | `Bilingual<readonly string[]>` for bullet lists. |
| `CtaItem` | `{ id, intent, label }` — `id` is stable across web/app, surfaces map it to a route or deep link. |
| `FeatureCard` | Title/description/optional bullets — used by value props and benefits. |
| `ProcessStep` | Numbered step (used by *How It Works*). |
| `AudienceSegment` | Patient / family / doctor / institution segments — `id` is reused as a foreign key by `benefits`. |
| `PricingPlan` | Plan with localized display price + cadence + features. Numeric prices for billing live in the billing system, not here. |
| `FaqItem` | Stable `id` so deep links (`/faq#whatIsAzri`) survive copy edits. |
| `LinkGroup` | Used by the footer; `href` is a logical route key. |

## Locale & RTL/LTR (`src/locale.ts`)

Pure helpers:

- `LOCALES` — `["ar", "en"] as const`.
- `DEFAULT_LOCALE` — `"ar"` (Arabic-first per [`I18N_L10N.md`](./I18N_L10N.md)).
- `getDirection(locale)` → `"rtl" | "ltr"`.
- `isRtl(locale)` — convenience boolean.
- `getAlternateLocale(locale)` — for language-toggle buttons.
- `resolveLocale(input, fallback?)` — negotiates from `Accept-Language` strings or device language arrays (handles `ar-SA`, `en-US`, etc.).
- `pick(field, locale)` — safe locale picker with empty-string fallback.
- `localeAttributes(locale)` → `{ lang, dir }` for the HTML root.

## Page bindings (`src/page-bindings.ts`)

`pageBindings.web.<pageId>` and `pageBindings.app.<screenId>` describe **which sections each surface renders, in what order**, plus the SEO key and whether the medical disclaimer must be shown prominently.

| Surface | Page id | Sections rendered |
| --- | --- | --- |
| `web` | `home` | hero → supportingNote → whyAzri → audienceSegments → valuePropositions → productSuite → howItWorks → appleWatch → benefits → pricing → trustAndResponsibility → finalCTA |
| `web` | `about` | aboutPage → brandMessage → trustAndResponsibility |
| `web` | `solutions` | solutionsPage → valuePropositions → finalCTA |
| `web` | `patientsFamilies` | patientsFamiliesPage → benefits → finalCTA |
| `web` | `doctors` | doctorsPage → benefits → finalCTA |
| `web` | `institutions` | institutionsPage → benefits → finalCTA |
| `web` | `technology` | technologyPage → trustAndResponsibility |
| `web` | `pricing` | pricing → trustAndResponsibility → finalCTA |
| `web` | `faq` | faqPage → trustAndResponsibility |
| `web` | `contact` | contactPage |
| `web` | `legalMedicalDisclaimer` | medicalDisclaimer |
| `app` | `appOnboarding` | brand → hero → uiMicrocopy |
| `app` | `appHome` | uiMicrocopy → brandMessage |
| `app` | `appAlerts` | uiMicrocopy |
| `app` | `appReports` | uiMicrocopy |
| `app` | `appAbout` | aboutPage → brandMessage |
| `app` | `appHelp` | faqPage → uiMicrocopy |
| `app` | `appLegalDisclaimer` | medicalDisclaimer |

`requiresMedicalDisclaimer: true` flags pages where the disclaimer must be visible (home, patients/families, faq, app help, legal pages).

## How web and app consume it

```ts
import {
  azriContent,
  pick,
  resolveLocale,
  localeAttributes,
  pageBindings,
} from "@azri/content";

// Web (Next.js app router): negotiate locale from request headers,
// then render sections per `pageBindings.web.<pageId>.sections`.
const locale = resolveLocale(request.headers.get("accept-language"));
const html   = localeAttributes(locale);             // { lang, dir }
const blocks = pageBindings.web.home.sections.map(
  (key) => azriContent[key],
);

// App (React Native / Expo): same package, same calls.
const screen = pageBindings.app.appOnboarding;
const cta    = pick(azriContent.uiMicrocopy.labels.getStarted, locale);
```

Each surface is responsible for:

- mapping `CtaItem.id` to a real URL or deep link,
- mapping logical hrefs in the footer/sitemap to its router,
- presenting bullet lists, cards, and steps in its own design language.

The content package owns **what** is shown, not **how**.

## Authoring workflow (content updates)

1. Edit `packages/content/src/data/azri.ts` (and `types.ts` if the shape changes).
2. Always provide both `ar` and `en` for every new string.
3. Keep medical wording careful: *supports*, *helps monitor*, *assists with early awareness*, *enables follow-up*. Never claim diagnosis, cure, guaranteed prediction, or replacement of a clinician.
4. Do not add partnerships, certifications, or regulatory claims unless backed by a documented source.
5. If you add a section or page, update `page-bindings.ts` and the table in this document.
6. Run validation:
   ```bash
   cd packages/content
   npm run typecheck
   npm run test
   ```
7. Add a one-line entry under `## [Unreleased]` in [`CHANGELOG.md`](./CHANGELOG.md) describing the content change.

## What is shared vs surface-specific

| Surface | Reads from `@azri/content` | Owns separately |
| --- | --- | --- |
| Marketing website | All sections | Page layouts, design tokens, animations, routing |
| Patient app | `brand`, `hero`, `uiMicrocopy`, `aboutPage`, `faqPage`, `medicalDisclaimer`, `brandMessage` | Native UI, alerts engine, push notification copy (in-app), HealthKit integration |
| Doctor dashboard | `brand`, `uiMicrocopy`, `medicalDisclaimer` | Clinical UI, charts, report exports |
| Institutional SaaS | `brand`, `institutionsPage`, `pricing` (Enterprise), `uiMicrocopy` | Admin UI, RBAC, billing, audit |
| Wearable companion | `brand`, `uiMicrocopy` (subset), `medicalDisclaimer` | On-wrist UI, watchOS strings catalog (mirrors `uiMicrocopy`) |

Surface-specific copy (alert text, push notifications, error states, clinical instructions) stays in the surface's own catalog and **must follow the same medical-wording rules**.

## Tests (`src/__tests__/azri.test.ts`)

The test suite uses the built-in `node:test` runner via `tsx` (no extra runtime). It verifies:

- every required top-level section exists,
- every `Bilingual` field has both `ar` and `en` populated,
- ids inside ordered collections are unique (segments, plans, FAQ, sitemap, footer groups, etc.),
- the medical disclaimer is present in both locales and mentions emergency / non-substitution language,
- every page binding references a real content section and a real SEO key.

Run via `npm run typecheck && npm test` from `packages/content/`.

## Versioning

Content updates follow the repo's overall SemVer policy ([`VERSION.md`](./VERSION.md)):

- **PATCH** — copy fixes, typo corrections, microcopy refinements.
- **MINOR** — new sections, new pages, new languages, new page bindings.
- **MAJOR** — renaming or removing existing `id` fields (breaks deep links and surface routing).

## See also

- [`I18N_L10N.md`](./I18N_L10N.md) — locale strategy, RTL principles, tooling roadmap.
- [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md) — clinical wording rules.
- [`SKILLS/ux_ui.md`](./SKILLS/ux_ui.md) — design tokens (consume content + tokens together).
- [`DECISIONS.md`](./DECISIONS.md) — ADR-0010 records the decision to centralize content here.
- [`CHANGELOG.md`](./CHANGELOG.md) — content updates are listed alongside code changes.
