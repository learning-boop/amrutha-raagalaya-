import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import Button from "@/components/Button";
import { Icon, WhatsAppIcon, SocialIcon } from "@/components/Icon";
import { site, waLink, telLink, messages } from "@/lib/site";

export const metadata: Metadata = { title: "Contact & Enquiry", description: `Enquire about Carnatic music classes or a devotional program. WhatsApp, phone and address for ${site.name}, Guntur.` };

export default function ContactPage() {
  return (
    <>
      <section className="pt-12 pb-10 lg:pt-16">
        <Container>
          <SectionHeading as="h1" eyebrow="Contact / enquiry" title="We’d love to hear from you" lead="Choose what you’d like to ask about. Send the form below and it reaches the academy straight away, or message us on WhatsApp — we usually reply the same day." />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={waLink(messages.classes)} external><WhatsAppIcon /> Enquire About Music Classes</Button>
            <Button href={waLink(messages.program)} external variant="outline">Enquire About a Devotional Program</Button>
            <Button href={telLink} external variant="ghost"><Icon name="phone" className="w-[18px] h-[18px]" /> {site.phone}</Button>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-22">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="bg-offwhite border border-line rounded-card p-7 md:p-9">
            <p className="eyebrow">Music classes</p>
            <h2 className="text-3xl mt-1">Enquire about classes</h2>
            <p className="text-ink-2 mt-2 mb-6">For every age group — children from about 4 years, teenagers and adults. Tell us a little about the student and we will share timings, fees and a trial-class slot.</p>
            <EnquiryForm kind="classes" />
          </div>
          <div className="bg-offwhite border border-line rounded-card p-7 md:p-9">
            <p className="eyebrow">Devotional programs</p>
            <h2 className="text-3xl mt-1">Enquire about a program</h2>
            <p className="text-ink-2 mt-2 mb-6">Temple festivals, weddings and traditional functions — devotional programs only. Share the occasion and date and we will suggest a program.</p>
            <EnquiryForm kind="program" />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-22">
        <Container className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading center={false} eyebrow="Contact academy" title="Visit us" />
            <ul className="mt-6 grid gap-5">
              <li className="flex gap-4"><Icon name="pin" className="w-7 h-7 text-gold shrink-0" /><div><b className="block font-semibold">Address</b><span className="text-ink-2">{site.address}</span></div></li>
              <li className="flex gap-4"><Icon name="clock" className="w-7 h-7 text-gold shrink-0" /><div><b className="block font-semibold">Class timings</b><span className="text-ink-2">{site.timings}</span></div></li>
              <li className="flex gap-4"><Icon name="phone" className="w-7 h-7 text-gold shrink-0" /><div><b className="block font-semibold">Phone / WhatsApp</b><a className="text-ink-2 hover:text-maroon" href={telLink}>{site.phone}</a></div></li>
              <li className="flex gap-4"><Icon name="mail" className="w-7 h-7 text-gold shrink-0" /><div><b className="block font-semibold">Email</b><a className="text-ink-2 hover:text-maroon" href={`mailto:${site.email}`}>{site.email}</a></div></li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-maroon hover:underline"><SocialIcon name="instagram" /> Instagram</a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-maroon hover:underline"><SocialIcon name="youtube" /> YouTube</a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-maroon hover:underline"><SocialIcon name="facebook" /> Facebook</a>
              <a href={site.googleReview} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-maroon hover:underline"><SocialIcon name="google" /> Review on Google</a>
            </div>
          </div>
          <div className="rounded-card overflow-hidden border border-line aspect-video lg:aspect-auto lg:min-h-[360px]">
            <iframe title="Map to Amrutha Raagalaya Music Academy" src={site.mapEmbed} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Container>
      </section>
    </>
  );
}
