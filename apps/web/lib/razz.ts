/**
 * Ask Razz — the curated lines, reactions and scripted fallback.
 *
 * Free-typed questions go to /api/razz, which answers with Claude from the canon in
 * lib/razz-knowledge.ts. These six curated answers are shown instantly (no AI call) and are the
 * fallback whenever the AI isn't configured or available. Answers about production status must
 * stay literally true; Razz can joke about the world, never about what exists.
 */

export const RAZZ_GREETING =
  "Psst. You made it into Stickerwood before the Crown noticed. Ask me anything about Crownfall, or pick one of these.";

export type RazzAnswer = {
  id: string;
  question: string;
  answer: string;
  link?: { label: string; href: string; external?: boolean };
};

export const RAZZ_QUESTIONS: readonly RazzAnswer[] = [
  {
    id: "stickerwood",
    question: "What is Stickerwood?",
    answer:
      "Chapter 1's realm: ten connected areas, from Starting Village and Rascal Plaza all the way to King Wrongway's Citadel. Everything looks friendly. Most of it is lying.",
    link: { label: "Open the atlas", href: "/#explore-stickerwood" },
  },
  {
    id: "lies",
    question: "Why does the world lie?",
    answer:
      "The Crown turned rules into reality. When King Wrongway's commands stopped agreeing with each other, the world started editing itself to cover the gaps. Every lie leaves evidence, though. That's our advantage.",
    link: { label: "Try an investigation", href: "/#investigate" },
  },
  {
    id: "heroes",
    question: "Which hero should I pick?",
    answer:
      "Release 1 launches with three. Crown Knight if you like standing in front and blocking things. Glitchcaster if you like ranged magic and big Crown-energy explosions. Shadow Ranger if you like precision, speed and noticing footprints. Trickster, Lorekeeper and Badge Scout come in later updates. I'd pick me, but I'm not playable.",
    link: { label: "Meet the heroes", href: "/#heroes" },
  },
  {
    id: "wrongway",
    question: "Who is King Wrongway?",
    answer:
      "Chapter 1's boss, waiting in his Citadel at the end of Stickerwood. His whole thing is misdirection: fake bridges, lying signs, false clones. He isn't a cartoon villain, which is what makes him dangerous. You'll always have enough evidence to find the truth. The game doesn't cheat, even when he does.",
    link: { label: "Face him", href: "/#king-wrongway" },
  },
  {
    id: "status",
    question: "Can I play it yet?",
    answer:
      "Not yet, and I won't pretend otherwise. Rascal Realms: Crownfall is in pre-production. The first release, Chapter 1: The Sign That Lied, is being planned now. There's no playable build and no release date. Announcements land on the Updates page.",
    link: { label: "See the updates", href: "/updates" },
  },
  {
    id: "help",
    question: "How do I help build it?",
    answer:
      "Join Rascal Labs. Chat on the Discord, send an honest review as a Founding QA Scout, or apply to the Founders Guild if you build things. Nobody pays to belong.",
    link: { label: "Join Rascal Labs", href: "/#join-rascal-labs" },
  },
] as const;

const KEYWORDS: Record<string, readonly string[]> = {
  stickerwood: ["stickerwood", "world", "map", "area", "areas", "place", "realm", "village", "plaza", "forest", "river", "tree", "grove", "ruins", "bridge", "citadel"],
  lies: ["lie", "lies", "lying", "fraud", "frauds", "crown", "story", "evidence", "clue", "mystery", "investigat"],
  heroes: ["hero", "heroes", "class", "classes", "knight", "glitchcaster", "ranger", "trickster", "lorekeeper", "scout", "pick", "character", "play as"],
  wrongway: ["wrongway", "king", "boss", "villain", "receipt", "enemy", "enemies"],
  status: ["play", "release", "launch", "date", "when", "out", "beta", "build", "available", "price", "cost", "free", "update", "updates", "trailer"],
  help: ["help", "join", "discord", "community", "guild", "review", "qa", "apply", "job", "work", "test", "playtest"],
};

/**
 * The scripted fallback when the AI isn't available: pick the curated answer whose keywords best
 * match the visitor's question, or null when nothing fits.
 */
export function matchScriptedAnswer(question: string): RazzAnswer | null {
  const text = question.toLowerCase();
  let best: { answer: RazzAnswer; score: number } | null = null;
  for (const answer of RAZZ_QUESTIONS) {
    const score = (KEYWORDS[answer.id] ?? []).reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { answer, score };
  }
  return best?.answer ?? null;
}

/** One-line interruptions, each shown at most once per browser session. */
export const RAZZ_REACTIONS = {
  teaserClosed: "Pretty, right? Now go prove which parts of it are lying.",
  fraudSolved: "Okay. Fine. I trusted the sign. Footprints don't lie; signs apparently do.",
  wrongwaySeen: "Keep your voice down. He can hear roads.",
} as const;

export type RazzReaction = keyof typeof RAZZ_REACTIONS;

/** Window events other sections dispatch so Razz can react without shared state. */
export const RAZZ_REACT_EVENT = "rr:razz-react";

export function razzReact(reaction: RazzReaction): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<RazzReaction>(RAZZ_REACT_EVENT, { detail: reaction }));
}
