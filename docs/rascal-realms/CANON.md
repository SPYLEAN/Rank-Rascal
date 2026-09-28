# Rascal Realms: Crownfall — Canon

Source of truth for the public website. Every asset, system and claim on the site must trace back to a label here: **CANON** (locked, matches shipped code/art), **CONCEPT** (Claude/production-authored direction, not yet finalized), **PLANNED** (named and intended, no build started), **IN DEVELOPMENT** (actively being built), **RETIRED** (deliberately discarded, kept only for history), **LEGACY** (superseded material preserved for reference/rollback, never presented as current).

## Identity

| Field | Value | Status |
|---|---|---|
| Product | Rascal Realms: Crownfall | CANON |
| Genre | Cinematic co-op Roblox action-RPG mystery | CANON |
| Community | Rascal Labs | CANON |
| Legacy product | Rank Rascal (Discord bot, 13+, Roblox stat comedy) | LEGACY — paused by the owner 2026-09-26; code preserved for rollback, not deleted |
| Studio/creator credit | "Created by SPYLEAN" | CANON — preserved on every page footer |

Rank Rascal is not being deleted or hidden. It is the prior product this team shipped; its routes, docs and legal entity name stay intact and linked from the footer/`/invite`, but it is no longer the site's primary identity.

## Razz

**Canonical Razz**: a chunky, purple, box-shaped body and head; an oversized lime-green crown set with magenta gems; one normal lime/green eye and one segmented, circular "glitch" eye; a tongue-out, mischievous expression; a thick black sticker-style outline; chaotic, expressive energy. Razz is a **supporting mascot and in-world guide**, never the player protagonist, never a soldier, fox, human, or generic robot.

Status: **CANON**. Earlier fox-based Razz exploration is **RETIRED** — see `game-content.ts` devlog entry `razz-canonical` and `Rascal_Realms_Preproduction_Pack_v1.0.0/CHANGELOG.md`, which explicitly discards it. No fox assets or fox-named components exist anywhere in `apps/web`; nothing further to remove.

## Playable heroes (6)

Crown Knight, Glitchcaster, Shadow Ranger, Trickster — **IN DEVELOPMENT** (already in `game-content.ts`, described in written form on `/game`, concept art exists). Lorekeeper, Badge Scout — **CONCEPT** (concept art exists in the asset pack; full ability/lore text authored for this pass in `HEROES.md`). See `HEROES.md` for full roster.

## World locations (11)

Starting Village, Mystery Forest, Glitch Grove, Crown Ruins — **IN DEVELOPMENT** (existing Episode 1 content). Stickerwood (the heartwood place, distinct from the realm name), Ancient Tree, Rascal Plaza (in-fiction), River Path, Hidden Cove, Sky Bridges — **CONCEPT** (newly authored this pass, consistent with the established tone and `CORE_LOOP`). King Wrongway Citadel — **PLANNED** (sealed, post-Episode-1 destination; not enterable in the current design). See `WORLD.md`.

## First boss

King Wrongway — **CONCEPT**. Established in written lore (`STORY_FOUNDATION`, `LORE_ERAS`, `EPISODE_ONE_BEATS`) and depicted in concept art (`BRAND_ASSETS.game.stickerwoodEnemiesBoss`). No final 3D model, rig or Roblox boss encounter exists.

## Fairness rule

The world may lie; the game never does. Every "Fraud" (a lie the world tells) must have discoverable, interpretable-before-the-answer evidence. Tutorials, accessibility information, navigation and actual rules are always truthful — the fiction lies, the interface does not. This governs `SusInvestigationTerminal`, the world map dossiers and every quest description.

## Visual direction

Premium cinematic fantasy adventure: storybook fantasy + physical sticker/paper-craft + expressive Roblox proportions. Warm green/wood/cream/gold/sky-blue for normal Stickerwood; purple/magenta/lime reserved for Crown corruption, lies, Razz, and critical accents. See `ART_DIRECTION.md` for the full palette and material rules. Status: **CANON** (matches `Rascal_Realms_Preproduction_Pack_v1.0.0/00_MASTER_VISUAL_BIBLE.md` exactly).

## Systems status summary

| System | Status | Notes |
|---|---|---|
| The World Lies (investigation loop) | IN DEVELOPMENT | `SusInvestigationTerminal.tsx` is a single scripted case, a real demo, not a full game |
| World map / atlas | CONCEPT (this pass expands 4→11 locations, removes tactical/HUD framing) | `WorldAtlas.tsx` |
| Hero selector | CONCEPT (new this pass) | Text/color-driven; no final hero renders exist, so none are implied |
| Quest journal | CONCEPT (new this pass) | Representative entries only, not a live quest system |
| Progression & economy | CONCEPT (new this pass) | Named concepts only; nothing is implemented in Roblox |
| Guild (in-game) | PLANNED | Distinct from the real-world Founders Guild (a contributor program) — see `CONFLICT_REPORT.md` |
| Founders Guild (contributor program) | IN DEVELOPMENT (real) | Real application form, email-only, no durable roster database |
| Devlog / Built in Public | IN DEVELOPMENT (real) | `/devlog`, 3 real entries |
| Community entrance | IN DEVELOPMENT (real) | Discord is live; Roblox group is forming |

No system on this list is claimed as shipped Roblox gameplay. No final 3D models, animation, or playable build exist yet.
