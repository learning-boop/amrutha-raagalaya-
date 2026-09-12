import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { values } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About the Academy", description: `The story, vision, teaching philosophy and cultural values of ${site.name}, a devotional Carnatic music academy in Vijayawada.` };

const philosophy = [
  { icon: "veena", title: "Authenticity first", text: "We teach the Carnatic system as it has been passed down — swara, tala, sahitya and bhava — without shortcuts." },
  { icon: "hands", title: "Patience with children", text: "Each child learns at their own pace. Encouragement comes first; correction is gentle and consistent." },
  { icon: "lamp", title: "Discipline as devotion", text: "Regular practice, respect for the guru and the music, and a calm classroom are the foundation of every lesson." },
  { icon: "temple", title: "Music that is lived", text: "Students perform at temples and cultural gatherings, so what they learn becomes part of their life, not just a lesson." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-12 pb-16 lg:pt-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading as="h1" center={false} eyebrow="About the academy" title="Our story" />
            <div className="mt-5 grid gap-4 text-ink-2 text-lg max-w-[62ch]">
              <p>{site.shortName} was founded with a simple belief: that Carnatic music is not only an art to be learned, but a tradition to be nurtured and a harmony to be shared.</p>
              <p>What began as a small group of children learning swaras has grown into a devotional academy — one that teaches the classical form with care and carries it onto temple, wedding and cultural stages across Andhra Pradesh.</p>
              <p className="font-serif italic text-xl text-ink">“Music is not only something we learn. It is a tradition we nurture, a culture we carry forward, and a harmony we share.”</p>
            </div>
          </div>
          <Photo src="/images/real/guru-harmonium-ensemble.jpg" alt="The guru with students at the harmonium" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" sizes="(max-width: 1024px) 100vw, 50vw" />
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-22">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="lift bg-offwhite border border-line rounded-card p-8">
            <Icon name="lotus" className="w-9 h-9 text-gold mb-3" />
            <h2 className="text-3xl">Our vision</h2>
            <p className="mt-3 text-ink-2">A generation of children who carry Indian classical and devotional music forward with confidence, discipline and love — keeping the tradition alive in homes, temples and communities.</p>
          </div>
          <div className="lift bg-offwhite border border-line rounded-card p-8">
            <Icon name="note" className="w-9 h-9 text-gold mb-3" />
            <h2 className="text-3xl">Our mission</h2>
            <p className="mt-3 text-ink-2">To teach authentic Carnatic music to children in a warm, structured environment, and to offer devotional and traditional music programs that honour every sacred occasion.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Teaching philosophy" title="How we teach" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {philosophy.map((p) => (
              <div key={p.title} className="flex gap-4 border-t border-gold-soft pt-5">
                <Icon name={p.icon} className="w-8 h-8 text-gold shrink-0" />
                <div><h3 className="text-[1.3rem]">{p.title}</h3><p className="mt-1 text-[0.95rem] text-ink-2">{p.text}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-22">
        <Container>
          <SectionHeading eyebrow="Cultural values" title="Tradition, discipline, harmony" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-2.5 px-6 py-6 border-t border-gold-soft">
                <Icon name={v.icon} className="w-[34px] h-[34px] text-gold" />
                <h3 className="text-[1.35rem]">{v.title}</h3>
                <p className="text-[0.95rem] text-ink-2">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-22">
        <Container className="grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-center">
          <Photo src="/images/guru-singing.jpg" alt={`${site.teacher}, founder of Amrutha Raagalaya, singing`} className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px] max-w-[380px] mx-auto w-full border-[3px] border-gold shadow-soft" sizes="(max-width: 768px) 90vw, 380px" />
          <div>
            <SectionHeading center={false} eyebrow="Instructor · Meet the Guru" title={site.teacher} />
            <div className="mt-4 grid gap-3 text-ink-2 max-w-[62ch]">
              <p>{site.teacher} is the founder and principal teacher of {site.shortName}, trained in the Carnatic tradition under respected gurus, with years of experience teaching children and performing devotional music at temples and cultural events.</p>
              <p className="text-[0.85rem] italic">[Replace with the teacher’s real biography, training lineage and performance highlights.]</p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
