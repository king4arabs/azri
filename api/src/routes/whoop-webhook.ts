import type { FastifyInstance } from "fastify";
import {
  WhoopWebhookPayload,
  type ApiError,
} from "@azri/contracts";
import type { IdempotencyStore } from "../lib/idempotency.js";
import { redactForLog } from "../lib/redact.js";
import { verifyWhoopSignature } from "../lib/whoop-signature.js";

export interface WhoopWebhookDeps {
  idempotency: IdempotencyStore;
  webhookSecret: string | undefined;
  /**
   * Hook for the integrations/whoop adapter to actually fetch the resource
   * and emit normalised biosignal events. Wired in `server.ts`.
   */
  onValidEvent: (event: import("@azri/contracts").WhoopWebhookPayload) => Promise<void>;
}

const HEADER_SIG = "x-whoop-signature";
const HEADER_TS = "x-whoop-signature-timestamp";

export async function whoopWebhookRoutes(
  app: FastifyInstance,
  deps: WhoopWebhookDeps,
) {
  if (!deps.webhookSecret) {
    app.log.warn(
      "WHOOP_WEBHOOK_SECRET is not set — Whoop webhook endpoint will reject all requests.",
    );
  }

  app.post(
    "/v1/webhooks/whoop",
    {
      // Capture raw body so we can verify the signature byte-for-byte.
      config: { rawBody: true },
    },
    async (req, reply) => {
      const signature = req.headers[HEADER_SIG];
      const timestamp = req.headers[HEADER_TS];
      const sigStr = Array.isArray(signature) ? signature[0] : signature;
      const tsStr = Array.isArray(timestamp) ? timestamp[0] : timestamp;

      if (!deps.webhookSecret || !sigStr || !tsStr) {
        const body: ApiError = {
          code: "missing_signature",
          message: "Webhook signature headers missing or server not configured.",
        };
        reply.code(401).send(body);
        return;
      }

      const rawBody =
        // fastify exposes rawBody when registered with @fastify/raw-body, but
        // our default scaffold simply re-stringifies the parsed body. Real
        // production wiring uses the rawBody plugin — keep this comment.
        typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body ?? {});

      const ok = verifyWhoopSignature({
        rawBody,
        timestamp: tsStr,
        signature: sigStr,
        secret: deps.webhookSecret,
      });
      if (!ok) {
        const body: ApiError = {
          code: "bad_signature",
          message: "Invalid Whoop webhook signature.",
        };
        reply.code(401).send(body);
        return;
      }

      const event = WhoopWebhookPayload.parse(req.body);

      const isNew = await deps.idempotency.recordIfNew(
        `whoop:${event.event_id}`,
        7 * 24 * 60 * 60 * 1000, // 7 days
      );
      if (!isNew) {
        reply.code(200).send({ status: "duplicate" });
        return;
      }

      try {
        await deps.onValidEvent(event);
      } catch (err) {
        req.log.error(
          { err, event: redactForLog(event) },
          "whoop adapter failed to process event",
        );
        const body: ApiError = {
          code: "adapter_failure",
          message: "Adapter failed; will retry on next webhook delivery.",
        };
        reply.code(500).send(body);
        return;
      }

      reply.code(202).send({ status: "accepted" });
    },
  );
}
