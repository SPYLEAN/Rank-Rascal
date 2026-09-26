# Phase 3C — Private-guild acceptance test (Rank Rascal Lab)

Run only in **Rank Rascal Lab**, against the production worker (`https://api.rankrascal.lol`, Neon PostgreSQL). Use test accounts. Redact Discord/Roblox IDs and tokens in any screenshot or log excerpt. Do **not** register global commands.

## Preconditions (all must be true before starting)

| # | Precondition | How to check |
| --- | --- | --- |
| 1 | Phase 3A and 3B merged to `main`; CI green | GitHub |
| 2 | `https://api.rankrascal.lol/health` returns `{"ok":true,"database":"postgres"}` | `curl -i` |
| 3 | Exactly one worker holds the bot token (no local `npm start`) | Stop local node processes |
| 4 | Roblox redirect URI `https://api.rankrascal.lol/oauth/roblox/callback` configured | Roblox Creator Dashboard |
| 5 | Worker has `DISCORD_GUILD_ID` set to Lab; **0** global commands; 11 guild commands | Read-only REST check |
| 6 | Interactions Endpoint URL is blank | Discord Developer Portal |
| 7 | Two Discord test users (A, B) each with a Roblox test account; B is not a server manager | — |

## Test cases

Record **PASS / FAIL / BLOCKED** and evidence for each.

| # | Test | Expected |
| --- | --- | --- |
| 1 | A runs `/link-roblox` | Ephemeral message with a "Verify with Roblox" button; no password prompt by Rank Rascal |
| 2 | A approves on Roblox | Callback page "IDENTITY VERIFIED" with Razz art; correct username |
| 3 | Reuse the same callback URL | "expired or already used" error (400) |
| 4 | Wait >10 min on a fresh link, then approve | "expired or already used" error |
| 5 | Cancel on Roblox | "Roblox verification was cancelled." |
| 6 | A runs `/rotfile` | Footer "✅ Verified Roblox identity" |
| 7 | B runs `/preview-roblox` with a username | Ephemeral, footer "⚠️ Unverified preview" |
| 8 | A (verified) runs `/preview-roblox` | Refused: unlink first |
| 9 | `/dripcheck` twice | Same verdict both times; non-insulting text |
| 10 | A runs `/fraudcheck opponent:B` | Compares badge counts only; no skill/worth claims. Refused with a clear message if either player is unverified |
| 11 | `/yapping-order` | Lists public **verified** profiles only (previews never appear); labelled as Rascal Rep, not a Roblox rank |
| 12 | `/badges` | Renders the three canonical badge images; self view ephemeral |
| 13 | **Quest ledger.** `/quests` only *displays* progress; it never completes a quest. With A verified: (a) run `/quests` first and note today's state (all ⬜ on a fresh UTC day); (b) run the quest-producing commands: `/rotfile` on yourself (Lore Check-in), `/dripcheck` on yourself (Drip Department), and `/fraudcheck opponent:B` with B having a visible linked profile (Friendly Rivalry); (c) run each of those three commands a second time; (d) run `/quests` again. Also: B on an unverified preview runs the same commands, and an unverified user runs `/quests` | After (b)+(d): three ✅ for today's UTC date. After (c): no change (one completion per quest type per UTC day). The Quest Crusader counter shows 3/10, not more. B's preview earns nothing. The unverified user's `/quests` is refused ("Verify your Roblox identity…"). `/rotfile player:B` and `/dripcheck player:B` on someone else's profile complete nothing |
| 14a | **Automated evidence (no production data).** `npm test` runs the badge/quest suite with an injected clock: Veteran Noob eligibility, Drip Monarch after five distinct UTC days, Quest Crusader after ten unique completions, once-per-day uniqueness, idempotent awards, unlink cascade, identity-switch reset | All pass in CI. These tests use the SQLite adapter; see "Evidence gaps" below |
| 14b | **Veteran Noob in production (immediate, only if a test account is ≥ 1,095 days old).** Verify that account with `/link-roblox` | Badge announced once at verification; `/badges` shows it; verifying again or running commands never awards it twice. If no such account exists, mark **BLOCKED — covered by 14a only** |
| 14c | **Drip Monarch and Quest Crusader in production — multi-day observation (cannot be completed in one session).** See "Multi-day observation" below | Drip Monarch appears on the fifth distinct UTC day with a self `/dripcheck`; Quest Crusader appears at the 10th completion, which needs at least four UTC days (3 + 3 + 3 + 1). Mark **PENDING** until observed |
| 15 | A runs `/witness-protection public:false`; B runs `/rotfile player:A`, `/badges player:A`, `/fraudcheck opponent:A`, `/yapping-order` | B is refused for A; A absent from ranking; A still sees own data |
| 16 | A runs `/unlink-roblox` | Profile, badges, quest progress gone; `/rotfile` says no Rotfile |
| 17 | B (non-manager) runs `/rascal-config` | Not available/rejected |
| 18 | Manager runs `/rascal-config humor-level:2 announcements:true`; then `humor-level:4` | Valid saved; 4 rejected by Discord |
| 19 | Redeploy/restart the worker in Railway, then `/rotfile` | Data persists (PostgreSQL) |
| 20 | Neon SQL editor: `select name, checksum, applied_at from schema_migrations order by name;` (the runner in `src/database/postgres.ts` creates exactly these columns: `name`, `checksum`, `applied_at`) | Two rows: `001_initial.sql` and `002_unique_verified_roblox_account.sql`, each with a recent `applied_at`. `checksum` is the SHA-256 hex of the migration file as deployed; it must equal `git show origin/main:migrations/<name> \| sha256sum` for that file (LF line endings, as built in Docker). After a redeploy the row is unchanged (no re-apply) |
| 21 | Railway logs for the whole test | No token, OAuth code, Roblox token, or database URL; no raw stack traces returned to users |
| 22 | Repository and screenshots | No secrets in Git, logs, screenshots, or client bundles |
| 23 | Rate limits: A runs `/preview-roblox` four times within a minute; someone spams any command more than 10 times in 20 s | Extra attempts get "Slow down, Rascal. Try again in Ns." and nothing else breaks |
| 24 | Error hygiene: with Roblox unreachable or a bad username, run `/preview-roblox` | Friendly message ("Roblox is not answering right now…" or spelling hint); never a raw error, status code, or stack trace |
| 25 | Two Discord accounts verify the same Roblox account in one server (test accounts only) | Verified linking is a transfer: the second account becomes the verified holder and the first loses its Rotfile, badges and quests. Previews never appear in `/yapping-order` |

