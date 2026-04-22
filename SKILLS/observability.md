# SKILLS — Observability

See `OBSERVABILITY.md` for the program-level standards. This file is the engineer rubric.

## What good looks like
- Any user-impacting issue is detected automatically before customers report it.
- Triage from page → cause in <10 minutes for typical issues.
- Logs, metrics, traces correlate on `request_id`.
- No PHI in observability data.

## Standards
- Structured JSON logs with mandatory fields.
- OpenTelemetry tracing; W3C context propagation.
- RED + USE metrics per service.
- Synthetic monitors for emergency path and primary auth flows.
- Every alert has runbook + owner + business-impact statement.

## Anti-patterns
- `console.log` in production code paths.
- Swallowing errors silently.
- Cardinality explosions in metric labels.
- Alerts that page without runbooks.
- Sentry breadcrumbs containing PHI.

## How to implement
- Use the platform logger; never raw `console`.
- Wrap external calls in spans.
- Export business metrics alongside technical ones.
- Add a synthetic monitor when shipping a new public flow.

## How to audit / test
- Alert fatigue review monthly.
- Cardinality budget per metric documented.
- Quarterly dashboard review for usefulness.

## How to scale
- Continuous profiling (Pyroscope/Datadog Profiler).
- Per-tenant observability for institutional customers.
- SLO-based alerting with multi-window burn rates.

## AZRI-specific notes
- Emergency notification path has dedicated dashboards and synthetic monitors at 60s cadence.
- PHI redaction is a logger-layer concern; never trust call sites.
- Audit logs are kept separate from observability logs and have longer retention.

## Open questions
- Datadog vs Grafana Cloud.
- Profiling vendor.
- Per-tenant observability tooling.
