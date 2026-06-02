import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        body: ["var(--font-instrument)", "sans-serif"],
        // Alias for (dashboard) group pages
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        // Main design system
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
          // Aliases for (dashboard) group
          raised: "var(--surface-2)",
          overlay: "var(--surface-3)",
        },
        border: {
          DEFAULT: "var(--border-color)",
          strong: "var(--border-bright)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          pink: "var(--accent-pink)",
          cyan: "var(--accent-cyan)",
          amber: "var(--accent-amber)",
        },
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
          // Aliases
          secondary: "var(--text-muted)",
        },
        // Extended palette for (dashboard) group pages
        iris: {
          300: "#9585ff",
          400: "#7c6bff",
          500: "#6557e0",
          600: "#5447cc",
        },
        rose: {
          400: "#ff85b3",
          500: "#ff6b9d",
          600: "#e0508a",
        },
        jade: {
          400: "#8affd9",
          500: "#6bffcc",
          600: "#4de0b0",
        },
        amber: {
          400: "#ffc97a",
          500: "#ffb86b",
          600: "#e09a50",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-purple": "radial-gradient(ellipse 80% 60% at 20% -10%, rgba(124,107,255,0.15), transparent)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "slide-up": "slideUp 0.4s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,107,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124,107,255,0.6)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,107,255,0.25)",
        "glow-sm": "0 0 20px rgba(124,107,255,0.15)",
        "glow-pink": "0 0 30px rgba(255,107,157,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "iris-400/10": "0 0 40px rgba(124,107,255,0.1)",
        "iris-400/20": "0 0 40px rgba(124,107,255,0.2)",
        "rose-500/10": "0 0 40px rgba(255,107,157,0.1)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
