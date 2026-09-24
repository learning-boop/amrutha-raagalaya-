"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db, hasDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { createSession } from "@/lib/session";
import { MIN_PASSWORD_LENGTH } from "@/lib/password";

export type AccountState = { error?: string; ok?: string };

/** Every change here is confirmed with the current password. */
async function verifyCurrentPassword(userId: string, password: string) {
  const user = await db.adminUser.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, passwordHash: true },
  });
  if (!user) return null;
  return (await bcrypt.compare(password, user.passwordHash)) ? user : null;
}

export async function updateDetails(_prev: AccountState, formData: FormData): Promise<AccountState> {
  const session = await requireAdmin();
  if (!hasDatabase) return { error: "The database is not configured yet. See README-ADMIN.md." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const currentPassword = String(formData.get("currentPassword") ?? "");

  if (name.length < 2 || name.length > 80) return { error: "Please enter your name." };
  // Deliberately loose: the only rule that matters is that you can still sign in with it.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (!currentPassword) return { error: "Enter your current password to confirm the change." };

  try {
    const user = await verifyCurrentPassword(session.userId, currentPassword);
    if (!user) return { error: "That password is not correct." };

    if (email !== user.email) {
      const taken = await db.adminUser.findUnique({ where: { email }, select: { id: true } });
      if (taken && taken.id !== user.id) return { error: "Another admin already uses that email address." };
    }

    await db.adminUser.update({ where: { id: user.id }, data: { name, email } });

    // The signed-in name is stored in the session cookie, so refresh it.
    if (name !== user.name) await createSession({ userId: user.id, name });

    revalidatePath("/admin/account");
    revalidatePath("/admin");
    const changedEmail = email !== user.email;
    return { ok: changedEmail ? `Saved. Sign in with ${email} from now on.` : "Saved." };
  } catch (error) {
    console.error("Could not update admin details", error);
    return { error: "Could not save the changes. Please try again." };
  }
}

export async function changePassword(_prev: AccountState, formData: FormData): Promise<AccountState> {
  const session = await requireAdmin();
  if (!hasDatabase) return { error: "The database is not configured yet. See README-ADMIN.md." };

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword) return { error: "Enter your current password." };
  if (newPassword.length < MIN_PASSWORD_LENGTH) return { error: `The new password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
  if (newPassword !== confirmPassword) return { error: "The two new passwords do not match." };
  if (newPassword === currentPassword) return { error: "The new password is the same as the current one." };

  try {
    const user = await verifyCurrentPassword(session.userId, currentPassword);
    if (!user) return { error: "That current password is not correct." };

    await db.adminUser.update({
      where: { id: user.id },
      data: { passwordHash: await bcrypt.hash(newPassword, 12) },
    });

    revalidatePath("/admin/account");
    return { ok: "Password changed. Use it the next time you sign in." };
  } catch (error) {
    console.error("Could not change admin password", error);
    return { error: "Could not change the password. Please try again." };
  }
}
