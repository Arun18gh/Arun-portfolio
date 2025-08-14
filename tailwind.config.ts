import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0B0F14",
          surface: "#121821",
          text: "#E8F1F8",
          muted: "#9FB3C8",
        },
        accent: {
          cyan: "#00E5FF",
          violet: "#7C4DFF",
        },
      },
      boxShadow: {
        glow: "0 0 30px -8px rgba(0,229,255,0.45)",
      },
      container: { center: true, padding: "1rem" },
      borderRadius: { xl: "1rem", '2xl': "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
