import Fastify from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import sensible from "@fastify/sensible";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { loadConfig } from "./config.js";
import errorHandler from "./plugins/error-handler.js";
import { createInMemoryIdempotencyStore } from "./lib/idempotency.js";
import { healthRoutes } from "./routes/health.js";
import { watchIngestRoutes } from "./routes/watch-ingest.js";
import { whoopWebhookRoutes } from "./routes/whoop-webhook.js";
import { episodeRoutes } from "./routes/episodes.js";
import { alertRoutes } from "./routes/alerts.js";

export async function buildServer() {
  const config = loadConfig();
  const app = Fastify({
    logger: {
      level: config.logLevel,
      redact: {
        paths: [
          "req.headers.authorization",
          "req.headers.cookie",
          "req.headers['x-whoop-signature']",
          "*.samples",
          "*.score",
          "*.note",
          "*.body",
          "*.tokens",
        ],
        remove: true,
      },
    },
    trustProxy: true,
    disableRequestLogging: false,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });
  await app.register(rateLimit, {
    max: 600,
    timeWindow: "1 minute",
    allowList: ["127.0.0.1"],
  });
  await app.register(sensible);
  await app.register(errorHandler);

  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "AZRI API",
        description:
          "Ingestion + core API for AZRI. Endpoints validated against @azri/contracts.",
        version: "0.1.0",
      },
      servers: [{ url: "http://localhost:8080" }],
      tags: [
        { name: "health", description: "Liveness, readiness." },
        { name: "ingest", description: "Watch + wearable ingest." },
        { name: "webhooks", description: "Third-party webhooks (Whoop)." },
        { name: "episodes", description: "Episode log endpoints." },
        { name: "alerts", description: "Alert raise + acknowledge." },
      ],
    },
  });
  await app.register(swaggerUi, { routePrefix: "/docs" });

  const idempotency = createInMemoryIdempotencyStore();

  await app.register(async (scope) => healthRoutes(scope));
  await app.register(async (scope) => watchIngestRoutes(scope, { idempotency }));
  await app.register(async (scope) =>
    whoopWebhookRoutes(scope, {
      idempotency,
      webhookSecret: config.whoopWebhookSecret,
      onValidEvent: async (event) => {
        // Real wiring: integrations/whoop fetches the resource, normalises
        // it to a BiosignalBatchEvent, and pushes onto the same persistence
        // path as watch-ingest. Kept as a logging stub at scaffold-level.
        scope.log.info(
          { type: event.type, eventId: event.event_id },
          "whoop webhook accepted",
        );
      },
    }),
  );
  await app.register(async (scope) => episodeRoutes(scope));
  await app.register(async (scope) => alertRoutes(scope));

  return { app, config };
}

const isMain =
  typeof process !== "undefined" &&
  Array.isArray(process.argv) &&
  process.argv[1] !== undefined &&
  (process.argv[1].endsWith("/server.ts") ||
    process.argv[1].endsWith("/server.js"));

if (isMain) {
  buildServer()
    .then(async ({ app, config }) => {
      await app.listen({ host: config.host, port: config.port });
      app.log.info(
        { host: config.host, port: config.port },
        "azri-api listening",
      );
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
