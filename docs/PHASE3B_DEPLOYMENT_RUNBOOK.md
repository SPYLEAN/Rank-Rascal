# Phase 3B Runbook — Neon + Railway + api.rankrascal.lol

Deploys the existing Gateway worker (root `Dockerfile`) as **one** always-on Railway service backed by managed Neon PostgreSQL. The website stays on Vercel. Nothing here changes application behaviour.

**Steps marked 🛑 YOU need the owner** (secrets, spending, DNS, or a provider dashboard). Everything else can be done or checked from the repository.

## Ground rules

- Never paste secret values into chat, docs, commits, screenshots, or logs. Enter them only in the provider's own secret/variable screens.
- Keep `DISCORD_GUILD_ID` set (Rank Rascal Lab). Do **not** register global commands.
- Keep Discord's **Interactions Endpoint URL blank**.
- Keep `NEXT_PUBLIC_INVITE_ENABLED=false` on Vercel. "Add to Discord" stays Coming Soon.
- One worker instance only (`railway.json` sets `numReplicas: 1`).
- Only one process may hold the bot token at a time. **Stop any local `npm start` / `npm run dev` before the Railway worker starts**, or two workers will answer every command.

## 0. Repository prerequisites

1. Merge the Phase 3A PR, then the Phase 3B PR (this runbook, `railway.json`, and the `REQUIRE_POSTGRES` guard), so `main` contains them. Railway deploys from `main`.
2. Confirm CI is green on both PRs (this includes the PostgreSQL integration job and the Docker build).

What the repository already guarantees for this deploy:

- `Dockerfile` builds the worker only (`npm ci --workspaces=false`, no website code), runs as the non-root `node` user, and starts `node dist/src/index.js`.
- `railway.json` selects the Dockerfile, health-checks `GET /health`, restarts on failure (max 10), and pins one replica.
- With `REQUIRE_POSTGRES=true` the worker **refuses to start** without `DATABASE_URL` instead of silently using SQLite on the container's disposable disk.
- Migrations run automatically at startup (advisory-lock protected, checksummed). `/health` returns 503 if the database is unreachable.

## 1. 🛑 Neon PostgreSQL

Approve any spending first: compare Neon's current free and paid plans, especially backup/restore-history length and compute hours. The worker's periodic health checks and 6-hourly refresh keep compute active, so free-tier compute hours and a short restore window may not suit a public launch.

1. Create a Neon project, e.g. `rank-rascal-prod`, PostgreSQL 17 (or the current default), in a region close to the Railway region you will choose.
2. Create/keep a dedicated database and role for the app. Do not use the project owner role's password anywhere else.
3. Copy the **direct** connection string (host **without** `-pooler`), with `sslmode=require`. Store it in your password manager.

   > Use the direct string for this single worker. Neon's `-pooler` endpoint runs PgBouncer in transaction mode, which does not support the session-level advisory lock the migration runner takes.

4. Note the backup/restore options available on your plan (point-in-time restore window, branching). Decide before launch whether you also want scheduled `pg_dump` exports.

**Stop here until you have the connection string.** Never send it to Claude.

## 2. 🛑 Railway service

Approve spending first: an always-on service needs a paid Railway plan or remaining trial credit. Check Railway's current pricing and set a usage limit if the dashboard offers one.

1. Sign in to Railway (or run `railway login` in your own terminal).
2. **New Project → Deploy from GitHub repo → `SPYLEAN/Rank-Rascal`**, branch `main`.
3. Leave the service **root directory as the repository root** (not `apps/web`). Railway will pick up `railway.json` and the Dockerfile.
4. **Before the first deploy completes**, open the service's **Variables** tab and add:

   | Variable | Value |
   | --- | --- |
   | `DISCORD_TOKEN` | Bot token from the Discord Developer Portal |
   | `DISCORD_CLIENT_ID` | Application ID |
   | `DISCORD_GUILD_ID` | Rank Rascal Lab guild ID |
   | `DATABASE_URL` | Neon **direct** connection string |
   | `DATABASE_SSL` | `true` |
   | `DATABASE_POOL_MAX` | `10` |
   | `REQUIRE_POSTGRES` | `true` |
   | `PUBLIC_BASE_URL` | `https://api.rankrascal.lol` |
   | `PORT` | `3000` |
   | `ROBLOX_OAUTH_CLIENT_ID` | From the Roblox Creator Dashboard |
   | `ROBLOX_OAUTH_CLIENT_SECRET` | From the Roblox Creator Dashboard |
   | `APP_SECRET` | New random value: run `openssl rand -hex 32` locally and paste it straight into Railway |
   | `ADMIN_DISCORD_IDS` | Comma-separated Discord user IDs of admins |

   Do **not** set `DATABASE_PATH`. Use a fresh `APP_SECRET` for production rather than reusing the local one.
