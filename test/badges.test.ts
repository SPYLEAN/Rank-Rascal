import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import type { RobloxProfile } from "../src/types.js";

const testDirectory = mkdtempSync(join(tmpdir(), "rank-rascal-badges-"));
process.env.DATABASE_PATH = join(testDirectory, "badges.db");
delete process.env.DATABASE_URL;

const {
  countQuestCompletions,
  consumeOAuthState,
  createOAuthState,
  databaseHealth,
  getProfile,
  listEarnedBadges,
  saveProfile,
  unlinkProfile,
} = await import("../src/db.js");
const { evaluateAutomaticBadges, recordVerifiedQuest } = await import("../src/badges.js");

const veteranProfile: RobloxProfile = {
  id: 101,
  username: "VeteranNoob",
  displayName: "Veteran Noob",
  description: "",
  created: "2020-01-01T00:00:00.000Z",
  isBanned: false,
  avatarUrl: null,
  badgeCount: 20,
};

test("Veteran Noob is awarded once to an eligible verified profile", async () => {
  await saveProfile("guild", "veteran", veteranProfile, true);
  const profile = await getProfile("guild", "veteran");
  assert.ok(profile);
  const first = await evaluateAutomaticBadges(profile, new Date("2026-08-14T00:00:00.000Z"));
  const second = await evaluateAutomaticBadges(profile, new Date("2026-08-14T00:00:00.000Z"));
  assert.deepEqual(first.map((badge) => badge.id), ["veteran_noob"]);
  assert.deepEqual(second, []);
});

test("a verified quest only counts once per quest and UTC day", async () => {
  const first = await recordVerifiedQuest(
    "guild",
    "veteran",
    "rotfile_checkin",
    new Date("2026-08-14T10:00:00.000Z"),
  );
  const duplicate = await recordVerifiedQuest(
    "guild",
    "veteran",
    "rotfile_checkin",
    new Date("2026-08-14T22:00:00.000Z"),
  );
  assert.equal(first.recorded, true);
  assert.equal(duplicate.recorded, false);
  assert.equal(duplicate.totalCompletions, 1);
});

test("Drip Monarch unlocks after five distinct self-check days", async () => {
  for (let day = 1; day <= 5; day += 1) {
    await recordVerifiedQuest(
      "guild",
      "veteran",
      "self_dripcheck",
      new Date(`2026-09-${String(day).padStart(2, "0")}T12:00:00.000Z`),
    );
  }
  const earned = (await listEarnedBadges("guild", "veteran")).map((badge) => badge.badgeId);
  assert.ok(earned.includes("drip_monarch"));
});

test("Quest Crusader unlocks after ten unique verified quest completions", async () => {
  for (let day = 1; day <= 5; day += 1) {
    const date = new Date(`2026-10-${String(day).padStart(2, "0")}T12:00:00.000Z`);
    await recordVerifiedQuest("guild", "veteran", "rotfile_checkin", date);
    await recordVerifiedQuest("guild", "veteran", "friendly_rivalry", date);
  }
  const earned = (await listEarnedBadges("guild", "veteran")).map((badge) => badge.badgeId);
  assert.ok(earned.includes("quest_crusader"));
});

test("unlinking removes badge and quest progress", async () => {
  assert.equal(await unlinkProfile("guild", "veteran"), true);
  assert.deepEqual(await listEarnedBadges("guild", "veteran"), []);
  assert.equal(await countQuestCompletions("guild", "veteran"), 0);
});

test("changing the linked Roblox identity resets badge and quest ownership", async () => {
  await saveProfile("guild", "switcher", veteranProfile, true);
  const profile = await getProfile("guild", "switcher");
  assert.ok(profile);
  await evaluateAutomaticBadges(profile, new Date("2026-08-14T00:00:00.000Z"));
  await recordVerifiedQuest(
    "guild",
    "switcher",
    "rotfile_checkin",
    new Date("2026-08-14T12:00:00.000Z"),
  );

  await saveProfile("guild", "switcher", { ...veteranProfile, id: 202, username: "DifferentRascal" }, true);
  assert.deepEqual(await listEarnedBadges("guild", "switcher"), []);
  assert.equal(await countQuestCompletions("guild", "switcher"), 0);
});

test("OAuth state is single-use", async () => {
  await createOAuthState(
    "test-state-hash",
    "discord-user",
    "guild",
    "pkce-verifier",
    new Date(Date.now() + 60_000).toISOString(),
  );
  assert.deepEqual(await consumeOAuthState("test-state-hash"), {
    discordUserId: "discord-user",
    guildId: "guild",
    codeVerifier: "pkce-verifier",
  });
  assert.equal(await consumeOAuthState("test-state-hash"), null);
});

test("database health identifies the local SQLite adapter", async () => {
  assert.deepEqual(await databaseHealth(), { ok: true, engine: "sqlite" });
});
