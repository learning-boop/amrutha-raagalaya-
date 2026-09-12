"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../auth-actions";

const field =
  "w-full min-h-12 px-4 rounded-xl border border-line bg-offwhite text-ink placeholder:text-ink-2/60 focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-1";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="mt-8 rounded-2xl border border-line bg-cream/50 p-6 space-y-4">
      <div>
        <label htmlFor="email" className="block text-[0.85rem] font-medium mb-1.5">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className={field} />
      </div>
      <div>
        <label htmlFor="password" className="block text-[0.85rem] font-medium mb-1.5">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={field} />
      </div>

      {state.error && (
        <p role="alert" className="text-[0.85rem] text-maroon bg-maroon/5 border border-maroon/20 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-semibold text-[0.95rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 disabled:opacity-60 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
