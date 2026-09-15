import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { pgConnectionString } from "./pg-url";

/** True when a database is configured. Callers check this before querying. */
export const hasDatabase = Boolean(process.env.DATABASE_URL);

// Next.js hot-reloads modules in development; reuse one client so we don't
// exhaust the connection pool.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // Prisma 7 takes the connection through a driver adapter rather than from
  // schema.prisma. `pg` works with Neon, Supabase and self-hosted Postgres alike.
  const adapter = new PrismaPg({ connectionString: pgConnectionString(process.env.DATABASE_URL) });
  return new PrismaClient({ adapter });
}

let cached: PrismaClient | undefined;

function client() {
  cached ??= globalForPrisma.prisma ?? createClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = cached;
  return cached;
}

/**
 * Connects on first use, not on import — so pages that fall back to bundled
 * content still render when no database is configured (e.g. during a build
 * before the environment variables are in place).
 */
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const instance = client();
    const value = Reflect.get(instance, prop);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
