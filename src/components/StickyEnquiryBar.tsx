import { waLink, messages } from "@/lib/site";
import { WhatsAppIcon } from "./Icon";

export default function StickyEnquiryBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden flex px-3.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] bg-offwhite border-t border-line shadow-[0_-6px_24px_rgba(70,40,30,0.1)]">
      <a href={waLink(messages.classesOrPrograms)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 min-h-[50px] rounded-xl bg-maroon text-[#FFF8EC] font-semibold">
        <WhatsAppIcon /> Enquire About Classes/Programs
      </a>
    </div>
  );
}
