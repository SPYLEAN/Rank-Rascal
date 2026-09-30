# Community inbox: setup and status

The `/community` page has two forms: a **Founding QA review** and a **Founders Guild application**. Both post to `apps/web/app/api/community/route.ts`.

## Status (2026-09-29)

| Piece | State |
|---|---|
| Form UI, validation, confirmation screens | Built and browser-tested (desktop and phone) |
| Unique IDs (`QA-YYYYMMDD-XXXXXXXX`, `GUILD-…`) | Built. Salted SHA-256 of email + message + date + a server secret, so a double-submit can't mint two IDs |
| Badge and certificate (SVG) | Built. Generated per reviewer; shown and downloadable on the confirmation screen, and attached to the thank-you email |
| Owner notification email + personal thank-you email | Built against the Resend API, **not tested with real credentials** |
| Optional Discord moderator copy | Built (webhook), not tested with a real webhook |
| Durable storage / database | **None.** Email is the record. There is no roster database |

Do not describe email delivery as working until someone has sent a real submission through production with real credentials and received both emails.

## Behaviour without credentials

- **Development** (`next dev`): submissions are appended to `apps/web/data/community-inbox.local.jsonl` (gitignored by the root `data/` rule). The confirmation screen says "Preview mode" and that no email was sent. This file contains the test emails you type; delete it whenever you like.
- **Production**: the API returns `503 inbox_offline`, stores nothing, and the form tells the visitor the inbox isn't connected yet and points to Discord.

## Environment variables (server-side only; never prefix with `NEXT_PUBLIC_`)

| Name | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for sending both emails |
| `COMMUNITY_OWNER_EMAIL` | Yes | Where new reviews and applications are delivered (falls back to `NEXT_PUBLIC_SUPPORT_EMAIL`) |
| `COMMUNITY_FROM_EMAIL` | Recommended | Sender, e.g. `Rascal Realms <community@rankrascal.lol>`. The domain must be verified in Resend |
| `COMMUNITY_ID_SALT` | Yes | Long random secret for submission IDs (falls back to `COMMUNITY_RATE_SALT`). Changing it changes future IDs |
| `COMMUNITY_RATE_SALT` | Recommended | Random secret used to hash rate-limit fingerprints |
| `COMMUNITY_INBOX_WEBHOOK_URL` | Optional | Private moderator-only Discord channel webhook; receives name, ID and message (not the email address) |
| `NEXT_PUBLIC_COMMUNITY_URL` | Optional | Public Discord invite shown on the page |

Generate secrets with `openssl rand -hex 32`.

## Resend free plan capacity

As of 2026-09-29 (figures supplied by the owner; confirm on Resend's pricing page before relying on them), Resend's free plan allows **3,000 emails per month** and **100 emails per day**, at no cost.

Every accepted submission sends **two emails**: one to the owner and one thank-you to the sender. On the free plan that supports roughly:

| Limit | Emails | Submissions |
|---|---|---|
| Per day | 100 | about **50** |
| Per month | 3,000 | about **1,500** |

If the daily limit is reached, Resend rejects further sends, the API returns `502 delivery_failed`, and the form asks the visitor to try again later. Nothing is stored in that case. The optional Discord webhook copy does not count toward Resend limits. No paid plan is configured.

## Owner steps to go live (manual; not done by the agent)

1. Create a Resend account and verify `rankrascal.lol` (SPF/DKIM DNS records). This changes DNS, so it's the owner's step.
2. Add the variables above to the web host's environment (e.g. Vercel project settings → Environment Variables, Production).
3. Redeploy, then submit one review and one Guild application with your own address. Confirm that the owner email arrives with the reply-to set to the sender, the thank-you email arrives, and the badge and certificate attachments open.
4. Only then describe the inbox as live anywhere on the site.

## Abuse protection in place

- Hidden honeypot field (bots get a fake success).
- Minimum fill time of 2.5 s and a 2-hour expiry on the form.
- Per-IP rate limit: 3 accepted submissions per 15 minutes. This is in memory per server instance, so it's best-effort on serverless. A shared store (e.g. Upstash Redis) would make it strict.
- Length limits on every field, HTTPS-only portfolio links, at most 3 links in a message.
- All user text is HTML-escaped in emails; the Discord copy disables mentions.
- 13+ consent checkbox required.

## Copy rules

Reviews put people in the **Founding QA candidate pool**. Candidates may be invited when testing opens, in small groups, based on build readiness, devices, age requirements and safety capacity. Never promise an invite, a job, payment, access or a date.
