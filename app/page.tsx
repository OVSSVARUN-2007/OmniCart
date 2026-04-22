import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Globe,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

import { categories, featuredProducts, heroStats, testimonials } from "@/lib/catalog";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-24 lg:pt-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Premium Ecommerce Demo
          </div>
          <h1 className="mt-8 text-5xl font-semibold leading-tight text-white lg:text-7xl">
            Commerce infrastructure with a flagship storefront feel.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            OmniCart is a modern ecommerce demo project designed with premium merchandising,
            OAuth-ready sign-in, JWT session architecture, and a dashboard experience that feels
            investor-demo ready.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Launch Secure Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/5"
            >
              View Catalog
            </Link>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-cyan-400/20 via-fuchsia-400/10 to-emerald-400/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_120px_rgba(6,182,212,0.15)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Operations Snapshot</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                Live Demo
              </span>
            </div>
            <div className="mt-8 grid gap-4">
              {[
                {
                  icon: Globe,
                  title: "Multi-channel merchandising",
                  detail: "Unified promotions and storytelling across storefront, dashboard, and campaigns."
                },
                {
                  icon: ShieldCheck,
                  title: "JWT + OAuth architecture",
                  detail: "Google and Microsoft providers are wired in with stateless session management."
                },
                {
                  icon: ChartNoAxesCombined,
                  title: "Executive dashboard layer",
                  detail: "Commerce metrics, launch visibility, and modern internal UX in one secure panel."
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/30 hover:bg-white/10"
                >
                  <item.icon className="h-6 w-6 text-cyan-300" />
                  <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-200">Curated Commerce</p>
            <h2 className="mt-3 text-3xl font-semibold text-white lg:text-4xl">
              Premium product stories built for conversion.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            Use these seeded demo collections to present product quality, launch readiness, and
            visual polish without wiring a live backend yet.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 backdrop-blur-xl"
            >
              <div className={`h-56 bg-gradient-to-br ${product.accent} p-6`}>
                <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/20 bg-black/10 p-5 backdrop-blur-sm">
                  <span className="w-fit rounded-full bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white">
                    {product.badge}
                  </span>
                  <div>
                    <p className="text-sm text-white/80">{product.category}</p>
                    <h3 className="mt-2 text-3xl font-semibold text-white">{product.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-white">${product.price}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
                    {product.rating} rating
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-400">{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities" className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-16 lg:grid-cols-3 lg:px-10">
        {categories.map((category) => (
          <div key={category.name} className="rounded-[32px] border border-white/10 bg-white/5 p-7">
            <Zap className="h-6 w-6 text-fuchsia-300" />
            <h3 className="mt-5 text-2xl font-semibold text-white">{category.name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{category.summary}</p>
          </div>
        ))}
      </section>

      <section id="security" className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-400/10 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Security Layer</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">OAuth plus JWT, ready for Google and Microsoft.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200/90">
            This project includes Google account authentication and Microsoft account
            authentication support through Auth.js. Sessions are configured with JWT strategy for a
            scalable stateless setup, and a demo credentials path is included so the app still
            works locally before provider keys are connected.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure key={item.author} className="rounded-[32px] border border-white/10 bg-white/5 p-7">
              <blockquote className="text-lg leading-8 text-white">"{item.quote}"</blockquote>
              <figcaption className="mt-6 text-sm text-slate-400">
                {item.author}
                <span className="block text-slate-500">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
