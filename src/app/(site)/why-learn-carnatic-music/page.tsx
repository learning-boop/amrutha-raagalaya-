import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Photo from "@/components/Photo";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { waLink, messages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Learn Carnatic Music?",
  description: "The benefits of learning Carnatic music for children, teenagers and adults — voice, focus, memory, confidence, devotion and a lifelong connection to Indian tradition. Classes in Guntur for all ages.",
};

const reasons = [
  { icon: "veena", title: "A complete musical foundation", text: "Carnatic music trains pitch (shruti), rhythm (tala) and melody (raga) together. Singers who learn it can pick up light music, film songs or any instrument far more easily later." },
  { icon: "note", title: "A strong, healthy voice", text: "Regular varisai and varnam practice builds breath control, range and a clear, steady voice — useful for singing, speaking and presenting." },
  { icon: "shield", title: "Focus and discipline", text: "Each lesson asks for attention and daily practice. Children and adults alike learn patience, concentration and the habit of steady effort." },
  { icon: "lamp", title: "Sharper memory and mind", text: "Learning compositions by heart, keeping tala on the hand and recognising ragas exercise memory, listening and mathematical thinking." },
  { icon: "hands", title: "Confidence on stage", text: "Performing at temples and our Annual Day helps shy students open up and speak and sing in front of others without fear." },
  { icon: "lotus", title: "Calm and wellbeing", text: "Singing devotional kritis is soothing. Many students — especially adults — find daily practice a peaceful break from a busy day." },
  { icon: "temple", title: "Devotion and tradition", text: "The songs of Tyagaraja, Annamayya and Purandaradasa carry deep devotion and meaning, and keep our language and culture alive at home." },
  { icon: "garland", title: "A lifelong companion", text: "Carnatic music is never finished. Whatever age you start, it grows with you and stays with you for the rest of your life." },
];

const ages = [
  { title: "Young children (4+)", text: "The best time to begin. Little ones pick up swaras, pitch and rhythm naturally through simple songs and play-like practice." },
  { title: "School children & teenagers", text: "Builds focus that helps with studies, gives a creative outlet away from screens, and opens the door to stage performances." },
  { title: "Adults", text: "It is never too late. Adults learn faster through the foundation stages and enjoy music as devotion, relaxation and a long-held wish fulfilled." },
];

export default function WhyLearnPage() {
  return (
    <>
      <section className="pt-12 pb-16 lg:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <SectionHeading as="h1" center={false} eyebrow="Why learn Carnatic music" title="More than music — a gift for life" lead="Carnatic music is one of the oldest classical traditions in the world. Learning it shapes the voice, the mind and the heart — at any age." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waLink(messages.classes)} external>Enquire About Classes</Button>
              <Button href="/book-trial" variant="ghost">Book a Trial Class</Button>
            </div>
          </div>
          <Photo src="/images/real/child-singing-mic.jpg" alt="A young student singing Carnatic music on stage" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" sizes="(max-width: 1024px) 100vw, 45vw" priority />
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Benefits" title="Why every student should learn Carnatic music" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="lift bg-offwhite border border-line rounded-card p-6 flex flex-col gap-2.5">
                <Icon name={r.icon} className="w-9 h-9 text-gold" />
                <h3 className="text-[1.3rem]">{r.title}</h3>
                <p className="text-[0.9rem] text-ink-2">{r.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-22">
        <Container className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Photo src="/images/real/children-class-carpet.jpg" alt="Students of different ages learning together in class" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" sizes="(max-width: 1024px) 100vw, 45vw" />
          <div>
            <SectionHeading center={false} eyebrow="For every age" title="There is no wrong age to begin" lead="We teach all age groups, and especially welcome children from about 4 years." />
            <ul className="mt-8 grid gap-5">
              {ages.map((a) => (
                <li key={a.title} className="border-t border-gold-soft pt-5">
                  <h3 className="text-[1.35rem]">{a.title}</h3>
                  <p className="mt-1 text-ink-2">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand title="Start learning Carnatic music" lead="Tell us a little about the student and we will share timings, fees and a trial-class slot. We reply on WhatsApp, usually the same day." secondary="Book a Trial Class" secondaryHref="/book-trial" />
    </>
  );
}
