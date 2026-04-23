import { randomUUID } from "node:crypto";
import {
  buildBiosignalBatch,
  SCHEMA_VERSION,
  type BiosignalBatchEvent,
  type OrganizationId,
  type PatientId,
  type WhoopCycle,
  type WhoopRecovery,
  type WhoopSleep,
} from "@azri/contracts";

/**
 * Normalise Whoop resources into AZRI's canonical biosignal events.
 * Each Whoop resource produces 1..N batches: e.g. a recovery produces
 * three (recovery score, RHR, HRV).
 */
export interface NormaliseTarget {
  organizationId: OrganizationId;
  patientId: PatientId;
}

const SOURCE = {
  deviceKind: "whoop",
  appVersion: "0.1.0",
} as const;

export function normaliseRecovery(
  rec: WhoopRecovery,
  target: NormaliseTarget,
): BiosignalBatchEvent[] {
  const at = rec.updated_at;
  const make = (
    kind: BiosignalBatchEvent["kind"],
    unit: BiosignalBatchEvent["unit"],
    value: number,
  ) =>
    buildBiosignalBatch({
      eventId: randomUUID(),
      organizationId: target.organizationId,
      patientId: target.patientId,
      occurredAt: at,
      schemaVersion: SCHEMA_VERSION,
      kind,
      unit,
      samples: [{ at, value }],
      source: SOURCE,
    });
  return [
    make("whoop_recovery_score", "score", rec.score.recovery_score),
    make("resting_heart_rate", "bpm", rec.score.resting_heart_rate),
    make("heart_rate_variability", "ms", rec.score.hrv_rmssd_milli),
  ];
}

export function normaliseSleep(
  sleep: WhoopSleep,
  target: NormaliseTarget,
): BiosignalBatchEvent[] {
  const at = sleep.updated_at;
  const events: BiosignalBatchEvent[] = [
    buildBiosignalBatch({
      eventId: randomUUID(),
      organizationId: target.organizationId,
      patientId: target.patientId,
      occurredAt: at,
      schemaVersion: SCHEMA_VERSION,
      kind: "whoop_sleep_performance",
      unit: "score",
      samples: [{ at, value: sleep.score.sleep_performance_percentage }],
      source: SOURCE,
    }),
  ];
  if (typeof sleep.score.respiratory_rate === "number") {
    events.push(
      buildBiosignalBatch({
        eventId: randomUUID(),
        organizationId: target.organizationId,
        patientId: target.patientId,
        occurredAt: at,
        schemaVersion: SCHEMA_VERSION,
        kind: "respiratory_rate",
        unit: "breaths_per_min",
        samples: [{ at, value: sleep.score.respiratory_rate }],
        source: SOURCE,
      }),
    );
  }
  return events;
}

export function normaliseCycle(
  cycle: WhoopCycle,
  target: NormaliseTarget,
): BiosignalBatchEvent[] {
  const at = cycle.updated_at;
  return [
    buildBiosignalBatch({
      eventId: randomUUID(),
      organizationId: target.organizationId,
      patientId: target.patientId,
      occurredAt: at,
      schemaVersion: SCHEMA_VERSION,
      kind: "whoop_strain",
      unit: "score",
      samples: [{ at, value: cycle.score.strain }],
      source: SOURCE,
    }),
    buildBiosignalBatch({
      eventId: randomUUID(),
      organizationId: target.organizationId,
      patientId: target.patientId,
      occurredAt: at,
      schemaVersion: SCHEMA_VERSION,
      kind: "heart_rate",
      unit: "bpm",
      samples: [
        { at, value: cycle.score.average_heart_rate },
        { at, value: cycle.score.max_heart_rate, confidence: 0.99 },
      ],
      source: SOURCE,
    }),
  ];
}
