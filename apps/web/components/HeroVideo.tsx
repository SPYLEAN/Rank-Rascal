"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand-assets";
import {
  INTRO_DONE_EVENT,
  PORTRAIT_QUERY,
  TEASER_CLOSE_EVENT,
  TEASER_OPEN_EVENT,
  isIntroDone,
  isPortraitViewport,
  pickVideoSource,
  prefersReducedData,
  prefersReducedMotion,
} from "@/lib/media-preferences";

const { media } = BRAND_ASSETS;

/**
 * Muted 6.7 s atmospheric loop behind the hero title.
 *
 * Load order: the poster (frame 0 of the loop) is always painted first and is the LCP
 * element. The video gets a src only when it is actually going to play, fades in on its
 * first rendered frame, and never replaces the poster with a blank flash.
 * Reduced motion or Save-Data: poster only; the visitor can still opt in with the button.
 */
export function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Every condition that gates playback. The video only downloads or plays when all allow it.
  const gate = useRef({
    autoplayAllowed: false, // false under reduced motion or Save-Data
    optedIn: false, // the visitor pressed Play themselves
    userPaused: false,
    introDone: false,
    offscreen: false,
    teaserOpen: false,
  });
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  const attempt = useCallback(() => {
    const video = videoRef.current;
    const g = gate.current;
    if (!video) return;
    if (!(g.autoplayAllowed || g.optedIn) || g.userPaused || !g.introDone) return;
    if (document.hidden || g.offscreen || g.teaserOpen) return;
    if (!video.getAttribute("src")) {
      video.muted = true;
      video.defaultMuted = true;
      video.src = pickVideoSource(
        video,
        isPortraitViewport()
          ? { webm: media.heroMobileWebm, mp4: media.heroMobileMp4 }
          : { webm: media.heroWebm, mp4: media.heroMp4 },
      );
    }
    // Autoplay can be refused (iOS Low Power Mode, browser policy): the poster simply stays.
    video.play().catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    const g = gate.current;
    g.autoplayAllowed = !prefersReducedMotion() && !prefersReducedData();

    // Start at frame 0 exactly when the Crownfall intro finishes, so the intro's revealed
    // poster hands off to identical video with no jump.
    const onIntroDone = () => {
      window.clearTimeout(fallback);
      g.introDone = true;
      attempt();
    };
    const fallback = window.setTimeout(onIntroDone, 5000);
    if (isIntroDone()) onIntroDone();
    else window.addEventListener(INTRO_DONE_EVENT, onIntroDone, { once: true });

    const halt = () => video.pause();
    const onVisibility = () => (document.hidden ? halt() : attempt());
    const onTeaserOpen = () => {
      g.teaserOpen = true;
      halt();
    };
    const onTeaserClose = () => {
      g.teaserOpen = false;
      // Opening a top-layer dialog can make some browsers report the page behind it as
      // non-intersecting. Recheck the hero directly so closing the teaser never leaves the
      // loop paused on a dark transition frame.
      const rect = container.getBoundingClientRect();
      g.offscreen = rect.bottom <= 0 || rect.top >= window.innerHeight;
      attempt();
    };
    const observer = new IntersectionObserver(([entry]) => {
      g.offscreen = !entry.isIntersecting;
      if (g.offscreen) halt();
      else attempt();
    });
    observer.observe(container);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener(TEASER_OPEN_EVENT, onTeaserOpen);
    window.addEventListener(TEASER_CLOSE_EVENT, onTeaserClose);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener(TEASER_OPEN_EVENT, onTeaserOpen);
      window.removeEventListener(TEASER_CLOSE_EVENT, onTeaserClose);
      observer.disconnect();
      halt();
    };
  }, [attempt]);

  const toggle = () => {
    const video = videoRef.current;
    const g = gate.current;
    if (!video) return;
    if (playing) {
      g.userPaused = true;
      video.pause();
    } else {
      g.userPaused = false;
      g.optedIn = true;
      g.introDone = true;
      attempt();
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-[#0b0912]">
      <picture>
        <source media={PORTRAIT_QUERY} srcSet={media.posterMobile} width={542} height={964} />
        {/* eslint-disable-next-line @next/next/no-img-element -- art-directed poster, already optimized WebP */}
        <img
          src={media.poster}
          width={1920}
          height={964}
          alt="Stickerwood's floating islands and waterfalls at golden hour, from the Crownfall teaser"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>
      <video
        ref={videoRef}
        className={`hero-video absolute inset-0 h-full w-full object-cover object-center ${visible ? "is-visible" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          setVisible(true);
          setPlaying(true);
        }}
        onPause={() => {
          setPlaying(false);
          // The poster is the reliable visual fallback. Never leave a paused transition
          // frame covering it when autoplay is refused, the tab is hidden or playback stalls.
          setVisible(false);
        }}
        onStalled={() => setVisible(false)}
        onError={() => setVisible(false)}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-cloud-white/30 bg-[#0b0912]/55 text-cloud-white backdrop-blur-sm transition hover:border-cloud-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-toxic-lime sm:right-6 sm:top-6"
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
