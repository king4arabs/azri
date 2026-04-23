import { z } from "zod";

/**
 * Process-level config. Parsed once on boot and frozen — touch this
 * surface deliberately; it is the security boundary between env soup and
 * the running process.
 */
const ConfigSchema = z
  .object({
    host: z.string().default("0.0.0.0"),
    port: z.coerce.number().int().min(1).max(65_535).default(8080),
    logLevel: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal"])
      .default("info"),
    allowedOrigins: z
      .string()
      .default("http://localhost:3000")
      .transform((s) => s.split(",").map((x) => x.trim()).filter(Boolean)),
    authIssuerUrl: z.string().url().optional(),
    authAudience: z.string().default("azri-api"),
    whoopWebhookSecret: z.string().optional(),
    whoopClientId: z.string().optional(),
    whoopClientSecret: z.string().optional(),
    whoopRedirectUri: z.string().url().optional(),
    watchIngestPepper: z.string().optional(),
    databaseUrl: z.string().optional(),
    redisUrl: z.string().optional(),
  })
  .strict();

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const parsed = ConfigSchema.parse({
    host: env.HOST,
    port: env.PORT,
    logLevel: env.LOG_LEVEL,
    allowedOrigins: env.ALLOWED_ORIGINS,
    authIssuerUrl: env.AUTH_ISSUER_URL,
    authAudience: env.AUTH_AUDIENCE,
    whoopWebhookSecret: env.WHOOP_WEBHOOK_SECRET,
    whoopClientId: env.WHOOP_CLIENT_ID,
    whoopClientSecret: env.WHOOP_CLIENT_SECRET,
    whoopRedirectUri: env.WHOOP_REDIRECT_URI,
    watchIngestPepper: env.WATCH_INGEST_DEV_KEY_HMAC_PEPPER,
    databaseUrl: env.DATABASE_URL,
    redisUrl: env.REDIS_URL,
  });
  return Object.freeze(parsed);
}
