import test from "node:test";
import assert from "node:assert/strict";
import { DISCORD_URL, OFFICIAL_PROFILES, SOCIAL_LINKS, isOfficialProfileUrl } from "../apps/web/lib/site-config.js";

test("the social group only contains real https profiles on each platform's own domain", () => {
  for (const link of SOCIAL_LINKS) {
    assert.ok(isOfficialProfileUrl(link.id, link.href), `${link.id}: ${link.href}`);
    assert.doesNotMatch(link.href, /PASTE|example|placeholder/i);
  }
});

test("the existing official Discord invite is preserved", () => {
  assert.equal(DISCORD_URL, process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://discord.gg/gkneGrpzAn");
  assert.equal(SOCIAL_LINKS[0]?.id, "discord");
  assert.equal(SOCIAL_LINKS[0]?.href, DISCORD_URL);
});

test("placeholders and wrong domains never become links", () => {
  assert.equal(isOfficialProfileUrl("instagram", "[PASTE EXACT INSTAGRAM URL HERE]"), false);
  assert.equal(isOfficialProfileUrl("youtube", "https://example.com/rascal"), false);
  assert.equal(isOfficialProfileUrl("youtube", "http://www.youtube.com/@rascal"), false);
  assert.equal(isOfficialProfileUrl("instagram", "https://www.instagram.com/"), false);
  assert.equal(isOfficialProfileUrl("youtube", "https://www.youtube.com/@rascal"), true);
});

test("the group is Discord, Instagram and YouTube at the owner's exact URLs", () => {
  assert.deepEqual(
    SOCIAL_LINKS.map((link) => [link.id, link.href]),
    [
      ["discord", DISCORD_URL],
      ["instagram", "https://www.instagram.com/rascalrealms/"],
      ["youtube", "https://www.youtube.com/@SPYLEAN"],
    ],
  );
  assert.equal(OFFICIAL_PROFILES.instagram.label, "Instagram");
  assert.equal(OFFICIAL_PROFILES.youtube.label, "YouTube");
});
