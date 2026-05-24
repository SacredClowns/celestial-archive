import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080604",
        deep: "#0d0a05",
        parchment: "#140f07",
        ash: "#3a3020",
        gold: "#c9a84c",
        "gold-light": "#e8cc7d",
        "gold-pale": "#f5e8c0",
        "gold-dim": "#7a6230",
        amber: "#a06820"
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-cormorant)", "serif"],
        // Fallback until Enochian font file is added — see globals.css @font-face
        enochian: ["Enochian", "ui-monospace", "monospace"]
      },
      boxShadow: {
        gold: "0 0 24px rgba(201, 168, 76, 0.1)"
      },
      maxWidth: {
        reading: "720px"
      },
      transitionTimingFunction: {
        gravity: "ease-in-out"
      },
      transitionDuration: {
        slow: "600ms"
      },
      keyframes: {
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        twinkle: {
          "0%, 100%": { opacity: "0.05" },
          "50%": { opacity: "0.16" }
        },
        // One-shot route fade (no looping loaders).
        "archival-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        inscribe: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "inscribe-mobile": {
          "0%": { opacity: "0", transform: "translateY(5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "divider-extend": {
          "0%": { transform: "scaleX(0)", opacity: "0.2" },
          "100%": { transform: "scaleX(1)", opacity: "1" }
        },
        "badge-materialize": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "room-enter": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "star-drift": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-30px, -15px)" }
        },
        "star-breathe": {
          "0%, 100%": { opacity: "var(--star-min, 0.03)" },
          "50%": { opacity: "var(--star-max, 0.14)" }
        },
        "vignette-breathe": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "0.92" }
        }
      },
      animation: {
        "slow-spin": "slow-spin 60s linear infinite",
        twinkle: "twinkle 6s ease-in-out infinite",
        "archival-fade-in": "archival-fade-in 0.6s ease-out forwards",
        inscribe: "inscribe 0.7s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards",
        "inscribe-mobile": "inscribe-mobile 0.7s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards",
        "divider-extend": "divider-extend 0.5s ease-out forwards",
        "badge-materialize": "badge-materialize 0.35s ease-out forwards",
        "room-enter": "room-enter 0.4s ease-out forwards",
        "star-drift": "star-drift 120s linear infinite alternate",
        "star-breathe": "star-breathe var(--star-dur, 8s) ease-in-out infinite",
        "vignette-breathe": "vignette-breathe 25s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;