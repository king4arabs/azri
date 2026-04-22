# INCIDENT_RESPONSE

> How AZRI handles incidents. Healthcare context = patient safety is always the first concern.

## Severity matrix

| Sev | Definition | Examples | Response time | Comms cadence |
| --- | --- | --- | --- | --- |
| **Sev1 — Critical** | Patient safety, PHI exposure, total outage of authenticated surface, emergency alert path failure | Suspected data breach; alerts not delivered; doctor console down for all users | Page within **5 min**; war-room within **15 min** | Internal updates **every 30 min**; external customer comms within **2h** if customer-impacting |
| **Sev2 — High** | Major degradation, partial outage, security issue without confirmed exposure | Auth slow > 5s p95; one region degraded; suspicious access pattern | Page within **15 min** | Internal updates hourly |
| **Sev3 — Medium** | Limited impact, workaround exists | Non-critical job backlog; minor UI bug at scale | Triage within **4h** | Daily until closed |
| **Sev4 — Low** | Cosmetic or background | Internal dashboard glitch | Triage in normal flow | None |

## Patient safety override

If at any point during an incident there is a *plausible* patient safety concern, **escalate to Sev1 immediately**, regardless of original classification. Document why in the postmortem.

## Roles during an incident

- **Incident Commander (IC)** — owns coordination, comms cadence, decision authority during the incident.
- **Communications Lead** — drafts internal & external updates.
- **Operations Lead** — drives the technical response.
- **Scribe** — captures timeline in real time.
- **Patient Safety Lead** (Sev1 with safety concern) — clinician or product lead empowered to halt actions that could harm patients.

The IC is **not** typically the engineer fixing the issue.

## Comms protocol

- Internal channel: dedicated `#inc-<short-id>` Slack channel; do not discuss in DMs.
- External:
  - Customer email + status page update on Sev1 within 2h.
  - For confirmed PHI exposure, regulatory notification timelines apply (PDPL / GDPR / etc.); legal involved immediately.
- **Never** speculate publicly about cause, blame, or scope before confirmed.

## Timeline of a Sev1

```
T+0      Detected (alert / report)
T+5m     Paged. IC assigned.
T+15m    War-room open. Initial assessment.
T+30m    First internal update; first decision on customer comms.
T+2h     Customer comms (if impacted) + status page.
T+24h    Resolution + draft postmortem.
T+5d     Final postmortem published internally.
T+14d    Action items completed or scheduled.
```

## Postmortem template

```markdown
# Incident <ID> — <short title>

- **Date:** YYYY-MM-DD
- **Severity:** Sev<N>
- **Duration:** Detected → resolved
- **Author:** <name>
- **Status:** draft | final

## Summary
What happened, in one paragraph, in plain language.

## Patient impact
Was any patient or clinician affected? PHI exposed? Alerts missed? Be specific.

## Customer impact
Which tenants, which surfaces, what duration.

## Timeline
Tight, factual, UTC timestamps.

## Root causes
Use 5-Whys. Multiple contributing causes are normal.

## What went well
Honest list. Reinforce it.

## What went badly
Honest list. No blame, focus on systems.

## Action items
| ID | Owner | Severity | Due |

## Lessons learned
What patterns generalize? What docs/runbooks need updating?
```

## Blameless culture

- Postmortems focus on systems, not individuals.
- Praise the people who found, escalated, and fixed.
- Action items must be assigned and tracked to completion.

## Drills

- Tabletop incident exercise semi-annually.
- One full simulated Sev1 per year.

## Open items

- Status page provider choice.
- Legal notification SLAs codified per jurisdiction.
- On-call comp model.
