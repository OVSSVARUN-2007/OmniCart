"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  PackageCheck,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck
} from "lucide-react";
import { useMemo, useState } from "react";

import type { ProductRecord } from "@/lib/catalog";

type HomeClientProps = {
  products: ProductRecord[];
  categories: string[];
};

export function HomeClient({ products, categories }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(products[0] ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const categoryOptions = useMemo(() => ["All", ...categories], [categories]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.description} ${product.brand}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  const heroProduct = filteredProducts[0] ?? products[0];
  const productPreview = selectedProduct ?? heroProduct ?? null;

  return (
    <div className="pb-14">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#fff8f1,0%,#f6f8fc_52%,#f3f7fb_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#13253f_48%,#f97316_160%)] p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-100">
                  New arrivals
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                  Curated picks
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight lg:text-6xl">
                Find products faster.
              </h1>

              <div className="mt-7 flex max-w-2xl items-center gap-3 rounded-[26px] border border-white/10 bg-white/95 p-2 text-slate-950 shadow-[0_20px_55px_rgba(15,23,42,0.18)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb34d] text-slate-950">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="h-12 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Search
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                  { label: "Categories", value: `${categoryOptions.length - 1}+`, icon: Sparkles },
                  { label: "Products", value: `${filteredProducts.length}`, icon: PackageCheck },
                  { label: "Cart", value: `${cartCount}`, icon: ShoppingCart }
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <metric.icon className="h-5 w-5 text-orange-200" />
                    <p className="mt-4 text-2xl font-bold text-white">{metric.value}</p>
                    <p className="mt-1 text-sm text-slate-200">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              {heroProduct ? (
                <>
                  <div className={`rounded-[30px] bg-gradient-to-br ${heroProduct.accent} p-6`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                        {heroProduct.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(heroProduct)}
                        className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white"
                      >
                        View product
                      </button>
                    </div>
                    <div className="relative mt-6 h-72 overflow-hidden rounded-[28px] bg-white">
                      <Image
                        src={heroProduct.image}
                        alt={heroProduct.name}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  </div>

                  <div className="px-2 pb-2 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {heroProduct.brand}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-950">{heroProduct.name}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{heroProduct.description}</p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-3xl font-bold text-slate-950">${heroProduct.price}</p>
                        <p className="mt-1 text-sm text-slate-500">{heroProduct.inventory} in stock</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCartCount((count) => count + 1);
                          setSelectedProduct(heroProduct);
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#ffb34d] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#f59e0b]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Categories
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Shop by category</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <Truck className="h-4 w-4 text-blue-600" />
            Fast filters
          </div>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {categoryOptions.map((category) => {
            const active = category === selectedCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  active
                    ? "border-slate-950 bg-slate-950 text-white shadow-[0_16px_35px_rgba(15,23,42,0.18)]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]"
              >
                <div className={`bg-gradient-to-br ${product.accent} p-5`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                      {product.category}
                    </span>
                    <Heart className="h-4 w-4 text-slate-500 transition group-hover:text-rose-500" />
                  </div>
                  <div className="relative mt-4 h-56 overflow-hidden rounded-[24px] bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-5 transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {product.brand}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <Star className="h-4 w-4 fill-current text-[#f59e0b]" />
                    {product.rating.toFixed(1)}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-slate-950">${product.price}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {product.inventory} in stock
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <aside className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            {productPreview ? (
              <>
                <div className={`rounded-[28px] bg-gradient-to-br ${productPreview.accent} p-5`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                      {productPreview.badge}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {productPreview.source}
                    </span>
                  </div>
                  <div className="relative mt-5 h-72 overflow-hidden rounded-[24px] bg-white">
                    <Image
                      src={productPreview.image}
                      alt={productPreview.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {productPreview.brand}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-950">{productPreview.name}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <Star className="h-4 w-4 fill-current text-[#f59e0b]" />
                    {productPreview.rating.toFixed(1)}
                    <span className="text-slate-300">|</span>
                    <span>{productPreview.category}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{productPreview.description}</p>

                  <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Price</p>
                        <p className="mt-1 text-3xl font-bold text-slate-950">${productPreview.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-500">Availability</p>
                        <p className="mt-1 text-base font-semibold text-emerald-600">
                          {productPreview.inventory} units in stock
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setCartCount((count) => count + 1)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffb34d] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#f59e0b]"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => setCartCount((count) => count + 1)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Buy now
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/auth/signin"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Sign in
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                      <PackageCheck className="h-4 w-4" />
                      Ready to order
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-base font-semibold text-slate-950">No products found</p>
                <p className="mt-2 text-sm text-slate-600">Try another category or a broader search.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
