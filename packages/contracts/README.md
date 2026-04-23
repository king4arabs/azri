# @azri/contracts

Shared TypeScript + Zod contracts for the AZRI platform. Single source of
truth for biosignal events, episode logs, alerts, the watch ingestion
endpoint, the Whoop adapter, and consent scopes.

## Why this exists

AZRI runs across the marketing web, the patient mobile app, the doctor
console, the iOS / watchOS app, the Wear OS app on Samsung watches, the
Whoop strap (via cloud webhook), and the ingestion API. Without one
schema package, every surface re-invents the same shapes and they drift.
This package is consumed by every surface.

## What's in here

| Module | Purpose |
| --- | --- |
| `common.ts` | Brand-typed ids, ISO-8601, `EventSource`, `EventEnvelopeBase`, `PhiClassification` |
| `biosignals.ts` | `BiosignalKind`, `BiosignalSample`, `BiosignalBatchEvent`, `buildBiosignalBatch` |
| `episodes.ts` | `EpisodeLoggedEvent`, `EpisodeAnnotation` |
| `alerts.ts` | `AlertRaisedEvent`, `AlertAcknowledgedEvent`, channels & severity |
| `watch-ingest.ts` | `WatchIngestEvent` discriminated union, `WatchIngestRequest`, batch limits |
| `whoop.ts` | OAuth scopes, token shape, webhook payload, `WhoopRecovery` / `WhoopSleep` / `WhoopCycle` |
| `consent.ts` | Caregiver `CaregiverConsent`, scope enum |
| `version.ts` | `SCHEMA_VERSION` — bump per `RELEASE_PROCESS.md` |

## Authoring rules

1. Every wire-format type is a Zod schema. Static types are derived via
   `z.infer`. Never hand-write a type that has a schema.
2. Every PHI-bearing event carries `phiClassification` so analytics and
   logging can redact at the edge.
3. Times are ISO-8601 UTC strings on the wire. Never serialise `Date`.
4. Renaming a field, narrowing an enum, or dropping a value is a
   **MAJOR** schema bump.

## Use

```ts
import { buildBiosignalBatch, SCHEMA_VERSION } from "@azri/contracts";

const event = buildBiosignalBatch({
  eventId: crypto.randomUUID(),
  organizationId,
  patientId,
  occurredAt: new Date().toISOString(),
  schemaVersion: SCHEMA_VERSION,
  kind: "heart_rate",
  unit: "bpm",
  samplingHz: 1,
  samples: [{ at: new Date().toISOString(), value: 78 }],
  source: { deviceKind: "ios-watch", appVersion: "0.4.0" },
});
```

## Test

```bash
npm install
npm test
```
