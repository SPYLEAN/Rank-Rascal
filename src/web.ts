import { createServer, type ServerResponse } from "node:http";
import { config } from "./config.js";
import { completeRobloxAuthorization } from "./oauth.js";

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]!);
}

function page(title: string, content: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · Rank Rascal</title><style>
  :root{color-scheme:dark;--purple:#7a4dff;--lime:#b7ff36;--pink:#ff4fa3;--ink:#121526;--white:#f8f8ff}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 20% 10%,#372978,var(--ink) 45%);color:var(--white);font-family:ui-rounded,"Arial Rounded MT Bold",system-ui,sans-serif;min-height:100vh;display:grid;place-items:center;padding:24px}.card{width:min(720px,100%);padding:40px;border:3px solid var(--lime);border-radius:28px;background:#171b31;box-shadow:12px 12px 0 var(--purple)}h1{font-size:clamp(2rem,8vw,4.5rem);line-height:.95;margin:0 0 20px}.stamp{display:inline-block;background:var(--pink);color:white;padding:8px 14px;transform:rotate(-2deg);font-weight:900;border-radius:8px}p,li{line-height:1.6;color:#dfe2ff}a{color:var(--lime)}.button{display:inline-block;background:var(--lime);color:#111;padding:13px 18px;border-radius:14px;text-decoration:none;font-weight:900;margin-top:12px}footer{margin-top:28px;font-size:.85rem;color:#9fa5cf}
  </style></head><body><main class="card">${content}<footer>Rank Rascal is not endorsed by Roblox or Discord. For Discord users aged 13+.</footer></main></body></html>`;
}

function send(response: ServerResponse, status: number, body: string, contentType = "text/html; charset=utf-8"): void {
  response.writeHead(status, {
    "Content-Type": contentType,
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(body);
}

export function startWebServer() {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || "/", config.publicBaseUrl);
    if (request.method !== "GET") return send(response, 405, "Method not allowed", "text/plain");
    if (url.pathname === "/health") return send(response, 200, JSON.stringify({ ok: true }), "application/json");
    if (url.pathname === "/") return send(response, 200, page("Home", `<span class="stamp">CERTIFIED BRAIN ROT</span><h1>Rank Rascal</h1><p>Your Roblox stats have officially rotted.</p><p>Link a verified Roblox identity from the <code>/link-roblox</code> command, build a Rotfile, survive Drip Inspection, and enter the Yapping Order.</p><a class="button" href="/privacy">Privacy</a>`));
    if (url.pathname === "/privacy") return send(response, 200, page("Privacy", `<h1>Privacy without the yapping</h1><ul><li>We store Discord and Roblox user IDs, public profile snapshots, privacy choices, and game scores.</li><li>Roblox OAuth tokens are discarded after identity verification.</li><li>We never request or store Roblox passwords.</li><li>Use <code>/unlink-roblox</code> to delete your server-specific profile.</li><li>Use Witness Protection to leave public comparisons.</li></ul><p>Server operators must provide a real support contact before public launch.</p>`));
    if (url.pathname === "/terms") return send(response, 200, page("Terms", `<h1>Terms of Rascalry</h1><p>Rank Rascal is for Discord users aged 13 or older, subject to local minimum-age rules. Do not use it to bully, impersonate, gamble, expose private information, or violate Roblox or Discord rules.</p><p>Stats may be delayed or unavailable. Rascal Rep is entertainment, not an official skill rating.</p>`));
    if (url.pathname === "/oauth/roblox/callback") {
      try {
        const error = url.searchParams.get("error");
        if (error) throw new Error("Roblox verification was cancelled.");
        const result = await completeRobloxAuthorization(
          url.searchParams.get("code") || "",
          url.searchParams.get("state") || "",
        );
        return send(response, 200, page("Verified", `<span class="stamp">IDENTITY VERIFIED</span><h1>Welcome, ${escapeHtml(result.displayName)}!</h1><p><strong>@${escapeHtml(result.username)}</strong> is connected. Return to Discord and run <code>/rotfile</code>.</p>`));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Verification failed.";
        return send(response, 400, page("Verification failed", `<h1>The Rascal dropped the paperwork.</h1><p>${escapeHtml(message)}</p><p>Return to Discord and generate a new link.</p>`));
      }
    }
    return send(response, 404, page("Not found", "<h1>404</h1><p>This page entered Witness Protection.</p>"));
  });
  server.listen(config.port, () => console.log(`Rank Rascal web service listening on :${config.port}`));
  return server;
}
