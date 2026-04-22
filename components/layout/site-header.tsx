import Link from "next/link";

import { auth } from "@/auth";
import { OmniCartLogo } from "@/components/brand/omnicart-logo";
import { SignOutButton } from "@/components/ui/sign-out-button";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <OmniCartLogo />
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="#catalog" className="transition hover:text-white">
            Catalog
          </Link>
          <Link href="#capabilities" className="transition hover:text-white">
            Capabilities
          </Link>
          <Link href="#security" className="transition hover:text-white">
            Security
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
          >
            Dashboard
          </Link>
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
