import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Award, Flame, Calendar, Sparkles } from "lucide-react";

export const RotfilePreview: React.FC = () => {
  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-panel-navy border-sticker-purple glow-purple max-w-md mx-auto transform rot-tilt-left transition-transform duration-300 hover:rotate-0">
      {/* Verified Badge Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-toxic-lime/10 border border-toxic-lime/40 px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4 text-toxic-lime" />
          <span className="text-xs font-mono font-bold text-toxic-lime tracking-wide">
            VERIFIED ROTFILE
          </span>
        </div>
        <span className="text-xs font-mono text-cloud-white/60">#RR-8849</span>
      </div>

      {/* Avatar & User Details */}
      <div className="mt-6 flex items-center space-x-4">
        <div className="relative w-20 h-20 rounded-2xl bg-midnight-bg border-2 border-royal-purple p-1 overflow-hidden shadow-sticker">
          <Image
            src="/brand/emojis/rascal-win.png"
            alt="Roblox Avatar Preview"
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
          <div className="absolute bottom-0 right-0 bg-toxic-lime p-0.5 rounded-tl-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-midnight-bg" />
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-cloud-white text-xl flex items-center space-x-2">
            <span>BloxLegend_2026</span>
          </h3>
          <p className="text-xs text-muted-text font-mono">@BloxLegend (Display: NoobSlayer)</p>
          <div className="mt-2 flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center space-x-1 text-reward-yellow">
              <Award className="w-3.5 h-3.5" />
              <span>342 Badges</span>
            </span>
            <span className="flex items-center space-x-1 text-hot-pink">
              <Flame className="w-3.5 h-3.5" />
              <span>85 Rep</span>
            </span>
          </div>
        </div>
      </div>

      {/* Drip Verdict Box */}
      <div className="mt-6 p-4 rounded-xl bg-midnight-bg border border-panel-navy-light space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-royal-purple font-semibold flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-toxic-lime" />
            <span>DRIP VERDICT</span>
          </span>
          <span className="text-toxic-lime font-bold">CERTIFIED HEAT 🔥</span>
        </div>
        <p className="text-xs text-cloud-white/90 italic font-mono leading-relaxed">
          &quot;Avatar is rocking pristine 2018 neon accessories. Certified server brain rot approved.&quot;
        </p>
      </div>

      {/* Footer stats */}
      <div className="mt-5 flex items-center justify-between text-[11px] font-mono text-cloud-white/60 pt-3 border-t border-panel-navy-light/60">
        <span className="flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5 text-muted-text" />
          <span>Roblox Joined: Jan 2019</span>
        </span>
        <span className="text-toxic-lime font-semibold">Witness Protection: OFF</span>
      </div>
    </div>
  );
};
