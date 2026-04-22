import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  Truck
} from "lucide-react";

import { discoveryLanes, securityPillars, trustSignals } from "@/lib/catalog";
import { getMarketplaceCategories, getMarketplaceProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getMarketplaceProducts();
  const categories = getMarketplaceCategories();

  return (
    <div className="pb-8">
      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-4 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
        <div className="overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_54%,#f97316_100%)] p-8 text-white shadow-[0_35px_90px_rgba(15,23,42,0.18)] lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
            Marketplace Demo
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight lg:text-6xl">
            Shop, discover, and operate from a commerce UI shaped like a real marketplace.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/82">
            OmniCart now leans into a practical ecommerce layout inspired by large retail
            marketplaces: stronger product discovery, clearer trust messaging, OAuth-first sign-in,
            and a backend architecture prepared for real commerce systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Secure Login
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#deals"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Deals
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="rounded-[24px] border border-white/12 bg-white/10 p-4">
                <p className="text-2xl font-bold">{signal.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/76">{signal.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[32px] bg-[#fff7ed] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
              Daily drop
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">Modern components, cleaner shopping UX</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Reworked layout with brighter merchandising, more practical hierarchy, and stronger
              call-to-action design.
            </p>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
              Security stack
            </p>
            <div className="mt-4 space-y-3">
              {[
                "Google OAuth",
                "Microsoft OAuth",
                "JWT session strategy",
                "PostgreSQL + MongoDB hybrid architecture"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto mt-6 w-full max-w-7xl px-4 lg:px-8">
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Browse store</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Marketplace categories</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Category navigation is shaped to feel more like large ecommerce platforms instead of a
              startup landing page.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {categories.map((category) => (
              <div
                key={category}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="deals" className="mx-auto mt-6 w-full max-w-7xl px-4 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured selection</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Products from API feeds and curated fallbacks</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Product cards now support real external product images and data feeds, while falling
            back gracefully when APIs are not available.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`bg-gradient-to-br ${product.accent} p-5`}>
                <div className="relative h-56 overflow-hidden rounded-[24px] bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-5 transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {product.badge}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {product.source}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {product.brand}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-950">${product.price}</p>
                    <p className="text-sm text-slate-500">{product.rating.toFixed(1)} rating</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-4 lg:grid-cols-3 lg:px-8">
        {discoveryLanes.map((lane) => (
          <div key={lane.title} className="rounded-[28px] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{lane.title}</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">{lane.title} experiences</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{lane.summary}</p>
          </div>
        ))}
      </section>

      <section id="security" className="mx-auto mt-6 w-full max-w-7xl px-4 lg:px-8">
        <div className="rounded-[32px] bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Platform security</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Built for stronger defaults, not just prettier screens</h2>
            </div>
            <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              Secure-by-default direction
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {securityPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-slate-950">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { icon: ShieldCheck, label: "OAuth providers" },
              { icon: CreditCard, label: "Transactional data in PostgreSQL" },
              { icon: PackageCheck, label: "Catalog feed fallback resilience" },
              { icon: Truck, label: "Marketplace-ready UI shell" }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <item.icon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-7xl px-4 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] bg-[#fff7ed] p-8 shadow-sm">
            <BadgePercent className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Internal demo note</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This public UI is a demo project and not a live ecommerce business. Production
              deployments should use real payment, inventory, order, fraud, and customer service
              systems behind the same frontend shell.
            </p>
          </div>
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-[0_28px_70px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
              Architecture overview
            </p>
            <h2 className="mt-3 text-3xl font-bold">PostgreSQL for transactions, MongoDB for event streams.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The repo now includes Prisma schema design for PostgreSQL and a MongoDB model for
              audit/event records so you can expand this into a more realistic multi-store commerce
              backend.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
