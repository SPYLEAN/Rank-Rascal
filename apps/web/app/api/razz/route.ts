import { createHash } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { RAZZ_SYSTEM_PROMPT } from "@/lib/razz-knowledge";
import { matchScriptedAnswer } from "@/lib/razz";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ask Razz. With ANTHROPIC_API_KEY set, free-typed questions are answered by Claude using only
 * the canon in lib/razz-knowledge.ts. Without it (or when the AI is rate-limited, over budget or
 * unavailable) the route answers from the six scripted lines, and says so via `source`.
 * See docs/rascal-realms/ASK_RAZZ.md.
 */

// Skill default model; override with RAZZ_MODEL (e.g. a cheaper model) without a code change.
const MODEL = process.env.RAZZ_MODEL || "claude-opus-5-5";
const MAX_QUESTION = 300;
const MAX_HISTORY_TURNS = 6; // previous messages kept for follow-ups (3 exchanges)
const WINDOW_MS = 10 * 60 * 1000;
const PER_VISITOR = 12; // questions per visitor per 10 minutes
const DAILY_CAP = Number(process.env.RAZZ_DAILY_LIMIT || 500); // AI answers per server instance per UTC day

type Turn = { role: "user" | "assistant"; content: string };

const store = globalThis as typeof globalThis & {
  razzRate?: Map<string, { count: number; resetAt: number }>;
  razzDaily?: { day: string; count: number };
  razzClient?: Anthropic;
};
const rate = store.razzRate ?? (store.razzRate = new Map());

const OFF_SCRIPT =
  "My crystal ball only covers the questions below right now. Pick one, or check /updates for the latest from the realm.";

function visitorKey(request: Request): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(`${process.env.COMMUNITY_RATE_SALT || "razz"}:${ip}`).digest("hex");
}

function limited(key: string): boolean {
  const now = Date.now();
  const entry = rate.get(key);
  if (!entry || entry.resetAt <= now) {
    rate.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > PER_VISITOR;
}

function overDailyCap(): boolean {
  const day = new Date().toISOString().slice(0, 10);
  if (!store.razzDaily || store.razzDaily.day !== day) store.razzDaily = { day, count: 0 };
  if (store.razzDaily.count >= DAILY_CAP) return true;
  store.razzDaily.count += 1;
  return false;
}

function scripted(question: string, note?: string) {
  const match = matchScriptedAnswer(question);
  return NextResponse.json({
    source: "scripted",
    answer: match ? match.answer : OFF_SCRIPT,
    link: match?.link ?? null,
    note: note ?? null,
  });
}

function cleanHistory(value: unknown): Turn[] {
  if (!Array.isArray(value)) return [];
  const turns = value
    .filter((t): t is Turn => !!t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string")
    .map((t) => ({ role: t.role, content: t.content.slice(0, 1200) }))
    .slice(-MAX_HISTORY_TURNS);
  // The API needs a user turn first and alternating roles.
  while (turns.length && turns[0].role !== "user") turns.shift();
  return turns.filter((t, i) => i === 0 || t.role !== turns[i - 1].role);
}

/** Lets the drawer label answers honestly before anyone asks. */
export async function GET() {
  return NextResponse.json({ ai: Boolean(process.env.ANTHROPIC_API_KEY) });
}

export async function POST(request: Request) {
  let body: { question?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.replace(/\s+/g, " ").trim().slice(0, MAX_QUESTION) : "";
  if (question.length < 2) return NextResponse.json({ error: "empty_question" }, { status: 400 });

  if (limited(visitorKey(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!process.env.ANTHROPIC_API_KEY) return scripted(question);
  if (overDailyCap()) return scripted(question, "Razz has answered a lot today, so here's his quick version.");

  const client = store.razzClient ?? (store.razzClient = new Anthropic({ maxRetries: 1, timeout: 30_000 }));
  const history = cleanHistory(body.history);
  // Consecutive user turns (e.g. after an earlier failed answer) are allowed; the API merges them.
  const messages: Anthropic.Beta.BetaMessageParam[] = [...history, { role: "user", content: question }];

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      // Short conversational answers: low effort keeps latency and cost down.
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: RAZZ_SYSTEM_PROMPT, cache_control: { type: "ephemeral", ttl: "1h" } }],
      messages,
    });

    if (response.stop_reason === "refusal") {
      return scripted(question, "Razz would rather not answer that one. Here's what he can tell you.");
    }

    const answer = response.content
      .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!answer) return scripted(question);
    return NextResponse.json({ source: "ai", answer, link: null, note: null });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return scripted(question, "Razz is swamped right now, so here's his quick version.");
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Ask Razz API error", error.status);
    } else {
      console.error("Ask Razz failed", error instanceof Error ? error.name : "unknown");
    }
    return scripted(question, "Razz's crystal ball is foggy right now, so here's his quick version.");
  }
}
