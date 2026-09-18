import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db, hasDatabase } from "@/lib/db";
import { formatDate } from "@/lib/blog";
import { createDraft } from "./actions";

export default async function AdminBlogPage() {
  await requireAdmin();

  let posts: { id: string; title: string; slug: string; published: boolean; publishedAt: Date | null; updatedAt: Date }[] = [];
  let dbError = !hasDatabase;
  if (hasDatabase) {
    try {
      posts = await db.blogPost.findMany({
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, slug: true, published: true, publishedAt: true, updatedAt: true },
      });
    } catch {
      dbError = true;
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <p className="eyebrow">Blog</p>
      <div className="divider" />
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl">Posts</h1>
        {!dbError && (
          <form action={createDraft} className="ml-auto">
            <button
              type="submit"
              className="inline-flex items-center min-h-11 px-5 rounded-xl font-semibold text-[0.9rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
            >
              New post
            </button>
          </form>
        )}
      </div>

      {dbError ? (
        <p className="mt-8 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable. See <code>README-ADMIN.md</code>.
        </p>
      ) : posts.length === 0 ? (
        <p className="mt-8 text-[0.92rem] text-ink-2">No posts yet. Start with “New post”.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li key={post.id} className="py-4 flex flex-wrap items-center gap-3">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="font-serif text-lg text-maroon font-semibold hover:underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-gold"
                >
                  {post.title}
                </Link>
                <p className="text-[0.82rem] text-ink-2 mt-0.5">
                  /blog/{post.slug} · {post.published ? `published ${formatDate(post.publishedAt)}` : "draft"}
                </p>
              </div>
              {/* Fixed columns: every badge and link sits on the same vertical
                  line, whether or not a post is published. */}
              <span
                className={`shrink-0 w-[72px] text-center text-[0.75rem] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                  post.published ? "bg-maroon text-[#FFF8EC]" : "border border-line text-ink-2"
                }`}
              >
                {post.published ? "Live" : "Draft"}
              </span>
              <span className="shrink-0 w-14 text-right text-[0.82rem]">
                {post.published && (
                  <Link href={`/blog/${post.slug}`} className="text-ink-2 hover:text-maroon">
                    View →
                  </Link>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
