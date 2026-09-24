"use server";

import { revalidatePath } from "next/cache";
import { db, hasDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { clampRating } from "@/lib/reviews";

export type ReviewState = { error?: string; ok?: string };

const MAX_TEXT = 1500;

/** The reviews appear on pages that are pre-built, so refresh them after a change. */
function refresh() {
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
}

function read(formData: FormData) {
  const author = String(formData.get("author") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const reviewedOn = String(formData.get("reviewedOn") ?? "").trim() || null;
  const rating = clampRating(Number(formData.get("rating")));
  return { author, text, reviewedOn, rating };
}

export async function addReview(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  await requireAdmin();
  if (!hasDatabase) return { error: "The database is not configured yet." };

  const { author, text, reviewedOn, rating } = read(formData);
  if (author.length < 2 || author.length > 80) return { error: "Enter the reviewer's name as it appears on Google." };
  if (text.length < 10) return { error: "Paste the review text." };
  if (text.length > MAX_TEXT) return { error: `That review is longer than ${MAX_TEXT} characters. Trim it a little.` };

  try {
    // New reviews go to the front of the carousel.
    const first = await db.review.findFirst({ orderBy: { sortOrder: "asc" }, select: { sortOrder: true } });
    await db.review.create({
      data: { author, text, reviewedOn, rating, sortOrder: (first?.sortOrder ?? 0) - 1 },
    });
  } catch (error) {
    console.error("Could not add review", error);
    return { error: "Could not save the review. Please try again." };
  }

  refresh();
  return { ok: `Added the review from ${author}.` };
}

export async function updateReview(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const { author, text, reviewedOn, rating } = read(formData);
  if (!id || author.length < 2 || text.length < 10 || text.length > MAX_TEXT) return;

  try {
    await db.review.update({ where: { id }, data: { author, text, reviewedOn, rating } });
  } catch (error) {
    console.error("Could not update review", error);
  }
  refresh();
}

/** Hide a review from the website without deleting it. */
export async function toggleReview(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    const review = await db.review.findUnique({ where: { id }, select: { published: true } });
    if (review) await db.review.update({ where: { id }, data: { published: !review.published } });
  } catch (error) {
    console.error("Could not change review visibility", error);
  }
  refresh();
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await db.review.delete({ where: { id } });
  } catch (error) {
    console.error("Could not delete review", error);
  }
  refresh();
}

/** Moves a review one place earlier or later in the carousel. */
export async function moveReview(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || (direction !== "up" && direction !== "down")) return;

  try {
    const all = await db.review.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: { id: true, sortOrder: true },
    });
    const index = all.findIndex((r) => r.id === id);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (index === -1 || swapWith < 0 || swapWith >= all.length) return;

    // Rewrite the whole order so rows created with equal sortOrder settle too.
    const reordered = [...all];
    [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];
    await db.$transaction(
      reordered.map((row, position) => db.review.update({ where: { id: row.id }, data: { sortOrder: position } })),
    );
  } catch (error) {
    console.error("Could not reorder reviews", error);
  }
  refresh();
}
