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
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "Fredoka", "cursive", "sans-serif"],
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
