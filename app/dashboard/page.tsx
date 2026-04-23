import Image from "next/image";
import { Package, Receipt, Shapes, Star, UserCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getOrdersByEmail } from "@/lib/local-store";
import { getMarketplaceCategories, getMarketplaceProducts } from "@/lib/products";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const [products, categories] = await Promise.all([
    getMarketplaceProducts({ limit: 6 }),
    getMarketplaceCategories()
  ]);
  const orders = session.user?.email ? await getOrdersByEmail(session.user.email) : [];
  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

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
          { label: "Orders", value: `${orders.length}`, icon: Receipt },
          { label: "Categories", value: `${categories.length}`, icon: Shapes },
          { label: "Spent", value: `$${totalSpent.toFixed(2)}`, icon: Package }
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
            <div className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recent orders</p>
              <p className="mt-2 text-base font-semibold text-slate-950">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Catalog</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Quick browse</h2>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <span
                key={category}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div className={`bg-gradient-to-br ${product.accent} p-3`}>
                  <div className="relative h-32 overflow-hidden rounded-[18px] bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {product.category}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-sm font-bold text-slate-950">{product.name}</h3>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-base font-bold text-slate-950">${product.price}</p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                      {product.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Orders</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Recent payments and purchases</h2>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{order.productName}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{order.id}</p>
                    </div>
                    <div className="text-sm text-slate-600">
                      Paid with {order.paymentMethod} ending in {order.paymentLast4}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-600">{order.status}</p>
                      <p className="mt-1 text-base font-bold text-slate-950">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
                  No orders yet. Go back to the storefront, add a product, and complete payment to see your orders here.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