## Multi-day observation (Tests 14c)

Production progress is earned only by real use on real UTC days. **Never** edit production dates, insert or update `quest_completions`/`user_badges` rows, change the server clock, or otherwise alter progression directly. Neon is read-only for this test.

Use one dedicated verified test user (A) and log each UTC day (day boundary is 00:00 UTC):

| UTC date | `/rotfile` (self) | `/dripcheck` (self) | `/fraudcheck` | `/quests` shows | Completions total | Badges shown |
| --- | --- | --- | --- | --- | --- | --- |
| Day 1 | | | | | 3 | |
| Day 2 | | | | | 6 | |
| Day 3 | | | | | 9 | |
| Day 4 | | | | | 10+ → Quest Crusader | |
| Day 5 | | | | | | Drip Monarch (fifth distinct self-`/dripcheck` day) |

Days do not have to be consecutive, but each counts once. Missing a day only delays the badge; it never subtracts progress. Read-only Neon check at any time (counts only, no personal data needed): `select quest_id, count(*) from quest_completions where guild_id = '<lab guild id>' group by 1;`

## Evidence gaps (be explicit in the release report)

- The badge/quest unit tests run on the SQLite adapter. The PostgreSQL integration test currently covers the profile lifecycle only (migrate, save, privacy, unlink, health), not badge or quest queries. PostgreSQL parity for the badge logic is therefore proven only by the multi-day production observation until the suite is parameterised to run on PostgreSQL when `TEST_DATABASE_URL` is set (recommended follow-up, using a disposable Neon branch or CI database).
- The unlink cascade is proven in unit tests (SQLite) and by Test 16 in production (PostgreSQL foreign-key cascade).

## Read-only checks Claude can run

- `GET /health`, `/`, `/privacy`, `/terms`, and `/oauth/roblox/callback` (no params → 400 failure page).
- Discord REST: guild commands = 11, global commands = 0 (uses the local token; prints no secrets).
- Log review if you paste redacted excerpts.

## Result log

| # | Result | Evidence / notes |
| --- | --- | --- |
| 1–13, 14a, 14b, 15–25 | | |
| 14c (multi-day) | PENDING | Started: ____ · Observed Drip Monarch: ____ · Observed Quest Crusader: ____ |
