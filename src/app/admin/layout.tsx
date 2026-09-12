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
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  // Null on the sign-in page, which is the one admin route without a session.
  const admin = await getAdmin();

  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      {admin && (
        <header className="border-b border-line bg-cream/60 backdrop-blur sticky top-0 z-30">
          <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
            <Link href="/admin" className="font-serif text-xl text-maroon font-semibold">
              Amrutha Raagalaya
            </Link>
            <nav className="flex items-center gap-1" aria-label="Admin">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2 rounded-lg text-[0.9rem] font-medium text-ink-2 hover:text-maroon hover:bg-cream-2 transition-colors focus-visible:outline-3 focus-visible:outline-gold"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/" className="text-[0.85rem] text-ink-2 hover:text-maroon">
                View site →
              </Link>
              <span className="text-[0.85rem] text-ink-2 hidden sm:inline">{admin.name}</span>
              <form action={logout}>
                <button
                  type="submit"
                  className="min-h-9 px-3 rounded-lg border border-line text-[0.85rem] font-medium text-ink hover:border-gold hover:text-maroon transition-colors focus-visible:outline-3 focus-visible:outline-gold"
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
