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

## Wearables — what ships in v0.4.0

Wearable surfaces are not packaged as third-party SDKs in v0.4.0; they are
*first-party clients* of the AZRI ingestion API. The wire format they
emit is defined by [`@azri/contracts`](./packages/contracts/) and stays
stable across surfaces.

| Surface | Code path | Wire spec | Build tooling |
| --- | --- | --- | --- |
| Apple Watch + iPhone (HealthKit) | `apps/ios/` | `apps/ios/AzriShared/Models/ContractTypes.swift` mirrors `@azri/contracts` | Xcode 16+, XcodeGen (`apps/ios/project.yml`) |
| Wear OS (Samsung Galaxy Watch 4+, Pixel Watch) | `apps/wear-os/` | `apps/wear-os/app/src/main/java/ai/azri/wear/ContractTypes.kt` mirrors `@azri/contracts` | Android Studio Hedgehog+, Gradle 8.10+ |
| Whoop strap | `integrations/whoop/` (server-side) | Imports `@azri/contracts` directly | Node 22+ |
| Patient phone (Expo) | `apps/mobile/` | Imports `@azri/contracts` directly | Expo 52, Node 22+ |
| Patient web (`/app/*`) | `web/app/app/` | Imports `@azri/contracts` directly | Next.js 16, Node 22+ |

### Samsung legacy (Tizen)

Older Galaxy Watches (Watch 3 and earlier) run Tizen. AZRI does **not**
ship a Tizen client. The patient app on the phone detects the unsupported
model, shows a polite message, and falls back to bridging signals from
the phone's Health Connect / HealthKit. This posture is recorded in
ADR-0009 and tracked in `OPERATIONS.md`.

### Schema-mirror discipline

When `@azri/contracts` ships a MAJOR version, the Swift mirror
(`apps/ios/AzriShared/Models/ContractTypes.swift`) and the Kotlin mirror
(`apps/wear-os/app/src/main/java/ai/azri/wear/ContractTypes.kt`) MUST
update in the same PR. The `SCHEMA_VERSION` constant on each side is
checked by CI against the canonical value in
`packages/contracts/src/version.ts`.
