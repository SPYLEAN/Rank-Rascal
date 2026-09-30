import { createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
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

/**
 * Founding QA reviews and Founders Guild applications.
 *
 * Delivery: with RESEND_API_KEY, COMMUNITY_OWNER_EMAIL and COMMUNITY_ID_SALT set, the owner gets
 * the submission and the sender gets a personal thank-you (reviewers also get their badge and
 * certificate attached). Without them:
 *  - in development, submissions are appended to data/community-inbox.local.jsonl (gitignored)
 *    and the response says `delivery: "local"` so the page never pretends an email was sent;
 *  - in production, the API answers 503 `inbox_offline` and nothing is stored.
 * See docs/rascal-realms/COMMUNITY_SETUP.md.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS = 3;
const MIN_MESSAGE_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 2400;
const MAX_LINKS = 3;
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

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
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
      username: "Rascal Realms Community Inbox",
      allowed_mentions: { parse: [] },
      embeds: [{ title, description: message.slice(0, 3900), color: 0xd5a84b, fields, timestamp: new Date().toISOString() }],
    }),
  });
  if (!response.ok) console.warn("Community Discord copy failed", response.status);
}

/** Development-only inbox so the whole flow can be exercised without email credentials. */
async function saveLocally(record: Record<string, unknown>): Promise<void> {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "community-inbox.local.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
}

export async function POST(request: Request) {
  let body: Submission;
  try {
    body = (await request.json()) as Submission;
  } catch {
    return fail("invalid_request", 400);
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

  // Honeypot: bots fill the hidden field. Pretend success and drop it.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const formAge = Date.now() - startedAt;
  if (!startedAt || formAge > 2 * 60 * 60 * 1000) return fail("form_expired", 400);
  if (formAge < 2500) return fail("too_fast", 400);

  const invalidBase =
    !ALLOWED_TYPES.has(type) ||
    name.length < 2 ||
    !EMAIL_PATTERN.test(email) ||
    message.length < MIN_MESSAGE_LENGTH ||
    body.consent !== true;
  const invalidFeedback = isFeedback && (!ALLOWED_FOCUS_AREAS.has(focusArea) || !Number.isInteger(rating) || rating < 1 || rating > 5);
  const invalidGuild = isGuild && (!ALLOWED_TRACKS.has(track) || !timezone || !availability);

  if (invalidBase || invalidFeedback || invalidGuild) return fail("invalid_submission", 400);
  if ((message.match(/https?:\/\//gi) ?? []).length > MAX_LINKS) return fail("too_many_links", 400);
  if (isRateLimited(fingerprint(request))) return fail("rate_limited", 429);

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.COMMUNITY_OWNER_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const fromEmail = process.env.COMMUNITY_FROM_EMAIL || "Rascal Realms <community@rankrascal.lol>";
  const identitySalt = process.env.COMMUNITY_ID_SALT || process.env.COMMUNITY_RATE_SALT;
  const emailReady = Boolean(apiKey && ownerEmail && identitySalt);
  const localMode = !emailReady && process.env.NODE_ENV !== "production";

  if (!emailReady && !localMode) return fail("inbox_offline", 503);

  const issuedOn = new Date().toISOString().slice(0, 10);
  const generatedId = generateReviewerId(email, message, issuedOn, identitySalt || "local-preview-only");
  const submissionId = isFeedback ? generatedId : generatedId.replace("QA-", "GUILD-");
  const badgeSvg = isFeedback ? buildReviewerBadgeSvg({ name, reviewerId: submissionId, issuedOn }) : "";
  const certificateSvg = isFeedback ? buildCertificateSvg({ name, reviewerId: submissionId, issuedOn }) : "";
  const artifacts = isFeedback ? { badgeSvg, certificateSvg } : {};

  if (localMode) {
    try {
      await saveLocally({
        receivedAt: new Date().toISOString(),
        id: submissionId,
        type,
        name,
        email,
        message,
        ...(isFeedback ? { rating, focusArea } : { track, timezone, availability, portfolio }),
        publicConsent: body.publicConsent === true,
      });
    } catch (error) {
      console.error("Local community inbox write failed", error instanceof Error ? error.message : "unknown");
      return fail("inbox_offline", 503);
    }
    return NextResponse.json({ ok: true, id: submissionId, kind: type, delivery: "local", ...artifacts });
  }

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
    .map(([label, value]) => `<tr><td style="padding:8px 12px;color:#7B4E2D;border-bottom:1px solid #E2CFA6">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #E2CFA6">${escapeHtml(value)}</td></tr>`)
    .join("");
  const ownerSubject = isFeedback
    ? `[${submissionId}] New ${rating}/5 Rascal Realms review`
    : `[${submissionId}] Founders Guild application: ${track}`;
  const ownerHtml = emailShell(
    ownerSubject,
    `${name} sent a new ${isFeedback ? "review" : "Guild application"}.`,
    `<h1 style="margin:0 0 18px;font-size:28px">${isFeedback ? "A new review arrived." : "A new builder answered the call."}</h1><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#FBF3E2;font-family:Arial,sans-serif;font-size:14px">${ownerRows}</table><div style="margin-top:22px;padding:18px;border-left:4px solid #D5A84B;background:#FBF3E2;line-height:1.7">${safeMessage}</div><p style="margin-top:18px;font-size:13px;color:#7B4E2D">Reply to this email to answer ${safeName} directly.</p>`,
  );

  const memberSubject = isFeedback
    ? `Thank you for reviewing Crownfall · ${submissionId}`
    : `Your Founders Guild application · ${submissionId}`;
  const memberContent = isFeedback
    ? `<h1 style="margin:0 0 16px;font-size:30px">Thank you, ${safeName}. Your review is in.</h1><p>A person on the team will read it. Your Founding QA Scout ID is <strong>${submissionId}</strong>. Your badge and certificate are attached.</p><div style="margin:24px 0;padding:18px;border-left:4px solid #D5A84B;background:#FBF3E2"><strong>What happens next</strong><p style="margin:8px 0 0">Your review puts you in the Founding QA candidate pool. When playtesting opens, candidates are invited in small groups based on build readiness, devices, age requirements and safety capacity. Being in the pool isn't a guarantee of an invite, a job or payment.</p></div><p>Keep this email: your ID is how we'll recognise you when testing opens.</p>`
    : `<h1 style="margin:0 0 16px;font-size:30px">Thank you, ${safeName}. We have your application.</h1><p>It's registered as <strong>${submissionId}</strong>. A person will review your work, availability and fit for the current stage of production, and reply to this address if there's a match.</p><div style="margin:24px 0;padding:18px;border-left:4px solid #D5A84B;background:#FBF3E2"><strong>No spec-work trap</strong><p style="margin:8px 0 0">We won't ask for unpaid custom work just to be considered. This isn't an employment offer. Scope, credit, ownership and compensation are agreed in writing before any production work begins.</p></div>`;
  const memberHtml = emailShell(memberSubject, `Your Rascal Labs submission ID is ${submissionId}.`, memberContent);

  try {
    await Promise.all([
      sendResendEmail({
        apiKey: apiKey as string,
        from: fromEmail,
        to: [ownerEmail as string],
        replyTo: email,
        subject: ownerSubject,
        html: ownerHtml,
        text: `${ownerSubject}\n\nFrom: ${name} <${email}>\nID: ${submissionId}\n\n${message}`,
        idempotencyKey: `owner-${submissionId}`,
      }),
      sendResendEmail({
        apiKey: apiKey as string,
        from: fromEmail,
        to: [email],
        subject: memberSubject,
        html: memberHtml,
        text: isFeedback
          ? `Thank you, ${name}. Your review is in. Your Founding QA Scout ID is ${submissionId}; your badge and certificate are attached. Your review puts you in the Founding QA candidate pool. When playtesting opens, candidates are invited in small groups. Being in the pool isn't a guarantee of an invite, a job or payment.`
          : `Thank you, ${name}. Your Founders Guild application is registered as ${submissionId}. A person will review it and reply if there's a match. This isn't an employment offer.`,
        attachments: isFeedback
          ? [
              asAttachment(`crownfall-qa-scout-badge-${submissionId}.svg`, badgeSvg),
              asAttachment(`crownfall-qa-scout-certificate-${submissionId}.svg`, certificateSvg),
            ]
          : undefined,
        idempotencyKey: `member-${submissionId}`,
      }),
    ]);

    await sendDiscordCopy(process.env.COMMUNITY_INBOX_WEBHOOK_URL, ownerSubject, message, [
      { name: "Name", value: name, inline: true },
      { name: "Submission ID", value: submissionId, inline: true },
    ]);
  } catch (error) {
    console.error("Community email delivery failed", error instanceof Error ? error.message : "unknown");
    return fail("delivery_failed", 502);
  }

  return NextResponse.json({ ok: true, id: submissionId, kind: type, delivery: "email", ...artifacts });
}
