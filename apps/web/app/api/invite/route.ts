import { NextResponse } from "next/server";

export async function GET() {
  const customInstallUrl =
    process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || process.env.DISCORD_INSTALL_URL;
  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ||
    process.env.DISCORD_CLIENT_ID ||
    process.env.CLIENT_ID;

  // 1. Direct custom install URL if configured
  if (customInstallUrl && customInstallUrl.startsWith("https://discord.com")) {
    return NextResponse.redirect(customInstallUrl);
  }

  // 2. If client ID is available (e.g. 18-19 digit Discord Application ID)
  if (clientId && clientId.trim().length > 0 && !clientId.includes("YOUR_")) {
    const installUrl = `https://discord.com/oauth2/authorize?client_id=${clientId.trim()}&scope=bot%20applications.commands&permissions=277025770560`;
    return NextResponse.redirect(installUrl);
  }

  // 3. Fallback redirect to /invite UI page with configuration notice
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.com";
  return NextResponse.redirect(new URL("/invite?status=missing_id", siteUrl));
}
