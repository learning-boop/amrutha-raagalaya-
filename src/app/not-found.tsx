import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Button from "@/components/Button";

// Lives outside the (site) group, so it carries its own header and footer.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-24 text-center">
          <Container>
            <p className="eyebrow">Page not found</p>
            <div className="divider divider-center" />
            <h1 className="text-4xl">This page has wandered off the raga</h1>
            <p className="mt-4 text-ink-2">The link may be old or mistyped.</p>
            <div className="mt-8"><Button href="/">Back to home</Button></div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
