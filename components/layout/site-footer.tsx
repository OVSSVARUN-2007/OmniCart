import Link from "next/link";

import { OmniCartLogo } from "@/components/brand/omnicart-logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <OmniCartLogo />
          <p className="mt-4 text-sm leading-6 text-slate-600">
            OmniCart is a marketplace-style demo platform with Google OAuth authentication, JWT
            sessions, PostgreSQL plus MongoDB architecture, and catalog ingestion from APIs.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href="/auth/signin" className="transition hover:text-slate-950">
            Access Portal
          </Link>
          <Link href="/dashboard" className="transition hover:text-slate-950">
            Dashboard
          </Link>
          <Link href="/api/products" className="transition hover:text-slate-950">
            Products API
          </Link>
        </div>
      </div>
    </footer>
  );
}
