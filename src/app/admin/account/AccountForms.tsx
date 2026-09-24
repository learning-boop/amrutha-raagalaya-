"use client";

import { useActionState } from "react";
import { changePassword, updateDetails, type AccountState } from "./actions";
import { MIN_PASSWORD_LENGTH } from "@/lib/password";

const field =
  "w-full min-h-12 px-4 rounded-xl border border-line bg-offwhite text-ink focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-1";
const label = "block text-[0.85rem] font-medium mb-1.5";
const submit =
  "inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-semibold text-[0.95rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 disabled:opacity-60 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3";

function Feedback({ state }: { state: AccountState }) {
  if (state.error) {
    return (
      <p role="alert" className="text-[0.88rem] text-maroon bg-maroon/5 border border-maroon/20 rounded-lg px-3 py-2">
        {state.error}
      </p>
    );
  }
  if (state.ok) {
    return (
      <p role="status" className="text-[0.88rem] text-[#177a41] bg-[#177a41]/5 border border-[#177a41]/20 rounded-lg px-3 py-2">
        {state.ok}
      </p>
    );
  }
  return null;
}

export function DetailsForm({ name, email }: { name: string; email: string }) {
  const [state, formAction, pending] = useActionState<AccountState, FormData>(updateDetails, {});

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-cream/40 p-6 space-y-4">
      <div>
        <h2 className="text-xl">Your details</h2>
        <p className="mt-1 text-[0.88rem] text-ink-2">The email address you sign in with.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          {/* key={} makes the box show the saved value again after a save. */}
          <input id="name" name="name" defaultValue={name} key={name} required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" defaultValue={email} key={email} required autoComplete="username" className={field} />
        </div>
      </div>

      <div className="sm:max-w-[calc(50%-0.5rem)]">
        <label htmlFor="currentPassword" className={label}>Current password</label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          placeholder="To confirm it is you"
          className={field}
        />
      </div>

      <Feedback state={state} />

      <button type="submit" disabled={pending} className={submit}>
        {pending ? "Saving…" : "Save details"}
      </button>
    </form>
  );
}

export function PasswordForm() {
  const [state, formAction, pending] = useActionState<AccountState, FormData>(changePassword, {});

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-cream/40 p-6 space-y-4">
      <div>
        <h2 className="text-xl">Change password</h2>
        <p className="mt-1 text-[0.88rem] text-ink-2">At least {MIN_PASSWORD_LENGTH} characters. Choose something you do not use elsewhere.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 sm:max-w-[calc(50%-0.5rem)]">
          <label htmlFor="pw-current" className={label}>Current password</label>
          <input id="pw-current" name="currentPassword" type="password" required autoComplete="current-password" className={field} />
        </div>
        <div>
          <label htmlFor="pw-new" className={label}>New password</label>
          <input id="pw-new" name="newPassword" type="password" required minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" className={field} />
        </div>
        <div>
          <label htmlFor="pw-confirm" className={label}>Repeat new password</label>
          <input id="pw-confirm" name="confirmPassword" type="password" required minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" className={field} />
        </div>
      </div>

      <Feedback state={state} />

      <button type="submit" disabled={pending} className={submit}>
        {pending ? "Changing…" : "Change password"}
      </button>
    </form>
  );
}
