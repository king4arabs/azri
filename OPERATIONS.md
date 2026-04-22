# OPERATIONS

> Day-2 operations: SLOs, on-call, change management, capacity, cost, BCP/DR.

## Service level objectives (initial)

| Surface | Availability | Latency p95 | Error budget / 30d |
| --- | --- | --- | --- |
| Marketing | 99.95% | 1.5s TTFB | 21m 36s |
| Patient web (read) | 99.9% | 400ms API | 43m 12s |
| Doctor console | 99.9% | 500ms API | 43m 12s |
| Notifications (non-emergency) | 99.5% | 30s e2e | 3h 36m |
| **Emergency alert path** | 99.95% target, **engineered for redundancy** | 10s e2e | tracked separately, treated as P0 on any breach |

> Emergency path is intentionally simple, multiply redundant, and bypasses non-essential dependencies. See `RUNBOOKS.md`.

SLOs are reviewed monthly and tightened only when evidence supports it.

## On-call

- Primary rotation: weekly, 7×24, follow-the-sun once team is global.
- Secondary backup; manager escalation as tertiary.
- Pages route to PagerDuty (or Opsgenie) → phone + push.
- Acknowledge within **5 min** for P1, **15 min** for P2.
- Every page must end with: incident closed, runbook updated (if needed), postmortem if Sev1/Sev2.

See `INCIDENT_RESPONSE.md` for severities and process.

## Change management

- Production changes only via tagged releases or hot-fix branches with a documented justification.
- Standard, normal, and emergency change classes:
  - **Standard:** routine, low-risk, pre-approved patterns (dependency bumps, copy fixes).
  - **Normal:** reviewed in release readiness; requires owner + on-call awareness.
  - **Emergency:** during an incident; retroactively documented within 24h.
- Migrations: tested in staging with prod-like volume; ship with rollback plan.

## Capacity & performance

- Right-size cautiously; over-provision the emergency path.
- Load tests before each major release for the doctor console and emergency notifications.
- Performance budgets enforced in CI (Lighthouse, API p95).

## Cost management

- Per-environment cost tags (`env`, `module`, `owner`).
- Monthly cost review; alert on 30% MoM increase.
- Healthcare workloads do not bin-pack with non-prod workloads.

## Backups & DR

- Database: PITR with 35-day retention; weekly full backup tested by automated restore.
- Object storage: cross-region replication for prod.
- RTO target: **4h** for read-only mode, **12h** for full write recovery (initial; tighten by v0.7.0).
- RPO target: **15 min** (continuous WAL).
- DR drill: at least annually; documented in `RUNBOOKS.md`.

## Access management

- Quarterly access review; immediate revocation on offboarding (max 2h).
- Just-in-time elevation for production database access; every elevation logged.
- Break-glass account exists, in a sealed envelope (figuratively), use audited.

## Vendor management

- Each critical vendor has: contact, SLA, incident playbook, data flows mapped, BAA-equivalent if PHI flows through.
- Single-vendor dependency for emergency path is **forbidden**.

## Documentation rule

If something happened on-call and the runbook didn't help → update the runbook **before** closing the ticket.
