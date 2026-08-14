import Link from "next/link";
import Image from "next/image";
import { FileText, AlertTriangle, BookOpen, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@rankrascal.com";
  const hasSupportEmail = Boolean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header with Razz Rulebook Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-panel-navy border-sticker flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Image
          src="/brand/website-art/razz-rulebook.png"
          alt="Razz carefully reads a giant rulebook."
          width={140}
          height={186}
          className="object-contain flex-shrink-0"
        />
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-hot-pink/10 border border-hot-pink/40 text-hot-pink font-mono text-xs font-bold uppercase">
            <FileText className="w-4 h-4" />
            <span>Terms of Service Agreement</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-cloud-white">
            Rank Rascal Terms of Service
          </h1>
          <p className="text-xs font-mono text-muted-text">
            Effective Date: August 14, 2026 | Version 1.0
          </p>
        </div>
      </div>

      {!hasSupportEmail && (
        <div className="p-4 rounded-2xl bg-alert-red/10 border border-alert-red/40 text-xs font-mono text-cloud-white flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-alert-red flex-shrink-0" />
          <span>
            <strong>Deployment Warning:</strong> <code className="text-toxic-lime font-bold">NEXT_PUBLIC_SUPPORT_EMAIL</code> is currently unset in this environment.
          </span>
        </div>
      )}

      {/* RASCAL RULES SUMMARY BOX */}
      <div className="p-6 rounded-2xl bg-panel-navy border border-toxic-lime/40 space-y-3 font-mono text-xs text-cloud-white">
        <div className="flex items-center space-x-2 text-toxic-lime font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>THE RASCAL RULES SUMMARY</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-cloud-white/90">
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Compete without bullying</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Flex achievements, not personal information</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>No impersonation or cheating</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Rivalries must remain friendly and opt-in</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Report harmful behavior</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Rank Rascal is for Discord users aged 13+</span>
          </li>
        </ul>
      </div>

      {/* Terms Content */}
      <div className="prose prose-invert max-w-none space-y-6 text-sm text-cloud-white/90 leading-relaxed font-sans">
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">1. Acceptance & Age Requirements</h2>
          <p className="text-xs text-muted-text">
            By installing, inviting, or using Rank Rascal in any Discord server, you agree to these Terms of Service. Rank Rascal is strictly intended for Discord users aged <strong>13 and older</strong>. If you are under 13, you may not access or use Rank Rascal.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">2. Acceptable Use & Conduct Rules</h2>
          <p className="text-xs text-muted-text">
            Users must engage respectfully. You expressly agree NOT to:
          </p>
          <ul className="list-disc pl-5 text-xs font-mono text-cloud-white/80 space-y-1">
            <li>Use Rank Rascal to bully, dog-pile, humiliate, harass, or attack targeted community members</li>
            <li>Impersonate other players or cheat/manipulate OAuth verifications</li>
            <li>Attempt to bypass security boundaries or extract secret tokens</li>
            <li>Engage in illegal activity or real-money wagering</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">3. Non-Monetary Value of Digital Achievements</h2>
          <p className="text-xs text-muted-text">
            Badges, Rascal Rep, Rotfiles, and Flex Cards provided by Rank Rascal are strictly digital Discord social achievements. They possess <strong>zero monetary value</strong>, cannot be converted into currency, sold, or traded.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">4. Verified Data vs. Humorous Verdicts</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal displays verified public profile identifiers fetched from Roblox APIs. Drip Check verdicts and humor outputs are entertainment calculations only and should not be taken as medical, professional, or factual statements.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">5. Service Availability & Termination</h2>
          <p className="text-xs text-muted-text">
            We reserve the right to suspend or terminate bot access for servers or users violating these Terms or engaging in abusive behavior without prior notice.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">6. Third-Party Platform Disclaimers & Trademarks</h2>
          <p className="text-xs text-muted-text">
            Roblox is a trademark of Roblox Corporation. Discord is a trademark of Discord Inc. Fortnite is a trademark of Epic Games. VALORANT is a trademark of Riot Games.
          </p>
          <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/80">
            <strong>Mandatory Platform Disclaimer:</strong> Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
          </div>
        </section>

        {/* Section 7 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">7. Limitation of Liability & Contact Information</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal is provided &quot;as is&quot; without warranties of any kind. For questions or legal notices, contact:
          </p>
          <p className="text-xs font-mono text-toxic-lime">
            Email: <a href={`mailto:${supportEmail}`} className="underline">{supportEmail}</a>
          </p>
        </section>
      </div>
    </div>
  );
}
