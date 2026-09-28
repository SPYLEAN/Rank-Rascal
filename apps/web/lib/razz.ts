/**
 * Ask Razz — every line Razz can say, in one place.
 *
 * Razz is a scripted character, not an AI: there is no free-text input and nothing here is
 * generated. Answers about the game's production status must stay literally true; Razz can
 * joke about the world, never about what exists.
 */

export const RAZZ_GREETING =
  "Psst. You made it into Stickerwood before the Crown noticed. Ask me something—quickly.";

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
      "Episode 1's realm: eleven connected places, from Starting Village up to the sealed King Wrongway Citadel. Everything looks friendly. Most of it is lying.",
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
      "Like reading evidence? Lorekeeper or Shadow Ranger. Like breaking rules? Trickster or Glitchcaster. Like protecting people? Crown Knight. Like finding secrets? Badge Scout. There's no wrong pick. I'd pick me, but I'm not playable.",
    link: { label: "Meet all six", href: "/#heroes" },
  },
  {
    id: "wrongway",
    question: "Who is King Wrongway?",
    answer:
      "Stickerwood's last ruler. He used the Crown to make one 'safe' version of reality, and now his final command deletes any road that disagrees with it. He isn't a cartoon villain. That's what makes him dangerous.",
    link: { label: "Face him", href: "/#king-wrongway" },
  },
  {
    id: "status",
    question: "Can I play it yet?",
    answer:
      "Not yet, and I won't pretend otherwise. Rascal Realms: Crownfall is in pre-production. There is no playable build and no release date. The art you see is concept work; the devlog says exactly what's real.",
    link: { label: "Read the devlog", href: "/devlog" },
  },
  {
    id: "help",
    question: "How do I help build it?",
    answer:
      "Join Rascal Labs. Chat on the Discord, send an honest review as a Founding QA Scout, or apply to the Founders Guild if you build things. Nobody pays to belong.",
    link: { label: "Join Rascal Labs", href: "/#join-rascal-labs" },
  },
] as const;

/** One-line interruptions, each shown at most once per browser session. */
export const RAZZ_REACTIONS = {
  teaserClosed: "Pretty, right? Now go prove which parts of it are lying.",
  fraudSolved: "Rotten timber under royal varnish. Classic Wrongway. The river says thanks.",
  wrongwaySeen: "Keep your voice down. He can hear roads.",
} as const;

export type RazzReaction = keyof typeof RAZZ_REACTIONS;

/** Window events other sections dispatch so Razz can react without shared state. */
export const RAZZ_REACT_EVENT = "rr:razz-react";

export function razzReact(reaction: RazzReaction): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<RazzReaction>(RAZZ_REACT_EVENT, { detail: reaction }));
}
