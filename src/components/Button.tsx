import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "onMaroon" | "onMaroonOutline";

const styles: Record<Variant, string> = {
  primary: "bg-maroon text-[#FFF8EC] hover:bg-maroon-2 border-transparent",
  outline: "border-gold text-maroon bg-transparent hover:bg-cream",
  ghost: "border-line text-ink bg-transparent hover:bg-cream",
  onMaroon: "bg-[#FFF8EC] text-maroon border-transparent hover:bg-cream",
  onMaroonOutline: "border-gold-soft text-[#FFF8EC] bg-transparent hover:bg-white/10",
};

export default function Button({ href, children, variant = "primary", className = "", external }: { href: string; children: ReactNode; variant?: Variant; className?: string; external?: boolean }) {
  const cls = `inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-xl font-semibold text-[0.95rem] border-[1.5px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3 ${styles[variant]} ${className}`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  return <Link href={href} className={cls}>{children}</Link>;
}
