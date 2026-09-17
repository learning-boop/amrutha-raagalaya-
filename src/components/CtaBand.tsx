import { waLink, messages } from "@/lib/site";
import Button from "./Button";
import { Icon, Kolam, WhatsAppIcon } from "./Icon";

export default function CtaBand({ title = "Begin your musical journey", lead = "Send us a message about classes. We reply on WhatsApp, usually the same day.", primary = "Enquire About Classes", primaryMsg = messages.classes }: { title?: string; lead?: string; primary?: string; primaryMsg?: string }) {
  return (
    <section className="relative overflow-hidden bg-maroon text-[#FFF8EC] py-20 text-center">
      <Kolam className="absolute -top-52 -left-52 w-[520px] h-[520px] opacity-[0.09] text-white pointer-events-none" />
      <div className="relative mx-auto max-w-[1120px] px-5">
        <Icon name="lamp" className="w-14 h-14 mx-auto mb-3 text-gold-soft" />
        <p className="eyebrow !text-gold-soft">Begin today</p>
        <h2 className="!text-[#FFF8EC] text-3xl sm:text-4xl lg:text-[2.6rem]">{title}</h2>
        <p className="mt-4 mx-auto max-w-[62ch] text-lg text-[#FFF8EC]/80">{lead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={waLink(primaryMsg)} external variant="onMaroon"><WhatsAppIcon /> {primary}</Button>
        </div>
      </div>
    </section>
  );
}
