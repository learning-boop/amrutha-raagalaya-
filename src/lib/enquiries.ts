import "server-only";
import { db, hasDatabase } from "./db";

export const KINDS = ["classes", "program"] as const;
export type EnquiryKind = (typeof KINDS)[number];
export const isKind = (value: string): value is EnquiryKind =>
  (KINDS as readonly string[]).includes(value);

export const OCCASIONS = [
  "Temple program",
  "Wedding",
  "Traditional function",
  "Other devotional performance",
] as const;

export type NewEnquiry = {
  kind: EnquiryKind;
  name: string;
  /** Digits with country code, e.g. 919876543210. */
  phone: string;
  age: number | null;
  occasion: string | null;
  eventDate: string | null;
  location: string | null;
  message: string | null;
};

/** One phone cannot pile up more than this many unanswered enquiries. */
const MAX_NEW_PER_PHONE = 5;

export type SaveResult = { ok: true } | { ok: false; reason: "too-many" | "error" };

export async function saveEnquiry(input: NewEnquiry): Promise<SaveResult> {
  if (!hasDatabase) return { ok: false, reason: "error" };
  try {
    const waiting = await db.enquiry.count({
      where: { phone: input.phone, status: "new" },
    });
    if (waiting >= MAX_NEW_PER_PHONE) return { ok: false, reason: "too-many" };

    await db.enquiry.create({ data: input });
    return { ok: true };
  } catch {
    return { ok: false, reason: "error" };
  }
}

export type AdminEnquiry = {
  id: string;
  kind: string;
  name: string;
  phone: string;
  age: number | null;
  occasion: string | null;
  eventDate: string | null;
  location: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
  handledAt: Date | null;
};

/** Newest first: unanswered enquiries above the ones already handled. */
export async function listEnquiries(): Promise<AdminEnquiry[] | null> {
  if (!hasDatabase) return null;
  try {
    return await db.enquiry.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      take: 200,
    });
  } catch {
    return null;
  }
}

export async function countNewEnquiries(): Promise<number> {
  return db.enquiry.count({ where: { status: "new" } });
}

export async function setEnquiryStatus(id: string, status: "new" | "handled") {
  await db.enquiry.update({
    where: { id },
    data: { status, handledAt: status === "handled" ? new Date() : null },
  });
}

export async function removeEnquiry(id: string) {
  await db.enquiry.delete({ where: { id } });
}
