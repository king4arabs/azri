import type { FastifyInstance } from "fastify";
import {
  WatchIngestRequest,
  WatchIngestResponse,
  type WatchIngestResult,
} from "@azri/contracts";
import type { IdempotencyStore } from "../lib/idempotency.js";
import { redactForLog } from "../lib/redact.js";

export interface WatchIngestDeps {
  idempotency: IdempotencyStore;
}

/**
 * POST /v1/ingest/watch
 *
 * Accepts a batch of events emitted by Apple Watch, Wear OS, or the patient
 * mobile app acting as a relay. Idempotent by `eventId`; the response
 * always lists per-event `accepted` | `duplicate` | `rejected`.
 *
 * Auth (out of scope of this PR): per-install short-lived bearer token
 * issued after the patient pairs the device. See ADR-0004 for the auth
 * provider decision.
 */
export async function watchIngestRoutes(
  app: FastifyInstance,
  deps: WatchIngestDeps,
) {
  app.post("/v1/ingest/watch", async (req, reply) => {
    const parsed = WatchIngestRequest.parse(req.body);
    const receivedAt = new Date().toISOString();
    const results: WatchIngestResult[] = [];

    for (const event of parsed.events) {
      const isNew = await deps.idempotency.recordIfNew(`event:${event.eventId}`);
      if (!isNew) {
        results.push({ eventId: event.eventId, status: "duplicate" });
        continue;
      }
      // Per-type side-effect dispatch lives in a real service layer; here
      // we just classify and acknowledge so the contract is exercised.
      try {
        await Promise.resolve(event.type);
        results.push({ eventId: event.eventId, status: "accepted" });
      } catch (err) {
        req.log.warn(
          { err, event: redactForLog(event) },
          "watch ingest event failed",
        );
        results.push({
          eventId: event.eventId,
          status: "rejected",
          errorCode: "downstream_error",
          errorMessage: "Failed to persist event.",
        });
      }
    }

    const response: WatchIngestResponse = {
      batchId: parsed.batchId,
      receivedAt,
      results,
    };
    reply.code(202).send(response);
  });
}
