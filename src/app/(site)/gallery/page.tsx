import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBand from "@/components/CtaBand";
import { getGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = { title: "Gallery", description: "Photos from Amrutha Raagalaya — classes, students, performances, temple programs, weddings and traditional events." };

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-22">
        <Container>
          <SectionHeading as="h1" eyebrow="Gallery" title="Moments from the academy" lead="Classes, students, performances and the occasions we have been part of." />
          <GalleryGrid items={items} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
