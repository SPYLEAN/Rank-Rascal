import Link from "next/link";
import { ShieldCheck, Lock, Trash2, EyeOff, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const hasSupportEmail = Boolean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-4 border-b border-panel-navy-light pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Data Protection Policy</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl text-cloud-white">
          Rank Rascal Privacy Policy
        </h1>
        <p className="text-xs font-mono text-muted-text">
          Effective Date: September 27, 2026 | Version 1.2
        </p>
      </div>

      {!hasSupportEmail && (
        <div className="p-4 rounded-2xl bg-alert-red/10 border border-alert-red/40 text-xs font-mono text-cloud-white flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-alert-red flex-shrink-0" />
          <span>
            <strong>Support mailbox not open yet.</strong> Use the <Link href="/support" className="text-toxic-lime font-bold underline">project support page</Link> for the current privacy-request path.
          </span>
        </div>
      )}

      {/* Policy Content */}
      <div className="prose prose-invert max-w-none space-y-6 text-sm text-cloud-white/90 leading-relaxed font-sans">
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">1. Information We Collect</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal collects the minimum information needed to operate the game website, review community submissions and preserve the paused Discord bot project:
          </p>
          <ul className="list-disc pl-5 text-xs font-mono text-cloud-white/80 space-y-1">
            <li><strong>Discord Account Data:</strong> Your Discord User ID, Guild (Server) ID, and channel context.</li>
            <li><strong>Roblox Identity Data:</strong> Verified Roblox User ID, Roblox username, display name, account creation timestamp, public avatar thumbnail URL, public badge count, and public profile visibility setting.</li>
            <li><strong>Rank Rascal Calculated Data:</strong> Rascal Rep score, Rotfile achievements, and server-specific preferences.</li>
            <li><strong>OAuth Processing Data:</strong> Short-lived, state-hashed authorization verifiers during PKCE verification.</li>
            <li><strong>Community Submissions:</strong> Display name, email address, review rating and focus, feedback text, Guild track, portfolio link, availability, time zone, consent choices and submission time when you use the website forms.</li>
            <li><strong>QA Recognition Data:</strong> A generated submission ID and the name printed on your personalized digital badge and certificate.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">2. Token Retention Policy</h2>
          <p className="text-xs text-muted-text">
            We prioritize zero-token retention. After verifying your Roblox identity through PKCE OAuth 2.0, short-lived authorization tokens and access tokens are <strong>immediately discarded</strong>. We do <strong>not</strong> retain or store your Roblox OAuth access tokens, refresh tokens, or passwords.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">3. Purpose of Processing</h2>
          <p className="text-xs text-muted-text">
            Collected data is processed strictly for:
          </p>
          <ul className="list-disc pl-5 text-xs font-mono text-cloud-white/80 space-y-1">
            <li>Reviewing game feedback and responding when contact information is provided</li>
            <li>Registering reviewers on the Founding QA Scout roster and sending their personalized badge and certificate</li>
            <li>Evaluating voluntary Founders Guild and future playtesting participation</li>
            <li>Moderating comments before any approved quotation is published</li>
            <li>Preserving legacy bot privacy controls and account links while the bot project is paused</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">4. Community Submission Storage</h2>
          <p className="text-xs text-muted-text">
            Website submissions and confirmation emails are processed through our transactional email provider and delivered to a private Rank Rascal team mailbox. A private Discord webhook may also provide a moderator-only notification copy. Submissions are not published automatically. We retain them only as long as needed for review, QA roster operations, follow-up, moderation records or team selection. Do not submit passwords, precise addresses, private Roblox account data, payment information or other sensitive personal information.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">5. Deletion & Legacy Bot Data</h2>
          <p className="text-xs text-muted-text">
            The Discord bot project is paused, but previously collected bot data remains subject to deletion. If the bot is available, <code className="text-toxic-lime font-mono">/unlink-roblox</code> purges the stored Roblox account link and associated profile data. You may also request deletion of bot or community-submission data through the support path listed below.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">6. Public Profile Visibility & Comment Permission</h2>
          <p className="text-xs text-muted-text">
            Legacy bot profiles retain their existing privacy setting while the bot is paused. Community comments are private by default. Checking the public-quotation box gives the team permission to quote that submission with the supplied display name, but does not guarantee publication. A human reviews every quotation first.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">7. Age Requirement</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal and its community forms are intended for users aged 13 and older. We do not knowingly collect data from children under 13.
          </p>
        </section>

        {/* Section 7 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">8. Security Controls & Third-Party Platforms</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal uses HTTPS encrypted transport, input validation, rate controls and restricted server-side credentials. Transactional email is delivered through Resend; Discord may be used for private moderator notifications. Those providers process the minimum delivery data required for the service.
          </p>
          <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/80">
            <strong>Platform Disclaimer:</strong> Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
          </div>
        </section>

        {/* Section 8 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">9. User Rights & Contact Information</h2>
          <p className="text-xs text-muted-text">
            For privacy inquiries, manual data export, or deletion requests, contact our privacy team:
          </p>
          <p className="text-xs font-mono text-toxic-lime">
            Email: {supportEmail ? <a href={`mailto:${supportEmail}`} className="underline">{supportEmail}</a> : "not available yet"}
          </p>
        </section>
      </div>
    </div>
  );
}
