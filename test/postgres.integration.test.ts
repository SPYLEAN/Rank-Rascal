import assert from "node:assert/strict";
import test from "node:test";
import type { RobloxProfile } from "../src/types.js";

const databaseUrl = process.env.TEST_DATABASE_URL?.trim();

test("PostgreSQL adapter migrates and preserves the core profile lifecycle", {
  skip: databaseUrl ? false : "Set TEST_DATABASE_URL to run the PostgreSQL integration test.",
}, async () => {
  process.env.DATABASE_URL = databaseUrl;
  process.env.DATABASE_SSL ??= "false";

  const {
    closeDatabase,
    databaseHealth,
    getProfile,
    initializeDatabase,
    saveProfile,
    setPrivacy,
    unlinkProfile,
  } = await import("../src/db.js");

  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const guildId = `integration-guild-${suffix}`;
  const discordUserId = `integration-user-${suffix}`;
  const profile: RobloxProfile = {
    id: 987654321,
    username: "PostgresRascal",
    displayName: "Postgres Rascal",
    description: "Integration test profile",
    created: "2020-01-01T00:00:00.000Z",
    isBanned: false,
    avatarUrl: null,
    badgeCount: 12,
  };

  try {
    assert.equal(await initializeDatabase(), "postgres");
    assert.deepEqual(await databaseHealth(), { ok: true, engine: "postgres" });
    await saveProfile(guildId, discordUserId, profile, true);
    assert.equal((await getProfile(guildId, discordUserId))?.username, "PostgresRascal");
    assert.equal(await setPrivacy(guildId, discordUserId, false), true);
    assert.equal((await getProfile(guildId, discordUserId))?.publicProfile, false);
    assert.equal(await unlinkProfile(guildId, discordUserId), true);
    assert.equal(await getProfile(guildId, discordUserId), null);
  } finally {
    await closeDatabase();
  }
});
