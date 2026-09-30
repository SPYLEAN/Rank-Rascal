"use client";

import { useEffect, useRef } from "react";

/** A thin gold reading-progress line. Purely decorative. */
export function ExperienceChrome() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        frame = 0;
      });
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
      <div ref={progressRef} className="h-0.5 w-full origin-left scale-x-0 bg-antique-gold" />
    </div>
  );
}
