import Link from "next/link";
import Image from "next/image";
import { FileText, AlertTriangle, BookOpen, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
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
            Effective Date: September 27, 2026 | Version 1.2
          </p>
        </div>
      </div>

      {!hasSupportEmail && (
        <div className="p-4 rounded-2xl bg-alert-red/10 border border-alert-red/40 text-xs font-mono text-cloud-white flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-alert-red flex-shrink-0" />
          <span>
            <strong>Support mailbox not open yet.</strong> Use the <Link href="/support" className="text-toxic-lime font-bold underline">project support page</Link> for the current contact path.
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
            <span>Explore and critique without bullying</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Share ideas, not sensitive information</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>No impersonation, exploits or cheating</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Label speculation and unconfirmed concepts</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Submissions are human-reviewed</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
            <span>Community forms are for ages 13+</span>
          </li>
        </ul>
      </div>

      {/* Terms Content */}
      <div className="prose prose-invert max-w-none space-y-6 text-sm text-cloud-white/90 leading-relaxed font-sans">
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">1. Acceptance & Age Requirements</h2>
          <p className="text-xs text-muted-text">
            By using rankrascal.lol, submitting feedback, applying to the Founders Guild, or using any Rank Rascal service, you agree to these Terms. Rank Rascal community services are intended for users aged <strong>13 and older</strong>. If you are under 13, you may not submit the website forms.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">2. Community Feedback & Guild Applications</h2>
          <p className="text-xs text-muted-text">
            You keep ownership of ideas and material you submit. You grant Rank Rascal permission to review and use feedback to improve the project. We may quote a comment publicly only when you select the public-quotation option, and we may edit that quote for length or clarity without changing its meaning. A Founders Guild application does not promise acceptance, employment, compensation, ownership, early access or a staff position. We will not require unpaid custom production work solely as an application test; any real work begins only after scope, credit, ownership and compensation are agreed.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">3. Acceptable Use & Conduct Rules</h2>
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
          <h2 className="font-display font-bold text-xl text-cloud-white">4. Non-Monetary Value of Digital Achievements</h2>
          <p className="text-xs text-muted-text">
            Badges, certificates, QA IDs, Rascal Rep, Rotfiles and Flex Cards provided by Rank Rascal are digital recognition items. They possess <strong>zero monetary value</strong>, cannot be converted into currency, sold or traded, and do not create employment, ownership or payment rights.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">5. Founding QA Scout Roster</h2>
          <p className="text-xs text-muted-text">
            A valid game review places the reviewer on the Founding QA Scout roster and may generate a personalized badge, certificate and QA ID. Roster status records an early review contribution. Invitations to playable builds are sent in cohorts and depend on build readiness, age and platform requirements, testing needs, safety capacity and applicable Roblox rules. Roster status does not guarantee a particular build, date, staff role or compensation.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">6. Concepts, Development Targets & Availability</h2>
          <p className="text-xs text-muted-text">
            Concept art, roadmaps and development targets describe intent, not guaranteed final features or release dates. Final game content may change through implementation, testing, platform review and safety work. Legacy bot humor and verdicts are entertainment only and should not be treated as medical, professional, or factual statements.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">7. Service Availability & Termination</h2>
          <p className="text-xs text-muted-text">
            We may pause, change or discontinue website, community, playtest or legacy bot features. The Rank Rascal Discord bot is currently paused and installation is closed.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">8. Third-Party Platform Disclaimers & Trademarks</h2>
          <p className="text-xs text-muted-text">
            Roblox is a trademark of Roblox Corporation. Discord is a trademark of Discord Inc.
          </p>
          <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/80">
            <strong>Mandatory Platform Disclaimer:</strong> Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
          </div>
        </section>

        {/* Section 7 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">9. Limitation of Liability & Contact Information</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal is provided &quot;as is&quot; without warranties of any kind. For questions or legal notices, contact:
          </p>
          <p className="text-xs font-mono text-toxic-lime">
            Email: {supportEmail ? <a href={`mailto:${supportEmail}`} className="underline">{supportEmail}</a> : "not available yet"}
          </p>
        </section>
      </div>
    </div>
  );
}
