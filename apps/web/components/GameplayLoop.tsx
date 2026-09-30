import { Compass, Crown, Eye, Gem, ScrollText, Swords, TrendingUp } from "lucide-react";

const LOOP_STAGES = [
  { label: "Explore", icon: Compass },
  { label: "Investigate", icon: Eye },
  { label: "Expose the Lie", icon: ScrollText },
  { label: "Fight / Solve / Escape", icon: Swords },
  { label: "Earn", icon: Gem },
  { label: "Upgrade", icon: TrendingUp },
  { label: "Discover something worse", icon: Crown },
] as const;

export function GameplayLoop() {
  return (
    <section className="border-y border-panel-navy-light bg-[#0a0d1c] py-16 lg:py-20" aria-labelledby="gameplay-loop-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-kicker">The loop</p>
          <h2 id="gameplay-loop-title" className="font-display text-2xl font-extrabold uppercase text-cloud-white sm:text-3xl">Every district repeats the same promise—and breaks it a little further.</h2>
        </div>
        <ol className="mt-10 flex flex-wrap items-stretch gap-3">
          {LOOP_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <li key={stage.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 rounded-full border border-royal-purple/40 bg-[#12142a] px-4 py-2.5">
                  <span className="font-mono text-[10px] font-bold text-hot-pink">0{index + 1}</span>
                  <Icon className="h-4 w-4 text-toxic-lime" aria-hidden="true" />
                  <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide text-cloud-white">{stage.label}</span>
                </div>
                {index < LOOP_STAGES.length - 1 ? <span className="text-cloud-white/25" aria-hidden="true">→</span> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
