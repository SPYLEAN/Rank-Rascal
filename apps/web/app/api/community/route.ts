import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import {
  asAttachment,
  buildCertificateSvg,
  buildReviewerBadgeSvg,
  emailShell,
  escapeHtml,
  generateReviewerId,
  sendResendEmail,
} from "@/lib/community-email";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS = 3;
const MAX_MESSAGE_LENGTH = 2400;
const ALLOWED_TYPES = new Set(["feedback", "guild"]);
const ALLOWED_TRACKS = new Set([
  "playtester",
  "systems",
  "environment",
  "character",
  "ui-vfx",
  "audio",
  "narrative",
  "community",
]);
const ALLOWED_FOCUS_AREAS = new Set(["world", "gameplay", "story", "accessibility", "website"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Submission = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  message?: unknown;
  track?: unknown;
  rating?: unknown;
  focusArea?: unknown;
  portfolio?: unknown;
  timezone?: unknown;
  availability?: unknown;
  publicConsent?: unknown;
  consent?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type RateEntry = { count: number; resetAt: number };

const globalRateStore = globalThis as typeof globalThis & {
  rankRascalCommunityRate?: Map<string, RateEntry>;
};

const rateStore =
  globalRateStore.rankRascalCommunityRate ??
  (globalRateStore.rankRascalCommunityRate = new Map<string, RateEntry>());

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().replace(/\0/g, "").slice(0, max) : "";
}

function fingerprint(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || "unknown";
  const salt = process.env.COMMUNITY_RATE_SALT || "rank-rascal-community";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = rateStore.get(key);
  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (current.count >= MAX_SUBMISSIONS) return true;
  current.count += 1;
  return false;
}

function safeUrl(value: string): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

async function sendDiscordCopy(
  webhookUrl: string | undefined,
  title: string,
  message: string,
  fields: Array<{ name: string; value: string; inline?: boolean }>,
) {
  if (!webhookUrl?.startsWith("https://discord.com/api/webhooks/")) return;
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username: "Rascal Realms Community Signal",
      allowed_mentions: { parse: [] },
      embeds: [{ title, description: message, color: 0xb7ff36, fields, timestamp: new Date().toISOString() }],
    }),
  });
  if (!response.ok) console.warn("Community Discord copy failed", response.status);
}

