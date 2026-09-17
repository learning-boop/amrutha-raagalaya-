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
  { src: "/images/real/temple-hall-wide.jpg", alt: "Devotional program in a temple hall", big: true },
  { src: "/images/real/child-singing-mic.jpg", alt: "A young student singing at the mic" },
  { src: "/images/real/kids-stage-tabla.jpg", alt: "Students on stage with tabla" },
  { src: "/images/real/guru-harmonium.jpg", alt: "The guru at the harmonium" },
  { src: "/images/real/stage-ensemble-keyboard.jpg", alt: "Concert with ensemble" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — split: caption on cream, photo untouched */}
      <section className="grid lg:grid-cols-[42%_58%] lg:min-h-[600px]">
        <div className="order-2 lg:order-1 bg-cream flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
          <p className="eyebrow">Carnatic music academy · Guntur</p>
          <h1 className="mt-3 max-w-[13ch] text-4xl sm:text-5xl lg:text-[3.3rem]">Where voices are carved by the sacred art of Carnatic sangeetham</h1>
          <p className="mt-4 max-w-[46ch] text-lg text-ink-2">Classes for every age group — from little ones of 4 to grown-up beginners — and devotional music for temples, weddings and traditional functions.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={waLink(messages.classes)} external><WhatsAppIcon /> Enquire About Classes</Button>
            <Button href="/devotional-programs" variant="outline">Book a Program</Button>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.85rem] text-ink-2">
            {["Trial class available", "No prior music knowledge needed", "All ages welcome"].map((t) => (
              <li key={t} className="before:content-['◆'] before:text-gold before:text-[0.55rem] before:mr-2 before:align-middle">{t}</li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-0 overflow-hidden">
          <Image src="/images/real/guru-tambura-hero.webp" alt={`${site.teacher} smiling, seated with a tambura in a temple hall`} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-[50%_20%]" />
          <div className="hidden lg:block absolute left-6 bottom-6 bg-offwhite border border-line rounded-[14px] px-4 py-3 shadow-soft max-w-[240px]">
            <b className="block font-serif font-semibold text-[1.25rem] text-maroon leading-tight">Nurturing Tradition.<br />Inspiring Harmony.</b>
            <span className="text-[0.75rem] text-ink-2">Students perform at temples and devotional festivals</span>
          </div>
        </div>
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
            <article className="lift bg-offwhite border border-line rounded-card overflow-hidden shadow-soft flex flex-col">
              <Photo src="/images/girl-singing.jpg" alt="A young student in a silk pattu dress singing at the microphone on stage" className="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="p-7 flex flex-col gap-3 flex-1">
                <h3 className="text-2xl">Carnatic Classes for All Ages</h3>
                <p className="text-ink-2">Children from 4 years, teenagers and adults. Step by step, from the first swara to the first stage — in a warm, disciplined classroom.</p>
                <div className="mt-auto pt-2 flex flex-wrap items-center gap-4">
                  <Button href={waLink(messages.classes)} external>Enquire About Classes</Button>
                  <Link href="/carnatic-music-classes" className="font-semibold text-maroon hover:underline">Learn more →</Link>
                </div>
              </div>
            </article>
            <article className="lift bg-offwhite border border-line rounded-card overflow-hidden shadow-soft flex flex-col">
              <Photo src="/images/real/temple-hall-performance.jpg" alt="Devotional program in a temple hall" className="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="p-7 flex flex-col gap-3 flex-1">
                <h3 className="text-2xl">Devotional &amp; Traditional Programs</h3>
                <p className="text-ink-2">Temple festivals, weddings and traditional family functions — rehearsed, respectful, rooted in devotion.</p>
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
          <Photo src="/images/real/young-students-dresses.jpg" alt="Young students of the academy in traditional dress" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" sizes="(max-width: 1024px) 100vw, 45vw" />
          <div>
            <SectionHeading center={false} eyebrow="Why students choose us" title="A place families trust, and students look forward to" />
            <ul className="mt-7 grid gap-5 sm:grid-cols-2">
              {whyUs.map((w) => (
                <li key={w.title} className="flex gap-3.5">
                  <Icon name={w.icon} className="w-[26px] h-[26px] text-gold shrink-0 mt-0.5" />
                  <div><b className="block font-serif font-semibold text-[1.25rem] text-maroon">{w.title}</b><p className="text-[0.9rem] text-ink-2">{w.text}</p></div>
                </li>
              ))}
            </ul>
            <div className="lift mt-7 flex gap-4 items-center bg-offwhite border border-line rounded-card px-4.5 py-4">
              <Photo src="/images/guru-singing-480.jpg" alt={`${site.teacher}, founder and principal teacher`} className="w-[68px] h-[68px] rounded-full shrink-0 border border-gold/60" />
              <div><b className="block font-serif font-semibold text-[1.25rem] text-maroon">{site.teacher}</b><p className="text-[0.85rem] text-ink-2">Founder &amp; principal teacher · <Link href="/about" className="text-maroon font-semibold hover:underline">About the academy →</Link></p></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Learning journey */}
      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Learning journey" title="From the first swara to the stage" lead="Five clear stages. Every student moves at a pace that suits them." />
          <Journey />
        </Container>
      </section>

      {/* Moments — photo mosaic */}
      <section className="bg-cream py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Gallery" title="Moments from the academy" />
          <div className="mt-9 grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[210px] gap-3">
            {moments.map((m) => (
              <Photo key={m.src} src={m.src} alt={m.alt} className={`rounded-xl lift ${m.big ? "col-span-2 row-span-2" : ""}`} sizes="(max-width: 768px) 50vw, 25vw" />
            ))}
          </div>
          <div className="text-center mt-8"><Button href="/gallery" variant="outline">View Full Gallery</Button></div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Testimonials" title="What families say" />
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