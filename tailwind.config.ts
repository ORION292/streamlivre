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
        primary: {
          DEFAULT: "#8B5CF6",
          dark: "#7C3AED",
          light: "#A78BFA",
        },
        accent: {
          DEFAULT: "#22D3EE",
          dark: "#06B6D4",
        },
        dark: {
          DEFAULT: "#0F0F0F",
          card: "#1A1A1A",
          hover: "#252525",
        },
      },
    },
  },
  plugins: [],
};

export default config;
