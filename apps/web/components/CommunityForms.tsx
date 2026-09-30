"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Download, Loader2, RotateCcw } from "lucide-react";
import { FOUNDERS_GUILD_TRACKS, REVIEW_FOCUS_AREAS } from "@/lib/game-content";

type FormKind = "feedback" | "guild";
type Phase = "idle" | "sending" | "success" | "error";
type Result = { id: string; kind: FormKind; delivery: "email" | "local"; badgeSvg?: string; certificateSvg?: string };

const INPUT =
  "block w-full rounded-sm border border-paper-cream/25 bg-[#0e0c1a] px-4 py-3 text-base text-cloud-white outline-none transition placeholder:text-cloud-white/40 hover:border-paper-cream/45 focus:border-antique-gold focus:ring-2 focus:ring-antique-gold/40";

const RATINGS = [
  { value: "1", label: "Not working for me" },
  { value: "2", label: "Major problems" },
  { value: "3", label: "Promising, not convinced" },
  { value: "4", label: "Strong, room to grow" },
  { value: "5", label: "I'd rally a squad" },
] as const;

const ERRORS: Record<string, string> = {
  invalid_submission: "Something's missing. Check each field; the message needs at least 80 characters.",
  too_fast: "That was quick. Read it over once more, then send it again.",
  form_expired: "This form has been open for a long time. Refresh the page and try again.",
  too_many_links: "Please keep it to three links or fewer.",
  rate_limited: "You've sent a few already. Please try again in about 15 minutes.",
  inbox_offline: "Our inbox isn't connected yet, so nothing was sent. Please try again later, or reach us on Discord.",
  delivery_failed: "We couldn't deliver it just now. Please try again in a few minutes.",
};

const MIN_MESSAGE = 80;
const MAX_MESSAGE = 2400;

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** One consistent field: label, control, then hint — so controls line up across columns. */
function Field({ label, hint, hintId, children, className = "" }: { label: string; hint?: string; hintId?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-cloud-white">{label}</span>
        {children}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-cloud-white/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Confirmation({ result, onReset }: { result: Result; onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);
  const isReview = result.kind === "feedback";

  return (
    <div className="py-2" role="status" aria-live="polite">
      {result.delivery === "local" ? (
        <p className="mb-6 border-l-2 border-sky pl-4 text-sm leading-relaxed text-cloud-white/85">
          <strong className="text-cloud-white">Preview mode.</strong> Email isn&apos;t connected in this environment, so no email was sent. The
          submission was saved to the local development inbox instead.
        </p>
      ) : null}
      <p className="section-kicker">{isReview ? "Review received" : "Application received"}</p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-3 font-display text-3xl font-extrabold text-cloud-white outline-none">
        Thank you. A person will read this.
      </h3>
      <p className="mt-4 text-cloud-white/85">
        {isReview ? "Your Founding QA Scout ID" : "Your application ID"}:{" "}
        <span className="rounded-sm bg-antique-gold/15 px-2 py-0.5 font-mono font-bold text-antique-gold">{result.id}</span>
      </p>

      {isReview ? (
        <>
          <p className="mt-4 max-w-2xl leading-relaxed text-cloud-white/85">
            Your review puts you in the Founding QA candidate pool. When playtesting opens, candidates are invited in small groups based on build
            readiness, devices, age requirements and safety capacity. Being in the pool isn&apos;t a guarantee of an invite, a job or payment.
          </p>
          {result.badgeSvg && result.certificateSvg ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-[10rem_1fr] sm:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- generated per reviewer, data URL */}
              <img src={svgDataUrl(result.badgeSvg)} alt={`Founding QA Scout badge ${result.id}`} width={160} height={160} className="h-40 w-40 rounded-full" />
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={svgDataUrl(result.badgeSvg)} download={`crownfall-qa-scout-badge-${result.id}.svg`} className="action-secondary">
                  <Download className="h-4 w-4" aria-hidden="true" /> Download badge
                </a>
                <a href={svgDataUrl(result.certificateSvg)} download={`crownfall-qa-scout-certificate-${result.id}.svg`} className="action-secondary">
                  <Download className="h-4 w-4" aria-hidden="true" /> Download certificate
                </a>
              </div>
            </div>
          ) : null}
          {result.delivery === "email" ? (
            <p className="mt-6 text-sm text-cloud-white/75">A copy of your badge and certificate is on its way to your inbox.</p>
          ) : null}
        </>
      ) : (
        <p className="mt-4 max-w-2xl leading-relaxed text-cloud-white/85">
          We&apos;ll review your work, availability and fit for the current stage of production, and reply by email if there&apos;s a match. This
          isn&apos;t an employment offer; scope, credit, ownership and pay are agreed in writing before any production work.
          {result.delivery === "email" ? " A confirmation is on its way to your inbox." : ""}
        </p>
      )}

      <button type="button" onClick={onReset} className="text-link mt-8 min-h-11">
        <RotateCcw className="h-4 w-4" aria-hidden="true" /> Send another
      </button>
    </div>
  );
}

