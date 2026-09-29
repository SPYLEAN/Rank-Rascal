"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  ChevronsUp,
  Coins,
  Compass,
  Crown,
  Diamond,
  Eye,
  Gem,
  KeyRound,
  Map as MapIcon,
  MapPin,
  PawPrint,
  Search,
  Sparkles,
  Stamp,
  Star,
  Sword,
  Swords,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import {
  ECONOMY_CONCEPTS,
  PROGRESSION_CONCEPTS,
  QUEST_CATEGORIES,
  QUEST_JOURNAL,
  type QuestEntry,
  type QuestStatus,
} from "@/lib/game-content";

const CATEGORIES = QUEST_CATEGORIES;

// The primary loop from the Release 1 specification, one short line per beat.
const LOOP: readonly { title: string; line: string; Icon: LucideIcon }[] = [
  { title: "Explore", line: "Find places the map doesn't explain.", Icon: Compass },
  { title: "Notice", line: "Something doesn't add up.", Icon: Eye },
  { title: "Investigate", line: "Follow clues instead of markers.", Icon: Search },
  { title: "Expose", line: "Call out the Fraud.", Icon: Stamp },
  { title: "Fight / Solve / Traverse", line: "Truth changes what happens next.", Icon: Swords },
  { title: "Earn", line: "Loot, Gold, Crown Shards and discoveries.", Icon: Coins },
  { title: "Progress", line: "Strengthen your hero.", Icon: ChevronsUp },
  { title: "Discover something worse", line: "The answer usually creates another question.", Icon: Sparkles },
];

const STATUS: Record<QuestStatus, { label: string; stamp: string }> = {
  "release-1": { label: "In Release 1.0", stamp: "border-ink-plum bg-antique-gold text-ink-plum" },
  concept: { label: "Concept", stamp: "border-ink-plum/70 bg-paper-cream text-ink-plum" },
  "future-update": { label: "Future update", stamp: "border-[#4B2380] bg-[#EDE3FF] text-[#4B2380]" },
};

const NODE_ICON: Record<(typeof PROGRESSION_CONCEPTS)[number]["id"], LucideIcon> = {
  level: Star,
  abilities: Zap,
  weapons: Sword,
  relics: KeyRound,
  exploration: MapIcon,
  bonding: PawPrint,
};

// Literal classes (Tailwind can't see computed ones): three nodes left of the hero, three right.
const NODE_PLACE = [
  "sm:col-start-1 sm:row-start-1 sm:text-right",
  "sm:col-start-1 sm:row-start-2 sm:text-right",
  "sm:col-start-1 sm:row-start-3 sm:text-right",
  "sm:col-start-3 sm:row-start-1",
  "sm:col-start-3 sm:row-start-2",
  "sm:col-start-3 sm:row-start-3",
] as const;

const IN_RELEASE = ["Q01: A Sign of Trouble", "Exploration", "Combat", "Loot & progression"] as const;
const LATER = ["Fishing", "Pets", "Guilds", "King Wrongway"] as const;

/**
 * Part of chapter 06: how the realm plays. The gameplay loop as a journey (healthy Stickerwood
 * on the left, Crownfall violet on the right), the quest journal as an in-game page, how a hero
 * grows, the economy and what Release 1.0 actually contains. Only Q01 is Release 1.0; every
 * other quest is labelled Concept or Future update.
 */
