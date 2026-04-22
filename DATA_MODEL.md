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

## KSA classification mapping

This table maps AZRI's internal classification to Saudi regulatory categories so
engineers and reviewers can reason about **residency**, **consent**, and
**lawful basis** when modeling a new field. It is an internal handling guide
derived from public references to Saudi **PDPL** (Personal Data Protection Law,
issued by SDAIA) and the **NDMO** National Data Management Office / SDAIA data
classification scheme referenced by NCA ECC controls. **It is not a legal
opinion.** Before v0.7.0 launch the mapping must be reviewed by Saudi
privacy/healthcare counsel (see `COMPLIANCE_READINESS.md` — open items).

| AZRI level | PDPL category (indicative) | NDMO / SDAIA classification (indicative) | KSA residency expectation | Consent / lawful basis | Minimum controls |
| --- | --- | --- | --- | --- | --- |
| **Public** | Not personal data | **Public** | Anywhere | None required | Integrity only |
| **Internal** | Not personal data (aggregate / anonymous metrics) | **Public** or **Confidential** (if re-identifiable) | Flexible; prefer `me-south-1` for operational data | Legitimate interest; document purpose | RBAC, audit on export |
| **Confidential** | **Personal data** (names, contact, billing) | **Confidential** | `me-south-1` (Bahrain) default; in-Kingdom for institutional contracts that require it (ADR-0007) | Explicit consent captured at collection; purpose-limited | RBAC + encryption at rest + audit on access |
| **Sensitive PHI** | **Sensitive personal data** — health data (PDPL Art. 1 / sensitive data definition) | **Secret** (health data typically treated as Secret per NDMO health-sector guidance) | `me-south-1` default; **in-Kingdom option mandatory** for institutional customers that require it; cross-border transfer requires explicit consent + regulator-approved safeguards | Explicit, granular, revocable patient/caregiver consent per data class; child subjects require guardian consent | RBAC + RLS + field-level encryption + step-up auth + consent check at request time + full audit trail (no PHI in audit payload) |
| **Highly sensitive** | **Sensitive personal data** — includes biometric, genetic, and credit/government-ID data (credit data under separate KSA regulation) | **Secret** or **Top Secret** depending on data type and institutional context | In-Kingdom preferred; avoid storing; **never** cross-border without documented regulator-approved transfer mechanism | Explicit consent + documented legal necessity; minimize or avoid | Tokenized or not stored at all; if stored: HSM-backed key separation + shortest possible retention + quarterly access review |

Operational notes for this mapping:

- **Residency default.** AZRI workloads default to AWS `me-south-1` (Bahrain).
  For institutional customers whose contracts or sector guidance require
  in-Kingdom hosting (e.g. government-affiliated healthcare programs), a
  dedicated deployment topology is planned for v0.5.0+ per ADR-0007. Design
  PHI-bearing code to be residency-parametric from day one — no baked-in
  region assumptions.
- **Cross-border transfers.** Any cross-border transfer of Sensitive PHI or
  Highly sensitive data must have: (1) explicit patient/caregiver consent
  scoped to the transfer, (2) a lawful basis recorded against the processing
  activity, and (3) a regulator-approved safeguard (e.g. adequacy decision,
  approved contractual mechanism). If any of the three is missing, the
  transfer does not happen.
- **Audit payloads.** Audit log entries reference PHI by ID only. Never write
  PHI field contents into audit records, log lines, metrics, analytics
  events, error reports, or crash dumps. Log redaction is enforced at the
  logger layer, not by convention.
- **Consent state is checked at request time.** Granting consent once is not
  enough; every accessor re-verifies consent state on each access, and consent
  revocations emit audit events.
- **Pediatric / guardian consent.** Where the subject is a minor, guardian
  consent is required and the consent grant records the guardian relationship
  and evidence. Open item in `COMPLIANCE_READINESS.md`.

New fields and new processing activities **must** extend this mapping in the
same PR that introduces them. Reviewers block merge if a new PHI-adjacent
field lands without an entry here.

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
