# Crownfall Teaser — Storyboard

Shot list for `Rascal_Realms_Crownfall_Teaser_Master.mp4` (30.5 s). Cut points come from ffmpeg scene detection (score > 0.25), brightness from per-frame `signalstats` luma (0–255), not from eyeballing. Status: **CONCEPT** — pre-production cinematic art, not in-game footage; nothing here depicts a playable build.

The in-player "Scene notes" list (`apps/web/components/TeaserPlayer.tsx`, `SCENES`) is this table in plain language. Keep the two in sync.

| Time | Shot | Luma | Focal point (x of frame) | Web use |
|---|---|---|---|---|
| 0.0–2.2 | Darkness; the Chaos Crown fractures, purple light spilling out | 16 → 67 | centre | Full teaser only |
| 2.2–5.6 | Stickerwood at golden hour: windmill village, floating islands, waterfalls; slow push-in | 111 → 138 (brightens 2.2–2.9) | central island, ~50% | **Hero loop** (from 3.1) |
| 5.6–8.3 | Old-kingdom palace, crystal door glowing, purple crystals breaking through stone | ~102 | crystal door, ~52% | **Hero loop** |
| 8.3–11.2 | Forest path with a signpost pointing the way | 77 → 89 | signpost, ~30% | Full teaser only — the signpost would sit under the desktop title column |
| 11.2–13.9 | Crown corruption shatters the vista into drifting shards | 108 → 96 | centre | Full teaser only |
| 13.9–15.8 | Razz and Stickerwood's creatures peer out of the undergrowth (two shots, cut at 14.97) | ~97 | Razz, centre-right | Full teaser only |
| 15.8–16.6 | Dark transition | ~45 | — | Full teaser only |
| 16.6–20.0 | A corrupted citadel looms in the dark | ~60 | centre | Full teaser only |
| 20.0–22.9 | Open sky over the floating realm | ~135 | distant castle, ~47% | **Hero loop** (20.1–22.9) |
| 23.0–23.9 | Fade/cut to black | 86 → 16 | — | — |
| 23.9–30.0 | Title card: RASCAL REALMS / CROWNFALL, then "COMING SOON · ONLY ON ROBLOX" (subtitle fully revealed by 28.6) | 20 → 59 | centre | **Teaser player poster** (29.0) |
| 30.0–30.5 | Black | 27 | — | — |

## Strongest frames

- **Opening:** 3.2 s — the golden-hour Stickerwood vista. Warm, readable, unmistakably the realm, and its focal island is centred, leaving the lower-left free for the title. The teaser's literal first frames (0–2 s) are near-black and unusable as a hero.
- **Ending:** 29.0 s — the finished title card. It carries its own baked logo text, so it is used only as the full-teaser player poster, never behind the site's own title (two titles would compete).

## Format notes

- The master is letterboxed: scenes occupy **1920×964 at y=58** (≈1.99:1). The title card uses the full 1080 height. Hero derivatives crop to the active picture; the full teaser keeps the letterbox (invisible against the theater's black surround).
- **Flashing:** no hazard. The two large brightness jumps are single hard cuts — 20.0 s (dark → bright, +109) and 23.3 s (bright → black, −117) — more than three seconds apart. WCAG 2.3.1's threshold is three flashes within one second. The 2.2–2.9 s brightening is a single one-directional ramp. The hero loop contains neither cut.
- **Looping:** the teaser itself does not loop naturally (black open, title-card close). The hero loop is a purpose-built edit whose first and last frames are identical (see `TEASER_EXPORT_SPEC.md`).
- **Mobile cropping:** every hero-loop shot keeps its subject at 47–55% of frame width, so one fixed centre 9:16 crop works for all of them. The forest-path shot (focal point at ~30%) is the reason it is excluded from the hero.
- **Audio:** continuous score/sound design, mean −16 dB, peaks at 0 dBFS (clipping). Whether there is spoken dialogue has **not been verified by ear**. If there is, a caption track is required before launch (see `TEASER_EXPORT_SPEC.md` → Open items).
