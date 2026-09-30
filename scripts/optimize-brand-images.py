"""
Write a WebP copy next to every PNG/JPG registered in apps/web/lib/brand-assets.ts, then point the
registry at the WebP. The site serves images as-is (next.config: images.unoptimized), so this is
what keeps pages light: most of this art was 2-3 MB of PNG each.

- Transparency is kept (WebP supports alpha).
- Widths are capped by use: badges, insignias and emojis 512 px (shown small), Razz poses 768 px,
  everything else 1920 px. Nothing is upscaled.
- The PNG/JPG originals stay in place: favicons, Open Graph/Twitter cards and anything outside the
  registry may still use them. Touch and PWA icons (KEEP_PNG) are never converted.
- A WebP is only used when it is actually smaller than the original.

Run from the repository root:  python scripts/optimize-brand-images.py
Requires Pillow. Safe to re-run.
"""

import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "apps" / "web" / "public"
REGISTRY = ROOT / "apps" / "web" / "lib" / "brand-assets.ts"

CAPS = [("/brand/badges/", 512), ("/brand/insignias/", 512), ("/brand/emojis/", 512), ("/brand/poses/", 768)]
DEFAULT_CAP = 1920
KEEP_PNG = {"/brand/apple-touch-icon.png", "/brand/icon-192.png", "/brand/icon-512.png"}


def cap_for(path: str) -> int:
    for prefix, cap in CAPS:
        if path.startswith(prefix):
            return cap
    return DEFAULT_CAP


def convert(path: str) -> str | None:
    """Return the WebP path if one was written and it beats the original, else None."""
    source = PUBLIC / path.lstrip("/")
    if not source.exists():
        return None
    target_path = re.sub(r"\.(png|jpe?g)$", ".webp", path)
    target = PUBLIC / target_path.lstrip("/")
    image = Image.open(source)
    has_alpha = image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info)
    image = image.convert("RGBA" if has_alpha else "RGB")
    cap = cap_for(path)
    if image.width > cap:
        image = image.resize((cap, round(image.height * cap / image.width)), Image.LANCZOS)
    image.save(target, "WEBP", quality=86, alpha_quality=90, method=6)
    before, after = source.stat().st_size, target.stat().st_size
    if after >= before:
        target.unlink()
        print(f"keep   {path} ({before // 1024} KB; WebP was not smaller)")
        return None
    print(f"webp   {target_path} {image.width}x{image.height} {before // 1024} KB -> {after // 1024} KB")
    return target_path


def main() -> None:
    text = REGISTRY.read_text(encoding="utf-8")
    paths = sorted(set(re.findall(r'"(/[^"]+\.(?:png|jpe?g))"', text)) - KEEP_PNG)
    total_before = total_after = 0
    for path in paths:
        webp = convert(path)
        if webp:
            total_before += (PUBLIC / path.lstrip("/")).stat().st_size
            total_after += (PUBLIC / webp.lstrip("/")).stat().st_size
            text = text.replace(f'"{path}"', f'"{webp}"')
    REGISTRY.write_text(text, encoding="utf-8", newline="")
    print(f"registry: {total_before // 1024} KB of PNG/JPG now served as {total_after // 1024} KB of WebP")


if __name__ == "__main__":
    main()
