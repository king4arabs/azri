# DATA_MODEL

> Canonical entities, relationships, and data classification for AZRI. Implementation arrives in v0.2.0+; this is the contract.

## Classification levels

| Level | Examples | Handling |
| --- | --- | --- |
| **Public** | Marketing copy, blog posts | No restriction |
| **Internal** | Org names, plan tiers, anonymous metrics | Access-controlled, not encrypted at field level |
| **Confidential** | Names, emails, phone numbers, billing addresses | RBAC + encryption at rest |
| **Sensitive PHI** | Medication, diagnoses, episode notes, raw signals, device telemetry | RBAC + RLS + field-level encryption + step-up auth + audit |
| **Highly sensitive** | Government IDs, biometric templates | Avoid storing if at all possible; encrypted, separated, minimal retention |

> **Default** for any new field is *Confidential or higher*. Justify in PR if marking lower.

## Core entities (initial)

```
Organization ─┬─ User (role: doctor | institution_admin | azri_admin | azri_support)
              │
              ├─ Membership (user ↔ org, role)
              │
              └─ Patient ─┬─ ConsentGrant (subject, scope, granter, granted_to, valid_until)
                          ├─ DeviceLink (Apple Watch, HealthKit source, etc.)
                          ├─ Episode ─── EpisodeSignal (raw or derived, retention-tiered)
                          ├─ Annotation (by clinician, with version history)
                          ├─ Medication
                          ├─ Report (export artifact, signed, immutable)
                          ├─ Alert (lifecycle: detected → confirmed/dismissed → escalated)
                          └─ CaregiverInvite (consent-scoped relay)

AuditEvent (separate schema, append-only): actor, action, subject, tenant, timestamp,
            request_id, ip, justification?, before/after_hash (no PHI payload)

NotificationDispatch: channel, status, retries, dedupe_key (no PHI in body unless E2E to user)

BillingAccount ─ Subscription ─ Invoice (Stripe / Moyasar references)
```

## Tenancy

- Every PHI-bearing table includes `organization_id` (or `patient_id` for personal-tier).
- **Postgres Row-Level Security** policies enforce tenant boundaries at the data layer.
- Cross-tenant queries categorically forbidden in production code paths.

## Identifiers

- Primary keys: ULIDs (sortable, opaque).
- External-facing IDs prefixed (e.g. `pat_01HXYZ…`, `epi_…`, `org_…`) for support clarity and to detect cross-resource ID misuse.
- Never expose internal numeric IDs.

## Consent model

- `ConsentGrant` records: who consents, on whose behalf (e.g. caregiver for minor), to what scope, until when, with revocation timestamp.
- All PHI accessors check consent state at request time, not at grant time only.
- Consent changes emit audit events.

## Retention

| Data | Retention (initial) |
| --- | --- |
| Confidential PII | Active + 12 months after account closure (configurable per region) |
| Sensitive PHI clinical records | Per regional clinical retention rules — TBD with legal; default 10 years |
| Raw signals (high-volume) | Tiered: hot 90d, warm 1y, cold 3y, then aggregated-only |
| Audit log | 7 years (longer than primary data; see `SECURITY.md`) |
| Marketing/anonymous analytics | 24 months max |

## Right to erasure

- Cryptographic shred of field-level keys + tombstone row, preserving audit chain integrity.
- Documented in `RUNBOOKS.md` (to be expanded when the first data lands).

## Schema migrations

- Tooling decided in ADR-0005.
- Forward and reverse migrations both committed and tested in staging with prod-like volume.
- Destructive migrations (drop column, drop table) require a separate "soft-deprecate → drop" PR sequence with at least one release in between.

## Things we do not store

- Government IDs unless legally required by an institutional customer (with explicit DPA terms).
- Biometric templates from third-party devices without explicit, revocable consent.
- Insurance claim PHI beyond what's strictly needed for payer integrations.
- Free-text logs containing PHI (logs are PHI-redacted at the logger layer).

## Open items

- Time-series store choice (TimescaleDB vs InfluxDB) when raw signals land.
- Per-region retention overrides for KSA / GCC vs global.
- Confirm signed-report storage strategy (S3 + KMS + object-lock).
