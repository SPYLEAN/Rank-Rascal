import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { BRAND_ASSETS } from "../apps/web/lib/brand-assets.js";

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
    console.log(`✓ Verified: ${assetPath}`);
  }
}

if (errorCount > 0) {
  console.error(`\n❌ Asset verification failed with ${errorCount} error(s).`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${allAssetPaths.length} brand asset paths verified successfully!`);
}
