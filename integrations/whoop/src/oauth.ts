import { z } from "zod";
import { WhoopOAuthTokens, type WhoopScope } from "@azri/contracts";

/**
 * Whoop OAuth2 endpoints. Exact paths are pinned to what the Whoop
 * developer docs publish at the time of writing. Treat changes as a
 * contract change — bump MINOR and update the README.
 */
export const WHOOP_AUTHORIZE_URL = "https://api.prod.whoop.com/oauth/oauth2/auth" as const;
export const WHOOP_TOKEN_URL = "https://api.prod.whoop.com/oauth/oauth2/token" as const;
export const WHOOP_API_BASE = "https://api.prod.whoop.com/developer" as const;

export interface OAuthClientConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: WhoopScope[];
}

export function buildAuthorizeUrl(
  config: Omit<OAuthClientConfig, "clientSecret">,
  state: string,
): string {
  const url = new URL(WHOOP_AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("scope", config.scopes.join(" "));
  url.searchParams.set("state", state);
  return url.toString();
}

const TokenResponse = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.literal("bearer").or(z.literal("Bearer")),
    expires_in: z.number().int().positive(),
    scope: z.string(),
    /** Whoop returns the user id in the token response. */
    user_id: z.union([z.string(), z.number()]).optional(),
  })
  .passthrough();

export type Fetcher = (
  input: string,
  init: { method: string; headers: Record<string, string>; body: string },
) => Promise<{
  ok: boolean;
  status: number;
  text(): Promise<string>;
}>;

const defaultFetcher: Fetcher = (input, init) =>
  fetch(input, {
    method: init.method,
    headers: init.headers,
    body: init.body,
  }) as unknown as ReturnType<Fetcher>;

async function postForm(
  url: string,
  body: Record<string, string>,
  fetcher: Fetcher,
) {
  const encoded = new URLSearchParams(body).toString();
  const res = await fetcher(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: encoded,
  });
  if (!res.ok) {
    throw new Error(
      `Whoop token endpoint returned ${res.status}: ${await res.text()}`,
    );
  }
  return TokenResponse.parse(JSON.parse(await res.text()));
}

/**
 * Exchange an authorization code for a token bundle. Used in the OAuth
 * callback handler.
 */
export async function exchangeAuthorizationCode(
  config: OAuthClientConfig,
  code: string,
  options: { fetcher?: Fetcher } = {},
) {
  const fetcher = options.fetcher ?? defaultFetcher;
  const json = await postForm(
    WHOOP_TOKEN_URL,
    {
      grant_type: "authorization_code",
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
    },
    fetcher,
  );
  return toTokens(json);
}

/**
 * Refresh an access token. Stateless — pass the existing refresh token in.
 * Whoop rotates refresh tokens on each refresh; the caller MUST persist
 * the new bundle.
 */
export async function refreshAccessToken(
  config: Omit<OAuthClientConfig, "redirectUri" | "scopes">,
  refreshToken: string,
  options: { fetcher?: Fetcher } = {},
) {
  const fetcher = options.fetcher ?? defaultFetcher;
  const json = await postForm(
    WHOOP_TOKEN_URL,
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    },
    fetcher,
  );
  return toTokens(json);
}

function toTokens(json: z.infer<typeof TokenResponse>) {
  const expiresAt = new Date(Date.now() + json.expires_in * 1000).toISOString();
  const scopeParts = json.scope.split(/[ ,]+/).filter(Boolean) as WhoopScope[];
  return WhoopOAuthTokens.parse({
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresAt,
    scope: scopeParts,
    whoopUserId: String(json.user_id ?? ""),
  });
}
