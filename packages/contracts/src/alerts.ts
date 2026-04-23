import { z } from "zod";
import {
  EventEnvelopeBase,
  Iso8601,
  Locale,
  Uuid,
} from "./common.js";

/**
 * Alert severity drives routing. "emergency" must never be sent silently —
 * it triggers push to the patient, caregivers on the consent scope, and
 * (per RUNBOOKS.md) a watchdog check that the relay actually fired.
 */
export const AlertSeverity = z.enum(["info", "warning", "urgent", "emergency"]);
export type AlertSeverity = z.infer<typeof AlertSeverity>;

export const AlertChannel = z.enum([
  "in_app",
  "push_ios",
  "push_android",
  "watch_apple",
  "watch_wear_os",
  "sms",
  "email",
]);
export type AlertChannel = z.infer<typeof AlertChannel>;

/**
 * Why was this alert raised? Using a stable enum so analytics can count
 * the mix without inspecting free text.
 */
export const AlertReason = z.enum([
  "manual_patient",
  "manual_caregiver",
  "biosignal_threshold",
  "fall_detected",
  "long_seizure_signal",
  "missed_medication",
  "device_disconnect",
  "other",
]);
export type AlertReason = z.infer<typeof AlertReason>;

export const AlertBody = z
  .object({
    /** Locale of the rendered copy — surfaces pick matching locale. */
    locale: Locale,
    title: z.string().max(80),
    body: z.string().max(400),
    /**
     * Optional deep-link into the app, e.g. `azri://episodes/{id}`. The
     * surface router maps this to a real URL per platform.
     */
    deepLink: z.string().max(500).optional(),
  })
  .strict();
export type AlertBody = z.infer<typeof AlertBody>;

export const AlertRaisedEvent = EventEnvelopeBase.extend({
  type: z.literal("alert.raised"),
  alertId: Uuid,
  severity: AlertSeverity,
  reason: AlertReason,
  /** One or more rendered copies; at minimum one must match patient locale. */
  bodies: z.array(AlertBody).min(1).max(2),
  channels: z.array(AlertChannel).min(1).max(6),
  /** IDs of biosignal/episode events that triggered this, for audit. */
  correlatedEventIds: z.array(Uuid).max(20).default([]),
  /** If the alert is an auto-escalation, when was the previous level? */
  escalatedFromAlertId: Uuid.optional(),
  expiresAt: Iso8601.optional(),
}).strict();
export type AlertRaisedEvent = z.infer<typeof AlertRaisedEvent>;

export const AlertAcknowledgedEvent = EventEnvelopeBase.extend({
  type: z.literal("alert.acknowledged"),
  alertId: Uuid,
  acknowledgedAt: Iso8601,
  /** Which party acknowledged — drives downstream follow-up suppression. */
  acknowledgedBy: z.enum(["patient", "caregiver", "doctor"]),
  /** Optional short note, PHI. */
  note: z.string().max(1_000).optional(),
}).strict();
export type AlertAcknowledgedEvent = z.infer<typeof AlertAcknowledgedEvent>;
