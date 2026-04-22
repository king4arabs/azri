# DECISIONS

> Architectural Decision Records (ADRs). Append-only. Each entry: **context → decision → consequences**.
> Status values: `proposed`, `accepted`, `superseded by ADR-NNNN`, `deprecated`.

---

## ADR-0001 — Establish a Repository Operating System
- **Status:** accepted (2026-04-22, v0.1.0)
- **Context:** Repository contained only a 2-line `README.md`. With AZRI's healthcare context and multi-persona surface area, ad-hoc evolution would create privacy, compliance, and quality risk.
- **Decision:** Bootstrap a complete repository operating system (top-level docs + `SKILLS/` + GitHub templates + docs validation CI) as a standalone v0.1.0 baseline release **before** any application code lands.
- **Consequences:**
  - + Future contributors have explicit standards.
  - + Privacy / compliance / a11y / i18n posture is set before code shapes habits.
  - − Adds upfront documentation overhead.
  - − Documents must be kept current; doc drift is a real risk (mitigated by docs validation workflow + PR template).

## ADR-0002 — Semantic Versioning + Keep a Changelog
- **Status:** accepted (2026-04-22, v0.1.0)
- **Context:** Need a predictable, public-friendly versioning and release narrative for healthcare audiences.
- **Decision:** Adopt SemVer 2.0.0 + Keep a Changelog 1.1.0 conventions, codified in `VERSION.md` and `RELEASE_PROCESS.md`.
- **Consequences:** Predictable releases; clear migration narrative; small overhead per change (acceptable).

## ADR-0003 — License (open question)
- **Status:** proposed
- **Context:** No license is currently declared. Healthcare commercial product with strong IP — likely proprietary; some peripheral packages might be permissive.
- **Decision (proposed):** Default the repository to "All rights reserved" until a license decision is made by leadership. Re-evaluate per-package as code lands.
- **Consequences:** External contribution path is gated until decided; document the policy clearly in `CONTRIBUTING.md`.

## ADR-0004 — Authentication provider (open)
- **Status:** proposed
- **Context:** Healthcare RBAC + MFA + audit + SSO + KSA residency = stricter requirements than typical SaaS. Candidates: Clerk, Auth0, SuperTokens (self-host), AWS Cognito, custom on Keycloak.
- **Decision (proposed):** Pilot Clerk in `staging` for v0.2.0 due to DX speed *only if* its data residency and audit features satisfy KSA constraints. Otherwise default to SuperTokens (self-host) for full data control. Final decision before any user-facing surface ships.
- **Consequences:** Affects every authenticated surface; reversal is expensive. Decision must include audit, MFA, SSO (SAML/OIDC), session security, and PHI-region story.

## ADR-0005 — Database & migrations (open)
- **Status:** proposed
- **Context:** PostgreSQL is selected as the primary store (`ARCHITECTURE.md`). Migration tooling depends on backend stack (Prisma vs Drizzle vs Knex vs Alembic).
- **Decision (proposed):** Decide alongside backend stack in v0.2.0. Bias toward typed migration tooling with strong schema introspection.
- **Consequences:** Locks the developer experience for backend authors.

## ADR-0006 — Design system foundation
- **Status:** proposed
- **Context:** Need an accessible, RTL-capable component library that we own.
- **Decision (proposed):** Tailwind CSS + shadcn/ui copied into `packages/ui`, customized with design tokens, explicit RTL support via logical properties and direction-aware variants.
- **Consequences:** Strong control + accessibility defaults; some maintenance burden vs a managed UI library.

## ADR-0007 — Cloud region & data residency (open)
- **Status:** proposed
- **Context:** KSA data residency expectations vary by data class and customer (especially institutional). AWS `me-south-1` (Bahrain) is the closest AWS region; in-Kingdom partners exist (e.g. Oracle KSA, STC Cloud).
- **Decision (proposed):** Default workloads to AWS `me-south-1`. For institutional customers requiring in-Kingdom hosting, plan a dedicated deployment topology (v0.5.0+). Reassess if regulatory guidance changes.
- **Consequences:** Two deployment topologies long-term; design with that constraint in mind from day one (no shared single-tenant assumptions).

## ADR-0008 — Compute platform (open)
- **Status:** proposed
- **Context:** ECS vs EKS for backend services.
- **Decision (proposed):** Start on ECS Fargate for v0.2.0–v0.3.0 (operational simplicity), revisit EKS at v0.5.0 if institutional scale demands richer platform features.
- **Consequences:** Some Kubernetes-only tooling deferred; portability via OpenTelemetry + container-native code.

## ADR-0010 — Centralized bilingual content package (`@azri/content`)
- **Status:** accepted (2026-04-22, Unreleased / planned for `v0.2.0`)
- **Context:** AZRI is bilingual (Arabic/English) and runs across at least five surfaces: marketing website, patient app, doctor dashboard, institutional SaaS platform, and a wearable companion. Without a single source of truth, copy will drift between surfaces, medical wording rules will be enforced inconsistently, and translators will be asked to update the same string in multiple repos. The bilingual content brief delivered in this PR is large (~27 sections, every string in `ar` + `en`) and demands a maintainable schema rather than scattered inline strings.
- **Decision:** Introduce a private workspace package, `@azri/content`, at `packages/content/`. It is **framework-agnostic** TypeScript (no React / Next / Expo / Tailwind imports), with:
  - a strict typed schema (`src/types.ts`),
  - the bilingual data (`src/data/azri.ts`),
  - locale + RTL/LTR helpers (`src/locale.ts`),
  - declarative web/app page bindings (`src/page-bindings.ts`), and
  - sanity tests using the built-in `node:test` runner via `tsx` (no extra runtime deps).

  Every surface — web, patient app, doctor dashboard, institutional platform, wearable — imports from this package. CTAs, FAQ entries, sitemap entries, and footer links use **stable `id` fields** so renaming an `id` is a breaking (MAJOR) change.
- **Consequences:**
  - + One source of truth for bilingual marketing + product copy.
  - + Schema enforces both `ar` and `en` for every string at compile time.
  - + Page bindings let surfaces share "what does this page render" without duplicating the answer.
  - + Authoring is simple: edit one file, add a CHANGELOG entry, run `npm test`.
  - + Healthcare-wording rules are enforced via `SKILLS/healthcare_product.md` and codified in the package's authoring comments.
  - − A future surface that wants a fundamentally different content shape (e.g. a clinician-only knowledge base) will need its own package; this one is intentionally marketing- and product-shell-flavored.
  - − Renaming a CTA / FAQ / sitemap `id` is a breaking change for any surface that targets it; coordination is required.
  - − Adds a small TypeScript toolchain (`tsc`, `tsx`, `@types/node`) at `packages/content/` only — does not yet require monorepo tooling at the repo root.

---

## How to add a new ADR
1. Copy the template below; assign the next ADR number.
2. Open a PR with a clear title (`ADR-00XX: Short decision`).
3. Get review from at least one architecture-aware reviewer + one stakeholder of the affected domain.
4. Set `Status: accepted` only after merge.

```
## ADR-XXXX — Title
- **Status:** proposed | accepted | superseded by ADR-YYYY | deprecated
- **Context:** What forces are at play?
- **Decision:** What did we choose, and why?
- **Consequences:** What becomes easier or harder?
```
