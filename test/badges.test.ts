import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import type { RobloxProfile } from "../src/types.js";

const testDirectory = mkdtempSync(join(tmpdir(), "rank-rascal-badges-"));
process.env.DATABASE_PATH = join(testDirectory, "badges.db");

const {
  countQuestCompletions,
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

test("Veteran Noob is awarded once to an eligible verified profile", () => {
  saveProfile("guild", "veteran", veteranProfile, true);
  const profile = getProfile("guild", "veteran");
  assert.ok(profile);
  const first = evaluateAutomaticBadges(profile, new Date("2026-08-14T00:00:00.000Z"));
  const second = evaluateAutomaticBadges(profile, new Date("2026-08-14T00:00:00.000Z"));
  assert.deepEqual(first.map((badge) => badge.id), ["veteran_noob"]);
  assert.deepEqual(second, []);
});

test("a verified quest only counts once per quest and UTC day", () => {
  const first = recordVerifiedQuest(
    "guild",
    "veteran",
    "rotfile_checkin",
    new Date("2026-08-14T10:00:00.000Z"),
  );
  const duplicate = recordVerifiedQuest(
    "guild",
    "veteran",
    "rotfile_checkin",
    new Date("2026-08-14T22:00:00.000Z"),
  );
  assert.equal(first.recorded, true);
  assert.equal(duplicate.recorded, false);
  assert.equal(duplicate.totalCompletions, 1);
});

test("Drip Monarch unlocks after five distinct self-check days", () => {
  for (let day = 1; day <= 5; day += 1) {
    recordVerifiedQuest(
      "guild",
      "veteran",
      "self_dripcheck",
      new Date(`2026-09-${String(day).padStart(2, "0")}T12:00:00.000Z`),
    );
  }
  const earned = listEarnedBadges("guild", "veteran").map((badge) => badge.badgeId);
  assert.ok(earned.includes("drip_monarch"));
});

test("Quest Crusader unlocks after ten unique verified quest completions", () => {
  for (let day = 1; day <= 5; day += 1) {
    const date = new Date(`2026-10-${String(day).padStart(2, "0")}T12:00:00.000Z`);
    recordVerifiedQuest("guild", "veteran", "rotfile_checkin", date);
    recordVerifiedQuest("guild", "veteran", "friendly_rivalry", date);
  }
  const earned = listEarnedBadges("guild", "veteran").map((badge) => badge.badgeId);
  assert.ok(earned.includes("quest_crusader"));
});

test("unlinking removes badge and quest progress", () => {
  assert.equal(unlinkProfile("guild", "veteran"), true);
  assert.deepEqual(listEarnedBadges("guild", "veteran"), []);
  assert.equal(countQuestCompletions("guild", "veteran"), 0);
});

test("changing the linked Roblox identity resets badge and quest ownership", () => {
  saveProfile("guild", "switcher", veteranProfile, true);
  const profile = getProfile("guild", "switcher");
  assert.ok(profile);
  evaluateAutomaticBadges(profile, new Date("2026-08-14T00:00:00.000Z"));
  recordVerifiedQuest(
    "guild",
    "switcher",
    "rotfile_checkin",
    new Date("2026-08-14T12:00:00.000Z"),
  );

  saveProfile("guild", "switcher", { ...veteranProfile, id: 202, username: "DifferentRascal" }, true);
  assert.deepEqual(listEarnedBadges("guild", "switcher"), []);
  assert.equal(countQuestCompletions("guild", "switcher"), 0);
});
