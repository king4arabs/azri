import { z } from "zod";
import {
  EventEnvelopeBase,
  Iso8601,
  OrganizationId,
  PatientId,
  PhiClassification,
} from "./common.js";

/**
 * Biosignal types AZRI ingests today. This list is intentionally narrow —
 * adding a new kind is a PR event because it implies new privacy,
 * retention, and clinical-wording decisions.
 */
export const BiosignalKind = z.enum([
  "heart_rate", // bpm, 1 Hz aggregates
  "heart_rate_variability", // RMSSD ms
  "resting_heart_rate", // bpm, per-day
  "oxygen_saturation", // SpO2 %
  "respiratory_rate", // breaths/min
  "skin_temperature_delta", // °C deviation from baseline
  "electrodermal_activity", // µS — stress/arousal proxy
  "sleep_stage", // awake | light | deep | rem
  "step_count", // steps, 1-min bucket
  "active_energy", // kcal, 1-min bucket
  "fall_detection", // boolean event (Apple Watch, Wear OS)
  "seizure_sensor", // research-only; vendor-specific, guardrail-heavy
  "whoop_recovery_score", // 0-100
  "whoop_strain", // 0-21
  "whoop_sleep_performance", // 0-100
]);
export type BiosignalKind = z.infer<typeof BiosignalKind>;

export const BiosignalUnit = z.enum([
  "bpm",
  "ms",
  "percent",
  "breaths_per_min",
  "celsius_delta",
  "microsiemens",
  "count",
  "kcal",
  "score",
  "boolean",
  "stage",
]);
export type BiosignalUnit = z.infer<typeof BiosignalUnit>;

/**
 * A single biosignal sample. Watches emit many of these per event envelope
 * (see `BiosignalBatchEvent`). Storing samples individually would be
 * prohibitively chatty — always batch at the edge.
 */
export const BiosignalSample = z
  .object({
    at: Iso8601,
    value: z.union([z.number(), z.string(), z.boolean()]),
    /** Optional confidence 0..1 — absent means "device did not report". */
    confidence: z.number().min(0).max(1).optional(),
  })
  .strict();
export type BiosignalSample = z.infer<typeof BiosignalSample>;

/**
 * A batch of samples for one kind + unit, bounded in size so each request
 * fits comfortably in a single log line and a reasonable TLS record.
 */
export const BiosignalBatchEvent = EventEnvelopeBase.extend({
  type: z.literal("biosignal.batch"),
  kind: BiosignalKind,
  unit: BiosignalUnit,
  samples: z.array(BiosignalSample).min(1).max(2_000),
  /** Sampling frequency hint in Hz (optional, e.g. 1 for per-second HR). */
  samplingHz: z.number().positive().max(1_000).optional(),
}).strict();
export type BiosignalBatchEvent = z.infer<typeof BiosignalBatchEvent>;

/**
 * Helper: construct a biosignal batch without manually specifying
 * boilerplate envelope defaults. Used by watch and mobile clients.
 */
export interface BiosignalBatchInit {
  eventId: string;
  organizationId: OrganizationId;
  patientId: PatientId;
  occurredAt: string;
  kind: BiosignalKind;
  unit: BiosignalUnit;
  samples: BiosignalSample[];
  samplingHz?: number | undefined;
  source: BiosignalBatchEvent["source"];
  schemaVersion: string;
  /** Defaults to `"health-sensitive"` if the kind is biosignal-derived. */
  phiClassification?: PhiClassification | undefined;
}

export function buildBiosignalBatch(
  init: BiosignalBatchInit,
): BiosignalBatchEvent {
  return BiosignalBatchEvent.parse({
    type: "biosignal.batch" as const,
    eventId: init.eventId,
    schemaVersion: init.schemaVersion,
    occurredAt: init.occurredAt,
    organizationId: init.organizationId,
    patientId: init.patientId,
    source: init.source,
    phiClassification: init.phiClassification ?? "health-sensitive",
    kind: init.kind,
    unit: init.unit,
    samples: init.samples,
    ...(init.samplingHz !== undefined ? { samplingHz: init.samplingHz } : {}),
  });
}
