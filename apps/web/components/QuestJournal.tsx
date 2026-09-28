"use client";

import { useState } from "react";
import { BookOpen, Coins, Gem, Layers } from "lucide-react";
import { ECONOMY_CONCEPTS, PROGRESSION_CONCEPTS, QUEST_JOURNAL, type LoreStatus } from "@/lib/game-content";

const STATUS_LABEL: Record<LoreStatus, { label: string; className: string }> = {
  "in-development": { label: "In development", className: "border-toxic-lime/60 bg-toxic-lime/10 text-toxic-lime" },
  concept: { label: "Concept", className: "border-hot-pink/60 bg-hot-pink/10 text-hot-pink" },
  planned: { label: "Planned", className: "border-royal-purple/60 bg-royal-purple/15 text-cloud-white/80" },
};

const CATEGORIES = ["Story", "Mysteries", "Bounties", "Guild Missions", "Hidden Quests"] as const;

export function QuestJournal() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Story");
  const entries = QUEST_JOURNAL.filter((entry) => entry.category === category);

  return (
    <section id="quests" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="section-kicker">Quest journal · concept</p>
          <h2 className="section-title">Five kinds of quest. One shared journal.</h2>
          <p className="section-lede">A sample of what the journal will organize—Story, Mysteries, Bounties, Guild Missions and Hidden Quests. These are representative entries, not a live quest system.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide transition ${
                  category === item ? "border-toxic-lime bg-toxic-lime text-midnight-bg" : "border-cloud-white/20 text-cloud-white/70 hover:border-toxic-lime hover:text-toxic-lime"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <ul className="mt-6 space-y-4">
            {entries.length > 0 ? entries.map((entry) => {
              const status = STATUS_LABEL[entry.status];
              return (
                <li key={entry.title} className="rounded-xl border border-cloud-white/10 bg-[#10142b] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 font-display text-base font-bold text-cloud-white"><BookOpen className="h-4 w-4 text-toxic-lime" aria-hidden="true" />{entry.title}</div>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide ${status.className}`}>{status.label}</span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-text">{entry.location}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cloud-white/80">{entry.summary}</p>
                </li>
              );
            }) : (
              <li className="rounded-xl border border-dashed border-cloud-white/15 p-4 text-sm text-cloud-white/50">More {category.toLowerCase()} are still being drafted.</li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-royal-purple/35 bg-[#0d1022] p-6">
              <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-hot-pink"><Layers className="h-4 w-4" aria-hidden="true" />Progression · concept</p>
              <ul className="mt-4 space-y-3">
                {PROGRESSION_CONCEPTS.map((item) => (
                  <li key={item.name}>
                    <p className="font-display text-sm font-bold text-cloud-white">{item.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-cloud-white/70">{item.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-royal-purple/35 bg-[#0d1022] p-6">
              <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-toxic-lime"><Coins className="h-4 w-4" aria-hidden="true" />Economy · concept</p>
              <ul className="mt-4 space-y-3">
                {ECONOMY_CONCEPTS.map((item) => (
                  <li key={item.name}>
                    <p className="font-display text-sm font-bold text-cloud-white">{item.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-cloud-white/70">{item.copy}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 border-t border-cloud-white/10 pt-4 text-[11px] leading-relaxed text-cloud-white/50">
                <Gem className="mt-0.5 h-3.5 w-3.5 flex-none text-royal-purple" aria-hidden="true" />
                No gambling, loot boxes, paid randomness or pay-to-win progression—ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
