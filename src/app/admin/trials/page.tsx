import { connection } from "next/server";
import { requireAdmin } from "@/lib/dal";
import { db, hasDatabase } from "@/lib/db";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import {
  ACTIVE_STATUSES,
  confirmationMessage,
  declineMessage,
  formatIstDateTime,
  formatIstDay,
  formatIstTime,
  formatPhone,
  istDateKey,
  MODES,
  isMode,
  whatsAppTo,
} from "@/lib/trials";
import AddSlotsForm from "./AddSlotsForm";
import { confirmBooking, declineBooking, deleteSlot, updateMeetingLink } from "./actions";

const btn = "inline-flex items-center justify-center gap-1.5 min-h-10 px-4 rounded-lg text-[0.85rem] font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-gold";
const primaryBtn = `${btn} bg-maroon text-[#FFF8EC] hover:bg-maroon-2`;
const ghostBtn = `${btn} border border-line text-ink hover:border-gold hover:text-maroon`;
const waBtn = `${btn} bg-[#177a41] text-white hover:bg-[#12633a]`;

type Booking = {
  id: string;
  parentName: string;
  phone: string;
  childName: string;
  childAge: number;
  notes: string | null;
  status: string;
  createdAt: Date;
};
type Slot = {
  id: string;
  startsAt: Date;
  durationMinutes: number;
  mode: string;
  meetingLink: string | null;
  capacity: number;
  bookings: Booking[];
};

async function load() {
  // Every visit must show the latest requests.
  await connection();
  const now = Date.now();
  const slots = await db.trialSlot.findMany({
    where: { startsAt: { gte: new Date(now - 14 * 24 * 60 * 60 * 1000) } },
    orderBy: { startsAt: "asc" },
    include: { bookings: { orderBy: { createdAt: "asc" } } },
  });
  return { slots, now };
}

