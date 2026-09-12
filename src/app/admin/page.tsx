import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db, hasDatabase } from "@/lib/db";

async function counts() {
  if (!hasDatabase) return null;
  try {
    const [photos, posts, drafts] = await Promise.all([
      db.galleryImage.count(),
      db.blogPost.count({ where: { published: true } }),
      db.blogPost.count({ where: { published: false } }),
    ]);
    return { photos, posts, drafts };
  } catch {
    return null;
  }
}

export default async function AdminHome() {
  const admin = await requireAdmin();
  const stats = await counts();

  const cards = [
    { href: "/admin/gallery", title: "Gallery", body: "Upload photos, write captions and set categories.", count: stats && `${stats.photos} photos` },
    { href: "/admin/blog", title: "Blog", body: "Write posts, add a cover image and publish.", count: stats && `${stats.posts} published · ${stats.drafts} drafts` },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Admin</p>
      <div className="divider" />
      <h1 className="text-3xl">Welcome back, {admin.name}</h1>

      {!stats && (
        <p className="mt-6 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable. Check <code>DATABASE_URL</code> — setup steps are in <code>README-ADMIN.md</code>.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-line bg-cream/40 p-6 lift transition-all focus-visible:outline-3 focus-visible:outline-gold"
          >
            <h2 className="text-xl">{c.title}</h2>
            <p className="mt-2 text-[0.92rem] text-ink-2">{c.body}</p>
            {c.count && <p className="mt-4 text-[0.82rem] font-medium text-gold">{c.count}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
