/**
 * Environment configuration for @azri/api.
 *
 * Values are read exactly once at module load. All environment variables
 * MUST be documented in `.env.example` per the .env.example policy in
 * `SECURITY.md`. Missing required variables fail fast.
 */

const parsePort = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n <= 0 || n > 65535) {
    throw new Error(`Invalid port value: ${value}`);
  }
  return n;
};

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return value === "1" || value.toLowerCase() === "true";
};

export interface AppConfig {
  readonly env: "development" | "test" | "staging" | "production";
  readonly host: string;
  readonly port: number;
  readonly logLevel: "fatal" | "error" | "warn" | "info" | "debug" | "trace";
  readonly exposeOpenApiUi: boolean;
  readonly corsOrigins: readonly string[];
  readonly rateLimitMax: number;
  readonly rateLimitWindowMs: number;
}

const envName = (process.env["NODE_ENV"] ?? "development") as AppConfig["env"];
if (!["development", "test", "staging", "production"].includes(envName)) {
  throw new Error(`Unknown NODE_ENV: ${envName}`);
}

export const config: AppConfig = {
  env: envName,
  host: process.env["HOST"] ?? "0.0.0.0",
  port: parsePort(process.env["PORT"], 3001),
  logLevel: (process.env["LOG_LEVEL"] as AppConfig["logLevel"]) ?? (envName === "development" ? "debug" : "info"),
  // OpenAPI UI is fine in dev/staging, disabled in production by default.
  exposeOpenApiUi: parseBoolean(process.env["EXPOSE_OPENAPI_UI"], envName !== "production"),
  corsOrigins: (process.env["CORS_ORIGINS"] ?? "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  rateLimitMax: parsePort(process.env["RATE_LIMIT_MAX"], 200),
  rateLimitWindowMs: parsePort(process.env["RATE_LIMIT_WINDOW_MS"], 60_000),
};
