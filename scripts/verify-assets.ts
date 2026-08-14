import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { BRAND_ASSETS } from "../apps/web/lib/brand-assets.js";
import { CANONICAL_THREE_BADGES } from "../apps/web/lib/badge-data.js";

const publicDir = resolve("apps/web/public");

function flattenAssets(obj: Record<string, unknown>, prefix = ""): string[] {
  let paths: string[] = [];
  for (const value of Object.values(obj)) {
    if (typeof value === "string") {
      paths.push(value);
    } else if (typeof value === "object" && value !== null) {
      paths = paths.concat(flattenAssets(value as Record<string, unknown>));
    }
  }
  return paths;
}

const allAssetPaths = flattenAssets(BRAND_ASSETS);
let errorCount = 0;

console.log("🔍 Running Rank Rascal Build-Time Brand Asset Verification...\n");

// Check 1: Verify all paths in BRAND_ASSETS manifest resolve to real files
for (const assetPath of allAssetPaths) {
  if (assetPath.startsWith("/public/")) {
    console.error(`❌ ERROR: Asset path "${assetPath}" starts with "/public/". Remove "/public" prefix.`);
    errorCount++;
    continue;
  }

  const realFilePath = join(publicDir, assetPath.replace(/^\//, ""));

  if (!existsSync(realFilePath)) {
    console.error(`❌ ERROR: Asset file missing! Manifest path "${assetPath}" -> File not found: ${realFilePath}`);
    errorCount++;
  } else {
    console.log(`✓ Verified manifest path: ${assetPath}`);
  }
}

// Check 2: Automated Badge Checks (Phase 7 integrity)
console.log("\n🔍 Running Canonical Badge Integrity Checks...\n");

const usedBadgeImages = new Set<string>();

for (const badge of CANONICAL_THREE_BADGES) {
  // Rule A: Prevent emoji paths from being used as badge images
  if (badge.image.includes("/emojis/")) {
    console.error(`❌ ERROR: Badge "${badge.id}" uses an emoji path as a badge image: ${badge.image}`);
    errorCount++;
  }

  // Rule B: Prevent two different badge IDs from using the same production image
  if (usedBadgeImages.has(badge.image)) {
    console.error(`❌ ERROR: Badge image "${badge.image}" is reused across multiple badge IDs!`);
    errorCount++;
  }
  usedBadgeImages.add(badge.image);

  // Rule C: All canonical badges must be in 'preview' status
  if (badge.status !== "preview") {
    console.error(`❌ ERROR: Badge "${badge.id}" status is "${badge.status}". Must be "preview".`);
    errorCount++;
  }

  console.log(`✓ Verified canonical badge "${badge.id}" -> ${badge.image} [Status: ${badge.status}]`);
}

if (errorCount > 0) {
  console.error(`\n❌ Verification failed with ${errorCount} error(s).`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${allAssetPaths.length} brand assets and ${CANONICAL_THREE_BADGES.length} canonical badges verified successfully!`);
}
