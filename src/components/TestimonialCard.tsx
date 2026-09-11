export default function TestimonialCard({ quote, who }: { quote: string; who: string }) {
  return (
    <figure className="lift bg-offwhite border border-line rounded-card p-7 flex flex-col gap-3.5 h-full">
      <blockquote className="font-serif italic text-[1.35rem] leading-snug text-ink before:content-['“'] before:text-gold before:text-4xl before:leading-[0] before:mr-1 before:align-[-.3em]">{quote}</blockquote>
      <figcaption className="text-[0.85rem] text-ink-2 border-t border-line pt-3 mt-auto"><b className="text-maroon font-semibold">{who}</b></figcaption>
    </figure>
  );
}
