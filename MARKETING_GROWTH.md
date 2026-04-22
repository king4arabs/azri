# MARKETING_GROWTH

> Acquisition, conversion, retention, and content strategy for AZRI. Honest, healthcare-appropriate, KSA-first.

## Positioning

> **AZRI is human-centered AI for epilepsy monitoring and early warning — Saudi-first, dignity-first, doctor-aligned.**

Differentiators:
- Arabic-first, not Arabic-translated.
- KSA data residency posture from day one.
- Doctor-aligned reporting, not consumer-only.
- Dignity-preserving design — no scary metrics dashboards aimed at patients.
- Honest AI: assists, doesn't diagnose.

## Audiences & funnels

| Audience | Top of funnel | Conversion event | Retention signal |
| --- | --- | --- | --- |
| Patients | Search, social, advocacy partners | Free sign-up | Weekly summary opens |
| Caregivers | Patient invite, content | Caregiver invite accepted | Alert acknowledgement |
| Doctors | Direct outreach, conferences | Demo booked → trial | Weekly active reports |
| Institutions | Outbound, partner channels | "Talk to sales" → pilot | Pilot → contract |

## Channels (initial mix)

- **Owned:** marketing site, blog (Arabic + English), patient & doctor newsletters, in-product education.
- **Earned:** clinical KOL relationships, KSA medical media, patient communities (with care).
- **Paid (selectively):** search for high-intent terms (Arabic + English), LinkedIn for institutional decision-makers. **No targeting based on health status.**
- **Partnerships:** hospitals, clinics, patient associations, insurers, KSA digital health programs.

## Content strategy

- **Tone:** calm, clear, respectful, plain language.
- **Languages:** Arabic-first; English parallel.
- **Content pillars:**
  1. Living well with epilepsy (patient/caregiver value)
  2. Doctor workflow & evidence (clinical value)
  3. Trust & transparency (privacy, AI honesty, security)
  4. KSA & GCC healthcare context
- Every clinical claim is sourced. Anecdotes are clearly anecdotal.

## Trust surfaces

- A public **data & AI transparency** page (linked from product).
- A public **security overview** page (subset of `SECURITY.md`).
- A public **status page** (uptime, incidents) starting v0.7.0.
- Plain-language **privacy notice** in Arabic + English.

## Activation playbook (patient)

1. Sign-up in <60s, no card.
2. Welcome screen explains what AZRI does — and what it doesn't.
3. Connect device (HealthKit / Watch) — skippable, with re-prompt later.
4. First 7-day baseline; product is calm, not noisy.
5. Day 8: first weekly summary. **This is the magic moment.**

## Conversion events to instrument

See `ANALYTICS.md` for the full taxonomy. Key ones for growth:

- `marketing_pricing_viewed`
- `marketing_demo_requested`
- `auth_signup_completed` (with tier intent)
- `patient_device_connected`
- `patient_first_summary_viewed`
- `caregiver_invite_sent` / `caregiver_invite_accepted`
- `doctor_trial_started` / `doctor_first_report_exported`
- `institution_lead_submitted` / `institution_pilot_started`

> **PII / PHI must never enter analytics payloads.** Use stable hashed identifiers + tenant + locale + plan tier.

## Retention loops

- Weekly summary (gentle, opt-out per-channel).
- Doctor dashboard becomes more valuable the more episodes are logged.
- Caregiver relays create network effects within a household.
- Institutional pilots have a defined success scorecard reviewed monthly.

## Growth metrics

- **Acquisition:** unique visitors, marketing-qualified leads, demo requests.
- **Activation:** % of patients reaching first weekly summary.
- **Retention:** WAU / MAU; 4/8/12-week patient retention; doctor weekly active.
- **Revenue:** ARR by tier and region; expansion via institutional growth.
- **Quality:** alert precision/recall (when measurable), NPS-equivalent, support volume per 1k MAU.

## Anti-patterns (do not do)

- Fear-based marketing aimed at patients or families.
- Implying diagnosis or guaranteed prevention.
- Health-status–based ad targeting.
- Using patient testimonials without explicit, revocable consent.
- Translating Arabic from English with machine translation alone.

## KSA / GCC nuance

- Arabic copy reviewed by a native KSA speaker; dialect-aware where useful.
- Hijri-aware date displays where relevant.
- Local payment methods (Mada, Apple Pay KSA, STC Pay if applicable) for paid tiers.
- Government / hospital procurement processes accounted for in enterprise sales.

## Open items

- Marketing site CMS choice (Sanity vs Payload vs MDX-in-repo).
- Email service provider final pick.
- Press kit + brand guidelines.
