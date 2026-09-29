import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { BRAND_ASSETS } from "../apps/web/lib/brand-assets.js";
import { ECONOMY_CONCEPTS, PROGRESSION_CONCEPTS, QUEST_CATEGORIES, QUEST_JOURNAL, WORLD_LOCATIONS } from "../apps/web/lib/game-content.js";

const PUBLIC = join("apps", "web", "public");

test("Q01: A Sign of Trouble is the only Release 1.0 quest", () => {
  const release = QUEST_JOURNAL.filter((quest) => quest.status === "release-1");
  assert.equal(release.length, 1);
  const [q01] = release;
  assert.ok(q01);
  assert.equal(q01.code, "Q01");
  assert.equal(q01.title, "A Sign of Trouble");
  assert.equal(q01.category, "Main Story");
  assert.equal(q01.route, "Starting Village → First Crossroads → Rascal Plaza");
});

test("every quest category has an entry, and pets and fishing are future updates", () => {
  for (const category of QUEST_CATEGORIES) {
    assert.ok(QUEST_JOURNAL.some((quest) => quest.category === category), `${category} is empty`);
  }
  for (const quest of QUEST_JOURNAL.filter((item) => item.category === "Pets & Fishing")) {
    assert.equal(quest.status, "future-update", quest.title);
  }
});

test("quest cards point at real images", () => {
  for (const quest of QUEST_JOURNAL) {
    const src = BRAND_ASSETS.journalCards[quest.card];
    assert.ok(existsSync(join(PUBLIC, src)), `${quest.title}: missing ${src}`);
  }
});

test("pet bonding is the only future progression system", () => {
  assert.deepEqual(
    PROGRESSION_CONCEPTS.filter((node) => node.future).map((node) => node.id),
    ["bonding"],
  );
});

test("two core currencies; gems and crystals are materials", () => {
  assert.deepEqual(
    ECONOMY_CONCEPTS.filter((item) => item.kind === "currency").map((item) => item.name),
    ["Gold", "Crown Shards"],
  );
  assert.deepEqual(
    ECONOMY_CONCEPTS.filter((item) => item.kind === "material").map((item) => item.name),
    ["Gems & Crystals"],
  );
});

test("River Path, Crown Ruins and Wrongway Territory use their own atlas art and stay out of Release 1.0", () => {
  const expected: Record<string, string> = {
    "River Path": "/brand/game/locations/river-path-v1.webp",
    "Crown Ruins": "/brand/game/locations/crown-ruins-v1.webp",
    "Wrongway Territory": "/brand/game/locations/wrongway-territory-v1.webp",
  };
  for (const [name, src] of Object.entries(expected)) {
    const area = WORLD_LOCATIONS.find((item) => item.name === name);
    assert.ok(area, name);
    assert.equal(BRAND_ASSETS.locations[area.image as keyof typeof BRAND_ASSETS.locations], src);
    assert.ok(existsSync(join(PUBLIC, src)), `missing ${src}`);
    assert.equal(area.release, "chapter-1");
  }
  for (const area of WORLD_LOCATIONS) assert.ok(area.image, `${area.name} has no atlas art`);
});
