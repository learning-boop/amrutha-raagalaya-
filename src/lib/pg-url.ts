// Deliberately free of `server-only` so the CLI scripts in /scripts can share it.

/**
 * Neon's connection strings use `sslmode=require`. The `pg` driver already
 * treats that as `verify-full` (certificate and host name checked) but prints
 * a security warning on every start, because its next major version will
 * weaken `require`. Asking for `verify-full` explicitly keeps today's strict
 * behaviour and silences the warning. Only the runtime driver sees this — the
 * Prisma CLI keeps reading the URL unchanged.
 */
export function pgConnectionString(url: string | undefined) {
  if (!url) throw new Error("DATABASE_URL is not set. See README-ADMIN.md for setup steps.");
  return url.replace(/([?&])sslmode=require(?=&|$)/, "$1sslmode=verify-full");
}
