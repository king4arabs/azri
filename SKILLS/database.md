# SKILLS — Database

## Purpose
Model, migrate, and protect AZRI's data with strict tenant isolation, PHI minimization, and operational reliability.

## What good looks like
- Schemas reflect domain (see `DATA_MODEL.md`), not just storage convenience.
- Tenant isolation provable at the database layer (PostgreSQL RLS).
- Migrations forward & backward, tested at prod-like volume.
- Backups validated by automated restore drills.
- Queries observable and bounded.

## Standards
- **Primary store:** PostgreSQL (managed, e.g. RDS / Aurora).
- **Cache/queue:** Redis.
- **Object storage:** S3-compatible; no public buckets; signed URLs only.
- **Time-series:** evaluate TimescaleDB at v0.4.0 when raw signals land.
- **IDs:** ULIDs with prefixes (`pat_`, `epi_`, `org_`).
- **Tenancy:** every PHI table has `organization_id` (or `patient_id` for personal-tier) + RLS policies.
- **Encryption:** at rest by default; field-level for `Sensitive` and `Highly sensitive` columns.
- **Migrations:** typed migration tool; both forward & reverse committed; destructive changes split into "soft-deprecate → drop" releases.
- **Connection pooling:** PgBouncer or RDS Proxy in front of Postgres.
- **Indexes:** added intentionally with `EXPLAIN` evidence; reviewed quarterly.
- **Auditing:** separate schema, append-only, longer retention; no PHI payloads in audit rows.

## Anti-patterns
- Tenant scoping only in application code.
- Storing PHI in JSON blobs without classification.
- Soft-delete via boolean alone (use timestamp + audit).
- Foreign keys missing on relational data because "we'll add them later."
- Migrations that lock production tables for minutes at scale.
- Restoring prod backups into staging without de-identification.

## How to implement
- Define the entity in `DATA_MODEL.md` first; then write the migration.
- Add RLS policies in the same migration that introduces the table.
- Add field-level encryption for `Sensitive`+ columns at table creation.
- Add an audit hook in the application layer for the new entity.

## How to audit / test
- Migration applies cleanly forward and backward in CI.
- RLS policy tests: a query without org context returns zero rows.
- Restore-from-backup test job runs at least weekly.
- Slow query log reviewed weekly.

## How to scale
- Read replicas for reporting & analytics queries.
- Partitioning for high-volume tables (e.g. `episode_signals` by month).
- Move signal data to a time-series store when query patterns demand it.
- Per-tenant database/schema only when a contract requires it (avoid prematurely).

## AZRI-specific notes
- Right to erasure: **cryptographic shred** of field-level keys + tombstone, preserving audit chains.
- Per-region retention configurable for KSA / GCC vs global once we serve multiple regions.
- Pediatric data flows through the same model; guardian consent is recorded as a `ConsentGrant`.

## Open questions
- Prisma vs Drizzle vs Kysely (TS) / Alembic + SQLAlchemy (Py).
- TimescaleDB vs InfluxDB for signals.
- Encryption key management: KMS-managed vs envelope-encrypted with rotating DEKs.
