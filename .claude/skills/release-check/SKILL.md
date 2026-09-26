---
name: release-check
description: Walk the Rank Rascal launch-gate checklist (closed beta and install gate) and report which items are proven, unproven or blocked. Read-only; never deploys.
---

# Release check

Report each item as **proven** (with evidence), **unproven**, or **blocked** (with the owner action needed). Never mark an item proven without a command result, URL response, or screenshot you actually obtained. Never print secret values.

**Code and CI**
- CI green from a clean checkout (unit, asset/type, bot build, web build, PostgreSQL integration, Docker build).
- `npm test`, `npm run check`, `npm run build` pass locally.

**Worker and data** (needs the owner's hosting access)
- One always-on worker behind HTTPS at `api.rankrascal.lol`.
- `GET /health` returns `{"ok":true,"database":"postgres"}`; `REQUIRE_POSTGRES=true`.
- Migration `001_initial.sql` applied; data survives a worker restart; backups enabled and restore documented.
- Exact Roblox redirect URI `https://api.rankrascal.lol/oauth/roblox/callback` configured.
- Discord Interactions Endpoint URL blank.

**Private-guild acceptance** (Rank Rascal Lab, guild-scoped commands only)
- All 11 commands work; OAuth success, cancel, expiry and replay rejection.
- Verified versus preview; Witness Protection; badge awards and idempotency; one quest per type per UTC day; unlink cascade; `/rascal-config` permission check.
- Logs contain no tokens, OAuth codes, or database URLs.

**Website**
- Truthful `/status`, `/support`, `/privacy`, `/terms`; command directory matches the bot; sitemap/robots on `rankrascal.lol`.
- Support mailbox exists and is monitored before it is shown.
- `NEXT_PUBLIC_INVITE_ENABLED` still `false` until every item above is proven.

**Operations**
- Rollback procedure (redeploy previous worker image), incident contact, deletion and report process.

End with the blockers and the exact manual steps for the owner.
