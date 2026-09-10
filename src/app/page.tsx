import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import Journey from "@/components/Journey";
import TestimonialCard from "@/components/TestimonialCard";
import CtaBand from "@/components/CtaBand";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { values, whyUs, testimonials } from "@/lib/content";
import { waLink, messages, site } from "@/lib/site";

const moments = [
  { src: "/images/temple-pillars-concert.jpg", alt: "Devotional concert among temple pillars", big: true },
  { src: "/images/veena-hands.jpg", alt: "Hands on the veena strings" },
  { src: "/images/red-stage-tambura.jpg", alt: "Young students on stage with tamburas" },
  { src: "/images/om-stage-singer.jpg", alt: "Vocal concert on a devotional stage" },
  { src: "/images/veena-ensemble.jpg", alt: "Veena ensemble performance" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — one photo, one message, two buttons */}
      <section className="relative min-h-[560px] lg:min-h-[640px] flex items-end overflow-hidden">
        <Image src="/images/concert-temple-stage.jpg" alt="A Carnatic concert with singer, mridangam and violin before a temple backdrop" fill priority sizes="100vw" className="object-cover object-[60%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0A0D] via-[#2A0A0D]/70 to-[#2A0A0D]/10" />
        <Container className="relative pb-14 pt-40 lg:pb-20 text-[#FFF8EC]">
          <p className="eyebrow !text-gold-soft">Carnatic music academy · Guntur</p>
          <h1 className="mt-3 max-w-[16ch] text-4xl sm:text-5xl lg:text-6xl !text-[#FFF8EC]">Where children learn the timeless art of Carnatic music</h1>
          <p className="mt-4 max-w-[52ch] text-lg text-[#FFF8EC]/85">Classes for ages 4-15, and devotional music for temples, weddings and cultural occasions.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={waLink(messages.classes)} external variant="onMaroon"><WhatsAppIcon /> Enquire About Classes</Button>
            <Button href="/devotional-programs" variant="onMaroonOutline">Book a Program</Button>
          </div>
          <p className="mt-5 text-[0.85rem] text-[#FFF8EC]/75">Trial class available · No prior music knowledge needed</p>
        </Container>
      </section>

      {/* Three words that define the academy */}
      <section className="bg-cream py-12">
        <Container className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4 items-start">
              <Icon name={v.icon} className="w-9 h-9 text-gold shrink-0" />
              <div><h3 className="text-[1.35rem]">{v.title}</h3><p className="text-[0.95rem] text-ink-2">{v.text}</p></div>
            </div>
          ))}
        </Container>
      </section>

      {/* What we do — two clear paths */}
      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="What we do" title="Two ways to be part of the tradition" />
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            <article className="group bg-offwhite border border-line rounded-card overflow-hidden shadow-soft flex flex-col">
              <Photo src="/images/veena-player-saree.jpg" alt="A musician in a traditional saree playing the veena" className="aspect-[4/3]" />
              <div className="p-7 flex flex-col gap-3 flex-1">
                <h3 className="text-2xl">Carnatic Classes for Children</h3>
                <p className="text-ink-2">Ages 7 to 15. Step by step, from the first swara to the first stage — in a warm, disciplined classroom.</p>
                <div className="mt-auto pt-2 flex flex-wrap items-center gap-4">
                  <Button href={waLink(messages.classes)} external>Enquire About Classes</Button>
                  <Link href="/carnatic-music-classes" className="font-semibold text-maroon hover:underline">Learn more →</Link>
                </div>
              </div>
            </article>
            <article className="group bg-offwhite border border-line rounded-card overflow-hidden shadow-soft flex flex-col">
              <Photo src="/images/temple-pillars-concert.jpg" alt="Devotional concert among lamp-lit temple pillars" className="aspect-[4/3]" />
              <div className="p-7 flex flex-col gap-3 flex-1">
                <h3 className="text-2xl">Devotional &amp; Traditional Programs</h3>
                <p className="text-ink-2">Temple festivals, weddings, family functions and cultural events — rehearsed, respectful, rooted in tradition.</p>
                <div className="mt-auto pt-2 flex flex-wrap items-center gap-4">
                  <Button href={waLink(messages.program)} external variant="outline">Book a Program</Button>
                  <Link href="/devotional-programs" className="font-semibold text-maroon hover:underline">See programs →</Link>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* Why parents choose us */}
      <section className="bg-cream py-16 lg:py-22">
        <Container className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Photo src="/images/carved-veena.jpg" alt="A carved Saraswati veena in warm light" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" />
          <div>
            <SectionHeading center={false} eyebrow="Why parents choose us" title="A place parents trust, and children look forward to" />
            <ul className="mt-7 grid gap-5 sm:grid-cols-2">
              {whyUs.map((w) => (
                <li key={w.title} className="flex gap-3.5">
                  <Icon name={w.icon} className="w-[26px] h-[26px] text-gold shrink-0 mt-0.5" />
                  <div><b className="block font-serif font-semibold text-[1.25rem] text-maroon">{w.title}</b><p className="text-[0.9rem] text-ink-2">{w.text}</p></div>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex gap-4 items-center bg-offwhite border border-line rounded-card px-4.5 py-4">
              <Photo src="/images/guru-singing-480.jpg" alt={`${site.teacher} playing the veena`} className="w-[68px] h-[68px] rounded-full shrink-0 border border-gold/60" />
              <div><b className="block font-serif font-semibold text-[1.25rem] text-maroon">{site.teacher}</b><p className="text-[0.85rem] text-ink-2">Founder &amp; principal teacher · <Link href="/about" className="text-maroon font-semibold hover:underline">About the academy →</Link></p></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Learning journey */}
      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Learning journey" title="From the first swara to the stage" lead="Five clear stages. Every child moves at a pace that suits them." />
          <Journey />
        </Container>
      </section>

      {/* Moments — photo mosaic */}
      <section className="bg-cream py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Gallery" title="Moments from the academy" />
          <div className="mt-9 grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[210px] gap-3">
            {moments.map((m) => (
              <Photo key={m.src} src={m.src} alt={m.alt} className={`rounded-xl ${m.big ? "col-span-2 row-span-2" : ""}`} sizes="(max-width: 768px) 50vw, 25vw" />
            ))}
          </div>
          <div className="text-center mt-8"><Button href="/gallery" variant="outline">View Full Gallery</Button></div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Testimonials" title="What parents say" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (<TestimonialCard key={t.who} quote={t.quote} who={t.who} />))}
          </div>
          <div className="text-center mt-8"><Link href="/testimonials" className="font-semibold text-maroon hover:underline">Read more →</Link></div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
