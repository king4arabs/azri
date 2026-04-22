# TODO

> Prioritized backlog mapped to roadmap phases. Severity uses `PROJECT_STATUS.md` ratings.
> Move items to `CHANGELOG.md` when shipped. Groom weekly.

## Now (v0.1.0 → v0.2.0 transition)

### Priority 1 — trust, safety, foundation
- [ ] Decide and record license (ADR-0003).
- [ ] Decide auth provider (ADR-0004) before any user-facing surface.
- [ ] Confirm cloud region / data residency policy (ADR-0007).
- [ ] Add `security@azri.ai` mailbox + GitHub Security Advisories enabled.
- [ ] Enable Dependabot + secret scanning + CodeQL on the repository.
- [ ] Define `.env.example` policy (no real values, every key documented) — applied at first scaffold.
- [ ] Bring KSA data classification table into `DATA_MODEL.md` once first schema is drafted.

### Priority 2 — platform clarity
- [ ] Scaffold `web/` (Next.js + Tailwind + shadcn/ui, Arabic-first, RTL).
- [ ] Scaffold `api/` (NestJS or Fastify) with health endpoint, OpenAPI, structured logging.
- [ ] CI: lint, type-check, unit, build matrix; axe; lighthouse-CI.
- [ ] Sentry + PostHog + Plausible/GA wired with PHI exclusions.
- [ ] PR template enforcement for healthcare wording check.

### Priority 3 — product clarity
- [ ] Marketing pages skeleton (or import from `azri.ai`): home, pricing, demo, contact, trust.
- [ ] Pricing copy reflects multi-tier offering (`BUSINESS_CONTEXT.md`).
- [ ] Plain-language privacy notice in Arabic + English.
- [ ] Public AI transparency page draft.

## Next (v0.3.0)

- [ ] Doctor dashboard MVP (auth, patient list, episode timeline, report export).
- [ ] Audit log infra + assertion tests.
- [ ] Per-tenant data export and deletion endpoints.
- [ ] Contract tests against OpenAPI.
- [ ] First synthetic monitor for emergency notification path.

## Later (v0.4.0+)

- [ ] iOS app + HealthKit + Apple Watch companion.
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

## Discovered while doing v0.1.0

- [ ] CODEOWNERS placeholders need real human assignees once team is mapped.
- [ ] Set up GitHub branch protection on `main` (required reviews, required checks).
- [ ] Consider Renovate vs Dependabot decision (lean Renovate for grouping).
- [ ] Decide marketing site CMS (or stay MDX-in-repo).
