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
- [x] Scaffold `web/` (Next.js + Tailwind + shadcn/ui, Arabic-first, RTL). _(shadcn/ui deferred — Tailwind v4 in place.)_
- [ ] Scaffold `api/` (NestJS or Fastify) with health endpoint, OpenAPI, structured logging.
- [ ] CI: lint, type-check, unit, build matrix; axe; lighthouse-CI.
  - [x] Type-check + unit tests for `@azri/content` on a Node matrix (`.github/workflows/ci.yml`).
  - [x] Lint + type-check + build for `web/` (`.github/workflows/web-ci.yml`).
  - [ ] Build matrix for api (awaiting scaffold).
  - [x] axe + lighthouse-CI for `web/` (`.github/workflows/web-quality.yml` + `web/lighthouserc.json`). Lighthouse runs the axe-core engine for its accessibility category, so a single LHCI job covers both signals; a11y is a hard gate (≥0.9), perf/best-practices/SEO are warnings for the first baseline.
- [ ] Sentry + PostHog + Plausible/GA wired with PHI exclusions.
- [x] PR template enforcement for healthcare wording check *(embedded in `.github/PULL_REQUEST_TEMPLATE.md` — required checklist for user-visible copy)*.

### Priority 3 — product clarity
- [ ] Marketing pages skeleton (home, pricing, demo, contact, trust) *(blocked on v0.2.0 web scaffold; the bilingual content and page bindings are already shipped in `@azri/content`)*.
  - [x] Bilingual content + page bindings for marketing pages in `@azri/content` (`CONTENT_SYSTEM.md`).
  - [ ] Next.js consumer that actually renders the pages — awaits Priority 2 web scaffold.
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

- [x] Shared contracts package (`@azri/contracts`) wired into web, mobile, iOS, Wear OS, Whoop adapter, and API.
- [x] Fastify ingestion API skeleton with idempotent watch ingest, Whoop webhook (HMAC + replay-safe), episodes, and alerts. (Real persistence + auth wiring still pending.)
- [x] iOS app (SwiftUI) + watchOS companion skeleton with HealthKit authorizer + offline ingest queue. (Xcode project lands via XcodeGen.)
- [x] Wear OS companion skeleton with Health Services capability discovery, foreground service, and ingest queue.
- [x] Whoop OAuth2 + webhook + recovery / sleep / cycle normalisation.
- [x] Web `/app/*` patient routes (episode log, trends, alerts, caregivers) + `/console` doctor preview.
- [x] Expo / React Native patient app skeleton with bilingual + RTL flip.
- [x] CI lanes for contracts, api, whoop, wear-os, ios, and mobile.
- [ ] Replace in-memory `IdempotencyStore` with Redis-backed implementation before any production deploy.
- [ ] Persist watch + Whoop events to Postgres with row-level security; emit audit log rows.
- [ ] Wire ADR-0004 auth provider into API + watch ingest (per-install bearer tokens).
- [ ] Push fan-out service for `alert.raised` (APNs, FCM, watchOS / Wear OS).
- [ ] Caregiver consent persistence + invite + revoke flow (currently UI scaffold only).
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

## Discovered while doing v0.1.0

- [ ] CODEOWNERS placeholders need real human assignees once team is mapped.
- [ ] Set up GitHub branch protection on `main` (required reviews, required checks — include `CI`, `CodeQL`, `Docs validation`).
- [x] Renovate vs Dependabot decision — went with **Dependabot** (native grouping for minor/patch now covers the original Renovate motivation); revisit via ADR if institutional tier needs cross-package grouping.
- [ ] Decide marketing site CMS (or stay MDX-in-repo).
