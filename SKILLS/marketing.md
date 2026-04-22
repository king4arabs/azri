# SKILLS — Marketing

## Purpose
Grow AZRI honestly. Healthcare marketing is privileged — abuse loses trust permanently.

## What good looks like
- Positioning is calm, clear, factual.
- Arabic content is authored, not translated.
- Conversion paths are instrumented with PHI-safe analytics (`ANALYTICS.md`).
- Trust surfaces (privacy, AI transparency, security overview, status page) are easy to find.

## Standards
- Healthcare claims sourced or removed.
- No fear-based messaging targeting patients or families.
- No targeting based on health status.
- Patient testimonials only with explicit, revocable consent and review by clinical lead.
- Press releases reviewed by legal and clinical leads when claims are made.
- Brand voice in Arabic and English maintained in a public-internal style guide (to come at v0.3.0).

## Anti-patterns
- "AI-powered diagnosis" copy.
- "First in KSA" / "Only platform" claims without evidence.
- Borrowing logos of hospitals as "customers" before formal contracts.
- Cookie banners that don't actually respect refusal.
- A/B tests run on patient-facing surfaces without guardrail metrics.

## How to implement
- Editorial calendar; native KSA reviewer in the loop for Arabic.
- Demo & contact forms route to CRM with PHI-safe payload.
- Status page and security overview live before paid acquisition begins.

## How to audit / test
- Claims audit per quarter against `SKILLS/healthcare_product.md`.
- Localization audit per quarter (any English bleed in Arabic surfaces).
- PHI-leak audit on analytics events monthly.

## How to scale
- Partnership marketing with patient advocacy groups (carefully).
- Medical-conference presence for clinician audience.
- KOL programs with clear ethics guardrails.

## AZRI-specific notes
- Saudi cultural calendar matters (Ramadan, Hajj, school terms).
- WhatsApp is dominant for patient-clinician communication; meet patients where they are while keeping PHI safe.
- Arabic SEO patterns differ from English; invest in proper Arabic keyword research.

## Open questions
- Marketing site CMS (Sanity vs Payload vs MDX-in-repo).
- Press kit hosting.
- Brand asset licensing.
