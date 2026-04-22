# ARCHITECTURE

> Target architecture for AZRI. This document describes *intent* and *guardrails*; concrete code lands in v0.2.0+.
> All material architectural choices are recorded as ADRs in [`DECISIONS.md`](./DECISIONS.md).

## Goals

1. **Patient safety & dignity first** — the simplest architecture that does not put patients at risk.
2. **Privacy by design** — minimize, classify, segregate, and audit health data flows.
3. **Bilingual & RTL by default** — never bolt on later.
4. **Multi-persona, multi-tenant** — patient, caregiver, doctor, institution from day one.
5. **KSA data residency-friendly** — region selection is a hard constraint, not a config flag.
6. **Observable & operable** — every service emits structured logs, metrics, traces.
7. **Modular monolith → services** — start simple, split when boundaries are proven.

## Non-goals (for now)

- Microservices for their own sake.
- Custom medical device firmware.
- Real-time biosignal processing on the server (push to edge/wearable).
- Acting as a regulated medical device. (See `COMPLIANCE_READINESS.md`.)

## High-level system view

```
                  ┌──────────────────────────────────────┐
                  │           Edge (Cloudflare)          │
                  │   WAF · DDoS · Bot mgmt · Caching    │
                  └────────────┬─────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
   Marketing Web          Patient Web App        Doctor / Institution
   (Next.js, SSR)         (Next.js + RSC)        Console (Next.js)
        │                      │                      │
        └──────────┬───────────┴──────────┬───────────┘
                   │                      │
                   ▼                      ▼
         ┌────────────────────┐  ┌────────────────────────┐
         │  API Gateway / BFF │  │   Auth (Clerk/Auth0)   │
         └─────────┬──────────┘  └────────────────────────┘
                   │
   ┌───────────────┼───────────────────────────────┐
   ▼               ▼                               ▼
 Core API     AI/Insights Service            Notification Service
 (Node)       (FastAPI / Python)             (email · SMS · push)
   │               │                               │
   ▼               ▼                               ▼
 PostgreSQL    Object storage (signals,       Provider integrations
 + Redis       reports), Time-series DB       (Resend/SES, SMS, APNs)
   │           (evaluated)
   ▼
 Audit log store (append-only, separate retention)

  Patient mobile (iOS/SwiftUI) ──► HealthKit + Apple Watch ──► Core API
```

## Module boundaries (v0.2.0 → v0.5.0)

| Module | Responsibility | Owner persona |
| --- | --- | --- |
| `web/marketing` | Public site, pricing, demo, content | Marketing |
| `web/app` | Authenticated patient & caregiver experience | Product |
| `web/console` | Doctor + institution console | Clinical Product |
| `api/core` | Patients, episodes, organizations, RBAC, audit | Backend |
| `api/insights` | AI summaries, signal analysis, guardrails | AI/ML |
| `api/notifications` | Email, SMS, push fan-out | Backend |
| `mobile/ios` | Patient app + Watch companion | Mobile |
| `infra` | Terraform, environments, secrets bootstrap | DevOps/SRE |
| `packages/ui` | shadcn/ui-based design system, RTL-aware | Design Eng |
| `packages/i18n` | Locale catalog, ICU messages, plural rules | i18n |
| `packages/contracts` | Shared types / OpenAPI clients | Backend |

## Data flow principles

- **PHI never leaves its tenant boundary** without explicit consent + audit.
- **Default deny** in RBAC; explicit grants only.
- **Field-level encryption** for the highest-sensitivity attributes (clinical notes, raw signals).
- **Signed URLs only** for any media; no public buckets.
- **Append-only audit log** in a separate schema with longer retention than primary data.
- **Right to erasure** is implemented as cryptographic shred + tombstone, not raw delete that breaks audit chains.

## Tenancy model

- Logical multi-tenancy via `organization_id` + Postgres **row-level security** policies.
- Cross-tenant queries are categorically disallowed at the data layer, not just the app layer.
- Per-tenant data export and deletion endpoints from day one.

## Authentication & authorization

- **AuthN:** chosen provider (ADR-0004 pending) with mandatory MFA for clinicians and institution admins.
- **AuthZ:** role + attribute model (RBAC + ABAC for consent-scoped data).
- Roles (initial): `patient`, `caregiver`, `doctor`, `institution_admin`, `azri_admin`, `azri_support`.
- **Step-up auth** required for: viewing raw signals, exporting reports, changing roles, accessing audit log.

## Reliability targets (initial; refine in `OPERATIONS.md`)

| Surface | Availability SLO | Latency p95 |
| --- | --- | --- |
| Marketing site | 99.95% | 1.5s TTFB |
| Patient app (read) | 99.9% | 400ms API |
| Doctor console | 99.9% | 500ms API |
| Notifications fan-out | 99.5% | 30s end-to-end for non-emergency; **emergency path is separate** |

> **Emergency alert path** is intentionally simple, redundant, and bypasses non-essential dependencies. See `RUNBOOKS.md`.

## Technology decisions (target — see `DECISIONS.md`)

| Concern | Choice | Rationale (short) |
| --- | --- | --- |
| Web framework | Next.js (App Router) | RSC, i18n, edge support, hiring pool |
| UI primitives | Tailwind + shadcn/ui | Owned components, accessible defaults |
| Mobile | Native iOS first | HealthKit/Watch fidelity |
| Core API | Node (NestJS or Fastify) | Shared types with web |
| AI/Insights | FastAPI | Python ML ecosystem |
| DB | PostgreSQL + RLS | Mature, multi-tenant friendly |
| Cache/queue | Redis | Standard |
| Object storage | S3-compatible | Region flexibility |
| Auth | TBD (ADR-0004) | Healthcare RBAC + audit |
| Payments | Stripe + Moyasar | Global + KSA-native |
| Cloud | AWS-first, KSA region | Data residency |
| IaC | Terraform | Industry standard |
| Observability | OpenTelemetry → Datadog/Sentry | Vendor-portable |
| Analytics | PostHog (product) + Plausible/GA (marketing) | PHI excluded from product analytics |

## Open questions

- KSA in-Kingdom hosting partner needed beyond AWS Bahrain?
- Self-host auth (e.g. SuperTokens) vs managed?
- Time-series DB (TimescaleDB vs InfluxDB) needed at v0.4.0?
- GraphQL gateway or stay REST + typed clients?

These flow into `DECISIONS.md` ADRs.
