"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type HeaderSearchProps = {
  initialValue?: string;
};

export function HeaderSearch({ initialValue = "" }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    const params = new URLSearchParams();

    if (value) {
      params.set("search", value);
    }

    router.push(`/${params.toString() ? `?${params.toString()}` : ""}#deals`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden min-w-[280px] flex-1 items-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm md:flex"
    >
      <Search className="h-4 w-4 text-slate-400" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products and categories"
        className="h-10 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Search
      </button>
    </form>
  );
}
