import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";

import { auth } from "@/auth";
import { OmniCartLogo } from "@/components/brand/omnicart-logo";
import { SignOutButton } from "@/components/ui/sign-out-button";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
        <OmniCartLogo className="shrink-0" />

        <div className="hidden min-w-[280px] flex-1 items-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-500">Search products and categories</span>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {[
            { href: "/#categories", label: "Categories" },
            { href: "/#deals", label: "Products" },
            { href: "/dashboard", label: "Account" }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/#deals"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Link>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-[#131921] text-white">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3 text-sm lg:px-8">
          {["Industrial", "Electronics", "Fashion", "Home", "Beauty", "Appliances", "Groceries"].map(
            (item) => (
              <Link
                key={item}
                href={`/#categories`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/10 px-4 py-2 font-medium transition hover:bg-white/15"
              >
                {item}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
