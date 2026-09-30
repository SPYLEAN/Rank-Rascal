/**
 * Rascal Labs concept archive: every concept file the site shows, as data.
 *
 * Add a file by adding an entry below and its WebP under public/brand/concepts (see
 * scripts/build-concepts.py). The archive page, homepage preview, viewer and Updates links all
 * render from this list; nothing is hard-coded per file.
 *
 * Status is about the idea, not the picture: every image here is concept art. A "Release 1.0"
 * status means the subject is planned for Release 1.0 (A Sign of Trouble); everything else is
 * exploration that may change and is not a promise of playable content.
 */

export const CONCEPT_STATUS = {
  "release-1": "Release 1.0",
  "concept-art": "Concept art",
  "system-design": "System design",
  "in-development": "In development",
  "future-update": "Future update concept",
  "chapter-1": "Chapter 1 concept",
  classified: "Classified",
  companion: "Companion concept",
  "creature-study": "Creature study",
  "relic-study": "Relic study",
  "future-system": "Future system concept",
} as const;

export type ConceptStatus = keyof typeof CONCEPT_STATUS;

/** Whether the subject is planned for Release 1.0, later in Chapter 1, a future update, or sealed. */
export type ReleaseAssociation = "release-1" | "chapter-1" | "future" | "classified";

export type ConceptImage = {
  /** Full-resolution WebP, loaded in the viewer. */
  src: string;
  /** 720 px preview for cards and lists; falls back to src for small files. */
  thumb: string;
  width: number;
  height: number;
};

export type ConceptEntry = {
  id: string;
  /** Archive file number, shown as "FILE 001". Stable once published: Updates link to it. */
  file: string;
  title: string;
  /** Small label above the title, e.g. "CREATURE STUDY". */
  label: string;
  category: ConceptCategoryId;
  image: ConceptImage;
  alt: string;
  status: ConceptStatus;
  shortDescription: string;
  releaseAssociation: ReleaseAssociation;
  featured?: boolean;
  order: number;
  /** Where to aim a cropped preview (CSS object-position). */
  focus?: string;
  /** An Updates post that talks about this file, e.g. "labs-file-001". */
  updateSlug?: string;
};

/** Small captioned tiles shown inside a category (World Lies examples, realm glimpses). */
export type ConceptTile = {
  id: string;
  title: string;
  text: string;
  image: { src: string; width: number; height: number };
  alt: string;
};

export type ConceptCategoryId =
  | "enemies"
  | "pets"
  | "fishing"
  | "loot"
  | "materials"
  | "weapons"
  | "ecology"
  | "environments"
  | "mounts"
  | "king-wrongway"
  | "world-lies"
  | "beyond";

export type ConceptCategory = {
  id: ConceptCategoryId;
  number: string;
  title: string;
  intro: string;
  /** Extra line under the intro (e.g. a terminology note). */
  note?: string;
  /** Entries from another category that also belong here (shared file, no duplicate image). */
  alsoShows?: readonly string[];
  tiles?: readonly ConceptTile[];
  /** "glimpse" categories show only their tiles: no full sheet, no viewer. */
  layout?: "standard" | "glimpse";
};

const C = "/brand/concepts";
const sheet = (path: string, width: number, height: number): ConceptImage => ({
  src: `${C}/${path}.webp`,
  thumb: width > 720 ? `${C}/${path}-thumb.webp` : `${C}/${path}.webp`,
  width,
  height,
});
const tile = (path: string, width: number, height: number) => ({ src: `${C}/${path}.webp`, width, height });

