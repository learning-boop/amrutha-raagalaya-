/**
 * Shared formatting helpers for admin screens: India-time dates, phone numbers
 * and WhatsApp links. (These began life in the trial-class feature, which has
 * since been removed; the enquiries screens still rely on them.)
 */

export const TIME_ZONE = "Asia/Kolkata";

// Punctuation from Intl varies between runtimes ("20 Sept 2026" vs "20 Sept,
// 2026"), and this text goes into WhatsApp messages, so strings are assembled
// from parts to read the same everywhere.
const istParts = new Intl.DateTimeFormat("en-IN", {
  timeZone: TIME_ZONE, weekday: "long", day: "numeric", month: "long", year: "numeric",
  hour: "numeric", minute: "2-digit", hour12: true,
});

/** "Sun, 20 Sep 2026, 5:30 pm IST" */
export function formatIstDateTime(d: Date) {
  const p = Object.fromEntries(istParts.formatToParts(d).map((x) => [x.type, x.value]));
  const weekday = String(p.weekday).slice(0, 3);
  const month = String(p.month).slice(0, 3);
  const time = `${p.hour}:${p.minute} ${String(p.dayPeriod ?? "").toLowerCase()}`;
  return `${weekday}, ${p.day} ${month} ${p.year}, ${time} IST`;
}

/**
 * Normalises what someone types into WhatsApp's format: digits with country
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

/** A WhatsApp chat link with the message ready to send. */
export function whatsAppTo(phone: string, text: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
