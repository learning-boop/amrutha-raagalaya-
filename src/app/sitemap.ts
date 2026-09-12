import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getPublishedPosts();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...nav.map((n) => ({ url: `${site.url}${n.href}`, lastModified: now, priority: 0.8 })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.publishedAt ?? now,
      priority: 0.6,
    })),
  ];
}