export const CONCEPT_ENTRIES: readonly ConceptEntry[] = [
  // ── 03 Fishing & river life (FILE 001 is the river mystery teased on Updates) ─────────────
  {
    id: "river-mysteries",
    file: "001",
    title: "Underwater Clues & River Mysteries",
    label: "Field study",
    category: "fishing",
    image: sheet("fishing/river-mysteries", 1448, 1086),
    alt: "Stickerwood river mysteries concept sheet: a crowned key, a broken sign, glowing footprints and a hidden cave beneath the water",
    status: "future-update",
    shortDescription: "Something has been spotted beneath River Path.",
    releaseAssociation: "future",
    order: 5,
    focus: "30% 60%",
    updateSlug: "labs-file-001",
  },
  {
    id: "river-life",
    file: "002",
    title: "Stickerwood River Life",
    label: "Crownfall research",
    category: "fishing",
    image: sheet("fishing/river-life", 1448, 1086),
    alt: "Stickerwood fish families concept sheet, from bright river fish to a corrupted Crownfall shadefin",
    status: "future-update",
    shortDescription: "Bright waters, higher places, happier creatures. Mostly.",
    releaseAssociation: "future",
    order: 1,
    focus: "50% 45%",
  },
  {
    id: "fishing-field-guide",
    file: "003",
    title: "Fishing & River Life Field Guide",
    label: "Crownfall research",
    category: "fishing",
    image: sheet("fishing/field-guide", 1448, 1086),
    alt: "Stickerwood fishing and river life concept sheet with common catches, a corrupted catch, a fishing rod and underwater clues",
    status: "future-update",
    shortDescription: "Stickerwood's rivers remember things the surface forgot.",
    releaseAssociation: "future",
    featured: true,
    order: 2,
    focus: "30% 70%",
  },
  {
    id: "fishing-gear",
    file: "004",
    title: "Fishing Gear",
    label: "Equipment study",
    category: "fishing",
    image: sheet("fishing/gear", 1448, 1086),
    alt: "Fishing gear concept sheet with rods, bobbers, tackle charms, hooks, bait jars and a fishing satchel",
    status: "future-update",
    shortDescription: "Rods, bobbers, tackle charms and bait for a river that bites back.",
    releaseAssociation: "future",
    order: 3,
  },
  {
    id: "corrupted-lantern-fin",
    file: "005",
    title: "Corrupted Lantern Fin",
    label: "Crownfall specimen",
    category: "fishing",
    image: sheet("fishing/corrupted-lantern-fin", 1448, 1086),
    alt: "Corrupted Lantern Fin concept sheet showing a Stickerwood fish changed step by step by Crownfall corruption",
    status: "future-update",
    shortDescription: "Once a curious river fish. Now its false light lures others into the deep.",
    releaseAssociation: "future",
    order: 4,
    focus: "40% 30%",
  },

  // ── 01 Enemies & villains ─────────────────────────────────────────────────────────────────
  {
    id: "crown-sprout",
    file: "006",
    title: "Crown Sprout",
    label: "Creature study",
    category: "enemies",
    image: sheet("enemies/crown-sprout", 1122, 1402),
    alt: "Rascal Realms Crown Sprout enemy concept study",
    status: "release-1",
    shortDescription: "A once-innocent Stickerwood sprout, tainted by Crownfall. Small, stubborn and full of trouble.",
    releaseAssociation: "release-1",
    featured: true,
    order: 1,
    focus: "30% 28%",
  },
  {
    id: "lost-sticker",
    file: "007",
    title: "Lost Sticker",
    label: "Crownfall research",
    category: "enemies",
    image: sheet("enemies/lost-sticker", 1122, 1402),
    alt: "Rascal Realms Lost Sticker enemy concept study",
    status: "release-1",
    shortDescription: "Torn from royal maps and seals. It relabels paths and leads travellers astray.",
    releaseAssociation: "release-1",
    order: 2,
    focus: "40% 30%",
  },
  {
    id: "glitch-slime",
    file: "008",
    title: "Glitch Slime",
    label: "Creature study",
    category: "enemies",
    image: sheet("enemies/glitch-slime", 1122, 1402),
    alt: "Rascal Realms Glitch Slime enemy concept study",
    status: "future-update",
    shortDescription: "A slime built from unstable realm fragments. It absorbs and repeats whatever it touches.",
    releaseAssociation: "future",
    order: 3,
    focus: "35% 32%",
  },
  {
    id: "overgrown-receipt",
    file: "009",
    title: "Overgrown Receipt",
    label: "Mini-boss study",
    category: "enemies",
    image: sheet("enemies/overgrown-receipt", 1122, 1402),
    alt: "Overgrown Receipt mini-boss concept study",
    status: "chapter-1",
    shortDescription: "A once-humble record of trade, reclaimed by Stickerwood and tainted by Crownfall.",
    releaseAssociation: "chapter-1",
    order: 4,
    focus: "40% 35%",
  },

  // ── 10 King Wrongway ──────────────────────────────────────────────────────────────────────
  {
    id: "king-wrongway",
    file: "010",
    title: "King Wrongway",
    label: "First major threat",
    category: "king-wrongway",
    image: sheet("king-wrongway/king-wrongway-sheet", 1122, 1402),
    alt: "King Wrongway boss concept artwork with silhouettes, crown and signpost details",
    status: "chapter-1",
    shortDescription: "Every road leads somewhere. His just don't lead where they say.",
    releaseAssociation: "chapter-1",
    order: 1,
    focus: "35% 30%",
  },
  {
    id: "king-wrongway-studies",
    file: "011",
    title: "A Ruler of Riddles",
    label: "Boss exploration",
    category: "king-wrongway",
    image: sheet("king-wrongway/king-wrongway-studies", 543, 395),
    alt: "King Wrongway exploration sketches: silhouettes, crown motifs, sign variants and an arena study",
    status: "chapter-1",
    shortDescription: "Silhouettes, crown motifs, sign variants and a first look at his arena.",
    releaseAssociation: "chapter-1",
    order: 2,
  },

  // ── 02 Pets & creatures ───────────────────────────────────────────────────────────────────
  {
    id: "royal-winged-cub",
    file: "012",
    title: "Royal Winged Cub",
    label: "Companion study",
    category: "pets",
    image: sheet("pets/royal-winged-cub", 1086, 1448),
    alt: "Royal Winged Cub companion concept study",
    status: "companion",
    shortDescription: "A loyal companion born of light.",
    releaseAssociation: "future",
    order: 1,
    focus: "30% 30%",
  },
  {
    id: "royal-aqua-king-slime",
    file: "013",
    title: "Royal Aqua King Slime",
    label: "Companion study",
    category: "pets",
    image: sheet("pets/royal-aqua-king-slime", 1086, 1448),
    alt: "Royal Aqua King Slime water companion concept study",
    status: "companion",
    shortDescription: "Born from the clearest springs in the floating isles. Mostly splash.",
    releaseAssociation: "future",
    order: 2,
    focus: "40% 30%",
  },
  {
    id: "joyful-lava-imp",
    file: "014",
    title: "Joyful Lava Imp",
    label: "Companion study",
    category: "pets",
    image: sheet("pets/joyful-lava-imp", 1086, 1448),
    alt: "Joyful Lava Imp companion concept study",
    status: "companion",
    shortDescription: "A little spark of chaos, friendship and endless energy.",
    releaseAssociation: "future",
    order: 3,
    focus: "45% 28%",
  },
  {
    id: "mossy-crown-golem",
    file: "015",
    title: "Mossy Crown Golem",
    label: "Companion study",
    category: "pets",
    image: sheet("pets/mossy-crown-golem", 1086, 1448),
    alt: "Mossy Crown Golem companion concept study",
    status: "companion",
    shortDescription: "A gentle guardian of stone and roots. Big hugs, bigger adventures.",
    releaseAssociation: "future",
    order: 4,
    focus: "45% 22%",
  },
  {
    id: "crowned-shadow-cat",
    file: "016",
    title: "Crowned Shadow Cat Familiar",
    label: "Companion study",
    category: "pets",
    image: sheet("pets/crowned-shadow-cat", 1086, 1448),
    alt: "Crowned Shadow Cat Familiar companion concept study",
    status: "companion",
    shortDescription: "A mischievous shadow born of Crownfall's stranger magic.",
    releaseAssociation: "future",
    order: 5,
    focus: "40% 20%",
  },

  // ── 04 Loot & relics / 05 Materials ───────────────────────────────────────────────────────
  {
    id: "loot-and-relics",
    file: "017",
    title: "Loot & Relics",
    label: "Relic study",
    category: "loot",
    image: sheet("loot/loot-and-relics", 595, 335),
    alt: "Loot and relics concept study: Crown Shards, a sealed corrupted chest, the Wrongway Token, ornate keys and strange artifacts",
    status: "relic-study",
    shortDescription: "Fragments, keys and artifacts from a broken Crown. The Wrongway Token's arrow moves when you're not looking.",
    releaseAssociation: "future",
    featured: true,
    order: 1,
    focus: "60% 40%",
  },
  {
    id: "gold-gems-materials",
    file: "018",
    title: "Gold, Gems & Materials",
    label: "Economy study",
    category: "materials",
    image: sheet("materials/gold-gems-materials", 393, 335),
    alt: "Gold coins, Crown Shards, crystals and upgrade materials concept study",
    status: "system-design",
    shortDescription: "Gold is everyday currency. Crown Shards drive progression and story. Gems and crystals are materials.",
    releaseAssociation: "release-1",
    order: 1,
  },

  // ── 06 Weapons ────────────────────────────────────────────────────────────────────────────
  {
    id: "signature-weapons",
    file: "019",
    title: "Signature Weapons",
    label: "Weapon study",
    category: "weapons",
    image: sheet("weapons/signature-weapons", 387, 300),
    alt: "Signature weapon concepts: the Crown Knight's Relic Sword and Royal Shield, the Glitchcaster's Fracture Staff and the Shadow Ranger's Whisper Bow",
    status: "release-1",
    shortDescription: "Relic Sword and Royal Shield. Fracture Staff. Whisper Bow. The launch heroes' own arms.",
    releaseAssociation: "release-1",
    order: 1,
  },
  {
    id: "unidentified-armaments",
    file: "020",
    title: "Unidentified Armaments",
    label: "Weapon study",
    category: "weapons",
    image: sheet("weapons/unidentified-armaments", 219, 300),
    alt: "Silhouettes of unidentified future weapons",
    status: "classified",
    shortDescription: "More arms. More stories. Not yet.",
    releaseAssociation: "classified",
    order: 2,
  },

  // ── 07 Ecology / 08 Environments / 09 Mounts ──────────────────────────────────────────────
  {
    id: "rascal-ecology",
    file: "021",
    title: "Rascals & Enemy Ecology",
    label: "Creature study",
    category: "ecology",
    image: sheet("ecology/rascal-ecology", 381, 300),
    alt: "Ecology study showing ordinary Stickerwood creatures beside their Crown-touched forms",
    status: "creature-study",
    shortDescription: "Crown-touched creatures aren't evil. Just changed.",
    releaseAssociation: "future",
    order: 1,
  },
  {
    id: "stickerwood-environments",
    file: "022",
    title: "Stickerwood Environment Studies",
    label: "Art direction",
    category: "environments",
    image: sheet("environments/stickerwood-environments", 503, 300),
    alt: "Stickerwood environment studies: village house, market stall, lamp post, wooden bridge, way sign, ruins and Crown-corrupted variants",
    status: "concept-art",
    shortDescription: "A charming village with hidden depths. Even the landscape can lie.",
    releaseAssociation: "release-1",
    order: 1,
  },
  {
    id: "creature-growth",
    file: "023",
    title: "Creature Growth Study",
    label: "Future beast",
    category: "mounts",
    image: sheet("mounts/creature-growth", 454, 395),
    alt: "A juvenile creature beside the shadowed silhouette of its much larger possible adult form",
    status: "future-system",
    shortDescription: "Young creatures may become something much larger.",
    releaseAssociation: "future",
    order: 1,
  },

  // ── 11 World Lies ─────────────────────────────────────────────────────────────────────────
  {
    id: "world-lies-studies",
    file: "024",
    title: "World Lies Studies",
    label: "System design",
    category: "world-lies",
    image: sheet("world-lies/world-lies-studies", 493, 200),
    alt: "World Lies concept studies: a lying sign, a false bridge, a suspicious chest, a distorted doorway and a repeating forest",
    status: "system-design",
    shortDescription: "The first Fraud is a sign. It won't be the last kind.",
    releaseAssociation: "chapter-1",
    order: 1,
  },
];

