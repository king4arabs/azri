import {
  WhoopCycle,
  WhoopRecovery,
  WhoopSleep,
  type WhoopOAuthTokens,
} from "@azri/contracts";
import { WHOOP_API_BASE, refreshAccessToken, type Fetcher } from "./oauth.js";

export interface WhoopClientOptions {
  clientId: string;
  clientSecret: string;
  fetcher?: Fetcher;
  /** Called after a successful refresh; persist the new bundle. */
  onRefreshed?: (tokens: WhoopOAuthTokens) => Promise<void> | void;
}

export interface WhoopRequestContext {
  tokens: WhoopOAuthTokens;
}

const defaultFetcher: Fetcher = (input, init) =>
  fetch(input, {
    method: init.method,
    headers: init.headers,
    body: init.body,
  }) as unknown as ReturnType<Fetcher>;

/**
 * Thin Whoop API client. Auto-refreshes the access token if it has
 * expired, then performs the GET. Resource ids in URLs are URL-encoded.
 */
export function createWhoopClient(opts: WhoopClientOptions) {
  const fetcher = opts.fetcher ?? defaultFetcher;

  async function ensureFresh(ctx: WhoopRequestContext): Promise<WhoopRequestContext> {
    const expiresAt = Date.parse(ctx.tokens.expiresAt);
    if (Number.isFinite(expiresAt) && expiresAt > Date.now() + 30_000) {
      return ctx;
    }
    const refreshed = await refreshAccessToken(
      { clientId: opts.clientId, clientSecret: opts.clientSecret },
      ctx.tokens.refreshToken,
      { fetcher },
    );
    if (opts.onRefreshed) await opts.onRefreshed(refreshed);
    return { tokens: refreshed };
  }

  async function get<T>(
    ctx: WhoopRequestContext,
    path: string,
  ): Promise<{ data: T; ctx: WhoopRequestContext }> {
    const fresh = await ensureFresh(ctx);
    const res = await fetcher(`${WHOOP_API_BASE}${path}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${fresh.tokens.accessToken}`,
        accept: "application/json",
      },
      body: "",
    });
    if (!res.ok) {
      throw new Error(`Whoop GET ${path} returned ${res.status}: ${await res.text()}`);
    }
    return { data: JSON.parse(await res.text()) as T, ctx: fresh };
  }

  return {
    async getRecovery(ctx: WhoopRequestContext, recoveryId: string | number) {
      const out = await get<unknown>(
        ctx,
        `/v1/recovery/${encodeURIComponent(String(recoveryId))}`,
      );
      return { recovery: WhoopRecovery.parse(out.data), ctx: out.ctx };
    },
    async getSleep(ctx: WhoopRequestContext, sleepId: string | number) {
      const out = await get<unknown>(
        ctx,
        `/v1/activity/sleep/${encodeURIComponent(String(sleepId))}`,
      );
      return { sleep: WhoopSleep.parse(out.data), ctx: out.ctx };
    },
    async getCycle(ctx: WhoopRequestContext, cycleId: string | number) {
      const out = await get<unknown>(
        ctx,
        `/v1/cycle/${encodeURIComponent(String(cycleId))}`,
      );
      return { cycle: WhoopCycle.parse(out.data), ctx: out.ctx };
    },
  };
}

export type WhoopClient = ReturnType<typeof createWhoopClient>;
