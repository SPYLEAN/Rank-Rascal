# Rank Rascal Bot Phase 2 — PostgreSQL Production Foundation

## Outcome

The Discord Gateway bot can now use PostgreSQL in production while retaining SQLite for local development and unit tests. Vercel remains responsible only for the Next.js website.

## What changed

- Added asynchronous database adapters under `src/database/`.
- Added PostgreSQL pooling, TLS support, parameterized queries, and atomic transactions.
- Added checksum-protected SQL migrations in `migrations/`.
- Preserved SQLite as the fallback when `DATABASE_URL` is not set.
- Converted commands, OAuth, badge evaluation, quests, and refresh jobs to await persistence.
- Added database-aware `/health` output and graceful SIGINT/SIGTERM shutdown.
- Fixed the Docker build to compile only the bot workspace and include migrations plus callback artwork.
- Added a local PostgreSQL Docker Compose rehearsal.
- Added PostgreSQL lifecycle integration coverage gated by `TEST_DATABASE_URL`.

## Production boundary

- Website: `https://rankrascal.lol` on Vercel.
- Worker and OAuth callback: `https://api.rankrascal.lol` on an always-on Docker host.
- User data: PostgreSQL through `DATABASE_URL`.
- Discord Interactions Endpoint URL: keep blank because the bot uses Gateway WebSockets.
- Roblox redirect URI: `https://api.rankrascal.lol/oauth/roblox/callback`.

## Validation completed

- TypeScript typecheck: passed.
- Bot production build: passed.
- Unit tests: 11 passed.
- PostgreSQL integration test: included; skipped until `TEST_DATABASE_URL` is supplied.
- Brand integrity: 38 assets and 3 canonical badges passed.
- Next.js production build: all 20 routes passed.
- `git diff --check`: passed.

## Deployment sequence

Follow `docs/BOT_PRODUCTION_DEPLOYMENT.md`. Provision PostgreSQL first, deploy the root Dockerfile as one instance, verify the database-aware health endpoint, configure `api.rankrascal.lol`, then update the exact Roblox callback and repeat the 11-command private-server test.
