import type { TrailerId } from "./trailers";

/**
 * Updates & announcements for rankrascal.lol (FIRST_RELEASE.md §36).
 *
 * Scheduling: every post has a `publishAt` timestamp. Posts stay hidden until that moment and
 * then appear on /updates and the homepage by themselves — the page re-reads this list on every
 * request, so a scheduled post needs no redeploy once it is merged. See
 * docs/rascal-realms/UPDATES_GUIDE.md for how to write and schedule one.
 *
 * Honesty rules: never post a date, a feature or a trailer that doesn't exist yet. Future
 * updates belong in UPDATE_ROADMAP (undated) until they are announced for real.
 */

export const UPDATE_KINDS = {
  featured: "Featured",
  chapter: "Chapter announcement",
  "patch-notes": "Patch notes",
  character: "Character reveal",
  pet: "Pet reveal",
  mount: "Mount teaser",
  realm: "Realm reveal",
  event: "Event",
  devlog: "Devlog",
  maintenance: "Maintenance",
  community: "Community news",
  labs: "Rascal Labs file",
} as const;

export type UpdateKind = keyof typeof UPDATE_KINDS;

export type UpdatePost = {
  slug: string;
  kind: UpdateKind;
  title: string;
  summary: string;
  body: readonly string[];
  /** ISO 8601 with an explicit offset, e.g. "2026-10-04T16:00:00Z". */
  publishAt: string;
  /** Which release this belongs to, e.g. "Release 1.0". */
  release?: string;
  /**
   * A Rascal Labs concept file this post is about (an id from lib/concepts.ts). The post shows the
   * file's preview and links into the archive; the file links back to the post via updateSlug.
   */
  labsFile?: string;
  /** A trailer from lib/trailers.ts, or a plain statement that it is still to come. */
  trailer?: { id: TrailerId } | { comingSoon: string };
  link?: { label: string; href: string };
  /** Pin to the top of /updates as the featured story. The newest pinned post wins. */
  featured?: boolean;
};

export const UPDATE_POSTS: readonly UpdatePost[] = [
  {
    slug: "labs-file-001",
    kind: "labs",
    title: "Rascal Labs // File 001",
    summary: "Something has been spotted beneath River Path.",
    body: [
      "A field study from the Rascal Labs concept archive: a crowned key, a broken sign, footprints that glow underwater and a bubble trail leading somewhere it shouldn't.",
      "This is concept art for a future update, not part of Release 1.0. Nothing more to say. Yet.",
    ],
    publishAt: "2026-09-29T06:45:00Z",
    labsFile: "river-mysteries",
    link: { label: "View field study", href: "/labs#file-001" },
  },
  {
    slug: "release-one-scope",
    kind: "chapter",
    title: "Release 1.0 is A Sign of Trouble",
    summary:
      "The first release is deliberately small: the open-world RPG foundation and one polished main quest. Small first release. Ridiculous polish. Obvious future.",
    body: [
      "Rascal Realms: Crownfall will arrive in releases and updates rather than all at once. Release 1.0 is A Sign of Trouble, the opening of Chapter 1, set in Stickerwood.",
      "It covers Starting Village, Stickerwood Forest, the First Crossroads and Rascal Plaza, with Crown Knight, Glitchcaster and Shadow Ranger, Razz, Crown Sprouts and Lost Stickers, Gold and Crown Shards, combat, loot, inventory, multiplayer, saving and the first World Lies Fraud, all built around one main quest: Q01, A Sign of Trouble.",
      "Fishing, pets, mounts, the Overgrown Receipt, King Wrongway, Crown Ruins, later weapons and future realms are still in the labs. They come later, each with its own reveal.",
      "Everything here is pre-production. There is no playable build and no release date yet.",
    ],
    publishAt: "2026-09-29T06:30:00Z",
    release: "Release 1.0",
    trailer: { comingSoon: "The Release 1.0 trailer arrives with the launch countdown." },
    link: { label: "See what's in Release 1.0", href: "/game#chapter-one" },
    featured: true,
  },
  {
    slug: "crownfall-teaser",
    kind: "featured",
    title: "The first Crownfall teaser",
    summary: "Thirty seconds of Stickerwood before the Crown noticed: the fracture, the floating realm, Razz and a citadel in the dark.",
    body: [
      "The first look at Rascal Realms: Crownfall is a cinematic teaser: the Chaos Crown fracturing, Stickerwood at golden hour, Razz in the undergrowth and King Wrongway's citadel.",
      "It is pre-production cinematic art, not in-game footage. It sets the tone the Roblox build is aiming for.",
    ],
    publishAt: "2026-09-28T12:00:00Z",
    trailer: { id: "crownfallTeaser" },
  },
  {
    slug: "world-lies-ui",
    kind: "devlog",
    title: "The World Lies became a real investigation loop",
    summary: "Evidence, contradictions, accusations and visible world corrections instead of a decorative suspicion meter.",
    body: [],
    publishAt: "2026-09-27T12:00:00Z",
    link: { label: "Read the devlog entry", href: "/devlog#world-lies-ui" },
  },
  {
    slug: "razz-canonical",
    kind: "character",
    title: "This is Razz",
    summary: "The purple box-shaped troublemaker is the canonical guide. Earlier fox exploration is retired from production.",
    body: [],
    publishAt: "2026-09-27T11:00:00Z",
    link: { label: "Read the devlog entry", href: "/devlog#razz-canonical" },
  },
  {
    slug: "visual-foundation",
    kind: "devlog",
    title: "Stickerwood has a visual language now",
    summary: "Warm greens, wood, cream, gold and sky blue for Stickerwood. Violet and magenta only when the Crown is lying.",
    body: [],
    publishAt: "2026-09-27T10:00:00Z",
    link: { label: "Read the devlog entry", href: "/devlog#visual-foundation" },
  },
];

