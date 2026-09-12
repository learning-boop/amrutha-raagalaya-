import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { readSession } from "./session";

/** Returns the signed-in admin, or null. Memoised for one render pass. */
export const getAdmin = cache(async () => readSession());

/** Use at the top of every admin page, Server Action and Route Handler. */
export const requireAdmin = cache(async () => {
  const session = await getAdmin();
  if (!session) redirect("/admin/login");
  return session;
});