export const CONCEPT_CATEGORIES: readonly ConceptCategory[] = [
  { id: "enemies", number: "01", title: "Enemies & Villains", intro: "Crownfall changes more than landscapes.", alsoShows: ["king-wrongway"] },
  {
    id: "pets",
    number: "02",
    title: "Pets & Creatures",
    intro: "Companion studies for Stickerwood's friendlier residents.",
    note: "Pets aren't part of Release 1.0.",
  },
  {
    id: "fishing",
    number: "03",
    title: "Fishing & River Life",
    intro: "Stickerwood's rivers remember things the surface forgot.",
    note: "A later story direction: Something in the Water. Not part of Release 1.0.",
  },
  { id: "loot", number: "04", title: "Loot & Relics", intro: "Fragments, keys and artifacts from a broken Crown." },
  {
    id: "materials",
    number: "05",
    title: "Gold, Gems & Materials",
    intro: "Treasures with truths, and a few lies.",
    note: "Gold is standard currency and Crown Shards are the major progression and story resource, both in Release 1.0. Gems and crystals are materials, not extra currencies.",
  },
  { id: "weapons", number: "06", title: "Weapons", intro: "Arms of adventure, power and mischief." },
  {
    id: "ecology",
    number: "07",
    title: "Rascals & Enemy Ecology",
    intro: "Crownfall changes creatures differently.",
    note: "Some become hostile. Some mutate. Some stay strange but harmless. Some may become allies.",
  },
  {
    id: "environments",
    number: "08",
    title: "Stickerwood Environment Studies",
    intro: "Healthy Stickerwood is warm greens, wood, cream, gold and sky blue.",
    note: "Crown corruption brings violet, magenta and controlled glitch lime. Purple signals wrongness; it never covers the healthy realm.",
  },
  { id: "mounts", number: "09", title: "Future Beast Study", intro: "Something grows in the shadows." },
  { id: "king-wrongway", number: "10", title: "King Wrongway", intro: "Every road leads somewhere. His just don't lead where they say." },
  {
    id: "world-lies",
    number: "11",
    title: "The World Lies",
    intro: "Not everything in a realm deserves to be believed.",
    tiles: [
      { id: "lying-sign", title: "Lying sign", text: "Points somewhere that isn't there.", image: tile("world-lies/lying-sign", 67, 97), alt: "A wooden sign pointing the wrong way" },
      { id: "false-bridge", title: "False bridge", text: "Looks safe. Evidence says otherwise.", image: tile("world-lies/false-bridge", 105, 102), alt: "A stone bridge glowing with Crown corruption underneath" },
      { id: "suspicious-chest", title: "Suspicious chest", text: "Treasure, trap, or Fraud?", image: tile("world-lies/suspicious-chest", 75, 100), alt: "An ornate chest on a stone plinth" },
      { id: "distorted-doorway", title: "Distorted doorway", text: "The room beyond shouldn't exist.", image: tile("world-lies/distorted-doorway", 92, 108), alt: "A cracked stone doorway opening onto somewhere else" },
      { id: "repeating-forest", title: "Repeating forest", text: "You've passed that tree before.", image: tile("world-lies/repeating-forest", 92, 105), alt: "A forest path of identical arching trees" },
    ],
  },
  {
    id: "beyond",
    number: "12",
    title: "Beyond Stickerwood",
    intro: "Far realms. Greater mysteries. Glimpses only.",
    layout: "glimpse",
    tiles: [
      { id: "realm-ii", title: "Realm II", text: "Classified", image: tile("future-realms/realm-ii", 110, 100), alt: "A distant frozen realm, glimpsed" },
      { id: "realm-iii", title: "Realm III", text: "???", image: tile("future-realms/realm-iii", 118, 98), alt: "A distant kingdom at dusk, glimpsed" },
      { id: "realm-iv", title: "Realm IV", text: "Signal lost", image: tile("future-realms/realm-iv", 128, 113), alt: "An impossible spiral tower among floating rocks, glimpsed" },
      { id: "realm-v", title: "Realm V", text: "Unreadable", image: tile("future-realms/realm-v", 115, 117), alt: "A storm-wrapped floating realm, glimpsed" },
    ],
  },
];

