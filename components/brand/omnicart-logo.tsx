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
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#111827,#1d4ed8,#f97316)] shadow-[0_12px_30px_rgba(37,99,235,0.18)]">
        <svg aria-hidden="true" viewBox="0 0 64 64" className="h-7 w-7" fill="none">
          <path
            d="M17 18h8l3.2 21.6a3 3 0 0 0 3 2.4h14.8a3 3 0 0 0 2.9-2.2L53 24H25.5"
            stroke="white"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30.5 47.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm15 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
            fill="white"
          />
          <path
            d="M22 12c5.4-4.7 14.5-4.7 19.9 0"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {withWordmark ? (
        <span className="flex flex-col">
          <span className="text-lg font-bold tracking-[0.12em] text-slate-950">OMNICART</span>
          <span className="text-[11px] uppercase tracking-[0.26em] text-slate-500">
            Marketplace Platform
          </span>
        </span>
      ) : null}
    </Link>
  );
}
