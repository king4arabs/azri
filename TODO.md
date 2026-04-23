# TODO

> Prioritized backlog mapped to roadmap phases. Severity uses `PROJECT_STATUS.md` ratings.
> Move items to `CHANGELOG.md` when shipped. Groom weekly.

## Now (v0.1.0 → v0.2.0 transition)

### Priority 1 — trust, safety, foundation
- [ ] Decide and record license (ADR-0003).
- [ ] Decide auth provider (ADR-0004) before any user-facing surface.
- [ ] Confirm cloud region / data residency policy (ADR-0007).
- [ ] Add `security@azri.ai` mailbox + GitHub Security Advisories enabled *(repo-admin action; mailbox provisioning outside code)*.
- [x] Enable Dependabot (`.github/dependabot.yml`) + CodeQL (`.github/workflows/codeql.yml`).
- [ ] Enable GitHub secret scanning + push protection on the repository *(repo-admin setting; not expressible in-repo)*.
- [x] Define `.env.example` policy (no real values, every key documented) — see `SECURITY.md#env-example-policy`. Enforcement applied at first scaffold.
- [x] Bring KSA data classification table into `DATA_MODEL.md` (PDPL + NDMO mapping + residency + consent; *legal review still required before v0.7.0 launch*).

### Priority 2 — platform clarity
- [x] Scaffold `web/` (Next.js App Router + Tailwind v4, Arabic-first, RTL) — ADR-0011. Consumes `@azri/content` via binding-driven section renderers (`web/components/sections.tsx`). shadcn/ui deferred — to materialise as `packages/ui` once the first interactive flow needs it.
- [x] Scaffold `api/` (Fastify 5 + TS + Pino + OpenAPI) — ADR-0012. Health/readiness/version only; no auth, no DB yet.
- [ ] CI: lint, type-check, unit, build matrix; axe; lighthouse-CI — unified in `.github/workflows/ci.yml` (workspaces-aware).
  - [x] Type-check + unit tests for `@azri/content` on Node 20/22.
  - [x] Lint + type-check + build for `@azri/web` on Node 20/22 (ESLint flat config via `eslint-config-next`).
  - [x] Type-check + build + unit tests for `@azri/api` on Node 20/22.
  - [ ] Extend lint step to `@azri/content` + `@azri/api` (awaiting flat-config for non-web packages).
  - [ ] axe + lighthouse-CI (awaiting first interactive UI surface beyond the static marketing scaffold).
  - [ ] iOS / watchOS build on a macOS runner (awaits Xcode Cloud or self-hosted mac; tracked in "Discovered while doing v0.2.0").
- [ ] Sentry + PostHog + Plausible/GA wired with PHI exclusions.
- [x] PR template enforcement for healthcare wording check *(embedded in `.github/PULL_REQUEST_TEMPLATE.md` — required checklist for user-visible copy)*.

### Priority 3 — product clarity
- [x] Marketing pages skeleton — `web/` scaffold renders `/ar` and `/en` home + pricing from `@azri/content`. Remaining marketing surfaces (demo, contact, trust, about, solutions, …) have bindings in `@azri/content/page-bindings` but no renderers yet; follow-up task below.
  - [x] Bilingual content + page bindings for marketing pages in `@azri/content` (`CONTENT_SYSTEM.md`).
  - [x] Next.js consumer (`web/`) rendering hero, whyAzri, Apple Watch readiness, pricing.
  - [ ] Renderers for remaining page bindings (about, solutions, patientsFamilies, doctors, institutions, technology, faq, contact).
- [ ] Pricing copy reflects multi-tier offering (`BUSINESS_CONTEXT.md`) *(blocked on marketing decision; see `BUSINESS_CONTEXT.md#current-state-vs-target`)*.
  - Today's `@azri/content` pricing mirrors the live `azri.ai` site (4 tiers: basic / advanced / insuranceDoctors / enterprise).
  - `BUSINESS_CONTEXT.md` defines an aspirational 5-tier intent (Free / Care+ / Doctor / Clinic / Enterprise).
  - Reconciliation requires decisions on SKU naming (incl. native Arabic names), trial length, Doctor-tier pricing basis, and Insurer-tier pricing model — tracked as open questions.
- [x] Plain-language privacy notice in Arabic + English → [`PRIVACY_NOTICE.md`](./PRIVACY_NOTICE.md) (v0.1.0 draft; legal + native-KSA review and mailbox provisioning still required before production).
- [x] Public AI transparency page draft → [`AI_TRANSPARENCY.md`](./AI_TRANSPARENCY.md) (v0.1.0 baseline; updated release-by-release as AI features land).

## Next (v0.3.0)

- [ ] Doctor dashboard MVP (auth, patient list, episode timeline, report export).
- [ ] Audit log infra + assertion tests.
- [ ] Per-tenant data export and deletion endpoints.
- [ ] Contract tests against OpenAPI.
- [ ] First synthetic monitor for emergency notification path.

## Later (v0.4.0+)

- [ ] iOS app + HealthKit + Apple Watch companion — full production build, App Store submission, and clinical-advisor review.
  - [x] Swift source scaffold in `ios/` (SwiftUI + WatchKit + HealthKit read-only) — ADR-0013; `ios/BUILDING.md` documents how to regenerate the Xcode project locally.
  - [ ] macOS CI runner (Xcode Cloud or self-hosted) running `xcodebuild` on each PR.
  - [ ] Real bundle identifier, Team ID, provisioning profiles.
  - [ ] Live connection to `@azri/api` under ADR-0004 auth.
  - [ ] App Privacy questionnaire answered from `PRIVACY_NOTICE.md`.
  - [ ] Arabic-first App Store metadata reviewed by native KSA speaker.
- [ ] Caregiver consent-scoped invite flow.
- [ ] Institutional tenancy: SSO, RBAC, billing.
- [ ] AI-assisted clinical summaries with strict guardrails.
- [ ] KSA pen-test #1.
- [ ] DR drill (RTO/RPO measurement).
- [ ] GCC market expansion playbook.

## Repository hygiene (continuous)

- [ ] Keep `PROJECT_STATUS.md` accurate every release.
- [ ] Keep `DECISIONS.md` updated for every material decision.
- [ ] Quarterly review of all SKILLS files.
- [ ] Quarterly access review.
- [ ] Annual threat-model refresh.

## Discovered while doing v0.2.0 scaffolds

- [ ] ESLint flat-config policy for the repository (`@azri/content`, `@azri/api`, `@azri/web`) so the `lint` step in `.github/workflows/ci.yml` can switch from pending to enforced.
- [ ] macOS runner for iOS CI (Xcode Cloud vs self-hosted mac); scope budget before v0.4.0.
- [ ] Root workspace manifest (npm/pnpm/turbo) now that three local packages share dependencies — evaluate when a fourth lands.
- [ ] `packages/ui` materialisation (shadcn/ui copy-in) when the first non-trivial interactive flow lands in `web/`.

## Discovered while doing v0.1.0

- [ ] CODEOWNERS placeholders need real human assignees once team is mapped.
- [ ] Set up GitHub branch protection on `main` (required reviews, required checks — include `CI`, `CodeQL`, `Docs validation`).
- [x] Renovate vs Dependabot decision — went with **Dependabot** (native grouping for minor/patch now covers the original Renovate motivation); revisit via ADR if institutional tier needs cross-package grouping.
- [ ] Decide marketing site CMS (or stay MDX-in-repo).
