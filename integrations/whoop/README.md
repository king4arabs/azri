# @azri/whoop

Server-side Whoop adapter. OAuth2, token refresh, recovery / sleep / cycle
pulls, and normalisation of Whoop payloads into `@azri/contracts`
biosignal events.

> **Server-only.** Refresh tokens never leave the server. The browser
> never imports this package.

## Use

```ts
import {
  buildAuthorizeUrl,
  createWhoopClient,
  exchangeAuthorizationCode,
  normaliseRecovery,
  refreshAccessToken,
} from "@azri/whoop";

// 1) Redirect the patient to Whoop's consent screen.
const url = buildAuthorizeUrl(
  { clientId, redirectUri, scopes: ["read:recovery", "read:sleep", "offline"] },
  state,
);

// 2) On callback, exchange the code.
const tokens = await exchangeAuthorizationCode(
  { clientId, clientSecret, redirectUri, scopes: [...] },
  code,
);

// 3) Pull a resource (the API client auto-refreshes when expired).
const client = createWhoopClient({
  clientId,
  clientSecret,
  onRefreshed: (newTokens) => savePatientTokens(patientId, newTokens),
});
const { recovery } = await client.getRecovery({ tokens }, recoveryId);

// 4) Normalise into AZRI events.
const events = normaliseRecovery(recovery, { organizationId, patientId });
```

## Webhook handling

The HMAC verification, replay protection, and the route entrypoint live
in `@azri/api` (`api/src/routes/whoop-webhook.ts`). On every valid event
the server fetches the resource via this client and persists the
normalised events.

## Compatibility

Whoop's API surface is pinned to what their developer docs document at
the time of writing. Any drift (renamed scopes, response shape changes,
signature scheme) is a contract change — bump MINOR and update this
README.
