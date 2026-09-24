"use client";

import { useActionState, useState } from "react";
import { addReview, type ReviewState } from "./actions";

const field =
  "w-full min-h-11 px-3 rounded-lg border border-line bg-offwhite text-[0.92rem] focus-visible:outline-3 focus-visible:outline-gold";
const label = "block text-[0.8rem] font-medium mb-1";

export default function AddReviewForm() {
  const [state, formAction, pending] = useActionState<ReviewState, FormData>(addReview, {});
  const [handled, setHandled] = useState(state);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  // Clear the boxes once a review is saved (during render, not in an effect).
  if (state !== handled) {
    setHandled(state);
    if (state.ok) {
      setText("");
      setAuthor("");
    }
  }

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-cream/50 p-6">
      <h2 className="text-xl">Add a review from Google</h2>
      <p className="mt-1 text-[0.85rem] text-ink-2">
        Open your Google listing, copy a review, and paste it here. New reviews appear first in the carousel.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label htmlFor="author" className={label}>Reviewer&rsquo;s name</label>
          <input id="author" name="author" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Lakshmi P." className={field} />
        </div>
        <div>
          <label htmlFor="rating" className={label}>Stars</label>
          <select id="rating" name="rating" defaultValue="5" className={field}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{"★".repeat(n)} ({n})</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reviewedOn" className={label}>When (optional)</label>
          <input id="reviewedOn" name="reviewedOn" placeholder="2 months ago" className={field} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="text" className={label}>Review text</label>
        <textarea
          id="text"
          name="text"
          required
          rows={4}
          maxLength={1500}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste exactly what the reviewer wrote on Google."
          className={`${field} py-2.5`}
        />
        <p className="mt-1 text-[0.78rem] text-ink-2">{text.length}/1500 characters</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center min-h-11 px-6 rounded-xl font-semibold text-[0.92rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 disabled:opacity-60 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
        >
          {pending ? "Adding…" : "Add review"}
        </button>
        {state.error && <p role="alert" className="text-[0.88rem] text-maroon">{state.error}</p>}
        {state.ok && <p role="status" className="text-[0.88rem] text-[#177a41] font-medium">{state.ok}</p>}
      </div>
    </form>
  );
}