export function QuestJournal() {
  const [category, setCategory] = useState(0);
  const baseId = useId();
  const entries = QUEST_JOURNAL.filter((entry) => entry.category === CATEGORIES[category]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = CATEGORIES.length - 1;
    const next =
      event.key === "ArrowRight" ? (category + 1) % CATEGORIES.length
      : event.key === "ArrowLeft" ? (category - 1 + CATEGORIES.length) % CATEGORIES.length
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setCategory(next);
    const tab = document.getElementById(`${baseId}-tab-${next}`);
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <section id="quests" aria-labelledby="quests-title" className="relative isolate scroll-mt-20 overflow-hidden border-t border-cloud-white/10 py-24">
      {/* Healthy Stickerwood on the left, Crownfall violet on the right, kept faint for reading. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={BRAND_ASSETS.game.stickerwoodMap}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[.16] blur-[2px] saturate-[.85]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,22,.7)_0%,rgba(18,21,38,.84)_48%,rgba(34,14,54,.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_100%_35%,rgba(107,49,168,.28),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--page)_0%,rgba(18,21,38,0)_16%,rgba(18,21,38,0)_84%,var(--page)_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-kicker">How the realm plays</p>
        <h2 id="quests-title" className="mt-4 max-w-3xl font-display text-3xl font-extrabold uppercase leading-tight text-cloud-white sm:text-4xl">
          Every place repeats the same promise—and breaks it a little further.
        </h2>

        {/* The loop: a thread from Explore to the next mystery. Scrolls sideways on small screens. */}
        <div className="no-scrollbar -mx-5 mt-10 snap-x overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0">
          <ol aria-label="The gameplay loop" className="relative grid min-w-[60rem] grid-cols-8 lg:min-w-0">
            <span
              className="absolute left-[6.25%] right-[6.25%] top-5 h-px bg-[linear-gradient(90deg,rgba(213,168,75,.6)_0%,rgba(213,168,75,.6)_76%,rgba(185,155,255,.85)_100%)]"
              aria-hidden="true"
            />
            <span className="loop-light absolute left-[6.25%] right-[6.25%] top-[19px] h-[3px]" aria-hidden="true" />
            {LOOP.map(({ title, line, Icon }, index) => {
              const last = index === LOOP.length - 1;
              return (
                <li key={title} className="group relative flex snap-start flex-col items-center px-2 text-center">
                  <span
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-[#110f1a] transition duration-300 group-hover:scale-110 motion-reduce:transform-none ${
                      last
                        ? "border-[#B99BFF] text-[#D7C6FF] shadow-[0_0_18px_rgba(107,49,168,.6)]"
                        : "border-antique-gold/60 text-antique-gold group-hover:border-antique-gold group-hover:shadow-[0_0_16px_rgba(213,168,75,.45)]"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span className="mt-3 font-mono text-[0.65rem] tracking-[0.18em] text-cloud-white/55" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`mt-1 font-display text-[0.8rem] font-bold uppercase leading-tight ${last ? "text-[#D7C6FF]" : "text-cloud-white"}`}>
                    {title}
                  </span>
                  <span className="mt-1.5 text-xs leading-snug text-cloud-white/65 transition group-hover:text-cloud-white/95">{line}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-x-12">
          {/* The quest journal */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl font-bold text-cloud-white">The quest journal</h3>
              <p className="text-xs text-cloud-white/65">Release 1.0 ships one quest. The rest are concepts.</p>
            </div>
            <div role="tablist" aria-label="Quest types" className="no-scrollbar mt-4 flex gap-1 overflow-x-auto" onKeyDown={onKeyDown}>
              {CATEGORIES.map((name, index) => {
                const selected = index === category;
                const hasRelease = QUEST_JOURNAL.some((entry) => entry.category === name && entry.status === "release-1");
                return (
                  <button
                    key={name}
                    id={`${baseId}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setCategory(index)}
                    className={`flex min-h-11 flex-none items-center gap-1.5 rounded-t-sm border border-b-0 px-2 text-[0.82rem] font-semibold transition ${
                      selected
                        ? "border-wood/40 bg-paper-cream text-ink-plum"
                        : "border-cloud-white/15 bg-[#0f0d18]/75 text-cloud-white/70 hover:text-cloud-white"
                    }`}
                  >
                    {name}
                    {hasRelease ? (
                      <>
                        <span className="rounded-sm bg-antique-gold px-1 text-[0.6rem] font-extrabold text-ink-plum" aria-hidden="true">1.0</span>
                        <span className="sr-only"> (includes the Release 1.0 quest)</span>
                      </>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${category}`}
              tabIndex={0}
              className="journal-page p-3 sm:p-5 lg:min-h-[33rem]"
            >
              <div key={category} className="journal-turn space-y-3">
                {entries.map((entry) => (
                  <QuestCard key={entry.title} entry={entry} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Growing stronger */}
            <div>
              <h3 className="font-display text-xl font-bold text-cloud-white">Growing stronger</h3>
              <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-[minmax(0,1fr)_6.5rem_minmax(0,1fr)] sm:gap-x-4 sm:gap-y-4">
                <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {[16.7, 50, 83.3].flatMap((y) => [25, 75].map((x) => (
                    <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} stroke="rgba(213,168,75,.45)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  )))}
                </svg>
                <div className="col-span-2 flex items-center justify-center sm:col-span-1 sm:col-start-2 sm:row-span-3 sm:row-start-1">
                  <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-antique-gold bg-[#15111f] text-center shadow-[0_0_30px_rgba(213,168,75,.25)]">
                    <Crown className="h-5 w-5 text-antique-gold" aria-hidden="true" />
                    <span className="mt-1 font-display text-[0.7rem] font-extrabold uppercase leading-tight tracking-wider text-cloud-white">
                      Your
                      <br />
                      hero
                    </span>
                  </div>
                </div>
                {PROGRESSION_CONCEPTS.map((node, index) => {
                  const Icon = NODE_ICON[node.id];
                  const left = index < 3;
                  return (
                    <div
                      key={node.id}
                      className={`group relative z-10 rounded-sm border p-3 transition hover:border-antique-gold ${NODE_PLACE[index]} ${
                        node.future ? "border-dashed border-[#B99BFF]/70 bg-[#1a1228]/90" : "border-cloud-white/15 bg-[#0f0d18]/90"
                      }`}
                    >
                      <p className={`flex items-center gap-2 font-display text-sm font-bold uppercase text-cloud-white ${left ? "sm:flex-row-reverse" : ""}`}>
                        <Icon className={`h-4 w-4 flex-none ${node.future ? "text-[#D7C6FF]" : "text-antique-gold"}`} aria-hidden="true" />
                        {node.name}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-cloud-white/70 transition group-hover:text-cloud-white/95">{node.copy}</p>
                      {node.future ? (
                        <span className="mt-2 inline-block rounded-sm border border-[#B99BFF] px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#D7C6FF]">
                          Future system
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Economy */}
            <div>
              <h3 className="font-display text-xl font-bold text-cloud-white">
                Two core currencies. <span className="text-cloud-white/70">Materials stay materials.</span>
              </h3>
              <div className="mt-4 grid grid-cols-[minmax(0,2fr)_auto_minmax(0,1fr)] items-stretch gap-2 sm:gap-3">
                <ul aria-label="Currencies" className="grid grid-cols-2 gap-2 sm:gap-3">
                  {ECONOMY_CONCEPTS.filter((item) => item.kind === "currency").map((item) => (
                    <EconomyItem key={item.name} name={item.name} copy={item.copy} tag="Currency" />
                  ))}
                </ul>
                <span className="self-center font-display text-xl font-bold text-antique-gold" aria-hidden="true">+</span>
                <ul aria-label="Materials" className="grid">
                  {ECONOMY_CONCEPTS.filter((item) => item.kind === "material").map((item) => (
                    <EconomyItem key={item.name} name={item.name} copy={item.copy} tag="Material" />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* What Release 1.0 contains */}
          <div className="relative overflow-hidden rounded-sm border border-antique-gold/45 bg-[linear-gradient(135deg,rgba(213,168,75,.14),rgba(18,21,38,.92)_45%,rgba(107,49,168,.2))] p-5 sm:p-6 lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-x-10">
            <div>
              <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-antique-gold">
                <Crown className="h-4 w-4" aria-hidden="true" /> Release 1.0
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight text-cloud-white">A Sign of Trouble</p>
              <p className="mt-2 text-sm leading-relaxed text-cloud-white/85">
                One polished main quest. One open-world RPG foundation. More stories arrive through updates.
              </p>
            </div>
            <div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-0">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cloud-white/75">In Release 1.0</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {IN_RELEASE.map((item) => (
                      <li key={item} className="rounded-sm bg-antique-gold px-2 py-1 text-xs font-bold text-ink-plum">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cloud-white/75">Coming later</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {LATER.map((item) => (
                      <li key={item} className="rounded-sm border border-dashed border-[#B99BFF]/75 px-2 py-1 text-xs font-semibold text-[#D7C6FF]">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-cloud-white/70">
                In pre-production: system design, not a finished system. Long-term Robux items lean toward cosmetics, not pay-to-win power. The in-game
                guild system is separate from the real Founders Guild below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One journal entry: location card with a status stamp, then the quest as a page note. */
function QuestCard({ entry }: { entry: QuestEntry }) {
  const status = STATUS[entry.status];
  return (
    <article className="group grid gap-3 rounded-sm border border-wood/25 bg-white/35 p-3 transition duration-300 hover:-translate-y-0.5 hover:border-antique-gold hover:shadow-[0_14px_30px_-18px_rgba(123,78,45,.7)] motion-reduce:transform-none sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-4 sm:p-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-ink-plum/20 sm:aspect-[4/3]">
        <Image
          src={BRAND_ASSETS.journalCards[entry.card]}
          alt={`Concept art of ${entry.location}`}
          fill
          sizes="(min-width: 640px) 168px, 100vw"
          className="object-cover object-center"
        />
        <span
          className={`quest-stamp absolute left-2 top-2 rounded-sm border-2 px-1.5 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] ${status.stamp}`}
          aria-hidden="true"
        >
          {status.label}
        </span>
      </div>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-wood">
          <span>
            {entry.code ? `${entry.code} · ` : ""}
            {entry.category}
          </span>
          <span className="rounded-sm border border-wood/40 px-1.5 py-px text-[0.6rem] text-ink-plum">
            {status.label}
          </span>
        </p>
        <h4 className="mt-1.5 font-display text-xl font-extrabold uppercase leading-tight text-ink-plum sm:text-[1.35rem]">{entry.title}</h4>
        <p className="mt-1.5 font-semibold italic leading-snug text-ink-plum/85">{entry.hook}</p>
        {entry.summary ? <p className="mt-1.5 text-sm leading-relaxed text-ink-plum/80">{entry.summary}</p> : null}
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-plum/85">
          <div className="flex items-center gap-1.5">
            <dt className="flex items-center gap-1 font-bold uppercase tracking-[0.12em]">
              <MapPin className="h-3.5 w-3.5 text-wood" aria-hidden="true" />
              {entry.route ? "Route" : "Location"}
            </dt>
            <dd>{entry.route ?? entry.location}</dd>
          </div>
          {entry.reward ? (
            <div className="flex items-center gap-1.5">
              <dt className="font-bold uppercase tracking-[0.12em]">Reward</dt>
              <dd className="flex items-center gap-1">
                <Diamond className="shard-pulse h-3.5 w-3.5 fill-[#B99BFF] text-[#4B2380]" aria-hidden="true" />
                {entry.reward}
              </dd>
            </div>
          ) : null}
        </dl>
        {entry.note ? <p className="journal-note mt-3 text-sm text-wood">{entry.note}</p> : null}
      </div>
    </article>
  );
}

function EconomyItem({ name, copy, tag }: { name: string; copy: string; tag: "Currency" | "Material" }) {
  const Icon = name === "Gold" ? Coins : name === "Crown Shards" ? Diamond : Gem;
  const tone =
    name === "Gold" ? "text-antique-gold" : name === "Crown Shards" ? "shard-pulse fill-[#6B31A8]/60 text-[#D7C6FF]" : "text-[#8FD8C8]";
  return (
    <li className={`rounded-sm border p-3 ${tag === "Material" ? "h-full border-dashed border-cloud-white/25 bg-[#0f0d18]/70" : "border-antique-gold/35 bg-[#0f0d18]/85"}`}>
      <Icon className={`h-5 w-5 ${tone}`} aria-hidden="true" />
      <p className="mt-2 font-display text-sm font-bold leading-tight text-cloud-white">{name}</p>
      <p className="mt-1 text-xs leading-snug text-cloud-white/70">{copy}</p>
      <p className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cloud-white/55">{tag}</p>
    </li>
  );
}
