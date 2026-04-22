# API_DOCUMENTATION

> Conventions for AZRI APIs. Code lands in v0.2.0+; this is the contract every API PR must follow.

## Style

- **REST-first**, JSON over HTTPS. GraphQL only if a strong, written justification exists (ADR required).
- **OpenAPI 3.1** is the source of truth for HTTP APIs. Code generated from spec, not the other way around.
- **Resource-oriented URLs:** `/v1/patients/{id}/episodes`.
- **Verbs in HTTP, not URLs:** prefer `POST /v1/episodes/{id}:annotate` over `POST /v1/annotate-episode/{id}` only when the action does not map cleanly to CRUD.
- **Plural collection names**, kebab-case if compound.

## Versioning

- URL prefix: `/v1`, `/v2`, …
- Backwards-compatible changes within a major version. Removals/renames require a new major **and** a documented deprecation window of at least one minor release.
- Each response includes `X-AZRI-Api-Version` (e.g. `1`).
- Server can serve multiple major versions concurrently during deprecation windows.

## Auth

- Bearer tokens (JWT or opaque) over `Authorization: Bearer <token>`.
- All authenticated requests must include the org context (resolved from token); no `?org=` query for security-sensitive ops.
- Step-up auth indicated by token claim or short-lived re-auth token; required for sensitive endpoints (see `SECURITY.md`).
- Service-to-service via mTLS or signed JWTs scoped narrowly.

## Errors

Single, predictable error envelope:

```json
{
  "error": {
    "code": "patient_not_found",
    "message": "No patient matched the given identifier in this organization.",
    "request_id": "req_01HXYZ...",
    "details": {}
  }
}
```

- `code` is a stable machine-readable string (snake_case). Never change the meaning of an existing code.
- `message` is human-readable and **must not contain PHI**.
- `request_id` is logged server-side and surfaced to support.
- HTTP status codes used correctly (4xx client, 5xx server). `409` for state conflicts, `422` for semantic validation, `429` for rate limit.

## Pagination

- Cursor-based. `?limit=50&cursor=...`. Response includes `next_cursor` (or null).
- Hard server cap on `limit` (e.g. 200).

## Filtering & sorting

- Filters: `?status=active&created_after=2026-01-01`.
- Sorting: `?sort=-created_at` (`-` for descending). Whitelist allowed fields per resource.

## Idempotency

- All `POST` that creates resources accept `Idempotency-Key` header. 24h key retention server-side.

## Rate limiting

- Per-token and per-IP. `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` headers.
- Sensitive endpoints (export, audit log) are rate-limited more aggressively.

## Audit & PHI

- Every PHI-touching endpoint emits an audit record (see `SECURITY.md`).
- PHI never appears in error messages, logs, or response payloads beyond what the caller is authorized to see.
- Field-level scopes possible via the auth claim set.

## Webhooks (where used)

- Signed with HMAC-SHA256; signature in `X-AZRI-Signature` header.
- At-least-once delivery; consumers must be idempotent.
- Retries with exponential backoff up to 24h; dead-lettered after.
- Documented event schemas in OpenAPI (or AsyncAPI when introduced).

## Documentation outputs

- Spec at `/v1/openapi.json` (gated to authenticated developers in production).
- Human-readable docs site generated (Redoc/Stoplight/Scalar — decision in v0.3.0).
- Sample code in JS, Swift, Python at minimum starting v0.5.0.

## Open items

- GraphQL gateway decision (currently **no**).
- Public API tier vs internal-only (initial assumption: internal + partner only until v0.7.0).
