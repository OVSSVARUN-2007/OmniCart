"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Heart,
  PackageCheck,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import type { ProductRecord } from "@/lib/catalog";

type HomeClientProps = {
  products: ProductRecord[];
  categories: string[];
  initialSearch?: string;
};

type CartItem = ProductRecord & {
  quantity: number;
};

type PaymentFormState = {
  cardNumber: string;
  cardholderName: string;
  paymentMethod: string;
};

const defaultPaymentState: PaymentFormState = {
  cardNumber: "",
  cardholderName: "",
  paymentMethod: "Credit Card"
};

export function HomeClient({ products, categories, initialSearch = "" }: HomeClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(products[0] ?? null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error" | "info">("info");
  const [paymentProduct, setPaymentProduct] = useState<ProductRecord | null>(null);
  const [paymentForm, setPaymentForm] = useState<PaymentFormState>(defaultPaymentState);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const categoryOptions = useMemo(() => {
    const availableCategories = new Set(products.map((product) => product.category));
    const filteredCategories = categories.filter((category) => availableCategories.has(category));

    return ["All", ...(filteredCategories.length > 0 ? filteredCategories : Array.from(availableCategories))];
  }, [categories, products]);

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

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const heroProduct = filteredProducts[0] ?? products[0];
  const productPreview = selectedProduct ?? heroProduct ?? null;

  function showStatus(message: string, tone: "success" | "error" | "info") {
    setStatusMessage(message);
    setStatusTone(tone);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    const value = searchQuery.trim();

    if (value) {
      params.set("search", value);
    }

    router.replace(`/${params.toString() ? `?${params.toString()}` : ""}#deals`, { scroll: false });

    if (filteredProducts.length > 0) {
      setSelectedProduct(filteredProducts[0]);
      showStatus(`Showing ${filteredProducts.length} matching product${filteredProducts.length === 1 ? "" : "s"}.`, "info");
    } else {
      showStatus("No matching products found. Try another search term.", "error");
    }
  }

  function addToCart(product: ProductRecord) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    setSelectedProduct(product);
    showStatus(`${product.name} added to cart.`, "success");
  }

  function removeFromCart(productId: string) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    showStatus("Item removed from cart.", "info");
  }

  function openPayment(product: ProductRecord) {
    if (!session?.user?.email) {
      router.push("/auth/signin");
      return;
    }

    setPaymentProduct(product);
    setPaymentForm({
      ...defaultPaymentState,
      cardholderName: session.user.name ?? ""
    });
    showStatus(`Ready to complete payment for ${product.name}.`, "info");
  }

  async function handlePaymentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!paymentProduct) {
      return;
    }

    setIsProcessingPayment(true);
    showStatus("", "info");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: paymentProduct.id,
          productName: paymentProduct.name,
          totalAmount: paymentProduct.price,
          paymentMethod: paymentForm.paymentMethod,
          cardNumber: paymentForm.cardNumber,
          cardholderName: paymentForm.cardholderName
        })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }

        showStatus(payload.message ?? "Payment failed.", "error");
        return;
      }

      setCartItems((currentItems) => currentItems.filter((item) => item.id !== paymentProduct.id));
      setPaymentProduct(null);
      setPaymentForm(defaultPaymentState);
      showStatus(payload.message ?? "Payment successful.", "success");
      router.refresh();
    } catch {
      showStatus("Unable to process payment right now.", "error");
    } finally {
      setIsProcessingPayment(false);
    }
  }

  return (
    <div className="pb-14">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#fff8f1,0%,#f6f8fc_52%,#f3f7fb_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#13253f_48%,#f97316_160%)] p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:p-9">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-100">
                Storefront
              </span>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight lg:text-6xl">
                Browse every product in one clean grid.
              </h1>

              <form
                onSubmit={handleSearchSubmit}
                className="mt-7 flex max-w-2xl items-center gap-3 rounded-[26px] border border-white/10 bg-white/95 p-2 text-slate-950 shadow-[0_20px_55px_rgba(15,23,42,0.18)]"
              >
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
                  type="submit"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Search
                </button>
              </form>

              {statusMessage ? (
                <div
                  className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                    statusTone === "success"
                      ? "bg-emerald-100 text-emerald-900"
                      : statusTone === "error"
                        ? "bg-rose-100 text-rose-900"
                        : "bg-white/15 text-white"
                  }`}
                >
                  {statusMessage}
                </div>
              ) : null}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Categories", value: `${categoryOptions.length - 1}+`, icon: Tag },
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
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-3xl font-bold text-slate-950">${heroProduct.price}</p>
                        <p className="mt-1 text-sm text-slate-500">{heroProduct.inventory} in stock</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(heroProduct)}
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
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {categoryOptions.map((category) => {
            const active = category === selectedCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedProduct(null);
                }}
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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.1)]"
              >
                <div className={`bg-gradient-to-br ${product.accent} p-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                      {product.category}
                    </span>
                    <Heart className="h-4 w-4 text-slate-500 transition group-hover:text-rose-500" />
                  </div>
                  <div className="relative mt-3 h-40 overflow-hidden rounded-[20px] bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {product.brand}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-base font-bold text-slate-950">{product.name}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <Star className="h-4 w-4 fill-current text-[#f59e0b]" />
                    {product.rating.toFixed(1)}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-xl font-bold text-slate-950">${product.price}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {product.inventory}
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
                  <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600">{productPreview.description}</p>

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
                      onClick={() => addToCart(productPreview)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffb34d] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#f59e0b]"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => openPayment(productPreview)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Buy now
                    </button>
                  </div>
                  <Link
                    href={session?.user?.email ? "/dashboard" : "/auth/signin"}
                    prefetch={false}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {session?.user?.email ? "View orders" : "Sign in to continue"}
                  </Link>
                </div>
              </>
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-base font-semibold text-slate-950">No products found</p>
                <p className="mt-2 text-sm text-slate-600">Try another category or a broader search.</p>
              </div>
            )}

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Cart</p>
                  <h4 className="mt-1 text-xl font-bold text-slate-950">{cartCount} items selected</h4>
                </div>
                <p className="text-xl font-bold text-slate-950">${cartTotal.toFixed(2)}</p>
              </div>

              <div className="mt-4 space-y-3">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-[20px] bg-white px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          Qty {item.quantity} • ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openPayment(item)}
                          className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white"
                        >
                          Pay
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Add products to cart and use the payment form below to create an order.
                  </p>
                )}
              </div>
            </div>

            {paymentProduct ? (
              <form onSubmit={handlePaymentSubmit} className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Payment</p>
                    <h4 className="text-xl font-bold text-slate-950">{paymentProduct.name}</h4>
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">Cardholder name</span>
                    <input
                      value={paymentForm.cardholderName}
                      onChange={(event) =>
                        setPaymentForm((current) => ({ ...current, cardholderName: event.target.value }))
                      }
                      required
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400"
                      placeholder="Cardholder name"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">Card number</span>
                    <input
                      value={paymentForm.cardNumber}
                      onChange={(event) =>
                        setPaymentForm((current) => ({ ...current, cardNumber: event.target.value }))
                      }
                      required
                      minLength={12}
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400"
                      placeholder="4242 4242 4242 4242"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">Payment method</span>
                    <select
                      value={paymentForm.paymentMethod}
                      onChange={(event) =>
                        setPaymentForm((current) => ({ ...current, paymentMethod: event.target.value }))
                      }
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400"
                    >
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>UPI</option>
                    </select>
                  </label>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-500">
                    Total: <span className="font-bold text-slate-950">${paymentProduct.price.toFixed(2)}</span>
                  </p>
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isProcessingPayment ? "Processing..." : "Pay now"}
                  </button>
                </div>
              </form>
            ) : null}
          </aside>
        </div>
      </section>
    </div>
  );
}
