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
| 10 | A runs `/fraudcheck opponent:B` | Compares badge counts only; no skill/worth claims |
| 11 | `/yapping-order` | Lists public profiles only; labelled as Rascal Rep, not a Roblox rank |
| 12 | `/badges` | Renders the three canonical badge images; self view ephemeral |
| 13 | `/quests` | Ephemeral; each quest type counts once per UTC day, however many times it is run |
| 14 | Veteran Noob (account ≥ 1,095 days), Drip Monarch (5 distinct UTC days), Quest Crusader (10 unique completions) | Each awarded once; re-running does not duplicate |
| 15 | A runs `/witness-protection public:false`; B runs `/rotfile player:A`, `/badges player:A`, `/fraudcheck opponent:A`, `/yapping-order` | B is refused for A; A absent from ranking; A still sees own data |
| 16 | A runs `/unlink-roblox` | Profile, badges, quest progress gone; `/rotfile` says no Rotfile |
| 17 | B (non-manager) runs `/rascal-config` | Not available/rejected |
| 18 | Manager runs `/rascal-config humor-level:2 announcements:true`; then `humor-level:4` | Valid saved; 4 rejected by Discord |
| 19 | Redeploy/restart the worker in Railway, then `/rotfile` | Data persists (PostgreSQL) |
| 20 | Neon: `select name from schema_migrations;` | `001_initial.sql` |
| 21 | Railway logs for the whole test | No token, OAuth code, Roblox token, or database URL; no raw stack traces returned to users |
| 22 | Repository and screenshots | No secrets in Git, logs, screenshots, or client bundles |

## Read-only checks Claude can run

- `GET /health`, `/`, `/privacy`, `/terms`, and `/oauth/roblox/callback` (no params → 400 failure page).
- Discord REST: guild commands = 11, global commands = 0 (uses the local token; prints no secrets).
- Log review if you paste redacted excerpts.

## Result log

| # | Result | Evidence / notes |
| --- | --- | --- |
| 1–22 | | |
