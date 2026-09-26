import { NextResponse } from "next/server";

// View Channels, Send Messages, Embed Links, Attach Files, Read Message History.
const INSTALL_PERMISSIONS = "117760";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.lol";

  // Installation stays closed until the launch gate passes (see docs/VERCEL_DEPLOYMENT.md).
  if (process.env.NEXT_PUBLIC_INVITE_ENABLED !== "true") {
    return NextResponse.redirect(new URL("/invite", siteUrl));
  }

  const customInstallUrl =
    process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || process.env.DISCORD_INSTALL_URL;
  if (customInstallUrl && customInstallUrl.startsWith("https://discord.com/")) {
    return NextResponse.redirect(customInstallUrl);
  }

  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ||
    process.env.DISCORD_CLIENT_ID ||
    process.env.CLIENT_ID;
  if (clientId && /^\d{15,25}$/.test(clientId.trim())) {
    return NextResponse.redirect(
      `https://discord.com/oauth2/authorize?client_id=${clientId.trim()}&scope=bot%20applications.commands&permissions=${INSTALL_PERMISSIONS}`,
    );
  }

  return NextResponse.redirect(new URL("/invite", siteUrl));
}
