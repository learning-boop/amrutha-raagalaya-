import Image from "next/image";
import { requireAdmin } from "@/lib/dal";
import { db, hasDatabase } from "@/lib/db";
import { galleryCategories } from "@/lib/content";
import AddPhotoForm from "./AddPhotoForm";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { deleteGalleryImage, updateGalleryImage } from "./actions";

export default async function AdminGalleryPage() {
  await requireAdmin();

  let photos: Awaited<ReturnType<typeof db.galleryImage.findMany>> = [];
  let dbError = !hasDatabase;
  if (hasDatabase) {
    try {
      photos = await db.galleryImage.findMany({ orderBy: [{ createdAt: "desc" }, { sortOrder: "desc" }] });
    } catch {
      dbError = true;
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <p className="eyebrow">Gallery</p>
      <div className="divider" />
      <h1 className="text-3xl">Photos</h1>
      <p className="mt-3 text-[0.92rem] text-ink-2 max-w-prose">
        Uploaded photos replace the bundled sample images on the public gallery page. Captions double as alt text, so
        describe what is happening in the picture.
      </p>

      {dbError ? (
        <p className="mt-8 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable, so photos cannot be managed yet. See <code>README-ADMIN.md</code>.
        </p>
      ) : (
        <>
          <AddPhotoForm />

          <h2 className="mt-14 text-xl">In the gallery ({photos.length})</h2>
          {photos.length === 0 ? (
            <p className="mt-3 text-[0.92rem] text-ink-2">
              No photos uploaded yet — the public gallery is showing the bundled sample images.
            </p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <li key={photo.id} className="rounded-2xl border border-line bg-cream/40 overflow-hidden">
                  <div className="relative aspect-[4/3] bg-cream-2">
                    <Image src={photo.url} alt={photo.caption} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <form action={updateGalleryImage} className="p-4 space-y-3">
                    <input type="hidden" name="id" value={photo.id} />
                    <div>
                      <label htmlFor={`caption-${photo.id}`} className="block text-[0.8rem] font-medium mb-1">Caption</label>
                      <input
                        id={`caption-${photo.id}`}
                        name="caption"
                        defaultValue={photo.caption}
                        required
                        className="w-full min-h-10 px-3 rounded-lg border border-line bg-offwhite text-[0.9rem] focus-visible:outline-3 focus-visible:outline-gold"
                      />
                    </div>
                    <div>
                      <label htmlFor={`category-${photo.id}`} className="block text-[0.8rem] font-medium mb-1">Category</label>
                      <select
                        id={`category-${photo.id}`}
                        name="category"
                        defaultValue={photo.category}
                        className="w-full min-h-10 px-3 rounded-lg border border-line bg-offwhite text-[0.9rem] focus-visible:outline-3 focus-visible:outline-gold"
                      >
                        {galleryCategories.map((c) => (
                          <option key={c.key} value={c.key}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="min-h-10 px-4 rounded-lg border border-line text-[0.85rem] font-medium hover:border-gold hover:text-maroon transition-colors focus-visible:outline-3 focus-visible:outline-gold"
                    >
                      Save changes
                    </button>
                  </form>
                  <form action={deleteGalleryImage} className="px-4 pb-4">
                    <input type="hidden" name="id" value={photo.id} />
                    <ConfirmSubmit
                      message={`Delete “${photo.caption}”? This also removes it from image storage.`}
                      className="text-[0.82rem] font-medium text-maroon/80 hover:text-maroon underline underline-offset-2 focus-visible:outline-3 focus-visible:outline-gold"
                    >
                      Delete photo
                    </ConfirmSubmit>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
