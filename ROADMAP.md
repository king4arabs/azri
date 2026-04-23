# ROADMAP

> Phased delivery plan for AZRI from `v0.1.0` (today) to `v1.0.0` (production-grade, regionally launched).
> Each phase ships as a versioned release with `CHANGELOG.md` entries.
> Dates are intentionally omitted; phases are scoped, not time-boxed.

## North star

A production-grade, medically credible, security-hardened, bilingual, regionally optimized epilepsy care platform that patients, families, doctors, and institutions trust — Saudi Arabia first, then GCC, MENA, and global.

## Phase map

```
v0.1.0  Repository OS baseline            done
v0.2.0  Web foundation & auth             ← we are here (scaffolds landed; auth pending ADR-0004)
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

Scaffolds landed:
- `web/` — Next.js 15 App Router + Tailwind v4, Arabic-first with RTL, consumes `@azri/content`. Home + pricing rendered. (ADR-0011)
- `api/` — Fastify 5 + TS + Pino + OpenAPI; health/readiness/version; CORS, helmet, rate limiting; PHI-redacted structured logs. (ADR-0012)
- `ios/` — SwiftUI iPhone + Apple Watch companion with read-only HealthKit. (ADR-0013)
- CI: type-check + build + tests matrix for `content`/`api`/`web` on Node 20/22.
- `.env.example` policy applied at first scaffold (`api/.env.example`, `web/.env.example`).

Still open:
- Auth provider chosen and wired (ADR-0004) — **blocking user-facing surfaces.**
- axe / Lighthouse-CI gate (awaits first interactive UI).
- Sentry baseline + PostHog + privacy-safe marketing analytics.
- Repo-wide ESLint flat config.
- iOS CI on a macOS runner.
- **Outcome:** A safe, observable, bilingual web foundation — partial; auth is the last blocker.

## v0.3.0 — Doctor dashboard MVP & API
- Doctor authentication, RBAC, patient list, episode timeline, report export (PDF).
- Audit log for every PHI access.
- API: patients, episodes, reports, organizations.
- Integration tests + contract tests against OpenAPI.
- **Outcome:** Doctors can review patient data with full audit trails.

## v0.4.0 — Patient mobile app + HealthKit + Apple Watch
- iOS app (SwiftUI), Arabic-first.
- HealthKit read/write scoped narrowly; Apple Watch companion for passive signals + on-wrist alerts.
- Caregiver consent-scoped invite flow.
- **Outcome:** Patients can self-monitor; caregivers can be looped in safely.

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
