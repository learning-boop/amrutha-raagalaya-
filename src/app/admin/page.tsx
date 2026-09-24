import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { db, hasDatabase } from "@/lib/db";
import { countNewEnquiries } from "@/lib/enquiries";
import { Icon, type IconName } from "@/components/Icon";

async function counts() {
  if (!hasDatabase) return null;
  try {
    const [photos, posts, drafts, trialRequests, newEnquiries, reviews] = await Promise.all([
      db.galleryImage.count(),
      db.blogPost.count({ where: { published: true } }),
      db.blogPost.count({ where: { published: false } }),
      db.trialBooking.count({ where: { status: "pending", slot: { startsAt: { gt: new Date() } } } }),
      countNewEnquiries(),
      db.review.count({ where: { published: true } }),
    ]);
    return { photos, posts, drafts, trialRequests, newEnquiries, reviews };
  } catch {
    return null;
  }
}

type Card = {
  href: string;
  title: string;
  icon: IconName;
  body: string;
  /** The headline figure, shown large at the foot of every card. */
  value: number | null;
  unit: string;
  /** Second line under the figure, e.g. "2 drafts". */
  note?: string;
  /** True when this figure is something waiting on the admin. */
  needsAttention?: boolean;
};

export default async function AdminHome() {
  const admin = await requireAdmin();
  const stats = await counts();

  const cards: Card[] = [
    {
      href: "/admin/gallery",
      title: "Gallery",
      icon: "lotus",
      body: "Upload photos, write captions and set categories.",
      value: stats?.photos ?? null,
      unit: stats?.photos === 1 ? "photo" : "photos",
    },
    {
      href: "/admin/blog",
      title: "Blog",
      icon: "note",
      body: "Write posts, add a cover image and publish.",
      value: stats?.posts ?? null,
      unit: stats?.posts === 1 ? "published post" : "published posts",
      note: stats ? `${stats.drafts} ${stats.drafts === 1 ? "draft" : "drafts"}` : undefined,
    },
    {
      href: "/admin/trials",
      title: "Trial classes",
      icon: "clock",
      body: "Confirm bookings and send WhatsApp confirmations.",
      value: stats?.trialRequests ?? null,
      unit: stats?.trialRequests === 1 ? "booking to reply to" : "bookings to reply to",
      needsAttention: (stats?.trialRequests ?? 0) > 0,
    },
    {
      href: "/admin/enquiries",
      title: "Enquiries",
      icon: "mail",
      body: "Messages sent from the contact page forms.",
      value: stats?.newEnquiries ?? null,
      unit: stats?.newEnquiries === 1 ? "new message" : "new messages",
      needsAttention: (stats?.newEnquiries ?? 0) > 0,
    },
    {
      href: "/admin/reviews",
      title: "Reviews",
      icon: "garland",
      body: "Google reviews that scroll across the home page.",
      value: stats?.reviews ?? null,
      unit: stats?.reviews === 1 ? "review shown" : "reviews shown",
    },
    {
      href: "/admin/account",
      title: "Your login",
      icon: "shield",
      body: "Change the email address and password you sign in with.",
      value: null,
      unit: "",
    },
  ];

  const waiting = (stats?.trialRequests ?? 0) + (stats?.newEnquiries ?? 0);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="eyebrow">Admin</p>
          <div className="divider" />
          <h1 className="text-3xl sm:text-[2.1rem]">Welcome back, {admin.name}</h1>
          <p className="mt-2 text-[0.95rem] text-ink-2">Photos, posts, trial classes and enquiries — all in one place.</p>
        </div>

        {stats && (
          <p
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.85rem] font-semibold ${
              waiting > 0 ? "bg-maroon text-[#FFF8EC]" : "border border-line bg-cream/60 text-ink-2"
            }`}
          >
            <span aria-hidden="true" className={`w-2 h-2 rounded-full ${waiting > 0 ? "bg-gold-soft" : "bg-gold/50"}`} />
            {waiting > 0 ? `${waiting} ${waiting === 1 ? "item needs" : "items need"} your reply` : "Nothing waiting for a reply"}
          </p>
        )}
      </header>

      {!stats && (
        <p className="mt-8 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable. Check <code>DATABASE_URL</code> — setup steps are in <code>README-ADMIN.md</code>.
        </p>
      )}

      {/* Six cards divide evenly into two or three columns, so no card is ever
          left alone on the last row. */}
      <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group flex flex-col rounded-2xl border p-6 lift transition-all focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2 ${
              card.needsAttention ? "border-gold-soft bg-cream" : "border-line bg-cream/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid place-items-center w-10 h-10 shrink-0 rounded-xl border border-line bg-offwhite text-gold"
              >
                <Icon name={card.icon} className="w-5 h-5" />
              </span>
              <h2 className="text-xl">{card.title}</h2>
              <span
                aria-hidden="true"
                className="ml-auto text-ink-2/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-maroon"
              >
                →
              </span>
            </div>

            <p className="mt-3 text-[0.92rem] text-ink-2">{card.body}</p>

            {/* mt-auto pins this block to the bottom, so the figures line up
                across cards however long the description above runs. */}
            <div className="mt-auto pt-5">
              {card.value === null ? (
                <span className="text-[0.85rem] text-ink-2/70">{stats ? "Open to manage" : "—"}</span>
              ) : (
                <p className="flex items-baseline gap-2">
                  <span className={`font-serif text-3xl leading-none font-semibold ${card.needsAttention ? "text-gold" : "text-maroon"}`}>
                    {card.value}
                  </span>
                  <span className="text-[0.85rem] text-ink-2">{card.unit}</span>
                  {card.note && <span className="text-[0.85rem] text-ink-2/70">· {card.note}</span>}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
