import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MobileHeroSwitcher, type MobileHero } from "@/components/MobileHeroSwitcher";
import { SocialLinks } from "@/components/SocialLinks";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { PLAYER_ROLES, PRODUCTION_STAGES } from "@/lib/game-content";

/** One quest, start to finish, in six beats. Tone drives the colour of each beat's marker. */
const PLAYER_LOOP = [
  { title: "Explore Stickerwood", copy: "Villages, forest paths, a busy plaza.", tone: "calm" },
  { title: "Notice what doesn't make sense", copy: "A sign, a bridge or a witness that disagrees.", tone: "calm" },
  { title: "Gather evidence with your squad", copy: "Tracks, sounds, memories and broken rules.", tone: "calm" },
  { title: "Expose the false rule", copy: "Accuse the lie the Crown is enforcing.", tone: "fracture" },
  { title: "Survive the Crown's correction", copy: "The world fights back as the lie breaks.", tone: "fracture" },
  { title: "Restore the area and unlock what follows", copy: "What you fix stays fixed for the next quest.", tone: "restored" },
] as const;

const MARKER: Record<(typeof PLAYER_LOOP)[number]["tone"], string> = {
  calm: "border-antique-gold/70 bg-[#1a1422] text-antique-gold",
  fracture: "border-hot-magenta bg-[#2a0f24] text-[#FF7CC8]",
  restored: "border-signal-lime bg-[#16210f] text-signal-lime",
};

const LAUNCH_ART: Record<string, string> = {
  "Crown Knight": BRAND_ASSETS.heroThumbs.crownKnight,
  Glitchcaster: BRAND_ASSETS.heroThumbs.glitchcaster,
  "Shadow Ranger": BRAND_ASSETS.heroThumbs.shadowRanger,
};

const LAUNCH_HEROES: MobileHero[] = PLAYER_ROLES.filter((hero) => hero.release === "launch").map((hero) => ({
  name: hero.name,
  role: hero.role,
  weapon: hero.weapon,
  specialty: hero.mysterySpecialty,
  art: LAUNCH_ART[hero.name],
}));

const chapterTitle = "font-display text-[1.85rem] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-cloud-white";
const chip =
  "flex min-h-11 items-center justify-center gap-1 rounded-sm border border-cloud-white/20 px-2 text-center text-sm font-semibold text-paper-cream transition hover:border-antique-gold hover:text-antique-gold";

/**
 * Phones only (below 640 px): chapters 2–4 of the four-chapter homepage. The cinematic hero is
 * chapter 1. Tablet and desktop keep the full journey; deep lore and galleries stay on /game,
 * /labs and /community, linked from here.
 *
 * data-anchor-for lists the desktop anchors each chapter stands in for (see AnchorFallback), so
 * links such as /#heroes still land somewhere sensible on a phone.
 */
