import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { ZodError } from "zod";
import type { ApiError } from "@azri/contracts";

/**
 * Translates Zod validation errors into the AZRI ApiError envelope and
 * never leaks stack traces or raw Zod issues over the wire.
 */
async function plugin(app: FastifyInstance) {
  app.setErrorHandler((err, req, reply) => {
    const correlationId = req.id;
    if (err instanceof ZodError) {
      const body: ApiError = {
        code: "validation_error",
        message: "Request body failed schema validation.",
        correlationId,
        details: { issues: err.flatten() as unknown as Record<string, unknown> },
      };
      reply.code(400).send(body);
      return;
    }
    req.log.error({ err, correlationId }, "unhandled error");
    const body: ApiError = {
      code: "internal_error",
      message: "Something went wrong. The team has been notified.",
      correlationId,
    };
    const statusCode =
      typeof (err as { statusCode?: unknown }).statusCode === "number"
        ? ((err as { statusCode: number }).statusCode)
        : 500;
    reply.code(statusCode).send(body);
  });
}

export default fp(plugin, { name: "azri-error-handler" });
