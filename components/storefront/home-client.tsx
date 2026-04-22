"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search, ShoppingCart, Star, UserRound } from "lucide-react";
import { useState } from "react";

import type { ProductRecord } from "@/lib/catalog";

type HomeClientProps = {
  products: ProductRecord[];
  categories: string[];
};

export function HomeClient({ products, categories }: HomeClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);

  return (
    <div className="pb-10">
      <section className="bg-[#131921] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 lg:px-8">
          <div className="rounded-full bg-[#232f3e] px-4 py-2 text-sm font-semibold">
            Deliver to India
          </div>
          <div className="flex min-w-[260px] flex-1 items-center overflow-hidden rounded-full bg-white">
            <div className="px-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <div className="flex-1 px-1 py-3 text-sm text-slate-500">
              Search OmniCart products, brands and categories
            </div>
            <div className="bg-[#febd69] px-5 py-3 text-slate-950">
              <Search className="h-5 w-5" />
            </div>
          </div>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 rounded-full bg-[#232f3e] px-5 py-3 text-sm font-semibold transition hover:bg-[#37475a]"
          >
            <UserRound className="h-4 w-4" />
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 rounded-full bg-[#febd69] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#f3a847]"
          >
            <ShoppingCart className="h-4 w-4" />
            Sign Up
          </Link>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#232f3e] text-white">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3 lg:px-8">
          {categories.map((category) => (
            <div
              key={category}
              className="whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-medium"
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] bg-[linear-gradient(135deg,#dbeafe,#fff7ed,#ffffff)] p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Today&apos;s highlights
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950 lg:text-6xl">
              Shop top picks, trending products, and clean marketplace cards.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              The opening page is now more shopping-focused. Clicking any product opens an auth
              popup so users are guided to login or signup first.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/auth/signin"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Login to continue
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-blue-300 hover:text-blue-700"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Product APIs
              </p>
              <p className="mt-3 text-lg font-bold text-slate-950">
                Products currently come from `Fake Store API` and `DummyJSON`.
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                If those APIs do not respond, OmniCart falls back to built-in demo products.
              </p>
            </div>
            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Access rule
              </p>
              <p className="mt-3 text-lg font-bold text-slate-950">
                Product viewing is gated by signup and login popup.
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Any product click opens a popup with buttons that redirect to login and signup
                pages.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Best sellers
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Shop products like a real marketplace
            </h2>
          </div>
          <div className="text-sm text-slate-500">Powered by live API images where available</div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`bg-gradient-to-br ${product.accent} p-5`}>
                <div className="relative h-56 overflow-hidden rounded-[20px] bg-white">
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {product.brand}
                </p>
                <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">{product.name}</h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 fill-current text-[#f59e0b]" />
                  {product.rating.toFixed(1)}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-950">${product.price}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {product.source === "api" ? "API" : "Fallback"}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedProduct ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Protected product
            </p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">{selectedProduct.name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Please login or signup to continue viewing this product and access protected shopping
              flows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Login
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-blue-300 hover:text-blue-700"
              >
                Sign Up
                <ChevronRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