function SubmissionForm({ kind }: { kind: FormKind }) {
  const uid = useId();
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [messageLength, setMessageLength] = useState(0);
  const [rating, setRating] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const isGuild = kind === "guild";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPhase("sending");
    setError("");

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
      const body = (await response.json().catch(() => ({}))) as Partial<Result> & { error?: string };
      if (!response.ok || !body.id) throw new Error(body.error || "unknown");
      setResult({ id: body.id, kind, delivery: body.delivery === "local" ? "local" : "email", badgeSvg: body.badgeSvg, certificateSvg: body.certificateSvg });
      setPhase("success");
    } catch (caught) {
      const code = caught instanceof Error ? caught.message : "unknown";
      setError(ERRORS[code] ?? "Something went wrong. Check your connection and try again.");
      setPhase("error");
      window.setTimeout(() => errorRef.current?.focus(), 30);
    }
  }

  const reset = () => {
    setResult(null);
    setPhase("idle");
    setError("");
    setRating("");
    setMessageLength(0);
    setStartedAt(Date.now());
  };

  if (phase === "success" && result) return <Confirmation result={result} onReset={reset} />;

  const sending = phase === "sending";

  return (
    <form onSubmit={submit} className="relative" aria-describedby={`${uid}-intro`}>
      <p id={`${uid}-intro`} className="max-w-2xl leading-relaxed text-cloud-white/85">
        {isGuild
          ? "Tell us what you're strongest at, what you'd like to own and how you like to work. A person reads every application."
          : "Tell us what pulls you in, what's unclear and the one change that would make you most want to play. Useful reviews join the Founding QA candidate pool."}
      </p>

      <div className="mt-8 grid gap-x-6 gap-y-6 md:grid-cols-2">
        <Field label="Display name">
          <input className={INPUT} name="name" minLength={2} maxLength={60} required autoComplete="nickname" placeholder="What should we call you?" />
        </Field>
        <Field label="Email" hint="Only for your confirmation and a reply. Never shown publicly." hintId={`${uid}-email-hint`}>
          <input className={INPUT} type="email" name="email" maxLength={160} required autoComplete="email" placeholder="you@example.com" aria-describedby={`${uid}-email-hint`} />
        </Field>

        {isGuild ? (
          <>
            <Field label="Role you'd like to own" className="md:col-span-2">
              <select className={INPUT} name="track" required defaultValue="">
                <option value="" disabled>
                  Choose a production track
                </option>
                {FOUNDERS_GUILD_TRACKS.map((track) => (
                  <option key={track.value} value={track.value}>
                    {track.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Time zone">
              <input className={INPUT} name="timezone" maxLength={80} required placeholder="e.g. UTC+5:30 (IST)" />
            </Field>
            <Field label="Hours per week">
              <input className={INPUT} name="availability" maxLength={80} required placeholder="e.g. 6–8 hours" />
            </Field>
            <Field label="Portfolio or work link (optional)" hint="HTTPS links only." hintId={`${uid}-portfolio-hint`} className="md:col-span-2">
              <input className={INPUT} type="url" name="portfolio" maxLength={300} placeholder="https://" pattern="https://.*" aria-describedby={`${uid}-portfolio-hint`} />
            </Field>
          </>
        ) : (
          <>
            <Field label="What did you look at most?" className="md:col-span-2">
              <select className={INPUT} name="focusArea" required defaultValue="">
                <option value="" disabled>
                  Choose a focus
                </option>
                {REVIEW_FOCUS_AREAS.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset className="md:col-span-2">
              <legend className="mb-2 text-sm font-semibold text-cloud-white">How convincing is the game so far?</legend>
              <div className="grid grid-cols-5 gap-2">
                {RATINGS.map((item) => (
                  <label key={item.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={item.value}
                      required
                      checked={rating === item.value}
                      onChange={() => setRating(item.value)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-12 items-center justify-center rounded-sm border border-paper-cream/25 bg-[#0e0c1a] font-display text-lg font-bold text-cloud-white transition hover:border-paper-cream/50 peer-checked:border-antique-gold peer-checked:bg-antique-gold peer-checked:text-ink-plum peer-focus-visible:ring-2 peer-focus-visible:ring-antique-gold peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#151329]">
                      {item.value}
                      <span className="sr-only"> out of 5: {item.label}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-sm text-cloud-white/75" aria-hidden="true">
                {rating ? RATINGS[Number(rating) - 1].label : "1 = not working for me · 5 = I'd rally a squad"}
              </p>
            </fieldset>
          </>
        )}

        <div className="md:col-span-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-cloud-white">{isGuild ? "What could you own, improve and finish?" : "Your review"}</span>
            <textarea
              className={`${INPUT} min-h-44 resize-y`}
              name="message"
              minLength={MIN_MESSAGE}
              maxLength={MAX_MESSAGE}
              required
              onChange={(event) => setMessageLength(event.target.value.trim().length)}
              aria-describedby={`${uid}-message-hint`}
              placeholder={isGuild ? "The work I'm proudest of is… In Chapter 1 I'd love to own…" : "The strongest part is… The part I don't believe yet is…"}
            />
          </label>
          <p id={`${uid}-message-hint`} className="mt-1.5 flex flex-wrap justify-between gap-2 text-xs text-cloud-white/70">
            <span>
              {isGuild ? "Relevant work, how you communicate, and the part of Chapter 1 you'd like to own." : "Be specific. Honest doubts are as useful as praise."}
            </span>
            <span className={messageLength > 0 && messageLength < MIN_MESSAGE ? "text-antique-gold" : undefined}>
              {messageLength < MIN_MESSAGE ? `${messageLength}/${MIN_MESSAGE} minimum` : `${messageLength}/${MAX_MESSAGE}`}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4 border-t border-paper-cream/15 pt-6">
        {!isGuild ? (
          <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-cloud-white/85">
            <input className="mt-0.5 h-5 w-5 flex-none accent-[#D5A84B]" type="checkbox" name="publicConsent" />
            <span>You may quote this review publicly with my display name. You may shorten it without changing its meaning.</span>
          </label>
        ) : null}
        <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-cloud-white/85">
          <input className="mt-0.5 h-5 w-5 flex-none accent-[#D5A84B]" type="checkbox" name="consent" required />
          <span>
            I&apos;m 13 or older, and Rascal Labs may read this and email me about it. I understand this isn&apos;t a job offer, payment or a guaranteed
            invite to playtest.
          </span>
        </label>

        {/* Honeypot for bots; hidden from people and assistive tech. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {phase === "error" && error ? (
          <p ref={errorRef} tabIndex={-1} role="alert" className="border-l-2 border-hot-magenta pl-4 text-sm leading-relaxed text-cloud-white outline-none">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={sending} className="action-primary disabled:cursor-wait disabled:opacity-70">
            {sending ? <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : null}
            {sending ? "Sending…" : isGuild ? "Send application" : "Send review"}
            {sending ? null : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
          <p className="text-xs text-cloud-white/70">Read by a person · never published without your permission · free, always</p>
        </div>
      </div>
    </form>
  );
}

const TABS: { kind: FormKind; label: string; hash: string }[] = [
  { kind: "feedback", label: "Review the game", hash: "#review" },
  { kind: "guild", label: "Apply to the Founders Guild", hash: "#guild" },
];

/**
 * One panel, two routes in. Links to /community#review and /community#guild open the right
 * form; switching tabs keeps the panel the same size and position.
 */
export function CommunityForms() {
  const [kind, setKind] = useState<FormKind>("feedback");
  const baseId = useId();

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#guild") setKind("guild");
      else if (window.location.hash === "#review") setKind("feedback");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next: FormKind = event.key === "Home" ? "feedback" : event.key === "End" ? "guild" : kind === "feedback" ? "guild" : "feedback";
    setKind(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="relative">
      <span id="review" className="absolute -top-28" aria-hidden="true" />
      <span id="guild" className="absolute -top-28" aria-hidden="true" />
      {/* data-razz-avoid: the floating Ask Razz launcher steps aside whenever it would overlap this panel. */}
      <div className="form-panel" data-razz-avoid>
        <div role="tablist" aria-label="Choose a form" className="grid grid-cols-2 border-b border-paper-cream/15" onKeyDown={onKeyDown}>
          {TABS.map((tab) => {
            const selected = tab.kind === kind;
            return (
              <button
                key={tab.kind}
                id={`${baseId}-tab-${tab.kind}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setKind(tab.kind)}
                className={`min-h-14 border-b-2 px-3 py-3 text-center font-display text-sm font-bold transition sm:text-base ${
                  selected ? "border-antique-gold text-cloud-white" : "border-transparent text-cloud-white/65 hover:text-cloud-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${kind}`} className="p-5 sm:p-8 lg:p-10">
          <SubmissionForm key={kind} kind={kind} />
        </div>
      </div>
    </div>
  );
}
