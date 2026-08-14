# Security model

- Roblox ownership uses OAuth Authorization Code with PKCE and one-time ten-minute states.
- OAuth tokens are never persisted; Roblox passwords are never requested.
- Secrets load only from environment variables.
- Witness Protection controls public discovery; unlinking deletes the server-specific profile.
- Web responses use CSP, frame protection, MIME protection, and no-referrer headers.
- The bot requests no privileged Discord gateway intents.

Production requires HTTPS, secret rotation, restricted backups/logs, reverse-proxy rate limiting, deletion procedures, and no logging of OAuth codes or tokens.
