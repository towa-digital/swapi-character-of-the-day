import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#72FFF7",
      },
      backgroundImage: {
        desert: "url('/images/desert.jpg')",
        landscape: "url('/images/landscape.jpg')",
        planet: "url('/images/planet.jpg')",
        "planet-small": "url('/images/planet-small.jpg')",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
export default config;
