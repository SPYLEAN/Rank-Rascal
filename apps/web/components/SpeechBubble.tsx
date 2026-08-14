import React from "react";

interface SpeechBubbleProps {
  text: string;
  className?: string;
  variant?: "lime" | "purple" | "pink";
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  className = "",
  variant = "lime",
}) => {
  const variantStyles = {
    lime: "bg-midnight-bg border-toxic-lime text-toxic-lime shadow-sticker-lime",
    purple: "bg-midnight-bg border-royal-purple text-cloud-white shadow-sticker-purple",
    pink: "bg-midnight-bg border-hot-pink text-hot-pink shadow-sticker-pink",
  };

  return (
    <div
      className={`relative inline-block px-4 py-2 rounded-2xl border-2 font-mono text-xs font-bold leading-snug ${variantStyles[variant]} ${className}`}
    >
      <span>&quot;{text}&quot;</span>
    </div>
  );
};
