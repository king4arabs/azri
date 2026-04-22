# SDK_DOCUMENTATION

> Plan and conventions for AZRI SDKs. No SDKs are published in v0.1.0; this document defines what they will look like when they do.

## Why SDKs

- Reduce integration friction for hospitals, EMR vendors, and partners.
- Encode auth, retry, idempotency, and PHI-safety conventions so partners don't have to.
- Typed contracts generated from OpenAPI keep clients in sync with the API.

## Targets (planned)

| SDK | Phase | Use case |
| --- | --- | --- |
| `@azri/web` (TS) | v0.3.0 | Browser & Node consumers (doctor console, partners) |
| `@azri/server` (Node) | v0.4.0 | Backend integrations (EMR pipelines) |
| `azri-ios` (Swift) | v0.4.0 | Patient app, partner iOS apps |
| `azri-android` (Kotlin) | v0.5.0 | Partner Android apps |
| `azri-python` | v0.5.0 | Data science / pipeline integrations |

## Generation

- Generated from the canonical OpenAPI spec via `openapi-generator` or `openapi-typescript` (TS) and `openapi-python-client` (Python).
- Generated code is committed (vendored) for review-friendly diffs.
- Hand-written ergonomics layered on top — never edited inside generated files.

## Conventions

- **Versioning** matches the underlying API major version. `@azri/web@1.x.x` targets `/v1`.
- **Semver discipline** identical to the platform.
- **Auth helpers** abstract token refresh, step-up auth, MFA challenge handling.
- **Retries** honour `Retry-After`; default exponential backoff with jitter.
- **Idempotency keys** generated automatically for `create*` methods.
- **PHI handling** — SDKs never log PHI by default; debug logging is opt-in and explicitly redacts.
- **Tracing** — SDKs propagate W3C `traceparent` when available.
- **Locale** — methods accept and pass through `Accept-Language: ar, en;q=0.9`.

## Distribution

- TS / JS via npm under `@azri/*` org.
- Swift via Swift Package Manager.
- Kotlin via Maven Central.
- Python via PyPI.

## Documentation

- Each SDK ships with a `README` quickstart, an examples directory, and inline doc comments.
- Generated reference site published per SDK.
- Cross-SDK examples for the top journeys: list patients, create episode, export report, subscribe to webhooks.

## Stability promises

- Pre-1.0 SDKs may have breaking changes between minors; documented in their own changelogs.
- Post-1.0, breaking changes only at major bumps with a 6-month deprecation window.

## Open items

- Whether to publish a partner-only npm registry initially (private) before public release.
- SwiftPM hosting under a custom org.
