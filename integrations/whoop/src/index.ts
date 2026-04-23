/**
 * @azri/whoop — public surface
 *
 * Server-side adapter for the Whoop API. Holds OAuth2 flow, token
 * refresh, resource pulls, and normalisation of Whoop payloads to
 * `@azri/contracts` events. Never run in a browser — refresh tokens are
 * server-only.
 */

export * from "./oauth.js";
export * from "./client.js";
export * from "./normalise.js";
