#!/usr/bin/env bash
# Rebuilds every web derivative of the Crownfall teaser from the untouched master.
# Spec, time ranges and rationale: docs/rascal-realms/TEASER_EXPORT_SPEC.md
#
# Usage:
#   FFMPEG=/path/to/ffmpeg SRC=/path/to/Rascal_Realms_Crownfall_Teaser_Master.mp4 \
#     bash scripts/encode-teaser.sh [hero] [mobile] [posters] [teaser]    # default: all
#
# Any ffmpeg >= 6 with libx264, libvpx-vp9, libopus and libwebp works (the imageio-ffmpeg
# bundled 7.1 build produced the committed files). No npm dependency is involved.
# Two-pass ABR is used everywhere: this footage is extremely detailed (particles, water,
# foliage), so CRF encodes overshoot the size budgets unpredictably.
set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
SRC="${SRC:?Set SRC to the master teaser file (kept outside apps/web/public)}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/apps/web/public/media"
PASSLOG="$(mktemp -d)/pass"
TARGETS="${*:-hero mobile posters teaser}"
mkdir -p "$OUT"

run() { "$FFMPEG" -hide_banner -loglevel error -y "$@"; }
want() { [[ " $TARGETS " == *" $1 "* ]]; }

# $1 = filter graph ("" for none), $2 = video kbps, $3 = output, $4.. = extra output args
x264_2pass() {
  local graph="$1" rate="$2" out="$3"; shift 3
  local map=(-map 0:v); [[ -n "$graph" ]] && map=(-filter_complex "$graph" -map "[v]")
  run -i "$SRC" "${map[@]}" -an -c:v libx264 -preset slow -profile:v high -b:v "${rate}k" -maxrate "$((rate * 3 / 2))k" -bufsize "$((rate * 2))k" -g 60 -pass 1 -passlogfile "$PASSLOG" -f null -
  run -i "$SRC" "${map[@]}" -c:v libx264 -preset slow -profile:v high -b:v "${rate}k" -maxrate "$((rate * 3 / 2))k" -bufsize "$((rate * 2))k" -g 60 -pass 2 -passlogfile "$PASSLOG" -movflags +faststart "$@" "$out"
}
vp9_2pass() {
  local graph="$1" rate="$2" out="$3"; shift 3
  local map=(-map 0:v); [[ -n "$graph" ]] && map=(-filter_complex "$graph" -map "[v]")
  run -i "$SRC" "${map[@]}" -an -c:v libvpx-vp9 -b:v "${rate}k" -maxrate "$((rate * 3 / 2))k" -row-mt 1 -g 60 -deadline good -cpu-used 4 -pass 1 -passlogfile "$PASSLOG" -f null -
  run -i "$SRC" "${map[@]}" -c:v libvpx-vp9 -b:v "${rate}k" -maxrate "$((rate * 3 / 2))k" -row-mt 1 -g 60 -deadline good -cpu-used 2 -pass 2 -passlogfile "$PASSLOG" "$@" "$out"
}

# Hero atmosphere loop, 6.7 s, no audio.
#   A = 3.1–8.3 s   (Stickerwood vista push-in -> corrupted palace)
#   B = 20.1–22.9 s (open-sky vista)
#   A->B joined with a 0.5 s dissolve; then the first 0.8 s is dissolved onto the tail so the
#   last frame equals the first frame and the loop has no visible seam.
#   Light grade (-4% brightness, -4% saturation) keeps white cloud frames from overpowering
#   the headline; the remaining contrast control is done with CSS scrims.
#   The master carries a baked-in letterbox: scenes occupy 1920x964 at y=58 (cropdetect).
#   The hero crops to that active picture first so object-cover never shows black bars.
HERO_GRAPH="[0:v]crop=1920:964:0:58,fps=30,format=yuv420p,split=2[s1][s2];\
[s1]trim=start=3.1:end=8.3,setpts=PTS-STARTPTS,fps=30[a];\
[s2]trim=start=20.1:end=22.9,setpts=PTS-STARTPTS,fps=30[b];\
[a][b]xfade=transition=fade:duration=0.5:offset=4.7,fps=30[ab];\
[ab]split=2[x][y];\
[x]trim=start=0.8,setpts=PTS-STARTPTS,fps=30[body];\
[y]trim=end=0.8,setpts=PTS-STARTPTS,fps=30[head];\
[body][head]xfade=transition=fade:duration=0.8:offset=5.9,eq=brightness=-0.04:saturation=0.96"

# Desktop: the full 1920x964 active picture (1.99:1), no upscale; CSS object-cover trims sides.
DESKTOP="$HERO_GRAPH,format=yuv420p[v]"
# Mobile: native-resolution centre 9:16 crop (542x964). Every hero shot's focal point sits at
# 47-55% of frame width, so a fixed centre crop keeps the subject in every shot.
MOBILE="$HERO_GRAPH,crop=542:964:(iw-542)/2:0,format=yuv420p[v]"

if want hero; then
  echo "hero desktop mp4";  x264_2pass "$DESKTOP" 5200 "$OUT/rascal-realms-crownfall-hero.mp4" -an
  echo "hero desktop webm"; vp9_2pass  "$DESKTOP" 4300 "$OUT/rascal-realms-crownfall-hero.webm" -an
fi
if want mobile; then
  echo "hero mobile mp4";   x264_2pass "$MOBILE" 2200 "$OUT/rascal-realms-crownfall-hero-mobile.mp4" -an
  echo "hero mobile webm";  vp9_2pass  "$MOBILE" 1800 "$OUT/rascal-realms-crownfall-hero-mobile.webm" -an
fi

# Posters are frame 0 of the exact same graph, so the poster -> video handoff has no jump.
if want posters; then
  echo "posters"
  run -i "$SRC" -filter_complex "$DESKTOP" -map "[v]" -frames:v 1 -c:v libwebp -quality 82 "$OUT/rascal-realms-crownfall-poster.webp"
  run -i "$SRC" -filter_complex "$MOBILE"  -map "[v]" -frames:v 1 -c:v libwebp -quality 82 "$OUT/rascal-realms-crownfall-poster-mobile.webp"
  # Full-teaser player poster: the official title card at 29.0 s (subtitle fully revealed).
  run -ss 29.0 -i "$SRC" -frames:v 1 -vf "scale=1920:1080:flags=lanczos" -c:v libwebp -quality 80 "$OUT/rascal-realms-crownfall-teaser-poster.webp"
fi

# Full teaser, 30.5 s, 1080p, with audio. Kept uncropped: the letterbox disappears against the
# theater's black surround, and the title card (24-30 s) uses the full frame height.
# The master peaks at 0 dBFS, so a limiter holds peaks at about -1 dB.
if want teaser; then
  AUDIO="alimiter=limit=0.89:level=disabled"
  echo "teaser webm"; vp9_2pass  "" 3600 "$OUT/rascal-realms-crownfall-teaser.webm" -map 0:a -af "$AUDIO" -c:a libopus -b:a 128k
  echo "teaser mp4";  x264_2pass "" 4700 "$OUT/rascal-realms-crownfall-teaser.mp4"  -map 0:a -af "$AUDIO" -c:a aac -b:a 160k
fi

rm -rf "$(dirname "$PASSLOG")"
ls -la "$OUT"
