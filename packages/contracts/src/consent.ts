import { z } from "zod";
import {
  CaregiverId,
  Iso8601,
  PatientId,
  Uuid,
} from "./common.js";

/**
 * Consent scope. Every PHI read on behalf of a caregiver must check the
 * scope on the active consent record, not a role flag.
 */
export const ConsentScope = z.enum([
  "view_episodes",
  "view_alerts",
  "receive_emergency_alerts",
  "view_aggregate_trends", // 24h rollups, no raw samples
  "view_raw_signals",
  "share_with_doctor",
  "share_with_institution",
]);
export type ConsentScope = z.infer<typeof ConsentScope>;

export const ConsentStatus = z.enum([
  "pending",
  "active",
  "revoked",
  "expired",
]);
export type ConsentStatus = z.infer<typeof ConsentStatus>;

export const CaregiverConsent = z
  .object({
    consentId: Uuid,
    patientId: PatientId,
    caregiverId: CaregiverId,
    grantedAt: Iso8601,
    /** Optional auto-expiry; revoked-by-default if absent and inactive 365d. */
    expiresAt: Iso8601.optional(),
    status: ConsentStatus,
    scopes: z.array(ConsentScope).min(1),
    /** Audit: how was the grant captured (e.g. "in_app_invite_v1"). */
    capturedVia: z.string().max(64),
  })
  .strict();
export type CaregiverConsent = z.infer<typeof CaregiverConsent>;
