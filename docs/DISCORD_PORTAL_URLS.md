# Discord & Roblox Developer Portal Settings

This document outlines portal URL configurations for Discord Developer Portal and Roblox Creator Dashboard.

## Roblox Creator Dashboard Settings

- **OAuth 2.0 Redirect URIs**:
  - Local Testing: `http://localhost:3000/oauth/roblox/callback`
  - Production Worker: `https://api.rankrascal.lol/oauth/roblox/callback`
- **Required Scopes**: `openid profile`

## Discord Developer Portal Settings

- **Interactions Endpoint URL**:
  - **Current Setting**: Leave **BLANK** (Unconfigured). The bot receives all interactions via the active WebSocket Gateway worker.
  - **Future Webhook Setting**: `https://rankrascal.lol/api/discord/interactions`
  - *Note*: Do NOT set this endpoint URL in the portal until Ed25519 request signature verification (`X-Signature-Ed25519` and `X-Signature-Timestamp`) is implemented and tested.

- **Linked Roles Metadata URL**:
  - `https://rankrascal.lol/api/discord/linked-roles/metadata`
  - *Note*: Keep feature flag `NEXT_PUBLIC_LINKED_ROLES_ENABLED=false` until OAuth token storage and metadata registration are configured.
