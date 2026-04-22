import Image from "next/image";
import { Package, Receipt, Star, UserCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getMarketplaceProducts } from "@/lib/products";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const products = await getMarketplaceProducts({ limit: 4 });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
      <section className="rounded-[34px] bg-[linear-gradient(135deg,#101827,#1d4ed8,#0f766e_180%)] p-8 text-white shadow-[0_35px_90px_rgba(15,23,42,0.16)]">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">My account</p>
            <h1 className="mt-3 text-4xl font-bold">Welcome back, {session.user?.name ?? "Customer"}</h1>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/10 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">Email</p>
            <p className="mt-2 text-sm font-medium text-white">{session.user?.email}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Orders", value: "12", icon: Receipt },
          { label: "Saved items", value: "28", icon: Package },
          { label: "Reviews", value: "9", icon: Star }
        ].map((metric) => (
          <div key={metric.label} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <metric.icon className="h-5 w-5 text-blue-600" />
            <p className="mt-4 text-3xl font-bold text-slate-950">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <UserCircle2 className="h-6 w-6 text-slate-950" />
            <h2 className="text-2xl font-bold text-slate-950">Profile</h2>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Name</p>
              <p className="mt-2 text-base font-semibold text-slate-950">{session.user?.name ?? "Customer"}</p>
            </div>
            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</p>
              <p className="mt-2 text-base font-semibold text-slate-950">{session.user?.email}</p>
            </div>
            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</p>
              <p className="mt-2 text-base font-semibold text-emerald-600">Active customer</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Products</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">For you</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
                <div className={`bg-gradient-to-br ${product.accent} p-4`}>
                  <div className="relative h-48 overflow-hidden rounded-[20px] bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{product.brand}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">${product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
