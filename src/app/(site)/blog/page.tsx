import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import { getPublishedPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on Carnatic music, practice, raga and the life of the academy from Amrutha Raagalaya.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-22">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Notes from the academy"
            lead="Thoughts on practice, raga, festivals and the students who keep the tradition alive."
          />

          {posts.length === 0 ? (
            <p className="mt-10 text-center text-ink-2">New writing is on the way. Please check back soon.</p>
          ) : (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug} className="rounded-2xl border border-line bg-cream/40 overflow-hidden lift transition-all">
                  <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-3 focus-visible:outline-gold">
                    <Photo
                      src={post.coverUrl ?? undefined}
                      alt={post.title}
                      caption={post.title}
                      className="aspect-[16/10]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="p-5">
                      <p className="text-[0.78rem] tracking-[0.08em] uppercase text-gold font-semibold">
                        {formatDate(post.publishedAt)}
                      </p>
                      <h2 className="mt-2 text-xl">{post.title}</h2>
                      {post.excerpt && <p className="mt-2 text-[0.92rem] text-ink-2">{post.excerpt}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
