# Rank Rascal Bot Production Deployment

## Production shape

- `https://rankrascal.lol` remains the Vercel website.
- `https://api.rankrascal.lol` points to the always-on Docker worker.
- The worker holds the Discord Gateway connection, Roblox OAuth callback, refresh job, and PostgreSQL connection.
- The Vercel filesystem and the worker filesystem are not used for production user data.

## Required worker variables

```dotenv
DISCORD_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_GUILD_ID=
DATABASE_URL=postgresql://...
DATABASE_SSL=true
DATABASE_POOL_MAX=10
REQUIRE_POSTGRES=true
PUBLIC_BASE_URL=https://api.rankrascal.lol
PORT=3000
ROBLOX_OAUTH_CLIENT_ID=
ROBLOX_OAUTH_CLIENT_SECRET=
APP_SECRET=
ADMIN_DISCORD_IDS=
```

Keep `DISCORD_GUILD_ID` while production-testing in Rank Rascal Lab. Remove it and rerun command registration only when global launch is approved.

## Deployment order

1. Provision managed PostgreSQL with automated backups.
2. Add the worker variables as host secrets. Never commit them.
3. Run `npm run migrate` once as a release command, or allow startup to apply migrations automatically.
4. Deploy the root `Dockerfile` as one always-on instance.
5. Point `api.rankrascal.lol` at the worker host and wait for HTTPS.
6. Verify `https://api.rankrascal.lol/health` returns `{"ok":true,"database":"postgres"}`.
7. Add this exact Roblox redirect URI:

   `https://api.rankrascal.lol/oauth/roblox/callback`

8. Set the worker `PUBLIC_BASE_URL=https://api.rankrascal.lol` and redeploy it.
9. Register the 11 commands in the private guild and test the full OAuth, badge, quest, privacy, and deletion flow.
10. Keep Discord's Interactions Endpoint URL blank; this bot uses Gateway WebSockets.

## Local PostgreSQL rehearsal

```bash
docker compose -f compose.postgres.yaml up --build
```

The local compose file uses a development-only password and disables database TLS only inside the private Docker network. Production must use the managed provider's TLS connection string.

## Rollback and data safety

- Database migrations are additive and checksum-protected.
- Back up PostgreSQL before each production migration.
- Roll back the worker image, not the database, unless a reviewed down-migration exists.
- `/unlink-roblox` intentionally deletes that server-specific profile and cascades its badges and quests.
- Never log OAuth codes, Discord tokens, Roblox tokens, or database URLs.
