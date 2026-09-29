"use client";

import { useEffect } from "react";

const isShown = (element: Element) => element.getClientRects().length > 0;

/**
 * Phones get a shorter homepage, so some desktop chapter anchors (/#heroes, /#investigate, …)
 * point at sections that are hidden there. When a link lands on a hidden target, this scrolls to
 * the visible chapter that stands in for it, declared with data-anchor-for="heroes investigate".
 * On tablet and desktop every target is visible and nothing happens.
 */
export function AnchorFallback() {
  useEffect(() => {
    const resolve = (hash: string) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) return;
      const target = document.getElementById(id);
      if (target && isShown(target)) return;
      const standIn = Array.from(document.querySelectorAll<HTMLElement>("[data-anchor-for]")).find(
        (element) => element.dataset.anchorFor?.split(" ").includes(id) && isShown(element),
      );
      standIn?.scrollIntoView({ block: "start" });
    };

    const timers: number[] = [];
    const later = (hash: string, ms: number) => timers.push(window.setTimeout(() => resolve(hash), ms));

    // Arriving from another page (/#heroes): after the router has had its own go at the hash.
    later(window.location.hash, 0);
    later(window.location.hash, 300);

    const onHashChange = () => resolve(window.location.hash);
    // Same-page links don't always fire hashchange (client-side router, or the hash is unchanged).
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement) || link.pathname !== window.location.pathname || !link.hash) return;
      later(link.hash, 60);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
