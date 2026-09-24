import Container from "./Container";
import Button from "./Button";
import { SocialIcon } from "./Icon";
import { averageRating, GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL, type Review } from "@/lib/reviews";

/** Seconds each review spends crossing the screen. */
const SECONDS_PER_REVIEW = 9;
/** Repeat short lists so the moving row never shows a gap on wide screens. */
const MIN_CARDS = 6;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-gold tracking-[0.15em] text-[0.95rem]" aria-label={`Rated ${rating} out of 5`}>
      <span aria-hidden="true">
        {"★".repeat(rating)}
        <span className="text-gold/25">{"★".repeat(5 - rating)}</span>
      </span>
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="w-[300px] sm:w-[360px] shrink-0 rounded-2xl border border-line bg-offwhite p-6 flex flex-col">
      <Stars rating={review.rating} />
      <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink-2 line-clamp-6">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 pt-4 border-t border-line flex items-center gap-2">
        <span className="grid place-items-center w-8 h-8 rounded-full bg-cream text-maroon shrink-0" aria-hidden="true">
          <SocialIcon name="google" className="w-4 h-4" />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-ink text-[0.9rem] truncate">{review.author}</span>
          {review.reviewedOn && <span className="block text-[0.78rem] text-ink-2">{review.reviewedOn}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export default function GoogleReviews({ reviews }: { reviews: Review[] }) {
  // Nothing to show until the first review is added in the admin.
  if (reviews.length === 0) return null;

  const average = averageRating(reviews);
  const copies = Math.max(1, Math.ceil(MIN_CARDS / reviews.length));
  const row = Array.from({ length: copies }, () => reviews).flat();
  const duration = row.length * SECONDS_PER_REVIEW;

  return (
    <section className="py-16 lg:py-20 bg-cream/50 border-y border-line overflow-hidden">
      <Container>
        <div className="text-center">
          <p className="eyebrow">Reviews</p>
          <div className="divider divider-center" />
          <h2 className="text-3xl sm:text-4xl">What families say on Google</h2>
          {average !== null && (
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-ink-2">
              <Stars rating={Math.round(average)} />
              <span className="font-semibold text-ink">{average.toFixed(1)}</span>
              <span className="text-[0.9rem]">
                from {reviews.length} {reviews.length === 1 ? "review" : "reviews"} shown here
              </span>
            </p>
          )}
        </div>
      </Container>

      {/* The row slides continuously and pauses when hovered or focused. The
          second copy is a seamless loop, hidden from screen readers. */}
      <div className="reviews-viewport mt-10" aria-label="Google reviews">
        <div className="reviews-track" style={{ animationDuration: `${duration}s` }}>
          {row.map((review, i) => (
            <ReviewCard key={`a-${review.id}-${i}`} review={review} />
          ))}
          <div className="reviews-track-copy" aria-hidden="true">
            {row.map((review, i) => (
              <ReviewCard key={`b-${review.id}-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={GOOGLE_REVIEWS_URL} external>Read all reviews on Google</Button>
          <Button href={GOOGLE_WRITE_REVIEW_URL} external variant="outline">Write a review</Button>
        </div>
      </Container>
    </section>
  );
}
