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
        "landscape-1": "url('/images/landscape-1.jpg')",
        "landscape-2": "url('/images/landscape-1.jpg')",
        "planet-1": "url('/images/planet-1.jpg')",
        "planet-2": "url('/images/planet-2.jpg')",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
export default config;
