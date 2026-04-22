import { CheckCircle2, Database, ShieldCheck, UserRoundCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthActions } from "@/components/auth/auth-actions";
import { enabledProviders } from "@/lib/auth-options";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#0f172a,#1d4ed8,#f97316)] p-8 text-white shadow-[0_35px_80px_rgba(15,23,42,0.22)] lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-100">
          Identity Gateway
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight lg:text-6xl">
          Secure access for customers, operators, and internal teams.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/85">
          OmniCart now uses an OAuth-first sign-in path instead of a shared demo password flow.
          That gives you a setup closer to a production marketplace with third-party identity,
          JWT sessions, and database-backed account records.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "OAuth-first",
              detail: "Google and Microsoft are the primary login providers."
            },
            {
              icon: Database,
              title: "Hybrid storage",
              detail: "PostgreSQL plus MongoDB architecture for commerce and events."
            },
            {
              icon: UserRoundCheck,
              title: "JWT sessions",
              detail: "Stateless session strategy built for scale-out deployments."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[26px] border border-white/15 bg-white/10 p-5">
              <item.icon className="h-5 w-5 text-white" />
              <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-[#fbfcfe] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Sign In / Sign Up
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Choose your identity provider</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Normal email-password forms have been removed in favor of Google and Microsoft OAuth.
          </p>
        </div>

        <AuthActions
          googleEnabled={enabledProviders.google}
          microsoftEnabled={enabledProviders.microsoft}
        />

        <div className="mt-8 space-y-3">
          {[
            "Auth.js secret now falls back safely for local development, avoiding the MissingSecret crash.",
            "Production should still use a strong `AUTH_SECRET`, real OAuth app credentials, and HTTPS.",
            "Run Prisma migrations and connect MongoDB before going beyond demo mode."
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <span className="text-sm leading-7 text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
