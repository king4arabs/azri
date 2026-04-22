<div align="center">

# AZRI

**Saudi-first, AI-enabled health technology platform for epilepsy care and early intervention.**

<sub>منصة صحية رقمية سعودية مدعومة بالذكاء الاصطناعي لرعاية مرضى الصرع والتدخل المبكر.</sub>

[azri.ai](https://azri.ai) · [Documentation map](#-documentation) · [Roadmap](./ROADMAP.md) · [Contributing](./CONTRIBUTING.md) · [Security](./SECURITY.md)

[![Version](https://img.shields.io/badge/version-0.1.0-1f6feb?style=flat-square)](./VERSION.md)
[![Status](https://img.shields.io/badge/status-pre--alpha-orange?style=flat-square)](./PROJECT_STATUS.md)
[![SemVer](https://img.shields.io/badge/semver-2.0.0-3b82f6?style=flat-square)](https://semver.org/)
[![Docs](https://github.com/king4arabs/azri/actions/workflows/docs-validation.yml/badge.svg?branch=main)](./.github/workflows/docs-validation.yml)
[![Conventional Commits](https://img.shields.io/badge/commits-conventional-fe5196?style=flat-square&logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org)
[![Region](https://img.shields.io/badge/region-KSA%20%C2%B7%20GCC%20%C2%B7%20MENA-006c35?style=flat-square)](./SKILLS/saudi_gcc_readiness.md)
[![Languages](https://img.shields.io/badge/languages-AR%20(RTL)%20%C2%B7%20EN-1f6feb?style=flat-square)](./I18N_L10N.md)
[![License](https://img.shields.io/badge/license-All%20rights%20reserved-lightgrey?style=flat-square)](#-license)

</div>

---

> ⚕️ **Medical disclaimer.** AZRI is *clinical workflow support* and *early-warning monitoring*. It is **not** a diagnostic device and does **not** replace medical judgment, emergency services, or prescribed treatment. See [`SECURITY.md`](./SECURITY.md) and [`COMPLIANCE_READINESS.md`](./COMPLIANCE_READINESS.md) for boundaries and AI limitations.

AZRI helps patients, families, doctors, and healthcare institutions monitor epilepsy, surface early-warning signals, and improve clinical communication — while preserving patient dignity and privacy. AZRI is designed **Arabic-first with full RTL**, then LTR/English, and is built for **Saudi Arabia first, GCC and MENA next, and global readiness over time**.

---

## Table of contents

- [Why AZRI](#-why-azri)
- [Highlights](#-highlights)
- [Product surfaces](#-product-surfaces)
- [Repository status](#-repository-status)
- [Repository layout](#-repository-layout)
- [Documentation](#-documentation)
- [SKILLS framework](#-skills-framework)
- [Target stack](#-target-stack)
- [Getting started](#-getting-started)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Versioning & releases](#-versioning--releases)
- [Security & responsible disclosure](#-security--responsible-disclosure)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Why AZRI

Epilepsy care across Saudi Arabia, the GCC, and the wider MENA region is fragmented across paper diaries, generic wellness apps, and clinic-only encounters. Patients lose context between visits; clinicians lose signal in noise; institutions lose a defensible audit trail. AZRI exists to close that gap with a product that is:

- **Clinically respectful** — built around real epilepsy workflows, not retrofitted from a generic wellness app.
- **Arabic-first and RTL-native** — content, UX, accessibility, and analytics designed for Arabic from day one, not bolted on later.
- **Privacy- and consent-first** — health data classification, consent scopes, and data residency drive architecture and product decisions. See [`SECURITY.md`](./SECURITY.md), [`SKILLS/privacy_data_governance.md`](./SKILLS/privacy_data_governance.md).
- **Multi-surface from day one** — patient app, caregiver view, doctor dashboard, institutional SaaS, marketing site, and admin console share one canonical content and data model.
- **KSA-ready, GCC-ready, globally aware** — local payment rails (Mada via Moyasar), local notification rails, KSA data residency, and a compliance posture that does not over-claim. See [`COMPLIANCE_READINESS.md`](./COMPLIANCE_READINESS.md), [`SKILLS/saudi_gcc_readiness.md`](./SKILLS/saudi_gcc_readiness.md).

---

## 🌟 Highlights

| | |
| --- | --- |
| 🏥 **Healthcare-first product DNA** | Clinical journeys, episode timelines, and consent scopes are first-class — see [`BUSINESS_CONTEXT.md`](./BUSINESS_CONTEXT.md), [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md). |
| 🧠 **AI with guardrails** | LLM-assisted summaries and signal analysis with explicit boundaries, no diagnostic claims — see [`SKILLS/ai.md`](./SKILLS/ai.md). |
| 🌐 **Arabic-first, RTL-native** | Bilingual content package (`@azri/content`) is the single source of truth for every surface — see [`CONTENT_SYSTEM.md`](./CONTENT_SYSTEM.md), [`I18N_L10N.md`](./I18N_L10N.md). |
| ♿ **Accessibility as a contract** | WCAG-aligned baseline with healthcare-specific assistive-tech considerations — see [`ACCESSIBILITY.md`](./ACCESSIBILITY.md). |
| 🇸🇦 **KSA / GCC readiness** | Mada/Apple Pay KSA via Moyasar, KSA data residency, local notification providers — see [`SKILLS/saudi_gcc_readiness.md`](./SKILLS/saudi_gcc_readiness.md). |
| 📐 **Repository operating system** | Architecture, ops, security, compliance, analytics, and release process documented as code, validated in CI. |
| 🎓 **SKILLS framework** | A cross-functional standards library teaching contributors what *good* looks like across 21+ disciplines — see [`SKILLS/`](./SKILLS). |
| ✅ **CI-validated documentation** | Required-files, non-empty docs, markdown lint, and changelog-on-PR checks — see [`.github/workflows/docs-validation.yml`](./.github/workflows/docs-validation.yml). |

---

## 🧭 Product surfaces

AZRI is a multi-surface, multi-tenant, multi-persona platform. Engineering, product, and design decisions must respect that reality.

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

## 📦 Repository status

This repository is at **v0.1.0 — Repository Operating System Baseline**. There is **no application source code committed yet**. This release establishes the standards, documentation, and SKILLS framework that all future engineering, product, design, and operations work will follow.

| | |
| --- | --- |
| ✅ | Repository operating system documents |
| ✅ | SKILLS framework (cross-functional standards library) |
| ✅ | GitHub PR/issue templates, CODEOWNERS, docs validation workflow |
| ✅ | Versioning, changelog, decisions log, roadmap |
| ✅ | Bilingual content system — [`packages/content/`](./packages/content) (`@azri/content`); see [`CONTENT_SYSTEM.md`](./CONTENT_SYSTEM.md) |
| ⏳ | Application scaffolding (web, mobile, API) — see [`ROADMAP.md`](./ROADMAP.md) |
| ⏳ | Authentication, payments, analytics, observability wiring — see [`TODO.md`](./TODO.md) |

A full audit and gap assessment is captured in [`PROJECT_STATUS.md`](./PROJECT_STATUS.md).

---

## 🗂️ Repository layout

```text
azri/
├── README.md                  ← you are here
├── PROJECT_STATUS.md          ← live audit and maturity gaps
├── ROADMAP.md                 ← phased delivery plan
├── ARCHITECTURE.md            ← target system architecture
├── *.md                       ← repository operating system docs (see below)
├── SKILLS/                    ← cross-functional standards library (21+ disciplines)
├── packages/
│   └── content/               ← @azri/content — bilingual content source of truth
└── .github/
    ├── workflows/             ← docs validation CI
    ├── ISSUE_TEMPLATE/        ← bug, feature, security templates
    ├── PULL_REQUEST_TEMPLATE.md
    └── CODEOWNERS
```

Application source (web, mobile, API, infra) lands progressively from **v0.2.0**. See [`ROADMAP.md`](./ROADMAP.md).

---

## 📚 Documentation

These documents are the source of truth for *how AZRI is built, run, sold, and governed*. Treat them as code: keep them current, review them in PRs, and reference them in decisions.

### Strategy & status

| File | What it covers |
| --- | --- |
| [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) | Live audit, severity-rated gaps, current maturity |
| [`ROADMAP.md`](./ROADMAP.md) | Phased delivery plan from v0.1.0 to v1.0.0 |
| [`BUSINESS_CONTEXT.md`](./BUSINESS_CONTEXT.md) | Personas, journeys, value, pricing logic |
| [`MARKETING_GROWTH.md`](./MARKETING_GROWTH.md) | Acquisition, conversion, content strategy |
| [`DECISIONS.md`](./DECISIONS.md) | ADR-style decision log |
| [`TODO.md`](./TODO.md) | Prioritized backlog |

### Architecture & engineering

| File | What it covers |
| --- | --- |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Target architecture, module boundaries, data flows |
| [`DATA_MODEL.md`](./DATA_MODEL.md) | Canonical entities, relationships, classification |
| [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) | API conventions, versioning, error model |
| [`SDK_DOCUMENTATION.md`](./SDK_DOCUMENTATION.md) | Future SDKs (web, iOS, Android, server) |
| [`CONTENT_SYSTEM.md`](./CONTENT_SYSTEM.md) | Bilingual content architecture (`@azri/content`), page bindings, authoring workflow |
| [`TESTING.md`](./TESTING.md) | Test strategy and gates |

### Operations & reliability

| File | What it covers |
| --- | --- |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Environments, deploy paths, rollback |
| [`OPERATIONS.md`](./OPERATIONS.md) | Day-2 operations, on-call, SLOs |
| [`OBSERVABILITY.md`](./OBSERVABILITY.md) | Logging, metrics, tracing, dashboards |
| [`INCIDENT_RESPONSE.md`](./INCIDENT_RESPONSE.md) | Severity levels, comms, postmortems |
| [`RUNBOOKS.md`](./RUNBOOKS.md) | Concrete operational procedures |
| [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md) | How AZRI ships safely |
| [`ANALYTICS.md`](./ANALYTICS.md) | Event taxonomy, growth & product metrics |

### Trust, safety & inclusion

| File | What it covers |
| --- | --- |
| [`SECURITY.md`](./SECURITY.md) | Security baseline & responsible disclosure |
| [`COMPLIANCE_READINESS.md`](./COMPLIANCE_READINESS.md) | KSA / GCC / global posture (no fake claims) |
| [`AI_TRANSPARENCY.md`](./AI_TRANSPARENCY.md) | Plain-language public statement on how AZRI uses (or does not yet use) AI |
| [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) | WCAG, assistive tech, healthcare a11y |
| [`I18N_L10N.md`](./I18N_L10N.md) | Arabic-first, RTL/LTR, locale strategy |

### Governance

| File | What it covers |
| --- | --- |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | How to contribute, branch, review, commit |
| [`CHANGELOG.md`](./CHANGELOG.md) | Human-readable release history |
| [`VERSION.md`](./VERSION.md) | Current version & semver policy |

---

## 🎓 SKILLS framework

The [`SKILLS/`](./SKILLS) directory teaches contributors what *good* looks like at AZRI across every discipline — frontend, backend, database, DevOps, security, QA, AI, product, business, marketing, operations, compliance, integrations, KSA/GCC readiness, UX/UI, accessibility, analytics, observability, healthcare product, privacy & data governance, and release management.

Start at [`SKILLS/README.md`](./SKILLS/README.md), then read the disciplines relevant to your contribution.

---

## 🛠️ Target stack

The stack is *target* — most code is not yet committed. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for rationale and [`SKILLS/integrations.md`](./SKILLS/integrations.md) for selection criteria and tradeoffs.

#### Frontend & mobile

- Next.js (App Router) + React + Tailwind + shadcn/ui — bilingual + RTL.
- Native iOS first (Swift/SwiftUI) for HealthKit + Apple Watch; React Native or Flutter evaluated for Android.

#### Backend & data

- Node.js (NestJS or Fastify) and/or FastAPI for AI/ML services. Clear service boundaries.
- PostgreSQL (primary, with row-level security), Redis (cache/queues), object storage for media, time-series store evaluated for biosignals.

#### Identity, payments, comms

- **Auth:** Clerk or Auth0 evaluated; must support healthcare RBAC, MFA, audit, SSO for institutional customers.
- **Payments:** Stripe (global) + **Moyasar** (KSA-native) for local payment methods (Mada, Apple Pay KSA).
- **Email/notifications:** Resend or SES; SMS via local KSA-compliant providers.

#### Cloud, deployment & infrastructure

- **Cloud:** AWS-first; KSA region (`me-south-1` Bahrain or in-country options) prioritized for data residency.
- **Deployment:** Vercel (marketing/web), AWS/Kubernetes for backend; Terraform for infra-as-code.

#### Intelligence, search & telemetry

- **AI/ML:** OpenAI / Anthropic / Hugging Face for LLM-assisted clinical summaries (with strict guardrails); custom models for signal analysis.
- **Search:** Meilisearch or Typesense for in-product search; Algolia evaluated for marketing.
- **Analytics:** PostHog (product) + Plausible/GA (marketing) — health PII excluded from product analytics.
- **Monitoring:** Sentry, Datadog (or OpenTelemetry-native equivalent), UptimeRobot.

#### Security

- Cloudflare (WAF, DDoS), AWS Secrets Manager, rate limiting at edge and app.

---

## 🚀 Getting started

> Application scaffolding lands in **v0.2.0**. Until then, this repo is documentation plus the [`@azri/content`](./packages/content) package.

### 1. Read your way in

1. Read this `README.md`.
2. Read [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) and [`ROADMAP.md`](./ROADMAP.md) to understand where AZRI is headed.
3. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening a PR.
4. Browse [`SKILLS/`](./SKILLS) for the discipline you work in.

### 2. Work with the bilingual content package

```bash
# Prerequisite: Node.js >= 20
cd packages/content
npm install
npm run typecheck
npm test
```

See [`packages/content/README.md`](./packages/content/README.md) and [`CONTENT_SYSTEM.md`](./CONTENT_SYSTEM.md) for the authoring workflow and page bindings.

### 3. Open a pull request

- Branch with a conventional prefix (`feat/…`, `fix/…`, `docs/…`, `chore/…`, `sec/…`).
- Use [Conventional Commits](https://www.conventionalcommits.org).
- Fill in [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md).
- Update [`CHANGELOG.md`](./CHANGELOG.md) under `[Unreleased]` for any behavioural change.
- The [docs validation workflow](./.github/workflows/docs-validation.yml) runs automatically on every PR.

---

## 🗺️ Roadmap

| Milestone | Theme | Status |
| --- | --- | --- |
| **v0.1.0** | Repository Operating System Baseline | ✅ Released — 2026-04-22 |
| **v0.2.0** | Application scaffolding (web, mobile, API), auth foundation | ⏳ Planned |
| **v0.x** | Payments, analytics, observability, clinical workflows, AI guardrails | ⏳ Planned |
| **v1.0.0** | Production-ready KSA launch posture | 🎯 Target |

Full plan in [`ROADMAP.md`](./ROADMAP.md).

---

## 🤝 Contributing

We welcome contributions from engineers, clinicians, designers, translators, and operators. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full guide.

**Quick rules of the road:**

- Healthcare/clinical wording must follow [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md) — no diagnostic claims, no marketing-speak about clinical outcomes.
- Arabic and English content live together in [`@azri/content`](./packages/content) — never hard-code copy in surfaces.
- Privacy-by-default: health PII never enters product analytics — see [`ANALYTICS.md`](./ANALYTICS.md), [`SKILLS/privacy_data_governance.md`](./SKILLS/privacy_data_governance.md).
- Every non-trivial decision belongs in [`DECISIONS.md`](./DECISIONS.md) as an ADR.

---

## 🧭 Versioning & releases

AZRI follows **[Semantic Versioning 2.0.0](https://semver.org/)** — see [`VERSION.md`](./VERSION.md) and [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md). All notable changes are recorded in [`CHANGELOG.md`](./CHANGELOG.md).

**Current version:** `0.1.0` — *Repository Operating System Baseline* (2026-04-22).

---

## 🔐 Security & responsible disclosure

If you believe you have found a security or privacy issue, **do not open a public issue**.

Follow the disclosure process in [`SECURITY.md`](./SECURITY.md). For sensitive reports, use the [security report issue template](./.github/ISSUE_TEMPLATE/security_report.md) only for non-sensitive coordination — otherwise contact the maintainers privately as described in [`SECURITY.md`](./SECURITY.md).

---

## 📄 License

A license has not yet been chosen for this repository — tracked in [`DECISIONS.md`](./DECISIONS.md) (ADR-0003). Until a license is published, **all rights are reserved by the AZRI team**. Please do not redistribute, repackage, or reuse the contents of this repository without prior written permission.

---

## 🙏 Acknowledgements

AZRI is built on the shoulders of the global open-source community, and informed by the lived experience of patients, families, and clinicians across Saudi Arabia and the wider region. شكراً.

<div align="center">

—

Made with care in **Saudi Arabia 🇸🇦** for patients, families, and clinicians.

</div>
