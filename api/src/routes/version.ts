import type { FastifyPluginAsync } from "fastify";

/**
 * Returns the shipped API version + build commit (if injected at build time
 * via the standard GIT_SHA environment variable). Safe to expose publicly.
 */
export const versionRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/version",
    {
      schema: {
        tags: ["ops"],
        summary: "API version",
        description:
          "Returns the shipped API version and, when available, the build commit SHA.",
        response: {
          200: {
            type: "object",
            properties: {
              name: { type: "string" },
              version: { type: "string" },
              commit: { type: "string" },
            },
            required: ["name", "version"],
          },
        },
      },
    },
    async () => ({
      name: "@azri/api",
      version: "0.1.0",
      commit: process.env["GIT_SHA"] ?? "unknown",
    }),
  );
};
