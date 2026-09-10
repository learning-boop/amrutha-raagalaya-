"use client";
import { useState } from "react";
import Photo from "./Photo";
import { gallery, galleryCategories, type GalleryCategory } from "@/lib/content";

export default function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const items = active === "all" ? gallery : gallery.filter((g) => g.category === active);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mt-8" role="tablist" aria-label="Gallery categories">
        {[{ key: "all" as const, label: "All" }, ...galleryCategories].map((c) => (
          <button key={c.key} type="button" role="tab" aria-selected={active === c.key} onClick={() => setActive(c.key)} className={`min-h-11 px-4 rounded-full border text-[0.9rem] font-medium transition-colors focus-visible:outline-3 focus-visible:outline-gold ${active === c.key ? "bg-maroon text-[#FFF8EC] border-maroon" : "border-line text-ink-2 hover:border-gold hover:text-maroon"}`}>{c.label}</button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-3">
        {items.map((g) => (<Photo key={g.caption} src={g.src} alt={g.caption} caption={g.caption} className="rounded-xl" sizes="(max-width: 768px) 50vw, 25vw" />))}
      </div>
    </div>
  );
}
