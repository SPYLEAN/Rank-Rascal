# Vercel Deployment Guide — Rank Rascal Website

This guide details how to deploy `apps/web` to Vercel while preserving the Discord Gateway bot as a separate worker.

## CRITICAL ARCHITECTURE RULE

> [!IMPORTANT]
> - **Vercel Root Directory**: Set **Root Directory** in Vercel to `apps/web`.
> - **Gateway Bot Isolation**: Do **NOT** attempt to run the Discord Gateway bot (`src/index.ts`) inside Vercel Serverless Functions. Discord Gateway connections require long-lived, continuous WebSocket processes. Vercel hosts the Next.js website and legal pages only.

## Vercel Project Configuration

1. Create a new Project in Vercel.
2. Select your git repository.
3. In Project Settings, set:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

## Environment Variables

Configure the following environment variables in Vercel Dashboard:

| Variable | Recommended Value | Required | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://rankrascal.com` | Yes | Canonical site origin |
| `NEXT_PUBLIC_DISCORD_INSTALL_URL` | `https://discord.com/oauth2/authorize?...` | Yes | Discord bot installation link |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | `support@rankrascal.com` | Yes | Public support contact |
| `NEXT_PUBLIC_LINKED_ROLES_ENABLED` | `false` | Yes | Keep false until Role Connections OAuth is ready |
| `DATABASE_URL` | `postgresql://...` | Optional | Shared production PostgreSQL connection string |

## Verification After Deployment

1. Visit `https://YOUR_DOMAIN/` and confirm hero mascot and preview components load cleanly.
2. Check `https://YOUR_DOMAIN/privacy` and `https://YOUR_DOMAIN/terms` to verify legal copy and support email rendering.
3. Confirm no console warnings regarding `NEXT_PUBLIC_SUPPORT_EMAIL`.
