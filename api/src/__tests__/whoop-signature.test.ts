import { strict as assert } from "node:assert";
import { test } from "node:test";
import { createHmac } from "node:crypto";
import { verifyWhoopSignature } from "../lib/whoop-signature.js";

const secret = "test-secret";
const body = JSON.stringify({ hello: "world" });

function signNow(body: string) {
  const ts = Math.floor(Date.now() / 1000).toString();
  const mac = createHmac("sha256", secret);
  mac.update(ts);
  mac.update(".");
  mac.update(body);
  return { ts, signature: mac.digest("base64") };
}

test("accepts a fresh, correctly-signed payload", () => {
  const { ts, signature } = signNow(body);
  assert.equal(
    verifyWhoopSignature({ rawBody: body, timestamp: ts, signature, secret }),
    true,
  );
});

test("rejects a tampered body", () => {
  const { ts, signature } = signNow(body);
  assert.equal(
    verifyWhoopSignature({
      rawBody: body + "tampered",
      timestamp: ts,
      signature,
      secret,
    }),
    false,
  );
});

test("rejects a stale timestamp", () => {
  const oldTs = (Math.floor(Date.now() / 1000) - 10_000).toString();
  const mac = createHmac("sha256", secret);
  mac.update(oldTs);
  mac.update(".");
  mac.update(body);
  const sig = mac.digest("base64");
  assert.equal(
    verifyWhoopSignature({
      rawBody: body,
      timestamp: oldTs,
      signature: sig,
      secret,
    }),
    false,
  );
});

test("rejects malformed timestamp", () => {
  const { signature } = signNow(body);
  assert.equal(
    verifyWhoopSignature({
      rawBody: body,
      timestamp: "not-a-number",
      signature,
      secret,
    }),
    false,
  );
});
