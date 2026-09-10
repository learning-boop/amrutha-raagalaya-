import { waLink, telLink, messages } from "@/lib/site";
import { Icon, WhatsAppIcon } from "./Icon";

export default function StickyEnquiryBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden flex gap-2.5 px-3.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] bg-offwhite border-t border-line shadow-[0_-6px_24px_rgba(70,40,30,0.1)]">
      <a href={waLink(messages.classes)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 min-h-[50px] rounded-xl bg-maroon text-[#FFF8EC] font-semibold">
        <WhatsAppIcon /> WhatsApp
      </a>
      <a href={telLink} className="flex-1 inline-flex items-center justify-center gap-2 min-h-[50px] rounded-xl border-[1.5px] border-gold text-maroon font-semibold">
        <Icon name="phone" className="w-5 h-5" /> Call
      </a>
    </div>
  );
}