/** Entries shown in a category, in order (including shared files from other categories). */
export function entriesFor(category: ConceptCategory): ConceptEntry[] {
  const own = CONCEPT_ENTRIES.filter((entry) => entry.category === category.id).sort((a, b) => a.order - b.order);
  const shared = (category.alsoShows ?? []).map((id) => CONCEPT_ENTRIES.find((entry) => entry.id === id)).filter((entry): entry is ConceptEntry => Boolean(entry));
  return [...own, ...shared];
}

export function conceptById(id: string): ConceptEntry | undefined {
  return CONCEPT_ENTRIES.find((entry) => entry.id === id);
}

/** URL of a file inside the archive: /labs#file-001 */
export function conceptHref(entry: ConceptEntry): string {
  return `/labs#file-${entry.file}`;
}

/** The three homepage preview cards: category, art and one-line teaser. */
export const LABS_PREVIEW = [
  { category: "enemies" as ConceptCategoryId, entryId: "crown-sprout", kicker: "Creature study", title: "Enemies & Villains", teaser: "Crownfall changes more than landscapes.", status: "concept-art" as ConceptStatus },
  { category: "fishing" as ConceptCategoryId, entryId: "fishing-field-guide", kicker: "Crownfall research", title: "Fishing & River Life", teaser: "Stickerwood's rivers remember things the surface forgot.", status: "future-update" as ConceptStatus },
  { category: "loot" as ConceptCategoryId, entryId: "loot-and-relics", kicker: "Relic study", title: "Loot & Relics", teaser: "Fragments, keys and artifacts from a broken Crown.", status: "relic-study" as ConceptStatus },
] as const;

/** What Release 1.0 contains versus what is still in the labs (archive intro). */
export const RELEASE_VS_LABS = {
  release: ["Starting Village", "Crown Knight", "Glitchcaster", "Shadow Ranger", "Crown Sprout", "Lost Sticker", "Gold", "Crown Shards", "The first Fraud", "A Sign of Trouble"],
  labs: ["Pets", "Fishing", "More enemies", "Overgrown Receipt", "King Wrongway", "Future weapons", "Mounts", "Later relics", "Crown Ruins", "Future realms"],
} as const;
