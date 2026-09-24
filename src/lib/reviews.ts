import "server-only";
import { db, hasDatabase } from "./db";

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  reviewedOn: string | null;
};

/** Where visitors read the full, live list on Google. */
export const GOOGLE_PLACE_ID = "ChIJXb7TAWJ1SjoR3W0Qjvx2aRs";
export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

export const clampRating = (value: number) => Math.min(5, Math.max(1, Math.round(value)));

/** Reviews for the public carousel, in the order the admin arranged them. */
export async function getPublishedReviews(): Promise<Review[]> {
  if (!hasDatabase) return [];
  try {
    const rows = await db.review.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 30,
      select: { id: true, author: true, rating: true, text: true, reviewedOn: true },
    });
    return rows;
  } catch (error) {
    console.error("Review query failed", error);
    return [];
  }
}

/** Average of the shown reviews, to one decimal place. */
export function averageRating(reviews: Review[]) {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}
