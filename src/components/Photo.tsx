import Image from "next/image";

/** Renders a real photo when `src` is provided, otherwise a warm placeholder with the intended caption. */
export default function Photo({ src, alt, caption, className = "", sizes = "(max-width: 768px) 100vw, 50vw", priority }: { src?: string; alt: string; caption?: string; className?: string; sizes?: string; priority?: boolean }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden photo-placeholder grid place-items-center text-center text-[#FFF3E2] ${className}`} role="img" aria-label={alt}>
      <div className="relative z-10 p-4 text-[0.72rem] tracking-[0.08em] uppercase opacity-90">
        <span className="block font-serif text-lg normal-case tracking-normal font-medium mb-1">Photo</span>
        {caption ?? alt}
      </div>
    </div>
  );
}
