# Rank Rascal setup

## Discord application

1. Create **Rank Rascal** in the Discord Developer Portal and add a bot.
2. Put its token and Application ID in `DISCORD_TOKEN` and `DISCORD_CLIENT_ID`.
3. Enable the `bot` and `applications.commands` installation scopes.
4. Grant View Channels, Send Messages, Embed Links, and Read Message History only.
5. Install it in a private test server and set `DISCORD_GUILD_ID` to that server ID.

The app requires no privileged gateway intents.

## Roblox OAuth application

Create an OAuth 2.0 app in Roblox Creator Dashboard with scopes `openid profile`.

- Local redirect: `http://localhost:3000/oauth/roblox/callback`
- Production redirect: `https://YOUR-DOMAIN/oauth/roblox/callback`

Set `ROBLOX_OAUTH_CLIENT_ID` and `ROBLOX_OAUTH_CLIENT_SECRET`. Rank Rascal reads the authenticated user ID and discards OAuth tokens after verification.

## Local launch

```bash
cp .env.example .env
openssl rand -hex 32
npm install
npm run preflight
npm run register
npm start
```

Paste the generated secret into `APP_SECRET`. Open `http://localhost:3000/health` and expect `{"ok":true}`.

## Test checklist

1. Complete `/link-roblox`; `/rotfile` must show a verified identity.
2. Test `/dripcheck`, `/fraudcheck`, and `/yapping-order` with two users.
3. Enable Witness Protection; confirm another user cannot inspect that profile.
4. Run `/unlink-roblox`; confirm the profile disappears.
5. Configure `/rascal-config` as a server manager.

## Deploy

Use a Docker host with HTTPS, a stable domain, continuously running processes, secrets, and a persistent disk mounted at `/app/data`. Set `DATABASE_PATH=/app/data/rank-rascal.db` and update `PUBLIC_BASE_URL` plus the Roblox redirect URL to the exact HTTPS origin.

After testing, remove `DISCORD_GUILD_ID` and register global commands once. Before public release, replace placeholder legal text, add support and deletion contacts, complete required Discord verification, add monitoring/backups/rate limits, and perform teen-safety abuse testing. Move to PostgreSQL before running multiple instances.
