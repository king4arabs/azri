/**
 * Health endpoints for container orchestrators and uptime monitors.
 *
 *   GET /healthz   — liveness. Returns 200 while the process is up.
 *   GET /readyz    — readiness. Returns 200 when the app is ready to serve.
 *
 * Kept intentionally independent so Kubernetes / ECS can distinguish a
 * frozen process from a starting one, and so the liveness path never
 * depends on anything that could take the service down unnecessarily.
 */

import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/healthz",
    {
      schema: {
        tags: ["ops"],
        summary: "Liveness probe",
        description:
          "Returns 200 while the process is alive. Does not check dependencies.",
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string", enum: ["ok"] },
              uptimeSeconds: { type: "number" },
            },
            required: ["status", "uptimeSeconds"],
          },
        },
      },
    },
    async () => ({
      status: "ok" as const,
      uptimeSeconds: Math.round(process.uptime()),
    }),
  );

  app.get(
    "/readyz",
    {
      schema: {
        tags: ["ops"],
        summary: "Readiness probe",
        description:
          "Returns 200 when the API is ready to accept traffic. Extend this check as real dependencies (database, cache, auth) land.",
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string", enum: ["ready"] },
              checks: {
                type: "object",
                additionalProperties: { type: "string" },
              },
            },
            required: ["status", "checks"],
          },
        },
      },
    },
    async () => ({
      status: "ready" as const,
      // No external dependencies in the scaffold. Extend this object when
      // the database + auth provider land (ADR-0004, ADR-0005).
      checks: {} as Record<string, string>,
    }),
  );
};
