import type { FastifyInstance } from "fastify";
import { SCHEMA_VERSION } from "@azri/contracts";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/healthz", async () => ({ status: "ok" }));

  app.get("/readyz", async () => ({
    status: "ready",
    schemaVersion: SCHEMA_VERSION,
    /** Build / deploy id is injected by infra. Absent in dev. */
    buildId: process.env["BUILD_ID"] ?? null,
  }));

  // Liveness for Kubernetes / ECS — must be cheap.
  app.get("/livez", async () => ({ status: "alive" }));
}
