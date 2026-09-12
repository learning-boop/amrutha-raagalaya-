"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import ImageUploader, { type UploadedImage } from "@/components/admin/ImageUploader";
import { galleryCategories } from "@/lib/content";
import { addGalleryImage, type GalleryState } from "./actions";

export default function AddPhotoForm() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [caption, setCaption] = useState("");
  const [state, formAction, pending] = useActionState<GalleryState, FormData>(addGalleryImage, {});

  // Empty the form once a photo is safely saved. Done during render rather than
  // in an effect; on failure the upload is kept so it need not be redone.
  const [handled, setHandled] = useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state.ok) {
      setImage(null);
      setCaption("");
    }
  }

  return (
    <form action={formAction} className="mt-8 rounded-2xl border border-line bg-cream/50 p-6">
      <h2 className="text-xl">Add a photo</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-[200px_1fr] items-start">
        <div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-line bg-cream-2 grid place-items-center">
            {image ? (
              <Image src={image.url} alt="" fill sizes="200px" className="object-cover" />
            ) : (
              <span className="text-[0.8rem] text-ink-2">No photo chosen</span>
            )}
          </div>
          <div className="mt-3">
            <ImageUploader onUploaded={setImage} folder="gallery" label={image ? "Replace photo" : "Choose a photo"} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="caption" className="block text-[0.85rem] font-medium mb-1.5">Caption (used as alt text)</label>
            <input
              id="caption"
              name="caption"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Students performing at the temple utsavam"
              className="w-full min-h-12 px-4 rounded-xl border border-line bg-offwhite focus-visible:outline-3 focus-visible:outline-gold"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-[0.85rem] font-medium mb-1.5">Category</label>
            <select
              id="category"
              name="category"
              defaultValue="classes"
              className="w-full min-h-12 px-4 rounded-xl border border-line bg-offwhite focus-visible:outline-3 focus-visible:outline-gold"
            >
              {galleryCategories.map((c) => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>

          <input type="hidden" name="url" value={image?.url ?? ""} />
          <input type="hidden" name="publicId" value={image?.publicId ?? ""} />
          <input type="hidden" name="width" value={image?.width ?? ""} />
          <input type="hidden" name="height" value={image?.height ?? ""} />

          {state.error && <p role="alert" className="text-[0.85rem] text-maroon">{state.error}</p>}
          {state.ok && <p role="status" className="text-[0.85rem] text-gold">{state.ok}</p>}

          <button
            type="submit"
            disabled={pending || !image}
            className="inline-flex items-center justify-center min-h-12 px-6 rounded-xl font-semibold text-[0.95rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 disabled:opacity-50 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
          >
            {pending ? "Adding…" : "Add to gallery"}
          </button>
        </div>
      </div>
    </form>
  );
}
