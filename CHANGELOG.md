# Changelog

All notable changes to AZRI are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and AZRI adheres to [Semantic Versioning](https://semver.org/) — see [`VERSION.md`](./VERSION.md).

> Each entry should answer: **What changed? Why? Who is affected? Any migration?**

## [Unreleased]

### Added — Repository hygiene & CI (planned for `v0.2.0`)
- `.github/dependabot.yml` — weekly dependency updates for `github-actions` and `packages/content`, minor/patch grouped, major updates individually, with dedicated labels.
- `.github/workflows/codeql.yml` — CodeQL static analysis for JavaScript/TypeScript on push, PR, and a weekly schedule; uses `security-extended` + `security-and-quality` query packs. Implements the SECURITY.md "CodeQL + container image scanning in CI" baseline for the current code surface.
- `.github/workflows/ci.yml` — application-code CI. Runs `typecheck` + unit tests for `@azri/content` on a Node 20 / Node 22 matrix. Future packages (`web/`, `api/`, ...) will extend this workflow.

### Added — Public transparency
- `AI_TRANSPARENCY.md` — plain-language public statement on how AZRI uses (or does not yet use) AI. Documents today's posture (no production AI features ship in v0.1.0), the nine principles that will not be compromised, the data-handling model for future AI features, bias/safety/limitations acknowledgements, and how users can ask questions, opt out, or report concerns. Linked from `README.md` and added to the required-files check in `docs-validation.yml`.

### Changed
- `SECURITY.md` — added an explicit **`.env.example` policy** under *Secrets*: no real values, every key documented, no hidden keys, classification-grouped, enforced at first scaffold.
- `DATA_MODEL.md` — added a **KSA classification mapping** cross-referencing the internal 5-tier classification with PDPL categories, NDMO/SDAIA classification tiers, residency expectations (`me-south-1` default + in-Kingdom institutional option per ADR-0007), consent / lawful basis, and minimum controls. Mapping is explicitly marked as internal handling guidance pending Saudi privacy/healthcare counsel review (per `COMPLIANCE_READINESS.md` open items).
- `TODO.md` — checked off the KSA classification table item; groomed Priority 1/2 and "Discovered while doing v0.1.0" sections to reflect the Dependabot/CodeQL/CI landings, the `.env.example` policy definition, and the Renovate-vs-Dependabot decision.
- `PROJECT_STATUS.md` — updated CI/CD and security-baseline audit rows to reflect the new automated hygiene.

### Added — Content system (planned for `v0.2.0`)
- `packages/content/` — typed, framework-agnostic shared content package (`@azri/content`).
  - `src/types.ts` — strict TypeScript schema for all 27 content sections (brand, hero, whyAzri, audienceSegments, valuePropositions, productSuite, howItWorks, appleWatch, benefits, pricing, trustAndResponsibility, finalCTA, aboutPage, solutionsPage, patientsFamiliesPage, doctorsPage, institutionsPage, technologyPage, faqPage, contactPage, uiMicrocopy, seo, footer, medicalDisclaimer, brandMessage, sitemap, supportingNote).
  - `src/data/azri.ts` — bilingual (Arabic / English) source-of-truth content authored to AZRI's careful medical-wording policy (no diagnosis, prediction, cure, or clinician-replacement claims).
  - `src/locale.ts` — locale resolution (`resolveLocale`), RTL/LTR helpers (`getDirection`, `isRtl`, `localeAttributes`), and a safe locale picker (`pick`) with empty-string fallback.
  - `src/page-bindings.ts` — declarative mapping of website pages **and** app screens to content sections so web and app render the same source of truth without duplicating "what does the home page show?" logic.
  - `src/__tests__/azri.test.ts` — 15 sanity tests (built-in `node:test`) covering schema completeness, bilingual coverage, id uniqueness, disclaimer wording, and page-binding integrity.
- `CONTENT_SYSTEM.md` — architecture, schema reference, page-binding tables, web/app consumption examples, authoring workflow, and versioning rules for content updates.
- `DECISIONS.md` — **ADR-0010** records the decision to centralize bilingual content in `@azri/content` as a typed, framework-agnostic package.
- Root `.gitignore` added to keep `node_modules/`, build output, and local env files out of the repo.

### Changed
- `I18N_L10N.md` — added a "Content system" section pointing to `@azri/content` as the runtime mechanism that operationalizes the i18n strategy.
- `PROJECT_STATUS.md` — updated audit dimensions #13 (Arabic/English support), #14 (RTL/LTR), #20 (SEO/metadata) to reflect that the bilingual content schema and SEO source now exist (no UI consumer yet).
- `README.md` — added `CONTENT_SYSTEM.md` and `packages/content` to the document map.

### Notes
- No application code is wired to the content package yet — that lands with the web scaffold in `v0.2.0` and the patient/doctor surfaces in subsequent minors.
- Docs validation CI (`docs-validation.yml`) is unchanged; no required documentation files were removed or renamed.

### Still planned for `v0.2.0` — see [`ROADMAP.md`](./ROADMAP.md)
- Web app scaffolding (Next.js + Tailwind + shadcn/ui, Arabic-first, RTL) wired to `@azri/content`.
- API skeleton with OpenAPI contract and health endpoints.
- Auth provider decision finalized in `DECISIONS.md` (ADR-0004).
- CI workflows for lint/test/build matrix (will include `packages/content` typecheck + tests).
- Initial analytics event taxonomy wired (PostHog + privacy-safe marketing analytics).

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
