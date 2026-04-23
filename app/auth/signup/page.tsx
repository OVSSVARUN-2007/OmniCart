import Link from "next/link";
import { ArrowRight, BadgeCheck, UserPlus } from "lucide-react";
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
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#fff7ed,#fde68a,#fb7185_180%)] p-8 text-slate-950 shadow-[0_35px_80px_rgba(245,158,11,0.18)] lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">Sign up</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight lg:text-6xl">
          Create your account.
        </h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] border border-black/10 bg-white/70 p-5">
            <BadgeCheck className="h-6 w-6 text-emerald-600" />
            <p className="mt-4 text-lg font-semibold">Simple</p>
          </div>
          <div className="rounded-[28px] border border-black/10 bg-white/70 p-5">
            <UserPlus className="h-6 w-6 text-slate-950" />
            <p className="mt-4 text-lg font-semibold">Fast</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-[#fbfcfe] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Create account</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Create account with email</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Fill in your details here, then you can still use Google below if you prefer.
          </p>
        </div>

        <AuthActions googleEnabled={enabledProviders.google} mode="signup" />

        <div className="mt-8 rounded-[28px] bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-950">Already have an account?</p>
          <Link
            href="/auth/signin"
            prefetch={false}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Go to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
