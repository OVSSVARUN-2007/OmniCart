import Link from "next/link";

import { OmniCartLogo } from "@/components/brand/omnicart-logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <OmniCartLogo />
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href="/#categories" prefetch={false} className="transition hover:text-slate-950">
            Categories
          </Link>
          <Link href="/#deals" prefetch={false} className="transition hover:text-slate-950">
            Products
          </Link>
          <Link href="/dashboard" prefetch={false} className="transition hover:text-slate-950">
            Account
          </Link>
        </div>
      </div>
    </footer>
  );
}
