import { createHash } from "node:crypto";

export type EmailAttachment = {
  filename: string;
  content: string;
};

type SendEmailInput = {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  idempotencyKey: string;
  attachments?: EmailAttachment[];
};

type ReviewerArtifactInput = {
  name: string;
  reviewerId: string;
  issuedOn: string;
};

// Crownfall palette (docs/rascal-realms/ART_DIRECTION.md).
const CREAM = "#F3E5C8";
const GOLD = "#D5A84B";
const INK = "#1B1426";
const WOOD = "#7B4E2D";
const VIOLET = "#6B31A8";
const FOREST = "#41633B";

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });
}

/**
 * A stable, non-guessable reviewer ID: the same review from the same address on the same day
 * always maps to the same ID (so a double-submit can't mint two), and nobody can derive another
 * person's ID without the server secret.
 */
export function generateReviewerId(
  email: string,
  message: string,
  issuedOn: string,
  secret: string,
): string {
  const digest = createHash("sha256")
    .update(`${email.toLowerCase()}|${message}|${issuedOn}|${secret}`)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase();
  return `QA-${issuedOn.replace(/-/g, "")}-${digest}`;
}

/** Shortens long display names so they always fit the badge and certificate. */
function fitName(name: string, max: number): string {
  return name.length > max ? `${name.slice(0, max - 1)}…` : name;
}

/** Founding QA Scout badge: a cream paper seal with a gold crown and a wooden ribbon. */
export function buildReviewerBadgeSvg({ name, reviewerId }: ReviewerArtifactInput): string {
  const safeName = escapeHtml(fitName(name, 28));
  const safeId = escapeHtml(reviewerId);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="Rascal Realms: Crownfall Founding QA Scout badge for ${safeName}">
  <rect width="1200" height="1200" fill="${INK}"/>
  <circle cx="600" cy="560" r="430" fill="${GOLD}" stroke="${INK}" stroke-width="18"/>
  <circle cx="600" cy="560" r="385" fill="${CREAM}" stroke="${WOOD}" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round"/>
  <circle cx="600" cy="560" r="340" fill="none" stroke="${INK}" stroke-width="6"/>
  <path d="M400 600 L440 390 L520 470 L600 320 L680 470 L760 390 L800 600 Z" fill="${GOLD}" stroke="${INK}" stroke-width="16" stroke-linejoin="round"/>
  <rect x="400" y="600" width="400" height="56" rx="10" fill="${GOLD}" stroke="${INK}" stroke-width="16"/>
  <path d="M600 372 l26 44 -26 44 -26 -44 Z" fill="${VIOLET}" stroke="${INK}" stroke-width="8"/>
  <circle cx="470" cy="628" r="12" fill="${VIOLET}"/><circle cx="600" cy="628" r="12" fill="${FOREST}"/><circle cx="730" cy="628" r="12" fill="${VIOLET}"/>
  <text x="600" y="760" text-anchor="middle" fill="${INK}" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-weight="700" letter-spacing="6">THE WORLD LIES</text>
  <text x="600" y="812" text-anchor="middle" fill="${WOOD}" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-style="italic">we check the evidence</text>
  <path d="M150 930 L260 880 L940 880 L1050 930 L940 980 L260 980 Z" fill="${WOOD}" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/>
  <text x="600" y="948" text-anchor="middle" fill="${CREAM}" font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="700" letter-spacing="4">FOUNDING QA SCOUT</text>
  <text x="600" y="1060" text-anchor="middle" fill="${GOLD}" font-family="'Courier New', monospace" font-size="36" font-weight="700">${safeId}</text>
  <text x="600" y="1120" text-anchor="middle" fill="${CREAM}" font-family="Georgia, 'Times New Roman', serif" font-size="32">${safeName}</text>
</svg>`;
}

/** Certificate of early review, printed on cream paper with an ink double rule. */
export function buildCertificateSvg({ name, reviewerId, issuedOn }: ReviewerArtifactInput): string {
  const safeName = escapeHtml(fitName(name, 34));
  const safeId = escapeHtml(reviewerId);
  const safeDate = escapeHtml(issuedOn);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1131" viewBox="0 0 1600 1131" role="img" aria-label="Rascal Realms: Crownfall certificate of early review for ${safeName}">
  <rect width="1600" height="1131" fill="${CREAM}"/>
  <rect x="40" y="40" width="1520" height="1051" fill="none" stroke="${INK}" stroke-width="10"/>
  <rect x="64" y="64" width="1472" height="1003" fill="none" stroke="${GOLD}" stroke-width="4"/>
  <g fill="${GOLD}" stroke="${INK}" stroke-width="4">
    <path d="M64 64 h90 l-90 90 Z"/><path d="M1536 64 h-90 l90 90 Z"/><path d="M64 1067 h90 l-90 -90 Z"/><path d="M1536 1067 h-90 l90 -90 Z"/>
  </g>
  <path d="M730 250 L748 150 L784 188 L800 120 L816 188 L852 150 L870 250 Z" fill="${GOLD}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <text x="800" y="320" text-anchor="middle" fill="${WOOD}" font-family="Georgia, 'Times New Roman', serif" font-size="30" letter-spacing="8">RASCAL REALMS: CROWNFALL</text>
  <text x="800" y="420" text-anchor="middle" fill="${INK}" font-family="Georgia, 'Times New Roman', serif" font-size="84" font-weight="700">Founding QA Scout</text>
  <text x="800" y="478" text-anchor="middle" fill="${WOOD}" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-style="italic">Certificate of early review</text>
  <line x1="420" y1="540" x2="1180" y2="540" stroke="${GOLD}" stroke-width="3"/>
  <text x="800" y="640" text-anchor="middle" fill="${INK}" font-family="Georgia, 'Times New Roman', serif" font-size="64">${safeName}</text>
  <text x="800" y="712" text-anchor="middle" fill="${INK}" font-family="Georgia, 'Times New Roman', serif" font-size="28">reviewed Stickerwood before the Crown noticed,</text>
  <text x="800" y="752" text-anchor="middle" fill="${INK}" font-family="Georgia, 'Times New Roman', serif" font-size="28">and helped make the mystery fairer for everyone who follows.</text>
  <text x="260" y="900" fill="${WOOD}" font-family="'Courier New', monospace" font-size="24">ISSUED ${safeDate}</text>
  <text x="1340" y="900" text-anchor="end" fill="${WOOD}" font-family="'Courier New', monospace" font-size="24" font-weight="700">${safeId}</text>
  <text x="800" y="1010" text-anchor="middle" fill="${WOOD}" font-family="Georgia, 'Times New Roman', serif" font-size="20">Recognises an early review contribution. Not employment, payment or guaranteed playtest access.</text>
</svg>`;
}

