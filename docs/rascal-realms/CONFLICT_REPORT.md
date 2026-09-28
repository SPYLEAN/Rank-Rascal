# Conflict Report

Explicit resolutions for every conflict named in the completion-pass brief.

## Rank Rascal vs. Rascal Realms branding

**Resolution**: Rascal Realms: Crownfall is the primary identity across `layout.tsx` metadata, `Navbar`, `Footer`, `RazzGuide`, `RazzMascot` default alt text, and `CommunityForms` copy. "Rank Rascal" is retained only in: the Privacy/Terms legal-entity name, `/invite` (the bot archive page, which is honestly framed as "back in the lab"), and the footer copyright line (now paired, e.g. "© Rascal Labs / Rank Rascal · Created by SPYLEAN"). The OG/Twitter card copy was already on-message before this pass and needed no change.

## Bot-era routes

`/games`, `/games/roblox`, `/rewards`, `/dashboard` are confirmed redirect-only stubs (to `/game` and `/invite` respectively) — not conflicting content, left untouched. `/commands`, `/verify`, `/linked-roles`, `/status`, `/safety`, `/privacy`, `/terms`, `/support` are real bot-era pages, kept for rollback per `AGENTS.md`, kept out of primary nav (already the case via `robots.ts` disallow rules), not deleted.

## Four-role vs. six-hero conflict

**Resolution**: `PLAYER_ROLES` in `game-content.ts` is expanded from 4 to 6, adding Lorekeeper and Badge Scout (see `HEROES.md`). The 4 existing heroes' lore is unchanged. Nothing is retired.

## Four-district vs. eleven-location conflict

**Resolution**: `WorldAtlas.tsx`'s hardcoded `DISTRICTS` array (a duplicate of `STICKERWOOD_REGIONS`) is replaced by a single `WORLD_LOCATIONS` export in `game-content.ts` covering all 11 locations (see `WORLD.md`), removing the duplication between the two files and expanding coverage.

## "Stickerwood" naming collision

Stickerwood was used as both the realm/episode name and (per the brief) a discrete location. **Resolution**: "Stickerwood" stays the realm/episode name everywhere it already means that (nav, hero copy, `STORY_FOUNDATION`); the new discrete location is named "Stickerwood (the Heartwood)" to keep both meanings legible without a rename that would ripple through existing, working copy.

## "Rascal Plaza" naming collision

"Rascal Plaza" already names the real-world Discord/Roblox-group community banner (`CommunityPlazaSection.tsx`, `brand-assets.ts` `banners.rascalPlaza`). The brief also lists it as one of the 11 in-fiction world locations. **Resolution**: both meanings are kept, explicitly cross-referenced in `WORLD.md` and here, so a reader never mistakes the in-game market square for the real community hub or vice versa. No renaming — the pun (a place both a real community and its in-fiction heroes gather) is intentional and low-risk.

## "Badges" naming collision

The real, currently-live Discord bot has three badges (Quest Crusader, Drip Monarch, Veteran Noob) awarded for verified Roblox achievements. The brief's progression concepts also include in-game "Badges" as a Roblox collectible idea, and Badge Scout's whole identity is badge-themed. **Resolution**: kept as two clearly-labeled, clearly-different systems — the real bot badges are never referenced in game-concept copy, and `GAMEPLAY.md`/`HEROES.md` both carry an explicit disambiguation note.

## Fox-Razz legacy

**Resolution**: already fully retired in code — the only reference is an honest retirement note in `game-content.ts:62`. No fox assets exist in `apps/web/public`. The asset dump's `99_LEGACY_STARTER_PACK` and `90_PRODUCTION_SPECS_FROM_STARTER_PACK` folders (fox-era) are classified LEGACY in `ASSET_REGISTRY.md` and not referenced by any app code.

## Tactical/recon/military language

**Resolution**: removed from `WorldAtlas.tsx` (scan modes, coordinates, elevation, radar, telemetry HUD bar — replaced with a single map view and location dossiers), `RazzGuide.tsx` ("Recon Terminal" → "Ask Razz", "tactical comms" → plain copy), `PageLoadingOverlay.tsx` (scanning copy replaced by the fracture-intro sequence), `ExperienceChrome.tsx` (telemetry readout renamed/simplified), `sound-effects.ts` (comments only, functionally unchanged). `brand-assets.ts`'s leftover `tacticalBanner`/`battleRoyaleBanner` keys are removed along with the dead `GameRoadmapPanel.tsx` that was their only conceptual owner.

## Unsupported system claims

Confirmed and kept honest: the community API is email-only via Resend with in-memory rate limiting and **no database** — copy in `CommunityForms.tsx` and the API's email templates was audited and does not claim a durable roster; no changes were needed there beyond the brand-name swap. `npm test` covers the bot only, not `apps/web` — this is stated plainly in the final report rather than implied otherwise.

## Presented-as-shipped risk

Every new section (hero selector, quest journal, progression/economy, King Wrongway reveal, Beyond Stickerwood teaser, the 7 new world locations) carries a visible CONCEPT or PLANNED label in the UI itself, sourced from a `status` field on the underlying data — not just in these docs. No final 3D models, animation, or Roblox gameplay build are claimed anywhere on the site.

## Dead code

`ClosingCTA.tsx` and `GameRoadmapPanel.tsx` are confirmed unimported anywhere in `apps/web/app`. **Resolution**: both removed. `GameRoadmapPanel` was leftover multi-game (Fortnite/VALORANT) bot-roadmap content, off-canon for this Roblox-only site; `ClosingCTA` duplicated the homepage's existing inline Guild CTA sections.
