import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Character of the day",
  description: "Get the Starwar character of the day",
};

const fontSpaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(fontSpaceGrotesk.variable, "antialiased")}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
