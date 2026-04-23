import type { FastifyInstance } from "fastify";
import { AlertAcknowledgedEvent, AlertRaisedEvent } from "@azri/contracts";

/**
 * Alert relay endpoints. The watch & mobile clients call /raised when
 * detecting a fall or when the patient hits the on-wrist SOS; doctors
 * and caregivers call /acknowledged when they've acted on it.
 *
 * Real fan-out (push, SMS, email) is delegated to the notification
 * service — see ARCHITECTURE.md.
 */
export async function alertRoutes(app: FastifyInstance) {
  app.post("/v1/alerts/raised", async (req, reply) => {
    const event = AlertRaisedEvent.parse(req.body);
    reply.code(202).send(event);
  });

  app.post("/v1/alerts/acknowledged", async (req, reply) => {
    const event = AlertAcknowledgedEvent.parse(req.body);
    reply.code(202).send(event);
  });
}
