# Rank Rascal Bot Phase 1 — Badge Engine Handoff

## Outcome

This patch makes the three approved Rank Rascal badges functional in the existing Discord Gateway bot without changing Roblox OAuth scopes or storing Roblox tokens.

### Commands

- `/badges [player]`: privacy-aware shelf with the three real illustrated badge assets.
- `/quests`: private daily quest checklist and badge progress.

The command count increases from 9 to 11. Run `npm run register` in the private test guild after merging.

### Award rules

- **Veteran Noob:** automatically awarded to a verified Roblox identity with an account age of at least 1,095 days.
- **Drip Monarch:** awarded after verified self Drip Checks on five distinct UTC days. Verdict quality does not affect eligibility.
- **Quest Crusader:** awarded after 10 unique verified daily quest completions.

Available daily quests:

- Open your own verified Rotfile.
- Run a Drip Check on yourself.
- Run a Fraud Check against another linked public profile.

Each quest type counts once per UTC day. Unverified preview profiles never earn progress.

## Persistence and privacy

Two additive SQLite tables are created automatically on startup:

- `user_badges`
- `quest_completions`

Both are scoped by Discord guild and user. Awards are idempotent. `/unlink-roblox` cascades deletion to badge and quest data. Switching to a different Roblox identity resets rewards so progress cannot be transferred between identities. A verified Rotfile cannot be silently replaced by `/preview-roblox`.

## Merge instructions for Antigravity

Merge the patch into the current project; do not replace the full repository because the live project contains newer `apps/web` and workspace changes.

1. Merge these source files:
   - `src/badges.ts` (new)
   - `src/commands.ts`
   - `src/db.ts`
   - `src/jobs.ts`
   - `src/oauth.ts`
   - `src/types.ts`
   - `src/web.ts`
2. Add `test/badges.test.ts`.
3. Copy the three files under `brand/badges/discord/` if they are not already present.
4. Merge the Dockerfile changes:
   - Copy `brand/badges/discord` into the runtime image.
   - Confirm the compiled entrypoint is `dist/src/index.js` for the current TypeScript configuration.
5. Do not overwrite the current root `package.json`. Only confirm its production start script targets the emitted entrypoint.
6. Preserve all current website workspace scripts and dependencies.
7. Do not paste or commit `.env` secrets.

## Verification performed

- TypeScript `--noEmit`: passed.
- Production TypeScript compilation: passed.
- 11 Discord commands produced.
- 9 tests passed:
  - Veteran eligibility and idempotence.
  - Daily quest duplicate prevention.
  - Drip Monarch five-day award.
  - Quest Crusader ten-completion award.
  - Unlink cascade deletion.
  - Roblox identity-change reset.
  - Existing humor stability tests.

## Required private-server test

1. Back up the existing SQLite database.
2. Run `npm install` only if the current workspace requires it; this patch adds no dependency.
3. Run `npm run check`, `npm test`, and `npm run build`.
4. Set `DISCORD_GUILD_ID` to the private Rank Rascal Lab server.
5. Run `npm run register` and confirm 11 commands are registered.
6. Start the bot.
7. Run `/badges`; verify all three images render and are initially locked unless eligible.
8. Run `/quests`; confirm it is ephemeral.
9. Link an eligible account and confirm Veteran Noob appears only once.
10. Run your own `/rotfile` twice in one UTC day; confirm only the first completion counts.
11. Run a self `/dripcheck`; confirm the distinct-day counter increases once.
12. Run `/unlink-roblox`; confirm the shelf and quest progress are deleted.

## Production boundary

This phase is safe for private SQLite testing. Before public multi-instance deployment, migrate profiles, OAuth state, quests and badges to PostgreSQL with explicit migrations and backups. Vercel hosts the website only; the Gateway bot still requires an always-on worker host.
