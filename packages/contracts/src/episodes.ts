import { z } from "zod";
import {
  EventEnvelopeBase,
  Iso8601,
  Locale,
  Uuid,
} from "./common.js";

/**
 * Self-reported and sensor-corroborated episode. Episode wording is
 * deliberately conservative — AZRI does not diagnose; we record what the
 * patient / caregiver logged and what signals surround it.
 */
export const EpisodeType = z.enum([
  "suspected_seizure",
  "aura", // pre-ictal warning sign as described by the patient
  "fall",
  "sleep_disturbance",
  "missed_medication",
  "mood_change",
  "other",
]);
export type EpisodeType = z.infer<typeof EpisodeType>;

export const EpisodeSeverity = z.enum(["mild", "moderate", "severe"]);
export type EpisodeSeverity = z.infer<typeof EpisodeSeverity>;

export const EpisodeCoarseDuration = z.enum([
  "less_than_30s",
  "30s_to_2m",
  "2m_to_5m",
  "more_than_5m",
  "unknown",
]);
export type EpisodeCoarseDuration = z.infer<typeof EpisodeCoarseDuration>;

/**
 * Who logged this? "self" for the patient, "caregiver" for a consented
 * family member, "sensor" for an auto-detected event. Doctors can annotate
 * but do not log new episodes directly (they triage).
 */
export const EpisodeReporter = z.enum(["self", "caregiver", "sensor"]);
export type EpisodeReporter = z.infer<typeof EpisodeReporter>;

export const EpisodeNote = z
  .object({
    /** Locale the note was authored in; UI displays with dir + lang. */
    locale: Locale,
    /** Plain text, UI-sanitised on render. PHI. */
    body: z.string().max(4_000),
  })
  .strict();
export type EpisodeNote = z.infer<typeof EpisodeNote>;

export const EpisodeLoggedEvent = EventEnvelopeBase.extend({
  type: z.literal("episode.logged"),
  episodeId: Uuid,
  episodeType: EpisodeType,
  severity: EpisodeSeverity,
  coarseDuration: EpisodeCoarseDuration,
  reporter: EpisodeReporter,
  /**
   * Witnessed start / end — optional because patients often cannot give a
   * precise window. Store what was offered; never fabricate.
   */
  startedAt: Iso8601.optional(),
  endedAt: Iso8601.optional(),
  note: EpisodeNote.optional(),
  /** Tags are from a curated list; free tags go in `note`. */
  tags: z.array(z.string().max(40)).max(10).default([]),
}).strict();
export type EpisodeLoggedEvent = z.infer<typeof EpisodeLoggedEvent>;

/**
 * A doctor / clinician annotation on an episode. Annotations are additive;
 * doctors cannot edit a patient's original episode body.
 */
export const EpisodeAnnotation = z
  .object({
    annotationId: Uuid,
    episodeId: Uuid,
    annotatedAt: Iso8601,
    authorUserId: Uuid,
    body: EpisodeNote,
    /** For audit: doctors must self-declare the annotation purpose. */
    purpose: z.enum([
      "triage",
      "follow_up",
      "medication_adjustment",
      "reassurance",
      "other",
    ]),
  })
  .strict();
export type EpisodeAnnotation = z.infer<typeof EpisodeAnnotation>;
