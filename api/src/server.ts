/**
 * @azri/api — entry point
 *
 * Fastify server scaffold. Intentionally minimal:
 *   - Health endpoints (liveness + readiness)
 *   - Version endpoint
 *   - OpenAPI spec + optional Swagger UI
 *   - CORS, Helmet, rate limiting, request-id, structured logging (pino)
 *
 * No authentication, no database, no PHI handling yet. Those arrive with
 * ADR-0004 (auth) + ADR-0005 (database) + the doctor dashboard MVP (v0.3.0).
 */

import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import sensible from "@fastify/sensible";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import { config } from "./config.js";
import { healthRoutes } from "./routes/health.js";
import { versionRoutes } from "./routes/version.js";

export async function buildServer(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: config.logLevel,
      // Redact fields that might carry PHI-adjacent data even in scaffold mode.
      // Expand this list as real endpoints land.
      redact: {
        paths: [
          "req.headers.authorization",
          "req.headers.cookie",
          "req.headers['x-api-key']",
          "req.body.password",
          "req.body.token",
        ],
        censor: "[redacted]",
      },
    },
    genReqId: (req) => {
      const incoming = req.headers["x-request-id"];
      if (typeof incoming === "string" && incoming.length > 0 && incoming.length <= 128) {
        return incoming;
      }
      return crypto.randomUUID();
    },
    disableRequestLogging: false,
    trustProxy: true,
  });

  await app.register(sensible);
  await app.register(helmet, {
    // The API returns JSON only; CSP belongs on the web tier. Keep strict defaults.
    contentSecurityPolicy: false,
  });
  await app.register(cors, {
    origin: [...config.corsOrigins],
    credentials: true,
  });
  await app.register(rateLimit, {
    max: config.rateLimitMax,
    timeWindow: config.rateLimitWindowMs,
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "AZRI API",
        description:
          "AZRI core API. Scaffold release (v0.1.0 baseline). No authenticated endpoints are shipped yet; auth lands with ADR-0004.",
        version: "0.1.0",
      },
      servers: [
        { url: "http://localhost:3001", description: "Local dev" },
      ],
      tags: [
        { name: "ops", description: "Operational endpoints (health, version)" },
      ],
    },
  });

  if (config.exposeOpenApiUi) {
    await app.register(swaggerUi, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "list",
        deepLinking: false,
      },
    });
  }

  await app.register(healthRoutes, { prefix: "/" });
  await app.register(versionRoutes, { prefix: "/" });

  return app;
}

// Bootstrap only when executed as a script (not when imported by tests).
const isDirectRun = import.meta.url === `file://${process.argv[1]}`;
if (isDirectRun) {
  const app = await buildServer();
  try {
    await app.listen({ host: config.host, port: config.port });
    app.log.info({ env: config.env }, "AZRI API listening");
  } catch (err) {
    app.log.error({ err }, "failed to start AZRI API");
    process.exit(1);
  }
}
