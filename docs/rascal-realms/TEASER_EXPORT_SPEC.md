# Crownfall Teaser — Export Spec

How the web derivatives of the Crownfall teaser are made, and why. The only way to regenerate them is `scripts/encode-teaser.sh`; its comments and this document must agree.

Status: **CONCEPT** footage — pre-production cinematic art. The site labels it "not in-game footage" wherever it plays.

## Source (never shipped)

| Property | Value |
|---|---|
| File | `Rascal_Realms_Crownfall_Teaser_Master.mp4` |
| Preserved copy | `all assets graphic/video/` in this repo (gitignored — never committed, never under `apps/web/public/`) |
| Original upload | `C:\Users\tanvi\Downloads\Rascal_Realms_Crownfall_Teaser_Master.mp4` |
| SHA-256 | `7b0007a93f9cbbf319ac3d7e983acd7e7383deebc593eedbfff21e76fb664a37` (both copies match) |
| Size | 29.1 MB (29,120,036 bytes) |
| Duration | 30.5 s |
| Video | H.264 High, 1920×1080, 16:9 container, 30 fps, yuv420p bt709, ~7.4 Mb/s |
| Active picture | **1920×964 at y=58** — letterboxed scenes (≈1.99:1); the 24–30 s title card uses the full height |
| Audio | AAC-LC stereo, 48 kHz, 261 kb/s; continuous score/SFX, mean −16 dB, peaks at 0 dBFS |

## Tooling

ffmpeg 7.1 (gyan.dev essentials build) bundled with the already-installed `imageio-ffmpeg` Python package. No npm dependency was added. Any ffmpeg ≥ 6 with libx264, libvpx-vp9, libopus and libwebp reproduces the files:

```bash
FFMPEG=/path/to/ffmpeg SRC="all assets graphic/video/Rascal_Realms_Crownfall_Teaser_Master.mp4" bash scripts/encode-teaser.sh
```

Every video uses **two-pass ABR**. The footage is extremely dense (particles, water, foliage): single-pass CRF produced a 7.9 MB hero and would have put the 30 s teaser far past budget.

## Derivatives (`apps/web/public/media/`)

| File | Content | Dimensions | Codec / rate | Size | Budget |
|---|---|---|---|---|---|
| `rascal-realms-crownfall-hero.webm` | 6.7 s hero loop, no audio | 1920×964 | VP9, 4.3 Mb/s | 3.65 MB | < 5 MB |
| `rascal-realms-crownfall-hero.mp4` | same | 1920×964 | H.264 High, 5.2 Mb/s, faststart | 4.33 MB | < 5 MB |
| `rascal-realms-crownfall-hero-mobile.webm` | same, centre 9:16 crop | 542×964 | VP9, 1.8 Mb/s | 1.53 MB | < 2.5 MB |
| `rascal-realms-crownfall-hero-mobile.mp4` | same | 542×964 | H.264 High, 2.2 Mb/s, faststart | 1.81 MB | < 2.5 MB |
| `rascal-realms-crownfall-teaser.webm` | full 30.5 s, with audio | 1920×1080 | VP9 3.6 Mb/s + Opus 128 kb/s | 14.39 MB | < 15 MB |
| `rascal-realms-crownfall-teaser.mp4` | same | 1920×1080 | H.264 High 4.7 Mb/s + AAC 160 kb/s, faststart | 18.51 MB | < 20 MB |
| `rascal-realms-crownfall-poster.webp` | hero loop frame 0 | 1920×964 | WebP q82 | 369 KB | — |
| `rascal-realms-crownfall-poster-mobile.webp` | mobile hero loop frame 0 | 542×964 | WebP q82 | 103 KB | — |
| `rascal-realms-crownfall-teaser-poster.webp` | title card at 29.0 s | 1920×1080 | WebP q80 | 298 KB | — |

## Hero loop edit

Built to be a seamless 6.7 s loop of the warm, readable part of the teaser, not a trim of its opening:

1. Crop to the 1920×964 active picture (removes the baked-in letterbox so `object-cover` never shows black bars).
2. **A = 3.1–8.3 s** — Stickerwood vista push-in, cutting to the old-kingdom palace. Starts at 3.1 s, after the 2.2–2.9 s brightening ramp.
3. **B = 20.1–22.9 s** — the open-sky vista. Ends before the 23.0 s fade to black.
4. A → B joined with a 0.5 s dissolve (7.5 s).
5. Loop closure: the first 0.8 s is dissolved onto the tail, so the final frame equals the first frame one frame later. Measured seam SSIM 0.795, inside the vista shot's normal frame-to-frame range (0.77–0.80): the loop point is indistinguishable from ordinary motion.
6. Grade: −4% brightness, −4% saturation, so white cloud frames do not overpower the headline. All other contrast control is CSS (`.hero-scrim`).

Excluded on purpose: the forest-path shot (8.3–11.2 s), whose signpost sits at ~30% of the frame, under the desktop title; and both corruption/dark sequences, which the website reserves for its King Wrongway chapter.

## Mobile crop

Portrait viewports (`max-aspect-ratio: 4/5`, shared by the CSS scrim, the poster `<source>` and the JS source picker) receive a dedicated **542×964 centre crop**, encoded at native resolution (no upscale). Every hero-loop shot keeps its subject at 47–55% of the frame width, so one fixed centre crop holds the subject in all of them. Landscape viewports, including landscape tablets, get the 1920×964 file with `object-position: center`.

## Delivery rules (implemented in `HeroVideo.tsx` / `TeaserPlayer.tsx`)

- **Exactly one file is ever requested per player.** JavaScript picks WebM only when `canPlayType('video/webm; codecs="vp9"') === "probably"`, otherwise MP4, and sets a single `src`. There are no `<source>` lists that could fetch both.
- **Hero:** `preload="none"`. The WebP poster is the LCP element (`fetchpriority="high"`). The video gets its `src` only when it is actually going to play, starts on the Crownfall intro's completion signal (so frame 0 matches the frame the intro just revealed), and fades in on its first `playing` event. There is no blank flash and no layout shift: poster and video are both absolutely positioned in a fixed-height section.
- **Hero is never loaded** under `prefers-reduced-motion: reduce`, Save-Data (`navigator.connection.saveData`), or `prefers-reduced-data: reduce`. The visitor can still opt in with the Play button.
- **Hero pauses** when the tab is hidden, when the hero leaves the viewport (IntersectionObserver), and while the full teaser is open. It resumes afterwards unless the visitor paused it.
- **Full teaser:** nothing, not even its poster, downloads until "Watch the full teaser" is first pressed. The 30 s master is never fetched by the hero, and the hero loop is never re-fetched by the player.
- **Audio** exists only in the full teaser and starts only after the visitor presses "Watch the full teaser". If the browser refuses unmuted playback, it continues muted with the sound button visible.

## Open items

- **Dialogue / captions:** the audio track has not been checked by ear. If the teaser contains spoken words, add a WebVTT caption track to the `<video>` in `TeaserPlayer.tsx` before launch. The in-player "Scene notes" list is a text description of the visuals, not a substitute for captions of speech.
- **Clipping:** the master peaks at 0 dBFS. The web encodes apply a limiter, but the master itself should be fixed at the source for future exports.
