# World

**Source of truth: [`FIRST_RELEASE.md`](FIRST_RELEASE.md) §9.** Release 1 (Chapter 1: The Sign That Lied) contains one polished, interconnected open-zone realm, Stickerwood, with the ten major areas below, in the specification's order. This file and `apps/web/lib/game-content.ts` → `WORLD_LOCATIONS` are kept in sync; treat a mismatch as a bug.

**Release 1.0 update (2026-09-29):** the initial release, *A Sign of Trouble*, covers only Starting Village, Rascal Plaza and Stickerwood Forest (with the First Crossroads). The other seven areas are Chapter 1 content for later updates. `WORLD_LOCATIONS[].release` records this, and the atlas shows it. The atlas now uses the clean high-resolution map (`stickerwood-map-v2.webp`, no Razz in frame), with hotspots re-placed for it, and Starting Village has its canonical art (`starting-village-v1.webp`). See `CONFLICT_REPORT.md`.

Every area is **PLANNED** for Chapter 1. The project is in pre-production (Phase 1: Foundation). No area is built in Roblox yet. Concept art sets direction, not final geography.

On the website atlas each area also carries a `hotspot` (its position on the Stickerwood key art), a `chapterRole` and a `changes` line describing how progress there affects the rest of the realm. The atlas draws one route through all ten in this order so the realm reads as a single chapter, not a level-select screen.

| # | Area | Chapter role (spec) | Purpose (spec) | Website art |
|---|---|---|---|---|
| 1 | Starting Village | Act I | Onboarding, NPCs, first quests, basic merchants, peaceful introduction | `starting-village-v1` |
| 2 | Rascal Plaza | Act I (first objective: "Reach Rascal Plaza") | Main social hub: gathering, merchants, quest NPCs, pets, future guild and event hooks | `rascal-plaza-realm-v1` |
| 3 | Stickerwood Forest | Acts I–II | Main exploration zone: paths, secrets, light combat, Frauds, pets, collectibles, caves | `mystery-forest-v1` |
| 4 | River Path | Side content | Fishing, nature, side quests, atmosphere, secrets | `river-path-v1` |
| 5 | Ancient Tree | Act III | Landmark visible from many areas; lore, scale, traversal, story progression | `ancient-tree-v1` |
| 6 | Glitch Grove | Act IV | Increasing instability; distorted plants, Crown energy, harder enemies, advanced Frauds | `glitch-grove-v1` |
| 7 | Crown Ruins | Act V | Relics, tougher enemies, major lore, stronger corruption; Overgrown Receipt mini-boss | `crown-ruins-v1` |
| 8 | Sky Bridges | Late chapter | Floating islands, bridges, waterfalls, vistas; traversal spectacle | `sky-bridges-v1` |
| 9 | Wrongway Territory | Acts IV–VI | Contradictory signs, strange geometry, warped routes, boss foreshadowing | `wrongway-territory-v1` |
| 10 | King Wrongway Citadel | Act VI | Final Chapter 1 environment; dark and hostile but still Stickerwood | `king-wrongway-citadel-v1` |

"Map detail" means the atlas shows a zoomed crop of the approved key art around the hotspot rather than inventing new art. Since 2026-09-29 every area has its own art (River Path, Crown Ruins and Wrongway Territory got owner-supplied images), so the map-detail fallback is unused.

## Authored detail (CONCEPT)

Mysteries, threats, discoveries, notable characters and the `changes` line for each area are website-level CONCEPT copy, written to match the spec and the existing tone. The full text lives in `WORLD_LOCATIONS`. Where the spec names something (Crown Sprouts, Glitch Slimes, Lost Stickers, the Overgrown Receipt, King Wrongway, the Pet Keeper and Fishing NPC, the locked guild board, the Crownfall-corrupted fish), the site uses it directly.

## Lore reserve: outside Release 1

The earlier eleven-location atlas included three places that are **not** in the Release 1 area list. On 2026-09-29 the owner chose to match the atlas to Release 1. These stay here as lore reserve only. They are not on the website map and must not be presented as Release 1 content.

- **Stickerwood (the Heartwood)**: an ancient paper-craft grove carved with half-legible treaties. Its concept art (`stickerwood-heartwood-v1`) is still used as general Stickerwood atmosphere on the site, captioned as concept art, never as a named area.
- **Mystery Forest**: merged into **Stickerwood Forest**. Its art and "the trails remember" lore now belong to Stickerwood Forest.
- **Hidden Cove**: a secluded inlet used by Lost Stickers. Its art (`hidden-cove-v1`) remains only as the Badge Scout backdrop in the hero selector.
