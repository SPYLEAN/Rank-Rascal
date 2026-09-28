import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Clock3, Hammer, Mail, ShieldCheck, Sparkles, Users } from "lucide-react";
import { CommunityForms } from "@/components/CommunityForms";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { FOUNDERS_GUILD_TRACKS } from "@/lib/game-content";

export const metadata: Metadata = {
  title: "Founding QA & Founders Guild",
  description: "Review Rascal Realms, join the Founding QA Scout roster or apply to help build the Roblox experience.",
};

const QA_STEPS = [
  ["01", "Study the direction", "Explore the game brief, concept art and systems. Review what exists—not an imaginary finished game."],
  ["02", "Send a useful signal", "Tell us what works, what is unclear and the single change that would most increase your desire to play."],
  ["03", "Receive your kit", "We email your unique QA ID, personalized badge and certificate, then place you on the Founding QA roster."],
] as const;

export default function CommunityPage() {
  const communityUrl = process.env.NEXT_PUBLIC_COMMUNITY_URL;

  return (
    <div className="overflow-x-hidden pb-24">
      <header className="relative min-h-[760px] overflow-hidden border-b border-royal-purple/30">
        <Image src={BRAND_ASSETS.game.foundersGuildWorkshop} alt="Razz welcomes builders into the Founders Guild workshop inside Stickerwood" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,17,.98)_0%,rgba(7,8,17,.89)_40%,rgba(7,8,17,.25)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#121526_0%,transparent_45%)]" />
        <div className="world-grain absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-4 pb-20 pt-32 sm:px-6 lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <div className="archive-label inline-flex items-center gap-2 border-l-2 border-hot-pink bg-midnight-bg/75 px-4 py-2 backdrop-blur"><Users className="h-4 w-4" aria-hidden="true" />Founding QA & production team</div>
            <h1 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.93] tracking-tight text-cloud-white sm:text-7xl lg:text-[6.25rem]">Don&apos;t watch the realm get built. <span className="block text-toxic-lime">Leave your mark on it.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cloud-white/78 sm:text-xl">One hub for serious player feedback and serious production talent. Challenge the idea as a Founding QA Scout—or show us the craft you can own inside the Founders Guild.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#review" className="action-primary bg-hot-pink text-cloud-white">Review the game <BadgeCheck className="h-5 w-5" aria-hidden="true" /></a>
              <a href="#guild" className="action-secondary bg-midnight-bg/65 backdrop-blur">Apply to the Guild <Hammer className="h-5 w-5 text-toxic-lime" aria-hidden="true" /></a>
              <a href={communityUrl || "https://discord.gg/gkneGrpzAn"} target="_blank" rel="noopener noreferrer" className="action-secondary border-[#5865F2]/60 hover:bg-[#5865F2] hover:text-cloud-white transition">Join Discord <Users className="h-5 w-5 text-[#5865F2]" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <a href="#roles" className="absolute bottom-7 right-7 hidden items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cloud-white/55 hover:text-toxic-lime lg:flex">See open disciplines <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" /></a>
      </header>

      <section id="roles" className="reveal-up mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="section-kicker">Open production disciplines</p><h2 className="section-title">A small, accountable team for a very large world.</h2><p className="section-lede max-w-3xl">We care about shipped work, clear communication and thoughtful ownership. Specialists and high-agency generalists are both welcome to introduce themselves.</p></div><div className="border-l-2 border-toxic-lime bg-toxic-lime/5 p-5 lg:col-span-4"><BriefcaseBusiness className="h-5 w-5 text-toxic-lime" aria-hidden="true" /><p className="mt-3 text-sm leading-relaxed text-cloud-white/75">Applications are expressions of interest, not employment offers. Scope, credit, ownership and compensation are agreed before production work begins.</p></div></div>
        <div className="mt-12 border-t border-cloud-white/15">{FOUNDERS_GUILD_TRACKS.map((track, index) => <article key={track.value} className="group grid gap-4 border-b border-cloud-white/10 py-6 sm:grid-cols-[64px_240px_1fr] sm:items-start"><span className="font-mono text-xs font-bold text-hot-pink">{String(index + 1).padStart(2, "0")}</span><h3 className="font-display text-xl font-bold text-cloud-white">{track.label}</h3><p className="max-w-2xl text-sm leading-relaxed text-muted-text">{track.copy}</p></article>)}</div>
      </section>

      <section className="reveal-up relative min-h-[720px] overflow-hidden border-y border-panel-navy-light">
        <Image src={BRAND_ASSETS.game.qaTruthLab} alt="Founding QA Scouts test suspicious paths beside Razz in the Stickerwood truth lab" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,17,.92)_0%,rgba(7,8,17,.72)_45%,rgba(7,8,17,.22)_100%)]" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl border-l-2 border-hot-pink bg-midnight-bg/86 p-7 backdrop-blur-xl sm:p-10">
            <p className="section-kicker">Founding QA Scout program</p>
            <h2 className="section-title">We want the note you almost didn&apos;t send.</h2>
            <p className="section-lede">Praise is useful when it is specific. Doubt is useful when it is explained. The QA roster exists to find the distance between an exciting promise and a game people can actually understand, access and enjoy.</p>
            <div className="mt-8 border-t border-cloud-white/15">{QA_STEPS.map(([number, title, copy]) => <div key={number} className="grid gap-3 border-b border-cloud-white/10 py-5 sm:grid-cols-[48px_1fr]"><span className="font-mono text-sm font-bold text-hot-pink">{number}</span><div><h3 className="font-display text-lg font-bold text-cloud-white">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-text">{copy}</p></div></div>)}</div>
          </div>
        </div>
      </section>

      <section className="reveal-up mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-10 max-w-3xl"><p className="section-kicker">Choose your signal</p><h2 className="section-title">Review the direction or answer the builder&apos;s call.</h2><p className="section-lede">Both routes reach a private human-reviewed inbox. Nothing is automatically posted to the site.</p></div>
        <CommunityForms />
      </section>

      <section className="reveal-up mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-px border border-panel-navy-light bg-panel-navy-light sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[#0d1020] p-6"><ShieldCheck className="h-5 w-5 text-toxic-lime" aria-hidden="true" /><h2 className="mt-3 font-display text-lg font-bold text-cloud-white">Human moderated</h2><p className="mt-2 text-sm leading-relaxed text-muted-text">Nothing is published automatically. Comments, applications and contact details stay private unless permission is given.</p></div>
          <div className="bg-[#0d1020] p-6"><Mail className="h-5 w-5 text-hot-pink" aria-hidden="true" /><h2 className="mt-3 font-display text-lg font-bold text-cloud-white">Individual receipts</h2><p className="mt-2 text-sm leading-relaxed text-muted-text">Valid submissions receive a unique ID. QA reviews also receive a personalized badge and certificate by email.</p></div>
          <div className="bg-[#0d1020] p-6"><Clock3 className="h-5 w-5 text-royal-purple" aria-hidden="true" /><h2 className="mt-3 font-display text-lg font-bold text-cloud-white">Cohort access</h2><p className="mt-2 text-sm leading-relaxed text-muted-text">QA roster membership is direct; playable build invitations follow readiness, device needs and safe cohort capacity.</p></div>
          <div className="bg-[#0d1020] p-6"><Sparkles className="h-5 w-5 text-reward-yellow" aria-hidden="true" /><h2 className="mt-3 font-display text-lg font-bold text-cloud-white">No pay-to-belong</h2><p className="mt-2 text-sm leading-relaxed text-muted-text">Guild access, review influence and playtesting are not sold. We do not use custom unpaid spec work as an application gate.</p></div>
        </div>
        {communityUrl?.startsWith("https://") ? <a href={communityUrl} target="_blank" rel="noopener noreferrer" className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl border border-royal-purple/40 bg-panel-navy px-6 py-4 font-display font-bold text-cloud-white hover:border-toxic-lime">Continue into the moderated community <ArrowUpRight className="h-4 w-4 text-toxic-lime" aria-hidden="true" /></a> : null}
        <p className="mt-8 text-center text-sm text-muted-text">Submitting means you agree to the review process above. Read our <Link href="/privacy" className="text-toxic-lime hover:underline">privacy policy</Link> and <Link href="/terms" className="text-toxic-lime hover:underline">terms</Link>.</p>
      </section>
    </div>
  );
}
