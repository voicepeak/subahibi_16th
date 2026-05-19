import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171718",
        paper: "#f7f7f2",
        mist: "#dbe8eb",
        tide: "#8dc9cb",
        dusk: "#5b6d77",
        pollen: "#e7c65b",
        signal: "#b94a48"
      },
      boxShadow: {
        soft: "0 20px 70px rgba(23, 23, 24, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
