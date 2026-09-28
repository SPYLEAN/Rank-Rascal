import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "royal-purple": "#7A4DFF",
        "toxic-lime": "#B7FF36",
        "hot-pink": "#FF4FA3",
        "reward-yellow": "#FFD83D",
        "alert-red": "#FF4255",
        "midnight-bg": "#121526",
        "panel-navy": "#191D35",
        "panel-navy-light": "#232847",
        "cloud-white": "#F8F8FF",
        "muted-text": "#AEB4DC",
        // Stickerwood palette (docs/rascal-realms/ART_DIRECTION.md). Warm tones carry the
        // journey; violet/magenta/lime are reserved for corruption, lies and Razz.
        "paper-cream": "#F3E5C8",
        "antique-gold": "#D5A84B",
        "ink-plum": "#1B1426",
        forest: "#41633B",
        moss: "#76954D",
        wood: "#7B4E2D",
        sky: "#79B8D8",
        "crown-violet": "#6B31A8",
        "hot-magenta": "#E632A9",
        "signal-lime": "#B9F227",
        void: "#160E21",
      },
      fontFamily: {
        display: ["var(--font-sora)", "Sora", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"],
      },
      boxShadow: {
        "purple-glow": "0 0 25px rgba(122, 77, 255, 0.4)",
        "lime-glow": "0 0 25px rgba(183, 255, 54, 0.4)",
        "pink-glow": "0 0 25px rgba(255, 79, 163, 0.4)",
        "sticker": "4px 4px 0px #000000",
        "sticker-lg": "6px 6px 0px #000000",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
