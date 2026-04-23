import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppSessionProvider } from "@/components/providers/session-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "OmniCart | Modern Marketplace",
  description: "OmniCart is a modern ecommerce experience with a sharper catalog UI, category discovery, and account-ready shopping flows."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">
        <AppSessionProvider>
          <div className="relative min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.08),_transparent_32%)]" />
            <SiteHeader />
            <main className="relative z-10">{children}</main>
            <SiteFooter />
          </div>
        </AppSessionProvider>
      </body>
    </html>
  );
}
