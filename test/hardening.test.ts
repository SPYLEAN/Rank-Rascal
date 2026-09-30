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

test("verified linking transfers a Roblox account; only one verified holder per server", async () => {
  await saveProfile("guild-1", "discord-a", roblox(500, "OwnerA"), true);
  await saveProfile("guild-1", "discord-c", roblox(500, "OwnerA"), false); // preview never conflicts
  // The real owner re-verifies from a new Discord account: the old holder is released.
  await saveProfile("guild-1", "discord-b", roblox(500, "OwnerA"), true);
  assert.equal(await getProfile("guild-1", "discord-a"), null, "previous verified holder is released");
  assert.equal((await getProfile("guild-1", "discord-b"))?.verified, true);
  assert.equal((await getProfile("guild-1", "discord-c"))?.verified, false, "previews are untouched");
  // Other servers are independent.
  await saveProfile("guild-2", "discord-a", roblox(500, "OwnerA"), true);
  assert.equal((await getProfile("guild-1", "discord-b"))?.verified, true);
});

test("transferring a verified account clears the previous holder's badges and quests", async () => {
  const { recordVerifiedQuest } = await import("../src/badges.js");
  const { countQuestCompletions } = await import("../src/db.js");
  await saveProfile("guild-4", "old-holder", roblox(700, "SharedAccount"), true);
  await recordVerifiedQuest("guild-4", "old-holder", "rotfile_checkin");
  assert.equal(await countQuestCompletions("guild-4", "old-holder"), 1);
  await saveProfile("guild-4", "new-holder", roblox(700, "SharedAccount"), true);
  assert.equal(await countQuestCompletions("guild-4", "old-holder"), 0);
  assert.equal(await countQuestCompletions("guild-4", "new-holder"), 0, "progress is not transferred");
});

test("client key uses the Nth X-Forwarded-For entry from the right", async () => {
  const { clientKey } = await import("../src/web.js");
  const request = (forwarded: string | undefined, remote = "10.0.0.9") => ({
    headers: forwarded === undefined ? {} : { "x-forwarded-for": forwarded },
    socket: { remoteAddress: remote },
  }) as never;
  assert.equal(clientKey(request("203.0.113.5, 198.51.100.7"), 1), "198.51.100.7");
  assert.equal(clientKey(request("203.0.113.5, 198.51.100.7"), 2), "203.0.113.5");
  assert.equal(clientKey(request("spoofed, 198.51.100.7"), 1), "198.51.100.7", "left entries are ignored");
  assert.equal(clientKey(request(undefined), 1), "10.0.0.9", "no header falls back to the socket");
  assert.equal(clientKey(request("198.51.100.7"), 0), "10.0.0.9", "0 hops ignores the header");
  assert.equal(clientKey(request("2001:db8:1:2:aaaa:bbbb:cccc:dddd"), 1), "2001:db8:1:2", "IPv6 collapses to /64");
  assert.ok(clientKey(request("x".repeat(500)), 1).length <= 64);
});

test("the Yapping Order lists verified profiles only", async () => {
  await saveProfile("guild-3", "verified-user", roblox(601, "RealPlayer"), true);
  await saveProfile("guild-3", "preview-user", roblox(602, "ImpersonatedPlayer"), false);
  const names = (await listPublicProfiles("guild-3")).map((profile) => profile.username);
  assert.deepEqual(names, ["RealPlayer"]);
});
