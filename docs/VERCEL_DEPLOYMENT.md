# Vercel Deployment Guide — Rank Rascal Website

This guide details how to deploy `apps/web` to Vercel while preserving the Discord Gateway bot as a separate worker.

## CRITICAL ARCHITECTURE RULE

> [!IMPORTANT]
> - **Vercel Root Directory**: Set **Root Directory** in Vercel to `apps/web`.
> - **Gateway Bot Isolation**: Do **NOT** attempt to run the Discord Gateway bot (`src/index.ts`) inside Vercel Serverless Functions. Discord Gateway connections require long-lived, continuous WebSocket processes. Vercel hosts the Next.js website and legal pages only.
> - **No production data on Vercel**: the website does not read or write the production database today. User data lives in PostgreSQL behind the worker.

## Vercel Project Configuration

1. Create a new Project in Vercel.
2. Select your git repository.
3. In Project Settings, set:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

## Environment Variables

Configure the following environment variables in the Vercel Dashboard. Everything prefixed `NEXT_PUBLIC_` is visible to every visitor, so never put secrets there. See `apps/web/.env.example`.

| Variable | Recommended Value | Required | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://rankrascal.lol` | Yes | Canonical site origin (sitemap, robots, Open Graph) |
| `NEXT_PUBLIC_INVITE_ENABLED` | `false` | Yes | Installation gate. Keep `false` until the launch gate passes |
| `NEXT_PUBLIC_DISCORD_INSTALL_URL` | blank until launch | No | Discord install link; only used when the gate is `true`. Use permissions `117760` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | blank until the mailbox works | No | Public support contact. When blank the site shows "Mailbox opening soon" |
| `NEXT_PUBLIC_LINKED_ROLES_ENABLED` | `false` | Yes | Keep false until Role Connections OAuth is ready |

## Launch gate for installation

Set `NEXT_PUBLIC_INVITE_ENABLED=true` (and the install URL) only after all of these pass:

1. The worker is live behind HTTPS on `api.rankrascal.lol` and `/health` reports PostgreSQL.
2. The exact Roblox callback works end to end.
3. All 11 commands pass the private-guild acceptance test.
4. Privacy, Terms, Support and deletion paths reflect real behaviour and the support mailbox is monitored.

Until then every "Add to Discord" button reads **Coming Soon** and routes to `/invite`, which never redirects to Discord.

## Verification After Deployment

1. Visit `https://rankrascal.lol/` and confirm the hero mascot and preview components load cleanly.
2. Check `/privacy`, `/terms` and `/support`. With no support email configured they must show "not available yet" / "Mailbox opening soon" and no `mailto:` link.
3. Check `/status`: it must say it is a static preview and must not claim any service is operational.
4. Confirm `/invite` and `/api/invite` do not redirect to `discord.com` while the gate is `false`.
5. Confirm `https://rankrascal.lol/sitemap.xml` and `/robots.txt` use `rankrascal.lol`.