5. Deploy. In **Deployments → View logs**, expect: `Rank Rascal database ready (postgres).`, `Rank Rascal web service listening on :3000`, and `Rank Rascal is yapping as ...`. The logs must not contain the token, OAuth codes, or the database URL. If they do, stop and tell Claude which line (without the value).
6. Confirm the deployment reports healthy against `/health`.

## 3. 🛑 Temporary Railway URL check

In the service's **Settings → Networking**, generate a Railway domain (target port 3000). Then:

```bash
curl -i https://<generated-domain>/health
```

Expected: `200` and `{"ok":true,"database":"postgres"}`. Optionally remove the generated domain afterwards.

In the Neon SQL editor, confirm the migration ran:

```sql
select name, checksum, applied_at from schema_migrations order by name;   -- expect one row: 001_initial.sql
select table_name from information_schema.tables where table_schema = 'public' order by 1;
-- expect: guild_settings, oauth_states, profiles, quest_completions, schema_migrations, user_badges
```

## 4. 🛑 DNS for `api.rankrascal.lol`

1. Railway → service → **Settings → Networking → Custom Domain** → `api.rankrascal.lol`, target port `3000`.
2. Railway shows a **CNAME target** (and possibly a TXT verification record). Copy exactly what Railway displays.
3. At the DNS provider for `rankrascal.lol` (GoDaddy per the handoff) add:

   | Type | Name/Host | Value | TTL |
   | --- | --- | --- | --- |
   | CNAME | `api` | the target Railway shows | default |
   | TXT (only if Railway asks) | as shown by Railway | as shown by Railway | default |

   Do **not** change the apex (`@`) or `www` records; those belong to Vercel.
4. Wait for Railway to show the domain as verified and the certificate as issued.

Check from any terminal:

```bash
nslookup api.rankrascal.lol
curl -i https://api.rankrascal.lol/health
```

Expected: `200`, `{"ok":true,"database":"postgres"}`, valid HTTPS certificate.

## 5. 🛑 Roblox redirect URI

Roblox Creator Dashboard → your OAuth app → Redirect URIs: add exactly

```
https://api.rankrascal.lol/oauth/roblox/callback
```

(You may keep the `http://localhost:3000/...` entry for local development.) Scopes stay `openid profile`. Because `PUBLIC_BASE_URL` was set in step 2, no redeploy is needed. If you changed it afterwards, redeploy.

## 6. Post-deploy checks (no user data needed)

- `https://api.rankrascal.lol/privacy` and `/terms` render; `/` renders.
- `https://api.rankrascal.lol/oauth/roblox/callback` with no parameters shows the "Verification failed" page (400), proving the route is live.
- Railway → **Redeploy**, then `/health` again: still `postgres`.
- Discord Developer Portal → General Information: Interactions Endpoint URL is **blank**.
- Vercel: `NEXT_PUBLIC_INVITE_ENABLED` is `false`.

Data persistence across restarts and the full OAuth/command acceptance test happen in Phase 3C.

## Rollback

- **Bad worker release**: Railway → Deployments → redeploy the previous successful deployment (or revert the merge on `main`). Do not roll back the database; migrations are additive and there is no down-migration.
- **Before any future migration**: create a Neon branch or `pg_dump` as a restore point.
- **Emergency stop**: Railway → service → remove/pause the deployment. The website is unaffected.
- **Suspected credential exposure**: rotate the Discord token, Roblox client secret, `APP_SECRET`, and the Neon role password in their dashboards, update Railway variables, and redeploy.

## Stop conditions

Stop and report (do not improvise) if: `/health` is not `postgres`, logs show any secret, the certificate does not issue, two workers are answering commands, spending exceeds what was approved, or any step would require registering global commands or changing the Interactions Endpoint.
