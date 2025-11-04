import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2EFE9",
        ink: "#191919",
        muted: "#60646C",
        accent: "#6B6BFF"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"]
      },
      backgroundImage: {
        "radial-soft":
          "radial-gradient(circle at top, rgba(107,107,255,0.18), rgba(242,239,233,0.95) 55%)"
      }
    }
  },
  plugins: []
};

export default config;
