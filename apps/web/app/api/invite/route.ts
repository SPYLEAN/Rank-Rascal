import { NextResponse } from "next/server";

export async function GET() {
  const customInstallUrl = process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL;
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || process.env.DISCORD_CLIENT_ID;

  if (customInstallUrl && customInstallUrl.startsWith("https://discord.com")) {
    return NextResponse.redirect(customInstallUrl);
  }

  if (clientId) {
    const installUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot%20applications.commands&permissions=277025770560`;
    return NextResponse.redirect(installUrl);
  }

  // Fallback if client ID is not configured yet
  const fallbackUrl = customInstallUrl || "/invite";
  return NextResponse.redirect(new URL(fallbackUrl, process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.com"));
}
