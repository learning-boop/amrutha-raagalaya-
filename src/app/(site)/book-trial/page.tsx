import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { WhatsAppIcon } from "@/components/Icon";
import { messages, waLink } from "@/lib/site";
import { formatIstDay, formatIstTime, getOpenSlots, istDateKey, MODES } from "@/lib/trials";
import BookingForm, { type SlotDay } from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a Trial Class",
  description: "Choose a time for a free trial Carnatic music class — online on Zoom or in person in Guntur.",
};

/** Reads the clock here rather than while rendering, which must stay pure. */
async function loadPage() {
  // getOpenSlots() opts this page into request-time rendering, so it always
  // shows live availability.
  const slots = await getOpenSlots();
  return { slots, renderedAt: Date.now() };
}

export default async function BookTrialPage() {
  const { slots, renderedAt } = await loadPage();

  // Group by India date and pre-format on the server, so the labels are
  // identical for every visitor whatever their device's time zone.
  const days: SlotDay[] = [];
  for (const s of slots) {
    const key = istDateKey(s.startsAt);
    let day = days.find((d) => d.key === key);
    if (!day) {
      day = { key, label: formatIstDay(s.startsAt), slots: [] };
      days.push(day);
    }
    day.slots.push({
      id: s.id,
      iso: s.startsAt.toISOString(),
      time: formatIstTime(s.startsAt),
      durationMinutes: s.durationMinutes,
      mode: s.mode,
      modeLabel: MODES[s.mode],
    });
  }

  return (
    <section className="pt-12 pb-16 lg:pt-16 lg:pb-22">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Trial class"
          title="Book a trial class"
          lead="Pick a time that suits you. The student meets the teacher and experiences a real lesson — online on Zoom, or in person at the academy."
        />

        <div className="mx-auto max-w-3xl mt-10">
          {days.length === 0 ? (
            <div className="rounded-2xl border border-line bg-cream/50 p-8 text-center">
              <h2 className="text-2xl">No open times right now</h2>
              <p className="mt-3 text-ink-2">New trial slots are added regularly. Message us and we will find a time that suits you.</p>
              <div className="mt-6">
                <Button href={waLink(messages.trial)} external><WhatsAppIcon /> Ask on WhatsApp</Button>
              </div>
            </div>
          ) : (
            <BookingForm days={days} renderedAt={renderedAt} />
          )}

          {days.length > 0 && (
            <p className="mt-8 text-center text-[0.9rem] text-ink-2">
              None of these times work?{" "}
              <a href={waLink(messages.trial)} className="text-maroon underline underline-offset-2 hover:text-gold">Message us on WhatsApp</a>{" "}
              and we will arrange another.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
