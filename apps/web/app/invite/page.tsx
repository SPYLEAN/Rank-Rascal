"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import { Sparkles, ExternalLink, ShieldCheck, Clock } from "lucide-react";

// Installation stays closed until the launch gate passes. Set
// NEXT_PUBLIC_INVITE_ENABLED=true only after the worker, OAuth, install URL,
// legal pages and a private-guild test are complete.
const INVITE_ENABLED = process.env.NEXT_PUBLIC_INVITE_ENABLED === "true";

// View Channels, Send Messages, Embed Links, Attach Files, Read Message History.
const INSTALL_PERMISSIONS = "117760";

function resolveInstallUrl(): string | null {
  const customUrl = process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL;
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  if (customUrl && customUrl.startsWith("https://discord.com/")) return customUrl;
  if (clientId && /^\d{15,25}$/.test(clientId.trim())) {
    return `https://discord.com/oauth2/authorize?client_id=${clientId.trim()}&scope=bot%20applications.commands&permissions=${INSTALL_PERMISSIONS}`;
  }
  return null;
}

export default function InvitePage() {
  const [installUrl, setInstallUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!INVITE_ENABLED) return;
    setInstallUrl(resolveInstallUrl());
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker-lime glow-lime space-y-6">
        <div className="relative w-44 h-44 mx-auto">
          <Image
            src={BRAND_ASSETS.poses.celebrate}
            alt="Razz celebrating"
            width={180}
            height={180}
            className="object-contain w-full h-full animate-bounce motion-reduce:animate-none"
            priority
          />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/20 text-toxic-lime text-xs font-mono font-bold border border-toxic-lime/40">
            {INVITE_ENABLED ? <Sparkles className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            <span>{INVITE_ENABLED ? "DISCORD BOT INSTALLATION" : "PRIVATE TESTING"}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-cloud-white uppercase">
            {INVITE_ENABLED ? "Add Rank Rascal to Discord" : "Add Rank Rascal to Discord (Coming Soon)"}
          </h1>
          <p className="text-xs text-muted-text font-mono leading-relaxed max-w-sm mx-auto">
            {INVITE_ENABLED
              ? "Discord's official authorization screen lets you pick the server to add Rank Rascal to."
              : "Rank Rascal is in private testing. Installation opens after safety, privacy and reliability checks are complete."}
          </p>
        </div>

        <div className="pt-2 space-y-3">
          {INVITE_ENABLED && installUrl ? (
            <a
              href={installUrl}
              className="w-full inline-flex items-center justify-center space-x-2 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white py-3.5 px-6 rounded-2xl font-display font-bold text-sm shadow-sticker-lime transition-all"
            >
              <span>Continue to Discord Server Selector</span>
              <ExternalLink className="w-4 h-4 text-toxic-lime" />
            </a>
          ) : (
            <Link
              href="/safety"
              className="w-full inline-flex items-center justify-center space-x-2 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white py-3.5 px-6 rounded-2xl font-display font-bold text-sm shadow-sticker-lime transition-all"
            >
              <span>Read how Rank Rascal keeps servers safe</span>
            </Link>
          )}

          <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-[11px] font-mono text-cloud-white/70 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-toxic-lime flex-shrink-0" />
            <span>Installing requires Manage Server permission on your Discord server.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
