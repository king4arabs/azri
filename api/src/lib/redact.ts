/**
 * PHI-aware redaction for structured logs. The pino logger is configured
 * with `redact.paths` for known structural fields, but events come from
 * many shapes (Whoop, watch, mobile) so we also pass payloads through this
 * helper before logging.
 *
 * Rule of thumb: log enough to debug correlation (event ids, timings,
 * device kind) and never enough to leak PHI.
 */
const PHI_KEYS = new Set([
  "samples",
  "value",
  "body",
  "note",
  "rawBody",
  "accessToken",
  "refreshToken",
  "score",
  "respiratoryRate",
  "heartRate",
  "hrv_rmssd_milli",
  "resting_heart_rate",
]);

export function redactForLog<T>(payload: T): unknown {
  if (payload === null || typeof payload !== "object") return payload;
  if (Array.isArray(payload)) {
    return payload.length > 5
      ? `[array len=${payload.length} redacted]`
      : payload.map((p) => redactForLog(p));
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(payload as Record<string, unknown>)) {
    if (PHI_KEYS.has(k)) {
      out[k] = "[redacted]";
      continue;
    }
    out[k] = redactForLog(v);
  }
  return out;
}
