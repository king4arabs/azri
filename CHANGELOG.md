# Changelog

All notable changes to AZRI are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and AZRI adheres to [Semantic Versioning](https://semver.org/) — see [`VERSION.md`](./VERSION.md).

> Each entry should answer: **What changed? Why? Who is affected? Any migration?**

## [Unreleased]

Planned for `v0.2.0` — see [`ROADMAP.md`](./ROADMAP.md):
- Web app scaffolding (Next.js + Tailwind + shadcn/ui, Arabic-first, RTL)
- API skeleton with OpenAPI contract and health endpoints
- Auth provider decision finalized in `DECISIONS.md` (ADR-0004)
- CI workflows for lint/test/build matrix
- Initial analytics event taxonomy wired (PostHog + privacy-safe marketing analytics)

---

## [0.1.0] — 2026-04-22 — *Repository Operating System Baseline*

First structured baseline release. Establishes the documentation, standards, governance, and SKILLS framework that future engineering, product, design, security, and operations work will follow. **No application code is included.**

### Added — Repository operating system
- `README.md` upgraded from a 2-line stub to a complete project entry point with product surfaces, status, document map, target stack, and contribution guidance.
- `PROJECT_STATUS.md` — live audit and severity-rated gap assessment across 30 audit dimensions.
- `ROADMAP.md` — phased plan from `v0.1.0` to `v1.0.0` covering platform, product, growth, and scale.
- `ARCHITECTURE.md` — target architecture, module boundaries, data flows, ADR pointers.
- `DEPLOYMENT.md` — environments, deploy paths, rollback strategy.
- `TESTING.md` — test pyramid, gates, accessibility & i18n regression posture.
- `SECURITY.md` — security baseline, secrets policy, RBAC posture, responsible disclosure.
- `OPERATIONS.md` — day-2 operations, on-call, SLOs.
- `OBSERVABILITY.md` — logging/metrics/tracing standards and dashboards.
- `INCIDENT_RESPONSE.md` — severity matrix, comms protocol, postmortem template.
- `RUNBOOKS.md` — concrete on-call procedures (skeleton).
- `RELEASE_PROCESS.md` — semver, branching, tagging, and ship checklist.
- `BUSINESS_CONTEXT.md` — personas, journeys, value, pricing logic.
- `MARKETING_GROWTH.md` — acquisition, conversion, retention, content.
- `DECISIONS.md` — ADR log seeded with foundational decisions.
- `TODO.md` — prioritized backlog mapped to roadmap phases.
- `VERSION.md` — semver policy and history.
- `CONTRIBUTING.md` — branch/PR/commit conventions.
- `CHANGELOG.md` — this file.

### Added — Platform docs
- `API_DOCUMENTATION.md` — API conventions (REST + gradual GraphQL stance), versioning, error model.
- `SDK_DOCUMENTATION.md` — future SDK plan (web/iOS/Android/server).
- `DATA_MODEL.md` — canonical entities and data classification.
- `ANALYTICS.md` — event taxonomy and metrics framework.
- `ACCESSIBILITY.md` — WCAG 2.2 AA target, healthcare-specific a11y patterns.
- `I18N_L10N.md` — Arabic-first, RTL/LTR, locale negotiation, content workflow.
- `COMPLIANCE_READINESS.md` — KSA / GCC / global posture (no fabricated certifications).

### Added — SKILLS framework (`SKILLS/`)
- `SKILLS/README.md` plus 21 domain skill files: frontend, backend, database, devops, security, qa, ai, product, business, marketing, operations, compliance, integrations, saudi_gcc_readiness, ux_ui, accessibility, analytics, observability, healthcare_product, privacy_data_governance, release_management.

### Added — GitHub repository hygiene
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/ISSUE_TEMPLATE/security_report.md`
- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/CODEOWNERS`
- `.github/workflows/docs-validation.yml` — markdown link & required-files validation gate.

### Changed
- `README.md` rewritten (preserving the canonical product URL `https://azri.ai`).

### Notes
- No application code is added in `0.1.0`. This release is intentionally documentation- and governance-only; it is the foundation that `0.2.0+` builds on.
- No fabricated certifications, partnerships, or clinical claims have been introduced. See `COMPLIANCE_READINESS.md` for the honest posture.

### Migration notes
- None. First baseline release.

[Unreleased]: https://github.com/king4arabs/azri/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/king4arabs/azri/releases/tag/v0.1.0
