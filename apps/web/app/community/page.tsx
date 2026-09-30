import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CommunityForms } from "@/components/CommunityForms";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { FOUNDERS_GUILD_TRACKS } from "@/lib/game-content";
import { DISCORD_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Community: Founding QA & Founders Guild",
  description: "Review Rascal Realms: Crownfall and join the Founding QA candidate pool, or apply to help build it with the Founders Guild.",
};

const QA_STEPS = [
  ["Look at what exists", "Explore the story, concept art and systems on this site. Review what's really here, not an imagined finished game."],
  ["Send an honest review", "What works, what's unclear, and the single change that would make you most want to play."],
  ["Join the candidate pool", "You get a Founding QA Scout ID, badge and certificate. When playtesting opens, candidates are invited in small groups."],
] as const;

const PROMISES = [
  ["Read by a person", "Nothing is published automatically. Your details stay private, and reviews are quoted only with your permission."],
  ["Honest about access", "Joining the candidate pool isn't a guaranteed invite. Invites follow build readiness, devices, age requirements and safety capacity."],
  ["No pay-to-belong", "Reviews, the Guild and playtesting are never sold, and we don't use unpaid custom spec work as an application test."],
  ["Not a job offer", "Guild applications are introductions. Scope, credit, ownership and pay are agreed in writing before any production work."],
] as const;

export default function CommunityPage() {
  return (
    <div className="overflow-x-hidden">
      <header className="chapter flex min-h-[calc(100svh-5rem)] items-end">
        <div className="chapter-art">
          <Image
            src={BRAND_ASSETS.game.foundersGuildWorkshop}
            alt="Concept art: Razz and builders at work in a sunlit Stickerwood workshop"
            fill
            priority
            sizes="100vw"
            className="parallax-art object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,13,6,.94)_0%,rgba(20,13,6,.75)_45%,rgba(20,13,6,.15)_85%)]" />
        </div>
        <div className="fade-edges" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8">
          <p className="section-kicker">Rascal Labs</p>
          <h1 className="chapter-title mt-4 max-w-3xl">Help build the realm.</h1>
          <p className="chapter-lede max-w-2xl">
            Challenge the direction as a Founding QA Scout, or bring your craft to the Founders Guild. Both go to a person, not a queue.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#review" className="action-primary">
              Review the game <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#guild" className="action-secondary">
              Apply to the Guild <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="action-secondary">
              Join the Discord <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <section aria-labelledby="qa-title" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="section-kicker">Founding QA Scouts</p>
        <h2 id="qa-title" className="section-title max-w-3xl">We want the note you almost didn&apos;t send.</h2>
        <p className="section-lede max-w-2xl">
          Praise helps when it&apos;s specific. Doubt helps when it&apos;s explained. Early reviews find the gap between an exciting promise and a game people can understand and enjoy.
        </p>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {QA_STEPS.map(([title, copy], index) => (
            <li key={title} className="border-t-2 border-antique-gold/60 pt-5">
              <span className="font-display text-3xl font-extrabold text-antique-gold/80">{index + 1}</span>
              <h3 className="mt-2 font-display text-xl font-bold text-cloud-white">{title}</h3>
              <p className="mt-2 leading-relaxed text-cloud-white/80">{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Review and application forms" className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-24 sm:px-8">
        <CommunityForms />
      </section>

      <section aria-labelledby="roles-title" className="bg-[#0e1020] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="section-kicker">Founders Guild</p>
              <h2 id="roles-title" className="section-title">A small team for a very large world.</h2>
              <p className="section-lede">
                We value shipped work, clear communication and ownership. Specialists and high-agency generalists are both welcome to introduce themselves.
              </p>
              <a href="#guild" className="text-link mt-6">
                Apply to the Guild <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="grid gap-x-10 border-t border-cloud-white/15 sm:grid-cols-2 lg:col-span-8">
              {FOUNDERS_GUILD_TRACKS.map((track) => (
                <li key={track.value} className="border-b border-cloud-white/15 py-5">
                  <h3 className="font-display text-lg font-bold text-cloud-white">{track.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cloud-white/80">{track.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="promises-title" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <h2 id="promises-title" className="font-display text-2xl font-bold text-cloud-white">What we promise, and what we don&apos;t</h2>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(([title, copy]) => (
            <div key={title} className="border-l-2 border-antique-gold pl-4">
              <dt className="font-display text-lg font-bold text-cloud-white">{title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-cloud-white/85">{copy}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-12 text-sm text-cloud-white/80">
          Sending a form means you agree to the process above. Read the{" "}
          <Link href="/privacy" className="font-semibold text-antique-gold underline-offset-4 hover:underline">privacy policy</Link> and{" "}
          <Link href="/terms" className="font-semibold text-antique-gold underline-offset-4 hover:underline">terms</Link>.
        </p>
      </section>
    </div>
  );
}
