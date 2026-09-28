import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Safety",
  description: "The safety and participation rules for the Rascal Realms pre-launch community.",
};

const rules = [
  "Critique the work, never the person behind it.",
  "No harassment, dog-piling, hate speech, threats, or sexual content.",
  "Do not share private information—yours or anyone else’s.",
  "No scams, impersonation, cheating tools, gambling, or exploit promotion.",
  "Keep story speculation clearly separate from confirmed game information.",
  "Report harmful behavior; do not turn moderation into public spectacle.",
];

const boundaries = [
  {
    title: "Pre-launch, not a promise machine",
    body: "Concepts, names, balance ideas, dates, and visuals can change. Devlogs distinguish confirmed work from exploration so feedback stays grounded.",
  },
  {
    title: "Feedback is reviewed privately",
    body: "Website submissions go to a private team inbox. Nothing is published as a quote unless the sender explicitly opts in, and opting in never guarantees publication.",
  },
  {
    title: "Founders Guild is 13+",
    body: "The website feedback and Guild interest forms are for people aged 13 or older. Joining the interest list is not employment, payment, access, or a launch guarantee.",
  },
  {
    title: "No sensitive information",
    body: "Never submit passwords, precise locations, financial information, government identifiers, or private account credentials. We will never ask for them through a community form.",
  },
  {
    title: "Roblox rules still apply",
    body: "Any eventual play experience and community activity must follow Roblox’s platform rules in addition to our own. Exploits and bypasses are not part of testing.",
  },
  {
    title: "Razz is a fictional guide",
    body: "Razz is a character—not a person, therapist, authority, or source of medical advice. If someone may be in danger, contact a trusted adult or local emergency support.",
  },
];

export default function SafetyPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid items-center gap-8 border border-sticker-purple bg-panel-navy p-8 glow-purple sm:p-12 lg:grid-cols-12">
        <div className="flex justify-center lg:col-span-4">
          <Image
            src="/brand/website-art/razz-rulebook.png"
            alt="Razz reading the community rulebook"
            width={400}
            height={533}
            className="h-auto w-full max-w-xs border border-royal-purple/25 object-contain"
            priority
          />
        </div>
        <div className="space-y-6 lg:col-span-8">
          <div className="section-kicker">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Community safety
          </div>
          <h1 className="section-title">Build the mystery. Protect the people.</h1>
          <p className="section-lede">
            Rascal Realms can hold tension, suspicion, secrets, and difficult choices without turning its real community cruel. The fiction gets sharp; participation stays respectful.
          </p>
          <div className="border-l-2 border-toxic-lime bg-midnight-bg p-5">
            <div className="mb-3 flex items-center gap-2 font-mono text-sm font-bold uppercase text-toxic-lime">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              The Rascal Rules
            </div>
            <ul className="grid gap-3 text-sm text-cloud-white/90 sm:grid-cols-2">
              {rules.map((rule) => (
                <li key={rule} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-toxic-lime" aria-hidden="true" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="boundaries-title" className="space-y-6">
        <div className="max-w-3xl">
          <p className="section-kicker">Participation boundaries</p>
          <h2 id="boundaries-title" className="section-title mt-3">Clear rules for a serious creative community.</h2>
        </div>
        <div className="grid gap-px border border-panel-navy-light bg-panel-navy-light md:grid-cols-2 lg:grid-cols-3">
          {boundaries.map((boundary, index) => (
            <article key={boundary.title} className="bg-panel-navy p-6">
              <p className="font-mono text-xs font-bold text-toxic-lime">0{index + 1}</p>
              <h3 className="mt-3 font-display text-lg font-bold text-cloud-white">{boundary.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-text">{boundary.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-l-2 border-hot-pink bg-panel-navy p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-hot-pink" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-cloud-white">Need help with a submission or safety concern?</h2>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-text">
          Send only the details needed to understand the issue. For immediate danger, contact local emergency services or a trusted person who can help in the real world.
        </p>
        <Link href="/support" className="action-primary mt-6 bg-hot-pink text-white">
          Contact project support
        </Link>
      </section>
    </main>
  );
}
