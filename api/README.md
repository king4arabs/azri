# @azri/api

> **Scaffold — not a production API.** This package lands the baseline
> Fastify server that future AZRI services will extend. No authentication,
> no database, no PHI handling is wired yet.

## What's here

| Endpoint | Purpose |
| --- | --- |
| `GET /healthz` | Liveness probe (process is alive) |
| `GET /readyz` | Readiness probe (ready to accept traffic; extend as deps land) |
| `GET /version` | Package name, semver, optional `GIT_SHA` |
| `GET /docs` | Swagger UI (off by default in production) |
| `GET /documentation/json` | Raw OpenAPI spec (via `@fastify/swagger`) |

## Design decisions

- **Framework:** Fastify 5. See ADR-0012.
- **Language:** TypeScript (ES2022 target, strict, `noUncheckedIndexedAccess`).
- **Logging:** Pino with PHI-adjacent fields redacted by default
  (`authorization`, `cookie`, `x-api-key`, `body.password`, `body.token`).
  Expand the redact list as real endpoints land.
- **Request IDs:** `x-request-id` is honored if provided (up to 128 chars) or
  generated via `crypto.randomUUID()`. Every log line carries it.
- **Hardening:** Helmet, CORS allowlist, global rate limiting.
- **OpenAPI first:** every route declares a schema; the spec is the contract.
- **Containers:** multi-stage `Dockerfile`, runs as the `node` user, emits a
  health check against `/healthz`.

## What's deliberately missing

- **Auth / RBAC.** Blocked on ADR-0004.
- **Database / migrations.** Blocked on ADR-0005.
- **PHI endpoints** (patients, episodes, reports). Land in v0.3.0 with the
  doctor dashboard.
- **Audit logging.** Schema lives in `DATA_MODEL.md`; writer lands with the
  first PHI endpoint.
- **AI inference routes.** Land in v0.6.0 per `AI_TRANSPARENCY.md`.

Adding any of the above requires extending `SECURITY.md`, `DATA_MODEL.md`,
and the PR healthcare-wording + privacy checklists.

## Local development

```bash
cd api
cp .env.example .env      # then fill in placeholders
npm install
npm run dev               # tsx watch mode on PORT=3001
```

Visit:
- http://localhost:3001/healthz
- http://localhost:3001/readyz
- http://localhost:3001/version
- http://localhost:3001/docs (Swagger UI when `EXPOSE_OPENAPI_UI=true`)

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Watch mode via `tsx` |
| `npm run build` | Type-check + emit JS to `dist/` |
| `npm run start` | Run `dist/server.js` (production entry) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | `node:test` smoke tests using `fastify.inject` |

## Docker

```bash
docker build -t azri-api .
docker run --rm -p 3001:3001 --env-file .env azri-api
```

## Env vars

All variables are listed (with policy notes) in `.env.example`. Production
must not read a variable that is not documented there — per the
`.env.example` policy in `SECURITY.md`.

## Where PHI will eventually live

Nowhere in this package until the first PHI endpoint lands. When it does:

- Classification per `DATA_MODEL.md` → **Sensitive PHI** minimum.
- Residency per `DATA_MODEL.md#ksa-classification-mapping` + ADR-0007.
- Consent check at request time, not at grant time only.
- Audit event emitted in the same code path (no trailing side effects).
- PHI fields never appear in logs, metrics, analytics events, error reports,
  or crash dumps. The pino redact list is the last line of defense, not the
  first.
