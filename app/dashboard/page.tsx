import Image from "next/image";
import { redirect } from "next/navigation";
import { Activity, BadgeCheck, Database, Shield, ShoppingBag } from "lucide-react";

import { auth } from "@/auth";
import { DemoPopup } from "@/components/dashboard/demo-popup";
import { dashboardActivities, dashboardMetrics } from "@/lib/catalog";
import { getMarketplaceProducts } from "@/lib/products";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const products = await getMarketplaceProducts();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
      <DemoPopup />

      <section className="rounded-[32px] bg-[linear-gradient(135deg,#0f172a,#1d4ed8,#f97316)] p-8 text-white shadow-[0_35px_90px_rgba(15,23,42,0.18)]">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">Dashboard</p>
            <h1 className="mt-3 text-4xl font-bold">Welcome, {session.user?.name ?? "Operator"}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/84">
              This internal workspace now reflects a more production-shaped commerce control panel
              with stronger identity messaging, hybrid database direction, and product feed insight.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/10 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Signed in as</p>
            <p className="mt-2 text-sm font-medium text-white">{session.user?.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <div key={metric.label} className="rounded-[24px] border border-white/12 bg-white/10 p-5">
              <p className="text-sm text-white/72">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold">{metric.value}</p>
              <p className="mt-3 text-sm text-emerald-200">{metric.change}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Security status</p>
              <h2 className="text-2xl font-bold text-slate-950">Platform controls</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {dashboardActivities.map((activity) => (
              <div key={activity} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                <p className="text-sm leading-7 text-slate-700">{activity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Hybrid storage</p>
              <h2 className="text-2xl font-bold text-slate-950">Database design</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">PostgreSQL</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Users, OAuth accounts, orders, session linkage, and transactional commerce records.
              </p>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">MongoDB</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Audit logs, event streams, recommendation signals, and internal telemetry data.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-[24px] bg-slate-950 p-5 text-white">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-300" />
              <p className="font-semibold">Security note</p>
            </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
              No shared demo password login remains in the main auth flow. Use Google OAuth with
              real secrets in production, plus DB migrations and HTTPS for deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[32px] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Catalog stream</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Live-ready product cards</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            <ShoppingBag className="h-4 w-4 text-blue-600" />
            API-backed merchandising
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <article key={product.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
              <div className={`bg-gradient-to-br ${product.accent} p-5`}>
                <div className="relative h-52 overflow-hidden rounded-[22px] bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-5"
                    sizes="(max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{product.brand}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-950">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-950">${product.price}</span>
                  <span className="text-sm text-slate-500">{product.rating.toFixed(1)} rating</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
