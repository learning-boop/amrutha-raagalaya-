import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import { getPostBySlug, formatDate } from "@/lib/blog";
import { site } from "@/lib/site";

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.coverUrl ?? undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` } },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="pt-12 pb-16 lg:pt-16 lg:pb-22">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Link href="/blog" className="text-[0.85rem] text-ink-2 hover:text-maroon">← All posts</Link>
            <p className="eyebrow mt-6">{formatDate(post.publishedAt)}</p>
            <div className="divider" />
            <h1 className="text-4xl">{post.title}</h1>
            {post.excerpt && <p className="mt-4 text-lg text-ink-2">{post.excerpt}</p>}
          </div>

          {post.coverUrl && (
            <div className="mx-auto max-w-3xl mt-10">
              <Photo src={post.coverUrl} alt={post.title} className="aspect-[16/9] rounded-2xl" sizes="(max-width: 768px) 100vw, 768px" priority />
            </div>
          )}

          {/* Stored HTML is whitelisted server-side in src/lib/sanitize.ts before it is saved. */}
          <div
            className="post-body drop-cap-first mx-auto max-w-2xl mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </article>
      <CtaBand />
    </>
  );
}
