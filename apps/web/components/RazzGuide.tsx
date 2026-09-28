"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Compass,
  Crown,
  HelpCircle,
  Maximize2,
  MessageSquareText,
  Minus,
  Radio,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import {
  isAudioEnabled,
  playScanPulse,
  playUiClick,
  toggleAudio,
} from "@/lib/sound-effects";

type ChatMessage = {
  id: number;
  speaker: "razz" | "visitor";
  text: string;
  badge?: string;
  action?: { label: string; href: string };
};

const OPENING_LINE =
  "Yo! You found the realm before the Crown finished deleting the honest routes. I'm Razz—your guide, and occasional hazard. What part of the mystery are you investigating?";

const QUICK_TOPICS = [
  { label: "The World Lies", query: "How does The World Lies and the SUS system work?" },
  { label: "The 11 Locations", query: "Tell me about the places in Stickerwood." },
  { label: "The 6 Heroes", query: "Who are the six playable heroes?" },
  { label: "King Wrongway", query: "Who is King Wrongway and why is reality broken?" },
  { label: "Razz's Glitch Eye", query: "Why do you have a segmented glitch eye?" },
  { label: "Join Discord", query: "Where is the Discord community?" },
] as const;

function replyTo(question: string): {
  text: string;
  badge: string;
  action?: { label: string; href: string };
} {
  const input = question.toLowerCase();

  if (input.includes("discord") || input.includes("community") || input.includes("join")) {
    return {
      text: "The official Rascal Labs Discord community is live! That's where squads debate evidence, report glitches, and take part in early Founders Guild sprints.",
      badge: "COMMUNITY",
      action: { label: "Enter Discord Community", href: process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://discord.gg/gkneGrpzAn" },
    };
  }

  if (input.includes("wrongway") || input.includes("king")) {
    return {
      text: "King Wrongway is not a cardboard villain. He used the Crown to enforce one safe version of reality after a forgotten collapse. Now his final command deletes any road, truth, or memory that disagrees with him.",
      badge: "CROWN DOSSIER",
      action: { label: "Read King Wrongway Lore", href: "/game#premise" },
    };
  }

  if (input.includes("hero") || input.includes("class") || input.includes("crown knight") || input.includes("glitchcaster") || input.includes("shadow ranger") || input.includes("trickster") || input.includes("lorekeeper") || input.includes("badge scout")) {
    return {
      text: "Six heroes so far: Crown Knight, Glitchcaster, Shadow Ranger, Trickster, Lorekeeper and Badge Scout. Each one reads a different kind of evidence—no single hero owns the whole truth.",
      badge: "SQUAD ROSTER",
      action: { label: "Meet the Heroes", href: "/#heroes" },
    };
  }

  if (input.includes("qa") || input.includes("test") || input.includes("review") || input.includes("roster")) {
    return {
      text: "We recruit QA scouts in cohorts—focusing on edge cases, device coverage, and accessibility. Submit a review on the Founders Guild page and get a verified QA ID and certificate.",
      badge: "QA PROGRAM",
      action: { label: "Join Founding QA Roster", href: "/community#review" },
    };
  }

  if (
    (input.includes("world") && input.includes("lie")) ||
    input.includes("sus") ||
    input.includes("evidence") ||
    input.includes("marker")
  ) {
    return {
      text: "Never follow the quest marker blindly! The sign is an argument, not a fact. Shadows, terrain sounds, old compass needles, and witnesses will contradict the official notice. Prove the lie with your squad and the level rewrites itself.",
      badge: "S.U.S. SYSTEM",
      action: { label: "Try the S.U.S. Terminal", href: "#world-lies" },
    };
  }

  if (input.includes("stickerwood") || input.includes("map") || input.includes("location") || input.includes("place") || input.includes("forest") || input.includes("ruins") || input.includes("plaza") || input.includes("cove") || input.includes("bridge")) {
    return {
      text: "Stickerwood is one seamless handcrafted realm, eleven places deep: Starting Village, Stickerwood's Heartwood, Mystery Forest, the Ancient Tree, Glitch Grove, Rascal Plaza, River Path, Hidden Cove, Crown Ruins, the Sky Bridges, and the sealed King Wrongway Citadel. Consequences travel across borders—no disjointed level-select menus.",
      badge: "ATLAS",
      action: { label: "Open the Atlas", href: "#explore-stickerwood" },
    };
  }

  if (input.includes("eye") || input.includes("glitch") || input.includes("crown") || input.includes("look")) {
    return {
      text: "My circular digital eye tracks the fracture seams where the Crown forced an edit over reality. The normal lime eye sees what exists; the glitch eye sees what was erased. The jokes keep everyone calm while the ground is shaking!",
      badge: "ABOUT RAZZ",
    };
  }

  if (input.includes("roblox") || input.includes("engine") || input.includes("luau") || input.includes("tech")) {
    return {
      text: "We are engineering Crownfall directly in Roblox Studio with modular Luau architecture, server-authoritative multiplayer state, responsive camera rigs, and bespoke papercraft environmental shaders. None of it is a finished build yet—follow the devlog for real progress.",
      badge: "BUILD NOTES",
      action: { label: "Read Devlog", href: "/devlog" },
    };
  }

  return {
    text: "That part of the archive is still tangled in Crown corruption. Ask me about The World Lies, the eleven places in Stickerwood, the six heroes, King Wrongway, joining the Discord, or the QA roster.",
    badge: "UNKNOWN QUERY",
  };
}

export function RazzGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [input, setInput] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      speaker: "razz",
      text: OPENING_LINE,
      badge: "SYSTEM GREETING",
    },
  ]);
  const nextId = useRef(2);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowGreeting(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  const openGuide = () => {
    playScanPulse();
    setIsOpen(true);
    setShowGreeting(false);
  };

  const toggleSound = () => {
    const nextState = toggleAudio();
    setSoundOn(nextState);
    if (nextState) playUiClick();
  };

  const send = (question: string) => {
    const clean = question.trim();
    if (!clean) return;

    playUiClick();
    const visitorId = nextId.current++;
    const razzId = nextId.current++;

    const reply = replyTo(clean);

    setMessages((current) => [
      ...current,
      { id: visitorId, speaker: "visitor", text: clean },
      {
        id: razzId,
        speaker: "razz",
        text: reply.text,
        badge: reply.badge,
        action: reply.action,
      },
    ]);
    setInput("");

    setTimeout(() => {
      playScanPulse();
    }, 180);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(input);
  };

  return (
    <>
      {/* High-End Floating Greeting Pill */}
      {showGreeting && !isOpen ? (
        <aside
          aria-label="Razz Field Guide suggestion"
          className="fixed bottom-24 right-5 z-40 max-w-sm animate-bounce border-2 border-toxic-lime bg-[#101328]/95 p-4 shadow-[0_0_30px_rgba(183,255,54,0.35)] backdrop-blur-xl motion-reduce:animate-none sm:right-8"
        >
          <div className="flex items-start gap-3.5">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-toxic-lime bg-royal-purple/30 p-0.5 shadow-md">
              <Image
                src={BRAND_ASSETS.insignias.razzMedallion}
                alt="Razz mascot medallion"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-hot-pink">
                <Radio className="h-3 w-3 animate-pulse text-toxic-lime" />
                <span>Ask Razz</span>
              </div>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-cloud-white">
                &ldquo;Need the lowdown on Stickerwood, King Wrongway, or our Discord?&rdquo;
              </p>
              <div className="mt-2.5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={openGuide}
                  className="font-mono text-[11px] font-bold uppercase tracking-wider text-toxic-lime hover:text-cloud-white"
                >
                  Open Ask Razz →
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowGreeting(false)}
              className="text-cloud-white/40 hover:text-cloud-white"
              aria-label="Dismiss greeting"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </aside>
      ) : null}

      {/* Floating Ask Razz Launcher Button */}
      <div className="fixed bottom-6 right-5 z-40 sm:right-8">
        <button
          type="button"
          onClick={() => {
            if (isOpen) {
              playUiClick();
              setIsOpen(false);
            } else {
              openGuide();
            }
          }}
          aria-expanded={isOpen}
          aria-label="Toggle Ask Razz guide"
          className="group relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-toxic-lime bg-[#101328] shadow-[0_0_35px_rgba(183,255,54,0.4)] transition-all hover:scale-105 hover:border-hot-pink hover:shadow-[0_0_35px_rgba(255,79,163,0.4)]"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full p-0.5">
            <Image
              src={BRAND_ASSETS.insignias.razzMedallion}
              alt="Razz investigation guide medallion"
              width={48}
              height={48}
              className="object-contain transition group-hover:scale-110"
            />
          </div>
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-hot-pink opacity-75" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-toxic-lime" />
          </span>
        </button>
      </div>

      {/* Ask Razz Panel */}
      {isOpen ? (
        <section
          aria-labelledby="razz-guide-title"
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-lg flex-col overflow-hidden rounded-2xl border-2 border-toxic-lime/80 bg-[#0c0f20]/95 shadow-[0_0_60px_rgba(122,77,255,0.4)] backdrop-blur-2xl sm:right-8 sm:w-[460px]"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-royal-purple/40 bg-gradient-to-r from-[#141836] via-[#101328] to-[#141836] px-5 py-3.5">
            <div className="flex items-center gap-3.5">
              <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border-2 border-toxic-lime bg-royal-purple/40 p-0.5 shadow-[0_0_12px_#B7FF36]">
                <Image
                  src={BRAND_ASSETS.insignias.razzMedallion}
                  alt="Razz medallion"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="razz-guide-title" className="font-display text-base font-extrabold text-cloud-white">
                    Ask Razz
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded bg-toxic-lime/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-toxic-lime border border-toxic-lime/30">
                    <Radio className="h-2.5 w-2.5 animate-pulse text-hot-pink" />
                    HERE NOW
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-text">
                  Glitch eye synced · ask about the realm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className="rounded p-1.5 text-cloud-white/70 hover:bg-royal-purple/20 hover:text-toxic-lime transition"
                title={soundOn ? "Mute sounds" : "Enable sounds"}
                aria-label={soundOn ? "Mute audio" : "Unmute audio"}
              >
                {soundOn ? <Volume2 className="h-4 w-4 text-toxic-lime" /> : <VolumeX className="h-4 w-4 text-hot-pink" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  setIsOpen(false);
                }}
                className="rounded p-1.5 text-cloud-white/70 hover:bg-royal-purple/20 hover:text-cloud-white transition"
                aria-label="Close field guide"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick topic chips */}
          <div className="border-b border-royal-purple/30 bg-[#090b16] px-4 py-2.5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-hot-pink flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                Ask about
              </span>
              <span className="font-mono text-[9px] text-cloud-white/40">1–4 player co-op</span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => send(topic.query)}
                  className="whitespace-nowrap rounded-lg border border-royal-purple/50 bg-[#161a38] px-3 py-1 font-mono text-[11px] font-bold text-cloud-white/85 hover:border-toxic-lime hover:bg-toxic-lime/10 hover:text-toxic-lime transition"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Stream */}
          <div
            ref={logRef}
            className="flex max-h-[360px] min-h-[240px] flex-col gap-3.5 overflow-y-auto p-4 text-xs leading-relaxed"
          >
            {messages.map((message) => {
              const isRazz = message.speaker === "razz";
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isRazz ? "items-start" : "items-end"}`}
                >
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-text mb-1 flex items-center gap-1.5">
                    {isRazz ? (
                      <>
                        <Crown className="h-3 w-3 text-toxic-lime" />
                        <span>Razz · {message.badge || "REPLY"}</span>
                      </>
                    ) : (
                      <span>You</span>
                    )}
                  </span>
                  <div
                    className={`max-w-[90%] rounded-xl p-3.5 shadow-lg ${
                      isRazz
                        ? "border-l-4 border-toxic-lime bg-[#141836] text-cloud-white border border-royal-purple/30"
                        : "bg-gradient-to-r from-royal-purple/40 to-royal-purple/20 text-toxic-lime border border-royal-purple/60"
                    }`}
                  >
                    <p className="text-[13px] leading-relaxed">{message.text}</p>
                    {message.action && (
                      <div className="mt-3 border-t border-cloud-white/10 pt-2.5">
                        <Link
                          href={message.action.href}
                          onClick={() => {
                            if (!message.action?.href.startsWith("http")) {
                              setIsOpen(false);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-toxic-lime hover:text-cloud-white transition"
                        >
                          {message.action.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-royal-purple/40 bg-[#0e1124] p-3.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Razz about clues, King Wrongway, Discord, or QA..."
              className="flex-1 rounded-lg border border-cloud-white/15 bg-midnight-bg px-3.5 py-2.5 font-sans text-xs text-cloud-white placeholder-cloud-white/40 focus:border-toxic-lime focus:outline-none focus:ring-1 focus:ring-toxic-lime"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message to Razz"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-toxic-lime text-midnight-bg disabled:opacity-40 transition hover:bg-cloud-white"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
