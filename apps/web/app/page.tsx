import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Crown,
  Eye,
  Gamepad2,
  Hammer,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { CinematicHero } from "@/components/CinematicHero";
import { BuildArchive } from "@/components/BuildArchive";
import { FractureStory } from "@/components/FractureStory";
import { HeroSelector } from "@/components/HeroSelector";
import { WorldAtlas } from "@/components/WorldAtlas";
import { SusInvestigationTerminal } from "@/components/SusInvestigationTerminal";
import { GameplayLoop } from "@/components/GameplayLoop";
import { QuestJournal } from "@/components/QuestJournal";
import { KingWrongwayReveal } from "@/components/KingWrongwayReveal";
import { FutureRealmsTeaser } from "@/components/FutureRealmsTeaser";
import { CommunityPlazaSection } from "@/components/CommunityPlazaSection";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { FOUNDERS_GUILD_TRACKS, GAME_PILLARS } from "@/lib/game-content";

const SIGNALS = ["A WORLD THAT ARGUES BACK", "1–4 PLAYER CO-OP", "EVERY LIE LEAVES EVIDENCE", "NOW ASSEMBLING THE FOUNDERS GUILD"] as const;

export default function HomePage() {
  return (
    <div className="overflow-x-hidden pb-24">
      <CinematicHero />

      <div className="world-ticker border-b border-royal-purple/25 bg-hot-pink py-3 text-midnight-bg" aria-label="Game highlights">
        <div className="world-ticker-track flex w-max items-center gap-9 whitespace-nowrap font-mono text-[11px] font-black uppercase tracking-[0.2em]">
          {[...SIGNALS, ...SIGNALS].map((signal, index) => (
            <span key={`${signal}-${index}`} className="flex items-center gap-9"><span>{signal}</span><Crown className="h-4 w-4" aria-hidden="true" /></span>
          ))}
        </div>
      </div>

      <section id="world-lies" className="reveal-up mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-4xl">
          <p className="section-kicker">The signature system</p>
          <h2 className="section-title max-w-4xl">Don&apos;t follow the quest marker. Question it.</h2>
          <p className="section-lede max-w-3xl">The World Lies turns investigation into the force that moves the adventure. Clues are physical, deductions are shared and the answer changes the level—not just a dialogue box.</p>
        </div>
        <div className="mt-12 border-t border-cloud-white/15">
          {GAME_PILLARS.map((pillar, index) => {
            const Icon = index === 0 ? Eye : index === 1 ? ShieldCheck : Crown;
            return (
              <article key={pillar.eyebrow} className="group grid gap-6 border-b border-cloud-white/10 py-8 sm:grid-cols-[88px_1fr_44px] sm:items-start">
                <span className="font-mono text-sm font-bold text-hot-pink">0{index + 1}</span>
                <div><span className="font-mono text-[11px] font-bold tracking-[0.2em] text-toxic-lime">{pillar.eyebrow}</span><h3 className="mt-2 font-display text-2xl font-bold text-cloud-white sm:text-3xl">{pillar.title}</h3><p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-text">{pillar.copy}</p></div>
                <Icon className="h-6 w-6 text-royal-purple transition group-hover:text-hot-pink" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </section>

      <FractureStory />

      <HeroSelector />

      <WorldAtlas />

      <section className="reveal-up border-y border-panel-navy-light bg-[#0d1020] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="section-kicker">A mystery with an interface</p>
              <h2 className="section-title">Evidence, contradictions and consequences.</h2>
              <p className="section-lede">The journal tracks what your squad actually learned. The SUS meter shows pressure and confidence—not the correct answer. Expose a Fraud and the world visibly repairs itself.</p>
              <ul className="mt-8 space-y-4 text-base text-cloud-white/85">
                {["Clue sources stay visible, so deductions feel fair.", "Wrong accusations explain the failed premise without humiliating players.", "Boss phases combine combat with environmental reasoning."].map((item) => <li key={item} className="flex gap-3"><BookOpenCheck className="mt-0.5 h-5 w-5 flex-none text-toxic-lime" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
              <Link href="/game#world-lies" className="mt-8 inline-flex items-center gap-2 font-display font-bold text-toxic-lime hover:text-cloud-white">See the full system <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="parallax-panel lg:col-span-7">
              <div className="intel-frame overflow-hidden border border-royal-purple/40 bg-panel-navy shadow-2xl shadow-royal-purple/15"><Image src={BRAND_ASSETS.game.worldLiesUi} alt="Pre-production interface for the SUS meter, evidence board, map and King Wrongway battle" width={1672} height={941} sizes="(max-width: 1024px) 100vw, 58vw" className="h-auto w-full" /></div>
              <p className="mt-3 text-right font-mono text-[11px] uppercase tracking-wider text-muted-text">Pre-production target · subject to playtesting</p>
            </div>
          </div>

          <div className="mt-20">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic-lime">Interactive Terminal Simulator</p>
                <h3 className="font-display text-2xl font-bold text-cloud-white sm:text-3xl">Operate the S.U.S. Accusation Engine</h3>
              </div>
              <p className="font-mono text-xs text-muted-text">Live pre-production testbed</p>
            </div>
            <SusInvestigationTerminal />
          </div>
        </div>
      </section>

      <GameplayLoop />

      <QuestJournal />

      <section className="reveal-up relative min-h-[780px] overflow-hidden border-y border-royal-purple/30">
        <Image src={BRAND_ASSETS.game.foundersGuildWorkshop} alt="Razz and the Founders Guild build the enormous handcrafted world of Stickerwood together" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,17,.98)_0%,rgba(7,8,17,.88)_38%,rgba(7,8,17,.28)_72%,rgba(7,8,17,.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#0b0d19_0%,transparent_48%,rgba(7,8,17,.35)_100%)]" />
        <div className="relative mx-auto flex min-h-[780px] max-w-7xl items-end px-4 py-20 sm:px-6 lg:items-center lg:px-8">
          <div className="max-w-xl border-l-2 border-toxic-lime bg-midnight-bg/82 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-hot-pink"><Hammer className="h-4 w-4" aria-hidden="true" />Now assembling</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-cloud-white sm:text-6xl">The world needs more than an audience.</h2>
            <p className="mt-5 text-lg leading-relaxed text-cloud-white/75">We are forming a focused remote team around Roblox systems, environments, characters, animation, UI/VFX, audio, story, QA and community. Show us how you think—not a generic résumé drop.</p>
            <div className="mt-6 grid gap-px border border-cloud-white/10 bg-cloud-white/10 sm:grid-cols-2">{FOUNDERS_GUILD_TRACKS.slice(0, 6).map((track) => <span key={track.value} className="bg-midnight-bg/90 px-3 py-2.5 text-xs text-cloud-white/80">{track.label}</span>)}</div>
            <Link href="/community#guild" className="action-primary mt-8">Find your place in the Guild <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <div className="reveal-up mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-xl border border-dashed border-cloud-white/15 px-5 py-4 text-xs leading-relaxed text-cloud-white/55">
          <span className="font-bold text-cloud-white/80">Two different Guilds, on purpose:</span> the Founders Guild above is a real, open contributor program. In the fiction, an in-game Guild (Guild Missions, Guild Credits) is a <span className="text-hot-pink">planned</span> feature for later in development—see the Quests section above.
        </p>
      </div>

      <KingWrongwayReveal />

      <FutureRealmsTeaser />

      <section className="reveal-up relative min-h-[740px] overflow-hidden border-b border-panel-navy-light">
        <Image src={BRAND_ASSETS.game.qaTruthLab} alt="Razz and Founding QA Scouts investigate false paths inside a transforming Stickerwood truth lab" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,17,.28)_0%,rgba(7,8,17,.25)_42%,rgba(7,8,17,.92)_72%,rgba(7,8,17,.98)_100%)]" />
        <div className="relative mx-auto flex min-h-[740px] max-w-7xl items-end justify-end px-4 py-20 sm:px-6 lg:items-center lg:px-8">
          <div className="max-w-xl border-r-2 border-hot-pink bg-midnight-bg/86 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic-lime"><BadgeCheck className="h-4 w-4" aria-hidden="true" />Founding QA Scouts</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-cloud-white sm:text-5xl">Leave a real review. Get a real place in the test roster.</h2>
            <p className="mt-5 text-lg leading-relaxed text-cloud-white/75">Every thoughtful review receives a unique QA ID, personalized digital badge and certificate by email. Build invitations follow in cohorts when the experience is playable and safe to test.</p>
            <div className="mt-7 border-t border-cloud-white/15">{[["01", "Review"], ["02", "Get verified"], ["03", "Join QA roster"]].map(([number, label]) => <div key={number} className="grid grid-cols-[40px_1fr] border-b border-cloud-white/10 py-3"><span className="font-mono text-xs text-hot-pink">{number}</span><p className="font-display font-bold text-cloud-white">{label}</p></div>)}</div>
            <Link href="/community#review" className="action-primary mt-8 bg-hot-pink text-cloud-white">Send your signal <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <BuildArchive />

      <CommunityPlazaSection />
    </div>
  );
}
