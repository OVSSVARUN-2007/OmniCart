import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { auth } from "@/auth";
import { AuthActions } from "@/components/auth/auth-actions";
import { enabledProviders } from "@/lib/auth-options";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-16">
      <section className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-200">Secure Access</p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold text-white lg:text-6xl">
          Sign in to the OmniCart command center.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
          Use OAuth for Google or Microsoft when environment credentials are configured, or use
          the included demo account to explore the experience immediately.
        </p>
        <div className="mt-10 space-y-4">
          {[
            "JWT session strategy configured through Auth.js.",
            "Google and Microsoft account authentication supported.",
            "Demo fallback credentials included for local previews."
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
              <span className="text-sm leading-7 text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_24px_120px_rgba(244,114,182,0.08)] backdrop-blur-xl lg:p-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Authentication</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Choose your access path</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            OAuth buttons activate as soon as provider credentials are added in `.env.local`.
          </p>
        </div>
        <AuthActions
          googleEnabled={enabledProviders.google}
          microsoftEnabled={enabledProviders.microsoft}
        />
      </section>
    </div>
  );
}
