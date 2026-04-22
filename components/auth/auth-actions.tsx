"use client";

import { LoaderCircle, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

type AuthActionsProps = {
  googleEnabled: boolean;
  mode: "signin" | "signup";
};

export function AuthActions({ googleEnabled, mode }: AuthActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleAuth() {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        disabled={!googleEnabled || isLoading}
        onClick={handleGoogleAuth}
        className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
            {isLoading ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-950">
              {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          OAuth
        </span>
      </button>

      {!googleEnabled ? (
        <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-slate-950">Google setup required</p>
          <p className="mt-1 text-sm leading-7 text-slate-600">
            Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local` to enable sign-in.
          </p>
        </div>
      ) : null}
    </div>
  );
}
