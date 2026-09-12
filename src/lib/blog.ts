import "server-only";
import { db, hasDatabase } from "./db";

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt: Date | null;
};

export async function getPublishedPosts(): Promise<PostSummary[]> {
  if (!hasDatabase) return [];
  try {
    return await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true, excerpt: true, coverUrl: true, publishedAt: true },
    });
  } catch (error) {
    console.error("Blog list query failed", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  if (!hasDatabase) return null;
  try {
    return await db.blogPost.findFirst({ where: { slug, published: true } });
  } catch (error) {
    console.error("Blog post query failed", error);
    return null;
  }
}

/** Turns a title into a URL-safe slug. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
