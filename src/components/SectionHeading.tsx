import { withAccent } from "./Accent";

export default function SectionHeading({ eyebrow, title, lead, center = true, as: Tag = "h2" }: { eyebrow: string; title: string; lead?: string; center?: boolean; as?: "h1" | "h2" }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <div className={`divider ${center ? "divider-center" : ""}`} />
      <Tag className={Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.6rem]"}>{withAccent(title)}</Tag>
      {lead && <p className={`mt-4 text-ink-2 text-lg leading-relaxed ${center ? "mx-auto" : ""} max-w-[62ch]`}>{lead}</p>}
    </div>
  );
}