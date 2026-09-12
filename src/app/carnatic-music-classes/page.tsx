import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Photo from "@/components/Photo";
import Button from "@/components/Button";
import Journey from "@/components/Journey";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { faqs } from "@/lib/content";
import { waLink, messages } from "@/lib/site";

export const metadata: Metadata = { title: "Carnatic Music Classes for Children (Ages 4–15)", description: "Structured Carnatic music classes for children aged 4–15 in Vijayawada. What your child learns, our teaching approach, benefits, class details and FAQs." };

const learn = ["Voice, pitch and shruti with the tambura", "Varisai — the rhythmic foundation", "Geethams and simple devotional songs", "Varnams for voice control", "Kritis of the great composers", "Stage presence and confidence"];
const benefits = [
  { icon: "note", title: "Musical skill", text: "Pitch, rhythm and voice control that last a lifetime." },
  { icon: "shield", title: "Focus & discipline", text: "Regular practice builds concentration and patience." },
  { icon: "hands", title: "Confidence", text: "Performing on real stages helps shy children open up." },
  { icon: "lotus", title: "Cultural roots", text: "A living connection to Indian tradition and devotion." },
];
const details = [
  { icon: "hands", label: "Age group", value: "4 to 15 years" },
  { icon: "note", label: "Format", value: "Small-group batches (also online for students outside Vijayawada)" },
  { icon: "clock", label: "Timings", value: "Weekday evenings and weekends" },
  { icon: "lamp", label: "Trial class", value: "Available — meet the teacher before you decide" },
  { icon: "pin", label: "Location", value: "Vijayawada, Andhra Pradesh" },
  { icon: "temple", label: "Performances", value: "Temple festivals, Annual Day and cultural events" },
];

export default function ClassesPage() {
  return (
    <>
      <section className="pt-12 pb-16 lg:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <SectionHeading as="h1" center={false} eyebrow="Carnatic music classes" title="Carnatic music for children, taught the traditional way" lead="Structured, patient, child-friendly Carnatic training for ages 4 to 15 — from the first swara to the first temple stage." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waLink(messages.classes)} external>Enquire About Classes</Button>
              <Button href={waLink(messages.trial)} external variant="ghost"><WhatsAppIcon /> Book a Trial Class</Button>
            </div>
          </div>
          <Photo src="/images/real/children-class-carpet.jpg" alt="Children learning Carnatic music in class" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" sizes="(max-width: 1024px) 100vw, 45vw" />
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-22">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading center={false} eyebrow="Who can join" title="Ages 4 to 15, beginners welcome" />
            <p className="mt-4 text-ink-2 max-w-[62ch]">Classes are designed for children between 4 and 15. No prior music knowledge is needed — every student begins with the foundation stage. Younger children start with simple swaras and rhythm; older beginners move faster through the early stages.</p>
          </div>
          <div>
            <h3 className="text-2xl">What children learn</h3>
            <ul className="mt-4 grid gap-2.5">
              {learn.map((l) => (<li key={l} className="flex gap-3 text-ink-2"><span className="text-gold mt-1.5 text-[0.55rem]">◆</span>{l}</li>))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Teaching approach" title="From the first swara to the stage" lead="Each stage builds on the last. Every stage ends with something a child can sing at home — and later, on stage." />
          <Journey />
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Benefits" title="Why Carnatic music is good for your child" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="lift bg-offwhite border border-line rounded-card p-6 flex flex-col gap-2.5">
                <Icon name={b.icon} className="w-9 h-9 text-gold" />
                <h3 className="text-[1.3rem]">{b.title}</h3>
                <p className="text-[0.9rem] text-ink-2">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Class details" title="Everything parents ask about" />
          <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {details.map((d) => (
              <div key={d.label} className="flex gap-4 border-t border-gold-soft pt-5">
                <Icon name={d.icon} className="w-7 h-7 text-gold shrink-0" />
                <div><dt className="eyebrow">{d.label}</dt><dd className="mt-1 text-ink">{d.value}</dd></div>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-ink-2">Fees are shared on enquiry. Message us on WhatsApp for the current timetable.</p>
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Frequently asked questions" title="Questions parents ask us" />
          <div className="mt-8"><Faq items={faqs} /></div>
        </Container>
      </section>

      <CtaBand title="Begin your child’s musical journey" primary="Enquire About Classes" secondary="Book a Trial Class" secondaryMsg={messages.trial} />
    </>
  );
}
