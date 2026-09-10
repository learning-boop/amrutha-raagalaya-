import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [{ url: site.url, lastModified: now, priority: 1 }, ...nav.map((n) => ({ url: `${site.url}${n.href}`, lastModified: now, priority: 0.8 }))];
}
