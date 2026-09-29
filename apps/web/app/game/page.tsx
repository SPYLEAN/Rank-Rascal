import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import {
  CHAPTER_ONE_ACTS,
  CORE_LOOP,
  LORE_ERAS,
  PLAYER_ROLES,
  RELEASE_ONE,
  STORY_FOUNDATION,
  STORY_THEMES,
  WORLD_LOCATIONS,
} from "@/lib/game-content";

export const metadata: Metadata = {
  title: "World, Story & Gameplay",
  description: "Chapter 1: The Sign That Lied. The story, heroes, ten Stickerwood areas and World Lies systems of Rascal Realms: Crownfall.",
};

const FACTS = [
  ["Genre", "Story-driven co-op action RPG mystery"],
  ["Players", "Solo or a squad of up to four"],
  ["First release", "Chapter 1: The Sign That Lied"],
] as const;

export default function GamePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Title scene */}
      <header className="chapter flex min-h-[calc(100svh-5rem)] items-end">
        <div className="chapter-art">
          <Image
            src={BRAND_ASSETS.locations.stickerwoodHeartwood}
            alt="Concept art of Stickerwood: treehouse walkways, lanterns and waterfalls in warm evening light"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,20,.92)_0%,rgba(12,10,20,.6)_45%,rgba(12,10,20,.05)_80%)]" />
        </div>
        <div className="fade-edges" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 lg:pb-28">
          <p className="section-kicker">The game</p>
          <h1 className="chapter-title mt-4 max-w-4xl">A kingdom that rewrites itself.</h1>
          <p className="chapter-lede max-w-2xl">
            A co-op action mystery where official rules can become physical truth. Reading the world, challenging its story and surviving the
            correction isn&apos;t beside the adventure. It is the adventure.
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {FACTS.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-paper-cream/60">{label}</dt>
                <dd className="mt-1 font-semibold text-cloud-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Premise */}
      <section id="premise" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <p className="section-kicker">The premise</p>
        <h2 className="section-title max-w-3xl">The lie isn&apos;t dialogue. It&apos;s architecture.</h2>
        <p className="story-lead mt-10">{STORY_FOUNDATION.premise}</p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-bold text-antique-gold">The fracture</h3>
            <p className="mt-3 leading-8 text-cloud-white/75">{STORY_FOUNDATION.fracture}</p>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-antique-gold">The player promise</h3>
            <p className="mt-3 leading-8 text-cloud-white/75">{STORY_FOUNDATION.playerPromise}</p>
          </div>
        </div>
      </section>

      {/* Razz */}
      <section className="chapter flex min-h-[80svh] items-center">
        <div className="chapter-art">
          <Image
            src={BRAND_ASSETS.game.qaTruthLab}
            alt="Razz and a squad investigate a disputed route between Stickerwood and the Crown Ruins"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,20,.92)_0%,rgba(12,10,20,.6)_45%,rgba(12,10,20,.1)_85%)]" />
        </div>
        <div className="fade-edges" />
        <div className="mx-auto w-full max-w-7xl px-5 py-28 sm:px-8">
          <div className="max-w-xl">
            <p className="section-kicker">Razz</p>
            <h2 className="section-title">He can see where reality was edited.</h2>
            <p className="mt-6 text-lg leading-8 text-cloud-white/85">{STORY_FOUNDATION.razz}</p>
            <p className="mt-5 leading-7 text-cloud-white/65">
              Razz guides the squad, but he isn&apos;t a perfect narrator. His fear, loyalty and missing memories become evidence too.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-kicker">History of Stickerwood</p>
            <h2 className="section-title">Four eras. One Crown that outlived its purpose.</h2>
            <p className="section-lede">The Crown began as infrastructure, not evil. Crownfall is what happens when a system built to settle facts decides which doubts may exist.</p>
          </div>
          <div className="lore-timeline lg:col-span-8">
            {LORE_ERAS.map((era) => (
              <article key={era.year} className="lore-entry">
                <span className="lore-index">{era.year}</span>
                <div>
                  <h3>{era.title}</h3>
                  <p>{era.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The World Lies system */}
      <section id="world-lies" className="scroll-mt-24 bg-[#0e1020] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="section-kicker">The World Lies</p>
          <h2 className="section-title max-w-4xl">Investigation, combat and traversal share the same evidence.</h2>
          <p className="section-lede max-w-2xl">
            A fair mystery can surprise you but never cheat you. Every accusation rests on more than one independent signal, and every correction stays visible in the world.
          </p>
          <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {CORE_LOOP.map((step, index) => (
              <li key={step.number}>
                <span className="font-display text-3xl font-extrabold text-antique-gold/70">{index + 1}</span>
                <h3 className="mt-2 font-display text-xl font-bold text-cloud-white">{step.title}</h3>
                <p className="mt-2 leading-7 text-cloud-white/70">{step.copy}</p>
              </li>
            ))}
          </ol>
          <figure className="mt-16">
            <Image
              src={BRAND_ASSETS.game.worldLiesUi}
              alt="Pre-production mock-up of the evidence, accusation, map and boss interface for The World Lies"
              width={1672}
              height={941}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="h-auto w-full rounded-md"
            />
            <figcaption className="mt-3 text-sm text-cloud-white/55">Interface concept. Not in-game footage.</figcaption>
          </figure>
          <Link href="/#investigate" className="action-primary mt-10">
            Try an investigation <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Chapter 1 */}
      <section id="chapter-one" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <p className="section-kicker">Release 1 · {RELEASE_ONE.name}</p>
        <h2 className="section-title max-w-4xl">A small first chapter with a very big horizon.</h2>
        <p className="section-lede max-w-3xl">
          It opens with a sign that lies about the road to Rascal Plaza and ends at a viewpoint that shows how much more of the realm is breaking.
        </p>
        <ol className="mt-14 border-t border-cloud-white/10">
          {CHAPTER_ONE_ACTS.map((beat) => (
            <li key={beat.act} className="grid gap-3 border-b border-cloud-white/10 py-8 md:grid-cols-[10rem_1fr] md:gap-8">
              <div>
                <p className="font-semibold text-antique-gold">{beat.act}</p>
                <p className="mt-1 text-sm text-cloud-white/65">{beat.place}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-cloud-white">{beat.title}</h3>
                <p className="mt-2 max-w-3xl leading-7 text-cloud-white/80">{beat.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <h3 className="font-display text-xl font-bold text-cloud-white">Release 1 targets</h3>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
              {RELEASE_ONE.targets.map(([label, value]) => (
                <div key={label} className="border-t border-antique-gold/40 pt-3">
                  <dt className="text-sm text-cloud-white/70">{label}</dt>
                  <dd className="mt-1 font-display text-2xl font-extrabold text-cloud-white">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-cloud-white/70">
              Also in scope: {RELEASE_ONE.includes.join(" · ")}. Production targets, not promises; numbers may change after prototyping.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-cloud-white">Saved for later updates</h3>
            <ul className="mt-5 space-y-2 text-cloud-white/80">
              {RELEASE_ONE.deferred.map((item) => (
                <li key={item} className="border-l-2 border-cloud-white/20 pl-3">{item}</li>
              ))}
            </ul>
            <Link href="/updates#roadmap" className="text-link mt-6">
              See the update roadmap <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Heroes */}
      <section className="bg-[#0e1020] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="section-kicker">The squad</p>
              <h2 className="section-title">Three heroes at launch. Three more on the way.</h2>
              <p className="section-lede">No hero owns the answer; a complete theory needs perspectives to overlap. Trickster, Lorekeeper and Badge Scout arrive in later updates.</p>
              <Link href="/#heroes" className="text-link mt-6">
                Open the hero selector <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="border-t border-cloud-white/10 lg:col-span-8">
              {PLAYER_ROLES.map((role) => (
                <article key={role.name} className="border-b border-cloud-white/10 py-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-bold text-cloud-white">{role.name}</h3>
                    <span className="text-sm text-cloud-white/70">
                      {role.role} · {role.weapon} ·{" "}
                      <span className={role.release === "launch" ? "font-semibold text-antique-gold" : undefined}>{role.releaseNote}</span>
                    </span>
                  </div>
                  <dl className="mt-5 grid gap-5 text-sm leading-7 md:grid-cols-3">
                    <div>
                      <dt className="font-semibold text-antique-gold">In a fight</dt>
                      <dd className="mt-1 text-cloud-white/70">{role.combat}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-antique-gold">In the field</dt>
                      <dd className="mt-1 text-cloud-white/70">{role.field}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-antique-gold">Inner conflict</dt>
                      <dd className="mt-1 text-cloud-white/85">{role.tension}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-kicker">The realm</p>
            <h2 className="section-title">Ten areas, one connected realm.</h2>
            <p className="section-lede">
              Every Release 1 area, in chapter order. All of it is in pre-production; the concept art sets the direction, not the final look.
            </p>
            <Link href="/#explore-stickerwood" className="text-link mt-6">
              Open the interactive atlas <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ol className="grid gap-x-10 border-t border-cloud-white/10 sm:grid-cols-2 lg:col-span-8">
            {WORLD_LOCATIONS.map((loc) => (
              <li key={loc.number} className="border-b border-cloud-white/10 py-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-lg font-bold text-cloud-white">
                    <span className="mr-2 text-antique-gold/80">{Number(loc.number)}</span>
                    {loc.name}
                  </p>
                  <span className="flex-none text-xs font-semibold text-cloud-white/65">{loc.chapterRole.split(" · ")[0]}</span>
                </div>
                <p className="mt-1 text-sm text-cloud-white/75">{loc.tagline}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Opposition */}
      <section className="chapter flex min-h-[80svh] items-end lg:items-center">
        <div className="chapter-art">
          <Image
            src={BRAND_ASSETS.game.stickerwoodEnemiesBoss}
            alt="Concept lineup of Crown-corrupted enemies and King Wrongway"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(12,10,20,.95)_0%,rgba(12,10,20,.7)_45%,rgba(12,10,20,.1)_85%)]" />
        </div>
        <div className="fade-edges" />
        <div className="mx-auto flex w-full max-w-7xl justify-end px-5 py-28 sm:px-8">
          <div className="max-w-lg">
            <p className="section-kicker">Opposition</p>
            <h2 className="section-title">Enemies are failed rules with bodies.</h2>
            <p className="mt-6 leading-8 text-cloud-white/80">
              Crown Sprouts enforce territory. Glitch Slimes repeat and multiply unstable states. Lost Stickers carry erased messages without
              understanding them. King Wrongway turns directions into weapons because he can&apos;t imagine safety without control.
            </p>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="section-kicker">What it&apos;s about</p>
        <h2 className="section-title max-w-3xl">The adventure has an argument beneath it.</h2>
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {STORY_THEMES.map(([title, copy]) => (
            <article key={title} className="border-t border-cloud-white/15 pt-5">
              <h3 className="font-display text-xl font-bold text-cloud-white">{title}</h3>
              <p className="mt-3 leading-7 text-cloud-white/70">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Honest close */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="border-t border-antique-gold/40 pt-12">
          <h2 className="max-w-3xl font-display text-3xl font-extrabold uppercase leading-tight text-cloud-white sm:text-4xl">
            This is the world we&apos;re proving, not pretending is finished.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-cloud-white/70">
            The story, visual language and system goals are set. Final Roblox models, animation, Luau systems, audio, balance and multiplayer
            pacing are still being built.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/devlog" className="action-primary">
              Follow the build <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/community#review" className="action-secondary">
              Challenge the direction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