export function asAttachment(filename: string, source: string): EmailAttachment {
  return { filename, content: Buffer.from(source, "utf8").toString("base64") };
}

export async function sendResendEmail(input: SendEmailInput): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${input.apiKey}`,
      "content-type": "application/json",
      "idempotency-key": input.idempotencyKey,
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      reply_to: input.replyTo,
      subject: input.subject,
      html: input.html,
      text: input.text,
      attachments: input.attachments,
    }),
  });

  if (!response.ok) {
    throw new Error(`email_delivery_failed:${response.status}`);
  }
}

/** Email frame: cream storybook card on ink. Inline styles only; email clients strip <style>. */
export function emailShell(title: string, preheader: string, content: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title></head><body style="margin:0;background:${INK};color:${INK};font-family:Georgia,'Times New Roman',serif"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${INK}"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:${CREAM};border:2px solid ${GOLD};border-radius:6px;overflow:hidden"><tr><td style="padding:16px 28px;background:${WOOD};color:${CREAM};font-size:13px;letter-spacing:3px;font-weight:700">RASCAL REALMS: CROWNFALL</td></tr><tr><td style="padding:34px 28px;font-size:16px;line-height:1.7">${content}</td></tr><tr><td style="padding:20px 28px;background:#EADABA;color:${WOOD};font-size:12px;line-height:1.6;font-family:Arial,sans-serif">Rascal Labs is an independent project and is not affiliated with or endorsed by Roblox or Discord. We will never ask for passwords, payment details or account credentials.</td></tr></table></td></tr></table></body></html>`;
}
