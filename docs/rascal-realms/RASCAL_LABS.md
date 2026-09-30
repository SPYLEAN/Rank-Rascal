# Rascal Labs concept archive

`/labs` is the site's digital artbook: concept studies shown as numbered archive files ("RASCAL LABS // FILE 001"), each with an honest status. The homepage chapter "09 · From Rascal Labs" previews three files.

## Rules

- **Concept boards stay in the archive.** They are artbook and development material. They never replace cinematic hero backgrounds, hero art or map art.
- **Status describes the idea, not the picture.** Every image is concept art. "Release 1.0" means the subject is planned for Release 1.0 (A Sign of Trouble). Everything else is exploration and may change.
- **Never present future concepts as launch content.** Pets, fishing, mounts, the Glitch Slime story, the Overgrown Receipt, King Wrongway, Crown Ruins, future weapons, later relics and future realms are never "Release 1.0". `test/concepts.test.ts` enforces this.
- **No unapproved names.** Realm glimpses are labelled Realm II–V, not the names printed on the source board. Unidentified weapons stay unnamed.

## Add a file

1. Put the source PNG in `all assets graphic/concepts-<date>/` (gitignored, preserved, never shipped).
2. Add it to `scripts/build-concepts.py` (a whole sheet, or a crop box for boards), then run `python scripts/build-concepts.py`. It writes `public/brand/concepts/<category>/<slug>.webp` at native resolution (quality 90, so sheet lettering stays sharp) plus a 720 px `-thumb.webp` for previews.
3. Add an entry to `CONCEPT_ENTRIES` in `apps/web/lib/concepts.ts` with:
   - `id` and the next free `file` number. File numbers are permanent once published, because Updates link to `/labs#file-NNN`.
   - `title`, `label`, `category`, `image`, `alt`, `status`, `shortDescription`, `releaseAssociation` and `order`.
   - Optionally `focus` (crop point for previews), `featured`, and `updateSlug`.
4. Run `npm test`. `test/concepts.test.ts` checks that files exist, ids and file numbers are unique, statuses are safe, and Update links resolve both ways.

## Link a file from an update

Give the update post `labsFile: "<entry id>"` in `apps/web/lib/updates.ts`, and give the entry `updateSlug: "<post slug>"`. The post then shows the file's preview with a "View field study" link, and the archive shows "Read the update". FILE 001 ("Something has been spotted beneath River Path") is the first example. The next step in that pattern could be a later post titled "FILE 001 // IDENTIFIED", once the update is actually announced.

## Viewer

Opening a preview shows the complete sheet in `ConceptViewer`:
- a native modal dialog on a solid dark backdrop, never cropped or distorted;
- the full-resolution file loads only then;
- zoom with the button, a click, or Z;
- arrow keys or swipe move between files; Esc closes and focus returns to the preview;
- the file number, title and status are shown in text.

## Image sources (2026-09-29)

| Category | Files | Source |
|---|---|---|
| 01 Enemies & Villains | Crown Sprout, Lost Sticker, Glitch Slime, Overgrown Receipt (+ King Wrongway sheet, shared) | individual sheets |
| 02 Pets & Creatures | Royal Winged Cub, Royal Aqua King Slime, Joyful Lava Imp, Mossy Crown Golem, Crowned Shadow Cat Familiar | `pet 1–5.png` |
| 03 Fishing & River Life | River Life, Field Guide, Fishing Gear, Corrupted Lantern Fin, Underwater Clues & River Mysteries (FILE 001) | `fish 1–4.png`, `under water realms- items.png` |
| 04–09, 11, 12 | Loot & Relics, Gold/Gems/Materials, Weapons (signature + unidentified), Rascal Ecology, Environment Studies, Creature Growth, World Lies (panel + 5 tiles), Beyond Stickerwood (4 glimpses) | panels cut from the nine-panel board `stuff.png` |
| 10 King Wrongway | Key sheet + exploration panel | `king wrongway.png`, `stuff.png` panel 7 |

Panels cut from `stuff.png` are small (roughly 200–600 px wide), because the board is 1491 × 1055. The site never shows them larger than twice their size. A higher-resolution export of each panel would make those files sharper.
