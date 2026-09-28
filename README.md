# Rank Rascal

> **Project direction update:** the Discord bot is paused. `rankrascal.lol` is being rebuilt as the official pre-launch home for **Rascal Realms: Crownfall**, the upcoming Roblox game. Bot code and migrations remain preserved for rollback and archival purposes, but bot installation is closed and no longer promoted by the website.

> Your Roblox stats have officially rotted.

Rank Rascal is a Roblox-first Discord social game for users aged 13+. It transforms verified public Roblox identity data into Rotfiles, Drip Checks, Fraud Checks, privacy-aware leaderboards, collectible badges, daily quests, and deliberately ridiculous server lore.

**Status:** private testing. The website is live at [rankrascal.lol](https://rankrascal.lol); installation stays "Coming Soon" until the launch gate in `docs/VERCEL_DEPLOYMENT.md` passes.

## Current application

- Secure Roblox OAuth linking with PKCE
- One-time, expiring verification states
- No stored Roblox OAuth tokens or passwords
- Verified Rotfiles with avatar, badge, and account milestones
- Deterministic, non-insulting Drip Inspections
- Badge-based Fraud Checks and the Yapping Order
- Three canonical badges and three daily quests
- Witness Protection privacy controls
- Server-manager humor and announcement settings
- Scheduled public-profile refreshes
- Health, privacy, terms, success, and error web pages on the worker
- PostgreSQL in production, SQLite for local development and tests, Docker deployment

## Commands

| Command | Purpose |
| --- | --- |
| `/link-roblox` | Verify Roblox ownership through OAuth |
| `/preview-roblox` | Test an explicitly unverified public profile |
| `/rotfile` | Display a privacy-aware Roblox identity card |
| `/dripcheck` | Inspect an avatar with safe chaotic humor |
| `/fraudcheck` | Compare two public badge counts |
| `/yapping-order` | View server rankings |
| `/badges` | Open a player's three-badge shelf |
| `/quests` | See today's verified quests and badge progress |
| `/witness-protection` | Opt in or out of public discovery |
| `/unlink-roblox` | Delete the server-specific link |
| `/rascal-config` | Configure server behavior |

## Repository layout

| Path | Purpose |
| --- | --- |
| `apps/web` | Next.js website, deployed to Vercel (root directory `apps/web`) |
| `src` | Discord Gateway worker (Node.js/TypeScript), OAuth callback, health endpoint |
| `migrations` | Additive, checksum-protected PostgreSQL migrations |
| `brand` | Canonical brand source assets and the brand book |
| `docs` | Architecture, deployment and portal documentation |

The Gateway worker must run on an always-on host, never in a Vercel function. See `docs/PRODUCTION_ARCHITECTURE.md`.

## Quick start

Requirements: Node.js 22.5+ (Docker image uses Node 24), a Discord application, and a Roblox OAuth application.

```bash
cp .env.example .env
npm ci
npm run preflight
npm run register
npm start
```

Validate with `npm test`, `npm run check` and `npm run build`. See [SETUP.md](SETUP.md) for the portal, OAuth, testing, and deployment process, [SECURITY.md](SECURITY.md) before exposing the service publicly, and [AGENTS.md](AGENTS.md) for contributor and AI-agent rules.

## Platform boundary

Roblox contains independent experiences, so universal experience-level wins, currencies, levels, and inventories do not exist through one common API. Rank Rascal currently supports platform identity, avatars, and public badges. Deeper achievements require cooperation from each experience developer or a future Rank Rascal SDK. Fortnite and VALORANT are Coming Soon research only.

Rank Rascal is not endorsed by Roblox or Discord. Roblox is a trademark of Roblox Corporation.