export default async function AdminTrialsPage() {
  await requireAdmin();

  let slots: Slot[] = [];
  let now = 0;
  let dbError = !hasDatabase;
  if (hasDatabase) {
    try {
      ({ slots, now } = await load());
    } catch (error) {
      console.error("Could not load trial slots", error);
      dbError = true;
    }
  }

  const upcoming = slots.filter((s) => s.startsAt.getTime() >= now);
  const past = slots.filter((s) => s.startsAt.getTime() < now).reverse();
  const pending = upcoming.flatMap((s) => s.bookings.filter((b) => b.status === "pending").map((b) => ({ booking: b, slot: s })));

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <p className="eyebrow">Trial classes</p>
      <div className="divider" />
      <h1 className="text-3xl">Trial class bookings</h1>
      <p className="mt-3 text-[0.92rem] text-ink-2 max-w-prose">
        The public Book a Trial Class page has been removed, so families can no longer pick these times on the website.
        Earlier bookings are still listed here to confirm or cancel.
      </p>

      {dbError ? (
        <p className="mt-8 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable. See <code>README-ADMIN.md</code>.
        </p>
      ) : (
        <>
          {/* ---------------- Needs a reply ---------------- */}
          <h2 className="mt-10 text-2xl">
            Needs your reply {pending.length > 0 && <span className="ml-2 align-middle text-[0.8rem] font-sans font-semibold bg-maroon text-[#FFF8EC] rounded-full px-2.5 py-1">{pending.length}</span>}
          </h2>
          {pending.length === 0 ? (
            <p className="mt-2 text-[0.92rem] text-ink-2">No new requests.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {pending.map(({ booking, slot }) => (
                <li key={booking.id} className="rounded-2xl border-[1.5px] border-gold-soft bg-cream/60 p-5">
                  <BookingDetails booking={booking} slot={slot} showSlot />
                  <div className="mt-4 flex flex-wrap gap-2">
                    <form action={confirmBooking}>
                      <input type="hidden" name="id" value={booking.id} />
                      <button type="submit" className={primaryBtn}>Confirm</button>
                    </form>
                    <form action={declineBooking}>
                      <input type="hidden" name="id" value={booking.id} />
                      <ConfirmSubmit message={`Decline ${booking.childName}'s request? The time becomes free again.`} className={ghostBtn}>
                        Decline
                      </ConfirmSubmit>
                    </form>
                    <a href={whatsAppTo(booking.phone, `Namaste ${booking.parentName}! 🙏 `)} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                      Message first
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* ---------------- Add slots ---------------- */}
          <div className="mt-12">
            <AddSlotsForm minDate={istDateKey(new Date(now))} />
          </div>

          {/* ---------------- Upcoming schedule ---------------- */}
          <h2 className="mt-12 text-2xl">Upcoming schedule</h2>
          {upcoming.length === 0 ? (
            <p className="mt-2 text-[0.92rem] text-ink-2">No upcoming times. Add some above so parents can book.</p>
          ) : (
            <Schedule slots={upcoming} />
          )}

          {past.length > 0 && (
            <details className="mt-12 group">
              <summary className="cursor-pointer text-[0.95rem] font-semibold text-ink-2 hover:text-maroon">
                Past two weeks ({past.length})
              </summary>
              <div className="mt-4 opacity-80">
                <Schedule slots={past} isPast />
              </div>
            </details>
          )}
        </>
      )}
    </section>
  );
}

function Schedule({ slots, isPast = false }: { slots: Slot[]; isPast?: boolean }) {
  const days = new Map<string, Slot[]>();
  for (const s of slots) {
    const key = istDateKey(s.startsAt);
    days.set(key, [...(days.get(key) ?? []), s]);
  }

  return (
    <div className="mt-4 space-y-8">
      {[...days.entries()].map(([key, daySlots]) => (
        <div key={key}>
          <h3 className="text-lg border-b border-line pb-2">{formatIstDay(daySlots[0].startsAt)}</h3>
          <ul className="mt-3 space-y-3">
            {daySlots.map((slot) => {
              const active = slot.bookings.filter((b) => ACTIVE_STATUSES.includes(b.status));
              const seatsLeft = slot.capacity - active.length;
              return (
                <li key={slot.id} className="rounded-xl border border-line bg-offwhite p-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-semibold text-ink">{formatIstTime(slot.startsAt)} IST</span>
                    <span className="text-[0.85rem] text-ink-2">{isMode(slot.mode) ? MODES[slot.mode] : slot.mode} · {slot.durationMinutes} min</span>
                    <span className={`text-[0.75rem] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${seatsLeft > 0 ? "border border-line text-ink-2" : "bg-maroon text-[#FFF8EC]"}`}>
                      {seatsLeft > 0 ? (slot.capacity > 1 ? `${seatsLeft} of ${slot.capacity} open` : "Open") : "Full"}
                    </span>
                    {!isPast && active.length === 0 && (
                      <form action={deleteSlot} className="ml-auto">
                        <input type="hidden" name="id" value={slot.id} />
                        <ConfirmSubmit message="Remove this time? Parents will no longer see it." className="text-[0.8rem] font-medium text-maroon/80 hover:text-maroon underline underline-offset-2">
                          Remove time
                        </ConfirmSubmit>
                      </form>
                    )}
                  </div>

                  {slot.mode === "online" && !isPast && (
                    <form action={updateMeetingLink} className="mt-3 flex flex-wrap gap-2">
                      <input type="hidden" name="id" value={slot.id} />
                      <label htmlFor={`link-${slot.id}`} className="sr-only">Zoom link</label>
                      <input
                        id={`link-${slot.id}`}
                        name="meetingLink"
                        type="url"
                        defaultValue={slot.meetingLink ?? ""}
                        placeholder="Paste Zoom link — included in the confirmation message"
                        className="flex-1 min-w-60 min-h-10 px-3 rounded-lg border border-line bg-offwhite text-[0.85rem] focus-visible:outline-3 focus-visible:outline-gold"
                      />
                      <button type="submit" className={ghostBtn}>{slot.meetingLink ? "Update link" : "Save link"}</button>
                    </form>
                  )}

                  {slot.bookings.filter((b) => b.status !== "pending").length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {slot.bookings.filter((b) => b.status !== "pending").map((b) => (
                        <li key={b.id} className={`rounded-lg p-3 ${b.status === "confirmed" ? "bg-cream" : "bg-cream/40 opacity-75"}`}>
                          <BookingDetails booking={b} slot={slot} />
                          {!isPast && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {b.status === "confirmed" ? (
                                <>
                                  <a href={whatsAppTo(b.phone, confirmationMessage(b, slot))} target="_blank" rel="noopener noreferrer" className={waBtn}>
                                    Send confirmation on WhatsApp
                                  </a>
                                  <form action={declineBooking}>
                                    <input type="hidden" name="id" value={b.id} />
                                    <ConfirmSubmit message={`Cancel ${b.childName}'s confirmed trial? The time becomes free again.`} className={ghostBtn}>
                                      Cancel booking
                                    </ConfirmSubmit>
                                  </form>
                                </>
                              ) : (
                                <a href={whatsAppTo(b.phone, declineMessage(b, slot))} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                                  Send &ldquo;choose another time&rdquo; on WhatsApp
                                </a>
                              )}
                            </div>
                          )}
                          {b.status === "confirmed" && slot.mode === "online" && !slot.meetingLink && !isPast && (
                            <p className="mt-2 text-[0.8rem] text-maroon">Add the Zoom link above first, so it is included in the message.</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function BookingDetails({ booking, slot, showSlot = false }: { booking: Booking; slot: Slot; showSlot?: boolean }) {
  const badge =
    booking.status === "confirmed" ? "bg-[#177a41] text-white" : booking.status === "declined" ? "border border-line text-ink-2" : "bg-gold-soft text-maroon";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-serif text-lg font-semibold text-maroon">{booking.childName}, {booking.childAge}</span>
        <span className={`text-[0.7rem] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${badge}`}>{booking.status}</span>
      </div>
      {showSlot && (
        <p className="mt-1 text-[0.92rem] font-medium text-ink">
          {formatIstDateTime(slot.startsAt)} · {isMode(slot.mode) ? MODES[slot.mode] : slot.mode}
        </p>
      )}
      <p className="mt-1 text-[0.88rem] text-ink-2">
        Parent: {booking.parentName} · <a href={`tel:+${booking.phone}`} className="hover:text-maroon">{formatPhone(booking.phone)}</a>
      </p>
      {booking.notes && <p className="mt-1 text-[0.85rem] text-ink-2 italic">&ldquo;{booking.notes}&rdquo;</p>}
      <p className="mt-1 text-[0.75rem] text-ink-2/80">Requested {formatIstDateTime(booking.createdAt)}</p>
    </div>
  );
}
