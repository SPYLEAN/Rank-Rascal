import Image from "next/image";
import React from "react";
import { BRAND_ASSETS } from "@/lib/brand-assets";

export type EmojiType = "hype" | "cooked" | "sus" | "win" | "lol" | "loading";

interface FloatingStickerProps {
  emoji?: EmojiType;
  size?: number;
  className?: string;
  borderColor?: string;
}

export const FloatingSticker: React.FC<FloatingStickerProps> = ({
  emoji = "hype",
  size = 44,
  className = "",
  borderColor = "border-toxic-lime",
}) => {
  const emojiSrc = BRAND_ASSETS.emojis[emoji] || BRAND_ASSETS.emojis.hype;

  return (
    <div
      className={`relative inline-flex items-center justify-center p-1.5 rounded-2xl bg-midnight-bg border-2 ${borderColor} shadow-sticker ${className}`}
    >
      <Image
        src={emojiSrc}
        alt=""
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
};
