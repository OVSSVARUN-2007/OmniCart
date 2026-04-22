import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "OmniCart | Commerce Operating Demo",
  description:
    "OmniCart is a modern ecommerce demo project with premium UI, OAuth-ready authentication, JWT sessions, and executive dashboard experiences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-slate-950 text-white antialiased`}>
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.14),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#020617_45%,_#0f172a_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:90px_90px] opacity-40" />
          <SiteHeader />
          <main className="relative z-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
