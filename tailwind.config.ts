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
      },
      backgroundImage: {
        "galaxy": 'url("https://cdn.pixabay.com/animation/2024/07/23/19/52/19-52-56-478_512.gif")',
        "starships": 'url("https://cdnb.artstation.com/p/assets/images/images/059/819/933/original/massivearmadapx-imperial-fleet-animation.gif?1677195928")',
        "planet": 'url("https://steamuserimages-a.akamaihd.net/ugc/1856044623170311383/A8A4344688AC7C7C84215339EFB41A28C6A0FF03/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true")',
        "landscape": 'url("https://steamuserimages-a.akamaihd.net/ugc/2004697838472379658/AF0892008D217230690F5916DF99DDADC33EBF73/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true")',
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
export default config;
