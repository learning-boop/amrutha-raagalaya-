"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db, hasDatabase } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email and password." };
  if (!hasDatabase) return { error: "The database is not configured yet. See README-ADMIN.md." };

  let user: { id: string; name: string; passwordHash: string } | null = null;
  try {
    user = await db.adminUser.findUnique({
      where: { email },
      select: { id: true, name: true, passwordHash: true },
    });
  } catch (error) {
    console.error("Login lookup failed", error);
    return { error: "Could not reach the database. Please try again." };
  }

  // Compare even when the user is missing so a wrong email and a wrong
  // password take the same amount of time to answer.
  const dummy = "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv";
  const ok = await bcrypt.compare(password, user?.passwordHash ?? dummy);
  if (!user || !ok) return { error: "Incorrect email or password." };

  await createSession({ userId: user.id, name: user.name });
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
