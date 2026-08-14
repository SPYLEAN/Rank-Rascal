import Link from "next/link";
import { ShieldCheck, Lock, Trash2, EyeOff, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@rankrascal.com";
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
          Effective Date: August 14, 2026 | Version 1.0
        </p>
      </div>

      {!hasSupportEmail && (
        <div className="p-4 rounded-2xl bg-alert-red/10 border border-alert-red/40 text-xs font-mono text-cloud-white flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-alert-red flex-shrink-0" />
          <span>
            <strong>Deployment Warning:</strong> <code className="text-toxic-lime font-bold">NEXT_PUBLIC_SUPPORT_EMAIL</code> is currently unset in this environment.
          </span>
        </div>
      )}

      {/* Policy Content */}
      <div className="prose prose-invert max-w-none space-y-6 text-sm text-cloud-white/90 leading-relaxed font-sans">
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">1. Information We Collect</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal collects minimal, necessary public identifiers to provide Roblox gaming identity integration on Discord:
          </p>
          <ul className="list-disc pl-5 text-xs font-mono text-cloud-white/80 space-y-1">
            <li><strong>Discord Account Data:</strong> Your Discord User ID, Guild (Server) ID, and channel context.</li>
            <li><strong>Roblox Identity Data:</strong> Verified Roblox User ID, Roblox username, display name, account creation timestamp, public avatar thumbnail URL, public badge count, and public profile visibility setting.</li>
            <li><strong>Rank Rascal Calculated Data:</strong> Rascal Rep score, Rotfile achievements, and server-specific preferences.</li>
            <li><strong>OAuth Processing Data:</strong> Short-lived, state-hashed authorization verifiers during PKCE verification.</li>
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
            <li>Rendering Rotfile identity cards and Drip Inspections in Discord channels</li>
            <li>Calculating server leaderboards and badge milestones</li>
            <li>Enforcing opt-in privacy controls and server-manager configuration settings</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">4. Deletion & /unlink-roblox Behavior</h2>
          <p className="text-xs text-muted-text">
            You hold total control over your data. Running <code className="text-toxic-lime font-mono">/unlink-roblox</code> in Discord instantly and permanently purges your stored Roblox account link, public profile references, and associated Rascal Rep from our database.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">5. Public Profile Visibility & Witness Protection</h2>
          <p className="text-xs text-muted-text">
            By default, public profiles are visible on server leaderboards. Running <code className="text-toxic-lime font-mono">/witness-protection enabled:true</code> hides your profile from server leaderboards (<code className="text-toxic-lime font-mono">/yapping-order</code>) and rival checks (<code className="text-toxic-lime font-mono">/fraudcheck</code>).
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">6. Children & Discord 13+ Requirements</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal is strictly intended for users aged 13 and older in compliance with Discord Terms of Service and COPPA. We do not knowingly collect data from children under 13.
          </p>
        </section>

        {/* Section 7 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">7. Security Controls & Third-Party Platforms</h2>
          <p className="text-xs text-muted-text">
            Rank Rascal implements parameterized database statements, HTTPS encrypted transport, and state-hashed PKCE verifiers.
          </p>
          <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/80">
            <strong>Platform Disclaimer:</strong> Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
          </div>
        </section>

        {/* Section 8 */}
        <section className="p-6 rounded-2xl bg-panel-navy border border-panel-navy-light space-y-3">
          <h2 className="font-display font-bold text-xl text-cloud-white">8. User Rights & Contact Information</h2>
          <p className="text-xs text-muted-text">
            For privacy inquiries, manual data export, or deletion requests, contact our privacy team:
          </p>
          <p className="text-xs font-mono text-toxic-lime">
            Email: <a href={`mailto:${supportEmail}`} className="underline">{supportEmail}</a>
          </p>
        </section>
      </div>
    </div>
  );
}
