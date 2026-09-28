import { Lock } from "lucide-react";
import { FUTURE_REALMS_TEASER } from "@/lib/game-content";

export function FutureRealmsTeaser() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="future-realms-title">
      <div className="relative overflow-hidden rounded-2xl border border-royal-purple/40 bg-gradient-to-br from-[#12081f] via-[#0b0e1c] to-[#0b0e1c] px-7 py-14 text-center sm:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(107,49,168,.35),transparent_60%)]" />
        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-royal-purple/60 bg-midnight-bg/70">
            <Lock className="h-6 w-6 text-royal-purple" aria-hidden="true" />
          </div>
          <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-royal-purple">Planned · sealed for now</p>
          <h2 id="future-realms-title" className="mt-3 font-display text-3xl font-extrabold uppercase text-cloud-white sm:text-4xl">{FUTURE_REALMS_TEASER.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cloud-white/70">{FUTURE_REALMS_TEASER.copy}</p>
        </div>
      </div>
    </section>
  );
}
