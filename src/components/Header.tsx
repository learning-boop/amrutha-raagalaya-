"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { nav, waLink, messages } from "@/lib/site";
import { Icon } from "./Icon";
import Button from "./Button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-offwhite/92 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-[1120px] px-5 flex items-center justify-between min-h-[70px] gap-4">
       <Link href="/" className="flex items-center shrink-0" aria-label="Amrutha Raagalaya home" onClick={() => setOpen(false)}>
  <Image src="/images/logo.png" alt="Amrutha Raagalaya Music Academy" width="60" height="60" priority className="w-14 h-14 lg:w-[60px] lg:h-[60px] rounded-full border border-gold/60 bg-offwhite" />
</Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-7">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={`text-[0.9rem] font-medium hover:text-maroon ${pathname === n.href ? "text-maroon" : "text-ink-2"}`}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <Button href={waLink(messages.classes)} external>Enquire About Classes</Button>
        </div>
        <button type="button" className="lg:hidden w-11 h-11 grid place-items-center text-maroon rounded-lg focus-visible:outline-3 focus-visible:outline-gold" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} className="w-7 h-7" />
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-line bg-offwhite">
          <ul className="mx-auto max-w-[1120px] px-5 py-3 grid">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className={`block py-3 text-[1.05rem] font-medium border-b border-line last:border-0 ${pathname === n.href ? "text-maroon" : "text-ink"}`}>{n.label}</Link>
              </li>
            ))}
            <li className="pt-4 pb-2"><Button href={waLink(messages.classes)} external className="w-full">Enquire About Classes</Button></li>
          </ul>
        </div>
      )}
    </header>
  );
}
