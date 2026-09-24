import { connection } from "next/server";
import { requireAdmin } from "@/lib/dal";
import { db, hasDatabase } from "@/lib/db";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { GOOGLE_REVIEWS_URL } from "@/lib/reviews";
import AddReviewForm from "./AddReviewForm";
import { deleteReview, moveReview, toggleReview, updateReview } from "./actions";

const smallBtn =
  "inline-flex items-center justify-center min-h-9 px-3 rounded-lg border border-line text-[0.82rem] font-medium text-ink hover:border-gold hover:text-maroon transition-colors focus-visible:outline-3 focus-visible:outline-gold disabled:opacity-40";

type Row = {
  id: string;
  author: string;
  rating: number;
  text: string;
  reviewedOn: string | null;
  published: boolean;
};

async function load() {
  await connection();
  return db.review.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: { id: true, author: true, rating: true, text: true, reviewedOn: true, published: true },
  });
}

export default async function AdminReviewsPage() {
  await requireAdmin();

  let reviews: Row[] = [];
  let dbError = !hasDatabase;
  if (hasDatabase) {
    try {
      reviews = await load();
    } catch (error) {
      console.error("Could not load reviews", error);
      dbError = true;
    }
  }

  const shown = reviews.filter((r) => r.published).length;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <p className="eyebrow">Reviews</p>
      <div className="divider" />
      <h1 className="text-3xl">Google reviews</h1>
      <p className="mt-3 text-[0.92rem] text-ink-2 max-w-prose">
        Reviews you add here scroll across the home page, with a button to your{" "}
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-maroon underline underline-offset-2">
          Google listing
        </a>{" "}
        for the full list. Google does not allow reviews to be copied automatically, so paste the ones you want to feature.
      </p>

      {dbError ? (
        <p className="mt-8 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable. See <code>README-ADMIN.md</code>.
        </p>
      ) : (
        <>
          <div className="mt-8">
            <AddReviewForm />
          </div>

          <h2 className="mt-12 text-2xl">
            On the website{" "}
            <span className="ml-1 align-middle text-[0.8rem] font-sans font-semibold border border-line rounded-full px-2.5 py-1 text-ink-2">
              {shown} of {reviews.length} shown
            </span>
          </h2>

          {reviews.length === 0 ? (
            <p className="mt-3 text-[0.92rem] text-ink-2">
              No reviews yet. Add your first one above — until then the reviews section stays hidden on the website.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {reviews.map((review, index) => (
                <li
                  key={review.id}
                  className={`rounded-2xl border p-5 ${review.published ? "border-line bg-offwhite" : "border-line bg-cream/40 opacity-70"}`}
                >
                  <form action={updateReview} className="space-y-3">
                    <input type="hidden" name="id" value={review.id} />

                    <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto]">
                      <div>
                        <label htmlFor={`author-${review.id}`} className="block text-[0.78rem] font-medium mb-1">Name</label>
                        <input
                          id={`author-${review.id}`}
                          name="author"
                          defaultValue={review.author}
                          required
                          className="w-full min-h-10 px-3 rounded-lg border border-line bg-offwhite text-[0.9rem] focus-visible:outline-3 focus-visible:outline-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor={`rating-${review.id}`} className="block text-[0.78rem] font-medium mb-1">Stars</label>
                        <select
                          id={`rating-${review.id}`}
                          name="rating"
                          defaultValue={String(review.rating)}
                          className="min-h-10 px-3 rounded-lg border border-line bg-offwhite text-[0.9rem] focus-visible:outline-3 focus-visible:outline-gold"
                        >
                          {[5, 4, 3, 2, 1].map((n) => (
                            <option key={n} value={n}>{"★".repeat(n)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`when-${review.id}`} className="block text-[0.78rem] font-medium mb-1">When</label>
                        <input
                          id={`when-${review.id}`}
                          name="reviewedOn"
                          defaultValue={review.reviewedOn ?? ""}
                          placeholder="2 months ago"
                          className="w-full min-h-10 px-3 rounded-lg border border-line bg-offwhite text-[0.9rem] focus-visible:outline-3 focus-visible:outline-gold"
                        />
                      </div>
                      <div className="flex items-end">
                        <span className="text-[0.75rem] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border border-line text-ink-2">
                          {review.published ? "Shown" : "Hidden"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`text-${review.id}`} className="block text-[0.78rem] font-medium mb-1">Review</label>
                      <textarea
                        id={`text-${review.id}`}
                        name="text"
                        defaultValue={review.text}
                        rows={3}
                        maxLength={1500}
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-line bg-offwhite text-[0.9rem] focus-visible:outline-3 focus-visible:outline-gold"
                      />
                    </div>

                    <button type="submit" className={smallBtn}>Save changes</button>
                  </form>

                  <div className="mt-3 pt-3 border-t border-line flex flex-wrap items-center gap-2">
                    <form action={moveReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button type="submit" className={smallBtn} disabled={index === 0} aria-label={`Move ${review.author} earlier`}>
                        ↑ Earlier
                      </button>
                    </form>
                    <form action={moveReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button type="submit" className={smallBtn} disabled={index === reviews.length - 1} aria-label={`Move ${review.author} later`}>
                        ↓ Later
                      </button>
                    </form>
                    <form action={toggleReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <button type="submit" className={smallBtn}>{review.published ? "Hide from website" : "Show on website"}</button>
                    </form>
                    <form action={deleteReview} className="ml-auto">
                      <input type="hidden" name="id" value={review.id} />
                      <ConfirmSubmit
                        message={`Delete the review from ${review.author}? This cannot be undone.`}
                        className="text-[0.82rem] font-medium text-maroon/80 hover:text-maroon underline underline-offset-2 focus-visible:outline-3 focus-visible:outline-gold"
                      >
                        Delete
                      </ConfirmSubmit>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
