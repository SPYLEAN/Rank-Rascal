# Rascal Realms Website Setup

The Next.js site in `apps/web` is the public pre-launch home for Rascal Realms: Crownfall. The legacy Discord worker remains separate and must not run inside Vercel.

## Community inbox

Feedback and Founders Guild forms submit to `POST /api/community`. The route validates content, uses a honeypot and minimum-fill-time check, rate-limits repeated submissions in memory, emails the private owner inbox and sends a branded receipt to the submitter. Reviewers also receive a personalized SVG badge and certificate and are registered with a stable QA ID.

Set these server-side Vercel environment variables:

- `RESEND_API_KEY`: transactional email API key with sending access. Server-side only.
- `COMMUNITY_OWNER_EMAIL`: private inbox that receives every accepted review and Guild application.
- `COMMUNITY_FROM_EMAIL`: verified sender, recommended `Rascal Realms <community@rankrascal.lol>`.
- `COMMUNITY_ID_SALT`: random secret used to create stable, non-guessable QA and Guild submission IDs.
- `COMMUNITY_INBOX_WEBHOOK_URL`: optional private Discord webhook for a moderator-only notification copy. Never expose it with `NEXT_PUBLIC_`.
- `COMMUNITY_RATE_SALT`: a random value used to hash transient rate-limit fingerprints.
- `NEXT_PUBLIC_SITE_URL`: `https://rankrascal.lol` in production.
- `NEXT_PUBLIC_COMMUNITY_URL`: optional public invite to the moderated community server.

Verify `rankrascal.lol` with the transactional email provider before enabling the production sender. Add the required DNS records at the domain provider, wait for verification, then keep the API key only in the deployment environment. The route deliberately does not publish comments automatically. The form asks permission to quote a submission; a human must review and manually publish anything selected for a future community wall.

## Bot pause boundary

The website no longer links to bot commands, verification, rewards or the dashboard from primary navigation. Those routes remain in the repository for rollback and historical policy coverage, and are excluded from the public sitemap. The `/invite` page now explains that bot installation is paused.

Stopping the live Gateway worker and preserving its database are separate deployment operations. Do not delete the database, OAuth application or secrets merely to stop compute. Record the stop date and retain a rollback image before changing the Railway service.

## Local verification

From the repository root:

```bash
npm run check
npm run build:web
```

The forms display an inbox-unavailable message until the Resend API key, owner email and ID salt are configured.
