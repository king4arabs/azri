# SKILLS — Backend

## Purpose
Build safe, observable, multi-tenant services that handle PHI responsibly and scale predictably.

## What good looks like
- Every endpoint has a clear contract (OpenAPI), validation, auth, audit, and tests.
- Tenant isolation enforced in the database, not just the app.
- Logs and traces let you understand any request in under a minute.
- New services follow the same template; surprises are rare.
- PHI flows are explicit and reviewed.

## Standards
- **Languages:** TypeScript (Node) for core API; Python (FastAPI) for AI/insights.
- **Frameworks:** NestJS or Fastify (decided alongside the first scaffold); FastAPI for Python.
- **Validation:** Zod (TS) / Pydantic (Py) at every boundary.
- **Auth:** centralized middleware; no per-route reinvention.
- **AuthZ:** policy module, table-driven; default deny.
- **DB access:** typed (Prisma/Drizzle/SQLAlchemy); no raw SQL with user input concatenated.
- **Migrations:** committed, reversible, tested on staging with prod-like volume.
- **Errors:** single envelope (`API_DOCUMENTATION.md`), PHI-free messages.
- **Logging:** structured JSON; PHI redaction at the logger layer.
- **Tracing:** OpenTelemetry; W3C trace context propagated.
- **Idempotency:** `Idempotency-Key` honored on resource-creating POSTs.
- **Rate limiting:** at edge and per-token in the app.
- **Background work:** queues with retries, dead-letter queues, and visibility into both.
- **Webhooks (outbound):** signed (HMAC-SHA256), retried, documented.

## Anti-patterns
- Cross-tenant queries.
- "Service account" with full DB access used by application code paths.
- PHI in error messages, logs, analytics.
- Catch-all `try { … } catch (e) { console.log(e) }` patterns.
- Implicit role checks scattered across handlers.
- Ad-hoc background scripts that bypass the queue/observability path.
- Long-running synchronous endpoints when a job + status would do.

## How to implement
- Use the service template (`packages/service-template` once introduced) for new services.
- Define the OpenAPI for the new endpoint **first**, then implement.
- Add the audit log emission in the same PR as the endpoint.
- Add a contract test against the OpenAPI.

## How to audit / test
- Lint + types green; unit + integration tests for new code.
- RBAC matrix tests for new endpoints.
- Property tests for parsers and policy code.
- Load test critical endpoints before tagging a release.

## How to scale
- Stateless services; horizontal scaling.
- Queue heavy work; backpressure-aware producers.
- Caching layer (Redis) with explicit TTL & invalidation rules.
- Sharding plan for high-volume tables (signals) decided before they grow.
- Read replicas for reporting workloads.

## AZRI-specific notes
- **Emergency notification path** is intentionally simple, separately deployed, with its own redundancy.
- PHI columns encrypted at the field level; access requires step-up auth.
- Audit log emitter is mandatory, not optional, for any PHI-touching handler.
- AI provider calls go through a dedicated module that enforces de-identification + consent + audit.

## Open questions
- NestJS vs Fastify.
- Prisma vs Drizzle.
- gRPC for service-to-service when we have >2 services?
