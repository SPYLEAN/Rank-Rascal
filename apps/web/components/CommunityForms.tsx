"use client";

import { FormEvent, useState } from "react";
import {
  BadgeCheck,
  Clock3,
  ExternalLink,
  Loader2,
  Mail,
  MessageSquareText,
  Send,
  Star,
  Users,
} from "lucide-react";
import { FOUNDERS_GUILD_TRACKS, REVIEW_FOCUS_AREAS } from "@/lib/game-content";

type FormKind = "feedback" | "guild";
type FormState = "idle" | "sending" | "success" | "error";
type SubmissionResult = { id: string; roster: boolean } | null;

const INPUT_CLASS =
  "w-full border border-panel-navy-light bg-[#0a0c16] px-4 py-3.5 text-base text-cloud-white outline-none transition placeholder:text-muted-text/55 focus:border-toxic-lime focus:ring-1 focus:ring-toxic-lime";

function SubmissionForm({ kind }: { kind: FormKind }) {
  const [state, setState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [result, setResult] = useState<SubmissionResult>(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const isGuild = kind === "guild";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setStatusMessage("");
    setResult(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: kind,
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      track: data.get("track") || "",
      focusArea: data.get("focusArea") || "",
      rating: data.get("rating") || "",
      portfolio: data.get("portfolio") || "",
      timezone: data.get("timezone") || "",
      availability: data.get("availability") || "",
      publicConsent: data.get("publicConsent") === "on",
      consent: data.get("consent") === "on",
      website: data.get("website"),
      startedAt,
    };

    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseBody = (await response.json()) as { id?: string; roster?: boolean; error?: string };
      if (!response.ok || !responseBody.id) throw new Error(responseBody.error || "submission_failed");

      form.reset();
      setStartedAt(Date.now());
      setResult({ id: responseBody.id, roster: responseBody.roster === true });
      setState("success");
      setStatusMessage(
        isGuild
          ? "Application received. Check your email for the Guild application ID."
          : "Review verified. Your QA Scout email, badge and certificate are on the way.",
      );
    } catch {
      setState("error");
      setStatusMessage("The signal could not be delivered. Check the email address and try again in a moment.");
    }
  }

  return (
    <form id={isGuild ? "guild" : "review"} onSubmit={submit} className="relative scroll-mt-28 overflow-hidden border border-panel-navy-light bg-panel-navy/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-royal-purple/15 blur-3xl" />
      <div className="relative space-y-6">
        <div className="flex items-start gap-4">
          <div className="border border-royal-purple/40 bg-royal-purple/10 p-3 text-toxic-lime">
            {isGuild ? <Users aria-hidden="true" /> : <MessageSquareText aria-hidden="true" />}
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-toxic-lime">
              {isGuild ? "Founders Guild application" : "Founding QA review"}
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-cloud-white">
              {isGuild ? "Bring your craft into the realm" : "Challenge the world before launch"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-text">
              {isGuild
                ? "Tell us where you are strongest, what you want to own and how you collaborate. Every application is reviewed by a person."
                : "Write a useful review and you enter the Founding QA Scout roster with an individual ID, badge and certificate delivered by email."}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-cloud-white">
            Display name
            <input className={INPUT_CLASS} name="name" maxLength={60} required autoComplete="name" placeholder="How we should address you" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-cloud-white">
            Email
            <span className="block text-xs font-normal text-muted-text">Used for your confirmation and private follow-up.</span>
            <input className={INPUT_CLASS} type="email" name="email" maxLength={160} required autoComplete="email" placeholder="you@example.com" />
          </label>
        </div>

        {isGuild ? (
          <>
            <label className="block space-y-2 text-sm font-semibold text-cloud-white">
              Role you want to own
              <select className={INPUT_CLASS} name="track" required defaultValue="">
                <option value="" disabled>Select a production track</option>
                {FOUNDERS_GUILD_TRACKS.map((track) => (
                  <option key={track.value} value={track.value}>{track.label}</option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-cloud-white">
                Time zone
                <input className={INPUT_CLASS} name="timezone" maxLength={80} required placeholder="UTC+5:30 / IST" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-cloud-white">
                Weekly availability
                <input className={INPUT_CLASS} name="availability" maxLength={80} required placeholder="Example: 6–8 hours" />
              </label>
            </div>
            <label className="block space-y-2 text-sm font-semibold text-cloud-white">
              Portfolio or work link <span className="font-normal text-muted-text">(optional, HTTPS)</span>
              <div className="relative">
                <ExternalLink className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-text" aria-hidden="true" />
                <input className={`${INPUT_CLASS} pl-11`} type="url" name="portfolio" maxLength={300} placeholder="https://your-work.example" />
              </div>
            </label>
          </>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-cloud-white">
              Review focus
              <select className={INPUT_CLASS} name="focusArea" required defaultValue="">
                <option value="" disabled>Choose what you reviewed</option>
                {REVIEW_FOCUS_AREAS.map((area) => (
                  <option key={area.value} value={area.value}>{area.label}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm font-semibold text-cloud-white">
              Current impression
              <select className={INPUT_CLASS} name="rating" required defaultValue="">
                <option value="" disabled>Rate the current direction</option>
                <option value="5">5 — I would rally a squad</option>
                <option value="4">4 — Strong, with clear opportunities</option>
                <option value="3">3 — Promising but not convincing yet</option>
                <option value="2">2 — Major problems need solving</option>
                <option value="1">1 — The premise is not working for me</option>
              </select>
            </label>
          </div>
        )}

        <label className="block space-y-2 text-sm font-semibold text-cloud-white">
          {isGuild ? "What can you own, improve and finish?" : "Your review"}
          <span className="block text-xs font-normal leading-relaxed text-muted-text">
            {isGuild
              ? "Describe relevant work, how you communicate, and the part of Episode 1 you would be excited to take responsibility for."
              : "Be specific: what pulled you in, what felt unclear, and the single change that would most improve your desire to play."}
          </span>
          <textarea
            className={`${INPUT_CLASS} min-h-52 resize-y`}
            name="message"
            minLength={80}
            maxLength={2400}
            required
            placeholder={isGuild ? "I can take ownership of…" : "The strongest part is… The part I do not believe yet is…"}
          />
        </label>

        {!isGuild ? (
          <label className="flex gap-3 border-l-2 border-hot-pink bg-[#0d1020] p-4 text-sm leading-relaxed text-muted-text">
            <input className="mt-1 h-4 w-4 flex-none accent-[#B7FF36]" type="checkbox" name="publicConsent" />
            <span>You may quote this review publicly with my display name. The team may edit for length without changing the meaning.</span>
          </label>
        ) : null}

        <label className="flex gap-3 text-sm leading-relaxed text-muted-text">
          <input className="mt-1 h-4 w-4 flex-none accent-[#B7FF36]" type="checkbox" name="consent" required />
          <span>
            I am 13 or older and agree that Rascal Labs may review this submission and email me about the project. I understand a Guild application or QA roster ID is not employment, payment or guaranteed game access.
          </span>
        </label>

        <label className="sr-only" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 bg-toxic-lime px-5 py-3 font-display text-base font-bold uppercase tracking-wide text-midnight-bg transition hover:bg-cloud-white focus:outline-none focus:ring-2 focus:ring-toxic-lime focus:ring-offset-2 focus:ring-offset-panel-navy disabled:cursor-wait disabled:opacity-60"
        >
          {state === "sending" ? <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Send className="h-5 w-5 transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />}
          {state === "sending" ? "Transmitting signal…" : isGuild ? "Send Guild application" : "Submit review & claim QA badge"}
        </button>

        {statusMessage ? (
          <div
            className={`border-l-2 p-4 ${state === "success" ? "border-toxic-lime bg-toxic-lime/10 text-cloud-white" : "border-alert-red bg-alert-red/10 text-cloud-white"}`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              {state === "success" ? <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-toxic-lime" aria-hidden="true" /> : null}
              <div>
                <p className="font-semibold">{statusMessage}</p>
                {result ? <p className="mt-2 font-mono text-xs text-toxic-lime">SIGNAL ID · {result.id}</p> : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-3 border-t border-panel-navy-light pt-5 text-xs text-muted-text sm:grid-cols-3">
          <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-hot-pink" aria-hidden="true" />Email confirmation</span>
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-royal-purple" aria-hidden="true" />Human review</span>
          <span className="flex items-center gap-2"><Star className="h-4 w-4 text-reward-yellow" aria-hidden="true" />No pay-to-belong</span>
        </div>
      </div>
    </form>
  );
}

export function CommunityForms() {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2">
      <SubmissionForm kind="feedback" />
      <SubmissionForm kind="guild" />
    </div>
  );
}
