import { strict as assert } from "node:assert";
import { test } from "node:test";
import { redactForLog } from "../lib/redact.js";

test("redacts known PHI keys", () => {
  const out = redactForLog({
    eventId: "abc",
    samples: [{ at: "now", value: 78 }],
    note: "patient said X",
  }) as Record<string, unknown>;
  assert.equal(out["eventId"], "abc");
  assert.equal(out["samples"], "[redacted]");
  assert.equal(out["note"], "[redacted]");
});

test("collapses long arrays", () => {
  const out = redactForLog(Array.from({ length: 50 }, () => ({ x: 1 })));
  assert.match(String(out), /array len=50/);
});

test("returns primitives unchanged", () => {
  assert.equal(redactForLog(123), 123);
  assert.equal(redactForLog("hi"), "hi");
  assert.equal(redactForLog(null), null);
});
