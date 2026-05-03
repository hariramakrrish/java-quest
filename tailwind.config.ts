import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a14",
        panel: "#11111f",
        panel2: "#181830",
        ink: "#e6e6f0",
        muted: "#8b8ba7",
        neon: {
          pink: "#ff2bd6",
          cyan: "#00f5ff",
          lime: "#b6ff3c",
          violet: "#9b5cff",
          amber: "#ffb700",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(0,245,255,0.4), 0 0 24px rgba(0,245,255,0.25)",
        "neon-pink": "0 0 0 1px rgba(255,43,214,0.5), 0 0 24px rgba(255,43,214,0.3)",
        "neon-lime": "0 0 0 1px rgba(182,255,60,0.5), 0 0 24px rgba(182,255,60,0.3)",
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "neon-gradient":
          "linear-gradient(135deg, #ff2bd6 0%, #9b5cff 40%, #00f5ff 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%,100%": { filter: "drop-shadow(0 0 4px rgba(0,245,255,0.6))" },
          "50%": { filter: "drop-shadow(0 0 14px rgba(255,43,214,0.8))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
