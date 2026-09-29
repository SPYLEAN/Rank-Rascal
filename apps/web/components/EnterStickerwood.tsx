import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

const GAME_LOOP = [
  { number: "01", title: "Explore the claim", copy: "Enter a place that insists it is safe, ordinary or complete." },
  { number: "02", title: "Read the contradiction", copy: "Compare tracks, sound, memories, enemy behavior and broken rules." },
  { number: "03", title: "Accuse the lie", copy: "Build a theory with your squad and commit to what the world is hiding." },
  { number: "04", title: "Survive the correction", copy: "Paths fold, arenas change and the truth becomes part of the level." },
] as const;

/** Chapter 02 — the complete player promise, set inside Stickerwood's believable surface. */
export function EnterStickerwood() {
  return (
    <section id="enter-stickerwood" aria-labelledby="enter-title" className="chapter min-h-[100svh]">
      <div className="chapter-art" style={{ position: "absolute", inset: 0 }}>
        <Image
          src={BRAND_ASSETS.locations.stickerwoodHeartwood}
          alt="Concept art of Stickerwood: a treehouse village, lantern-lit walkways and waterfalls in warm afternoon light"
          fill
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,18,.96)_0%,rgba(18,12,12,.84)_38%,rgba(18,12,12,.34)_70%,rgba(12,10,18,.46)_100%)]" />
      </div>
      <div className="fade-edges" />

      <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-28 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.9fr)_minmax(34rem,1.1fr)] lg:items-center lg:gap-20 lg:py-32">
        <div>
          <p className="section-kicker">02 · The game</p>
          <h2 id="enter-title" className="chapter-title mt-4 max-w-3xl">A storybook world that fights back.</h2>
          <p className="chapter-lede">
            Rascal Realms: Crownfall is a cooperative Roblox action-mystery. Stickerwood looks warm and welcoming, but royal commands have become physical laws—and some of those laws are lies.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cloud-white/75">
            Your squad explores one connected realm, gathers independent evidence, challenges the official story and changes the world permanently when the accusation is right.
          </p>

          <dl className="mt-8 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-sm border border-cloud-white/15 bg-cloud-white/15 sm:grid-cols-3">
            <div className="bg-[#0d0b14]/85 p-4">
              <dt className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-antique-gold">Players</dt>
              <dd className="mt-1 font-display text-lg font-bold text-cloud-white">1–4 co-op</dd>
            </div>
            <div className="bg-[#0d0b14]/85 p-4">
              <dt className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-antique-gold">Genre</dt>
              <dd className="mt-1 font-display text-lg font-bold text-cloud-white">Action mystery</dd>
            </div>
            <div className="bg-[#0d0b14]/85 p-4">
              <dt className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-antique-gold">First realm</dt>
              <dd className="mt-1 font-display text-lg font-bold text-cloud-white">Stickerwood</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#investigate" className="action-primary group">
              Play the first mystery
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
            </a>
            <a href="#world-lies" className="action-secondary">
              Uncover the story <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative border border-paper-cream/20 bg-[#0b0912]/80 p-5 shadow-[18px_18px_0_rgba(11,9,18,.28)] backdrop-blur-md sm:p-7">
          <div className="absolute -left-px -top-px h-16 w-1 bg-antique-gold" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-antique-gold">One quest in four moves</p>
          <ol className="mt-5 divide-y divide-cloud-white/10 border-y border-cloud-white/10">
            {GAME_LOOP.map((step) => (
              <li key={step.number} className="group grid grid-cols-[2.75rem_1fr] gap-4 py-5">
                <span className="font-mono text-sm text-hot-magenta transition group-hover:text-signal-lime">{step.number}</span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-cloud-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cloud-white/68">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-paper-cream/75">
            The result does not reset after the quest. Repaired roads, restored memories and reopened routes change what your squad can discover next.
          </p>
        </div>
      </div>
    </section>
  );
}
