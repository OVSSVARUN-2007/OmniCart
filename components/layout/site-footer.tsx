import Link from "next/link";

import { OmniCartLogo } from "@/components/brand/omnicart-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-xl">
          <OmniCartLogo />
          <p className="mt-4 text-sm leading-6 text-slate-400">
            OmniCart is a premium demo commerce platform showcasing a modern storefront,
            OAuth-ready authentication, JWT-based sessions, and executive-grade dashboards.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <Link href="/auth/signin" className="transition hover:text-white">
            Access Portal
          </Link>
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/api/demo/products" className="transition hover:text-white">
            Demo API
          </Link>
        </div>
      </div>
    </footer>
  );
}
