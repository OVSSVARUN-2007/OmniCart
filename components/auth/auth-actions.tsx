"use client";

import { LoaderCircle, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthActionsProps = {
  googleEnabled: boolean;
  mode: "signin" | "signup";
};

export function AuthActions({ googleEnabled, mode }: AuthActionsProps) {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleGoogleAuth() {
    setErrorMessage("");
    setSuccessMessage("");
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  async function handleCredentialsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsCredentialsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    try {
      if (mode === "signup") {
        const registerResponse = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword
          })
        });

        const registerPayload = (await registerResponse.json()) as { message?: string };

        if (!registerResponse.ok) {
          setErrorMessage(registerPayload.message ?? "Unable to create account.");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (result?.error) {
        setErrorMessage(
          mode === "signup" ? "Account created, but automatic sign in failed." : "Invalid email or password."
        );
        return;
      }

      setSuccessMessage(mode === "signup" ? "Account created. Redirecting to your dashboard..." : "Signing you in...");
      router.push(result?.url ?? "/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsCredentialsLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleCredentialsSubmit} className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        {mode === "signup" ? (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Full name</span>
            <input
              name="name"
              type="text"
              required
              className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-950 outline-none transition focus:border-slate-400"
              placeholder="Ramakrishna"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-950 outline-none transition focus:border-slate-400"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-950 outline-none transition focus:border-slate-400"
            placeholder="Enter password"
          />
        </label>

        {mode === "signup" ? (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Confirm password</span>
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-950 outline-none transition focus:border-slate-400"
              placeholder="Confirm password"
            />
          </label>
        ) : null}

        <button
          type="submit"
          disabled={isCredentialsLoading || isGoogleLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[20px] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isCredentialsLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        Or continue with Google
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        disabled={!googleEnabled || isGoogleLoading || isCredentialsLoading}
        onClick={handleGoogleAuth}
        className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
            {isGoogleLoading ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-950">
              {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          OAuth
        </span>
      </button>

      {!googleEnabled ? (
        <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-slate-950">Google setup required</p>
          <p className="mt-1 text-sm leading-7 text-slate-600">
            Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local` to enable sign-in.
          </p>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[24px] border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      ) : null}
    </div>
  );
}
