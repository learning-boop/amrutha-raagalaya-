import { connection } from "next/server";
import { requireAdmin } from "@/lib/dal";
import { hasDatabase } from "@/lib/db";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { listEnquiries, type AdminEnquiry } from "@/lib/enquiries";
import { formatIstDateTime, formatPhone, whatsAppTo } from "@/lib/trials";
import { site } from "@/lib/site";
import { deleteEnquiry, markHandled, reopenEnquiry } from "./actions";

const btn = "inline-flex items-center justify-center gap-1.5 min-h-10 px-4 rounded-lg text-[0.85rem] font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-gold";
const primaryBtn = `${btn} bg-maroon text-[#FFF8EC] hover:bg-maroon-2`;
const ghostBtn = `${btn} border border-line text-ink hover:border-gold hover:text-maroon`;
const waBtn = `${btn} bg-[#177a41] text-white hover:bg-[#12633a]`;

/** A first line the teacher can send straight back, without retyping context. */
function replyMessage(e: AdminEnquiry) {
  const opening = `Namaste ${e.name}, thank you for your enquiry to ${site.shortName}.`;
  return e.kind === "classes"
    ? `${opening} Here are our class timings and fees for a student aged ${e.age ?? "—"}:`
    : `${opening} About your ${String(e.occasion ?? "devotional program").toLowerCase()}${e.eventDate ? ` on ${e.eventDate}` : ""}:`;
}

export default async function AdminEnquiriesPage() {
  await requireAdmin();
  // Every visit must show the latest enquiries.
  await connection();
  const enquiries = hasDatabase ? await listEnquiries() : null;

  const waiting = enquiries?.filter((e) => e.status === "new") ?? [];
  const handled = enquiries?.filter((e) => e.status !== "new") ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="eyebrow">Admin</p>
      <div className="divider" />
      <h1 className="text-3xl">Enquiries</h1>
      <p className="mt-3 max-w-[70ch] text-[0.95rem] text-ink-2">
        Messages sent from the forms on the contact page. Reply on WhatsApp with one tap, then mark the
        enquiry handled so you know what is still outstanding.
      </p>

      {!enquiries && (
        <p className="mt-8 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable, so enquiries cannot be shown yet. See <code>README-ADMIN.md</code>.
        </p>
      )}

      {enquiries && (
        <>
          <Group title={`Waiting for a reply (${waiting.length})`} items={waiting} empty="Nothing waiting — every enquiry has been answered." />
          {handled.length > 0 && <Group title={`Handled (${handled.length})`} items={handled} empty="" />}
        </>
      )}
    </section>
  );
}

function Group({ title, items, empty }: { title: string; items: AdminEnquiry[]; empty: string }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl">{title}</h2>
      {items.length === 0 ? (
        empty && <p className="mt-3 text-[0.92rem] text-ink-2">{empty}</p>
      ) : (
        <ul className="mt-4 grid gap-4">
          {items.map((e) => (<li key={e.id}><Card enquiry={e} /></li>))}
        </ul>
      )}
    </div>
  );
}

function Card({ enquiry: e }: { enquiry: AdminEnquiry }) {
  const isNew = e.status === "new";
  return (
    <article className={`rounded-2xl border p-5 ${isNew ? "border-gold-soft bg-cream/40" : "border-line bg-offwhite"}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-lg font-semibold text-maroon">{e.name}</span>
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.75rem] text-ink-2">
          {e.kind === "classes" ? "Music classes" : "Devotional program"}
        </span>
        <span className="ml-auto text-[0.8rem] text-ink-2">{formatIstDateTime(e.createdAt)}</span>
      </div>

      <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-[0.9rem] sm:grid-cols-2">
        <Row label="Phone">
          <a href={`tel:+${e.phone}`} className="text-maroon hover:underline">{formatPhone(e.phone)}</a>
        </Row>
        {e.age !== null && <Row label={"Student’s age"}>{e.age}</Row>}
        {e.occasion && <Row label="Occasion">{e.occasion}</Row>}
        {e.eventDate && <Row label="Event date">{e.eventDate}</Row>}
        {e.location && <Row label="Venue / city">{e.location}</Row>}
      </dl>

      {e.message && <p className="mt-3 rounded-lg border border-line bg-offwhite px-3 py-2 text-[0.9rem] text-ink-2 whitespace-pre-line">{e.message}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={whatsAppTo(e.phone, replyMessage(e))} target="_blank" rel="noopener noreferrer" className={waBtn}>
          Reply on WhatsApp
        </a>
        {isNew ? (
          <form action={markHandled}>
            <input type="hidden" name="id" value={e.id} />
            <button type="submit" className={primaryBtn}>Mark handled</button>
          </form>
        ) : (
          <form action={reopenEnquiry}>
            <input type="hidden" name="id" value={e.id} />
            <button type="submit" className={ghostBtn}>Reopen</button>
          </form>
        )}
        <form action={deleteEnquiry}>
          <input type="hidden" name="id" value={e.id} />
          <ConfirmSubmit message={`Delete ${e.name}'s enquiry? This cannot be undone.`} className={ghostBtn}>
            Delete
          </ConfirmSubmit>
        </form>
      </div>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <dt className="text-ink-2">{label}:</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
