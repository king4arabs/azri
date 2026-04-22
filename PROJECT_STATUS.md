# PROJECT_STATUS

> Live audit of the AZRI repository. Severity ratings are honest and based on observable repository evidence.
> Last updated: **2026-04-22** (Unreleased — content system landed).

## Maturity assessment (executive summary)

| Domain | Maturity | Notes |
| --- | --- | --- |
| Repository operating system | **L2 — Defined** (just established in v0.1.0) | Docs and SKILLS framework now exist; need to be lived. |
| Application code | **L1 — Initial** | Shared bilingual content package (`@azri/content`) is the first code committed; no UI surfaces yet. |
| CI/CD | **L1 — Initial** | Only docs validation workflow. No build/test/deploy. |
| Security baseline | **L1 — Initial** | Policy documented; no code surface to harden yet. |
| Privacy / compliance | **L1 — Initial** | Posture written; not certified. |
| Product surfaces | **L0 — Not in repo** | Public site exists at `azri.ai`; not in this repository. |
| Observability | **L0 — None** | To establish in v0.3.0. |
| Analytics | **L1 — Defined** | Event taxonomy drafted; not wired. |
| i18n / RTL | **L2 — Defined** | Strategy + bilingual content schema + RTL/LTR helpers in place; awaiting UI consumer. |
| Accessibility | **L1 — Defined** | WCAG 2.2 AA target documented; no UI yet. |

Maturity scale: L0 None → L1 Initial → L2 Defined → L3 Repeatable → L4 Measured → L5 Optimized.

## Audit (30 dimensions)

| # | Audit area | Current state | Gap | Severity | Recommended action | Dependencies |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Repository structure | Only `README.md` (2 lines) | No docs, no code, no CI | **High** | Bootstrap repo OS (this PR) | — |
| 2 | Stack detection | None detectable | Stack must be declared in docs first | High | `ARCHITECTURE.md` + `SKILLS/integrations.md` | Audit #1 |
| 3 | Product surfaces | Live at `azri.ai` (external) | Not in repo | High | Bring marketing/web into repo in v0.2.0 | Stack decision |
| 4 | Code quality | No code | — | n/a | Define linters in `TESTING.md` ahead of code | — |
| 5 | Architecture quality | None | No diagrams, no boundaries | High | `ARCHITECTURE.md` | — |
| 6 | Env var management | None | No `.env.example`, no policy | High | Document in `SECURITY.md`; create `.env.example` with code | Code arrives |
| 7 | Security issues | Unknown (no code) | No baseline | High | `SECURITY.md` baseline + `SKILLS/security.md` | — |
| 8 | Auth/authorization | None | RBAC undefined | **Critical** before code lands | Define in `ARCHITECTURE.md`; ADR-0004 in `DECISIONS.md` | — |
| 9 | DB design / migrations | None | No schema, no migration tool | High | `DATA_MODEL.md` outlines entities; choose Prisma/Drizzle/Alembic in ADR-0005 | — |
| 10 | API shape & docs | None | No spec | High | `API_DOCUMENTATION.md` defines conventions; OpenAPI in v0.2.0 | — |
| 11 | Frontend consistency | None | No design tokens | Medium | `SKILLS/ux_ui.md` defines design system intent | UI scaffold |
| 12 | UI system / design debt | None | — | Medium | shadcn/ui + Tailwind tokens (ADR-0006) | UI scaffold |
| 13 | Arabic/English support | Bilingual content schema landed in `@azri/content` (both `ar`+`en` enforced); no UI consumer yet | **Critical** for KSA-first product | High (was Critical) | Wire UI in v0.2.0 web scaffold; keep `I18N_L10N.md` Arabic-first reviews mandatory | UI scaffold |
| 14 | RTL/LTR support | RTL/LTR helpers (`getDirection`, `localeAttributes`) shipped in `@azri/content`; logical-CSS guidance documented | — | High (was Critical) | Apply logical CSS properties from day 1 in v0.2.0 web scaffold | UI scaffold |
| 15 | Accessibility | None | Healthcare context demands strong a11y | **Critical** | `ACCESSIBILITY.md` mandates WCAG 2.2 AA; axe in CI | UI scaffold |
| 16 | Tests / coverage | None | — | High | `TESTING.md` defines pyramid + gates | Code arrives |
| 17 | CI/CD | docs-validation only | No code pipelines | High | Add lint/test/build matrix in v0.2.0 | Code arrives |
| 18 | Deployment readiness | None | — | High | `DEPLOYMENT.md` outlines envs; provision in v0.3.0 | Cloud account |
| 19 | Observability / analytics | None | — | High | `OBSERVABILITY.md`, `ANALYTICS.md` | Code arrives |
| 20 | SEO / metadata | `seo` section (titles + default description, AR/EN) shipped in `@azri/content`; external `azri.ai` site not yet in repo | Web app must consume the SEO source on render | Medium | Wire `<Metadata>` to `azriContent.seo.pages[pageId]` in v0.2.0 | Web scaffold |
| 21 | Privacy / compliance | Posture documented | No certification, no DPA templates | High | `COMPLIANCE_READINESS.md` honest posture; track audits | Legal |
| 22 | Healthcare wording / disclaimers | Documented | Must be enforced in copy | High | `SKILLS/healthcare_product.md` + PR template gate | Content review |
| 23 | Performance | Unknown | — | Medium | `OPERATIONS.md` defines SLOs; perf budgets in v0.3.0 | Code arrives |
| 24 | Mobile readiness | None | — | High | iOS-first per `ARCHITECTURE.md`; HealthKit in v0.4.0 | Apple developer account |
| 25 | Doctor/institution workflow | None | — | High | Designed in `BUSINESS_CONTEXT.md`; built v0.5.0 | UX research |
| 26 | Apple Watch / HealthKit | None | — | Medium | Pilot in v0.4.0 | iOS app exists |
| 27 | Documentation completeness | Now strong (v0.1.0) | Must stay current | Medium | Docs validation workflow + PR template gate | — |
| 28 | Release process maturity | Defined | Not yet exercised on code | Medium | First real release at v0.2.0 | Code arrives |
| 29 | Backlog quality | `TODO.md` seeded | Needs continuous grooming | Low | PM ownership | PM hire/owner |
| 30 | Growth / conversion instrumentation | Defined in `ANALYTICS.md` | Not wired | Medium | Wire with web scaffold | Web scaffold |

