# ROADMAP

> Phased delivery plan for AZRI from `v0.1.0` (today) to `v1.0.0` (production-grade, regionally launched).
> Each phase ships as a versioned release with `CHANGELOG.md` entries.
> Dates are intentionally omitted; phases are scoped, not time-boxed.

## North star

A production-grade, medically credible, security-hardened, bilingual, regionally optimized epilepsy care platform that patients, families, doctors, and institutions trust — Saudi Arabia first, then GCC, MENA, and global.

## Phase map

```
v0.1.0  Repository OS baseline           ← we are here
v0.2.0  Web foundation & auth
v0.3.0  Doctor dashboard MVP & API
v0.4.0  Patient mobile app + HealthKit + Apple Watch
v0.5.0  Institutional SaaS (RBAC, audit, billing)
v0.6.0  AI assistance (guardrailed)
v0.7.0  KSA launch hardening
v0.8.0  GCC expansion
v0.9.0  Compliance audits & enterprise readiness
v1.0.0  General availability
```

## v0.1.0 — Repository OS Baseline (current)
- Documentation, SKILLS, ADRs, GitHub templates, docs CI gate.
- **Outcome:** Future contributors have a clear standard to follow.

## v0.2.0 — Web foundation & auth
- Next.js (App Router) scaffold with Tailwind + shadcn/ui, Arabic-first + RTL.
- Marketing pages + pricing + contact/demo (or interim integration with `azri.ai`).
- Auth provider chosen and wired (ADR-0004).
- API skeleton (Node or FastAPI) with OpenAPI, healthchecks, rate limiting.
- CI: lint, type-check, unit tests, build matrix, axe, lighthouse-CI.
- Sentry baseline + PostHog + privacy-safe marketing analytics.
- `.env.example` + secrets policy enforced.
- **Outcome:** A safe, observable, bilingual web foundation.

## v0.3.0 — Doctor dashboard MVP & API
- Doctor authentication, RBAC, patient list, episode timeline, report export (PDF).
- Audit log for every PHI access.
- API: patients, episodes, reports, organizations.
- Integration tests + contract tests against OpenAPI.
- **Outcome:** Doctors can review patient data with full audit trails.

## v0.4.0 — Patient mobile app + watch & wearable integrations
- Shared schema package `@azri/contracts` (Zod) — single source of truth for the wire format across web, mobile, watchOS, Wear OS, Whoop adapter, and the API. ADR-0009.
- Fastify ingestion API (`@azri/api`) — idempotent batch ingest endpoint, Whoop webhook receiver with HMAC verification + replay protection, episode + alert relay endpoints, OpenAPI UI. ADR-0011.
- iOS app (SwiftUI), Arabic-first; HealthKit read scopes narrowly defined; Apple Watch companion for on-wrist alerts and one-tap quick-episode logging via WatchConnectivity.
- Wear OS companion (`apps/wear-os/`) for Samsung Galaxy Watch 4+ and other Wear OS watches — Kotlin + Compose, Health Services API, foreground biosignal capture. Tizen / Galaxy Watch 3 documented as unsupported with phone-side bridge fallback (ADR-0009).
- Whoop integration (`integrations/whoop/`) — OAuth2 link, refresh-token rotation, recovery / sleep / cycle pull, normalisation to `BiosignalBatchEvent`s.
- Expo / React Native patient app (`apps/mobile/`) for cross-platform parity until a native Android Health Connect path is justified.
- Caregiver consent-scoped invite flow (web `/app/caregivers`).
- **Outcome:** Patients can self-monitor across Apple Watch, Whoop, and Wear OS; caregivers can be looped in safely.

## v0.5.0 — Institutional SaaS (RBAC, audit, billing)
- Organization tenancy, SSO (SAML/OIDC), role hierarchy.
- Plan/billing flows (Stripe + Moyasar), invoices, procurement-friendly export.
- Admin console.
- **Outcome:** Hospitals/clinics/insurers can self-serve onboarding.

## v0.6.0 — AI assistance (guardrailed)
- LLM-assisted clinical summaries with citation-to-source-events, never hallucinated.
- Strict prompt and PHI-handling boundaries; audit every AI inference.
- Human-in-the-loop required for any clinician-facing AI output.
- **Outcome:** AI accelerates doctor workflow without overreach.

## v0.7.0 — KSA launch hardening
- KSA data residency confirmed; DPIA completed.
- Arabic content review pass; KSA-specific support channels.
- Pen-test #1; SOC-style controls dry run.
- **Outcome:** Ready to onboard real KSA patients & clinics.

## v0.8.0 — GCC expansion
- UAE / Bahrain / Kuwait / Qatar / Oman onboarding.
- Local payment methods, locale and dialect refinements, partner integrations.
- **Outcome:** Repeatable GCC market entry playbook.

## v0.9.0 — Compliance audits & enterprise readiness
- ISO 27001 readiness; HIPAA-style controls evidence; vendor-risk pack.
- DR drills, RTO/RPO measured.
- **Outcome:** Enterprise procurement passes.

## v1.0.0 — General availability
- Public stable APIs, public SDKs, multi-region, signed contracts with anchor customers.
- **Outcome:** GA.

## Cross-cutting workstreams (run continuously)

- **Accessibility** — every release improves a11y; never regresses.
- **Bilingual quality** — Arabic copy reviewed by native KSA speaker, not translated.
- **Security** — quarterly review, dependency hygiene, pen-tests.
- **Documentation** — never drift from code.
- **Observability** — SLOs reviewed monthly.
- **Backlog grooming** — `TODO.md` reflects reality.
