import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EXA Shows Color Palette
        exa: {
          pink: "#FF69B4",
          magenta: "#FF00FF",
          cyan: "#00BFFF",
          purple: "#9400D3",
          gold: "#FFED4E",
          indigo: "#4B0082",
        },
        // Background colors
        background: {
          DEFAULT: "#0a0a12",
          dark: "#050508",
          card: "rgba(0, 0, 0, 0.4)",
        },
        // Glass colors
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          light: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        // Gradient backgrounds
        "gradient-main": "linear-gradient(135deg, #1a0033, #2d1b69, #000033)",
        "gradient-pink": "linear-gradient(135deg, #FF69B4, #FF00FF)",
        "gradient-cyan": "linear-gradient(135deg, #00BFFF, #9400D3)",
        "gradient-gold": "linear-gradient(135deg, #FFED4E, #FF69B4)",
        "gradient-button": "linear-gradient(90deg, #00BFFF, #FF69B4, #FF00FF)",
        "gradient-hero": "linear-gradient(180deg, rgba(26, 0, 51, 0.8), rgba(0, 0, 51, 0.9))",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 105, 180, 0.5)",
        "glow-cyan": "0 0 20px rgba(0, 191, 255, 0.5)",
        "glow-purple": "0 0 20px rgba(148, 0, 211, 0.5)",
        "glow-gold": "0 0 20px rgba(255, 237, 78, 0.5)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "live-pulse": "live-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "live-pulse": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(255, 0, 0, 0.7)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 0 10px rgba(255, 0, 0, 0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
