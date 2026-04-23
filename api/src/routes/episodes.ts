import type { FastifyInstance } from "fastify";
import { EpisodeLoggedEvent } from "@azri/contracts";

/**
 * POST /v1/episodes
 *
 * Logs a self-reported or caregiver-reported episode. Validates against
 * the canonical `EpisodeLoggedEvent` schema and returns 201 with the same
 * event for echo. Real persistence + audit trail wiring lands with v0.3.0.
 */
export async function episodeRoutes(app: FastifyInstance) {
  app.post("/v1/episodes", async (req, reply) => {
    const event = EpisodeLoggedEvent.parse(req.body);
    // TODO(v0.3.0): persist with row-level security, append audit row,
    // fan-out to alert evaluator. The doctor console reads from the same
    // store via /v1/episodes (GET) — see ROADMAP.md.
    reply.code(201).send(event);
  });
}
