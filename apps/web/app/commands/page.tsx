"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CommandCard, CommandCardProps } from "@/components/CommandCard";
import { RazzMascot } from "@/components/RazzMascot";
import { Search, Terminal, Sparkles } from "lucide-react";

const COMMANDS_DATA: CommandCardProps[] = [
  {
    name: "/link-roblox",
    syntax: "/link-roblox",
    description: "Generates a secure, expiring Roblox OAuth authorization link with PKCE state protection. Never asks for or stores your Roblox password.",
    category: "Identity & Linking",
    privacyIndicator: "Ephemeral / Private",
    example: "/link-roblox",
  },
  {
    name: "/preview-roblox",
    syntax: "/preview-roblox username:<roblox_username>",
    description: "Inspects an unverified public Roblox profile for testing and fast identity preview.",
    category: "Identity & Linking",
    privacyIndicator: "Public",
    example: "/preview-roblox username:Builderman",
  },
  {
    name: "/rotfile",
    syntax: "/rotfile [user:<discord_user>]",
    description: "Displays a verified Roblox identity card showing avatar, public badge milestones, account age era, and Rascal Rep.",
    category: "Humor & Flex",
    privacyIndicator: "Witness Protection Aware",
    example: "/rotfile user:@BloxLegend",
  },
  {
    name: "/dripcheck",
    syntax: "/dripcheck [user:<discord_user>]",
    description: "Evaluates an avatar's outfit heat using deterministic, safe humor algorithms.",
    category: "Humor & Flex",
    privacyIndicator: "Witness Protection Aware",
    example: "/dripcheck user:@NoobSlayer",
  },
  {
    name: "/fraudcheck",
    syntax: "/fraudcheck target:<discord_user>",
    description: "Compares your public badge count against a server rival in a friendly head-to-head comparison.",
    category: "Leaderboards",
    privacyIndicator: "Witness Protection Aware",
    example: "/fraudcheck target:@ChaosKing",
  },
  {
    name: "/yapping-order",
    syntax: "/yapping-order",
    description: "Ranks top server members by Rascal Rep and public badge milestones.",
    category: "Leaderboards",
    privacyIndicator: "Witness Protection Aware",
    example: "/yapping-order",
  },
  {
    name: "/witness-protection",
    syntax: "/witness-protection enabled:<true|false>",
    description: "Toggles your profile visibility on public server leaderboards and discovery commands.",
    category: "Privacy & Config",
    privacyIndicator: "Ephemeral / Private",
    example: "/witness-protection enabled:true",
  },
  {
    name: "/unlink-roblox",
    syntax: "/unlink-roblox",
    description: "Permanently deletes your server-specific Roblox link and purges profile records.",
    category: "Privacy & Config",
    privacyIndicator: "Ephemeral / Private",
    example: "/unlink-roblox",
  },
  {
    name: "/rascal-config",
    syntax: "/rascal-config [announcements:<bool>] [humor:<1-3>]",
    description: "Configures server-wide humor intensity (1-3) and public announcement channels.",
    category: "Privacy & Config",
    permissions: "Manage Server Only",
    privacyIndicator: "Ephemeral / Private",
    example: "/rascal-config humor:2 announcements:true",
  },
];

const CATEGORIES = [
  "All",
  "Identity & Linking",
  "Humor & Flex",
  "Leaderboards",
  "Privacy & Config",
] as const;

export default function CommandsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredCommands = COMMANDS_DATA.filter((cmd) => {
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || cmd.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative">
      {/* Floating Emoji Reactions */}
      <div className="absolute top-10 left-4 hidden lg:block animate-bounce motion-reduce:animate-none">
        <div className="w-10 h-10 rounded-xl bg-midnight-bg border border-toxic-lime p-1 shadow-sticker">
          <Image src="/brand/emojis/discord/rascal-hype.png" alt="" width={32} height={32} className="object-contain" />
        </div>
      </div>
      <div className="absolute top-10 right-4 hidden lg:block animate-pulse motion-reduce:animate-none">
        <div className="w-10 h-10 rounded-xl bg-midnight-bg border border-hot-pink p-1 shadow-sticker">
          <Image src="/brand/emojis/discord/rascal-lol.png" alt="" width={32} height={32} className="object-contain" />
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
          <Terminal className="w-4 h-4" />
          <span>Discord Command Directory</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-cloud-white uppercase">
          Rank Rascal Commands
        </h1>
        <p className="text-muted-text text-base">
          All 9 active Discord slash commands currently supported by the Gateway bot. Search, filter, and copy syntax directly.
        </p>
      </div>

      {/* Search & Animated Category Filter Controls */}
      <div className="p-6 rounded-3xl bg-panel-navy border-sticker space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search bar with immediate filtering */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-text" />
            <input
              type="text"
              placeholder="Search by command name, description, or syntax..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-midnight-bg border border-panel-navy-light text-cloud-white placeholder-muted-text/60 focus:outline-none focus:border-toxic-lime font-mono text-sm"
            />
          </div>

          {/* Animated Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-3 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-royal-purple text-cloud-white border border-toxic-lime/50 shadow-sticker scale-105"
                    : "bg-midnight-bg text-muted-text hover:text-cloud-white border border-panel-navy-light"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Commands Grid or Empty State with Detective Mascot */}
      {filteredCommands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommands.map((cmd) => (
            <CommandCard key={cmd.name} {...cmd} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 max-w-md mx-auto">
          <RazzMascot pose="detective" size={180} className="mx-auto" />
          <h3 className="font-display font-bold text-xl text-cloud-white">No Commands Found</h3>
          <p className="text-xs font-mono text-muted-text">
            Detective Razz couldn&apos;t find any commands matching &quot;{searchTerm}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="px-5 py-2.5 rounded-xl bg-royal-purple text-cloud-white font-mono text-xs font-semibold hover:bg-royal-purple/80"
          >
            Reset Search Filters
          </button>
        </div>
      )}
    </div>
  );
}
