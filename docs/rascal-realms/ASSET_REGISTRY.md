# Asset Registry

Audit of every visual asset in the two untracked source trees, classified **CANON**, **APPROVED** (already published to `apps/web/public/brand/` and in active use), **SUPPORTING** (usable reference, not currently promoted), **LEGACY** (superseded, preserved for history only), **RETIRED** (explicitly discarded — fox-era), or **UNUSED** (present, not referenced anywhere, not recommended for promotion as-is).

**Decision for this pass**: no new binary assets were copied into `apps/web/public/brand/`. Every new website section (hero selector, quest journal, progression/economy, King Wrongway reveal, Beyond Stickerwood teaser) is built with typography, color, and existing published art — because none of the six heroes (including the four already "in development" ones) has any portrait art published today, and the reference pack's own manifest labels almost everything outside the single canonical Razz reference as CONCEPT/tone-anchor, not production-ready. Promoting a partial set of raw, unoptimized images now would create an inconsistency (2 heroes illustrated, 4 not) and risk violating the "never present concept art as finished Roblox/3D art" rule. This registry catalogues what exists so a future, dedicated art-integration pass can select and optimize deliberately.

## Already published and in active use — APPROVED

Everything under `apps/web/public/brand/` today (verified against `apps/web/lib/brand-assets.ts`): logos/icons, 4 Razz poses, 6 Discord emoji + 6 full-res emoji (hardcoded in preview components), loading animation (webp/gif, 2 speeds, `razz-load-01.png` static fallback), 3 canonical badges (+256px Discord variants), 7 website-art illustrations, 6 `game/` pre-production illustrations (`stickerwood-key-art`, `world-lies-ui`, `stickerwood-enemies-boss` — includes King Wrongway — `founders-guild-workshop`, `qa-truth-lab`, `fracture-beneath-stickerwood`), 3 banners (including `rascal-plaza-banner.png`), 6 badge/insignia icons. All comply with the "no contact sheets/prompts/raw generations" publishing rule already.

**Cleanup in this pass**: `brand-assets.ts`'s `websiteArt.tacticalBanner` / `websiteArt.battleRoyaleBanner` keys are removed (their only conceptual owner, `GameRoadmapPanel.tsx`, is dead code being deleted — see `CONFLICT_REPORT.md`); confirm the underlying PNG files can stay on disk unreferenced or be removed if a repo-wide unused-file sweep is done later (out of scope here). `apps/web/public/brand/favicon.ico` is an unreferenced duplicate of the real `apps/web/public/favicon.ico` — flagged UNUSED, not removed in this pass (low risk, out of scope).

## `all assets graphic/brand/` — SUPPORTING / RETIRED-adjacent, not promoted

- `rank-rascal-mascot-v1.png`, `rank-rascal-app-icon-v1.png`, `Rank_Rascal_Brand_Book.pdf` — SUPPORTING, source-of-truth originals for already-published files; keep in place, never re-publish (already superseded by the optimized `public/brand/` copies).
- 6 undated insignia source PNGs — SUPPORTING, already-published (optimized) versions exist in `public/brand/badges/`.
- `poses/razz-poses-contact.png`, `emojis/rascal-emojis-contact.png`, `animation/razz-loading-contact-sheet.jpg` — **never publish**: raw generation contact sheets, explicitly barred by `AGENTS.md`/`docs/BRAND_ASSET_USAGE.md`.
- `badges/PROMPTS.md`, `website-art/PROMPTS.md` — **never publish**: literal AI-generation prompt records.
- `banners/ChatGPT Image *.png` (4 files), `brand/ChatGPT Image *.png` (6 files) — UNUSED: raw, unlabeled generations; one was already manually selected and renamed to `rascal-plaza-banner.png` (already APPROVED/published) — the other 3 in `banners/` are unreviewed, not promoted.

## `all assets graphic/Rascal_Realms_Complete_Concept_Art_Pack/` — SUPPORTING, not promoted this pass

