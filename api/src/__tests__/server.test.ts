/**
 * Smoke tests for @azri/api.
 *
 * Uses the built-in node:test runner and `fastify.inject(...)` so no real
 * network socket is opened. Expand as real endpoints land.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { buildServer } from "../server.js";

test("GET /healthz returns ok", async () => {
  const app = await buildServer();
  try {
    const res = await app.inject({ method: "GET", url: "/healthz" });
    assert.equal(res.statusCode, 200);
    const body = res.json() as { status: string; uptimeSeconds: number };
    assert.equal(body.status, "ok");
    assert.equal(typeof body.uptimeSeconds, "number");
  } finally {
    await app.close();
  }
});

test("GET /readyz returns ready", async () => {
  const app = await buildServer();
  try {
    const res = await app.inject({ method: "GET", url: "/readyz" });
    assert.equal(res.statusCode, 200);
    const body = res.json() as { status: string };
    assert.equal(body.status, "ready");
  } finally {
    await app.close();
  }
});

test("GET /version returns the package name and version", async () => {
  const app = await buildServer();
  try {
    const res = await app.inject({ method: "GET", url: "/version" });
    assert.equal(res.statusCode, 200);
    const body = res.json() as { name: string; version: string };
    assert.equal(body.name, "@azri/api");
    assert.match(body.version, /^\d+\.\d+\.\d+/);
  } finally {
    await app.close();
  }
});

test("OpenAPI document is generated and non-empty", async () => {
  const app = await buildServer();
  try {
    await app.ready();
    const spec = app.swagger() as {
      openapi?: string;
      paths?: Record<string, unknown>;
    };
    assert.equal(spec.openapi?.startsWith("3."), true);
    assert.ok(spec.paths);
    assert.ok(spec.paths?.["/healthz"]);
    assert.ok(spec.paths?.["/readyz"]);
    assert.ok(spec.paths?.["/version"]);
  } finally {
    await app.close();
  }
});
