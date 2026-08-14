# Rank Rascal Badge Pack v1

Three original, text-free achievement badges for the Rank Rascal website and Discord embeds. Every asset uses genuine transparency and remains legible at small sizes.

## Badge definitions

| Badge | Meaning | Proposed automatic award rule | Alt text |
| --- | --- | --- | --- |
| Quest Crusader | A player who keeps showing up and finishes quests | Complete 10 verified Rank Rascal quests | Purple quest shield with a map, compass star and crooked lime crown |
| Drip Monarch | Consistent, opt-in avatar-style participation | Complete 5 self Drip Checks on 5 different days with a verified Roblox identity | Crowned purple gem droplet in a royal shield with pink sparkles |
| Veteran Noob | A proudly experienced account with beginner energy | Verified Roblox account is at least 3 years old | Weathered purple shield with a sprouting block, gold laurels and pink bandage |

These rules are product definitions, not proof that the current bot awards the badges. They must be implemented and tested in the bot before launch.

## Files

- `quest-crusader.png`, `drip-monarch.png`, `veteran-noob.png`: 1254 px transparent production artwork for the website, cards and high-resolution Discord embeds.
- `discord/*-256.png`: 256 px transparent exports for compact Discord messages and uploads.

## Usage

- Keep the badge name as live HTML or Discord embed text; do not bake words into the icon.
- Use 72–96 px on website badge cards and at least 32 px anywhere else.
- Use the 256 px export as the Discord embed thumbnail or attach it and reference `attachment://filename.png`.
- Do not imply a badge is an official Roblox achievement.
- Award badges idempotently: one row per user and badge, with the first award timestamp retained.

