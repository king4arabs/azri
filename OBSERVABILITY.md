# OBSERVABILITY

> Logging, metrics, tracing, and dashboards for AZRI.

## Principles

1. **Three pillars + one:** logs, metrics, traces, **plus continuous profiling** when scale demands it.
2. **OpenTelemetry-first** for portability across vendors.
3. **PHI is never observable** in raw form — redact at the source.
4. **Every alert links to a runbook.** No exceptions.
5. **You build it, you observe it.**

## Logging

- Structured JSON only.
- Mandatory fields: `timestamp`, `level`, `service`, `env`, `request_id`, `tenant_id?`, `user_id?` (hashed), `event`, `message`.
- Levels: `debug`, `info`, `warn`, `error`, `fatal`.
- **PHI redaction** applied at the logger layer — never trust call sites.
- No stack traces with PHI; sanitize before logging.
- Aggregation target: Datadog or Loki (decision in v0.3.0).

## Metrics

- RED method per service: **R**ate, **E**rrors, **D**uration.
- USE method per resource: **U**tilization, **S**aturation, **E**rrors.
- Business metrics emitted alongside technical ones (e.g. `azri_episodes_created_total`).
- Histograms for latencies (p50/p95/p99); avoid gauges where counters work.
- Cardinality budget per metric documented (no unbounded labels).

## Tracing

- W3C Trace Context propagated across all services and the SDKs.
- Sampling: 100% on errors, baseline 10% on success (tunable per service).
- Critical journeys (alert path, report export, billing) traced at 100% in pre-1.0.

## Dashboards (per service, baseline)

- Traffic (RPS by endpoint).
- Latency (p50/p95/p99 by endpoint).
- Error rate and top error codes.
- Saturation (CPU, memory, queue depth, DB connections).
- Dependencies (latency to DB, cache, third parties).
- Business metric panel (e.g. patients onboarded today, reports exported today).

## Alerts

- Page on user-impacting symptoms (latency, error rate, availability), not infrastructure noise.
- Multi-window, multi-burn-rate SLO alerts (fast burn + slow burn).
- Every alert has: severity, runbook link, owning team, business impact one-liner.
- Alert fatigue tracked: monthly review of fired alerts vs actioned.

## Synthetic monitoring

- **Emergency notification path** monitored every 60s from multiple regions, alerting at first failure.
- Auth, signup, doctor login, report export checked every 5 min.

## Profiling

- On-demand CPU/heap profiling endpoints behind admin auth + audit.
- Continuous profiling (Pyroscope/Datadog Profiler) evaluated at v0.5.0+.

## Correlations

- `request_id` flows from edge → app → DB query log → audit log → Sentry → trace.
- Logs and traces queryable by `request_id` in <30 seconds.

## Retention

- Hot logs: 7–14 days searchable.
- Cold logs: 90 days.
- Audit logs: 7 years (separate from observability logs; see `SECURITY.md`).
- Metrics: 13 months high-resolution where cost-effective.

## Open items

- Datadog vs Grafana Cloud vs hybrid.
- Profiling vendor decision.
- Per-tenant observability (some institutional customers will request it).
