import { journey } from "@/lib/content";

export default function Journey() {
  return (
    <ol className="relative mt-11 grid gap-6 md:grid-cols-5 md:gap-0 before:absolute before:bg-gold before:content-[''] before:left-[21px] before:top-0 before:bottom-0 before:w-px md:before:left-[8%] md:before:right-[8%] md:before:top-[22px] md:before:h-px md:before:w-auto md:before:bottom-auto">
      {journey.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[44px_1fr] gap-4 md:block md:text-center md:px-3">
          <div className="relative w-11 h-11 rounded-full border-[1.5px] border-gold bg-offwhite grid place-items-center font-serif font-semibold text-maroon md:mx-auto md:mb-4">{i + 1}</div>
          <div>
            <b className="block font-serif font-semibold text-[1.3rem] text-maroon mb-1">{s.title}</b>
            <p className="text-[0.86rem] text-ink-2">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
