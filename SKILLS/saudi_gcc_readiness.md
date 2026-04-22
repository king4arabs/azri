# SKILLS — Saudi & GCC Readiness

## Purpose
Make AZRI excellent for Saudi Arabia first, GCC next, MENA after, then global. Region is a first-class engineering and product constraint, not a translation pass.

## What good looks like
- Arabic-first product surfaces, authored by native KSA speakers.
- KSA data residency posture clear and configurable per institutional customer.
- KSA payment methods (Mada, Apple Pay KSA, STC Pay if relevant) supported in paid tiers.
- Hijri calendar option respected; cultural calendar reflected (Ramadan, Hajj).
- KSA procurement & DPA processes accommodated, not improvised.

## Standards
- **Locale:** `ar-SA` is the source of truth; English mirrors. See `I18N_L10N.md`.
- **Direction:** layouts use logical CSS properties; verified in both directions.
- **Data residency:** AWS `me-south-1` (Bahrain) default; in-Kingdom partner option for institutional contracts (ADR-0007).
- **Payments:** Moyasar for KSA-native methods; Stripe global. Currency presented in SAR by default for KSA users.
- **Compliance:** KSA PDPL primary; align with NHIC / SDAIA / NCA guidance.
- **Communication patterns:** WhatsApp is dominant; meet patients there safely (no PHI in WhatsApp without documented consent and PHI-safe channel).
- **Calendar/time:** Hijri/Gregorian toggle; KSA timezone awareness; respect Ramadan working patterns in support hours and outbound communications.
- **Names:** support full Arabic naming patterns (multiple given names, tribal names) in length and rendering.

## Anti-patterns
- Translating English copy into Arabic mechanically.
- Reusing global-default consent text for KSA without legal review.
- Assuming GCC = single market (KW/BH/QA/AE/OM each have nuances).
- Ignoring Hijri-aware date contexts in patient-facing surfaces.
- Hard-coded numeric formats (Western-only digits).

## How to implement
- Native-speaker review on all Arabic patient/clinician copy (PR template gate).
- Locale-aware testing with `ar_SA` Faker locale.
- Per-tenant residency configuration available from v0.5.0.
- Mada / Apple Pay KSA integrated in v0.2.0 paid tier.

## How to audit / test
- Quarterly KSA UX audit: a real KSA user walks the primary journeys.
- Quarterly compliance check against PDPL & sector guidance.
- Quarterly localization audit (untranslated strings, cultural mismatches).

## How to scale
- GCC expansion playbook (v0.8.0): add `ar-AE`, `ar-BH`, etc., dialect refinements, local payment methods, partner channels.
- MENA next: Egypt market specifics (currency, compliance).
- Global readiness as the architecture matures.

## AZRI-specific notes
- Government and quasi-government healthcare programs are real partners; engagement timelines are long.
- Family decision-making patterns matter: caregiver consent flows must respect family roles authentically (e.g. spouse/parent/adult child as legitimate caregivers).
- Patient dignity has cultural specifics — design and copy reviewed accordingly.

## Open questions
- KSA in-Kingdom partner pick.
- STC Pay / SADAD support priority.
- Arabic dialect strategy for non-KSA GCC.
