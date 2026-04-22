import Link from "next/link";
import { CheckCircle2, ShieldCheck, UserPlus } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthActions } from "@/components/auth/auth-actions";
import { enabledProviders } from "@/lib/auth-options";

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#fffbeb,#fde68a,#f59e0b)] p-8 text-slate-950 shadow-[0_35px_80px_rgba(245,158,11,0.18)] lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">
          Signup
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight lg:text-6xl">
          Create your OmniCart account and unlock protected product access.
        </h1>
        <div className="mt-10 space-y-4">
          {[
            "Product access is gated to signed-in users.",
            "Google OAuth handles account creation and identity verification.",
            "You are redirected to dashboard after a successful signup."
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/70 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <span className="text-sm leading-7 text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-[#fbfcfe] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Create Account
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Sign up with Google</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Fast signup using your Google account.
          </p>
        </div>

        <AuthActions googleEnabled={enabledProviders.google} mode="signup" />

        <div className="mt-8 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-semibold text-slate-950">Already have access?</p>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Return to login if you already signed up before.
          </p>
          <Link
            href="/auth/signin"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4" />
            Go to Login
          </Link>
        </div>
      </section>
    </div>
  );
}
