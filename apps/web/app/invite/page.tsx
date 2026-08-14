"use client";

import React, { useEffect } from "react";
import { RazzMascot } from "@/components/RazzMascot";
import { Sparkles, ExternalLink } from "lucide-react";

export default function InviteRedirectPage() {
  const installUrl =
    process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL ||
    "https://discord.com/oauth2/authorize?client_id=DISCORD_CLIENT_ID&scope=bot%20applications.commands&permissions=117760";

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL) {
      window.location.href = process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL;
    }
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="p-8 rounded-3xl bg-panel-navy border-sticker-lime glow-lime space-y-6">
        <RazzMascot pose="celebrate" size={180} className="mx-auto" />
        <h1 className="font-display font-extrabold text-3xl text-cloud-white">
          Add Rank Rascal to Discord
        </h1>
        <p className="text-xs text-muted-text font-mono leading-relaxed">
          Redirecting to the official Discord authorization portal...
        </p>

        <div className="pt-2">
          <a
            href={installUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 bg-royal-purple text-cloud-white py-3 px-6 rounded-2xl font-display font-bold text-sm shadow-sticker-lime hover:bg-royal-purple/90"
          >
            <span>Continue to Discord Invite</span>
            <ExternalLink className="w-4 h-4 text-toxic-lime" />
          </a>
        </div>
      </div>
    </div>
  );
}
