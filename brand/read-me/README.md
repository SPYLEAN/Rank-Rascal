# Rank Rascal Graphic Asset Kit

## Logo and website identity

- `web/rank-rascal-logo-lockup.png` - transparent horizontal logo for dark UI
- `web/rank-rascal-logo-light-bg.png` - transparent horizontal logo for light UI
- `rank-rascal-app-icon-v1.png` - source app icon
- `web/favicon.ico` - multiresolution browser favicon
- `web/favicon-16.png`, `favicon-32.png`, `favicon-48.png` - browser PNGs
- `web/apple-touch-icon.png` - 180 px Apple touch icon
- `web/icon-192.png`, `icon-512.png` - PWA icons

## Mascot poses

- `poses/razz-hero-point.png` - hero and onboarding CTA
- `poses/razz-badge-present.png` - rewards and badge sections
- `poses/razz-detective.png` - Fraud Check, search and discovery
- `poses/razz-celebrate.png` - wins, success and quest completion

All pose files are full-resolution transparent PNGs.

## Emojis

Full-resolution sources are in `emojis/`. Discord-ready 128 px versions are in
`emojis/discord/` and are optimized well below typical upload-size limits.

- `rascal-hype` - excitement and announcements
- `rascal-cooked` - harmless exhaustion or failed attempt
- `rascal-sus` - skepticism and Fraud Check
- `rascal-win` - victories and rare rewards
- `rascal-lol` - laughter and fun reactions
- `rascal-loading` - waiting and processing

## Loading and transition animation

- `animation/razz-load-01.png` through `razz-load-06.png` - transparent source frames
- `animation/razz-loading.webp` - preferred website animation
- `animation/razz-loading.gif` - compatibility fallback
- `animation/razz-loading-contact-sheet.jpg` - expression sequence preview

The generated source frames have small linework variations. Use them as a quick
crossfade/tab-transition sequence rather than a rigid character-motion cycle.
Respect `prefers-reduced-motion`: show frame 01 or frame 06 without animation.

## Brand constraints

- Preserve the purple, toxic-lime and hot-pink palette.
- Do not crop or recolor the crown or loading-ring eye.
- Do not imply endorsement by Roblox, Discord, Fortnite or VALORANT.
- Keep humor teen-friendly and do not use the character for romantic,
  therapeutic, dangerous or humiliating interactions.
