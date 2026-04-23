import { strict as assert } from "node:assert";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import {
  AlertRaisedEvent,
  BiosignalBatchEvent,
  buildBiosignalBatch,
  DeviceConnectionEvent,
  EpisodeLoggedEvent,
  PhiClassification,
  SCHEMA_VERSION,
  WatchIngestRequest,
  WhoopWebhookPayload,
  type OrganizationId,
  type PatientId,
} from "../index.js";

const orgId = randomUUID() as OrganizationId;
const patientId = randomUUID() as PatientId;
const now = new Date().toISOString();

test("SCHEMA_VERSION matches CHANGELOG-pinned version", () => {
  assert.equal(SCHEMA_VERSION, "0.2.0");
});

test("PhiClassification rejects unknown values", () => {
  assert.throws(() => PhiClassification.parse("public-ish"));
  assert.equal(PhiClassification.parse("health-sensitive"), "health-sensitive");
});

test("buildBiosignalBatch produces a parseable event", () => {
  const event = buildBiosignalBatch({
    eventId: randomUUID(),
    organizationId: orgId,
    patientId,
    occurredAt: now,
    schemaVersion: SCHEMA_VERSION,
    kind: "heart_rate",
    unit: "bpm",
    samplingHz: 1,
    samples: [
      { at: now, value: 78 },
      { at: now, value: 80, confidence: 0.92 },
    ],
    source: { deviceKind: "ios-watch", appVersion: "0.4.0" },
  });
  assert.equal(event.type, "biosignal.batch");
  assert.equal(event.kind, "heart_rate");
  assert.equal(event.samples.length, 2);
});

test("BiosignalBatchEvent rejects empty sample arrays", () => {
  assert.throws(() =>
    BiosignalBatchEvent.parse({
      type: "biosignal.batch",
      eventId: randomUUID(),
      schemaVersion: SCHEMA_VERSION,
      occurredAt: now,
      organizationId: orgId,
      patientId,
      source: { deviceKind: "ios-watch" },
      phiClassification: "health-sensitive",
      kind: "heart_rate",
      unit: "bpm",
      samples: [],
    }),
  );
});

test("EpisodeLoggedEvent enforces tag count limit", () => {
  const make = (tagCount: number) =>
    EpisodeLoggedEvent.parse({
      type: "episode.logged",
      eventId: randomUUID(),
      schemaVersion: SCHEMA_VERSION,
      occurredAt: now,
      organizationId: orgId,
      patientId,
      source: { deviceKind: "ios-phone" },
      phiClassification: "health",
      episodeId: randomUUID(),
      episodeType: "suspected_seizure",
      severity: "moderate",
      coarseDuration: "30s_to_2m",
      reporter: "self",
      tags: Array.from({ length: tagCount }, (_, i) => `tag-${i}`),
    });
  assert.doesNotThrow(() => make(5));
  assert.throws(() => make(20));
});

test("AlertRaisedEvent requires at least one body and channel", () => {
  assert.throws(() =>
    AlertRaisedEvent.parse({
      type: "alert.raised",
      eventId: randomUUID(),
      schemaVersion: SCHEMA_VERSION,
      occurredAt: now,
      organizationId: orgId,
      patientId,
      source: { deviceKind: "ios-watch" },
      phiClassification: "health",
      alertId: randomUUID(),
      severity: "urgent",
      reason: "fall_detected",
      bodies: [],
      channels: [],
      correlatedEventIds: [],
    }),
  );
});

test("WatchIngestRequest rejects oversized batches", () => {
  const event: DeviceConnectionEvent = {
    type: "device.connection",
    eventId: randomUUID(),
    schemaVersion: SCHEMA_VERSION,
    occurredAt: now,
    organizationId: orgId,
    patientId,
    source: { deviceKind: "wear-os" },
    phiClassification: "internal",
    state: "connected",
  };
  const overcount = 250;
  assert.throws(() =>
    WatchIngestRequest.parse({
      batchId: randomUUID(),
      sentAt: now,
      events: Array.from({ length: overcount }, () => event),
    }),
  );
});

test("WhoopWebhookPayload rejects unknown event types", () => {
  assert.throws(() =>
    WhoopWebhookPayload.parse({
      type: "recovery.deleted",
      user_id: "abc",
      id: 1,
      event_id: "evt-1",
      occurred_at: now,
    }),
  );
});
