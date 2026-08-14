"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CANONICAL_THREE_BADGES, CanonicalBadge } from "@/lib/badge-data";
import { Award, AlertCircle, X, Sparkles, Clock } from "lucide-react";

export const BadgeShelf: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<CanonicalBadge | null>(null);

  return (
    <div className="space-y-8">
      {/* Backend Status Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-panel-navy border border-royal-purple/40 text-xs font-mono text-cloud-white/90 flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 text-toxic-lime flex-shrink-0" />
        <span>
          <strong className="text-toxic-lime font-bold">Badge Earning Notice:</strong> Badge earning is being built. These designs are previews and are not automatically awarded by the Discord bot yet. Rank Rascal badges have zero cash value.
        </span>
      </div>

      {/* Official Illustrated Badges Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-toxic-lime" />
          <div>
            <h3 className="font-display font-extrabold text-2xl text-cloud-white uppercase">
              Official Production Badge Collection
            </h3>
            <p className="text-xs text-muted-text">
              High-resolution 1254px production artwork. All three badges are currently in <strong>Preview</strong> status.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CANONICAL_THREE_BADGES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBadge(b)}
              className="text-left p-6 rounded-3xl bg-panel-navy border-sticker-purple glow-purple transition-all duration-300 hover:-translate-y-1 hover:border-toxic-lime focus:outline-none focus:ring-2 focus:ring-toxic-lime group"
              aria-label={`${b.name} Badge (${b.status} status)`}
            >
              <div className="flex items-start justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-toxic-lime/20 text-toxic-lime border border-toxic-lime/40">
                  {b.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-reward-yellow/20 text-reward-yellow border border-reward-yellow/40 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span className="uppercase">{b.status}</span>
                </span>
              </div>

              <div className="my-4 relative aspect-square w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden bg-midnight-bg/60 p-3 border border-panel-navy-light flex items-center justify-center">
                <Image
                  src={b.image}
                  alt={b.alt}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h4 className="font-display font-bold text-cloud-white text-xl group-hover:text-toxic-lime">
                {b.name}
              </h4>
              <p className="mt-1 text-xs text-muted-text/90 line-clamp-2 leading-relaxed">
                {b.description}
              </p>

              <div className="mt-4 pt-3 border-t border-panel-navy-light/60 text-[11px] font-mono text-cloud-white/70">
                <span>Criterion: {b.criterion}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-bg/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-badge-title"
        >
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-panel-navy border-sticker-purple glow-purple space-y-4">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-midnight-bg border border-panel-navy-light text-cloud-white hover:text-toxic-lime"
              aria-label="Close details modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-midnight-bg p-2 border-2 border-royal-purple flex items-center justify-center flex-shrink-0">
                <Image
                  src={selectedBadge.image}
                  alt={selectedBadge.alt}
                  width={160}
                  height={160}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 id="modal-badge-title" className="font-display font-bold text-xl text-cloud-white">
                  {selectedBadge.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-toxic-lime/20 text-toxic-lime border border-toxic-lime/40">
                    {selectedBadge.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-reward-yellow/20 text-reward-yellow border border-reward-yellow/40 uppercase">
                    {selectedBadge.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-cloud-white/90 leading-relaxed font-sans">{selectedBadge.description}</p>

            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono space-y-1">
              <span className="text-toxic-lime font-bold block">Unlock Criterion:</span>
              <p className="text-muted-text">{selectedBadge.criterion}</p>
              <span className="text-reward-yellow/90 text-[11px] block mt-1">Reason: {selectedBadge.reason}</span>
            </div>

            <div className="p-3 rounded-xl bg-midnight-bg border border-panel-navy-light flex items-center space-x-3">
              <Image
                src={selectedBadge.discordImage}
                alt="Discord format"
                width={36}
                height={36}
                className="object-contain"
              />
              <div className="text-[11px] font-mono text-cloud-white/80">
                <span className="text-royal-purple font-bold block">Discord Badge Asset (256px)</span>
                <span>Optimized for Discord bot embeds & profile popups.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-cloud-white/60">
              <span>Status: <strong className="text-reward-yellow uppercase">Preview</strong></span>
              <span>No Cash Value</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
