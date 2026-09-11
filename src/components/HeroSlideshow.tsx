import Image from "next/image";

/** Slow crossfade of hero photos. Pure CSS — no JS, respects prefers-reduced-motion. */
const slides = [
  { src: "/images/concert-temple-stage.jpg", alt: "A Carnatic concert with singer, mridangam and violin", pos: "60% center" },
  { src: "/images/temple-pillars-concert.jpg", alt: "Devotional concert among lamp-lit temple pillars", pos: "center" },
  { src: "/images/veena-player-saree.jpg", alt: "A musician in a traditional saree playing the veena", pos: "50% 20%" },
  { src: "/images/veena-temple.jpg", alt: "A Saraswati veena with a lamp and jasmine garland", pos: "center 40%" },
];
const DURATION = 6; // seconds per slide

export default function HeroSlideshow({ className = "" }: { className?: string }) {
  const total = slides.length * DURATION;
  return (
    <div className={`relative overflow-hidden ${className}`} aria-label="Photos from the academy">
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="hero-slide object-cover"
          style={{ objectPosition: s.pos, animationDuration: `${total}s`, animationDelay: `${i * DURATION}s` }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
      <div className="absolute left-5 bottom-4 flex gap-1.5" aria-hidden="true">
        {slides.map((s, i) => (
          <i key={s.src} className="hero-dot block h-1 w-6 rounded-full bg-[#FFF8EC]/40 overflow-hidden">
            <i className="block h-full w-full bg-[#FFF8EC] origin-left" style={{ animation: `hero-dot ${total}s linear infinite`, animationDelay: `${i * DURATION}s` }} />
          </i>
        ))}
      </div>
    </div>
  );
}
