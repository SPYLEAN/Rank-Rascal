"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/#enter-stickerwood", label: "The Game" },
  { href: "/#world-lies", label: "Story" },
  { href: "/#heroes", label: "Heroes" },
  { href: "/#investigate", label: "Investigate" },
  { href: "/#explore-stickerwood", label: "World" },
  { href: "/updates", label: "Updates" },
  { href: "/community", label: "Community" },
] as const;

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <header data-razz-clear className="sticky top-0 z-50 border-b border-cloud-white/10 bg-[#121526]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Rascal Realms: Crownfall home">
          <Image src="/brand/app-icon.webp" alt="" width={44} height={44} className="h-10 w-10 rounded-lg object-contain sm:h-11 sm:w-11" priority />
          <span>
            <span className="block font-display text-lg font-bold leading-tight text-cloud-white transition group-hover:text-antique-gold">Rascal Realms</span>
            <span className="block text-xs font-medium text-paper-cream/65">Crownfall · in pre-production</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-7" aria-label="Primary navigation">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-semibold transition ${isActive ? "text-antique-gold" : "text-cloud-white/75 hover:text-antique-gold"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link href="/game" className="hidden rounded-full bg-antique-gold px-5 py-2.5 text-sm font-bold text-ink-plum transition hover:bg-paper-cream lg:inline-flex">
          Explore Crownfall
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-cloud-white hover:bg-cloud-white/10 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav id="mobile-nav" className="border-t border-cloud-white/10 bg-[#121526] px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile navigation">
          <ul>
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block border-b border-cloud-white/10 px-2 py-4 font-display text-lg font-bold text-cloud-white hover:text-antique-gold"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/game"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-antique-gold px-4 font-bold text-ink-plum"
          >
            Explore Crownfall
          </Link>
        </nav>
      ) : null}
    </header>
  );
};
