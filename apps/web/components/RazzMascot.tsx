import Image from "next/image";
import React from "react";

export type MascotPose =
  | "hero-point"
  | "badge-present"
  | "detective"
  | "celebrate"
  | "loading"
  | "default"
  | "app-icon";

interface RazzMascotProps {
  pose?: MascotPose;
  size?: number;
  className?: string;
  alt?: string;
}

const POSE_MAP: Record<MascotPose, { src: string; defaultAlt: string }> = {
  "hero-point": {
    src: "/brand/poses/razz-hero-point.png",
    defaultAlt: "Razz pointing forward enthusiastically",
  },
  "badge-present": {
    src: "/brand/poses/razz-badge-present.png",
    defaultAlt: "Razz presenting shiny gaming badges",
  },
  detective: {
    src: "/brand/poses/razz-detective.png",
    defaultAlt: "Razz investigating suspicious server stats with a magnifying glass",
  },
  celebrate: {
    src: "/brand/poses/razz-celebrate.png",
    defaultAlt: "Razz celebrating victory with confetti and hype",
  },
  loading: {
    src: "/brand/razz-loading.webp",
    defaultAlt: "Razz spinning around happily loading data",
  },
  default: {
    src: "/brand/mascot.png",
    defaultAlt: "Razz the Rank Rascal mascot",
  },
  "app-icon": {
    src: "/brand/app-icon.png",
    defaultAlt: "Rank Rascal App Icon",
  },
};

export const RazzMascot: React.FC<RazzMascotProps> = ({
  pose = "default",
  size = 200,
  className = "",
  alt,
}) => {
  const { src, defaultAlt } = POSE_MAP[pose] || POSE_MAP.default;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt={alt || defaultAlt}
        width={size}
        height={size}
        className="object-contain transition-transform duration-300 hover:scale-105"
        priority={pose === "hero-point" || pose === "default"}
      />
    </div>
  );
};
