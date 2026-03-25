import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Public_Sans, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const fontDisplay = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display"
});

const fontBody = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const fontUi = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui"
});

const fontData = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-data"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reframe.work"),
  title: {
    default: "Reframe — AI Jobs That Didn't Exist Two Years Ago",
    template: "%s | Reframe"
  },
  description:
    "Discover new careers created by AI. Browse thousands of roles at Fortune 500 companies and VC-backed startups. Updated daily."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontUi.variable} ${fontData.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-frame">
          <SiteHeader />
          <main id="main-content" className="page-shell">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
