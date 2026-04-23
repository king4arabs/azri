import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verify a Whoop webhook signature.
 *
 * Whoop signs each webhook body with HMAC-SHA256 over `${timestamp}.${rawBody}`
 * using the developer-portal-issued secret, sending the signature in
 * `X-WHOOP-Signature` and the timestamp in `X-WHOOP-Signature-Timestamp`.
 *
 * The exact header names and signing scheme are pinned to what Whoop's API
 * documents at the time of writing. Treat any drift as a contract change
 * and bump the adapter MINOR per RELEASE_PROCESS.md.
 *
 * Returns true on a valid signature within the freshness window.
 */
export function verifyWhoopSignature(args: {
  rawBody: Buffer | string;
  timestamp: string;
  signature: string;
  secret: string;
  /** Reject signatures older than this (default 5 minutes) to defeat replay. */
  freshnessSeconds?: number;
}): boolean {
  const { rawBody, timestamp, signature, secret } = args;
  const freshnessSeconds = args.freshnessSeconds ?? 300;

  const tsNumber = Number(timestamp);
  if (!Number.isFinite(tsNumber)) return false;
  const skewSec = Math.abs(Date.now() / 1000 - tsNumber);
  if (skewSec > freshnessSeconds) return false;

  const body =
    typeof rawBody === "string" ? Buffer.from(rawBody, "utf8") : rawBody;
  const mac = createHmac("sha256", secret);
  mac.update(timestamp);
  mac.update(".");
  mac.update(body);
  const expected = mac.digest();

  let provided: Buffer;
  try {
    provided = Buffer.from(signature, "base64");
  } catch {
    return false;
  }
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}
