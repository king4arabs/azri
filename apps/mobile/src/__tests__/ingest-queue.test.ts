import { strict as assert } from "node:assert";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import { IngestQueue } from "../ingest/IngestQueue.js";
import type {
  BiosignalBatchEvent,
  OrganizationId,
  PatientId,
} from "@azri/contracts";

function fakeEvent(): BiosignalBatchEvent {
  const at = new Date().toISOString();
  return {
    type: "biosignal.batch",
    eventId: randomUUID(),
    schemaVersion: "0.2.0",
    occurredAt: at,
    organizationId: randomUUID() as OrganizationId,
    patientId: randomUUID() as PatientId,
    source: { deviceKind: "ios-phone", appVersion: "0.4.0" },
    phiClassification: "health-sensitive",
    kind: "heart_rate",
    unit: "bpm",
    samples: [{ at, value: 78 }],
  } as BiosignalBatchEvent;
}

test("flush dequeues only when post succeeds", async () => {
  let called = 0;
  const queue = new IngestQueue({
    poster: async () => {
      called++;
      return true;
    },
  });
  queue.enqueue([fakeEvent(), fakeEvent(), fakeEvent()]);
  const delivered = await queue.flush();
  assert.equal(delivered, 3);
  assert.equal(queue.depth(), 0);
  assert.equal(called, 1);
});

test("flush re-queues on failure", async () => {
  const queue = new IngestQueue({
    poster: async () => false,
  });
  queue.enqueue([fakeEvent(), fakeEvent()]);
  const delivered = await queue.flush();
  assert.equal(delivered, 0);
  assert.equal(queue.depth(), 2);
});

test("flush handles thrown errors as failure", async () => {
  const queue = new IngestQueue({
    poster: async () => {
      throw new Error("net");
    },
  });
  queue.enqueue([fakeEvent()]);
  const delivered = await queue.flush();
  assert.equal(delivered, 0);
  assert.equal(queue.depth(), 1);
});
