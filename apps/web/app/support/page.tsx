import Link from "next/link";
import { RazzMascot } from "@/components/RazzMascot";
import { HelpCircle, Mail, MessageSquare, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";

export default function SupportPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@rankrascal.com";
  const hasSupportEmail = Boolean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL);
  const discordInviteUrl = process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || "/invite";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <RazzMascot pose="detective" size={160} className="mx-auto" />
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
          <HelpCircle className="w-4 h-4" />
          <span>Support & Community Help</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-cloud-white">
          Rank Rascal Support Center
        </h1>
        <p className="text-muted-text text-base leading-relaxed">
          Need help linking your Roblox profile, configuring server humor levels, or submitting feedback? We&apos;re here to help.
        </p>
      </div>

      {!hasSupportEmail && (
        <div className="p-4 rounded-2xl bg-alert-red/10 border border-alert-red/40 text-xs font-mono text-cloud-white flex items-center space-x-3 max-w-2xl mx-auto">
          <AlertTriangle className="w-5 h-5 text-alert-red flex-shrink-0" />
          <span>
            <strong>Deployment Warning:</strong> <code className="text-toxic-lime font-bold">NEXT_PUBLIC_SUPPORT_EMAIL</code> is currently unset in this environment.
          </span>
        </div>
      )}

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Email Support */}
        <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-royal-purple/20 border border-royal-purple/40 flex items-center justify-center text-royal-purple mx-auto sm:mx-0">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-cloud-white">Direct Email Support</h3>
          <p className="text-xs text-muted-text leading-relaxed">
            For account inquiries, data deletion requests, or technical assistance:
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="inline-block px-4 py-2 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-toxic-lime font-semibold hover:border-toxic-lime"
          >
            {supportEmail}
          </a>
        </div>

        {/* Discord Support Community */}
        <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-hot-pink/20 border border-hot-pink/40 flex items-center justify-center text-hot-pink mx-auto sm:mx-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-cloud-white">Community & Server Install</h3>
          <p className="text-xs text-muted-text leading-relaxed">
            Get help from community members or invite Rank Rascal directly into your server:
          </p>
          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-xl bg-royal-purple text-cloud-white font-mono text-xs font-semibold hover:bg-royal-purple/90"
          >
            Add Rank Rascal Bot (Coming Soon) →
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker-purple space-y-6 max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-2xl text-cloud-white">Frequently Asked Questions</h2>
        <div className="space-y-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light space-y-1">
            <h4 className="font-bold text-cloud-white">Q: Does Rank Rascal ever ask for my Roblox password?</h4>
            <p className="text-muted-text">A: Never. Rank Rascal uses official OAuth 2.0 PKCE authentication. You log in exclusively on Roblox.com.</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light space-y-1">
            <h4 className="font-bold text-cloud-white">Q: How do I remove my data?</h4>
            <p className="text-muted-text">A: Run <code className="text-toxic-lime">/unlink-roblox</code> in Discord to immediately purge your linked profile from our database.</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light space-y-1">
            <h4 className="font-bold text-cloud-white">Q: How do I hide my stats from server leaderboards?</h4>
            <p className="text-muted-text">A: Run <code className="text-toxic-lime">/witness-protection enabled:true</code> to opt out of public discovery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
