import "server-only";
import { db, hasDatabase } from "./db";
import { gallery as staticGallery, type GalleryCategory } from "./content";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  /** Programme or occasion within the category, e.g. "ASR Studio". */
  album: string | null;
  caption: string;
  src?: string;
};

/**
 * Photos for the public gallery. Falls back to the images checked into
 * `src/lib/content.ts` so the site still builds and renders before the
 * database is provisioned, or if it is briefly unreachable.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!hasDatabase) return fallback();
  try {
    const rows = await db.galleryImage.findMany({
      orderBy: [{ createdAt: "desc" }, { sortOrder: "desc" }],
    });
    if (rows.length === 0) return fallback();
    return rows.map((r) => ({
      id: r.id,
      category: r.category as GalleryCategory,
      album: r.album,
      caption: r.caption,
      src: r.url,
    }));
  } catch (error) {
    console.error("Gallery query failed, using bundled photos", error);
    return fallback();
  }
}

function fallback(): GalleryItem[] {
  return staticGallery.map((g, i) => ({ id: `static-${i}`, category: g.category, album: null, caption: g.caption, src: g.src }));
}
