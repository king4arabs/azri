# RUNBOOKS

> Concrete operational procedures. Each runbook is a recipe that an on-call engineer can follow at 03:00 without context.
> **Rule:** if you used a runbook on-call and it didn't help, update it before closing the ticket.

## Index

1. [Emergency notification path failure](#1-emergency-notification-path-failure)
2. [Suspected PHI exposure](#2-suspected-phi-exposure)
3. [Authentication outage](#3-authentication-outage)
4. [Database failover / restore](#4-database-failover--restore)
5. [Secret leak](#5-secret-leak)
6. [Dependency vulnerability disclosure](#6-dependency-vulnerability-disclosure)
7. [On-call onboarding & offboarding](#7-on-call-onboarding--offboarding)
8. [Tenant data export / deletion](#8-tenant-data-export--deletion)

> Runbooks below are **skeletons** — they will be expanded with exact commands as services land in v0.2.0+.

---

## 1. Emergency notification path failure

**Trigger:** synthetic monitor for emergency path fails (1 failure = page).

**Steps:**
1. Acknowledge page. Open `#inc-<id>` channel. Declare Sev1.
2. Verify via second region synthetic. Confirm scope (single tenant, region, global).
3. Activate the **redundant** notification channel (defined per provider matrix in `OPERATIONS.md`).
4. Communicate to affected institutional customers within 30 minutes.
5. Hold incident open until **two consecutive** synthetic successes from all monitored regions.
6. Postmortem within 24h. Track action items to completion.

**Do not:**
- Roll out experimental changes during the incident.
- Suppress the alert without root-cause confirmation.

---

## 2. Suspected PHI exposure

**Trigger:** alert from access-pattern detector, customer report, or staff observation.

**Steps:**
1. Sev1 immediately. Patient Safety Lead joins.
2. Preserve evidence: snapshot logs, audit records, do **not** delete anything.
3. Scope: who, what, when, how many records.
4. Containment: revoke compromised tokens; rotate impacted keys; restrict the affected route if needed.
5. Legal + privacy lead engaged within 1h. Regulatory notification timers begin (PDPL, GDPR).
6. Customer comms drafted by Comms Lead with Legal review.
7. Postmortem mandatory; published internally within 5 business days.

---

## 3. Authentication outage

**Trigger:** auth provider error rate > 5% for 5m, or full outage detected.

**Steps:**
1. Sev1 if 100% impact, Sev2 otherwise.
2. Status page: "We're investigating sign-in issues."
3. Confirm with provider status page; open ticket with provider.
4. If provider down: communicate ETA; do not attempt failover unless documented and rehearsed.
5. Sessions already established continue working — communicate that to reduce panic.

---

## 4. Database failover / restore

**Trigger:** primary DB unhealthy, or restore needed.

**Skeleton:**
1. Confirm primary down (not network). Engage DB on-call.
2. Failover to standby (managed RDS / Aurora command path documented here when provisioned).
3. Verify replica lag was within RPO before failover.
4. App services pick up via DNS/connection string; confirm.
5. Run smoke tests for read & write.
6. Plan to rebuild a new standby within 24h.

For PITR restore: documented in v0.3.0 once DB exists.

---

## 5. Secret leak

**Trigger:** secret scanner alert, public disclosure, or staff report.

**Steps:**
1. Treat as Sev1 if production; Sev2 otherwise. Time-to-rotate is measured in minutes.
2. **Rotate first, investigate second.** Revoke the leaked secret at its source.
3. Force-rotate any derived/dependent credentials.
4. Search audit logs for any usage of the leaked secret since exposure window.
5. Remove from git history if committed (BFG / `git filter-repo`); coordinate with all collaborators.
6. Postmortem; add a missing pre-commit hook or CI scan if applicable.

---

## 6. Dependency vulnerability disclosure

**Trigger:** Dependabot / CodeQL / GitHub Advisory alert for a high/critical vulnerability.

**Steps:**
1. Triage within 1 business day. Assess exploitability in AZRI's surface.
2. If exploitable in production: hotfix path. If theoretical / not exposed: schedule in next release.
3. Document in `CHANGELOG.md` under the patching release.
4. If a transitive dep with no upstream fix: pin, override, or vendor; document in `DECISIONS.md`.

---

## 7. On-call onboarding & offboarding

**Onboarding:**
- Pager configured + test page sent + acknowledged.
- Access to: alerting platform, dashboards, runbooks, status page admin, secrets vault (read-only by default), production read-only DB role.
- Shadow rotation for one cycle before primary.
- Sign-off on the patient-safety-first principle.

**Offboarding:**
- Revoke pager + accesses within 2h of role change.
- Confirm in access-review log.

---

## 8. Tenant data export / deletion

**Trigger:** customer request via support, or contractual end-of-relationship.

**Skeleton:**
1. Verify identity & authority of requester (tenant admin or legal).
2. Open ticket; Sev3 by default; Sev2 if regulatory clock is running.
3. Run export job (documented per tenant model in v0.3.0+).
4. For deletion: cryptographic shred of field-level keys + tombstone row, preserving audit chain.
5. Provide written confirmation; record in compliance register.

---

## Adding a new runbook

Use this template:

```markdown
## N. <Title>

**Trigger:** <when this runbook applies>

**Steps:**
1. ...

**Do not:**
- ...

**Validation:**
- ...
```
