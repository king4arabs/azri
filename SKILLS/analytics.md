# SKILLS — Analytics

## Purpose
Learn from usage without breaching privacy. Healthcare context demands rigorous PHI exclusions.

See `ANALYTICS.md` for the program-level taxonomy and metrics. This file is the engineer/PM rubric.

## What good looks like
- Every event documented in the registry; undeclared events fail CI.
- No PHI ever in payloads. Stable hashed IDs only.
- Funnels per persona instrumented end-to-end.
- Guardrail metrics (a11y, safety, support volume) tracked alongside primary KPIs.

## Standards
- Server-side event delivery preferred for PHI-adjacent surfaces.
- DPIA on file for every analytics tool used in production.
- Opt-out (browser DNT/GPC + explicit user toggle) respected.
- Marketing analytics cookieless on the marketing site by default.
- Event registry as code; reviewed in PR; required-property tests in CI.

## Anti-patterns
- Putting names, emails, phone numbers, medical details into event properties.
- Using analytics IDs as join keys to PHI data warehouses without strict access control.
- A/B testing patient-safety surfaces without guardrails.
- Tracking page views that include patient IDs in the URL.

## How to implement
- Use `packages/analytics` (when introduced) — never call the analytics SDK directly from feature code.
- Add the new event to the registry in the same PR that emits it.
- Document the funnel update in PRD or analytics doc.

## How to audit / test
- Type-level guard prevents undeclared events at compile time.
- Quarterly PHI-leak audit of events in production.
- Per-release dashboard health check.

## How to scale
- Self-host PostHog in KSA region from day one when feasible.
- Per-tenant analytics views for institutional customers.
- Experimentation framework (PostHog flags or dedicated platform).

## AZRI-specific notes
- North-star: Weekly Active Care Loops.
- Locale + direction tracked on every event for i18n quality signal.
- Alert content **never** logged in analytics; only counts and outcomes.

## Open questions
- Self-host vs cloud PostHog.
- Funnel schemas for institutional customers.
- Data warehouse strategy for cohort analysis.
