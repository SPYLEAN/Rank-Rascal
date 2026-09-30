# Website Vision

## Primary identity

Rascal Realms: Crownfall is the primary identity everywhere on the public site. "Rank Rascal" remains only where legal/legacy context genuinely requires it: the Privacy/Terms legal-entity name, the `/invite` Discord-bot archive page, and the footer copyright line (paired with the new brand, not replacing it).

## Navigation

All homepage anchors below live on `/` (the sections already exist there or are added in Phase E), so the nav works identically from any page.

- **WORLD** → `/#explore-stickerwood` (world map / atlas — existing id)
- **HEROES** → `/#heroes` (hero selector — new)
- **THE WORLD LIES** → `/#world-lies` (investigation system — existing id)
- **QUESTS** → `/#quests` (quest journal — new)
- **GUILDS** → `/community#guild` (real Founders Guild + in-fiction Guild concept)
- **DEVLOG** → `/devlog`
- **COMMUNITY** → `/community`
- **Primary CTA**: "ENTER THE REALM" → `/game` (the full world dossier)

This replaces the current four-item nav (World dossier / Production record / QA & Founders / Plaza & Discord) and single CTA ("Answer the builder's call") with the seven-anchor structure above, so every section named in the brief has a real, reachable route.

## Cinematic intro

Replaces `PageLoadingOverlay`'s scanning/progress-bar copy with a short fracture sequence: black → a small purple fracture appears → the crack expands → "THE WORLD LIES." → Stickerwood is revealed through the fracture → "Rascal Realms: Crownfall" resolves → seamless entrance into the homepage. 2.5–4 seconds. `prefers-reduced-motion` skips straight to the resolved title. A `localStorage` flag (read/write wrapped in try/catch, so a blocked or private-mode browser just always shows the full intro) shortens or skips the intro for returning visitors.

## Homepage chapter order

1. Cinematic intro (site-wide overlay, not a page section)
2. `CinematicHero` — title-screen hero (kept, retitled where needed)
3. `FractureStory` — why the Crown fractured, why the name matters (kept)
4. Hero selector (new) — all six heroes, one owns the screen at a time
5. `WorldAtlas` — rebuilt: 11 locations, tactical chrome removed
6. The World Lies — pillars + `SusInvestigationTerminal` (kept, recon wording removed)
7. Quest journal (new, compact) — Story/Mysteries/Bounties/Guild Missions/Hidden Quests samples
8. Progression & economy concepts (new, compact)
9. Guild experience — extends the existing Founders Guild section to also present the in-fiction Guild concept, clearly separated
10. King Wrongway reveal (new, compact) — narrative beat using existing boss concept art
11. Beyond Stickerwood teaser (new, compact) — sealed/future, no dates
12. `BuildArchive` — Built in Public (kept)
13. `CommunityPlazaSection` — community entrance (kept)

Sections 4, 7, 8, 10, 11 are new for this pass; everything else is the existing build, retitled/decluttered rather than rebuilt from zero.

## Razz guide reframe

`RazzGuide` becomes **Ask Razz** — an in-world interruption, not a support terminal. "Recon," "tactical," and scan-pulse sound-effect naming are removed from its copy and code comments; its knowledge is updated to reference all six heroes and eleven locations where it currently only knows four of each.

## Honesty rules that apply to every new section

No fake progress bars, coordinates, or telemetry. No implied database/roster durability beyond what `apps/web/app/api/community/route.ts` actually does (email-only, in-memory rate limiting). No launch dates. No claim that any hero, location, or system beyond what already ships (Discord, the devlog, the Founders Guild application) is live.
