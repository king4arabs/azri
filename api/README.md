# @azri/api

Fastify ingestion + core API for AZRI. Validates every request against
`@azri/contracts`, signs / verifies Whoop webhooks, idempotently accepts
watch event batches, exposes OpenAPI at `/docs`.

## What's wired today

| Route | Purpose |
| --- | --- |
| `GET /healthz` `GET /readyz` `GET /livez` | Health probes; `readyz` returns the contracts schema version. |
| `POST /v1/ingest/watch` | Idempotent batch ingest from Apple Watch / Wear OS / phone relay. |
| `POST /v1/webhooks/whoop` | HMAC-verified Whoop webhook receiver with replay protection. |
| `POST /v1/episodes` | Self-reported episode log. |
| `POST /v1/alerts/raised` `POST /v1/alerts/acknowledged` | Alert relay scaffolding. |
| `GET /docs` | OpenAPI UI. |

Real persistence (Postgres + RLS), auth (ADR-0004), and notification
fan-out (notification service) land in subsequent phases — see
`ROADMAP.md` v0.3.0–v0.5.0.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
# http://localhost:8080/docs
```

## Test

```bash
npm test
```

## Notes

- The Whoop webhook handler consults the in-memory idempotency store. In
  production we swap that for Redis behind the `IdempotencyStore`
  interface — keep the surface minimal.
- The error handler converts Zod failures to the `ApiError` envelope and
  never leaks internal stack traces.
- The pino logger is configured to redact known PHI paths; structured
  payloads are passed through `redactForLog` before logging.
