"use client";

import { useEffect, useRef } from "react";

export function ExperienceChrome() {
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        document.documentElement.style.setProperty("--page-scroll", String(progress));
        frame = 0;
      });
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 220}px, 0)`;
      glowRef.current.style.opacity = "1";
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div ref={progressRef} className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-toxic-lime via-hot-pink to-royal-purple shadow-[0_0_18px_rgba(183,255,54,.65)]" />
      <div ref={glowRef} className="absolute left-0 top-0 hidden h-[440px] w-[440px] rounded-full bg-royal-purple/10 opacity-0 blur-[110px] transition-opacity duration-500 motion-reduce:hidden lg:block" />
    </div>
  );
}
