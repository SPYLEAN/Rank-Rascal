# AGENTS.md — Rank Rascal

Cross-tool rules for every human and AI contributor. `CLAUDE.md` adds Claude-specific workflow on top of this file.

## Product

Rank Rascal is a Roblox-first Discord social game for users aged 13+. It turns verified public identity data into Rotfiles, Drip Checks, Fraud Checks, the Yapping Order, badges, quests, and safe server lore.

North-star test: *would this make a teen gaming server more fun without pressuring, humiliating, manipulating, or exposing anyone?* If unclear, revise before shipping.

## Architecture (do not change without an approved plan)

| Surface | Where | Notes |
| --- | --- | --- |
| Website | `apps/web` (Next.js 14 App Router) | Vercel, root directory `apps/web`, `rankrascal.lol` |
| Gateway worker | root `src/` (Node + TypeScript, discord.js 14) | Always-on Docker host, one instance |
| Worker HTTP | `src/web.ts` | `/health`, `/oauth/roblox/callback`, `/privacy`, `/terms`; served at `api.rankrascal.lol` |
| Database | PostgreSQL via `DATABASE_URL` in production | SQLite (`node:sqlite`) only for local dev and tests |
| Migrations | `migrations/*.sql` | Additive and checksum-protected; never edit an applied file |

Invariants:

1. Never run the Gateway worker inside Vercel or any serverless function.
2. Production sets `DATABASE_URL` and `REQUIRE_POSTGRES=true`. Never store production data on a container or Vercel filesystem.
3. Discord's Interactions Endpoint URL stays **blank**. Commands arrive over the Gateway.
4. `apps/web/app/api/discord/interactions/route.ts` is an inactive stub. Do not register it until Ed25519 verification and tests exist.
5. Linked Roles stays disabled (`NEXT_PUBLIC_LINKED_ROLES_ENABLED=false`).
6. The exact Roblox callback is `https://api.rankrascal.lol/oauth/roblox/callback`.
7. Only the `Guilds` gateway intent. No privileged intents without a reviewed feature.
8. Run a single worker instance until scheduling and idempotency are designed for more.
9. "Add to Discord" stays **Coming Soon**. Installation is gated by `NEXT_PUBLIC_INVITE_ENABLED` and opens only after the launch gate in `docs/VERCEL_DEPLOYMENT.md`.

## Security rules

- Roblox OAuth is Authorization Code + PKCE. State is one-time, stored hashed, and expires in ten minutes.
- Never store or log Roblox access or ID tokens, passwords, OAuth codes, Discord tokens, database URLs, or any secret value.
- Never put secrets in `NEXT_PUBLIC_*` variables or client code. Never commit `.env`.
- Use parameterized SQL and transactions. Additive migrations only. Back up before production migrations.
- Roll back the worker image, not the database, unless a reviewed down-migration exists.
- Do not send raw internal error text to Discord users (log it, show a generic message).
- Do not add dependencies without a reason; run `npm audit --omit=dev` when touching them.

## Safety and content rules

- Keep Witness Protection, unlinking/deletion, and the verified-versus-preview labels intact. Unverified previews never earn progress. Awards are idempotent.
- Rascal Rep is entertainment, never an official Roblox or game skill rank.
- Humor formula: verified fact + absurd interpretation + optional action. Never joke about bodies, protected traits, mental health, poverty, family, self-harm, sexual behaviour, violence, personal information, addiction, unhealthy playtime, or a person's worth.
- No romance, therapy, or dependency framing for minors. No gambling, loot boxes, paid randomness, pay-to-win Rep, spending-based status, or streak-shame mechanics.
- Privacy, deletion, safety, reporting, and unlinking are never paid features.
- Fortnite and VALORANT stay Coming Soon/research until a compliant integration is live. Do not imply endorsement by Roblox, Discord, Epic, or Riot.
- Do not show a support email as active until the mailbox is monitored.
- Status pages must never claim a service is operational without a real health check.

## Brand and UI

- Read `brand/Rank_Rascal_Brand_Book.pdf`, `apps/web/lib/brand-assets.ts`, and `docs/BRAND_ASSET_USAGE.md` before UI edits.
- Palette: Purple `#7A4DFF`, Lime `#B7FF36`, Pink `#FF4FA3`, Yellow `#FFD83D`, Error `#FF4255`, Midnight `#121526`, Panel `#191D35`, White `#F8F8FF`, Lavender `#AEB4DC`. Lime is a reward signal, not a page background.
- Fredoka for expressive headings, Inter for functional UI, Space Mono for numbers and rarity.
- Reference art only through `apps/web/lib/brand-assets.ts`. Do not regenerate Razz, badges, emojis, or art without approval.
- Never publish contact sheets, prompt files, READMEs, raw generations, or animation frames (other than the static fallback) under `apps/web/public/brand/`. `npm run verify-assets` enforces this.
- Accessibility: semantic HTML, keyboard use, visible focus, meaningful alt text (empty for decorative), reduced motion, contrast, no horizontal overflow at 320/375/768/1024/1440 px.
- Every joke label used for a decision needs a plain-language explanation.

## Command reference

There are 11 slash commands: `/link-roblox`, `/preview-roblox`, `/rotfile`, `/dripcheck`, `/fraudcheck`, `/yapping-order`, `/badges`, `/quests`, `/witness-protection`, `/unlink-roblox`, `/rascal-config`. The source of truth is `src/commands.ts`; the website directory (`apps/web/app/commands/page.tsx`) must match its option names (`player`, `opponent`, `public`, `humor-level`).

## Commands to run

```bash
npm ci                # clean install
npm run preflight     # env sanity check (prints names only, never values)
npm test              # unit tests (SQLite); PostgreSQL test needs TEST_DATABASE_URL
npm run check         # asset verification + type checks (bot and web)
npm run build         # bot (tsc) + website (next build)
git diff --check
```

The PostgreSQL integration test must only ever point at a disposable database, never production.

## Workflow

- Never develop directly on `main`. Use a branch and open a PR; a human reviews and merges.
- Audit before editing. Keep diffs focused; do not refactor working feature code unless a test exposes a real bug.
- Do not deploy, change DNS, rotate credentials, register global Discord commands, or merge without explicit approval.
- Never claim a test, deployment, or verification succeeded unless it was actually run.
