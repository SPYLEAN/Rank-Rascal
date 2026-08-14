"use client";

import React, { useState } from "react";
import { Check, Copy, Shield, Lock, Eye, Terminal } from "lucide-react";

export interface CommandCardProps {
  name: string;
  syntax: string;
  description: string;
  category: "Identity & Linking" | "Humor & Flex" | "Leaderboards" | "Privacy & Config";
  privacyIndicator: "Public" | "Ephemeral / Private" | "Witness Protection Aware";
  permissions?: string;
  example?: string;
}

export const CommandCard: React.FC<CommandCardProps> = ({
  name,
  syntax,
  description,
  category,
  privacyIndicator,
  permissions,
  example,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPrivacyIcon = () => {
    switch (privacyIndicator) {
      case "Public":
        return <Eye className="w-3.5 h-3.5 text-toxic-lime" />;
      case "Ephemeral / Private":
        return <Lock className="w-3.5 h-3.5 text-hot-pink" />;
      case "Witness Protection Aware":
        return <Shield className="w-3.5 h-3.5 text-royal-purple" />;
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-panel-navy border-sticker transition-all duration-300 hover:border-royal-purple/60 hover:-translate-y-1">
      {/* Header with syntax and copy */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2 font-mono text-cloud-white font-bold text-lg">
          <Terminal className="w-5 h-5 text-toxic-lime flex-shrink-0" />
          <span className="text-toxic-lime">{name}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white hover:border-toxic-lime transition-colors"
          title="Copy command"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-toxic-lime" />
              <span className="text-toxic-lime font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-muted-text" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax box */}
      <div className="mt-3 p-2.5 rounded-lg bg-midnight-bg font-mono text-xs text-cloud-white/90 border border-panel-navy-light/60">
        <code>{syntax}</code>
      </div>

      {/* Description */}
      <p className="mt-4 text-xs text-muted-text/90 leading-relaxed">{description}</p>

      {/* Example usage if provided */}
      {example && (
        <div className="mt-3 text-xs text-cloud-white/80">
          <span className="font-semibold text-royal-purple font-mono">Example: </span>
          <span className="italic">{example}</span>
        </div>
      )}

      {/* Footer metadata tags */}
      <div className="mt-5 pt-3 border-t border-panel-navy-light/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span className="px-2.5 py-1 rounded-md bg-royal-purple/20 text-royal-purple border border-royal-purple/30 font-semibold">
          {category}
        </span>

        <div className="flex items-center space-x-3">
          {permissions && (
            <span className="px-2 py-0.5 rounded bg-reward-yellow/10 text-reward-yellow text-[11px]">
              {permissions}
            </span>
          )}

          <div className="flex items-center space-x-1 text-cloud-white/70">
            {getPrivacyIcon()}
            <span className="text-[11px]">{privacyIndicator}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
