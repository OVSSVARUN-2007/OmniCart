"use client";

import { LoaderCircle, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

type AuthActionsProps = {
  googleEnabled: boolean;
  microsoftEnabled: boolean;
};

export function AuthActions({ googleEnabled, microsoftEnabled }: AuthActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleOAuth(provider: "google" | "microsoft-entra-id") {
    setIsLoading(provider);
    setError(null);
    await signIn(provider, { callbackUrl: "/dashboard" });
  }

  async function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading("demo");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard"
    });

    setIsLoading(null);

    if (result?.error) {
      setError("Use demo@omnicart.com with password Demo@123.");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3">
        <button
          type="button"
          disabled={!googleEnabled || isLoading !== null}
          onClick={() => handleOAuth("google")}
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-cyan-300/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading === "google" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          Continue with Google
        </button>
        <button
          type="button"
          disabled={!microsoftEnabled || isLoading !== null}
          onClick={() => handleOAuth("microsoft-entra-id")}
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-cyan-300/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading === "microsoft-entra-id" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          Continue with Microsoft
        </button>
      </div>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
        <span className="h-px flex-1 bg-white/10" />
        Demo Access
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleDemoSubmit} className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/80 p-5">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">
            Work Email
          </span>
          <input
            name="email"
            type="email"
            defaultValue="demo@omnicart.com"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-300/60"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">
            Password
          </span>
          <input
            name="password"
            type="password"
            defaultValue="Demo@123"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-300/60"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading !== null}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading === "demo" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
          Access Demo Workspace
        </button>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      </form>
    </div>
  );
}
