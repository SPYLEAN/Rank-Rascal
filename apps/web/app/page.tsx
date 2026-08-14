import Link from "next/link";
import Image from "next/image";
import { RazzMascot } from "@/components/RazzMascot";
import { RotfilePreview } from "@/components/RotfilePreview";
import { FlexCardPreview } from "@/components/FlexCardPreview";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { BadgeCard } from "@/components/BadgeCard";
import { CommandCard } from "@/components/CommandCard";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  Gamepad2,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Flame,
  Clock,
  Lock,
  Layers,
  Users,
  EyeOff,
  Trophy,
} from "lucide-react";

export default function HomePage() {
  const discordInviteUrl =
    process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || "/invite";

  const realCommands = [
    {
      name: "/link-roblox",
      syntax: "/link-roblox",
      description: "Verify Roblox ownership through official PKCE OAuth flow.",
      category: "Identity & Linking" as const,
      privacyIndicator: "Ephemeral / Private" as const,
      example: "/link-roblox",
    },
    {
      name: "/preview-roblox",
      syntax: "/preview-roblox username:<roblox_username>",
      description: "Test an explicitly unverified public profile for fast inspection.",
      category: "Identity & Linking" as const,
      privacyIndicator: "Public" as const,
      example: "/preview-roblox username:Builderman",
    },
    {
      name: "/rotfile",
      syntax: "/rotfile [user:<discord_user>]",
      description: "Display a privacy-aware Roblox identity card with avatar and badges.",
      category: "Humor & Flex" as const,
      privacyIndicator: "Witness Protection Aware" as const,
      example: "/rotfile user:@BloxLegend",
    },
    {
      name: "/dripcheck",
      syntax: "/dripcheck [user:<discord_user>]",
      description: "Inspect an avatar with safe, deterministic chaotic humor.",
      category: "Humor & Flex" as const,
      privacyIndicator: "Witness Protection Aware" as const,
      example: "/dripcheck user:@NoobSlayer",
    },
    {
      name: "/fraudcheck",
      syntax: "/fraudcheck target:<discord_user>",
      description: "Compare your public badge count against a server rival.",
      category: "Leaderboards" as const,
      privacyIndicator: "Witness Protection Aware" as const,
      example: "/fraudcheck target:@ChaosKing",
    },
    {
      name: "/yapping-order",
      syntax: "/yapping-order",
      description: "View top server identity rankings and certified brain rot rep.",
      category: "Leaderboards" as const,
      privacyIndicator: "Witness Protection Aware" as const,
      example: "/yapping-order",
    },
    {
      name: "/witness-protection",
      syntax: "/witness-protection enabled:<true|false>",
      description: "Opt in or out of public server discovery and leaderboards.",
      category: "Privacy & Config" as const,
      privacyIndicator: "Ephemeral / Private" as const,
      example: "/witness-protection enabled:true",
    },
    {
      name: "/unlink-roblox",
      syntax: "/unlink-roblox",
      description: "Delete your server-specific link and all stored data permanently.",
      category: "Privacy & Config" as const,
      privacyIndicator: "Ephemeral / Private" as const,
      example: "/unlink-roblox",
    },
    {
      name: "/rascal-config",
      syntax: "/rascal-config [announcements:<bool>] [humor:<1-3>]",
      description: "Configure server manager humor levels and public announcement behavior.",
      category: "Privacy & Config" as const,
      permissions: "Manage Server Only",
      privacyIndicator: "Ephemeral / Private" as const,
      example: "/rascal-config humor:2 announcements:true",
    },
  ];

  return (
    <div className="space-y-24 pb-16 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-toxic-lime" />
              <span>Certified Roblox Gaming Identity Bot</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cloud-white tracking-tight leading-tight uppercase">
              PLAY GAMES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-purple via-toxic-lime to-hot-pink">
                FLEX ACHIEVEMENTS.
              </span> <br />
              COLLECT CHAOS.
            </h1>

            <p className="text-base sm:text-lg text-muted-text max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Turn your gaming identity into verified flexes, collectible badges, friendly rivalries and server-wide chaos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-8 py-4 rounded-2xl font-display font-bold text-base transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <Sparkles className="w-5 h-5 text-toxic-lime" />
                <span>Add to Discord</span>
              </a>

              <Link
                href="/commands"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-panel-navy hover:bg-panel-navy-light text-cloud-white border border-panel-navy-light px-6 py-4 rounded-2xl font-display font-semibold text-base transition-all hover:border-toxic-lime"
              >
                <Terminal className="w-5 h-5 text-toxic-lime" />
                <span>See the commands</span>
              </Link>
            </div>
          </div>

          {/* Hero Composition with Mascot, Emojis, and Compact Flex Cards */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute inset-0 bg-royal-purple/20 rounded-full blur-3xl -z-10 transform scale-90" />

            {/* Floating Decorative Emoji 1 */}
            <div className="absolute -top-4 -left-4 z-20 animate-bounce motion-reduce:animate-none">
              <div className="w-12 h-12 rounded-2xl bg-midnight-bg border-2 border-toxic-lime p-1 shadow-sticker">
                <Image src="/brand/emojis/discord/rascal-hype.png" alt="" width={40} height={40} className="object-contain" />
              </div>
            </div>

            {/* Floating Decorative Emoji 2 */}
            <div className="absolute -bottom-4 -right-4 z-20 animate-pulse motion-reduce:animate-none">
              <div className="w-12 h-12 rounded-2xl bg-midnight-bg border-2 border-hot-pink p-1 shadow-sticker">
                <Image src="/brand/emojis/discord/rascal-win.png" alt="" width={40} height={40} className="object-contain" />
              </div>
            </div>

            {/* Compact Floating Stat Pill */}
            <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 hidden sm:block">
              <div className="p-3 rounded-2xl bg-panel-navy border-2 border-royal-purple shadow-sticker space-y-1 font-mono text-xs text-cloud-white">
                <div className="flex items-center space-x-1 text-reward-yellow font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>#1 SERVER RANK</span>
                </div>
                <div className="text-[11px] text-toxic-lime">342 Badges • 85 Rep</div>
              </div>
            </div>

            {/* Central Mascot Box */}
            <div className="relative p-6 rounded-3xl bg-panel-navy/90 border-sticker-purple glow-purple text-center w-full max-w-sm">
              <RazzMascot pose="hero-point" size={300} className="mx-auto" />
              <div className="mt-2 p-3 rounded-xl bg-midnight-bg border border-panel-navy-light font-mono text-xs text-toxic-lime">
                &quot;Ready to inspect your server&apos;s rotted stats!&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF & STATUS STRIP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-4 sm:p-6 rounded-3xl bg-panel-navy border-sticker grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-xs text-cloud-white">
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <ShieldCheck className="w-5 h-5 text-toxic-lime" />
            <span className="font-bold text-cloud-white">Zero Stored Passwords</span>
            <span className="text-[10px] text-muted-text">Official PKCE OAuth</span>
          </div>
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <Terminal className="w-5 h-5 text-royal-purple" />
            <span className="font-bold text-cloud-white">9 Production Commands</span>
            <span className="text-[10px] text-muted-text">Gateway WebSockets</span>
          </div>
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <EyeOff className="w-5 h-5 text-hot-pink" />
            <span className="font-bold text-cloud-white">Opt-In Privacy</span>
            <span className="text-[10px] text-muted-text">/witness-protection</span>
          </div>
          <div className="p-3 rounded-2xl bg-midnight-bg border border-panel-navy-light/60 flex flex-col items-center justify-center space-y-1">
            <Flame className="w-5 h-5 text-reward-yellow" />
            <span className="font-bold text-cloud-white">Safe Curated Humor</span>
            <span className="text-[10px] text-muted-text">No Harmful Insults</span>
          </div>
        </div>
      </section>

      {/* 3. HOW RANK RASCAL WORKS (3-STEP) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-cloud-white uppercase">
            How the Chaos Works
          </h2>
          <p className="text-muted-text text-base">
            Three simple steps to transform raw Roblox data into Discord server entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-royal-purple/20 border border-royal-purple/40 flex items-center justify-center text-royal-purple font-display font-bold text-xl">
              1
            </div>
            <h3 className="font-display font-bold text-xl text-cloud-white">Connect Roblox</h3>
            <p className="text-sm text-muted-text leading-relaxed">
              Use <code className="text-toxic-lime font-mono">/link-roblox</code> to authorize via official Roblox PKCE OAuth. Your password stays safely on Roblox servers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-hot-pink/20 border border-hot-pink/40 flex items-center justify-center text-hot-pink font-display font-bold text-xl">
              2
            </div>
            <h3 className="font-display font-bold text-xl text-cloud-white">Flex Achievements</h3>
            <p className="text-sm text-muted-text leading-relaxed">
              Generate instant <code className="text-toxic-lime font-mono">/rotfile</code> identity cards, execute <code className="text-toxic-lime font-mono">/dripcheck</code> avatar inspections, and challenge rivals with <code className="text-toxic-lime font-mono">/fraudcheck</code>.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-toxic-lime/20 border border-toxic-lime/40 flex items-center justify-center text-toxic-lime font-display font-bold text-xl">
              3
            </div>
            <h3 className="font-display font-bold text-xl text-cloud-white">Collect Chaos & Rep</h3>
            <p className="text-sm text-muted-text leading-relaxed">
              Climb the <code className="text-toxic-lime font-mono">/yapping-order</code> server leaderboard, earn Rascal Rep, unlock collectible badge cards, and rule the server.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHY RANK RASCAL IS DIFFERENT */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker-purple glow-purple space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-hot-pink/20 border border-hot-pink/40 text-hot-pink font-mono text-xs font-bold uppercase">
              <Layers className="w-4 h-4" />
              <span>Core Differentiators</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-cloud-white uppercase">
              OTHER BOTS ADD COMMANDS. THIS ONE ADDS A GAME LAYER.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex justify-center">
              <Image
                src="/brand/website-art/razz-why-different.png"
                alt="Razz connects verified profiles, badges, rivalries, rankings and privacy controls."
                width={700}
                height={466}
                className="w-full h-auto max-w-md object-contain rounded-2xl"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-1">
                <h3 className="font-display font-bold text-cloud-white text-base text-toxic-lime">1. Verified Flex</h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Link a real gaming identity and turn public achievements into shareable proof—not made-up clout.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-1">
                <h3 className="font-display font-bold text-cloud-white text-base text-royal-purple">2. One Gaming Rotfile</h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Your avatars, badges, reputation, victories and certified questionable decisions live in one evolving profile.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-1">
                <h3 className="font-display font-bold text-cloud-white text-base text-hot-pink">3. Friendly Rivalries</h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Challenge friends, compare progress and climb the Yapping Order without turning competition into humiliation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-1">
                <h3 className="font-display font-bold text-cloud-white text-base text-reward-yellow">4. Collectible Chaos</h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Unlock social badges, complete quests and turn everyday server moments into progression.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-1">
                <h3 className="font-display font-bold text-cloud-white text-base text-toxic-lime">5. Privacy That Makes Sense</h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Hide public comparisons, unlink accounts and control whether your Rotfile appears in community rankings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ROTFILE & VERIFIED IDENTITY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Identity Cards</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-cloud-white">
              The Rotfile: Your Verified Gaming Identity
            </h2>
            <p className="text-muted-text text-sm sm:text-base leading-relaxed">
              Your Rotfile pulls your verified Roblox avatar, public badge milestones, account creation era, and custom Rascal Rep score into an instantly shareable Discord card.
            </p>
            <ul className="space-y-3 text-xs font-mono text-cloud-white/90">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                <span>Deterministic Drip Check Verdicts</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                <span>Verified Roblox OAuth Ownership</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                <span>Opt-out privacy with /witness-protection</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/games/roblox"
                className="inline-flex items-center space-x-2 text-toxic-lime hover:underline font-mono text-xs font-semibold"
              >
                <span>Learn about Roblox integration</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <RotfilePreview />
          </div>
        </div>
      </section>

      {/* 6. FRIENDLY RIVALRY & YAPPING ORDER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-cloud-white uppercase">
            Friendly Rivalry & Server Leaderboard
          </h2>
          <p className="text-muted-text text-base">
            See who rules your server&apos;s gaming hierarchy with privacy-aware public leaderboards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <FlexCardPreview />
          </div>
          <div className="lg:col-span-7">
            <LeaderboardPreview />
          </div>
        </div>
      </section>

      {/* 7. REWARDS, BADGES & QUESTS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <Image
                src="/brand/website-art/razz-reward-machine.png"
                alt="Razz turns a machine that produces collectible badges and quest tickets."
                width={600}
                height={400}
                className="w-full h-auto max-w-md object-contain rounded-2xl"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase">
                <Award className="w-4 h-4" />
                <span>Rewards & Progression</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-cloud-white uppercase">
                YOUR SERVER MOMENTS JUST DROPPED LOOT.
              </h2>
              <p className="text-sm text-muted-text leading-relaxed">
                Collect decorative badges, finish quests and turn everyday gaming moments into progress. No gambling. No cash value. Just certified server lore.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <BadgeCard
              title="Veteran Noob"
              category="Roblox Milestones"
              description="Verify a Roblox account at least 1,095 days old."
              rarity="Rare"
              isUnlocked={false}
              statusLabel="Preview"
              badgeImage="/brand/badges/veteran-noob.png"
            />
            <BadgeCard
              title="Drip Monarch"
              category="Participation"
              description="Complete a self Drip Check on five distinct days with a verified Roblox identity."
              rarity="Legendary"
              isUnlocked={false}
              statusLabel="Preview"
              badgeImage="/brand/badges/drip-monarch.png"
            />
            <BadgeCard
              title="Quest Crusader"
              category="Server Quests"
              description="Completed 10 verified Rank Rascal quests."
              rarity="Rascal"
              isUnlocked={false}
              statusLabel="Preview"
              badgeImage="/brand/badges/quest-crusader.png"
            />
          </div>
        </div>
      </section>

      {/* 8. ROBLOX LIVE INTEGRATION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker-lime glow-lime grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-display font-extrabold text-3xl text-cloud-white">Roblox Integration</span>
              <span className="px-3 py-1 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-xs font-mono font-bold text-toxic-lime">
                LIVE INTEGRATION
              </span>
            </div>
            <p className="text-sm text-muted-text leading-relaxed">
              Official PKCE OAuth integration, verified profiles, Rotfiles, Drip Checks, Fraud Checks, and public badge counting.
            </p>
          </div>
          <div className="lg:col-span-4 text-right">
            <Link
              href="/games/roblox"
              className="inline-flex items-center space-x-2 bg-royal-purple text-cloud-white px-6 py-3 rounded-xl font-mono text-xs font-bold hover:bg-royal-purple/90"
            >
              <span>Roblox Docs</span>
              <ArrowRight className="w-4 h-4 text-toxic-lime" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FORTNITE AND VALORANT ROADMAP (16:9 PANELS) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-cloud-white uppercase">
            Supported Games & Roadmap
          </h2>
          <p className="text-muted-text text-base">
            Roblox is our live integration. We provide an honest roadmap for future titles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* VALORANT Panel */}
          <div className="p-6 rounded-3xl bg-panel-navy border border-panel-navy-light space-y-4 relative overflow-hidden group">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-midnight-bg border border-panel-navy-light">
              <Image
                src="/brand/website-art/razz-tactical-coming-soon-banner.png"
                alt="Razz leads an original neon tactical squad through a training arena."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1.5 rounded-full bg-reward-yellow border border-reward-yellow/80 text-midnight-bg font-mono font-extrabold text-xs tracking-wider flex items-center space-x-1 shadow-sticker">
                  <Clock className="w-3.5 h-3.5" />
                  <span>COMING SOON</span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-cloud-white">VALORANT</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Tactical squad rankings, headshot percentage flex cards, and agent main rivalry comparisons planned. Integration details remain under research.
              </p>
            </div>
          </div>

          {/* Fortnite Panel */}
          <div className="p-6 rounded-3xl bg-panel-navy border border-panel-navy-light space-y-4 relative overflow-hidden group">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-midnight-bg border border-panel-navy-light">
              <Image
                src="/brand/website-art/razz-battle-royale-coming-soon-banner.png"
                alt="Razz glides toward a colorful floating-island competition."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1.5 rounded-full bg-reward-yellow border border-reward-yellow/80 text-midnight-bg font-mono font-extrabold text-xs tracking-wider flex items-center space-x-1 shadow-sticker">
                  <Clock className="w-3.5 h-3.5" />
                  <span>COMING SOON</span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-cloud-white">Fortnite</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Battle Royale victory stats, crown flex cards, and locker cosmetic drip checks in development. Integration details remain under research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PRIVACY AND SAFETY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker-purple space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <Image
                src="/brand/website-art/razz-privacy-guardian.png"
                alt="Razz protects a verified profile with a privacy shield and key."
                width={500}
                height={750}
                className="w-full h-auto max-w-xs object-contain rounded-2xl"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Opt-In Privacy Controls</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-cloud-white uppercase">
                VERIFIED FLEX. PRIVATE WHEN YOU WANT IT.
              </h2>
              <ul className="space-y-3 text-xs font-mono text-cloud-white/90">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                  <span>Roblox handles passwords exclusively</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                  <span>Rank Rascal never requests a Roblox password</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                  <span>Witness Protection hides profiles from public rankings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                  <span>Users can unlink their account anytime with /unlink-roblox</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-toxic-lime flex-shrink-0" />
                  <span>Verified game data and humorous verdicts are clearly separated</span>
                </li>
              </ul>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                <Link href="/verify" className="text-toxic-lime hover:underline font-semibold">
                  Read Verification Guide →
                </Link>
                <Link href="/privacy" className="text-toxic-lime hover:underline font-semibold">
                  Read Privacy Policy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. COMMUNITY CLOSING CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border-sticker-lime glow-lime min-h-[380px] flex items-center justify-center text-center p-8 sm:p-14">
          <Image
            src="/brand/website-art/razz-community-clubhouse-banner.png"
            alt="Razz hosts a joyful digital clubhouse filled with profiles, badges and reactions."
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover -z-10"
          />
          {/* Dark backdrop gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121526] via-[#121526]/85 to-[#121526]/60 -z-10" />

          <div className="max-w-2xl mx-auto space-y-6 z-10">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase">
              YOUR SERVER IS ABOUT TO GET LORE.
            </h2>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
              Build Rotfiles, hunt badges, challenge friends and give every gaming session something worth yapping about.
            </p>
            <div className="pt-2">
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-8 py-4 rounded-2xl font-display font-bold text-base transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <Sparkles className="w-5 h-5 text-toxic-lime" />
                <span>Add Rank Rascal</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