## Top risks

1. **Healthcare overclaim risk.** Until the marketing site is governed via this repo, claims may drift outside the boundaries in `SKILLS/healthcare_product.md`. Mitigation: bring the site into the repo (v0.2.0) and add a content-review PR gate.
2. **PII / health data handling without code in place.** Documenting strong posture is necessary but not sufficient. Mitigation: every code-introducing PR must extend `SECURITY.md` and `DATA_MODEL.md` with the new surface's classification.
3. **i18n/RTL debt.** RTL added late always hurts. Mitigation: enforce Arabic-first reviews from the very first UI commit (`SKILLS/i18n_l10n.md` not yet present — covered by `I18N_L10N.md` and `SKILLS/saudi_gcc_readiness.md`).
4. **Auth/RBAC ambiguity.** Pick the auth provider before any user-facing surface ships (ADR-0004 — open).
5. **Vendor lock-in / data residency.** KSA data residency must be a constraint on cloud and DB choices, not an afterthought.

## What changed in this cycle (v0.1.0)

- Established the repository operating system and SKILLS framework.
- Filed seed ADRs in `DECISIONS.md`.
- Added GitHub PR/issue templates, CODEOWNERS, docs validation workflow.

## Open questions (carry to next cycle)

- Who owns CODEOWNERS once humans are assigned?
- KSA data residency: AWS `me-south-1` (Bahrain) vs in-Kingdom partner (e.g. STC Cloud / Oracle KSA)?
- Auth: Clerk vs Auth0 vs SuperTokens (self-host) — health context favors stricter audit & on-prem options.
- License choice (ADR-0003).
- Marketing site: stays separate or migrates into repo?
