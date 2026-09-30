# Art Direction

Distilled from `Rascal_Realms_Preproduction_Pack_v1.0.0/00_MASTER_VISUAL_BIBLE.md` (CANON, accurate manifest, verified by hash). Written rules win over any single reference image when they conflict.

## North star

Rascal Realms looks welcoming at first glance and becomes stranger under inspection. Beauty earns curiosity; contradictions create unease; player reasoning restores truth. Tone: between a prestige animated adventure and a clever mystery — never horror, parody, military, or preschool.

Every finished location needs both layers:
- **Surface charm** — craftsmanship, lived-in detail, warmth, humor, clear routes, inviting landmarks.
- **Underlying unease** — erased names, conflicting maps, impossible shadows, repeated symbols, false signage, sealed doors, consequences that imply history.

Humor comes from character confidence colliding with reality — not baby talk or slapstick humiliation. Mystery has answerable evidence. Darkness comes from implications and choices, not muddy lighting or gore.

## Palette

| Token | Hex | Use |
|---|---:|---|
| Ink Plum | `#1B1426` | Outlines, deep UI, readable shadow |
| Paper Cream | `#F3E5C8` | Panels, labels, path accents |
| Forest | `#41633B` | Major foliage, role accents |
| Moss | `#76954D` | Secondary foliage |
| Wood | `#7B4E2D` | Architecture, signs |
| Antique Gold | `#D5A84B` | Royal history, rewards, focus |
| Sky | `#79B8D8` | Relief color, navigation |
| Crown Violet | `#6B31A8` | Corruption mass |
| Hot Magenta | `#E632A9` | Active lie, alert edge |
| Signal Lime | `#B9F227` | Data ticks, Razz identity |
| Void | `#160E21` | Corruption core |

Normal scenes: ~70% natural/paper neutrals, 20% green/sky, 10% gold or story accent. **Active corruption stays under 15% of a normal frame** except during deliberate set pieces (the King Wrongway reveal, a Fraud exposure moment). Corruption is an event, not wallpaper — this directly informs `WorldAtlas.tsx`, where purple/magenta should mark specific corrupted locations, not saturate the whole map chrome.

This maps onto the site's existing Tailwind tokens (`royal-purple #7A4DFF`, `toxic-lime #B7FF36`, `hot-pink #FF4FA3`, `midnight-bg`, `panel-navy`) — close enough in hue family that no token rename is required; use them the same way the bible uses Crown Violet/Signal Lime/Hot Magenta (accents and corruption, never full backgrounds).

## Shape & material language

- Normal: layered arches, broad trunks, cut-paper curves, readable diagonals, imperfect hand-built joins.
- Royal: tall crowns, pointed windows, sun/compass geometry, measured symmetry now weathered.
- Corrupt: offset duplicates, missing wedges, sharp fractures, peeled layers, reversed shadows, floating shards.
- Surfaces: painted wood, fibrous paper, matte stone, cloth, felt moss, rare faceted crystal — avoid plastic gloss everywhere.
- Important silhouettes get a dark plum keyline or a strong value break; background assets use softer edges.

## Maturity guardrails

- No baby proportions, candy saturation across a whole frame, bubbly menus, constant comic bursts, or exposition that explains every clue.
- Mature does not mean grey, violent, or photoreal — preserve color, wit, and broad readability.
- Every major set piece reveals character, history, or a system truth in addition to spectacle.
- A clue is interpretable before the answer is confirmed. False paths are fair in retrospect.

## What this rules out on the website

Tactical/military HUD chrome (coordinates, radar pings, "scan modes," telemetry read-outs, grid overlays) is **not** this art direction — it was leftover styling from an earlier direction and is removed from `WorldAtlas.tsx`, `RazzGuide.tsx`, `PageLoadingOverlay.tsx`, and `ExperienceChrome.tsx` in this pass (see `CONFLICT_REPORT.md`). Interface chrome should read as "illustrated field journal," not "ops center."
