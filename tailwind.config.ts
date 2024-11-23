import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "square-animation": {
          "0%, 10.5%": { left: "0", top: "0" },
          "12.5%, 23%": { left: "32px", top: "0" },
          "25%, 35.5%": { left: "64px", top: "0" },
          "37.5%, 48%": { left: "64px", top: "32px" },
          "50%, 60.5%": { left: "32px", top: "32px" },
          "62.5%, 73%": { left: "32px", top: "64px" },
          "75%, 85.5%": { left: "0", top: "64px" },
          "87.5%, 98%": { left: "0", top: "32px" },
          "100%": { left: "0", top: "0" },
        },
      },
      animation: {
        "square-animation": "square-animation 10s ease-in-out infinite both",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
