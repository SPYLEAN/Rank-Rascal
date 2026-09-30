/**
 * Rank Rascal Centralized Brand Asset Manifest
 * All brand image paths, mascot poses, Discord emojis, animations, badges, and website art.
 * Every path maps to a verified file inside apps/web/public/.
 */

export const BRAND_ASSETS = {
  // Core Logos & Icons
  logoLockup: "/brand/logo-lockup.webp",
  appIcon: "/brand/app-icon.webp",
  favicon: "/favicon.ico",
  appleTouchIcon: "/brand/apple-touch-icon.png",
  icon192: "/brand/icon-192.png",
  icon512: "/brand/icon-512.png",

  // Final Rascal Realms: Crownfall title logo (approved 2026-09-28), transparent WebP.
  // Source: all assets graphic/.../title logo/ (preserved, not shipped). 1600×898 and 600×337.
  titleLogo: {
    full: "/brand/title/crownfall-title-logo-1600.webp",
    small: "/brand/title/crownfall-title-logo-600.webp",
  },

  // Mascot Standard
  mascotDefault: "/brand/mascot.webp",

  // Mascot Poses
  poses: {
    heroPoint: "/brand/poses/razz-hero-point.webp",
    badgePresent: "/brand/poses/razz-badge-present.webp",
    detective: "/brand/poses/razz-detective.webp",
    celebrate: "/brand/poses/razz-celebrate.webp",
    loadStatic: "/brand/animation/razz-load-01.webp",
  },

  // Discord Emojis (Expressive UI Accents)
  emojis: {
    hype: "/brand/emojis/discord/rascal-hype.webp",
    cooked: "/brand/emojis/discord/rascal-cooked.webp",
    sus: "/brand/emojis/discord/rascal-sus.webp",
    win: "/brand/emojis/discord/rascal-win.webp",
    lol: "/brand/emojis/discord/rascal-lol.webp",
    loading: "/brand/emojis/discord/rascal-loading.webp",
  },

  // Animations & GIFs (3-second slow loop)
  animation: {
    loadingSlowWebp: "/brand/animation/razz-loading-slow.webp",
    loadingSlowGif: "/brand/animation/razz-loading-slow.gif",
    loadingWebp: "/brand/animation/razz-loading.webp",
    loadingGif: "/brand/animation/razz-loading.gif",
    loadStatic: "/brand/animation/razz-load-01.webp",
  },

  // Official Badge Artwork (3 Canonical Badges)
  badges: {
    questCrusader: "/brand/badges/quest-crusader.webp",
    dripMonarch: "/brand/badges/drip-monarch.webp",
    veteranNoob: "/brand/badges/veteran-noob.webp",
    questCrusader256: "/brand/badges/discord/quest-crusader-256.webp",
    dripMonarch256: "/brand/badges/discord/drip-monarch-256.webp",
    veteranNoob256: "/brand/badges/discord/veteran-noob-256.webp",
    badgePackPreview: "/brand/badges/badge-pack-preview.webp",
  },

  // Website Art Illustrations
  websiteArt: {
    whyDifferent: "/brand/website-art/razz-why-different.webp",
    rewardMachine: "/brand/website-art/razz-reward-machine.webp",
    privacyGuardian: "/brand/website-art/razz-privacy-guardian.webp",
    rulebook: "/brand/website-art/razz-rulebook.webp",
    communityClubhouse: "/brand/website-art/razz-community-clubhouse-banner.webp",
  },

  // Rascal Realms pre-production art approved for the public game site.
  game: {
    stickerwoodKeyArt: "/brand/game/stickerwood-key-art-v1.webp",
    worldLiesUi: "/brand/game/world-lies-ui-v1.webp",
    stickerwoodEnemiesBoss: "/brand/game/stickerwood-enemies-boss-v1.webp",
    foundersGuildWorkshop: "/brand/game/founders-guild-workshop-v1.webp",
    qaTruthLab: "/brand/game/qa-truth-lab-v1.webp",
    fractureBeneathStickerwood: "/brand/game/fracture-beneath-stickerwood-v1.webp",
    // Clean high-resolution Stickerwood map (2026-09-29), used by the world atlas. No Razz in frame.
    stickerwoodMap: "/brand/game/stickerwood-map-v2.webp",
    // 960 px copy for the mobile homepage.
    stickerwoodMapThumb: "/brand/game/stickerwood-map-v2-thumb.webp",
  },

  // Hero concept art (2026-09-29), one portrait per canon hero. Built by scripts/build-concepts.py.
  heroes: {
    crownKnight: "/brand/heroes/crown-knight.webp",
    glitchcaster: "/brand/heroes/glitchcaster.webp",
    shadowRanger: "/brand/heroes/shadow-ranger.webp",
    trickster: "/brand/heroes/trickster.webp",
    lorekeeper: "/brand/heroes/lorekeeper.webp",
    badgeScout: "/brand/heroes/badge-scout.webp",
  },

  // 480 px portraits of the three launch heroes for the mobile homepage's hero switcher.
  heroThumbs: {
    crownKnight: "/brand/heroes/crown-knight-thumb.webp",
    glitchcaster: "/brand/heroes/glitchcaster-thumb.webp",
    shadowRanger: "/brand/heroes/shadow-ranger-thumb.webp",
  },

  // World location environment art (2025-09-28 pre-production pass).
  locations: {
    // The one canonical Starting Village image (owner-supplied 2026-09-29).
    startingVillage: "/brand/game/locations/starting-village-v1.webp",
    stickerwoodHeartwood: "/brand/game/locations/stickerwood-heartwood-v1.webp",
    mysteryForest: "/brand/game/locations/mystery-forest-v1.webp",
    ancientTree: "/brand/game/locations/ancient-tree-v1.webp",
    rascalPlazaRealm: "/brand/game/locations/rascal-plaza-realm-v1.webp",
    hiddenCove: "/brand/game/locations/hidden-cove-v1.webp",
    glitchGrove: "/brand/game/locations/glitch-grove-v1.webp",
    kingWrongwayCitadel: "/brand/game/locations/king-wrongway-citadel-v1.webp",
    skyBridges: "/brand/game/locations/sky-bridges-v1.webp",
    // Canonical atlas art for these three areas (owner-supplied 2026-09-29); they used map crops before.
    riverPath: "/brand/game/locations/river-path-v1.webp",
    crownRuins: "/brand/game/locations/crown-ruins-v1.webp",
    wrongwayTerritory: "/brand/game/locations/wrongway-territory-v1.webp",
  },

  // 480 px location cards for the homepage quest journal (scripts/build-concepts.py).
  journalCards: {
    startingVillage: "/brand/game/locations/starting-village-v1-thumb.webp",
    rascalPlaza: "/brand/game/locations/rascal-plaza-realm-v1-thumb.webp",
    stickerwoodForest: "/brand/game/locations/mystery-forest-v1-thumb.webp",
    ancientTree: "/brand/game/locations/ancient-tree-v1-thumb.webp",
    skyBridges: "/brand/game/locations/sky-bridges-v1-thumb.webp",
    riverPath: "/brand/game/locations/river-path-v1-thumb.webp",
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
    welcome: "/brand/banners/welcome-banner.webp",
    announcements: "/brand/banners/announcements-banner.webp",
    rascalPlaza: "/brand/banners/rascal-plaza-banner.webp",
  },

  // Realm Insignias & Seals
  insignias: {
    razzMedallion: "/brand/badges/razz-medallion.webp",
    crystalSigil: "/brand/badges/crystal-sigil.webp",
    crownEyeShield: "/brand/badges/crown-eye-shield.webp",
    qaController: "/brand/badges/qa-controller-badge.webp",
    evidenceCamera: "/brand/badges/evidence-camera-badge.webp",
    royalCrown: "/brand/badges/royal-crown-badge.webp",
  },
} as const;

export type BrandAssetPath = string;
