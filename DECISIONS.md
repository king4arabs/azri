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

## ADR-0011 — Web framework: Next.js (App Router) + React 19 + Tailwind v4
- **Status:** accepted (2026-04-23, v0.2.0 scaffold)
- **Context:** `ARCHITECTURE.md` targets Next.js App Router + Tailwind + shadcn/ui (already proposed in ADR-0006). Shipping the marketing-site scaffold forces the decision. Candidate alternatives (Remix, Astro, SvelteKit) were not reopened for this scaffold; healthcare product hiring pool, streaming RSC for bilingual SSR, and the edge-friendly routing model kept Next.js the default.
- **Decision:** The `web/` package ships on **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 via `@tailwindcss/postcss`**. Locale routing lives under `app/[locale]/…` with `generateStaticParams(["ar", "en"])` and a root `/` redirect to the KSA-first default (`ar`). Every string is sourced from `@azri/content` via `pick(field, locale)`; no inline user-visible copy is permitted in the web layer. Logical CSS properties (`margin-inline-*`, `padding-inline-*`) are mandatory; hard-coded `margin-left`/`margin-right` are visibly outlined in dev as a reviewer hint.
- **Consequences:**
  - + Direct continuity with `ARCHITECTURE.md` and ADR-0006; no stack relitigation.
  - + Free RTL/LTR correctness at the layout layer because `<div lang dir>` is derived from `@azri/content` helpers.
  - + Trivial static export path for the marketing subset.
  - − Tailwind v4 is still pre-stable; a minor re-tune may be required when v4 GA lands.
  - − shadcn/ui is not yet materialised as `packages/ui`; the first non-trivial interactive flow will force that decision (kept as a followup).

## ADR-0012 — Core API framework: Fastify 5 + TypeScript + Pino + OpenAPI
- **Status:** accepted (2026-04-23, v0.2.0 scaffold)
- **Context:** `ARCHITECTURE.md` names NestJS or Fastify. Shipping the API scaffold forces the choice. Fastify's lighter surface, first-class schema-driven OpenAPI via `@fastify/swagger`, and pino integration bias toward it for a clinical-workflow API where request-per-core throughput and structured logs matter more than a DI framework.
- **Decision:** `@azri/api` ships on **Fastify 5 + TypeScript (ES2022, strict, `noUncheckedIndexedAccess`) + Pino + `@fastify/swagger` + `@fastify/swagger-ui` + `@fastify/helmet` + `@fastify/cors` + `@fastify/rate-limit` + `@fastify/sensible`**. Every route declares a schema; the OpenAPI spec is the public contract. Pino redacts PHI-adjacent request fields by default (`authorization`, `cookie`, `x-api-key`, `body.password`, `body.token`); the redact list is extended in the same PR that introduces a new PHI-adjacent field. Request IDs are honored from `x-request-id` (≤128 chars) or generated via `crypto.randomUUID()`. The Dockerfile runs as the non-root `node` user.
- **Consequences:**
  - + Smaller operational surface than NestJS; fewer runtime dependencies to audit.
  - + Contract-first development: OpenAPI is generated, not hand-written.
  - + Pino + structured request IDs meet the audit-log plumbing needs in `SECURITY.md`.
  - − No built-in DI module — as the codebase grows, we will codify module boundaries manually or layer a thin DI helper.
  - − If the team later needs NestJS patterns (guards, interceptors) around the same surface, migration cost is real; revisit at v0.5.0 institutional tier if it becomes a bottleneck.

## ADR-0013 — Patient mobile + Apple Watch companion: SwiftUI + HealthKit (read-only)
- **Status:** accepted (2026-04-23, v0.2.0 scaffold; production target v0.4.0)
- **Context:** `ARCHITECTURE.md` calls for native iOS first for HealthKit/Watch fidelity. React Native / Flutter were considered and deferred because Apple Watch + HealthKit interaction patterns (complications, background delivery, `HKAnchoredObjectQuery`) are materially easier with native SwiftUI + WatchKit, and because AZRI's clinical-safety posture favors the most conservative, highest-fidelity wearable path.
- **Decision:** The `ios/` directory ships Swift sources for an **iPhone app (SwiftUI, iOS 17+)** and a paired **Apple Watch companion (SwiftUI + WatchKit, watchOS 10+)**. HealthKit access is **read-only** (heart rate, HRV, SpO₂, steps); no write types are requested in v0.4.0. No PHI crosses the iPhone↔Watch `WatchConnectivity` bridge during the scaffold phase. No Xcode project files are committed — the project is regenerated locally per `ios/BUILDING.md`. macOS-runner CI (Xcode Cloud or self-hosted) is required before the iOS app is released; Linux CI (this repository's current runners) does not build iOS.
- **Consequences:**
  - + Maximum Apple Watch fidelity (complications, background delivery, on-watch inference later).
  - + Read-only HealthKit posture aligns with "AZRI observes, does not prescribe" from `SKILLS/healthcare_product.md`.
  - + Privacy descriptions, entitlements, and App Privacy answers can be drafted directly from `PRIVACY_NOTICE.md`.
  - − Adds a Swift toolchain skillset to the stack; dedicated iOS owner needed.
  - − A cross-platform (Android / web wearable) story will need a separate, later decision; not in scope today.
  - − No iOS CI until macOS runner is provisioned; this is tracked under `TODO.md` Discovered-while-doing-v0.2.0.

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
