import { strict as assert } from "node:assert";
import { test } from "node:test";
import { buildAuthorizeUrl } from "../oauth.js";

test("buildAuthorizeUrl includes scopes joined by space and state", () => {
  const url = new URL(
    buildAuthorizeUrl(
      {
        clientId: "abc",
        redirectUri: "https://example.org/cb",
        scopes: ["read:recovery", "read:sleep", "offline"],
      },
      "state-xyz",
    ),
  );
  assert.equal(url.searchParams.get("client_id"), "abc");
  assert.equal(url.searchParams.get("redirect_uri"), "https://example.org/cb");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("state"), "state-xyz");
  assert.equal(url.searchParams.get("scope"), "read:recovery read:sleep offline");
});
