/**
 * Rank Rascal Centralized Brand Asset Manifest
 * All brand image paths, mascot poses, Discord emojis, animations, badges, and website art.
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
    loadStatic: "/brand/animation/razz-load-01.png",
  },

  // Discord Emojis (Expressive UI Accents)
  emojis: {
    hype: "/brand/emojis/discord/rascal-hype.png",
    cooked: "/brand/emojis/discord/rascal-cooked.png",
    sus: "/brand/emojis/discord/rascal-sus.png",
    win: "/brand/emojis/discord/rascal-win.png",
    lol: "/brand/emojis/discord/rascal-lol.png",
    loading: "/brand/emojis/discord/rascal-loading.png",
  },

  // Animations & GIFs (3-second slow loop)
  animation: {
    loadingSlowWebp: "/brand/animation/razz-loading-slow.webp",
    loadingSlowGif: "/brand/animation/razz-loading-slow.gif",
    loadingWebp: "/brand/animation/razz-loading.webp",
    loadingGif: "/brand/animation/razz-loading.gif",
    loadStatic: "/brand/animation/razz-load-01.png",
  },

  // Official Badge Artwork (3 Canonical Badges)
  badges: {
    questCrusader: "/brand/badges/quest-crusader.png",
    dripMonarch: "/brand/badges/drip-monarch.png",
    veteranNoob: "/brand/badges/veteran-noob.png",
    questCrusader256: "/brand/badges/discord/quest-crusader-256.png",
    dripMonarch256: "/brand/badges/discord/drip-monarch-256.png",
    veteranNoob256: "/brand/badges/discord/veteran-noob-256.png",
    badgePackPreview: "/brand/badges/badge-pack-preview.png",
  },

  // Website Art Illustrations
  websiteArt: {
    whyDifferent: "/brand/website-art/razz-why-different.png",
    rewardMachine: "/brand/website-art/razz-reward-machine.png",
    privacyGuardian: "/brand/website-art/razz-privacy-guardian.png",
    rulebook: "/brand/website-art/razz-rulebook.png",
    communityClubhouse: "/brand/website-art/razz-community-clubhouse-banner.png",
  },

  // Rascal Realms pre-production art approved for the public game site.
  game: {
    stickerwoodKeyArt: "/brand/game/stickerwood-key-art-v1.png",
    worldLiesUi: "/brand/game/world-lies-ui-v1.png",
    stickerwoodEnemiesBoss: "/brand/game/stickerwood-enemies-boss-v1.png",
    foundersGuildWorkshop: "/brand/game/founders-guild-workshop-v1.png",
    qaTruthLab: "/brand/game/qa-truth-lab-v1.png",
    fractureBeneathStickerwood: "/brand/game/fracture-beneath-stickerwood-v1.png",
  },

  // World location environment art (2025-09-28 pre-production pass).
  locations: {
    stickerwoodHeartwood: "/brand/game/locations/stickerwood-heartwood-v1.png",
    mysteryForest: "/brand/game/locations/mystery-forest-v1.png",
    ancientTree: "/brand/game/locations/ancient-tree-v1.png",
    rascalPlazaRealm: "/brand/game/locations/rascal-plaza-realm-v1.png",
    hiddenCove: "/brand/game/locations/hidden-cove-v1.png",
    glitchGrove: "/brand/game/locations/glitch-grove-v1.png",
    kingWrongwayCitadel: "/brand/game/locations/king-wrongway-citadel-v1.png",
    skyBridges: "/brand/game/locations/sky-bridges-v1.png",
  },

  // Crownfall teaser derivatives. The 29 MB master never ships; see
  // docs/rascal-realms/TEASER_EXPORT_SPEC.md and scripts/encode-teaser.sh.
  media: {
    heroWebm: "/media/rascal-realms-crownfall-hero.webm",
    heroMp4: "/media/rascal-realms-crownfall-hero.mp4",
    heroMobileWebm: "/media/rascal-realms-crownfall-hero-mobile.webm",
    heroMobileMp4: "/media/rascal-realms-crownfall-hero-mobile.mp4",
    poster: "/media/rascal-realms-crownfall-poster.webp",
    posterMobile: "/media/rascal-realms-crownfall-poster-mobile.webp",
    teaserWebm: "/media/rascal-realms-crownfall-teaser.webm",
    teaserMp4: "/media/rascal-realms-crownfall-teaser.mp4",
    teaserPoster: "/media/rascal-realms-crownfall-teaser-poster.webp",
    // Teaser still at 10.7 s (forest path + signpost): backdrop for "Investigate a Fraud".
    signpost: "/media/rascal-realms-crownfall-signpost.webp",
  },

  // Game & Community Banners
  banners: {
    welcome: "/brand/banners/welcome-banner.png",
    announcements: "/brand/banners/announcements-banner.png",
    rascalPlaza: "/brand/banners/rascal-plaza-banner.png",
  },

  // Realm Insignias & Seals
  insignias: {
    razzMedallion: "/brand/badges/razz-medallion.png",
    crystalSigil: "/brand/badges/crystal-sigil.png",
    crownEyeShield: "/brand/badges/crown-eye-shield.png",
    qaController: "/brand/badges/qa-controller-badge.png",
    evidenceCamera: "/brand/badges/evidence-camera-badge.png",
    royalCrown: "/brand/badges/royal-crown-badge.png",
  },
} as const;

export type BrandAssetPath = string;
