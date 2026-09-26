import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const testDirectory = mkdtempSync(join(tmpdir(), "rank-rascal-web-"));
process.env.DATABASE_PATH = join(testDirectory, "web.db");
process.env.PORT = "0";
process.env.PUBLIC_BASE_URL = "http://localhost:3000";
delete process.env.DATABASE_URL;
delete process.env.REQUIRE_POSTGRES;

const { closeDatabase, initializeDatabase } = await import("../src/db.js");
const { startWebServer } = await import("../src/web.js");

await initializeDatabase();
const server = startWebServer();
await new Promise<void>((resolve) => server.once("listening", () => resolve()));
const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

test.after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await closeDatabase();
});

test("health reports the database engine", async () => {
  const response = await fetch(`${base}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, database: "sqlite" });
});

test("non-GET requests are rejected", async () => {
  const response = await fetch(`${base}/privacy`, { method: "POST" });
  assert.equal(response.status, 405);
});

test("callback with an unknown state shows a friendly failure, not internals", async () => {
  const response = await fetch(`${base}/oauth/roblox/callback?code=abc&state=unknown`, {
    headers: { "x-forwarded-for": "198.51.100.10" },
  });
  const body = await response.text();
  assert.equal(response.status, 400);
  assert.match(body, /expired or was already used/);
  assert.doesNotMatch(body, /Error:|\.(ts|js):\d+|node_modules|sqlite|postgres/i);
});

test("callback is rate limited per client, while /health never is", async () => {
  const headers = { "x-forwarded-for": "198.51.100.20" };
  let last = 0;
  for (let i = 0; i < 16; i += 1) {
    last = (await fetch(`${base}/oauth/roblox/callback?code=a&state=b`, { headers })).status;
  }
  assert.equal(last, 429);
  const limited = await fetch(`${base}/oauth/roblox/callback?code=a&state=b`, { headers });
  assert.ok(Number(limited.headers.get("retry-after")) >= 1);

  // A different client is unaffected, and the hosting health check is never throttled.
  const other = await fetch(`${base}/oauth/roblox/callback?code=a&state=b`, {
    headers: { "x-forwarded-for": "198.51.100.21" },
  });
  assert.equal(other.status, 400);
  for (let i = 0; i < 130; i += 1) {
    assert.equal((await fetch(`${base}/health`, { headers })).status, 200);
  }
});
