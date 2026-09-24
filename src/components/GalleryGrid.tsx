"use client";
import { useState } from "react";
import Photo from "./Photo";
import { galleryCategories, type GalleryCategory } from "@/lib/content";

export type GalleryGridItem = {
  id: string;
  category: GalleryCategory;
  /** Programme or occasion within the category, e.g. "ASR Studio". */
  album: string | null;
  caption: string;
  src?: string;
};

type Category = GalleryCategory | "all";

const chip = (selected: boolean) =>
  `min-h-11 px-4 rounded-full border text-[0.9rem] font-medium transition-colors focus-visible:outline-3 focus-visible:outline-gold ${
    selected ? "bg-maroon text-[#FFF8EC] border-maroon" : "border-line text-ink-2 hover:border-gold hover:text-maroon"
  }`;

export default function GalleryGrid({ items }: { items: GalleryGridItem[] }) {
  const [category, setCategory] = useState<Category>("all");
  const [album, setAlbum] = useState<string | null>(null);

  const inCategory = category === "all" ? items : items.filter((g) => g.category === category);

  // Programmes within the chosen category, newest first (items already arrive
  // newest first, so first appearance wins).
  const albums = [...new Set(inCategory.map((g) => g.album).filter((a): a is string => Boolean(a)))];

  const shown = album ? inCategory.filter((g) => g.album === album) : inCategory;

  function chooseCategory(next: Category) {
    setCategory(next);
    // A programme belongs to one category, so it cannot survive the switch.
    setAlbum(null);
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mt-8" role="tablist" aria-label="Gallery categories">
        {[{ key: "all" as const, label: "All" }, ...galleryCategories].map((c) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={category === c.key}
            onClick={() => chooseCategory(c.key)}
            className={chip(category === c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Second row: the programmes inside the chosen category. */}
      {albums.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3" role="tablist" aria-label="Programmes">
          <button type="button" role="tab" aria-selected={album === null} onClick={() => setAlbum(null)} className={chip(album === null)}>
            All {category === "all" ? "photos" : galleryCategories.find((c) => c.key === category)?.label.toLowerCase()}
          </button>
          {albums.map((name) => (
            <button key={name} type="button" role="tab" aria-selected={album === name} onClick={() => setAlbum(name)} className={chip(album === name)}>
              {name}
            </button>
          ))}
        </div>
      )}

      {album && (
        <p className="mt-6 text-center">
          <span className="font-serif text-2xl text-maroon">{album}</span>
          <span className="block text-[0.85rem] text-ink-2 mt-1">
            {shown.length} {shown.length === 1 ? "photo" : "photos"}
          </span>
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-3">
        {shown.map((g) => (
          <Photo
            key={g.id}
            src={g.src}
            alt={g.album ? `${g.caption} — ${g.album}` : g.caption}
            caption={g.caption}
            className="rounded-xl lift"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ))}
      </div>

      {shown.length === 0 && <p className="mt-10 text-center text-ink-2">No photos here yet.</p>}
    </div>
  );
}
