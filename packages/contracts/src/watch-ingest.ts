import { z } from "zod";
import { AlertAcknowledgedEvent, AlertRaisedEvent } from "./alerts.js";
import { BiosignalBatchEvent } from "./biosignals.js";
import {
  EventEnvelopeBase,
  Iso8601,
  Uuid,
} from "./common.js";
import { EpisodeLoggedEvent } from "./episodes.js";

/**
 * Wearable connection state. Watches and the Whoop strap raise this so the
 * server knows when to stop expecting heartbeat samples (and so the patient
 * UI can show "device offline").
 */
export const DeviceConnectionEvent = EventEnvelopeBase.extend({
  type: z.literal("device.connection"),
  state: z.enum(["connected", "disconnected", "low_battery", "charging"]),
  /** Battery 0..1 if known. */
  batteryLevel: z.number().min(0).max(1).optional(),
  /** Last successful sync from device → phone → cloud, for debugging. */
  lastSyncAt: Iso8601.optional(),
}).strict();
export type DeviceConnectionEvent = z.infer<typeof DeviceConnectionEvent>;

/**
 * Discriminated union of every event the watch ingestion endpoint accepts.
 * Adding a new variant is intentionally a touch-many-files change so we
 * remember to update the API, the client SDKs, and the docs.
 */
export const WatchIngestEvent = z.discriminatedUnion("type", [
  BiosignalBatchEvent,
  EpisodeLoggedEvent,
  AlertRaisedEvent,
  AlertAcknowledgedEvent,
  DeviceConnectionEvent,
]);
export type WatchIngestEvent = z.infer<typeof WatchIngestEvent>;

/**
 * Batch wrapper. Devices may queue events while offline and flush in one
 * request when they reconnect; the API is required to accept up to
 * `MAX_EVENTS_PER_INGEST` events per request and process them idempotently
 * by `eventId`.
 */
export const MAX_EVENTS_PER_INGEST = 200 as const;

export const WatchIngestRequest = z
  .object({
    /** Client-generated batch id; helps debugging and dedup logging. */
    batchId: Uuid,
    sentAt: Iso8601,
    events: z.array(WatchIngestEvent).min(1).max(MAX_EVENTS_PER_INGEST),
  })
  .strict();
export type WatchIngestRequest = z.infer<typeof WatchIngestRequest>;

export const WatchIngestResult = z
  .object({
    eventId: Uuid,
    /** "accepted" | "duplicate" | "rejected" */
    status: z.enum(["accepted", "duplicate", "rejected"]),
    /** Set when status === "rejected". */
    errorCode: z.string().max(64).optional(),
    /** Set when status === "rejected". */
    errorMessage: z.string().max(400).optional(),
  })
  .strict();
export type WatchIngestResult = z.infer<typeof WatchIngestResult>;

export const WatchIngestResponse = z
  .object({
    batchId: Uuid,
    receivedAt: Iso8601,
    results: z.array(WatchIngestResult).min(1),
  })
  .strict();
export type WatchIngestResponse = z.infer<typeof WatchIngestResponse>;
