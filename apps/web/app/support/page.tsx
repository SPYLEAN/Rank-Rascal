import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Mail, MessageSquareText, ShieldCheck } from "lucide-react";
import { RazzMascot } from "@/components/RazzMascot";

export const metadata: Metadata = { title: "Support" };

export default function SupportPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="text-center">
        <RazzMascot pose="detective" size={180} className="mx-auto" />
        <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-toxic-lime"><HelpCircle className="h-4 w-4" aria-hidden="true" />Support</div>
        <h1 className="mt-4 font-display text-5xl font-extrabold uppercase text-cloud-white sm:text-6xl">Need a human?</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-text">Use the community inbox for game feedback and Guild questions. Privacy, deletion and security requests receive separate handling.</p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="border-l-2 border-hot-pink bg-panel-navy p-7">
          <MessageSquareText className="h-7 w-7 text-hot-pink" aria-hidden="true" />
          <h2 className="mt-5 font-display text-2xl font-bold text-cloud-white">Game feedback & Guild</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-text">Share ideas, report confusing design, register playtest interest or apply to help build the project.</p>
          <Link href="/community" className="action-primary mt-6">Open community inbox</Link>
        </article>
        <article className="border-l-2 border-toxic-lime bg-panel-navy p-7">
          <Mail className="h-7 w-7 text-toxic-lime" aria-hidden="true" />
          <h2 className="mt-5 font-display text-2xl font-bold text-cloud-white">Privacy, deletion & security</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-text">Do not include passwords or secret tokens. Provide only enough information for the team to identify your request.</p>
          {supportEmail ? (
            <a href={`mailto:${supportEmail}`} className="action-secondary mt-6 font-mono text-sm text-toxic-lime">{supportEmail}</a>
          ) : (
            <p className="mt-6 border-l-2 border-reward-yellow bg-reward-yellow/5 p-4 text-sm text-reward-yellow">The support mailbox is not open yet. Use the community form and start your message with “Privacy request”.</p>
          )}
        </article>
      </div>

      <div className="mt-8 flex gap-3 border border-royal-purple/35 bg-royal-purple/5 p-5 text-sm leading-relaxed text-cloud-white/80">
        <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-toxic-lime" aria-hidden="true" />
        <p>The Discord bot is paused. Its installation is closed, but preserved bot data remains covered by the privacy policy and deletion process.</p>
      </div>
    </div>
  );
}
