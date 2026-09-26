import assert from "node:assert/strict";
import test from "node:test";

test("REQUIRE_POSTGRES=true refuses to fall back to SQLite when DATABASE_URL is missing", async () => {
  // node:test runs each file in its own process, so these env changes stay local to this test.
  process.env.REQUIRE_POSTGRES = "true";
  process.env.DATABASE_URL = "";
  process.env.DATABASE_PATH = "./data/should-never-be-created.db";

  const { initializeDatabase } = await import("../src/db.js");
  await assert.rejects(initializeDatabase(), /REQUIRE_POSTGRES=true but DATABASE_URL is not set/);
});
