# Rank Rascal Production Brand Asset Usage Inventory

Complete catalog of production assets used across the Rank Rascal web application (`apps/web`).

| Filename | Dimensions | Transparency | Intended Route | Component / Usage | Alternative Text | Status | Verified Locally |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `logo-lockup.png` | 500x120 | Transparent | All Routes | `Navbar.tsx`, `Footer.tsx` | `Rank Rascal Logo` | Meaningful | Yes |
| `app-icon.png` | 512x512 | Transparent | All Routes | `Navbar.tsx`, `RazzMascot.tsx` | `Rank Rascal App Icon` | Meaningful | Yes |
| `mascot.png` | 1024x1024 | Transparent | All Routes | `RazzMascot.tsx` | `Razz the Rank Rascal mascot` | Meaningful | Yes |
| `razz-hero-point.png` | 1024x1024 | Transparent | `/` (Homepage) | `RazzMascot.tsx` | `Razz pointing forward enthusiastically` | Meaningful | Yes |
| `razz-badge-present.png` | 1024x1024 | Transparent | `/rewards`, `/verify` | `RazzMascot.tsx`, `/verify` success state | `Razz presenting shiny gaming badges` | Meaningful | Yes |
| `razz-detective.png` | 1024x1024 | Transparent | `/safety`, `/commands`, `/support` | `RazzMascot.tsx` | `Razz investigating suspicious server stats` | Meaningful | Yes |
| `razz-celebrate.png` | 1024x1024 | Transparent | `/invite`, Homepage CTA | `RazzMascot.tsx` | `Razz celebrating victory with confetti` | Meaningful | Yes |
| `razz-loading.gif` | 512x512 | Transparent | All Routes (Page Transitions) | `PageLoadingOverlay.tsx` | `Razz loading animation` | Meaningful | Yes |
| `razz-loading.webp` | 512x512 | Transparent | All Loading / `/linked-roles` | `RazzMascot.tsx`, `LoadingRazz.tsx` | `Razz spinning around happily loading data` | Meaningful | Yes |
| `quest-crusader.png` | 1024x1024 | Transparent | `/rewards` | `BadgeShelf.tsx` | `Quest Crusader Badge` | Meaningful | Yes |
| `drip-monarch.png` | 1024x1024 | Transparent | `/rewards` | `BadgeShelf.tsx` | `Drip Monarch Badge` | Meaningful | Yes |
| `veteran-noob.png` | 1024x1024 | Transparent | `/rewards` | `BadgeShelf.tsx` | `Veteran Noob Badge` | Meaningful | Yes |
| `quest-crusader-256.png` | 256x256 | Transparent | `/rewards` / Discord | `BadgeShelf.tsx` | `Quest Crusader Badge Icon` | Meaningful | Yes |
| `drip-monarch-256.png` | 256x256 | Transparent | `/rewards` / Discord | `BadgeShelf.tsx` | `Drip Monarch Badge Icon` | Meaningful | Yes |
| `veteran-noob-256.png` | 256x256 | Transparent | `/rewards` / Discord | `BadgeShelf.tsx` | `Veteran Noob Badge Icon` | Meaningful | Yes |
| `badge-pack-preview.png` | 1024x1024 | Transparent | `/rewards` | `BadgeShelf.tsx` | `Rank Rascal Badge Pack Preview` | Meaningful | Yes |
| `rascal-hype.png` | 256x256 | Transparent | All Routes | `FloatingSticker.tsx`, Hero, Rails | `""` (Decorative) | Decorative | Yes |
| `rascal-win.png` | 256x256 | Transparent | All Routes | `BadgeCard.tsx`, Rotfile, Rails | `""` (Decorative) | Decorative | Yes |
| `rascal-sus.png` | 256x256 | Transparent | All Routes | `LeaderboardPreview.tsx`, Rails | `""` (Decorative) | Decorative | Yes |
| `rascal-lol.png` | 256x256 | Transparent | All Routes | `CommandCard.tsx`, Rails | `""` (Decorative) | Decorative | Yes |
| `rascal-cooked.png` | 256x256 | Transparent | All Routes | Error states, Rails | `""` (Decorative) | Decorative | Yes |
| `rascal-loading.png` | 256x256 | Transparent | All Routes | Loading indicators, Rails | `""` (Decorative) | Decorative | Yes |
| `razz-why-different.png` | 1536x1024 | Transparent | Not placed yet (reserved for the homepage "why different" section) | — | `Razz connects verified profiles, badges, rivalries, rankings and privacy controls.` | Meaningful | Yes |
| `razz-reward-machine.png` | 1536x1024 | Transparent | `/rewards`, Homepage | `app/rewards/page.tsx`, `app/page.tsx` (inline) | `Razz turns a machine that produces collectible badges and quest tickets.` | Meaningful | Yes |
| `razz-privacy-guardian.png` | 1024x1536 | Transparent | `/verify`, Homepage | `app/verify/page.tsx`, `app/page.tsx` (inline) | `Razz protects a verified profile with a privacy shield and key.` | Meaningful | Yes |
| `razz-rulebook.png` | 1086x1448 | Transparent | `/safety`, `/terms` | `app/safety/page.tsx`, `app/terms/page.tsx` (inline) | `Razz carefully reads a giant rulebook.` | Meaningful | Yes |
| `razz-tactical-coming-soon-banner.png` | 1672x941 | Opaque (16:9) | `/games`, Homepage | `GameRoadmapPanel.tsx` | `Razz leads an original neon tactical squad through a training arena.` | Meaningful | Yes |
| `razz-battle-royale-coming-soon-banner.png` | 1672x941 | Opaque (16:9) | `/games`, Homepage | `GameRoadmapPanel.tsx` | `Razz glides toward a colorful floating-island competition.` | Meaningful | Yes |
| `razz-community-clubhouse-banner.png` | 1672x941 | Opaque (16:9) | `/` (Homepage CTA) | `ClosingCTA.tsx` | `Razz hosts a joyful digital clubhouse filled with profiles, badges and reactions.` | Meaningful | Yes |

## Publishing rules

- Only files listed above may ship in `apps/web/public/brand/`.
- Contact sheets, `PROMPTS.md`, `README.md`, and individual loading frames (other than `razz-load-01.png`, the static fallback) stay in the source `brand/` folder and are never published.
- `npm run verify-assets` fails the build if an internal-only file appears under `public/brand/` or if a manifest path has the wrong casing.
- Component names above were audited against the code on 2026-09-26; update this table when an asset moves.