export function MobileJourney() {
  return (
    <div className="sm:hidden">
      {/* 2 · What players do */}
      <section
        id="what-players-do"
        data-anchor-for="enter-stickerwood investigate"
        aria-labelledby="loop-title"
        className="scroll-mt-16 bg-[radial-gradient(120%_60%_at_100%_0%,rgba(107,49,168,.28),transparent_60%),linear-gradient(180deg,#0b0912,#120d1c)] px-5 py-10"
      >
        <p className="section-kicker">02 · What players do</p>
        <h2 id="loop-title" className={`${chapterTitle} mt-3`}>
          Read the world. <span className="text-antique-gold">Prove it&apos;s lying.</span>
        </h2>

        <ol className="relative mt-7 space-y-4">
          {/* One continuous thread: calm gold, the fracture, then restored. */}
          <span
            className="absolute bottom-3 left-[13px] top-3 w-0.5 bg-[linear-gradient(180deg,#D5A84B_0%,#D5A84B_45%,#E632A9_58%,#E632A9_80%,#B7FF36_100%)]"
            aria-hidden="true"
          />
          {PLAYER_LOOP.map((step, index) => (
            <li key={step.title} className="relative grid grid-cols-[1.75rem_1fr] gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-xs font-bold ${MARKER[step.tone]}`}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-[0.95rem] font-bold uppercase leading-tight text-cloud-white">{step.title}</h3>
                <p className="mt-0.5 text-sm leading-snug text-cloud-white/75">{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 3 · The world and heroes */}
      <section
        id="world-and-heroes"
        data-anchor-for="world-lies heroes explore-stickerwood from-rascal-labs"
        aria-labelledby="world-title-mobile"
        className="scroll-mt-16 bg-[#121526] px-5 py-10"
      >
        <p className="section-kicker">03 · The world and heroes</p>
        <h2 id="world-title-mobile" className={`${chapterTitle} mt-3`}>
          The world <span className="text-[#FF7CC8]">lies</span>.
        </h2>

        <Image
          src={BRAND_ASSETS.game.stickerwoodMapThumb}
          alt="Illustrated concept map of Stickerwood, the first realm, from Starting Village up to King Wrongway Citadel"
          width={960}
          height={540}
          sizes="calc(100vw - 2.5rem)"
          className="paper-frame mt-5 h-auto w-full"
        />

        <p className="mt-4 text-[0.95rem] leading-relaxed text-cloud-white/85">
          Stickerwood runs on the Crown, which turns royal commands into physical laws. King Wrongway used it to erase anything uncertain, and now its
          commands contradict each other. Signs point the wrong way, bridges pretend to be safe, and every lie leaves evidence.
        </p>

        <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">Release 1.0 heroes</h3>
        <MobileHeroSwitcher heroes={LAUNCH_HEROES} />

        <nav aria-label="Explore Crownfall" className="mt-5">
          <ul className="grid grid-cols-3 gap-2">
            <li>
              <Link href="/game#locations" className={chip}>World</Link>
            </li>
            <li>
              <Link href="/game#heroes" className={chip}>Heroes</Link>
            </li>
            <li>
              <Link href="/labs" className={chip}>Rascal Labs</Link>
            </li>
          </ul>
        </nav>
      </section>

      {/* 4 · Help build the realm */}
      <section
        id="help-build"
        data-anchor-for="build-in-public join-rascal-labs"
        aria-labelledby="help-title"
        className="scroll-mt-16 bg-[#0e1020] px-5 pb-8 pt-10"
      >
        <p className="section-kicker">04 · Help build the realm</p>
        <h2 id="help-title" className={`${chapterTitle} mt-3`}>Built in the open.</h2>

        <ol aria-label="Production stages" className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-cloud-white/15 pt-4">
          {PRODUCTION_STAGES.map((stage) => (
            <li key={stage.label} className="flex items-start gap-2">
              <span
                className={`mt-1.5 h-2.5 w-2.5 flex-none rounded-full ${
                  stage.current ? "border-2 border-antique-gold bg-antique-gold/40" : "border border-cloud-white/45"
                }`}
                aria-hidden="true"
              />
              <div>
                <p className={`font-display text-sm font-bold ${stage.current ? "text-cloud-white" : "text-cloud-white/75"}`}>
                  {stage.label}
                  {stage.current ? <span className="sr-only"> (current stage)</span> : null}
                </p>
                <p className="text-xs leading-snug text-cloud-white/70">{stage.state}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/community#review" className="action-primary">
            Review the game <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/community#guild" className="action-secondary">
            Apply to the Founders Guild <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">Follow Rascal Labs</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <SocialLinks />
          <Link href="/updates" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-paper-cream hover:text-antique-gold">
            Latest updates <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-5 border-l-2 border-antique-gold pl-3 text-xs leading-relaxed text-cloud-white/75">
          In pre-production: no public build, no release date, and concept art is direction, not final. Joining is free and isn&apos;t a job offer
          or a playtest guarantee.
        </p>
      </section>
    </div>
  );
}
