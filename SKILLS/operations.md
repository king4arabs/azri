# SKILLS — Operations

## Purpose
Run AZRI day-to-day with minimal toil and maximum reliability.

## What good looks like
- SLOs guide work; on-call is a learning experience, not a punishment.
- Toil is tracked and reduced quarter over quarter.
- Cost is predictable and tagged.
- Vendor relationships are healthy and reviewed.

## Standards
- See `OPERATIONS.md` for SLOs, on-call, change management.
- See `RUNBOOKS.md` for procedures.
- See `INCIDENT_RESPONSE.md` for incidents.
- Weekly ops review: backlog, alert noise, on-call load, SLO posture, cost.
- Monthly cost review with anomaly alerting on >30% MoM.

## Anti-patterns
- Heroes who hold tribal knowledge.
- Manual production fixes without a follow-up ticket.
- Alert fatigue tolerated.
- Vendors whose status is unknown until they go down.

## How to implement
- Every alert links to a runbook.
- Every runbook is exercised at least once per quarter.
- Every shipped service has a dashboard before traffic.

## How to audit / test
- Quarterly DR drill; documented outcome.
- Quarterly access review.
- Annual tabletop incident exercise.
- On-call satisfaction survey each rotation.

## How to scale
- Follow-the-sun rotation as the team globalizes.
- SRE specialization once on-call load justifies it (>5 pages/rotation sustained).
- Per-tenant dashboards for institutional customers.

## AZRI-specific notes
- Healthcare incidents have legal timers; ops trains on the regulatory clock, not just the technical one.
- Emergency notification path has its own dashboards, monitors, and on-call awareness.

## Open questions
- PagerDuty vs Opsgenie vs incident.io.
- Status page provider.
- SRE hiring pace vs platform engineering investment.
