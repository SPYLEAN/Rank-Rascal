"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { QUEST_JOURNAL, type LoreStatus } from "@/lib/game-content";

const CATEGORIES = ["Story", "Mysteries", "Bounties", "Guild Missions", "Hidden Quests"] as const;
const LOOP = ["Explore", "Investigate", "Expose the lie", "Fight, solve or escape", "Earn", "Upgrade", "Discover something worse"] as const;

const STATUS: Record<LoreStatus, string> = {
  "in-development": "In development",
  concept: "Concept",
  planned: "Planned",
};

/** Part of chapter 06: what you actually do out there — the loop, the journal and growth. */
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
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section id="quests" aria-labelledby="quests-title" className="scroll-mt-20 border-t border-cloud-white/10 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-kicker">What you&apos;ll do out there</p>
        <h2 id="quests-title" className="mt-4 max-w-3xl font-display text-3xl font-extrabold uppercase leading-tight text-cloud-white sm:text-4xl">
          Every place repeats the same promise—and breaks it a little further.
        </h2>

        <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg text-paper-cream/90" aria-label="The gameplay loop">
          {LOOP.map((step, index) => (
            <li key={step} className="flex items-center gap-3">
              <span className={index === LOOP.length - 1 ? "text-hot-magenta" : undefined}>{step}</span>
              {index < LOOP.length - 1 ? <span className="text-antique-gold" aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <h3 className="font-display text-xl font-bold text-cloud-white">The quest journal</h3>
            <div role="tablist" aria-label="Quest types" className="mt-4 flex flex-wrap gap-x-5" onKeyDown={onKeyDown}>
              {CATEGORIES.map((name, index) => (
                <button
                  key={name}
                  id={`${baseId}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === category}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={index === category ? 0 : -1}
                  onClick={() => setCategory(index)}
                  className={`min-h-11 border-b-2 text-sm font-semibold transition ${
                    index === category ? "border-antique-gold text-cloud-white" : "border-transparent text-cloud-white/55 hover:text-cloud-white"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <ul id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${category}`} className="mt-4 divide-y divide-cloud-white/10">
              {entries.map((entry) => (
                <li key={entry.title} className="py-4">
                  <p className="font-display text-lg font-bold text-cloud-white">{entry.title}</p>
                  <p className="mt-1 text-cloud-white/75">{entry.summary}</p>
                  <p className="mt-1 text-xs text-cloud-white/50">{entry.location} · {STATUS[entry.status]}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8 text-cloud-white/80">
            <div>
              <h3 className="font-display text-xl font-bold text-cloud-white">Growing stronger</h3>
              <p className="mt-3 leading-relaxed">
                Heroes grow through <strong className="text-cloud-white">Hero Level</strong>, <strong className="text-cloud-white">Abilities</strong>,{" "}
                <strong className="text-cloud-white">Gear</strong>, <strong className="text-cloud-white">Relics</strong>,{" "}
                <strong className="text-cloud-white">Class Mastery</strong> and <strong className="text-cloud-white">Badges</strong>. You earn{" "}
                <strong className="text-antique-gold">Crown Shards</strong> by correcting lies, <strong className="text-antique-gold">Bounty Gold</strong> from bounties and{" "}
                <strong className="text-antique-gold">Guild Credits</strong> from guild missions.
              </p>
            </div>
            <p className="border-l-2 border-antique-gold pl-4 text-sm leading-relaxed">
              All of this is concept design, not a finished system. It will never include loot boxes, paid randomness or pay-to-win.
              In-game Guild Missions are a planned feature, separate from the real Founders Guild at the end of this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
