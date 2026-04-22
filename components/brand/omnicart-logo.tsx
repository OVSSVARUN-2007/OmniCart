import Link from "next/link";

import { cn } from "@/lib/utils";

type OmniCartLogoProps = {
  className?: string;
  withWordmark?: boolean;
};

export function OmniCartLogo({
  className,
  withWordmark = true
}: OmniCartLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_rgba(255,255,255,0.1)_35%,_rgba(124,58,237,0.25)_70%,_rgba(10,10,15,0.9)_100%)] shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
        <span className="absolute inset-[5px] rounded-[15px] border border-white/15 bg-slate-950/90" />
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="relative z-10 h-7 w-7"
          fill="none"
        >
          <path
            d="M17 18h8l3.2 21.6a3 3 0 0 0 3 2.4h14.8a3 3 0 0 0 2.9-2.2L53 24H25.5"
            stroke="url(#cart-gradient)"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30.5 47.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm15 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
            fill="url(#cart-gradient)"
          />
          <path
            d="M22 12c5.4-4.7 14.5-4.7 19.9 0"
            stroke="url(#cart-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="cart-gradient" x1="10" y1="8" x2="52" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F9A8D4" />
              <stop offset="0.52" stopColor="#60A5FA" />
              <stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {withWordmark ? (
        <span className="flex flex-col">
          <span className="text-lg font-semibold tracking-[0.18em] text-white">OMNICART</span>
          <span className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
            Commerce Operating Demo
          </span>
        </span>
      ) : null}
    </Link>
  );
}
