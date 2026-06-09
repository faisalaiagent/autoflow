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
        syne:    ["var(--font-syne)", "sans-serif"],
        mono:    ["var(--font-dm-mono)", "monospace"],
        body:    ["var(--font-instrument)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        bg:      "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          2:       "var(--surface-2)",
          3:       "var(--surface-3)",
          raised:  "var(--surface-2)",
          overlay: "var(--surface-3)",
        },
        border: {
          DEFAULT: "var(--border-color)",
          strong:  "var(--border-bright)",
        },
        accent: {
          DEFAULT: "var(--accent)",           /* #6366F1 indigo   */
          hover:   "var(--accent-hover)",     /* #818CF8          */
          pink:    "var(--accent-pink)",      /* #8B5CF6 violet   */
          cyan:    "var(--accent-cyan)",      /* #10B981 emerald  */
          amber:   "var(--accent-amber)",     /* #F59E0B amber    */
        },
        text: {
          DEFAULT:   "var(--text)",
          muted:     "var(--text-muted)",
          subtle:    "var(--text-subtle)",
          secondary: "var(--text-muted)",
        },
        /* Named palette tokens used inside (dashboard) group pages */
        iris: {
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",   /* primary */
          600: "#4F46E5",
        },
        violet: {
          400: "#A78BFA",
          500: "#8B5CF6",   /* accent  */
          600: "#7C3AED",
        },
        jade: {
          400: "#34D399",
          500: "#10B981",   /* success */
          600: "#059669",
        },
        amber: {
          400: "#FCD34D",
          500: "#F59E0B",   /* warning */
          600: "#D97706",
        },
        rose: {
          400: "#F87171",
          500: "#EF4444",   /* error   */
          600: "#DC2626",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-indigo":     "radial-gradient(ellipse 80% 60% at 20% -10%, rgba(99,102,241,0.15), transparent)",
      },
      animation: {
        "pulse-slow":  "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow":   "spin 3s linear infinite",
        float:         "float 6s ease-in-out infinite",
        "glow-pulse":  "glowPulse 2s ease-in-out infinite",
        "slide-up":    "slideUp 0.4s ease-out",
        "fade-in":     "fadeIn 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99,102,241,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(99,102,241,0.6)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      boxShadow: {
        glow:         "0 0 40px rgba(99,102,241,0.25)",
        "glow-sm":    "0 0 20px rgba(99,102,241,0.15)",
        "glow-violet":"0 0 30px rgba(139,92,246,0.20)",
        card:         "0 4px 24px rgba(0,0,0,0.4)",
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
