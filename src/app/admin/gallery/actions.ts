"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { destroyImage } from "@/lib/cloudinary";
import { galleryCategories } from "@/lib/content";

const validCategory = (value: string) => galleryCategories.some((c) => c.key === value);

export type GalleryState = { error?: string; ok?: string };

const MAX_ALBUM = 80;

/**
 * Programme names are typed by hand, so "ASR studio" and "ASR Studio" would
 * otherwise become two separate groups. An existing name that matches apart
 * from case or spacing wins, keeping photos of one programme together.
 */
async function canonicalAlbum(raw: string): Promise<string | null> {
  const name = raw.trim().replace(/\s+/g, " ");
  if (!name) return null;
  const trimmed = name.slice(0, MAX_ALBUM);
  const existing = await db.galleryImage.findFirst({
    where: { album: { equals: trimmed, mode: "insensitive" } },
    select: { album: true },
  });
  return existing?.album ?? trimmed;
}

/** Saves a photo the browser has already uploaded to Cloudinary. */
export async function addGalleryImage(_prev: GalleryState, formData: FormData): Promise<GalleryState> {
  await requireAdmin();

  const url = String(formData.get("url") ?? "");
  const caption = String(formData.get("caption") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const publicId = String(formData.get("publicId") ?? "") || null;
  const width = Number(formData.get("width")) || null;
  const height = Number(formData.get("height")) || null;
  const album = await canonicalAlbum(String(formData.get("album") ?? ""));

  if (!url) return { error: "Choose a photo to upload first." };
  if (!caption) return { error: "Add a short caption — it is used as the image's alt text." };
  if (!validCategory(category)) return { error: "Choose a category." };

  try {
    const last = await db.galleryImage.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    await db.galleryImage.create({
      data: { url, caption, category, album, publicId, width, height, sortOrder: (last?.sortOrder ?? 0) + 1 },
    });
  } catch (error) {
    console.error("Could not save gallery image", error);
    return { error: "Could not save the photo. Please try again." };
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  return { ok: album ? `Added “${caption}” to ${album}.` : `Added “${caption}”.` };
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    const row = await db.galleryImage.delete({ where: { id } });
    await destroyImage(row.publicId);
  } catch (error) {
    console.error("Could not delete gallery image", error);
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function updateGalleryImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const caption = String(formData.get("caption") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  if (!id || !caption || !validCategory(category)) return;
  const album = await canonicalAlbum(String(formData.get("album") ?? ""));

  try {
    await db.galleryImage.update({ where: { id }, data: { caption, category, album } });
  } catch (error) {
    console.error("Could not update gallery image", error);
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

/** Renames a programme across every photo in it — for fixing a typo. */
export async function renameAlbum(formData: FormData) {
  await requireAdmin();
  const from = String(formData.get("from") ?? "").trim();
  const to = String(formData.get("to") ?? "").trim().replace(/\s+/g, " ").slice(0, MAX_ALBUM);
  if (!from || !to || from === to) return;

  try {
    await db.galleryImage.updateMany({ where: { album: from }, data: { album: to } });
  } catch (error) {
    console.error("Could not rename the programme", error);
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
