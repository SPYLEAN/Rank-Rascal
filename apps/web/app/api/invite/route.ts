import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The bot is archived. Keep this route as a safe landing page for old links,
  // even if a stale production environment still contains Discord credentials.
  return NextResponse.redirect(new URL("/invite", request.url));
}
