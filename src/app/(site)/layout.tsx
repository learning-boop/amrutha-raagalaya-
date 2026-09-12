import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyEnquiryBar from "@/components/StickyEnquiryBar";

/** Public site chrome. The admin area under /admin deliberately sits outside this. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyEnquiryBar />
    </>
  );
}
