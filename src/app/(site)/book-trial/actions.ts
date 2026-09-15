"use server";

import { revalidatePath } from "next/cache";
import { bookSlot, formatIstDateTime, MODES, normalizePhone } from "@/lib/trials";

export type RequestState =
  | { status: "idle" }
  | { status: "error"; message: string; fields?: Record<string, string>; values?: Values }
  | { status: "done"; when: string; mode: string; childName: string };

/** What the parent typed, returned on error because React resets the form after submitting. */
export type Values = { slotId: string; parentName: string; phone: string; childName: string; childAge: string; notes: string };

const MIN_FILL_MS = 3_000;

export async function requestTrial(_prev: RequestState, formData: FormData): Promise<RequestState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // Spam traps. The "website" field is hidden from people, so only bots fill
  // it, and nobody genuine completes the form within three seconds. Both get a
  // generic error that does not reveal which check they tripped.
  const startedAt = Number(get("startedAt"));
  if (get("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  const values: Values = {
    slotId: get("slotId"),
    parentName: get("parentName"),
    phone: get("phone"),
    childName: get("childName"),
    childAge: get("childAge"),
    notes: get("notes"),
  };
  const slotId = get("slotId");
  const parentName = get("parentName");
  const childName = get("childName");
  const phone = normalizePhone(get("phone"));
  const childAge = Number(get("childAge"));
  const notes = get("notes").slice(0, 500) || null;

  const fields: Record<string, string> = {};
  if (!slotId) fields.slotId = "Please choose a time.";
  if (parentName.length < 2 || parentName.length > 80) fields.parentName = "Please enter your name.";
  if (childName.length < 1 || childName.length > 80) fields.childName = "Please enter your child's name.";
  if (!phone) fields.phone = "Please enter a WhatsApp number, e.g. 98765 43210 or +1 415 555 0100.";
  if (!Number.isInteger(childAge) || childAge < 3 || childAge > 18) fields.childAge = "Please enter an age between 3 and 18.";
  if (Object.keys(fields).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fields, values };
  }

  const result = await bookSlot({ slotId, parentName, phone: phone!, childName, childAge, notes });

  if (!result.ok) {
    const messages = {
      gone: "That time is no longer offered. Please choose another.",
      full: "Someone has just booked that time. Please choose another.",
      "too-soon": "That time is too close to book online. Please choose a later time or message us on WhatsApp.",
      "too-many": "You already have requests waiting for confirmation. We will reply on WhatsApp shortly.",
      error: "We could not save your request. Please try again, or message us on WhatsApp.",
    } as const;
    const aboutSlot = result.reason === "full" || result.reason === "gone" || result.reason === "too-soon";
    return { status: "error", message: messages[result.reason], fields: aboutSlot ? { slotId: messages[result.reason] } : undefined, values };
  }

  revalidatePath("/admin/trials");
  revalidatePath("/admin");
  return { status: "done", when: formatIstDateTime(result.startsAt), mode: MODES[result.mode], childName };
}
