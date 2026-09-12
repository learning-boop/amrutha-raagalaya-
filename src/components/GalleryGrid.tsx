"use client";
import { useState } from "react";
import Photo from "./Photo";
import { galleryCategories, type GalleryCategory } from "@/lib/content";

export type GalleryGridItem = { id: string; category: GalleryCategory; caption: string; src?: string };

export default function GalleryGrid({ items }: { items: GalleryGridItem[] }) {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const shown = active === "all" ? items : items.filter((g) => g.category === active);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mt-8" role="tablist" aria-label="Gallery categories">
        {[{ key: "all" as const, label: "All" }, ...galleryCategories].map((c) => (
          <button key={c.key} type="button" role="tab" aria-selected={active === c.key} onClick={() => setActive(c.key)} className={`min-h-11 px-4 rounded-full border text-[0.9rem] font-medium transition-colors focus-visible:outline-3 focus-visible:outline-gold ${active === c.key ? "bg-maroon text-[#FFF8EC] border-maroon" : "border-line text-ink-2 hover:border-gold hover:text-maroon"}`}>{c.label}</button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-3">
        {shown.map((g) => (<Photo key={g.id} src={g.src} alt={g.caption} caption={g.caption} className="rounded-xl lift" sizes="(max-width: 768px) 50vw, 25vw" />))}
      </div>
    </div>
  );
}
