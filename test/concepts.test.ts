import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CONCEPT_CATEGORIES, CONCEPT_ENTRIES, LABS_PREVIEW, conceptById, entriesFor } from "../apps/web/lib/concepts.js";
import { UPDATE_POSTS } from "../apps/web/lib/updates.js";
import { RELEASE_ONE, WORLD_LOCATIONS } from "../apps/web/lib/game-content.js";

const PUBLIC = join("apps", "web", "public");

test("every concept image exists and ids and file numbers are unique", () => {
  const ids = new Set<string>();
  const files = new Set<string>();
  for (const entry of CONCEPT_ENTRIES) {
    assert.equal(ids.has(entry.id), false, `duplicate id ${entry.id}`);
    assert.equal(files.has(entry.file), false, `duplicate file ${entry.file}`);
    ids.add(entry.id);
    files.add(entry.file);
    assert.match(entry.file, /^\d{3}$/);
    for (const path of [entry.image.src, entry.image.thumb]) assert.ok(existsSync(join(PUBLIC, path)), `missing ${path}`);
    assert.ok(entry.alt.length > 20 && !/placeholder|unfinished/i.test(entry.alt), `${entry.id} alt text`);
    assert.ok(entry.shortDescription.length > 10, `${entry.id} description`);
  }
  for (const category of CONCEPT_CATEGORIES) {
    for (const item of category.tiles ?? []) assert.ok(existsSync(join(PUBLIC, item.image.src)), `missing ${item.image.src}`);
  }
});

test("the archive has the twelve requested categories, in order, each with something to show", () => {
  assert.deepEqual(
    CONCEPT_CATEGORIES.map((category) => category.id),
    ["enemies", "pets", "fishing", "loot", "materials", "weapons", "ecology", "environments", "mounts", "king-wrongway", "world-lies", "beyond"],
  );
  CONCEPT_CATEGORIES.forEach((category, index) => {
    assert.equal(category.number, String(index + 1).padStart(2, "0"));
    assert.ok(entriesFor(category).length > 0 || (category.tiles?.length ?? 0) > 0, `${category.id} is empty`);
  });
  assert.deepEqual(entriesFor(CONCEPT_CATEGORIES[0]!).map((entry) => entry.id), ["crown-sprout", "lost-sticker", "glitch-slime", "overgrown-receipt", "king-wrongway"]);
  for (const card of LABS_PREVIEW) assert.ok(conceptById(card.entryId), `preview ${card.entryId}`);
});

test("future concepts are never presented as Release 1.0 content", () => {
  const future = ["glitch-slime", "overgrown-receipt", "king-wrongway", "king-wrongway-studies", "creature-growth", "unidentified-armaments"];
  for (const entry of CONCEPT_ENTRIES) {
    const isFutureCategory = ["pets", "fishing", "mounts"].includes(entry.category);
    if (isFutureCategory || future.includes(entry.id)) {
      assert.notEqual(entry.status, "release-1", `${entry.id} must not be labelled Release 1.0`);
      assert.notEqual(entry.releaseAssociation, "release-1", `${entry.id} must not be associated with Release 1.0`);
    }
  }
  // The Release 1.0 enemies are exactly Crown Sprout and Lost Sticker.
  const releaseEnemies = CONCEPT_ENTRIES.filter((entry) => entry.category === "enemies" && entry.status === "release-1").map((entry) => entry.id);
  assert.deepEqual(releaseEnemies, ["crown-sprout", "lost-sticker"]);
  assert.deepEqual([...RELEASE_ONE.enemies], ["Crown Sprout", "Lost Sticker"]);
  assert.deepEqual(
    WORLD_LOCATIONS.filter((area) => area.release === "release-1").map((area) => area.name),
    ["Starting Village", "Rascal Plaza", "Stickerwood Forest"],
  );
});

test("Updates and Rascal Labs files link to each other", () => {
  for (const post of UPDATE_POSTS) {
    if (!post.labsFile) continue;
    const entry = conceptById(post.labsFile);
    assert.ok(entry, `${post.slug} points at missing file ${post.labsFile}`);
    assert.equal(entry.updateSlug, post.slug, `${entry.id} should link back to ${post.slug}`);
  }
  for (const entry of CONCEPT_ENTRIES) {
    if (!entry.updateSlug) continue;
    assert.ok(UPDATE_POSTS.some((post) => post.slug === entry.updateSlug), `${entry.id} links to missing post ${entry.updateSlug}`);
  }
  const file001 = CONCEPT_ENTRIES.find((entry) => entry.file === "001");
  assert.equal(file001?.shortDescription, "Something has been spotted beneath River Path.");
});

test("Starting Village has exactly one canonical image", () => {
  const village = WORLD_LOCATIONS.find((area) => area.name === "Starting Village");
  assert.equal(village?.image, "startingVillage");
  assert.ok(existsSync(join(PUBLIC, "brand", "game", "locations", "starting-village-v1.webp")));
});
