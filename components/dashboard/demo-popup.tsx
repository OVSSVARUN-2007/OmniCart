"use client";

import { ShieldAlert, X } from "lucide-react";
import { useEffect, useState } from "react";

export function DemoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = window.sessionStorage.getItem("omnicart-demo-popup");
    if (!alreadySeen) {
      setOpen(true);
      window.sessionStorage.setItem("omnicart-demo-popup", "shown");
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-[32px] border border-cyan-400/20 bg-slate-950/95 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.65)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Demo Environment Notice</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              This website is not a real ecommerce business. It is a demo project. In an
              internal production environment, catalog, checkout, payments, inventory, and
              customer operations should connect to a real commerce backend.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white"
            aria-label="Close notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Continue to dashboard
        </button>
      </div>
    </div>
  );
}
