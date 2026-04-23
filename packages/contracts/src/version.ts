/**
 * Schema version. Bumped per RELEASE_PROCESS.md. Breaking schema changes
 * (renaming a field, narrowing an enum, removing a value) are MAJOR.
 */
export const SCHEMA_VERSION = "0.2.0" as const;
export type SchemaVersion = typeof SCHEMA_VERSION;
