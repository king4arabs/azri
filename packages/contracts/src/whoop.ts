import { z } from "zod";
import { Iso8601, PatientId } from "./common.js";

/**
 * Whoop OAuth2 scopes AZRI requests. Keep this list narrow — every scope
 * widens the privacy surface. Documented at
 * https://developer.whoop.com/docs/developing/scopes (Whoop's docs may
 * update; pin this list and bump deliberately).
 */
export const WhoopScope = z.enum([
  "read:recovery",
  "read:cycles",
  "read:sleep",
  "read:workout",
  "read:profile",
  "offline", // refresh-token issuance
]);
export type WhoopScope = z.infer<typeof WhoopScope>;

export const WhoopOAuthTokens = z
  .object({
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
    expiresAt: Iso8601,
    scope: z.array(WhoopScope).min(1),
    /** Whoop's user id; we map it to our PatientId in `WhoopLink`. */
    whoopUserId: z.string().min(1),
  })
  .strict();
export type WhoopOAuthTokens = z.infer<typeof WhoopOAuthTokens>;

export const WhoopLink = z
  .object({
    patientId: PatientId,
    whoopUserId: z.string().min(1),
    linkedAt: Iso8601,
    /** Encrypted-at-rest server-side; never returned to clients. */
    tokens: WhoopOAuthTokens,
  })
  .strict();
export type WhoopLink = z.infer<typeof WhoopLink>;

/**
 * Whoop webhook event envelope. Whoop sends a small JSON body with the
 * resource `id`, then expects us to fetch the full resource via REST.
 * This mirrors what the live Whoop API documents at the time of writing;
 * pin and adapt as the Whoop API evolves.
 */
export const WhoopWebhookEventType = z.enum([
  "recovery.updated",
  "sleep.updated",
  "workout.updated",
  "cycle.updated",
  "user.deauthorized",
]);
export type WhoopWebhookEventType = z.infer<typeof WhoopWebhookEventType>;

export const WhoopWebhookPayload = z
  .object({
    type: WhoopWebhookEventType,
    /** Whoop user id (string, not uuid). */
    user_id: z.string().min(1),
    /** Resource id (e.g. recovery id) — we fetch by this. */
    id: z.union([z.string().min(1), z.number().int()]),
    /** Whoop event id; used for idempotent webhook replay. */
    event_id: z.string().min(1),
    occurred_at: Iso8601,
  })
  .strict();
export type WhoopWebhookPayload = z.infer<typeof WhoopWebhookPayload>;

/** Recovery resource — minimum fields AZRI consumes. */
export const WhoopRecovery = z
  .object({
    id: z.union([z.string(), z.number()]),
    cycle_id: z.union([z.string(), z.number()]),
    score: z.object({
      recovery_score: z.number().min(0).max(100),
      resting_heart_rate: z.number().min(20).max(220),
      hrv_rmssd_milli: z.number().min(0).max(500),
    }),
    created_at: Iso8601,
    updated_at: Iso8601,
  })
  .passthrough();
export type WhoopRecovery = z.infer<typeof WhoopRecovery>;

export const WhoopSleep = z
  .object({
    id: z.union([z.string(), z.number()]),
    score: z.object({
      sleep_performance_percentage: z.number().min(0).max(100),
      respiratory_rate: z.number().min(4).max(40).optional(),
    }),
    start: Iso8601,
    end: Iso8601,
    created_at: Iso8601,
    updated_at: Iso8601,
  })
  .passthrough();
export type WhoopSleep = z.infer<typeof WhoopSleep>;

export const WhoopCycle = z
  .object({
    id: z.union([z.string(), z.number()]),
    score: z.object({
      strain: z.number().min(0).max(21),
      average_heart_rate: z.number().min(20).max(220),
      max_heart_rate: z.number().min(20).max(220),
    }),
    start: Iso8601,
    end: Iso8601.optional(),
    created_at: Iso8601,
    updated_at: Iso8601,
  })
  .passthrough();
export type WhoopCycle = z.infer<typeof WhoopCycle>;
