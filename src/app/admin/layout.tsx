import type { Metadata } from "next";
import Link from "next/link";
import { getAdmin } from "@/lib/dal";
import { logout } from "./auth-actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/account", label: "Account" },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  // Null on the sign-in page, which is the one admin route without a session.
  const admin = await getAdmin();

  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      {admin && (
        <header className="border-b border-line bg-cream/60 backdrop-blur sticky top-0 z-30">
          {/* On phones the menu drops to its own row and scrolls sideways, so
              every link stays reachable at 320px wide. */}
          <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center gap-x-6">
            <Link href="/admin" className="h-14 md:h-16 flex items-center font-serif text-xl text-maroon font-semibold whitespace-nowrap">
              Amrutha Raagalaya
            </Link>
            <nav
              className="order-last md:order-none w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0 flex items-center gap-1 overflow-x-auto pb-2 md:pb-0"
              aria-label="Admin"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="shrink-0 whitespace-nowrap px-3 py-2 rounded-lg text-[0.9rem] font-medium text-ink-2 hover:text-maroon hover:bg-cream-2 transition-colors focus-visible:outline-3 focus-visible:outline-gold"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/" className="text-[0.85rem] text-ink-2 hover:text-maroon whitespace-nowrap">
                View site →
              </Link>
              <Link href="/admin/account" className="text-[0.85rem] text-ink-2 hover:text-maroon hidden lg:inline">{admin.name}</Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="min-h-9 px-3 rounded-lg border border-line text-[0.85rem] font-medium text-ink hover:border-gold hover:text-maroon transition-colors whitespace-nowrap focus-visible:outline-3 focus-visible:outline-gold"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1">{children}</main>
    </div>
  );
}
