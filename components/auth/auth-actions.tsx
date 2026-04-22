"use client";

import { Building2, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

type AuthActionsProps = {
  googleEnabled: boolean;
  microsoftEnabled: boolean;
};

type ProviderId = "google" | "microsoft-entra-id";

export function AuthActions({ googleEnabled, microsoftEnabled }: AuthActionsProps) {
  const [isLoading, setIsLoading] = useState<ProviderId | null>(null);

  async function handleOAuth(provider: ProviderId) {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        disabled={!googleEnabled || isLoading !== null}
        onClick={() => handleOAuth("google")}
        className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
            {isLoading === "google" ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-950">Continue with Google</p>
            <p className="text-sm text-slate-500">Consumer and workspace sign-in for customers and teams</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          OAuth
        </span>
      </button>

      <button
        type="button"
        disabled={!microsoftEnabled || isLoading !== null}
        onClick={() => handleOAuth("microsoft-entra-id")}
        className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition hover:border-orange-300 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
            {isLoading === "microsoft-entra-id" ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <Mail className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-950">Continue with Microsoft</p>
            <p className="text-sm text-slate-500">Work and school identities through Microsoft Entra ID</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          OAuth
        </span>
      </button>

      {(!googleEnabled || !microsoftEnabled) ? (
        <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-white p-3 text-amber-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Provider setup required</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                Add Google and Microsoft OAuth keys to `.env.local` to activate production-style
                sign-in. The app now avoids insecure shared demo password login.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
