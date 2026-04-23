import { strict as assert } from "node:assert";
import { test } from "node:test";
import { createInMemoryIdempotencyStore } from "../lib/idempotency.js";

test("first record returns true; replay returns false", async () => {
  const store = createInMemoryIdempotencyStore();
  assert.equal(await store.recordIfNew("k1"), true);
  assert.equal(await store.recordIfNew("k1"), false);
});

test("expired entries are accepted again", async () => {
  const store = createInMemoryIdempotencyStore();
  assert.equal(await store.recordIfNew("k2", 5), true);
  await new Promise((r) => setTimeout(r, 15));
  assert.equal(await store.recordIfNew("k2"), true);
});

test("distinct keys are independent", async () => {
  const store = createInMemoryIdempotencyStore();
  assert.equal(await store.recordIfNew("a"), true);
  assert.equal(await store.recordIfNew("b"), true);
});
