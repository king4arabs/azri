/**
 * Minimal browser API client for the AZRI ingestion API. Real auth wiring
 * lands with ADR-0004; for now the client uses a placeholder bearer token
 * sourced from a same-origin cookie.
 */

import type {
  AlertAcknowledgedEvent,
  AlertRaisedEvent,
  EpisodeLoggedEvent,
} from "@azri/contracts";

export interface ApiClientConfig {
  baseUrl: string;
  getToken: () => string | undefined;
  fetcher?: typeof fetch;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public correlationId?: string,
  ) {
    super(message);
  }
}

export function createApiClient(config: ApiClientConfig) {
  const fetcher = config.fetcher ?? globalThis.fetch.bind(globalThis);

  async function send<TIn, TOut>(path: string, body: TIn): Promise<TOut> {
    const res = await fetcher(`${config.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(config.getToken() ? { authorization: `Bearer ${config.getToken()}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      try {
        const parsed = JSON.parse(text);
        throw new ApiError(
          res.status,
          parsed.code ?? "unknown_error",
          parsed.message ?? "Request failed.",
          parsed.correlationId,
        );
      } catch {
        throw new ApiError(res.status, "unknown_error", text);
      }
    }
    return (await res.json()) as TOut;
  }

  return {
    logEpisode: (event: EpisodeLoggedEvent) =>
      send<EpisodeLoggedEvent, EpisodeLoggedEvent>("/v1/episodes", event),
    raiseAlert: (event: AlertRaisedEvent) =>
      send<AlertRaisedEvent, AlertRaisedEvent>("/v1/alerts/raised", event),
    acknowledgeAlert: (event: AlertAcknowledgedEvent) =>
      send<AlertAcknowledgedEvent, AlertAcknowledgedEvent>(
        "/v1/alerts/acknowledged",
        event,
      ),
  };
}
