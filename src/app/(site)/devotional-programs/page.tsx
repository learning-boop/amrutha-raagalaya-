import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Photo from "@/components/Photo";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { programs } from "@/lib/content";
import { waLink, messages } from "@/lib/site";

export const metadata: Metadata = { title: "Devotional & Traditional Music Programs", description: "Devotional and traditional Carnatic music programs for temples, weddings and traditional functions in Guntur and across Andhra Pradesh." };

const how = ["Tell us the occasion, date, venue and approximate duration.", "We suggest a program format and repertoire suited to the occasion.", "We confirm the ensemble, timings and inclusions in writing.", "We arrive rehearsed and on time, and let the occasion lead."];

export default function ProgramsPage() {
  return (
    <>
      <section className="pt-12 pb-16 lg:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <SectionHeading as="h1" center={false} eyebrow="Devotional & traditional programs" title="Devotional music for life’s sacred occasions" lead="Respectful, rehearsed Carnatic and devotional music for temples, weddings and traditional functions. We perform devotional programs only." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waLink(messages.program)} external>Book a Devotional Program</Button>
              <Button href="#programs" variant="outline">See program types</Button>
            </div>
          </div>
          <Photo src="/images/real/group-devotional-hall.jpg" alt="Devotional singing in a decorated hall" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" sizes="(max-width: 1024px) 100vw, 45vw" />
        </Container>
      </section>

      <section id="programs" className="bg-cream py-16 lg:py-22 scroll-mt-20">
        <Container className="grid gap-8">
          {programs.map((p, i) => (
            <article key={p.slug} id={p.slug} className={`grid gap-8 md:grid-cols-2 md:items-center lift bg-offwhite border border-line rounded-card overflow-hidden scroll-mt-24 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Photo src={p.image} alt={`${p.title} — devotional music`} className="aspect-video md:aspect-[4/3] md:h-full" />
              <div className="p-7 md:p-9 flex flex-col gap-3">
                <Icon name={p.icon} className="w-9 h-9 text-gold" />
                <h2 className="text-3xl">{p.title}</h2>
                <p className="text-ink-2">{p.detail}</p>
                <div className="mt-2"><Button href={waLink(`Namaste! I would like to enquire about a ${p.title.toLowerCase()} program from Amrutha Raagalaya.`)} external variant="outline">Enquire for {p.title.replace(" Programs", "")}</Button></div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Devotional performances" title="How a program comes together" lead="A simple, respectful process from first message to the day of the occasion." />
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {how.map((h, i) => (
              <li key={h} className="flex gap-4 md:block">
                <div className="w-11 h-11 shrink-0 rounded-full border-[1.5px] border-gold grid place-items-center font-serif font-semibold text-maroon md:mb-3">{i + 1}</div>
                <p className="text-ink-2">{h}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title="Planning a temple festival, wedding or function?" lead="Tell us the occasion and date. We reply on WhatsApp with a program suggestion, usually the same day." primary="Enquire for Temple / Wedding Programs" primaryMsg={messages.program} />
    </>
  );
}
