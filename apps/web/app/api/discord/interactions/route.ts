import { NextResponse } from "next/server";

/**
 * FUTURE DISCORD INTERACTIONS ENDPOINT STUB
 *
 * Current Architecture: The active Discord bot process receives all commands
 * via the always-on Discord Gateway worker.
 *
 * This HTTP endpoint is NOT active for production interactions until Ed25519 signature
 * verification is fully implemented with tweetnacl or crypto.webcrypto.
 *
 * Production URL: https://YOUR_DOMAIN/api/discord/interactions
 *
 * Required Verification Checklist before registering in Discord Developer Portal:
 * 1. Verify 'X-Signature-Ed25519' header against DISCORD_PUBLIC_KEY
 * 2. Verify 'X-Signature-Timestamp' header
 * 3. Read exact unparsed raw request body bytes
 * 4. Reject invalid signatures with HTTP 401 Unauthorized
 * 5. Respond to Discord PING (Type 1) with PONG (Type 1)
 * 6. Support all 9 slash commands (/link-roblox, /preview-roblox, /rotfile, /dripcheck, /fraudcheck, /yapping-order, /witness-protection, /unlink-roblox, /rascal-config)
 * 7. Automated tests for valid and invalid signatures
 */

export async function GET() {
  return NextResponse.json(
    {
      status: "notice",
      message:
        "Rank Rascal currently receives interactions via the Discord Gateway worker. This HTTP endpoint is reserved for future Ed25519 webhook interaction delivery.",
      documentation: "https://rankrascal.com/docs/PRODUCTION_ARCHITECTURE.md",
    },
    { status: 200 }
  );
}

export async function POST() {
  // Reject unsigned HTTP requests until full Ed25519 verification is active
  return NextResponse.json(
    {
      error: "HTTP interaction endpoint not configured. Gateway worker active.",
    },
    { status: 501 }
  );
}
