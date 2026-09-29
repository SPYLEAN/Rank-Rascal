import { BRAND_ASSETS } from "./brand-assets";

/**
 * Every video the site can play in the theater player. Each update can point at one of these by
 * id; add a new entry (and its encodes under public/media) when an update gets its own trailer.
 * Scenes are the written alternative to the visuals and double as chapter markers.
 */
export type Trailer = {
  id: string;
  /** Shown in the player header, e.g. "Rascal Realms: Crownfall". */
  title: string;
  /** "teaser" or "trailer"; used in control labels ("Play teaser"). */
  kind: "teaser" | "trailer";
  webm: string;
  mp4: string;
  poster: string;
  scenes: readonly { at: number; label: string }[];
  note: string;
};

const { media } = BRAND_ASSETS;

export const TRAILERS = {
  crownfallTeaser: {
    id: "crownfallTeaser",
    title: "Rascal Realms: Crownfall",
    kind: "teaser",
    webm: media.teaserWebm,
    mp4: media.teaserMp4,
    poster: media.teaserPoster,
    // Source of truth: docs/rascal-realms/TEASER_STORYBOARD.md
    scenes: [
      { at: 0, label: "The Chaos Crown fractures in the dark, spilling purple light." },
      { at: 2.2, label: "Stickerwood at golden hour: a windmill village, floating islands and waterfalls." },
      { at: 5.6, label: "A palace of the old kingdom, purple crystals pushing through its stone." },
      { at: 8.3, label: "A forest path and a signpost pointing the way." },
      { at: 11.2, label: "Crown corruption shatters the view into drifting shards." },
      { at: 13.9, label: "Razz and Stickerwood's creatures peer out of the undergrowth." },
      { at: 16.6, label: "A corrupted citadel looms in the dark." },
      { at: 20.0, label: "Open sky over the floating realm." },
      { at: 23.9, label: "Title card: Rascal Realms: Crownfall. Coming soon, only on Roblox." },
    ],
    note: "Pre-production cinematic art. Not in-game footage.",
  },
} as const satisfies Record<string, Trailer>;

export type TrailerId = keyof typeof TRAILERS;
