/**
 * Rank Rascal Centralized Brand Asset Manifest
 * All brand image paths, mascot poses, Discord emojis, animations, and website art.
 * Every path maps to a verified file inside apps/web/public/.
 */

export const BRAND_ASSETS = {
  // Core Logos & Icons
  logoLockup: "/brand/logo-lockup.png",
  appIcon: "/brand/app-icon.png",
  favicon: "/favicon.ico",
  appleTouchIcon: "/brand/apple-touch-icon.png",
  icon192: "/brand/icon-192.png",
  icon512: "/brand/icon-512.png",

  // Mascot Standard
  mascotDefault: "/brand/mascot.png",

  // Mascot Poses
  poses: {
    heroPoint: "/brand/poses/razz-hero-point.png",
    badgePresent: "/brand/poses/razz-badge-present.png",
    detective: "/brand/poses/razz-detective.png",
    celebrate: "/brand/poses/razz-celebrate.png",
    contact: "/brand/poses/razz-poses-contact.png",
  },

  // Discord Emojis
  emojis: {
    hype: "/brand/emojis/discord/rascal-hype.png",
    cooked: "/brand/emojis/discord/rascal-cooked.png",
    sus: "/brand/emojis/discord/rascal-sus.png",
    win: "/brand/emojis/discord/rascal-win.png",
    lol: "/brand/emojis/discord/rascal-lol.png",
    loading: "/brand/emojis/discord/rascal-loading.png",
  },

  // Animations
  animation: {
    loadingWebp: "/brand/animation/razz-loading.webp",
    loadingGif: "/brand/animation/razz-loading.gif",
  },

  // Website Art Illustrations
  websiteArt: {
    whyDifferent: "/brand/website-art/razz-why-different.png",
    rewardMachine: "/brand/website-art/razz-reward-machine.png",
    privacyGuardian: "/brand/website-art/razz-privacy-guardian.png",
    rulebook: "/brand/website-art/razz-rulebook.png",
    tacticalBanner: "/brand/website-art/razz-tactical-coming-soon-banner.png",
    battleRoyaleBanner: "/brand/website-art/razz-battle-royale-coming-soon-banner.png",
    communityClubhouse: "/brand/website-art/razz-community-clubhouse-banner.png",
  },
} as const;

export type BrandAssetPath = string;
