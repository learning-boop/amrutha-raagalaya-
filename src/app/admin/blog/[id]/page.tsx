import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db } from "@/lib/db";
import PostEditor from "./PostEditor";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { deletePost } from "../actions";

export default async function EditPostPage(props: PageProps<"/admin/blog/[id]">) {
  await requireAdmin();
  const { id } = await props.params;

  const post = await db.blogPost.findUnique({ where: { id } }).catch(() => null);
  if (!post) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/admin/blog" className="text-[0.85rem] text-ink-2 hover:text-maroon">← All posts</Link>

      <PostEditor
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverUrl: post.coverUrl,
          coverId: post.coverId,
          published: post.published,
        }}
      />

      <form action={deletePost} className="mt-10 pt-6 border-t border-line">
        <input type="hidden" name="id" value={post.id} />
        <ConfirmSubmit
          message={`Delete “${post.title}”? This cannot be undone.`}
          className="text-[0.85rem] font-medium text-maroon/80 hover:text-maroon underline underline-offset-2 focus-visible:outline-3 focus-visible:outline-gold"
        >
          Delete this post
        </ConfirmSubmit>
      </form>
    </section>
  );
}
