import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0C0C0C",
        border: "#1E1E1E",
        crimson: {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
          glow: "rgba(220, 38, 38, 0.4)",
        },
        figma: {
          blue: "#3B82F6",
          wireframe: "rgba(59, 130, 246, 0.08)",
        },
        text: {
          primary: "#FAFAFA",
          secondary: "#A1A1AA",
          muted: "#525252",
        },
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        script: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
