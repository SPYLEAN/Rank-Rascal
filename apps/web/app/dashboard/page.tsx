"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RazzMascot } from "@/components/RazzMascot";
import {
  LayoutDashboard,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  LogOut,
  Award,
  Flame,
  User,
  Settings,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Typed Service Boundary Interfaces for PostgreSQL / OAuth integration
export interface DashboardUserProfile {
  discordId: string;
  discordTag: string;
  robloxUserId: number;
  robloxUsername: string;
  robloxDisplayName: string;
  avatarUrl: string;
  badgeCount: number;
  rascalRep: number;
  witnessProtection: boolean;
  linkedAt: string;
}

export type DashboardState = "logged-out" | "loading" | "empty" | "error" | "connected-profile";

export default function DashboardShellPage() {
  const [currentState, setCurrentState] = useState<DashboardState>("connected-profile");

  // Demo user profile data (explicitly labeled Demo)
  const demoProfile: DashboardUserProfile = {
    discordId: "123456789012345678",
    discordTag: "BloxLegend#0001",
    robloxUserId: 98765432,
    robloxUsername: "BloxLegend_2026",
    robloxDisplayName: "NoobSlayer",
    avatarUrl: "/brand/emojis/rascal-win.png",
    badgeCount: 342,
    rascalRep: 85,
    witnessProtection: false,
    linkedAt: "2026-01-15T10:30:00Z",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-panel-navy-light">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="font-display font-extrabold text-3xl text-cloud-white">
              Rank Rascal Dashboard
            </h1>
            {/* EXPLICIT DEMO / PREVIEW TAG */}
            <span className="px-3 py-1 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-xs font-mono font-bold text-reward-yellow uppercase tracking-wider flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Demo Dashboard Shell</span>
            </span>
          </div>
          <p className="text-xs text-muted-text font-mono mt-1">
            Dashboard shell with typed PostgreSQL/OAuth service boundaries. Toggle states below to preview UI behavior.
          </p>
        </div>

        {/* State Toggle Buttons for UI Review */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-panel-navy border border-panel-navy-light">
          <span className="text-[11px] font-mono text-muted-text px-2">State Preview:</span>
          {(
            [
              "connected-profile",
              "logged-out",
              "loading",
              "empty",
              "error",
            ] as DashboardState[]
          ).map((st) => (
            <button
              key={st}
              onClick={() => setCurrentState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                currentState === st
                  ? "bg-royal-purple text-cloud-white border border-toxic-lime/50 shadow-sticker"
                  : "bg-midnight-bg text-muted-text hover:text-cloud-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD CONTENT BASED ON CURRENT STATE */}

      {/* STATE 1: CONNECTED PROFILE */}
      {currentState === "connected-profile" && (
        <div className="space-y-8">
          {/* Demo Alert Box */}
          <div className="p-4 rounded-2xl bg-reward-yellow/10 border border-reward-yellow/40 flex items-center justify-between text-xs font-mono text-cloud-white">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-reward-yellow flex-shrink-0" />
              <span>
                <strong>Product Demonstration Notice:</strong> Below profile content uses sample data for preview purposes. Real user profiles load from PostgreSQL upon Discord OAuth authentication.
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-reward-yellow text-midnight-bg font-bold">
              DEMO
            </span>
          </div>

          {/* Profile Overview Card */}
          <div className="p-8 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <div className="relative w-24 h-24 rounded-2xl bg-midnight-bg border-2 border-royal-purple p-1 overflow-hidden shadow-sticker flex-shrink-0">
                <Image
                  src={demoProfile.avatarUrl}
                  alt={demoProfile.robloxUsername}
                  width={96}
                  height={96}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="font-display font-bold text-2xl text-cloud-white">
                    {demoProfile.robloxUsername}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-toxic-lime/20 border border-toxic-lime/40 text-[11px] font-mono font-bold text-toxic-lime">
                    VERIFIED LINK
                  </span>
                </div>
                <p className="text-xs text-muted-text font-mono">
                  Display: {demoProfile.robloxDisplayName} | Discord: {demoProfile.discordTag}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono pt-1">
                  <span className="flex items-center space-x-1 text-reward-yellow font-bold">
                    <Award className="w-4 h-4" />
                    <span>{demoProfile.badgeCount} Badges</span>
                  </span>
                  <span className="flex items-center space-x-1 text-toxic-lime font-bold">
                    <Flame className="w-4 h-4" />
                    <span>{demoProfile.rascalRep} Rascal Rep</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col space-y-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-panel-navy-light md:pl-8">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-text">Witness Protection:</span>
                <span className="text-toxic-lime font-semibold">OFF (Public)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-text">Linked Date:</span>
                <span className="text-cloud-white font-mono">Jan 15, 2026</span>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button className="w-full py-2 px-4 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono font-semibold text-cloud-white hover:border-toxic-lime flex items-center justify-center space-x-2">
                  <EyeOff className="w-4 h-4 text-royal-purple" />
                  <span>Toggle /witness-protection</span>
                </button>
                <button className="w-full py-2 px-4 rounded-xl bg-alert-red/20 border border-alert-red/40 text-xs font-mono font-semibold text-alert-red hover:bg-alert-red/30 flex items-center justify-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Unlink Roblox Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: LOGGED OUT */}
      {currentState === "logged-out" && (
        <div className="text-center py-16 p-8 rounded-3xl bg-panel-navy border-sticker max-w-md mx-auto space-y-6">
          <RazzMascot pose="hero-point" size={180} className="mx-auto" />
          <h2 className="font-display font-bold text-2xl text-cloud-white">
            Connect Your Discord Account
          </h2>
          <p className="text-xs text-muted-text font-mono leading-relaxed">
            Sign in with Discord to manage your linked Roblox identity, check Rotfile status, and configure privacy controls.
          </p>
          <button className="w-full py-3 px-6 rounded-2xl bg-royal-purple text-cloud-white font-display font-bold text-sm shadow-sticker-lime hover:bg-royal-purple/90">
            Sign In with Discord
          </button>
        </div>
      )}

      {/* STATE 3: LOADING */}
      {currentState === "loading" && (
        <div className="text-center py-20 p-8 rounded-3xl bg-panel-navy border-sticker max-w-md mx-auto space-y-6">
          <RazzMascot pose="loading" size={180} className="mx-auto" />
          <h2 className="font-display font-bold text-xl text-cloud-white">
            Loading Dashboard Data...
          </h2>
          <p className="text-xs text-muted-text font-mono">
            Fetching verified profile records and server rankings.
          </p>
        </div>
      )}

      {/* STATE 4: EMPTY */}
      {currentState === "empty" && (
        <div className="text-center py-16 p-8 rounded-3xl bg-panel-navy border-sticker max-w-md mx-auto space-y-6">
          <RazzMascot pose="detective" size={180} className="mx-auto" />
          <h2 className="font-display font-bold text-2xl text-cloud-white">
            No Roblox Profile Linked
          </h2>
          <p className="text-xs text-muted-text font-mono leading-relaxed">
            You haven&apos;t linked a Roblox profile yet. Run <code className="text-toxic-lime font-mono">/link-roblox</code> in your Discord server or authorize below.
          </p>
          <Link
            href="/verify"
            className="inline-block py-3 px-6 rounded-2xl bg-toxic-lime text-midnight-bg font-display font-bold text-sm shadow-sticker"
          >
            Start Roblox Verification
          </Link>
        </div>
      )}

      {/* STATE 5: ERROR */}
      {currentState === "error" && (
        <div className="text-center py-16 p-8 rounded-3xl bg-panel-navy border-sticker-pink max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-alert-red/20 border border-alert-red/40 flex items-center justify-center mx-auto text-alert-red">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-2xl text-cloud-white">
            Dashboard Sync Error
          </h2>
          <p className="text-xs text-muted-text font-mono leading-relaxed">
            Unable to communicate with authentication services or PostgreSQL. Please try refreshing.
          </p>
          <button
            onClick={() => setCurrentState("connected-profile")}
            className="py-2.5 px-6 rounded-xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-toxic-lime hover:border-toxic-lime"
          >
            Retry Connection
          </button>
        </div>
      )}
    </div>
  );
}
