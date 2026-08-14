# Rank Rascal

> Your Roblox stats have officially rotted.

Rank Rascal is a Roblox-first Discord social game for users aged 13+. It transforms verified public Roblox identity data into Rotfiles, Drip Checks, Fraud Checks, privacy-aware leaderboards, and deliberately ridiculous server lore.

## Current application

- Secure Roblox OAuth linking with PKCE
- One-time, expiring verification states
- No stored Roblox OAuth tokens or passwords
- Verified Rotfiles with avatar, badge, and account milestones
- Deterministic, non-insulting Drip Inspections
- Badge-based Fraud Checks and the Yapping Order
- Witness Protection privacy controls
- Server-manager humor and announcement settings
- Scheduled public-profile refreshes
- Health, privacy, terms, success, and error web pages
- SQLite persistence, Docker, and local deployment support

## Commands

| Command | Purpose |
| --- | --- |
| `/link-roblox` | Verify Roblox ownership through OAuth |
| `/preview-roblox` | Test an explicitly unverified public profile |
| `/rotfile` | Display a privacy-aware Roblox identity card |
| `/dripcheck` | Inspect an avatar with safe chaotic humor |
| `/fraudcheck` | Compare two public badge counts |
| `/yapping-order` | View server rankings |
| `/witness-protection` | Opt in or out of public discovery |
| `/unlink-roblox` | Delete the server-specific link |
| `/rascal-config` | Configure server behavior |

## Quick start

Requirements: Node.js 22.5+ or Docker, a Discord application, and a Roblox OAuth application.

```bash
cp .env.example .env
npm install
npm run preflight
npm run register
npm start
```

See [SETUP.md](SETUP.md) for the portal, OAuth, testing, and deployment process. Read [SECURITY.md](SECURITY.md) before exposing the service publicly.

## Platform boundary

Roblox contains independent experiences, so universal experience-level wins, currencies, levels, and inventories do not exist through one common API. Rank Rascal currently supports platform identity, avatars, and public badges. Deeper achievements require cooperation from each experience developer or a future Rank Rascal SDK.

Rank Rascal is not endorsed by Roblox or Discord. Roblox is a trademark of Roblox Corporation.
