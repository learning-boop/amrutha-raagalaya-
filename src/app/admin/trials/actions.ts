"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { ACTIVE_STATUSES, isMode, parseIst } from "@/lib/trials";

export type SlotFormState = { error?: string; ok?: string };

const DURATIONS = [30, 45, 60];

function refresh() {
  revalidatePath("/admin/trials");
  revalidatePath("/admin");
}

/** Accepts only https links, so nothing odd is sent to parents. */
function cleanLink(raw: string): string | null | undefined {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function addSlots(_prev: SlotFormState, formData: FormData): Promise<SlotFormState> {
  await requireAdmin();
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const first = parseIst(get("date"), get("time"));
  const durationMinutes = Number(get("duration"));
  const mode = get("mode");
  const capacity = Number(get("capacity") || 1);
  const repeatWeeks = Number(get("repeat") || 1);
  const meetingLink = cleanLink(get("meetingLink"));

  if (!first) return { error: "Choose a date and a start time." };
  if (first.getTime() <= Date.now()) return { error: "That time has already passed." };
  if (!DURATIONS.includes(durationMinutes)) return { error: "Choose a duration." };
  if (!isMode(mode)) return { error: "Choose online or in person." };
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 10) return { error: "Children per slot must be between 1 and 10." };
  if (!Number.isInteger(repeatWeeks) || repeatWeeks < 1 || repeatWeeks > 12) return { error: "Repeat must be between 1 and 12 weeks." };
  if (meetingLink === undefined) return { error: "The Zoom link must be a full https:// address." };

  // Adding whole weeks to an instant keeps the same IST clock time, because
  // India has no daylight saving.
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  const starts = Array.from({ length: repeatWeeks }, (_, i) => new Date(first.getTime() + i * WEEK));

  try {
    // Skip any time that already has a slot, so double-clicking "Add" or
    // repeating over an existing week does not create duplicates.
    const existing = await db.trialSlot.findMany({ where: { startsAt: { in: starts } }, select: { startsAt: true } });
    const taken = new Set(existing.map((e) => e.startsAt.getTime()));
    const fresh = starts.filter((s) => !taken.has(s.getTime()));

    if (fresh.length > 0) {
      await db.trialSlot.createMany({
        data: fresh.map((startsAt) => ({
          startsAt,
          durationMinutes,
          mode,
          capacity,
          meetingLink: mode === "online" ? meetingLink : null,
        })),
      });
    }

    refresh();
    const skipped = starts.length - fresh.length;
    if (fresh.length === 0) return { error: "Those times already exist." };
    return { ok: `Added ${fresh.length} slot${fresh.length === 1 ? "" : "s"}${skipped ? ` (skipped ${skipped} that already existed)` : ""}.` };
  } catch (error) {
    console.error("Could not add trial slots", error);
    return { error: "Could not save the slots. Please try again." };
  }
}

export async function updateMeetingLink(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const link = cleanLink(String(formData.get("meetingLink") ?? "").trim());
  if (!id || link === undefined) return;
  await db.trialSlot.update({ where: { id }, data: { meetingLink: link } }).catch((e) => console.error(e));
  refresh();
}

/** Deletes a slot only when no family is waiting on it or booked into it. */
export async function deleteSlot(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  try {
    await db.$transaction(async (tx) => {
      const active = await tx.trialBooking.count({ where: { slotId: id, status: { in: ACTIVE_STATUSES } } });
      if (active > 0) return;
      await tx.trialBooking.deleteMany({ where: { slotId: id, status: "declined" } });
      await tx.trialSlot.delete({ where: { id } });
    });
  } catch (error) {
    console.error("Could not delete trial slot", error);
  }
  refresh();
}

async function decide(formData: FormData, status: "confirmed" | "declined") {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  try {
    // Confirming only applies to a pending request, so a double-click or a
    // stale tab cannot revive a declined one. Declining also covers confirmed
    // bookings, for families who cancel — it frees the seat again.
    const from = status === "confirmed" ? ["pending"] : ACTIVE_STATUSES;
    await db.trialBooking.updateMany({ where: { id, status: { in: from } }, data: { status, decidedAt: new Date() } });
  } catch (error) {
    console.error(`Could not mark booking ${status}`, error);
  }
  refresh();
}

export async function confirmBooking(formData: FormData) {
  await decide(formData, "confirmed");
}

export async function declineBooking(formData: FormData) {
  await decide(formData, "declined");
}
