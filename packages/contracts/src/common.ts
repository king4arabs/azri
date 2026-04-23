import { z } from "zod";

/** ISO-8601 UTC instant, e.g. "2026-04-23T07:15:00.000Z". */
export const Iso8601 = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/,
    "expected ISO-8601 UTC timestamp",
  );
export type Iso8601 = z.infer<typeof Iso8601>;

/**
 * UUIDv4. We use UUIDs (not sequential ids) for any resource that might
 * leak into a URL, log, or inter-service boundary.
 */
export const Uuid = z.string().uuid();
export type Uuid = z.infer<typeof Uuid>;

/**
 * Tenant / organization identifier. Every PHI-bearing payload carries
 * one so row-level security and audit can scope access.
 */
export const OrganizationId = Uuid.brand<"OrganizationId">();
export type OrganizationId = z.infer<typeof OrganizationId>;

export const PatientId = Uuid.brand<"PatientId">();
export type PatientId = z.infer<typeof PatientId>;

export const CaregiverId = Uuid.brand<"CaregiverId">();
export type CaregiverId = z.infer<typeof CaregiverId>;

export const UserId = Uuid.brand<"UserId">();
export type UserId = z.infer<typeof UserId>;

/**
 * PHI classification. Mirrors DATA_MODEL.md "KSA classification mapping"
 * (PDPL + NDMO). Every event that crosses a service boundary must declare
 * one — the analytics layer and the logger use this to redact.
 *
 * - `public`            — marketing / UI microcopy; safe to log & analyse.
 * - `internal`          — non-PHI ops data (sync jobs, rate-limit counters).
 * - `personal`          — user identifiers, preferences, locale; no health.
 * - `health`            — clinical context: diagnoses, meds, episodes.
 * - `health-sensitive`  — raw biosignals, images, audio, mental-health notes.
 */
export const PhiClassification = z.enum([
  "public",
  "internal",
  "personal",
  "health",
  "health-sensitive",
]);
export type PhiClassification = z.infer<typeof PhiClassification>;

/** BCP-47 locale with AZRI's current supported set. */
export const Locale = z.enum(["ar", "en"]);
export type Locale = z.infer<typeof Locale>;

export const TextDirection = z.enum(["rtl", "ltr"]);
export type TextDirection = z.infer<typeof TextDirection>;

/**
 * Device kind. Watch, wearable, and phone surfaces identify themselves so
 * the ingestion API can route to per-source normalisers and so audit can
 * answer "where did this signal come from?".
 */
export const DeviceKind = z.enum([
  "ios-phone",
  "ios-watch", // Apple Watch via HealthKit / WatchConnectivity
  "android-phone",
  "wear-os", // Samsung Galaxy Watch (Wear OS) + other Wear OS watches
  "tizen", // Legacy Samsung Galaxy Watch 3 and older on Tizen — bridged via companion phone
  "whoop", // Whoop strap via cloud webhook
  "web", // Manual entry from the web app
  "server-test", // Synthetic / test fixtures
  "unknown",
]);
export type DeviceKind = z.infer<typeof DeviceKind>;

/** Origin metadata present on every ingested event. */
export const EventSource = z
  .object({
    deviceKind: DeviceKind,
    deviceModel: z.string().max(120).optional(),
    osVersion: z.string().max(40).optional(),
    appVersion: z.string().max(40).optional(),
    /**
     * Stable per-device install id. Hashed at the edge — never the raw
     * device serial / IDFV / ANDROID_ID.
     */
    installId: z.string().max(128).optional(),
  })
  .strict();
export type EventSource = z.infer<typeof EventSource>;

/**
 * Envelope shared by every ingested event. All specific event schemas
 * extend this.
 */
export const EventEnvelopeBase = z
  .object({
    /** Client-generated UUID; used for idempotent replay. */
    eventId: Uuid,
    schemaVersion: z.string().min(3),
    occurredAt: Iso8601,
    /** Set by the API on receipt; absent on outgoing events. */
    ingestedAt: Iso8601.optional(),
    organizationId: OrganizationId,
    patientId: PatientId,
    source: EventSource,
    phiClassification: PhiClassification,
  })
  .strict();
export type EventEnvelopeBase = z.infer<typeof EventEnvelopeBase>;

/** Standard error envelope used by the API and every MCP response. */
export const ApiError = z
  .object({
    code: z.string().min(1).max(64),
    message: z.string().min(1).max(500),
    correlationId: z.string().max(64).optional(),
    details: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();
export type ApiError = z.infer<typeof ApiError>;
