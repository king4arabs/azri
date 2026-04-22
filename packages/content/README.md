# `@azri/content`

Shared bilingual (Arabic / English) content source of truth for AZRI.

This package is **framework-agnostic** TypeScript. It is consumed by every AZRI surface:

- the marketing website (Next.js, planned `v0.2.0`)
- the patient app (React Native / Expo, planned `v0.4.0`)
- the doctor dashboard
- the institutional SaaS platform
- the wearable companion (Apple Watch / HealthKit, planned `v0.4.0`)

> 📚 See [`../../CONTENT_SYSTEM.md`](../../CONTENT_SYSTEM.md) for the full architecture, authoring workflow, and how web/app surfaces consume this package.

## Install

This package is consumed via workspace linking once the surfaces land. Until then it is importable directly via relative path or via TypeScript path aliases.

## Usage

```ts
import {
  azriContent,
  pick,
  resolveLocale,
  getDirection,
  localeAttributes,
} from "@azri/content";

const locale = resolveLocale(navigator.languages); // "ar" | "en"
const dir    = getDirection(locale);                // "rtl" | "ltr"

const heroTitle    = pick(azriContent.hero.tagline,     locale);
const heroPara     = pick(azriContent.hero.description, locale);
const disclaimer   = pick(azriContent.medicalDisclaimer.body, locale);

// HTML root attributes (web):
const htmlAttrs = localeAttributes(locale); // { lang, dir }
```

### Page bindings

```ts
import { pageBindings, azriContent, pick } from "@azri/content";

for (const section of pageBindings.web.home.sections) {
  // Render azriContent[section] in order, locale-aware.
}
```

## Content layout

All sections live on `azriContent` (typed as `AzriContent`). The 27 top-level sections are listed in `src/types.ts`. Authoring rules are defined inline in `src/data/azri.ts`. Highlights:

1. **Both `ar` and `en` are required** for every visible string.
2. **Medical wording must stay careful** — AZRI *supports*, *helps monitor*, *assists with early awareness*. It does not diagnose, predict with certainty, cure, or replace a clinician. See [`../../SKILLS/healthcare_product.md`](../../SKILLS/healthcare_product.md).
3. **Stable `id` fields are part of the public contract.** Renaming an `id` is a breaking change for any consumer that targets it (CTAs, FAQ deep links, sitemap, footer).
4. **Do not invent partnerships, certifications, or regulatory claims.**
5. **Update [`../../CHANGELOG.md`](../../CHANGELOG.md)** under the appropriate `Unreleased` / version section whenever user-visible copy changes.

## Validation

```bash
cd packages/content
npm run typecheck   # tsc --noEmit (strict)
npm run test        # node --test (no external deps)
```

The test suite asserts:

- every required top-level section exists,
- every `Bilingual` field has both `ar` and `en` populated and non-empty,
- ids inside ordered collections are unique,
- the medical disclaimer is preserved in both locales,
- every page binding references a real content section / SEO entry.

## Adding a new piece of content

1. Add or extend a type in `src/types.ts`.
2. Add the data in `src/data/azri.ts` with both `ar` and `en`.
3. If a page renders it, add the section key to the relevant entry in `src/page-bindings.ts`.
4. Run `npm run typecheck && npm run test`.
5. Note the change in `../../CHANGELOG.md` (Unreleased).
