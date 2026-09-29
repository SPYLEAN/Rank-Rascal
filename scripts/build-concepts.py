"""
Build web assets for the Rascal Labs concept archive, hero art, Starting Village and the atlas map.

Source: all assets graphic/concepts-2026-09-29/ (owner-supplied PNGs, preserved and gitignored,
never shipped). Output: apps/web/public/brand/... as WebP.

- Full files keep native resolution at quality 90, so hand-lettered sheet text stays sharp.
- Thumbnails (720 px wide, quality 82) are for cards and previews; a thumbnail is only written
  when the source is wider than 720 px.
- The nine-panel overview board ("stuff.png") is cut into one file per panel. World Lies and
  Beyond Stickerwood tiles are cut without their printed captions (the site supplies its own copy,
  and unapproved realm names stay off the site).

Run from the repository root:  python scripts/build-concepts.py
Requires Pillow.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "all assets graphic" / "concepts-2026-09-29"
PUBLIC = ROOT / "apps" / "web" / "public" / "brand"
THUMB_WIDTH = 720

# (source file, output path under public/brand, optional crop box in source pixels)
SHEETS = [
    # 01 Enemies & villains
    ("crown sprout.png", "concepts/enemies/crown-sprout", None),
    ("lost sticker.png", "concepts/enemies/lost-sticker", None),
    ("glitch slime.png", "concepts/enemies/glitch-slime", None),
    ("overgrown receipt.png", "concepts/enemies/overgrown-receipt", None),
    ("king wrongway.png", "concepts/king-wrongway/king-wrongway-sheet", None),
    # 02 Pets & creatures
    ("pet 1.png", "concepts/pets/royal-winged-cub", None),
    ("pet 2.png", "concepts/pets/royal-aqua-king-slime", None),
    ("pet 3.png", "concepts/pets/joyful-lava-imp", None),
    ("pet 4.png", "concepts/pets/mossy-crown-golem", None),
    ("pet 5.png", "concepts/pets/crowned-shadow-cat", None),
    # 03 Fishing & river life
    ("fish 1.png", "concepts/fishing/river-life", None),
    ("fish 2.png", "concepts/fishing/field-guide", None),
    ("fish 3.png", "concepts/fishing/gear", None),
    ("fish 4.png", "concepts/fishing/corrupted-lantern-fin", None),
    ("under water realms- items.png", "concepts/fishing/river-mysteries", None),
    # 04–12 from the overview board (1491×1055)
    ("stuff.png", "concepts/loot/loot-and-relics", (497, 12, 1092, 347)),
    ("stuff.png", "concepts/materials/gold-gems-materials", (1092, 12, 1485, 347)),
    ("stuff.png", "concepts/weapons/signature-weapons", (5, 352, 392, 652)),
    ("stuff.png", "concepts/weapons/unidentified-armaments", (388, 352, 607, 652)),
    ("stuff.png", "concepts/ecology/rascal-ecology", (607, 352, 988, 652)),
    ("stuff.png", "concepts/environments/stickerwood-environments", (985, 352, 1488, 652)),
    ("stuff.png", "concepts/mounts/creature-growth", (3, 657, 457, 1052)),
    ("stuff.png", "concepts/king-wrongway/king-wrongway-studies", (455, 657, 998, 1052)),
    ("stuff.png", "concepts/world-lies/world-lies-studies", (995, 652, 1488, 852)),
    ("stuff.png", "concepts/overview-board", None),
]

# World Lies tiles (panel origin 995,652) and realm glimpses (panel origin 995,850), no captions.
TILES = [
    ("stuff.png", "concepts/world-lies/lying-sign", (995 + 15, 652 + 60, 995 + 82, 652 + 157)),
    ("stuff.png", "concepts/world-lies/false-bridge", (995 + 90, 652 + 60, 995 + 195, 652 + 162)),
    ("stuff.png", "concepts/world-lies/suspicious-chest", (995 + 202, 652 + 60, 995 + 277, 652 + 160)),
    ("stuff.png", "concepts/world-lies/distorted-doorway", (995 + 285, 652 + 57, 995 + 377, 652 + 165)),
    ("stuff.png", "concepts/world-lies/repeating-forest", (995 + 385, 652 + 57, 995 + 477, 652 + 162)),
    ("stuff.png", "concepts/future-realms/realm-ii", (995 + 7, 850 + 42, 995 + 117, 850 + 142)),
    ("stuff.png", "concepts/future-realms/realm-iii", (995 + 117, 850 + 42, 995 + 235, 850 + 140)),
    ("stuff.png", "concepts/future-realms/realm-iv", (995 + 239, 850 + 35, 995 + 367, 850 + 148)),
    ("stuff.png", "concepts/future-realms/realm-v", (995 + 367, 850 + 20, 995 + 482, 850 + 137)),
]

# Cinematic (non-sheet) art used outside the archive.
ART = [
    ("hero 1.png", "heroes/crown-knight"),
    ("hero 2.png", "heroes/glitchcaster"),
    ("hero 3.png", "heroes/shadow-ranger"),
    ("hero 4.png", "heroes/trickster"),
    ("hero 5.png", "heroes/lorekeeper"),
    ("hero 6.png", "heroes/badge-scout"),
    ("starting village.png", "game/locations/starting-village-v1"),
    ("high ress map.png", "game/stickerwood-map-v2"),
]


def save(image: Image.Image, target: str, quality: int, thumb: bool) -> None:
    path = PUBLIC / f"{target}.webp"
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=quality, method=6)
    line = f"{target}.webp {image.width}x{image.height} {path.stat().st_size // 1024}KB"
    if thumb and image.width > THUMB_WIDTH:
        height = round(image.height * THUMB_WIDTH / image.width)
        small = image.resize((THUMB_WIDTH, height), Image.LANCZOS)
        small_path = PUBLIC / f"{target}-thumb.webp"
        small.save(small_path, "WEBP", quality=82, method=6)
        line += f" + thumb {THUMB_WIDTH}x{height} {small_path.stat().st_size // 1024}KB"
    print(line)


def main() -> None:
    cache: dict[str, Image.Image] = {}

    def load(name: str) -> Image.Image:
        if name not in cache:
            cache[name] = Image.open(SRC / name).convert("RGB")
        return cache[name]

    for name, target, box in SHEETS:
        image = load(name)
        save(image.crop(box) if box else image, target, 90, thumb=True)
    for name, target, box in TILES:
        save(load(name).crop(box), target, 90, thumb=False)
    for name, target in ART:
        save(load(name), target, 86, thumb=False)


if __name__ == "__main__":
    main()
