"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, Shield, Sparkles, Gamepad2, Award, Terminal, LayoutDashboard } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const discordInviteUrl =
    process.env.NEXT_PUBLIC_DISCORD_INSTALL_URL || "/invite";

  return (
    <header className="sticky top-0 z-50 bg-[#121526]/90 backdrop-blur-md border-b border-panel-navy-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-panel-navy p-1 border border-royal-purple/40 group-hover:border-toxic-lime transition-colors">
            <Image
              src="/brand/app-icon.png"
              alt="Rank Rascal"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-cloud-white tracking-wide group-hover:text-toxic-lime transition-colors">
              Rank Rascal
            </span>
            <span className="text-xs font-mono text-toxic-lime font-semibold">
              Roblox Discord Bot
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/commands"
            className="flex items-center space-x-2 text-cloud-white/90 hover:text-toxic-lime text-sm font-medium transition-colors"
          >
            <Terminal className="w-4 h-4 text-royal-purple" />
            <span>Commands</span>
          </Link>
          <Link
            href="/games"
            className="flex items-center space-x-2 text-cloud-white/90 hover:text-toxic-lime text-sm font-medium transition-colors"
          >
            <Gamepad2 className="w-4 h-4 text-hot-pink" />
            <span>Games</span>
          </Link>
          <Link
            href="/rewards"
            className="flex items-center space-x-2 text-cloud-white/90 hover:text-toxic-lime text-sm font-medium transition-colors"
          >
            <Award className="w-4 h-4 text-reward-yellow" />
            <span>Rewards</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-cloud-white/90 hover:text-toxic-lime text-sm font-medium transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-toxic-lime" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/safety"
            className="flex items-center space-x-2 text-cloud-white/90 hover:text-toxic-lime text-sm font-medium transition-colors"
          >
            <Shield className="w-4 h-4 text-royal-purple" />
            <span>Safety</span>
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-royal-purple hover:bg-royal-purple/90 text-cloud-white px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all shadow-sticker-lime hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <Sparkles className="w-4 h-4 text-toxic-lime" />
            <span>Add to Discord (Coming Soon)</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-panel-navy text-cloud-white focus:outline-none focus:ring-2 focus:ring-toxic-lime"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-panel-navy border-b border-panel-navy-light px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/commands"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-cloud-white hover:bg-royal-purple/20"
          >
            <Terminal className="w-5 h-5 text-royal-purple" />
            <span>Commands</span>
          </Link>
          <Link
            href="/games"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-cloud-white hover:bg-royal-purple/20"
          >
            <Gamepad2 className="w-5 h-5 text-hot-pink" />
            <span>Games</span>
          </Link>
          <Link
            href="/rewards"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-cloud-white hover:bg-royal-purple/20"
          >
            <Award className="w-5 h-5 text-reward-yellow" />
            <span>Rewards</span>
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-cloud-white hover:bg-royal-purple/20"
          >
            <LayoutDashboard className="w-5 h-5 text-toxic-lime" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/safety"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-cloud-white hover:bg-royal-purple/20"
          >
            <Shield className="w-5 h-5 text-royal-purple" />
            <span>Safety</span>
          </Link>
          <div className="pt-2">
            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-royal-purple text-cloud-white py-3 rounded-xl font-display font-semibold"
            >
              <Sparkles className="w-4 h-4 text-toxic-lime" />
              <span>Add to Discord (Coming Soon)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
