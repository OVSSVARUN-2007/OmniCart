import Link from "next/link";

import { auth } from "@/auth";
import { OmniCartLogo } from "@/components/brand/omnicart-logo";
import { SignOutButton } from "@/components/ui/sign-out-button";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-4 py-4 lg:px-8">
        <OmniCartLogo className="shrink-0" />
        <div className="min-w-[220px] flex-1">
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Search products, brands, categories, and deals
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          <Link href="#categories" className="transition hover:text-slate-950">
            Categories
          </Link>
          <Link href="#deals" className="transition hover:text-slate-950">
            Deals
          </Link>
          <Link href="#security" className="transition hover:text-slate-950">
            Security
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            Dashboard
          </Link>
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
