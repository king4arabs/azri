# AZRI

> Saudi-first, AI-enabled health technology platform for **epilepsy care and early intervention**.
> Public site: [https://azri.ai](https://azri.ai)

AZRI helps patients, families, doctors, and healthcare institutions monitor epilepsy, surface early-warning signals, and improve clinical communication — while preserving patient dignity and privacy. AZRI is designed Arabic-first with full RTL support, then LTR/English, and is built for Saudi Arabia first, GCC and MENA next, and global readiness over time.

> ⚠️ **Important medical disclaimer.** AZRI is a *clinical workflow support* and *early-warning monitoring* product. It is **not** a diagnostic device and does not replace medical judgment, emergency services, or prescribed treatment. See [`SECURITY.md`](./SECURITY.md) and [`COMPLIANCE_READINESS.md`](./COMPLIANCE_READINESS.md) for boundaries and AI limitations.

---

## Table of Contents
- [Product surfaces](#product-surfaces)
- [Repository status](#repository-status)
- [Repository operating system](#repository-operating-system)
- [Stack (target)](#stack-target)
- [Getting started](#getting-started)
- [Contributing](#contributing)
- [Versioning & releases](#versioning--releases)
- [Security & responsible disclosure](#security--responsible-disclosure)
- [License](#license)

---

## Product surfaces

AZRI is a multi-surface platform. Engineering, product, and design decisions must respect this multi-tenant, multi-persona reality.

| Surface | Persona | Purpose |
| --- | --- | --- |
| **Patient mobile app** | Patient / caregiver | Day-to-day monitoring, alerts, dignity-preserving self-tracking |
| **Apple Watch / wearable companion** | Patient | Passive signal capture, HealthKit integration, on-wrist alerts |
| **Caregiver / family view** | Family / guardian | Consent-scoped reassurance, alert relays |
| **Doctor dashboard** | Neurologist / clinician | Patient timeline, episodes, reports, clinical workflow support |
| **Institutional SaaS** | Hospital / clinic / insurer | Cohorts, RBAC, audit, procurement readiness, billing |
| **Marketing site** | Prospects, press, partners | Trust building, pricing, demo, contact, regional content |
| **Admin / operations console** | AZRI internal | Tenant ops, support, incident response |

See [`BUSINESS_CONTEXT.md`](./BUSINESS_CONTEXT.md) for journeys, [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the system view, and [`DATA_MODEL.md`](./DATA_MODEL.md) for the canonical entities.

---

## Repository status

This repository is at **v0.1.0 — Repository Operating System Baseline**. There is **no application source code committed yet**. This release establishes the standards, documentation, and SKILLS framework that all future engineering, product, design, and operations work will follow.

- ✅ Repository operating system documents
- ✅ SKILLS framework (cross-functional standards library)
- ✅ GitHub PR/issue templates, CODEOWNERS, docs validation workflow
- ✅ Versioning, changelog, decisions log, roadmap
- ✅ Bilingual content system — [`packages/content/`](./packages/content) (`@azri/content`); see [`CONTENT_SYSTEM.md`](./CONTENT_SYSTEM.md)
- ⏳ Application scaffolding (web, mobile, API) — see [`ROADMAP.md`](./ROADMAP.md)
- ⏳ Authentication, payments, analytics, observability wiring — see [`TODO.md`](./TODO.md)

A full audit and gap assessment is captured in [`PROJECT_STATUS.md`](./PROJECT_STATUS.md).

---

## Repository operating system

These documents are the source of truth for *how AZRI is built, run, sold, and governed*. Treat them as code: keep them current, review them in PRs, and reference them in decisions.

### Top-level documents
| File | What it covers |
| --- | --- |
| [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) | Live audit, severity-rated gaps, current maturity |
| [`ROADMAP.md`](./ROADMAP.md) | Phased delivery plan from v0.1.0 to v1.0.0 |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Target architecture, module boundaries, data flows |
| [`DATA_MODEL.md`](./DATA_MODEL.md) | Canonical entities, relationships, classification |
| [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) | API conventions, versioning, error model |
| [`SDK_DOCUMENTATION.md`](./SDK_DOCUMENTATION.md) | Future SDKs (web, iOS, Android, server) |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Environments, deploy paths, rollback |
| [`OPERATIONS.md`](./OPERATIONS.md) | Day-2 operations, on-call, SLOs |
| [`OBSERVABILITY.md`](./OBSERVABILITY.md) | Logging, metrics, tracing, dashboards |
| [`INCIDENT_RESPONSE.md`](./INCIDENT_RESPONSE.md) | Severity levels, comms, postmortems |
| [`RUNBOOKS.md`](./RUNBOOKS.md) | Concrete operational procedures |
| [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md) | How AZRI ships safely |
| [`TESTING.md`](./TESTING.md) | Test strategy and gates |
| [`SECURITY.md`](./SECURITY.md) | Security baseline & responsible disclosure |
| [`COMPLIANCE_READINESS.md`](./COMPLIANCE_READINESS.md) | KSA / GCC / global posture (no fake claims) |
| [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) | WCAG, assistive tech, healthcare a11y |
| [`I18N_L10N.md`](./I18N_L10N.md) | Arabic-first, RTL/LTR, locale strategy |
| [`CONTENT_SYSTEM.md`](./CONTENT_SYSTEM.md) | Bilingual content architecture (`@azri/content`), page bindings, authoring workflow |
| [`ANALYTICS.md`](./ANALYTICS.md) | Event taxonomy, growth & product metrics |
| [`BUSINESS_CONTEXT.md`](./BUSINESS_CONTEXT.md) | Personas, journeys, value, pricing logic |
| [`MARKETING_GROWTH.md`](./MARKETING_GROWTH.md) | Acquisition, conversion, content strategy |
| [`DECISIONS.md`](./DECISIONS.md) | ADR-style decision log |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | How to contribute, branch, review, commit |
| [`CHANGELOG.md`](./CHANGELOG.md) | Human-readable release history |
| [`VERSION.md`](./VERSION.md) | Current version & semver policy |
| [`TODO.md`](./TODO.md) | Prioritized backlog |

### SKILLS framework
The [`SKILLS/`](./SKILLS) directory teaches future contributors what *good* looks like at AZRI across every discipline (frontend, backend, DB, DevOps, security, QA, AI, product, business, marketing, operations, compliance, integrations, KSA/GCC readiness, UX/UI, accessibility, analytics, observability, healthcare product, privacy/data governance, release management). Start at [`SKILLS/README.md`](./SKILLS/README.md).

---

## Stack (target)

The stack is *target* — code is not yet committed. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for rationale.

- **Frontend:** Next.js (App Router) + React + Tailwind + shadcn/ui; bilingual + RTL.
- **Mobile:** Native iOS first (Swift/SwiftUI) for HealthKit + Apple Watch; React Native or Flutter evaluated for Android.
- **Backend:** Node.js (NestJS or Fastify) and/or FastAPI for AI/ML services. Clear service boundaries.
- **Database:** PostgreSQL (primary, with row-level security), Redis (cache/queues), object storage for media, time-series store evaluated for biosignals.
- **Auth:** Clerk or Auth0 evaluated; must support healthcare RBAC, MFA, audit, SSO for institutional customers.
- **Payments:** Stripe (global) + **Moyasar** (KSA-native) for local payment methods (Mada, Apple Pay KSA).
- **Email/Notifications:** Resend or SES; SMS via local KSA-compliant providers.
- **Cloud:** AWS-first; KSA region (`me-south-1` Bahrain or in-country options) prioritized for data residency.
- **Deployment:** Vercel (marketing/web), AWS/Kubernetes for backend; Terraform for infra-as-code.
- **Analytics:** PostHog (product) + Plausible/GA (marketing) — health PII excluded from product analytics.
- **Monitoring:** Sentry, Datadog (or OpenTelemetry-native equivalent), UptimeRobot.
- **AI/ML:** OpenAI / Anthropic / Hugging Face for LLM-assisted clinical summaries (with strict guardrails); custom models for signal analysis.
- **Search:** Meilisearch or Typesense for in-product search; Algolia evaluated for marketing.
- **Security:** Cloudflare (WAF, DDoS), AWS Secrets Manager, rate limiting at edge and app.

See [`SKILLS/integrations.md`](./SKILLS/integrations.md) for selection criteria and tradeoffs.

---

## Getting started

> Application scaffolding lands in **v0.2.0**. For now this repo is documentation-only.

1. Read [`README.md`](./README.md) (this file).
2. Read [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) and [`ROADMAP.md`](./ROADMAP.md) to understand where AZRI is headed.
3. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening a PR.
4. Browse [`SKILLS/`](./SKILLS) for the discipline you work in.

---

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Short version:
- Branch naming: `feat/…`, `fix/…`, `docs/…`, `chore/…`, `sec/…`.
- Conventional Commits encouraged.
- All PRs use [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md).
- Healthcare/clinical wording must follow [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md).

---

## Versioning & releases

AZRI follows **[Semantic Versioning](https://semver.org/)** — see [`VERSION.md`](./VERSION.md) and [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md). All notable changes go in [`CHANGELOG.md`](./CHANGELOG.md).

Current version: **0.1.0** (Repository Operating System Baseline).

---

## Security & responsible disclosure

If you believe you have found a security or privacy issue, **do not open a public issue**. Follow the disclosure process in [`SECURITY.md`](./SECURITY.md).

---

## License

License has not yet been chosen for this repository — tracked in [`DECISIONS.md`](./DECISIONS.md) (ADR-0003). Until a license is published, all rights are reserved by the AZRI team.
