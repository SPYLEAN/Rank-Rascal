"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/#explore-stickerwood", label: "World" },
  { href: "/#heroes", label: "Heroes" },
  { href: "/#world-lies", label: "The World Lies" },
  { href: "/#quests", label: "Quests" },
  { href: "/community#guild", label: "Guilds" },
  { href: "/devlog", label: "Devlog" },
  { href: "/community", label: "Community" },
] as const;

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-panel-navy-light/70 bg-midnight-bg/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Rascal Realms: Crownfall home">
          <div className="relative h-12 w-12 overflow-hidden border border-royal-purple/45 bg-panel-navy p-1 transition group-hover:border-toxic-lime">
            <Image src="/brand/app-icon.png" alt="" width={48} height={48} className="object-contain" priority />
          </div>
          <div>
            <span className="block font-display text-xl font-bold tracking-wide text-cloud-white transition group-hover:text-toxic-lime">Rascal Realms</span>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-hot-pink">Crownfall · in development</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {NAV_ITEMS.map(({ href, label }, index) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} aria-current={isActive ? "page" : undefined} className={`nav-signal group flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition ${isActive ? "is-active text-toxic-lime" : "text-cloud-white/70 hover:text-toxic-lime"}`}>
                <span className={isActive ? "text-hot-pink" : "text-royal-purple group-hover:text-hot-pink"}>0{index + 1}</span>{label}
              </Link>
            );
          })}
        </nav>

        <Link href="/game" className="hidden items-center gap-2 border border-toxic-lime bg-toxic-lime px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-midnight-bg transition hover:bg-cloud-white xl:inline-flex">
          Enter the Realm
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="border border-panel-navy-light bg-panel-navy p-2 text-cloud-white focus:outline-none focus:ring-2 focus:ring-toxic-lime xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-b border-panel-navy-light bg-panel-navy px-4 pb-6 pt-2 xl:hidden">
          <nav className="space-y-2" aria-label="Mobile navigation">
            {NAV_ITEMS.map(({ href, label }, index) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link key={href} href={href} aria-current={isActive ? "page" : undefined} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 border-b border-cloud-white/10 px-3 py-4 font-mono text-xs font-bold uppercase tracking-wider hover:bg-royal-purple/15 ${isActive ? "bg-royal-purple/10 text-toxic-lime" : "text-cloud-white"}`}>
                  <span className="text-hot-pink">0{index + 1}</span>{label}
                </Link>
              );
            })}
            <Link href="/game" onClick={() => setMobileMenuOpen(false)} className="mt-3 flex items-center justify-center gap-2 bg-toxic-lime px-4 py-3 font-display font-bold text-midnight-bg">
              Enter the Realm
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
