export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) };
  return (
    <div className="max-w-[760px] mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {items.map((i, idx) => (
        <details key={i.q} open={idx === 0} className="border-b border-line group">
          <summary className="cursor-pointer py-4.5 font-medium flex justify-between items-center gap-4 text-ink focus-visible:outline-3 focus-visible:outline-gold">
            {i.q}
            <span className="faq-icon font-serif text-2xl text-gold shrink-0" aria-hidden="true" />
          </summary>
          <p className="pb-4.5 text-ink-2 max-w-[65ch]">{i.a}</p>
        </details>
      ))}
    </div>
  );
}
