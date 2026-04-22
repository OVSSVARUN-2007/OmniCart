import { redirect } from "next/navigation";
import { ArrowUpRight, BadgeCheck, LayoutDashboard, Lock, Sparkles } from "lucide-react";

import { auth } from "@/auth";
import { DemoPopup } from "@/components/dashboard/demo-popup";
import { dashboardActivities, dashboardMetrics, featuredProducts } from "@/lib/catalog";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
      <DemoPopup />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Welcome Back</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">
                {session.user?.name ?? "Commerce Operator"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                This is your demo commerce workspace. Review launch metrics, authentication
                readiness, and merchandising blocks from one premium internal dashboard.
              </p>
            </div>
            <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-right">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Signed in as</p>
              <p className="mt-2 text-sm font-medium text-white">{session.user?.email}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dashboardMetrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5"
              >
                <p className="text-sm text-slate-400">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-3 text-sm text-emerald-300">{metric.change}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[36px] border border-white/10 bg-slate-900/80 p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-fuchsia-400/10 p-3 text-fuchsia-200">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Identity Stack</p>
              <h2 className="text-2xl font-semibold text-white">Auth readiness summary</h2>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {dashboardActivities.map((activity) => (
              <div key={activity} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
                <p className="text-sm leading-7 text-slate-300">{activity}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-[36px] border border-white/10 bg-slate-900/70 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Launch Shelf</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Featured products</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
            <LayoutDashboard className="h-4 w-4 text-cyan-300" />
            Dashboard merchandising overview
          </div>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className={`rounded-[22px] bg-gradient-to-br ${product.accent} p-5`}>
                <div className="rounded-[18px] bg-black/15 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/80">{product.badge}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-white/85">{product.category}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">{product.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-semibold text-white">${product.price}</span>
                <span className="inline-flex items-center gap-2 text-sm text-cyan-200">
                  Inspect
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(168,85,247,0.12),rgba(16,185,129,0.12))] p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Next Step</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Swap demo data for real commerce services.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/90">
              This project is intentionally built as a polished demo foundation. In a real
              ecommerce deployment, connect product, cart, payment, order, inventory, analytics,
              and customer systems behind the same UI shell.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/15 px-5 py-3 text-sm text-white">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            Demo-first, production-ready direction
          </div>
        </div>
      </section>
    </div>
  );
}
