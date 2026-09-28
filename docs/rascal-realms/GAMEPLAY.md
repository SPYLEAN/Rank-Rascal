# Gameplay Concepts

Nothing in this document is implemented Roblox gameplay. It documents the design intent behind the website's Quest Journal and progression/economy sections, all labeled CONCEPT or PLANNED on the page itself.

## Core loop — IN DEVELOPMENT (already canon, from `CORE_LOOP`)

Enter a disputed place → Collect independent signals → Build a shared theory → Accuse the lie → Survive the correction → Carry the consequence. Explore → Investigate → Expose the Lie → Fight/Solve/Escape → Earn → Upgrade → Discover something worse.

## Quest journal categories — CONCEPT

Kept in sync with `apps/web/lib/game-content.ts`'s `QUEST_JOURNAL` (9 entries) — treat a mismatch as a bug.

- **Story** — the Episode 1 main line (`EPISODE_ONE_BEATS`). Sample: "The Safest Path" (Starting Village), "The Path Remembers" (Mystery Forest).
- **Mysteries** — optional deduction cases tied to a single location. Sample: "The Missing Treaty Page" (Stickerwood Heartwood), "The Bridge Two Maps Disagree On" (River Path).
- **Bounties** — short, evidence-light tasks for Bounty Gold. Sample: "The Merchant Who Remembers You Wrong" (Rascal Plaza).
- **Guild Missions** — squad-scale objectives for Guild Credits. Sample: "Chart the Ancient Tree's Hollow" (Ancient Tree), "Redraw the Bridges Before They Forget" (Sky Bridges).
- **Hidden Quests** — no marker, discovered only through exploration. Sample: "The Cove That Isn't on the New Map" (Hidden Cove), "The Ferryman's Second Logbook" (River Path).

## Progression concepts — CONCEPT

- **Hero Level** — overall experience per hero.
- **Abilities** — per-hero power trees (the three starting powers in `HEROES.md` are the entry point).
- **Gear** — equippable items affecting combat/traversal.
- **Relics** — rare, corruption-touched items with a story cost as well as a benefit.
- **Class Mastery** — a per-hero specialization track, unlocked through repeated use.
- **Badges** — in-game collectible trophies tied to solved Frauds. Distinct from the real, currently-live Discord bot badges (Quest Crusader, Drip Monarch, Veteran Noob) — see `CONFLICT_REPORT.md`.

## Economy concepts — CONCEPT

- **Crown Shards** — primary currency, earned by correcting a lie.
- **Bounty Gold** — earned from Bounty quests, spent on gear.
- **Guild Credits** — earned from Guild Missions, spent on cosmetics and guild-hall upgrades.

No gambling, loot boxes, paid randomness, pay-to-win progression, or streak-shame mechanics — consistent with `AGENTS.md`'s safety rules, which apply to this game concept exactly as they apply to the existing bot.

## King Wrongway reveal — CONCEPT

Presented on the site as a narrative beat, not a boss-fight demo: King Wrongway is revealed as a ruler trapped inside his own final command, believing one "perfect" road can prevent a remembered catastrophe from happening again — even if every other future must disappear to enforce it. Uses existing concept art (`BRAND_ASSETS.game.stickerwoodEnemiesBoss`); no final boss model or encounter exists.

## Beyond Stickerwood — PLANNED

A sealed, locked-vault-styled teaser only. No realm names, dates, or content are invented beyond "more of Rascal Realms is planned after Episode 1." No launch dates are stated anywhere.
