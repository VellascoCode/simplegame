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
        }
      }
    }
  },
  plugins: []
};

export default config;
