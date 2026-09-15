"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { destroyImage } from "@/lib/cloudinary";
import { isPlaceholderSlug, slugify } from "@/lib/blog";
import { sanitizePostHtml, excerptFromHtml } from "@/lib/sanitize";

export type PostState = { error?: string; ok?: string };

/** Creates an empty draft and opens it in the editor. */
export async function createDraft() {
  await requireAdmin();

  const base = slugify(`untitled-${new Date().toISOString().slice(0, 10)}`);
  const post = await db.blogPost.create({
    data: { title: "Untitled post", slug: await uniqueSlug(base), content: "" },
  });

  redirect(`/admin/blog/${post.id}`);
}

export async function savePost(_prev: PostState, formData: FormData): Promise<PostState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = sanitizePostHtml(String(formData.get("content") ?? ""));
  const excerptInput = String(formData.get("excerpt") ?? "").trim();
  const coverUrl = String(formData.get("coverUrl") ?? "") || null;
  const coverId = String(formData.get("coverId") ?? "") || null;
  const published = formData.get("published") === "on";

  if (!id) return { error: "Missing post id." };
  if (!title) return { error: "Give the post a title." };

  try {
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) return { error: "That post no longer exists." };

    // A draft's temporary "untitled-…" address is replaced by one built from
    // the title, unless the author typed their own. Once a real address
    // exists it stays put, so published links keep working.
    let slugInput = String(formData.get("slug") ?? "").trim();
    if (isPlaceholderSlug(slugInput)) slugInput = "";
    const desired = slugify(slugInput || title) || existing.slug;
    const slug = desired === existing.slug ? existing.slug : await uniqueSlug(desired, id);

    // Stamp the publish date the first time it goes live, and keep it after.
    const publishedAt = published ? (existing.publishedAt ?? new Date()) : existing.publishedAt;

    await db.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerptInput || excerptFromHtml(content),
        coverUrl,
        coverId,
        published,
        publishedAt,
      },
    });

    if (existing.coverId && existing.coverId !== coverId) await destroyImage(existing.coverId);

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    if (slug !== existing.slug) revalidatePath(`/blog/${existing.slug}`);
    revalidatePath("/admin/blog");

    return { ok: published ? "Saved and published." : "Draft saved." };
  } catch (error) {
    console.error("Could not save post", error);
    return { error: "Could not save the post. Please try again." };
  }
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    const post = await db.blogPost.delete({ where: { id } });
    await destroyImage(post.coverId);
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
  } catch (error) {
    console.error("Could not delete post", error);
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

/** Appends -2, -3 … until the slug is free. */
async function uniqueSlug(base: string, ignoreId?: string) {
  const root = base || "post";
  for (let n = 1; ; n++) {
    const candidate = n === 1 ? root : `${root}-${n}`;
    const clash = await db.blogPost.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!clash || clash.id === ignoreId) return candidate;
  }
}
