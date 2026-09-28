import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Crown, Eye, Map as MapIcon, ScanLine, Swords, Users } from "lucide-react";
import { SusInvestigationTerminal } from "@/components/SusInvestigationTerminal";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import {
  CORE_LOOP,
  EPISODE_ONE_BEATS,
  LORE_ERAS,
  PLAYER_ROLES,
  STORY_FOUNDATION,
  STORY_THEMES,
  WORLD_LOCATIONS,
} from "@/lib/game-content";

export const metadata: Metadata = {
  title: "World, Story & Gameplay",
  description: "Enter the complete story, world history, co-op roles and World Lies systems of Rascal Realms: Crownfall.",
};

const FIELD_NOTES = [
  ["Format", "Cinematic co-op action adventure"],
  ["Players", "Solo or a squad of up to four"],
  ["First realm", "Stickerwood"],
  ["Central conflict", "Truth against enforced certainty"],
] as const;

export default function GamePage() {
  return (
    <div className="overflow-x-hidden pb-24">
      <header className="relative min-h-[880px] overflow-hidden border-b-2 border-royal-purple/40">
        <Image src={BRAND_ASSETS.banners.welcome} alt="Welcome to Rascal Realms: Read the rules. Pick your roles. Enter the realm." fill priority sizes="100vw" className="object-cover object-[center_35%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,14,.99)_0%,rgba(5,7,14,.88)_38%,rgba(5,7,14,.3)_68%,rgba(5,7,14,.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#0a0d18_0%,transparent_45%,rgba(5,7,14,.28)_100%)]" />
        <div className="world-grain absolute inset-0 opacity-25" />
        <div className="relative mx-auto flex min-h-[880px] max-w-7xl items-end px-4 pb-24 pt-36 sm:px-6 lg:items-center lg:px-8">
          <div className="max-w-5xl">
            <div className="archive-label"><Crown className="h-4 w-4" aria-hidden="true" />World dossier 001</div>
            <h1 className="mt-8 max-w-5xl font-display text-6xl font-extrabold uppercase leading-[0.84] tracking-[-0.045em] text-cloud-white sm:text-8xl lg:text-[8.2rem]">A kingdom that <span className="block text-toxic-lime">rewrites itself.</span></h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cloud-white/78 sm:text-xl">Rascal Realms: Crownfall is a co-op action mystery about a world where official rules can become physical truth. Your squad does not chase clues beside the adventure. Reading the world, challenging its story and surviving the correction is the adventure.</p>
            <div className="mt-10 flex flex-wrap gap-8 border-l-2 border-hot-pink pl-6">{FIELD_NOTES.map(([label, value]) => <div key={label}><p className="archive-meta">{label}</p><p className="mt-1 max-w-[190px] text-sm font-semibold text-cloud-white">{value}</p></div>)}</div>
          </div>
        </div>
        <a href="#premise" className="absolute bottom-8 right-8 hidden items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cloud-white/55 hover:text-toxic-lime lg:flex">Open the record <ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
      </header>

      <section id="premise" className="story-section scroll-mt-24">
        <div className="story-rail" aria-hidden="true"><span>01</span></div>
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-36">
          <div className="lg:col-span-4">
            <p className="section-kicker">The central premise</p>
            <h2 className="section-title">The lie is not dialogue. It is architecture.</h2>
          </div>
          <div className="space-y-10 lg:col-span-8">
            <p className="story-lead">{STORY_FOUNDATION.premise}</p>
            <div className="evidence-rule" />
            <div className="grid gap-10 md:grid-cols-2">
              <div><p className="archive-meta">The fracture</p><p className="mt-3 text-base leading-8 text-cloud-white/72">{STORY_FOUNDATION.fracture}</p></div>
              <div><p className="archive-meta">The player promise</p><p className="mt-3 text-base leading-8 text-cloud-white/72">{STORY_FOUNDATION.playerPromise}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[720px] overflow-hidden border-y border-panel-navy-light">
        <Image src={BRAND_ASSETS.game.qaTruthLab} alt="Razz and a squad investigate a disputed route between Stickerwood and the Crown Ruins" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,17,.97)_0%,rgba(7,9,17,.74)_45%,rgba(7,9,17,.2)_100%)]" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl border-l-2 border-toxic-lime bg-midnight-bg/72 p-7 backdrop-blur-xl sm:p-10">
            <p className="archive-meta text-hot-pink">Character record · Razz</p>
            <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] text-cloud-white sm:text-7xl">He can see where reality was edited.</h2>
            <p className="mt-7 text-lg leading-8 text-cloud-white/78">{STORY_FOUNDATION.razz}</p>
            <p className="mt-6 border-t border-cloud-white/15 pt-6 text-sm leading-7 text-muted-text">Razz guides the squad, but he is not a perfect narrator. His fear, loyalty and missing memories become evidence too. The deeper question is not whether he lies—it is which version of himself survived the Crown.</p>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-rail" aria-hidden="true"><span>02</span></div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="section-kicker">History of Stickerwood</p><h2 className="section-title">Four eras. One instrument that outlived its purpose.</h2><p className="section-lede">The Crown began as infrastructure, not evil. Crownfall is what happens when a system built to settle facts is allowed to decide which uncertainty deserves to exist.</p></div>
            <div className="lore-timeline lg:col-span-8">{LORE_ERAS.map((era) => <article key={era.year} className="lore-entry"><span className="lore-index">{era.year}</span><div><h3>{era.title}</h3><p>{era.copy}</p></div></article>)}</div>
          </div>
        </div>
      </section>

      <section id="world-lies" className="signal-grid border-y border-royal-purple/30 bg-[#080b15] py-24 scroll-mt-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="section-kicker">The World Lies system</p><h2 className="section-title max-w-4xl">Investigation, combat and traversal use the same evidence.</h2></div><p className="text-base leading-7 text-muted-text lg:col-span-4">A fair mystery can surprise you, but it cannot cheat you. Every major accusation is supported by multiple independent signals and every correction stays visible in the world.</p></div>
          <div className="mt-16 border-y border-cloud-white/10">{CORE_LOOP.map((step) => <article key={step.number} className="group grid gap-4 border-b border-cloud-white/10 py-7 last:border-b-0 md:grid-cols-[90px_1fr_1.2fr] md:items-baseline"><span className="font-mono text-sm font-bold text-hot-pink">{step.number}</span><h3 className="font-display text-2xl font-bold uppercase text-cloud-white transition group-hover:text-toxic-lime">{step.title}</h3><p className="leading-7 text-muted-text">{step.copy}</p></article>)}</div>
          <div className="intel-frame mt-16 overflow-hidden border border-royal-purple/35 bg-panel-navy/40 p-2 shadow-2xl shadow-royal-purple/10"><Image src={BRAND_ASSETS.game.worldLiesUi} alt="Pre-production evidence, accusation, map and boss interface for The World Lies" width={1672} height={941} sizes="100vw" className="h-auto w-full" /></div>

          <div className="mt-20">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic-lime">Interactive Deduction Terminal</p>
                <h3 className="font-display text-2xl font-bold text-cloud-white sm:text-3xl">Test The S.U.S. Accusation Engine</h3>
              </div>
              <p className="font-mono text-xs text-muted-text">Live investigation simulation</p>
            </div>
            <SusInvestigationTerminal />
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-rail" aria-hidden="true"><span>03</span></div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="max-w-4xl"><p className="section-kicker">Episode 1 · The Sign That Lied</p><h2 className="section-title">A missing courier. A perfect road. Four incompatible truths.</h2><p className="section-lede max-w-3xl">The first episode is built as a complete argument. It starts with an easy accusation against a suspicious sign and ends by asking whether the squad is willing to restore a dangerous future.</p></div>
          <div className="mt-16 space-y-0 border-t border-cloud-white/10">{EPISODE_ONE_BEATS.map((beat, index) => <article key={beat.act} className="episode-act grid gap-8 border-b border-cloud-white/10 py-10 lg:grid-cols-[150px_1fr_1fr]"><div><p className="archive-meta text-hot-pink">{beat.act}</p><p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-text">{beat.place}</p></div><div><h3 className="font-display text-3xl font-bold uppercase text-cloud-white sm:text-4xl">{beat.title}</h3><p className="mt-4 leading-7 text-muted-text">{beat.copy}</p></div><blockquote className="border-l border-toxic-lime/50 pl-6 text-xl leading-8 text-cloud-white/85"><span className="font-mono text-xs font-bold uppercase tracking-widest text-toxic-lime">Question {String(index + 1).padStart(2, "0")}</span><p className="mt-4">{beat.question}</p></blockquote></article>)}</div>
        </div>
      </section>

      <section className="border-y border-panel-navy-light bg-panel-navy/30 py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="section-kicker">The squad</p><h2 className="section-title">Six heroes. Six ways to interrogate the same world.</h2><p className="section-lede">Heroes change how players fight and what kinds of evidence they can expose. No hero owns the answer; the complete theory requires perspectives to overlap. Try the full selector on the <Link href="/#heroes" className="text-toxic-lime hover:underline">homepage</Link>.</p></div><div className="lg:col-span-8"><div className="border-t border-cloud-white/10">{PLAYER_ROLES.map((role, index) => <article key={role.name} className="border-b border-cloud-white/10 py-8"><div className="flex items-baseline gap-5"><span className="font-mono text-xs text-hot-pink">0{index + 1}</span><h3 className="font-display text-3xl font-bold uppercase text-cloud-white">{role.name}</h3></div><dl className="mt-6 grid gap-5 text-sm leading-7 md:grid-cols-3"><div><dt className="archive-meta">Combat</dt><dd className="mt-2 text-muted-text">{role.combat}</dd></div><div><dt className="archive-meta">Field craft</dt><dd className="mt-2 text-muted-text">{role.field}</dd></div><div><dt className="archive-meta">Inner conflict</dt><dd className="mt-2 text-cloud-white/78">{role.tension}</dd></div></dl></article>)}</div></div></div>
        </div>
      </section>

      <section className="border-y border-panel-navy-light bg-[#080b15] py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="section-kicker">The realm</p>
              <h2 className="section-title">Eleven places, not four dioramas.</h2>
              <p className="section-lede">Episode 1's four districts are shipping content. The other seven are concept and planned work, authored to the same tone. Open the interactive version—with dossiers, mysteries and concept art—on the <Link href="/#explore-stickerwood" className="text-toxic-lime hover:underline">homepage atlas</Link>.</p>
              <Link href="/#explore-stickerwood" className="action-secondary mt-6"><MapIcon className="h-4 w-4" aria-hidden="true" />Open the full atlas</Link>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px border border-cloud-white/10 bg-cloud-white/10 sm:grid-cols-2 lg:grid-cols-3">
                {WORLD_LOCATIONS.map((loc) => (
                  <div key={loc.number} className="bg-[#0d1022] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-hot-pink">{loc.number}</span>
                      <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide ${
                        loc.status === "in-development"
                          ? "border-toxic-lime/60 bg-toxic-lime/10 text-toxic-lime"
                          : loc.status === "concept"
                          ? "border-hot-pink/60 bg-hot-pink/10 text-hot-pink"
                          : "border-royal-purple/60 bg-royal-purple/15 text-cloud-white/80"
                      }`}>
                        {loc.status === "in-development" ? "Shipping" : loc.status === "concept" ? "Concept" : "Planned"}
                      </span>
                    </div>
                    <p className="mt-2 font-display text-base font-bold text-cloud-white">{loc.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-text">{loc.tagline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[700px] overflow-hidden border-b border-panel-navy-light">
        <Image src={BRAND_ASSETS.game.stickerwoodEnemiesBoss} alt="Crown-corrupted enemies and King Wrongway concept lineup" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,17,.15),rgba(7,9,17,.58)_48%,rgba(7,9,17,.98)_78%)]" />
        <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-end justify-end px-4 py-20 sm:px-6 lg:items-center lg:px-8"><div className="max-w-xl border-l-2 border-hot-pink bg-midnight-bg/82 p-7 backdrop-blur-xl sm:p-10"><p className="section-kicker">Opposition</p><h2 className="section-title">Enemies are failed rules with bodies.</h2><p className="mt-6 text-base leading-8 text-cloud-white/74">Crown Sprouts enforce territory. Glitch Slimes repeat and multiply unstable states. Lost Stickers carry erased messages without understanding them. King Wrongway turns directions into weapons because he cannot imagine safety without control.</p><div className="mt-8 grid grid-cols-2 gap-y-5 border-t border-cloud-white/15 pt-6 text-sm"><span className="flex items-center gap-2 text-cloud-white"><Swords className="h-4 w-4 text-hot-pink" aria-hidden="true" />Readable combat tells</span><span className="flex items-center gap-2 text-cloud-white"><ScanLine className="h-4 w-4 text-toxic-lime" aria-hidden="true" />Evidence in behavior</span><span className="flex items-center gap-2 text-cloud-white"><Eye className="h-4 w-4 text-royal-purple" aria-hidden="true" />Multi-phase deductions</span><span className="flex items-center gap-2 text-cloud-white"><Users className="h-4 w-4 text-reward-yellow" aria-hidden="true" />Co-op counterplay</span></div></div></div>
      </section>

      <section className="story-section">
        <div className="story-rail" aria-hidden="true"><span>04</span></div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><p className="section-kicker">What the game is about</p><h2 className="section-title">The adventure has an argument beneath it.</h2></div><div className="lg:col-span-8"><div className="grid gap-x-12 gap-y-10 md:grid-cols-2">{STORY_THEMES.map(([title, copy], index) => <article key={title} className="border-t border-cloud-white/15 pt-5"><p className="font-mono text-xs text-hot-pink">0{index + 1}</p><h3 className="mt-5 font-display text-2xl font-bold uppercase text-cloud-white">{title}</h3><p className="mt-3 leading-7 text-muted-text">{copy}</p></article>)}</div></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-royal-purple/45 bg-[#0b0e1b] px-7 py-14 sm:px-12 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(122,77,255,.26),transparent_35%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="archive-meta text-hot-pink">Pre-production record</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-extrabold uppercase leading-tight text-cloud-white sm:text-6xl">This is the world we are proving, not pretending is finished.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-text">The story, visual language and system targets are established. Final Roblox models, animation, Luau systems, audio, encounter balance and multiplayer pacing remain active production work.</p></div><div className="flex flex-col gap-3"><Link href="/devlog" className="action-primary">Follow the build <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/community#review" className="action-secondary">Challenge the direction</Link></div></div>
        </div>
      </section>
    </div>
  );
}
