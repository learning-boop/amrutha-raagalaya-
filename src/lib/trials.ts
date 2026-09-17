import "server-only";
import { connection } from "next/server";
import { db, hasDatabase } from "./db";
import { site } from "./site";

// ---------------------------------------------------------------------------
// Time: the academy works in India time, but the server runs in UTC and some
// online families live abroad. Slots are stored as exact instants and always
// entered and shown as IST. India has no daylight saving, so the offset is fixed.
// ---------------------------------------------------------------------------

export const TIME_ZONE = "Asia/Kolkata";
const IST_OFFSET = "+05:30";

/** Bookings close this long before a slot starts, so there is time to confirm. */
export const BOOKING_LEAD_MINUTES = 60;
/** One family cannot hold more than this many unconfirmed requests at once. */
const MAX_PENDING_PER_PHONE = 2;

export const MODES = {
  online: "Online (Zoom)",
  "in-person": "In person at the academy",
} as const;
export type Mode = keyof typeof MODES;
export const isMode = (value: string): value is Mode => value in MODES;

export const ACTIVE_STATUSES = ["pending", "confirmed"];

/** Reads an IST wall-clock date ("2026-09-20") and time ("17:30") as an exact instant. */
export function parseIst(date: string, time: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return null;
  const parsed = new Date(`${date}T${time}:00${IST_OFFSET}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// Punctuation from Intl varies between runtimes ("20 Sept 2026" vs "20 Sept,
// 2026"), and this text goes into WhatsApp messages, so strings are assembled
// from parts to read the same everywhere.
const istParts = new Intl.DateTimeFormat("en-IN", {
  timeZone: TIME_ZONE, weekday: "long", day: "numeric", month: "long", year: "numeric",
  hour: "numeric", minute: "2-digit", hour12: true,
});

function parts(d: Date) {
  const p = Object.fromEntries(istParts.formatToParts(d).map((x) => [x.type, x.value]));
  const dayPeriod = String(p.dayPeriod ?? "").toLowerCase();
  const month = String(p.month);
  return {
    weekday: String(p.weekday),
    weekdayShort: String(p.weekday).slice(0, 3),
    day: String(p.day),
    month,
    monthShort: month.slice(0, 3),
    year: String(p.year),
    time: `${p.hour}:${p.minute} ${dayPeriod}`,
  };
}

/** "Sun, 20 Sep 2026, 5:30 pm IST" */
export function formatIstDateTime(d: Date) {
  const p = parts(d);
  return `${p.weekdayShort}, ${p.day} ${p.monthShort} ${p.year}, ${p.time} IST`;
}
/** "Sunday, 20 September" */
export function formatIstDay(d: Date) {
  const p = parts(d);
  return `${p.weekday}, ${p.day} ${p.month}`;
}
/** "5:30 pm" */
export const formatIstTime = (d: Date) => parts(d).time;

const istKey = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
/** "2026-09-20" in IST — for grouping slots by day. */
export const istDateKey = (d: Date) => istKey.format(d);

// ---------------------------------------------------------------------------
// Phone numbers
// ---------------------------------------------------------------------------

/**
 * Normalises what a parent types into WhatsApp's format: digits with country
 * code, no plus sign. A bare 10-digit Indian mobile gets the 91 prefix.
 * Returns null when it cannot be a valid number.
 */
export function normalizePhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10 && /^[6-9]/.test(digits)) digits = `91${digits}`;
  return digits.length >= 11 && digits.length <= 15 ? digits : null;
}

/** "+91 98765 43210" for Indian numbers, "+<digits>" otherwise. */
export function formatPhone(digits: string) {
  if (digits.length === 12 && digits.startsWith("91")) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  return `+${digits}`;
}

// ---------------------------------------------------------------------------
// Public queries
// ---------------------------------------------------------------------------

export type OpenSlot = {
  id: string;
  startsAt: Date;
  durationMinutes: number;
  mode: Mode;
  seatsLeft: number;
};

/** Future slots with a seat still free, soonest first. Always read live. */
export async function getOpenSlots(): Promise<OpenSlot[]> {
  // Availability changes with every booking and with the clock, so this must
  // never be baked into a prerendered page.
  await connection();
  if (!hasDatabase) return [];

  const opensAfter = new Date(Date.now() + BOOKING_LEAD_MINUTES * 60_000);
  try {
    const slots = await db.trialSlot.findMany({
      where: { startsAt: { gt: opensAfter } },
      orderBy: { startsAt: "asc" },
      take: 60,
      include: { _count: { select: { bookings: { where: { status: { in: ACTIVE_STATUSES } } } } } },
    });
    return slots
      .map((s) => ({
        id: s.id,
        startsAt: s.startsAt,
        durationMinutes: s.durationMinutes,
        mode: (isMode(s.mode) ? s.mode : "in-person") as Mode,
        seatsLeft: s.capacity - s._count.bookings,
      }))
      .filter((s) => s.seatsLeft > 0);
  } catch (error) {
    console.error("Trial slot query failed", error);
    return [];
  }
}

export type BookingInput = {
  slotId: string;
  parentName: string;
  phone: string;
  childName: string;
  childAge: number;
  notes: string | null;
};

export type BookingResult =
  | { ok: true; startsAt: Date; mode: Mode }
  | { ok: false; reason: "gone" | "full" | "too-soon" | "too-many" | "error" };

/**
 * Books a seat. The slot row is locked for the duration of the check, so two
 * parents submitting the same slot at the same moment cannot both get it.
 */
export async function bookSlot(input: BookingInput): Promise<BookingResult> {
  try {
    return await db.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<{ id: string; startsAt: Date; capacity: number; mode: string }[]>`
        SELECT "id", "startsAt", "capacity", "mode" FROM "TrialSlot" WHERE "id" = ${input.slotId} FOR UPDATE`;
      const slot = locked[0];
      if (!slot) return { ok: false, reason: "gone" } as const;

      if (slot.startsAt.getTime() <= Date.now() + BOOKING_LEAD_MINUTES * 60_000) {
        return { ok: false, reason: "too-soon" } as const;
      }

      // Both checks in one round trip, so the lock is held as briefly as possible.
      const [counts] = await tx.$queryRaw<{ taken: number; pendingForPhone: number }[]>`
        SELECT
          (SELECT COUNT(*) FROM "TrialBooking" WHERE "slotId" = ${slot.id} AND "status" IN ('pending', 'confirmed'))::int AS "taken",
          (SELECT COUNT(*) FROM "TrialBooking" WHERE "phone" = ${input.phone} AND "status" = 'pending')::int AS "pendingForPhone"`;
      if (counts.taken >= slot.capacity) return { ok: false, reason: "full" } as const;
      if (counts.pendingForPhone >= MAX_PENDING_PER_PHONE) return { ok: false, reason: "too-many" } as const;

      await tx.trialBooking.create({ data: { ...input } });
      return { ok: true, startsAt: slot.startsAt, mode: (isMode(slot.mode) ? slot.mode : "in-person") as Mode } as const;
    }, {
      // Parents racing for the same slot queue behind its lock. Prisma's default
      // 2-second wait would turn the losers' clear "someone just booked that
      // time" into a generic failure, so allow the queue time to drain.
      maxWait: 10_000,
      timeout: 15_000,
    });
  } catch (error) {
    console.error("Trial booking failed", error);
    return { ok: false, reason: "error" };
  }
}

// ---------------------------------------------------------------------------
// WhatsApp messages the admin sends with one tap
// ---------------------------------------------------------------------------

type MessageBooking = { parentName: string; childName: string; phone: string };
type MessageSlot = { startsAt: Date; mode: string; meetingLink: string | null; durationMinutes: number };

export function whatsAppTo(phone: string, text: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function confirmationMessage(b: MessageBooking, s: MessageSlot) {
  const when = formatIstDateTime(s.startsAt);
  const where =
    s.mode === "online"
      ? s.meetingLink
        ? `It is an online class on Zoom. Join here: ${s.meetingLink}`
        : "It is an online class on Zoom. We will send the joining link before the class."
      : `It is in person at the academy, ${site.address}.`;
  return [
    `Namaste ${b.parentName}! 🙏`,
    ``,
    `${b.childName}'s trial class at ${site.shortName} is confirmed for ${when} (${s.durationMinutes} minutes).`,
    ``,
    where,
    ``,
    `Please join 5 minutes early. We look forward to meeting ${b.childName}!`,
  ].join("\n");
}

export function declineMessage(b: MessageBooking, s: MessageSlot) {
  return [
    `Namaste ${b.parentName}! 🙏`,
    ``,
    `Thank you for your interest in ${site.shortName}. Unfortunately the trial slot on ${formatIstDateTime(s.startsAt)} is no longer available.`,
    ``,
    `Please send us an enquiry here: ${site.url}/contact`,
    `Or simply reply to this message and we will find a time that suits ${b.childName}.`,
  ].join("\n");
}
