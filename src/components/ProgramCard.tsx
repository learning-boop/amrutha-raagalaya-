import { Icon } from "./Icon";
import { waLink } from "@/lib/site";

export default function ProgramCard({ icon, title, text, linkLabel }: { icon: string; title: string; text: string; linkLabel: string }) {
  return (
    <div className="lift bg-offwhite border border-line rounded-card p-6 flex flex-col gap-2.5 h-full">
      <Icon name={icon} className="w-9 h-9 text-gold" />
      <h3 className="text-[1.3rem]">{title}</h3>
      <p className="text-[0.9rem] text-ink-2">{text}</p>
      <a href={waLink(`Namaste! I would like to enquire about a ${title.toLowerCase().replace(/ programs?$/, "")} program from Amrutha Raagalaya.`)} target="_blank" rel="noopener noreferrer" className="mt-auto pt-2 text-[0.85rem] font-semibold text-maroon hover:underline">{linkLabel} →</a>
    </div>
  );
}