- `00_CANON_REFERENCE/razz-hero-point1.png` — **CANON** (identical file, by content, to the reference pack's `07_CONCEPT_ART/canonical/RR_Razz_Canonical_Reference_v1.png`). Already effectively represented on-site via the published `poses/razz-hero-point.png`.
- `03_PLAYABLE_HEROES/` (17 files, 7 named + 10 unlabeled Sep 28 batch) — SUPPORTING. Contains art for all 6 canonical heroes by filename (`crown_knight_guardian_of_rascal_realms.png`, `glitchcaster_arcane_void_mage.png`, `shadow_ranger_forest_s_hidden_hunter.png`, `trickster_crownfall_game_hero_card.png`, `lorekeeper_the_truth_lantern.png`, `crownfall_badge_scout_adventure.png`, plus a `rascal_realms_choose_your_hero.png` compilation) and a matching real filename for every hero in `HEROES.md`. Recommended for a **future dedicated pass**: review, optimize, and promote consistently for all 6 heroes at once (not partially).
- `02_WORLD_MAP_ENVIRONMENTS/` (13 files incl. `key locations/` 10 unlabeled files) — SUPPORTING, unlabeled; would need visual review before matching to specific new locations in `WORLD.md`. Not promoted this pass.
- `04_RAZZ/` (8 files) — SUPPORTING, all purple-box canon-consistent by filename; redundant with already-published poses.
- `05_UI_SYSTEMS/`, `06_BRANDING_LOGOS/`, `07_DISCORD_COMMUNITY/`, `08_BADGES_ROLE_ICONS/`, `09_BANNERS/` — SUPPORTING, largely redundant with or superseded by already-published, optimized equivalents.
- `title logo/ChatGPT Image...png` — UNUSED, unreviewed single file.
- `90_PRODUCTION_SPECS_FROM_STARTER_PACK/` — **LEGACY**, verbatim mirror of the reference pack's `99_LEGACY_STARTER_PACK/` (fox-era starter kit), kept for history only.
- `MANIFEST.csv`/`MANIFEST.json` in this folder are **stale** (reference ~7 files absent from disk, omit ~20 present files, including entire `key locations/` and half of `03_PLAYABLE_HEROES/`) — do not trust this manifest for future work without re-auditing disk contents first.

## `Rascal_Realms_Preproduction_Pack_v1.0.0/` (reference pack, outside the repo, read-only)

- `07_CONCEPT_ART/canonical/RR_Razz_Canonical_Reference_v1.png` — **CANON**.
- `07_CONCEPT_ART/final/` (5 files: `Player_Roles_Weapons`, `Razz_Master_Sheet`, `Stickerwood_Enemies_Boss`, `Stickerwood_Scale_Tone_KeyArt`, `WorldLies_UI_ToneBoard`) — **SUPPORTING** (manifest calls these tone anchors, not final geometry; `productionAssetsFinal: false`). Note: `Stickerwood_Enemies_Boss` and `Stickerwood_Scale_Tone_KeyArt` and `WorldLies_UI_ToneBoard` are the source files behind the already-published `stickerwood-enemies-boss-v1.png`, `stickerwood-key-art-v1.png`, and `world-lies-ui-v1.png` — already promoted, APPROVED.
- `07_CONCEPT_ART/legacy/` (3 concept boards) and `99_LEGACY_STARTER_PACK/` (fox-era docs, boards, icons) — **LEGACY/RETIRED**. Manifest states explicitly: *"Their fox mascot is invalid."* Never reference from app code; confirmed nothing in `apps/web` does.
- `06_PRODUCTION/IMAGE_GENERATION_PROMPTS.md` — **never publish**: prompt record, internal to the reference pack only.
- All `00`–`06` written spec docs (Master Visual Bible, Razz Character Bible, World kit, UI system, Characters/Combat, Presentation bibles, Production docs) — **CANON/SUPPORTING** as written-direction source material; distilled into `CANON.md`/`ART_DIRECTION.md`/`GAMEPLAY.md`. Not copied verbatim; no images from here were copied into the repo.

## Secrets check

No credentials, API keys, or tokens found in either tree (confirmed by pattern sweep). Nothing from either asset tree was copied, moved, or deleted during this audit.
