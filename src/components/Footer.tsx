import Link from "next/link";
import Image from "next/image";
import { site, nav, waLink, telLink, messages } from "@/lib/site";
import { SocialIcon } from "./Icon";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-28 md:pb-14 text-[0.9rem] text-ink-2">
      <div className="mx-auto max-w-[1120px] px-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/images/logo.png" alt="Amrutha Raagalaya Music Academy" width="96" height="96" className="w-24 h-24 rounded-full border border-gold/60 mb-3" />
          <h4 className="text-xl mb-2">{site.name}</h4>
          <p>Carnatic music lessons for every age group, and devotional music programs for temples, weddings and traditional functions.</p>
          <p className="font-serif italic text-lg text-ink mt-3">{site.tagline}</p>
        </div>
        <div>
          <h4 className="text-xl mb-2">Explore</h4>
          <ul className="grid gap-1.5">{nav.map((n) => (<li key={n.href}><Link href={n.href} className="hover:text-maroon">{n.label}</Link></li>))}</ul>
        </div>
        <div>
          <h4 className="text-xl mb-2">Enquire</h4>
          <ul className="grid gap-1.5">
            <li><a href={waLink(messages.classes)} target="_blank" rel="noopener noreferrer" className="hover:text-maroon">Enquire About Classes/Programs</a></li>

            <li><a href={waLink(messages.program)} target="_blank" rel="noopener noreferrer" className="hover:text-maroon">Enquire About a Program</a></li>
            <li><Link href="/contact" className="hover:text-maroon">Contact Academy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl mb-2">Visit</h4>
          <ul className="grid gap-1.5">
            <li>{site.address}</li>
            <li>{site.timings}</li>
            <li><a href={telLink} className="hover:text-maroon">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-maroon">{site.email}</a></li>
          </ul>
          <h4 className="text-xl mb-2 mt-5">Follow us</h4>
          <ul className="flex gap-2.5">
            {[
              { href: site.social.instagram, label: "Instagram", icon: "instagram" },
              { href: site.social.youtube, label: "YouTube", icon: "youtube" },
              { href: site.social.facebook, label: "Facebook", icon: "facebook" },
              { href: site.googleReview, label: "Review us on Google", icon: "google" },
            ].map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label} className="w-10 h-10 grid place-items-center rounded-full border border-line text-maroon hover:border-gold hover:bg-cream transition-colors">
                  <SocialIcon name={s.icon as "instagram" | "youtube" | "facebook" | "google"} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1120px] px-5 mt-10 pt-6 border-t border-line text-[0.8rem] flex flex-wrap gap-2 justify-between">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="flex gap-4">
          <span>Website by Creators Touch</span>
          {/* Staff sign-in. rel=nofollow because /admin is disallowed in robots.txt. */}
          <Link href="/admin" rel="nofollow" className="text-ink-2/70 hover:text-maroon">Admin</Link>
        </span>
      </div>
    </footer>
  );
}
