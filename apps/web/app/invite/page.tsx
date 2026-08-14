"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { Sparkles, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";

export default function InviteRedirectPage() {
  const searchParams = useSearchParams();
  const isMissingId = searchParams.get("status") === "missing_id";
  const [directUrl, setDirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const customUrl = process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL;
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

    if (customUrl && customUrl.startsWith("https://discord.com")) {
      setDirectUrl(customUrl);
      window.location.href = customUrl;
    } else if (clientId && !clientId.includes("YOUR_")) {
      const generatedUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot%20applications.commands&permissions=277025770560`;
      setDirectUrl(generatedUrl);
      window.location.href = generatedUrl;
    }
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker-lime glow-lime space-y-6">
        <div className="relative w-44 h-44 mx-auto">
          <Image
            src={BRAND_ASSETS.poses.celebrate}
            alt="Razz celebrating Discord Bot installation"
            width={180}
            height={180}
            className="object-contain w-full h-full animate-bounce motion-reduce:animate-none"
            priority
          />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/20 text-toxic-lime text-xs font-mono font-bold border border-toxic-lime/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCORD BOT INSTALLATION</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-cloud-white uppercase">
            Add Rank Rascal to Discord
          </h1>
          <p className="text-xs text-muted-text font-mono leading-relaxed max-w-sm mx-auto">
            Opening Discord&apos;s official Bot Authorization portal so you can select the server you wish to add Rank Rascal to.
          </p>
        </div>

        {isMissingId ? (
          <div className="p-4 rounded-2xl bg-reward-yellow/10 border border-reward-yellow/40 text-left space-y-2 text-xs font-mono text-cloud-white">
            <div className="flex items-center space-x-2 text-reward-yellow font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Vercel Configuration Notice</span>
            </div>
            <p className="text-muted-text leading-relaxed">
              Your Vercel environment needs your bot&apos;s Application ID before the invite link can open.
            </p>
            <div className="p-2.5 rounded-xl bg-midnight-bg border border-panel-navy-light text-[11px] space-y-1">
              <span className="text-toxic-lime font-bold block">Action Required in Vercel:</span>
              <p>Add Key: <code className="text-cloud-white font-bold">DISCORD_CLIENT_ID</code></p>
              <p>Value: <code className="text-cloud-white">Your 18-19 digit Discord Application ID</code></p>
            </div>
          </div>
        ) : null}

        <div className="pt-2 space-y-3">
          <a
            href={directUrl || "/api/invite"}
            className="w-full inline-flex items-center justify-center space-x-2 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white py-3.5 px-6 rounded-2xl font-display font-bold text-sm shadow-sticker-lime transition-all"
          >
            <span>Continue to Discord Server Selector</span>
            <ExternalLink className="w-4 h-4 text-toxic-lime" />
          </a>

          <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-[11px] font-mono text-cloud-white/70 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-toxic-lime flex-shrink-0" />
            <span>Requires Manage Server permission on your target Discord server.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
