# Rank Rascal setup

Local development uses SQLite. Production uses managed PostgreSQL (`DATABASE_URL`). See `docs/PRODUCTION_ARCHITECTURE.md` and `docs/BOT_PRODUCTION_DEPLOYMENT.md` for the production shape.

## Discord application

1. Create **Rank Rascal** in the Discord Developer Portal and add a bot.
2. Put its token and Application ID in `DISCORD_TOKEN` and `DISCORD_CLIENT_ID`.
3. Enable the `bot` and `applications.commands` installation scopes.
4. Grant View Channels, Send Messages, Embed Links, Attach Files, and Read Message History only (permissions integer `117760`).
5. Install it in a private test server and set `DISCORD_GUILD_ID` to that server ID.
6. Leave the **Interactions Endpoint URL** blank. Commands arrive over the Gateway WebSocket.

The app requires no privileged gateway intents.

## Roblox OAuth application

Create an OAuth 2.0 app in Roblox Creator Dashboard with scopes `openid profile`.

- Local redirect: `http://localhost:3000/oauth/roblox/callback`
- Production redirect: `https://api.rankrascal.lol/oauth/roblox/callback`

Set `ROBLOX_OAUTH_CLIENT_ID` and `ROBLOX_OAUTH_CLIENT_SECRET`. Rank Rascal reads the authenticated user ID and discards OAuth tokens after verification.

## Local launch (SQLite)

Requires Node.js 22.5 or newer.

```bash
cp .env.example .env
openssl rand -hex 32
npm ci
npm run preflight
npm run register
npm start
```

Paste the generated secret into `APP_SECRET`. Leave `DATABASE_URL` empty so the worker uses SQLite at `DATABASE_PATH`. Open `http://localhost:3000/health` and expect `{"ok":true,"database":"sqlite"}`.

## Local PostgreSQL rehearsal

```bash
docker compose -f compose.postgres.yaml up --build
```

To run the PostgreSQL integration test, point `TEST_DATABASE_URL` at a disposable database (never production) and set `DATABASE_SSL=false` for a local server:

```bash
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/rank_rascal_test npm test
```

## Validation

```bash
npm test
npm run check
npm run build
```

`npm run check` also verifies the brand asset manifest and rejects internal-only files in `apps/web/public/brand/`.

## Test checklist

1. Complete `/link-roblox`; `/rotfile` must show a verified identity.
2. Test `/dripcheck`, `/fraudcheck`, `/yapping-order`, `/badges` and `/quests` with two users.
3. Enable Witness Protection (`/witness-protection public:false`); confirm another user cannot inspect that profile.
4. Run `/unlink-roblox`; confirm the profile, badges and quests disappear.
5. Configure `/rascal-config` as a server manager.

## Deploy

Production runs one always-on worker from the root `Dockerfile` with `DATABASE_URL` set to managed PostgreSQL and `REQUIRE_POSTGRES=true`. Follow `docs/BOT_PRODUCTION_DEPLOYMENT.md`. The website deploys separately to Vercel from `apps/web` (`docs/VERCEL_DEPLOYMENT.md`).

Keep `DISCORD_GUILD_ID` set while testing in the private guild. Register global commands only after the closed beta is approved. Before public release, add a monitored support and deletion contact, rate limits, monitoring and backups, and complete teen-safety abuse testing. Run a single worker instance until distributed scheduling has been designed.
