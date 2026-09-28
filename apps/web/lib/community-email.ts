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

export function buildReviewerBadgeSvg({ name, reviewerId }: ReviewerArtifactInput): string {
  const safeName = escapeHtml(name);
  const safeId = escapeHtml(reviewerId);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="Rascal Realms Founding QA Scout badge for ${safeName}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="72%"><stop offset="0" stop-color="#2d1b63"/><stop offset="1" stop-color="#090b18"/></radialGradient>
    <linearGradient id="lime" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#efff77"/><stop offset="1" stop-color="#82ff27"/></linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1200" height="1200" rx="120" fill="url(#bg)"/>
  <circle cx="600" cy="515" r="350" fill="none" stroke="#7a4dff" stroke-width="20"/>
  <circle cx="600" cy="515" r="310" fill="#11152a" stroke="url(#lime)" stroke-width="12" filter="url(#glow)"/>
  <path d="M350 540L430 350L535 445L600 260L670 445L780 350L850 540L755 700H445Z" fill="url(#lime)" stroke="#070914" stroke-width="24" stroke-linejoin="round"/>
  <path d="M464 548L535 490L600 575L670 490L745 548L700 640H500Z" fill="#ff4fa3" stroke="#070914" stroke-width="18" stroke-linejoin="round"/>
  <circle cx="600" cy="720" r="74" fill="#7a4dff" stroke="#b7ff36" stroke-width="14"/>
  <path d="M568 720l24 25 48-56" fill="none" stroke="#f8f8ff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="600" y="950" text-anchor="middle" fill="#f8f8ff" font-family="Arial, sans-serif" font-size="62" font-weight="800">FOUNDING QA SCOUT</text>
  <text x="600" y="1025" text-anchor="middle" fill="#b7ff36" font-family="monospace" font-size="34" font-weight="700">${safeId}</text>
  <text x="600" y="1090" text-anchor="middle" fill="#aeb4dc" font-family="Arial, sans-serif" font-size="28">Issued to ${safeName}</text>
</svg>`;
}

export function buildCertificateSvg({ name, reviewerId, issuedOn }: ReviewerArtifactInput): string {
  const safeName = escapeHtml(name);
  const safeId = escapeHtml(reviewerId);
  const safeDate = escapeHtml(issuedOn);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1131" viewBox="0 0 1600 1131" role="img" aria-label="Rascal Realms Founding QA Scout certificate for ${safeName}">
  <defs><linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#171a31"/><stop offset="1" stop-color="#0a0c18"/></linearGradient><filter id="g"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width="1600" height="1131" fill="#090b18"/>
  <rect x="44" y="44" width="1512" height="1043" rx="44" fill="url(#panel)" stroke="#7a4dff" stroke-width="10"/>
  <rect x="74" y="74" width="1452" height="983" rx="30" fill="none" stroke="#b7ff36" stroke-width="3" opacity=".7"/>
  <g transform="translate(690 115)" filter="url(#g)"><path d="M0 145L42 42L96 94L130 0L168 94L225 42L270 145L218 230H52Z" fill="#b7ff36" stroke="#050712" stroke-width="14" stroke-linejoin="round"/><path d="M70 148l55-42 38 52 48-52 32 42-35 55H95Z" fill="#ff4fa3" stroke="#050712" stroke-width="10"/></g>
  <text x="800" y="430" text-anchor="middle" fill="#b7ff36" font-family="monospace" font-size="31" font-weight="700" letter-spacing="7">RASCAL REALMS: CROWNFALL</text>
  <text x="800" y="515" text-anchor="middle" fill="#f8f8ff" font-family="Arial, sans-serif" font-size="76" font-weight="900">FOUNDING QA SCOUT</text>
  <text x="800" y="585" text-anchor="middle" fill="#aeb4dc" font-family="Arial, sans-serif" font-size="30">Certificate of early review contribution</text>
  <line x1="360" y1="650" x2="1240" y2="650" stroke="#7a4dff" stroke-width="3"/>
  <text x="800" y="750" text-anchor="middle" fill="#f8f8ff" font-family="Arial, sans-serif" font-size="60" font-weight="700">${safeName}</text>
  <text x="800" y="820" text-anchor="middle" fill="#aeb4dc" font-family="Arial, sans-serif" font-size="28">helped challenge the world before the world could challenge its players.</text>
  <text x="270" y="950" fill="#aeb4dc" font-family="monospace" font-size="23">ISSUED ${safeDate}</text>
  <text x="1330" y="950" text-anchor="end" fill="#b7ff36" font-family="monospace" font-size="23">${safeId}</text>
  <text x="800" y="1020" text-anchor="middle" fill="#7a4dff" font-family="Arial, sans-serif" font-size="24" font-weight="700">THE WORLD LIES · QA SCOUTS VERIFY</text>
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

export function emailShell(title: string, preheader: string, content: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title></head><body style="margin:0;background:#090b18;color:#f8f8ff;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#090b18"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#171a31;border:1px solid #3b2a72;border-radius:24px;overflow:hidden"><tr><td style="padding:18px 28px;background:#121526;border-bottom:1px solid #3b2a72;color:#b7ff36;font-family:monospace;font-size:13px;letter-spacing:2px;font-weight:700">RASCAL REALMS · THE WORLD LIES</td></tr><tr><td style="padding:36px 28px">${content}</td></tr><tr><td style="padding:22px 28px;background:#101326;color:#aeb4dc;font-size:12px;line-height:1.6">Rascal Labs is an independent project and is not affiliated with or endorsed by Roblox or Discord. Never send passwords, payment details or private account credentials.</td></tr></table></td></tr></table></body></html>`;
}
