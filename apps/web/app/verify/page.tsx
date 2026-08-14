import React from "react";
import Image from "next/image";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { ShieldCheck, Lock, CheckCircle2, EyeOff, Award } from "lucide-react";

export default function VerifyGuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero section with Privacy Guardian Mascot */}
      <div className="p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <Image
            src={BRAND_ASSETS.websiteArt.privacyGuardian}
            alt="Razz protects a verified profile with a privacy shield and key."
            width={450}
            height={675}
            className="w-full h-auto max-w-xs object-contain rounded-2xl"
            priority
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Roblox OAuth Security & Privacy</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase">
            VERIFIED FLEX. PRIVATE WHEN YOU WANT IT.
          </h1>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Rank Rascal uses official OAuth 2.0 PKCE authentication. Your password is entered exclusively on Roblox.com and is never visible to or stored by Rank Rascal.
          </p>

          <ul className="space-y-3 text-xs font-mono text-cloud-white/90">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Roblox handles passwords exclusively</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Rank Rascal never requests a Roblox password</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Witness Protection hides profiles from public rankings</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Users can unlink their account anytime with /unlink-roblox</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
              <span>Verified game data and humorous verdicts are clearly separated</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Security Promises */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-3">
          <div className="w-10 h-10 rounded-xl bg-toxic-lime/20 border border-toxic-lime/40 flex items-center justify-center text-toxic-lime">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-cloud-white">No Passwords Requested</h3>
          <p className="text-xs text-muted-text leading-relaxed">
            Authentication occurs on Roblox.com. Rank Rascal never receives, prompts for, or stores your Roblox password or security credentials.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-3">
          <div className="w-10 h-10 rounded-xl bg-royal-purple/20 border border-royal-purple/40 flex items-center justify-center text-royal-purple">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-cloud-white">PKCE OAuth Security</h3>
          <p className="text-xs text-muted-text leading-relaxed">
            Short-lived authorization tokens with state hashing prevent forgery. Access tokens are discarded after identity verification.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-3">
          <div className="w-10 h-10 rounded-xl bg-hot-pink/20 border border-hot-pink/40 flex items-center justify-center text-hot-pink">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-cloud-white">Witness Protection Control</h3>
          <p className="text-xs text-muted-text leading-relaxed">
            Control your privacy at any time using <code className="text-toxic-lime font-mono">/witness-protection</code>. Opt out of public leaderboards whenever you want.
          </p>
        </div>
      </div>

      {/* Step-by-Step Verification Flow & Successful Verification Showcase */}
      <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display font-bold text-2xl text-cloud-white">
            How to Link Your Roblox Profile
          </h2>

          <div className="space-y-4 text-xs font-mono text-cloud-white/90">
            <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light flex items-start space-x-3">
              <span className="px-2.5 py-1 rounded bg-royal-purple text-cloud-white font-bold">1</span>
              <div>
                <p className="font-bold text-cloud-white text-sm">Run /link-roblox in Discord</p>
                <p className="text-muted-text mt-1">
                  The bot sends a private ephemeral message containing a secure Roblox OAuth link.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light flex items-start space-x-3">
              <span className="px-2.5 py-1 rounded bg-hot-pink text-cloud-white font-bold">2</span>
              <div>
                <p className="font-bold text-cloud-white text-sm">Authorize on Roblox.com</p>
                <p className="text-muted-text mt-1">
                  Review permissions on Roblox&apos;s official OAuth screen and confirm ownership.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-midnight-bg border border-panel-navy-light flex items-start space-x-3">
              <span className="px-2.5 py-1 rounded bg-toxic-lime text-midnight-bg font-bold">3</span>
              <div>
                <p className="font-bold text-cloud-white text-sm">Receive Verified Rotfile & Badges</p>
                <p className="text-muted-text mt-1">
                  Rank Rascal records your public Roblox ID and presents your verified Rotfile & initial badge unlocks!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Success Showcase with razz-celebrate */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-midnight-bg border-sticker-lime text-center space-y-4 glow-lime relative overflow-hidden">
          <div className="relative w-52 h-52 mx-auto">
            <Image
              src={BRAND_ASSETS.poses.celebrate}
              alt="Razz celebrating successful Roblox identity verification"
              width={220}
              height={220}
              className="object-contain w-full h-full animate-bounce motion-reduce:animate-none"
              priority
            />
          </div>
          <div className="space-y-1.5 z-10 relative">
            <span className="px-3 py-1.5 rounded-full bg-toxic-lime/20 text-toxic-lime text-xs font-mono font-bold border border-toxic-lime/40 uppercase tracking-wider inline-flex items-center space-x-1.5">
              <span>✨ VERIFICATION SUCCESSFUL</span>
            </span>
            <p className="text-xs text-cloud-white/90 font-mono mt-2 font-semibold">
              &quot;Roblox identity linked! Your Rotfile and badges are ready!&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
