import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import GoogleReviews from "@/components/GoogleReviews";
import { getPublishedReviews } from "@/lib/reviews";
import Button from "@/components/Button";
import { site } from "@/lib/site";
import { SocialIcon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Google reviews from parents, students and organizers who have invited Amrutha Raagalaya Music Academy to their occasions.",
};

export default async function TestimonialsPage() {
  // Everything on this page comes from real Google reviews, added in the admin.
  const reviews = await getPublishedReviews();

  return (
    <>
      <section className="pt-12 pb-8 lg:pt-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Testimonials"
            title="*Voices* from our academy family"
            lead="Reviews left on Google by parents, students and the organizers who have invited us to their occasions."
          />
        </Container>
      </section>

      <GoogleReviews reviews={reviews} />

      <section className="py-14">
        <Container>
          <div className="bg-cream border border-line rounded-card p-8 md:p-10 text-center">
            <p className="eyebrow">Share your experience</p>
            <h2 className="text-3xl mt-2">Been part of our academy or a program?</h2>
            <p className="mt-3 text-ink-2 max-w-[60ch] mx-auto">A short Google review helps other parents and organizers find us. You can also watch our performances on YouTube.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={site.googleReview} external><SocialIcon name="google" /> Review us on Google</Button>
              <Button href={site.social.youtube} external variant="outline"><SocialIcon name="youtube" /> Watch on YouTube</Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
