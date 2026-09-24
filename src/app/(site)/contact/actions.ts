"use server";

import { revalidatePath } from "next/cache";
import { isKind, OCCASIONS, saveEnquiry } from "@/lib/enquiries";
import { normalizePhone } from "@/lib/format";

/** What the visitor typed, returned on error because React resets the form after submitting. */
export type Values = {
  name: string;
  phone: string;
  age: string;
  occasion: string;
  eventDate: string;
  location: string;
  message: string;
};

export type EnquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fields?: Record<string, string>; values?: Values }
  | { status: "done" };

const MIN_FILL_MS = 3_000;

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // Spam traps, matching the trial form: the "website" field is hidden from
  // people, and nobody genuine completes the form within three seconds.
  const startedAt = Number(get("startedAt"));
  if (get("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  const kind = get("kind");
  if (!isKind(kind)) return { status: "error", message: "Something went wrong. Please try again." };

  const values: Values = {
    name: get("name"),
    phone: get("phone"),
    age: get("age"),
    occasion: get("occasion"),
    eventDate: get("eventDate"),
    location: get("location"),
    message: get("message"),
  };

  const name = values.name;
  const phone = normalizePhone(values.phone);
  const age = values.age ? Number(values.age) : null;

  const fields: Record<string, string> = {};
  if (name.length < 2 || name.length > 80) fields.name = "Please enter your name.";
  if (!phone) fields.phone = "Please enter a WhatsApp number, e.g. 98765 43210 or +1 415 555 0100.";
  if (kind === "classes" && (age === null || !Number.isInteger(age) || age < 3 || age > 99)) {
    fields.age = "Please enter the student's age in years.";
  }
  if (Object.keys(fields).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fields, values };
  }

  const occasion = (OCCASIONS as readonly string[]).includes(values.occasion) ? values.occasion : OCCASIONS[0];

  const result = await saveEnquiry({
    kind,
    name,
    phone: phone!,
    age: kind === "classes" ? age : null,
    occasion: kind === "program" ? occasion : null,
    eventDate: kind === "program" ? values.eventDate.slice(0, 20) || null : null,
    location: kind === "program" ? values.location.slice(0, 120) || null : null,
    message: values.message.slice(0, 1000) || null,
  });

  if (!result.ok) {
    const messages = {
      "too-many": "We already have your earlier enquiries and will reply shortly.",
      error: "We could not save your enquiry. Please try again, or message us on WhatsApp.",
    } as const;
    return { status: "error", message: messages[result.reason], values };
  }

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  return { status: "done" };
}
