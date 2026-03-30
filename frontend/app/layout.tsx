import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "../styles/tokens.css";
import "../styles/typography.css";
import "./globals.css";

const fontEditorial = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--ja-font-editorial"
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ja-font-body"
});

const fontData = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ja-font-data"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jobanxiety.ai"),
  title: {
    default: "JobAnxiety.ai — AI Job Market & Layoff Tracker",
    template: "%s | JobAnxiety.ai"
  },
  description:
    "Track AI job openings, layoffs, and labor market trends with source-verified data. Updated daily. Career guides for workers navigating AI-era change."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${fontEditorial.variable} ${fontBody.variable} ${fontData.variable}`}>
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