export async function POST(request: Request) {
  let body: Submission;
  try {
    body = (await request.json()) as Submission;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const type = clean(body.type, 20);
  const name = clean(body.name, 60);
  const email = clean(body.email, 160).toLowerCase();
  const message = clean(body.message, MAX_MESSAGE_LENGTH);
  const track = clean(body.track, 30);
  const focusArea = clean(body.focusArea, 30);
  const portfolio = safeUrl(clean(body.portfolio, 300));
  const timezone = clean(body.timezone, 80);
  const availability = clean(body.availability, 80);
  const website = clean(body.website, 100);
  const rating = Number(body.rating);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  const isFeedback = type === "feedback";
  const isGuild = type === "guild";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const formAge = Date.now() - startedAt;
  if (!startedAt || formAge < 2500 || formAge > 2 * 60 * 60 * 1000) {
    return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
  }

  const invalidBase =
    !ALLOWED_TYPES.has(type) ||
    !name ||
    !EMAIL_PATTERN.test(email) ||
    message.length < 80 ||
    body.consent !== true;
  const invalidFeedback = isFeedback && (!ALLOWED_FOCUS_AREAS.has(focusArea) || !Number.isInteger(rating) || rating < 1 || rating > 5);
  const invalidGuild = isGuild && (!ALLOWED_TRACKS.has(track) || !timezone || !availability);

  if (invalidBase || invalidFeedback || invalidGuild) {
    return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
  }

  if (isRateLimited(fingerprint(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.COMMUNITY_OWNER_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const fromEmail = process.env.COMMUNITY_FROM_EMAIL || "Rascal Realms <community@rankrascal.lol>";
  const identitySalt = process.env.COMMUNITY_ID_SALT || process.env.COMMUNITY_RATE_SALT;
  if (!apiKey || !ownerEmail || !identitySalt) {
    return NextResponse.json({ error: "inbox_offline" }, { status: 503 });
  }

  const issuedOn = new Date().toISOString().slice(0, 10);
  const generatedId = generateReviewerId(email, message, issuedOn, identitySalt);
  const submissionId = isFeedback ? generatedId : generatedId.replace("QA-", "GUILD-");
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const detailRows = [
    ["Submission", submissionId],
    ["Name", name],
    ["Email", email],
    ...(isFeedback ? [["Rating", `${rating}/5`], ["Focus", focusArea]] : [["Guild track", track], ["Timezone", timezone], ["Availability", availability]]),
    ...(portfolio ? [["Portfolio", portfolio]] : []),
    ["Public quote permission", body.publicConsent === true ? "Yes" : "No"],
  ];

  const ownerRows = detailRows
    .map(([label, value]) => `<tr><td style="padding:8px 12px;color:#aeb4dc;border-bottom:1px solid #2b3153">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#f8f8ff;border-bottom:1px solid #2b3153">${escapeHtml(value)}</td></tr>`)
    .join("");
  const ownerSubject = isFeedback
    ? `[${submissionId}] New ${rating}/5 Rascal Realms review`
    : `[${submissionId}] Founders Guild application: ${track}`;
  const ownerHtml = emailShell(
    ownerSubject,
    `${name} sent a new ${type} submission.`,
    `<h1 style="margin:0 0 18px;font-size:30px">${isFeedback ? "A new QA signal arrived." : "A new builder answered the call."}</h1><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#101326;border-radius:14px;overflow:hidden">${ownerRows}</table><div style="margin-top:22px;padding:20px;border-left:4px solid #b7ff36;background:#101326;line-height:1.7">${safeMessage}</div>`,
  );

  const badgeSvg = isFeedback ? buildReviewerBadgeSvg({ name, reviewerId: submissionId, issuedOn }) : "";
  const certificateSvg = isFeedback ? buildCertificateSvg({ name, reviewerId: submissionId, issuedOn }) : "";
  const memberSubject = isFeedback
    ? `Your Founding QA Scout badge · ${submissionId}`
    : `Your Founders Guild application · ${submissionId}`;
  const memberContent = isFeedback
    ? `<p style="margin:0 0 8px;color:#ff4fa3;font-family:monospace;font-weight:700;letter-spacing:2px">SIGNAL VERIFIED</p><h1 style="margin:0 0 18px;font-size:34px">${safeName}, you are on the Founding QA Scout roster.</h1><p style="color:#d7d9ee;line-height:1.7">Your review reached the team and was registered as <strong style="color:#b7ff36">${submissionId}</strong>. Your unique badge and certificate are attached to this email.</p><div style="margin:24px 0;padding:20px;border:1px solid #7a4dff;border-radius:16px;background:#101326"><strong>What happens next</strong><p style="margin:10px 0 0;color:#aeb4dc;line-height:1.7">You are now part of the founding QA review roster. Build invitations will be sent in cohorts as playable versions, platform requirements, age checks and safety capacity allow. Watch this inbox and keep your QA ID.</p></div><p style="color:#aeb4dc;line-height:1.7">The certificate recognizes your early review contribution. It is not employment, payment, ownership or a promise of a specific launch date.</p>`
    : `<p style="margin:0 0 8px;color:#ff4fa3;font-family:monospace;font-weight:700;letter-spacing:2px">APPLICATION RECEIVED</p><h1 style="margin:0 0 18px;font-size:34px">${safeName}, the Guild has your signal.</h1><p style="color:#d7d9ee;line-height:1.7">Your application is registered as <strong style="color:#b7ff36">${submissionId}</strong>. A human will review your work, availability and fit for the current production stage.</p><div style="margin:24px 0;padding:20px;border:1px solid #7a4dff;border-radius:16px;background:#101326"><strong>No spec-work trap</strong><p style="margin:10px 0 0;color:#aeb4dc;line-height:1.7">We will not ask you to complete unpaid custom production work merely to be considered. Scope, credit, ownership and compensation must be agreed before production work begins.</p></div>`;
  const memberHtml = emailShell(memberSubject, `Your Rascal Labs submission ID is ${submissionId}.`, memberContent);

  try {
    await Promise.all([
      sendResendEmail({
        apiKey,
        from: fromEmail,
        to: [ownerEmail],
        replyTo: email,
        subject: ownerSubject,
        html: ownerHtml,
        text: `${ownerSubject}\n\nFrom: ${name} <${email}>\nID: ${submissionId}\n\n${message}`,
        idempotencyKey: `owner-${submissionId}`,
      }),
      sendResendEmail({
        apiKey,
        from: fromEmail,
        to: [email],
        subject: memberSubject,
        html: memberHtml,
        text: isFeedback
          ? `${name}, you are on the Founding QA Scout roster. Your QA ID is ${submissionId}. Your badge and certificate are attached. Playtest invitations follow build readiness and cohort capacity.`
          : `${name}, your Founders Guild application is registered as ${submissionId}. A human will review it.`,
        attachments: isFeedback
          ? [
              asAttachment(`rascal-realms-qa-badge-${submissionId}.svg`, badgeSvg),
              asAttachment(`rascal-realms-qa-certificate-${submissionId}.svg`, certificateSvg),
            ]
          : undefined,
        idempotencyKey: `member-${submissionId}`,
      }),
    ]);

    await sendDiscordCopy(process.env.COMMUNITY_INBOX_WEBHOOK_URL, ownerSubject, message, [
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      { name: "Submission ID", value: submissionId, inline: true },
    ]);
  } catch (error) {
    console.error("Community email delivery failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: submissionId, roster: isFeedback });
}
