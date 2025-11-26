import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wood: {
          light: "#f4d7a4",
          DEFAULT: "#c47a36",
          dark: "#3c1e0d"
        },
        pastel: {
          pink: "#F4B6D9",
          pinkDark: "#E294C3",
          lilac: "#DCC7FF",
          lilacDark: "#C2A4F5",
          blue: "#D6F1FF",
          blueDark: "#B8E4FF",
          mint: "#E3FFE8",
          mintDark: "#CFF6D3",
          cream: "#FFF2B8",
        },
      },
      boxShadow: {
        soft: "0 4px 8px rgba(0,0,0,0.1)",
        bubble: "0 6px 0 rgba(0,0,0,0.12)",
      },
      borderWidth: {
        '6': '6px',
      },
    }
  },
  plugins: []
};

export default config;
