/**
 * @azri/contracts — entrypoint
 *
 * Shared TypeScript + Zod contracts for the AZRI platform. Every surface
 * (web, mobile, watchOS, Wear OS, Whoop adapter, ingestion API) imports
 * from here so data shape is consistent end-to-end.
 *
 * Authoring rules:
 *   - All wire-format types are defined as Zod schemas; the static type
 *     is derived (`z.infer`). Never hand-write a type that has a schema.
 *   - PHI-bearing fields are marked with `// PHI` comments and a
 *     `phiClassification` enum value, so analytics layers can reject them.
 *   - Time is always ISO-8601 UTC strings on the wire; parse to Date at
 *     the edge if needed. Never serialise Date objects directly.
 *   - Watch / wearable events use `source.deviceKind` so the API can
 *     route to per-source normalisers.
 *   - Schema versions are pinned in `SCHEMA_VERSION` and bumped per
 *     `RELEASE_PROCESS.md`. Breaking changes are MAJOR.
 */

export * from "./common.js";
export * from "./biosignals.js";
export * from "./episodes.js";
export * from "./alerts.js";
export * from "./watch-ingest.js";
export * from "./whoop.js";
export * from "./consent.js";
export * from "./version.js";
