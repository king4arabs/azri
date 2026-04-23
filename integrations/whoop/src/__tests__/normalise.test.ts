import { strict as assert } from "node:assert";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import type { OrganizationId, PatientId } from "@azri/contracts";
import {
  normaliseCycle,
  normaliseRecovery,
  normaliseSleep,
} from "../normalise.js";

const target = {
  organizationId: randomUUID() as OrganizationId,
  patientId: randomUUID() as PatientId,
};
const at = new Date().toISOString();

test("normaliseRecovery emits three biosignal batches", () => {
  const out = normaliseRecovery(
    {
      id: 1,
      cycle_id: 1,
      score: {
        recovery_score: 67,
        resting_heart_rate: 58,
        hrv_rmssd_milli: 41,
      },
      created_at: at,
      updated_at: at,
    },
    target,
  );
  assert.equal(out.length, 3);
  const kinds = out.map((e) => e.kind).sort();
  assert.deepEqual(kinds, [
    "heart_rate_variability",
    "resting_heart_rate",
    "whoop_recovery_score",
  ]);
});

test("normaliseSleep omits respiratory rate when missing", () => {
  const out = normaliseSleep(
    {
      id: 9,
      score: { sleep_performance_percentage: 88 },
      start: at,
      end: at,
      created_at: at,
      updated_at: at,
    },
    target,
  );
  assert.equal(out.length, 1);
  assert.equal(out[0]?.kind, "whoop_sleep_performance");
});

test("normaliseCycle emits strain + heart rate", () => {
  const out = normaliseCycle(
    {
      id: 5,
      score: {
        strain: 13.2,
        average_heart_rate: 84,
        max_heart_rate: 165,
      },
      start: at,
      created_at: at,
      updated_at: at,
    },
    target,
  );
  const kinds = out.map((e) => e.kind).sort();
  assert.deepEqual(kinds, ["heart_rate", "whoop_strain"]);
  const hr = out.find((e) => e.kind === "heart_rate");
  assert.equal(hr?.samples.length, 2);
});
