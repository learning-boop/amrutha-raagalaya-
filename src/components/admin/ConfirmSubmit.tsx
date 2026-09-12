"use client";

import { useFormStatus } from "react-dom";

/** Submit button that asks before running a destructive Server Action. */
export default function ConfirmSubmit({ message, children, className = "" }: { message: string; children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className={className}
    >
      {pending ? "Working…" : children}
    </button>
  );
}
