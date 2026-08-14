import Link from "next/link";
import { RotfilePreview } from "@/components/RotfilePreview";
import { ShieldCheck, CheckCircle2, Award, Terminal, ArrowLeft } from "lucide-react";

export default function RobloxIntegrationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div>
        <Link
          href="/games"
          className="inline-flex items-center space-x-2 text-xs font-mono text-toxic-lime hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games Hub</span>
        </Link>
        <div className="flex items-center space-x-3">
          <h1 className="font-display font-extrabold text-4xl text-cloud-white">
            Roblox Integration Guide
          </h1>
          <span className="px-3 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
            LIVE NOW
          </span>
        </div>
        <p className="text-muted-text text-base mt-2 max-w-3xl">
          Learn how Rank Rascal securely interfaces with Roblox APIs using OAuth 2.0 PKCE to create verified identity cards and server competition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-panel-navy border-sticker space-y-3">
            <h3 className="font-display font-bold text-lg text-cloud-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-toxic-lime" />
              <span>Official Roblox OAuth 2.0 PKCE</span>
            </h3>
            <p className="text-xs text-muted-text leading-relaxed">
              When users run <code className="text-toxic-lime font-mono">/link-roblox</code>, Rank Rascal directs them to Roblox&apos;s official authorization domain with <code className="text-toxic-lime font-mono">openid profile</code> scopes. Passwords are entered exclusively on Roblox.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-panel-navy border-sticker space-y-3">
            <h3 className="font-display font-bold text-lg text-cloud-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-reward-yellow" />
              <span>Supported Public Profile Data</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono text-cloud-white/90">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
                <span>Authenticated Roblox User ID & Username</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
                <span>Display Name & Account Creation Date</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
                <span>Avatar Headshot PNG URL</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime" />
                <span>Public Badge Count & Milestones</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <RotfilePreview />
        </div>
      </div>
    </div>
  );
}
