# Rank Rascal Website Art Pack

Production illustrations derived from the approved Razz mascot reference.

## Assets

| File | Format | Intended placement |
|---|---|---|
| `razz-tactical-coming-soon-banner.png` | 1672×941, opaque | `/games` tactical hero-shooter coming-soon panel |
| `razz-battle-royale-coming-soon-banner.png` | 1672×941, opaque | `/games` battle-royale coming-soon panel |
| `razz-rulebook.png` | 1086×1448, transparent | `/terms`, `/privacy`, `/safety`, rules callouts |
| `razz-why-different.png` | 1536×1024, transparent | Homepage “Why Rank Rascal” section |
| `razz-privacy-guardian.png` | 1024×1536, transparent | `/verify`, `/privacy`, Witness Protection feature |
| `razz-reward-machine.png` | 1536×1024, transparent | `/rewards`, quests and badge sections |
| `razz-community-clubhouse-banner.png` | 1672×941, opaque | Homepage closing CTA or community section |

## Usage rules

- Add all headlines and game names as accessible HTML, not baked into the images.
- Describe the tactical and battle-royale banners as genre illustrations. Do not call the supporting figures official game characters.
- Keep “VALORANT — Coming Soon” and “Fortnite — Coming Soon” visibly separate from the art.
- Use `next/image` with explicit dimensions and responsive `sizes`.
- Preserve aspect ratio. Use `object-fit: cover` only on the three opaque banners.
- For transparent cutouts, use `object-fit: contain` and avoid cropping the crown.
- Respect reduced-motion settings when animating these assets.
- Do not add game logos, Discord branding, weapons, money, or humiliating copy.

## Suggested accessibility text

- Tactical banner: `Razz leads an original neon tactical squad through a training arena.`
- Battle-royale banner: `Razz glides toward a colorful floating-island competition.`
- Rulebook: `Razz carefully reads a giant rulebook.`
- Why different: `Razz connects verified profiles, badges, rivalries, rankings and privacy controls.`
- Privacy guardian: `Razz protects a verified profile with a privacy shield and key.`
- Reward machine: `Razz turns a machine that produces collectible badges and quest tickets.`
- Community banner: `Razz hosts a joyful digital clubhouse filled with profiles, badges and reactions.`

