import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import type { RobloxProfile } from "../src/types.js";

const testDirectory = mkdtempSync(join(tmpdir(), "rank-rascal-hardening-"));
process.env.DATABASE_PATH = join(testDirectory, "hardening.db");
delete process.env.DATABASE_URL;

const { GENERIC_ERROR_MESSAGE, UserError, userFacingMessage } = await import("../src/errors.js");
const { RateLimiter, checkCommandRate, rateLimitMessage } = await import("../src/ratelimit.js");
const { listPublicProfiles, saveProfile, getProfile } = await import("../src/db.js");

const roblox = (id: number, name: string): RobloxProfile => ({
  id,
  username: name,
  displayName: name,
  description: "",
  created: "2020-01-01T00:00:00.000Z",
  isBanned: false,
  avatarUrl: null,
  badgeCount: id,
});

test("only UserError messages reach members; internal errors are replaced", () => {
  assert.equal(userFacingMessage(new UserError("Friendly text.")), "Friendly text.");
  assert.equal(userFacingMessage(new Error("connect ECONNREFUSED 10.0.0.1:5432")), GENERIC_ERROR_MESSAGE);
  assert.equal(userFacingMessage("weird"), GENERIC_ERROR_MESSAGE);
  assert.doesNotMatch(GENERIC_ERROR_MESSAGE, /ECONN|postgres|token/i);
});

test("rate limiter blocks after the limit and recovers when the window passes", () => {
  const limiter = new RateLimiter(2, 1_000);
  assert.equal(limiter.check("a", 0).allowed, true);
  assert.equal(limiter.check("a", 100).allowed, true);
  const blocked = limiter.check("a", 200);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterMs, 800);
  assert.equal(limiter.check("b", 200).allowed, true, "other keys are independent");
  assert.equal(limiter.check("a", 1_001).allowed, true);
});

test("expensive commands get a tighter per-user budget", () => {
  const user = "rate-test-user";
  for (let i = 0; i < 3; i += 1) assert.equal(checkCommandRate(user, "preview-roblox", 1_000 + i).allowed, true);
  const fourth = checkCommandRate(user, "preview-roblox", 1_010);
  assert.equal(fourth.allowed, false);
  assert.match(rateLimitMessage(fourth.retryAfterMs), /^Slow down, Rascal\. Try again in \d+s\.$/);
});

test("a Roblox account can be verified by only one member per server", async () => {
  await saveProfile("guild-1", "discord-a", roblox(500, "OwnerA"), true);
  await assert.rejects(
    saveProfile("guild-1", "discord-b", roblox(500, "OwnerA"), true),
    (error: unknown) => error instanceof UserError && /already verified/.test(error.message),
  );
  assert.equal(await getProfile("guild-1", "discord-b"), null, "failed claim leaves no profile behind");
  // Same account in a different server is fine, and unverified previews are unaffected.
  await saveProfile("guild-2", "discord-b", roblox(500, "OwnerA"), true);
  await saveProfile("guild-1", "discord-c", roblox(500, "OwnerA"), false);
});

test("the Yapping Order lists verified profiles only", async () => {
  await saveProfile("guild-3", "verified-user", roblox(601, "RealPlayer"), true);
  await saveProfile("guild-3", "preview-user", roblox(602, "ImpersonatedPlayer"), false);
  const names = (await listPublicProfiles("guild-3")).map((profile) => profile.username);
  assert.deepEqual(names, ["RealPlayer"]);
});
