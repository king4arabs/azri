# ANALYTICS

> Event taxonomy and metrics framework for AZRI. Privacy-first by design — **PHI never enters analytics payloads**.

## Tooling (target)

- **Product analytics:** PostHog (self-host or EU/region-appropriate cloud) — strict PHI exclusions.
- **Marketing analytics:** Plausible (cookieless, EU-hosted) for the marketing site; GA only if a measurable need arises and DPIA passes.
- **Server-side events:** sent through a thin internal collector that strips PHI and enriches with safe context (tenant id, plan tier, locale, AB-test variant).

## Privacy rules (non-negotiable)

1. **No PHI** in event payloads. Ever. Includes names, emails, phone numbers, medical details, signal values, episode notes.
2. **No raw IPs** or precise geolocation in product analytics.
3. **Stable hashed IDs** for users (e.g. HMAC of user UUID with a per-environment salt).
4. **Opt-out respected** — both browser DNT/GPC and explicit preference toggle.
5. **Server-side preferred** for any event that could leak PHI client-side.
6. **DPIA on file** for every analytics tool used in production.

## Event naming

`<surface>_<object>_<action>` in snake_case. Past tense for completed actions, present tense for state.

- `marketing_pricing_viewed`
- `auth_signup_started` / `auth_signup_completed` / `auth_signup_failed`
- `patient_device_connected`
- `patient_first_summary_viewed`
- `caregiver_invite_sent` / `caregiver_invite_accepted` / `caregiver_invite_revoked`
- `doctor_patient_opened`
- `doctor_report_exported`
- `institution_lead_submitted`
- `alert_displayed` / `alert_acknowledged` / `alert_dismissed` (note: alert *content* never logged)
- `billing_plan_upgraded` / `billing_plan_downgraded` / `billing_payment_failed`

## Required properties (every event)

| Property | Why |
| --- | --- |
| `tenant_id` (hashed) | Segmentation; never the raw value |
| `plan_tier` | Cohorting |
| `role` | Patient / caregiver / doctor / admin |
| `locale` (`ar-SA`, `en`) | Regional analysis |
| `direction` (`rtl`/`ltr`) | i18n quality signal |
| `app_version` | Release attribution |
| `ab_variants` | Experimentation |
| `surface` | `web_app`, `web_marketing`, `web_console`, `ios_app`, `watch_app` |

## Forbidden properties

- Any patient identifying info.
- Any clinical content (medications, diagnoses, signal values, episode notes).
- Any free-text user input.
- Any token, secret, or session identifier.

## Metrics framework

### North-star metric (proposed)
**Weekly Active Care Loops** — patient generates monitoring data **and** the data is consumed by either the patient (summary opened) or a clinician/caregiver in the same week.

### Acquisition
- Unique visitors (marketing)
- Marketing-qualified leads (demo / contact)
- Sign-ups by tier intent

### Activation
- % patients connecting a device within 7 days
- % patients reaching first weekly summary (Day 8 magic moment)
- % doctors completing first report export within 14 days

### Retention
- WAU/MAU
- 4 / 8 / 12-week patient retention by cohort
- Doctor weekly active

### Revenue
- ARR by tier and region
- Expansion: free → Care+, Doctor → Clinic, Clinic → Enterprise
- Logo retention, NRR

### Quality
- Alert precision/recall (when measurable & ground truth is reliable)
- Crash-free sessions
- p95 latency on critical journeys
- Support tickets per 1k MAU
- Accessibility violations per release (target: 0 critical)
- Localization gaps reported (target: 0 untranslated strings in production)

### Regional segmentation
- KSA vs other GCC vs MENA vs RoW
- Arabic vs English usage
- RTL vs LTR sessions

## Wiring plan (v0.2.0)

1. Internal event collector library (`packages/analytics`) with PHI guard at the type level.
2. PostHog SDK + server-side proxy (no third-party cookies on the client).
3. Plausible script on marketing site only.
4. Event registry as code (`packages/analytics/events.ts`) — adding an undeclared event fails CI.

## Open items

- Whether to self-host PostHog in KSA region from day one.
- A/B testing tool: PostHog flags vs dedicated platform.
- Funnel definitions per persona — owned by PM.