/** Posts whose publish time has passed, newest first. */
export function publishedUpdates(now: Date = new Date()): UpdatePost[] {
  return UPDATE_POSTS.filter((post) => new Date(post.publishAt).getTime() <= now.getTime()).sort(
    (a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime(),
  );
}

/** How many announcements are queued. Their contents stay private until they publish. */
export function scheduledCount(now: Date = new Date()): number {
  return UPDATE_POSTS.filter((post) => new Date(post.publishAt).getTime() > now.getTime()).length;
}

export function formatUpdateDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

/**
 * The update seeds from FIRST_RELEASE.md §44. Undated on purpose: each becomes a real post
 * (with its own trailer) only when it is announced.
 */
export const UPDATE_ROADMAP = [
  { version: "v1.0", title: "A Sign of Trouble", copy: "The open-world RPG foundation and one polished main quest, opening Chapter 1 in Stickerwood.", status: "In pre-production" },
  { version: "Chapter 1", title: "The Sign That Lied continues", copy: "The Ancient Tree, Glitch Grove, Crown Ruins, the Overgrown Receipt and King Wrongway, arriving across later updates.", status: "Planned" },
  { version: "v1.1", title: "Waters of Stickerwood", copy: "A fishing expansion: new fish, water mysteries, weather catches and quests.", status: "Planned" },
  { version: "v1.2", title: "Trickster Arrives", copy: "The fourth hero, with hero quests, weapons and a new combat style.", status: "Planned" },
  { version: "v1.3", title: "Bonded Beasts", copy: "Pet growth, creature evolution and the first mounts.", status: "Planned" },
  { version: "v1.4", title: "Crown Storm", copy: "The first major live event: temporary world changes, special enemies and limited loot.", status: "Planned" },
  { version: "Chapter 2", title: "A new realm", copy: "The story continues somewhere else, with a new enemy ecosystem, a new boss and a deeper Crownfall mystery.", status: "Planned" },
  { version: "Later", title: "Guilds, trading and the Choice", copy: "Guilds of the Realm, a Rascal Market, and alignment and factions built on beliefs, not a good-or-evil button.", status: "Concept" },
] as const;
