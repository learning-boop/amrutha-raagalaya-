import { connection } from "next/server";
import { requireAdmin } from "@/lib/dal";
import { db, hasDatabase } from "@/lib/db";
import { DetailsForm, PasswordForm } from "./AccountForms";

async function loadAdmin(userId: string) {
  await connection();
  return db.adminUser.findUnique({ where: { id: userId }, select: { name: true, email: true } });
}

export default async function AdminAccountPage() {
  const session = await requireAdmin();

  let account: { name: string; email: string } | null = null;
  let dbError = !hasDatabase;
  if (hasDatabase) {
    try {
      account = await loadAdmin(session.userId);
    } catch (error) {
      console.error("Could not load the admin account", error);
      dbError = true;
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <p className="eyebrow">Account</p>
      <div className="divider" />
      <h1 className="text-3xl">Your login</h1>
      <p className="mt-3 text-[0.92rem] text-ink-2 max-w-prose">
        Change the email address and password you use to sign in here. Both changes ask for your current password first.
      </p>

      {dbError || !account ? (
        <p className="mt-8 rounded-xl border border-gold-soft bg-cream px-4 py-3 text-[0.9rem] text-ink-2">
          The database is not reachable, so your login cannot be changed right now. See <code>README-ADMIN.md</code>.
        </p>
      ) : (
        <div className="mt-8 max-w-2xl space-y-5">
          <DetailsForm name={account.name} email={account.email} />
          <PasswordForm />

          <p className="text-[0.85rem] text-ink-2">
            Signed-in devices stay signed in for up to 7 days after a password change. To sign every device out at once,
            change <code>SESSION_SECRET</code> in your environment settings.
          </p>
        </div>
      )}
    </section>
  );
}
