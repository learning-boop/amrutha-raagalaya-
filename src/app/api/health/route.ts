import { NextResponse } from "next/server";
import { connection } from "next/server";
import { db, hasDatabase } from "@/lib/db";

/**
 * Deployment self-check: which settings this deployment actually receives and
 * whether it can reach the database. Reports only "set"/"missing"-style facts,
 * never values, so it is safe to open publicly.
 */

const REQUIRED = [
  "DATABASE_URL",
  "DIRECT_URL",
  "SESSION_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

function describe(value: string | undefined) {
  if (value === undefined) return "missing";
  if (value === "") return "empty";
  // Common copy-paste mistakes from a .env file.
  if (/^["'].*["']$/.test(value)) return "set, but wrapped in quote marks — remove them";
  if (value !== value.trim()) return "set, but has spaces at the start or end — remove them";
  return "set";
}

async function databaseCheck() {
  if (!hasDatabase) return "skipped — DATABASE_URL is missing";
  const url = process.env.DATABASE_URL!;
  if (!/^postgres(ql)?:\/\//.test(url.replace(/^["']/, ""))) return "DATABASE_URL does not start with postgresql://";
  try {
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timed out after 8s")), 8_000));
    await Promise.race([db.$queryRaw`SELECT 1`, timeout]);
    return "connected";
  } catch (error) {
    const e = error as { code?: string; message?: string };
    // Prisma's first line is just "Invalid invocation"; the cause is further
    // down. Keep the most informative line and strip anything URL-shaped.
    const lines = String(e.message ?? error).split("\n").map((l) => l.trim()).filter(Boolean);
    const cause =
      lines.find((l) => /can't reach|authentication|password|does not exist|timed out|refused|ENOTFOUND|certificate/i.test(l)) ??
      lines.at(-1) ??
      "";
    return `failed: ${e.code ?? ""} ${cause.replace(/postgres(ql)?:\/\/\S+/g, "<url>").slice(0, 200)}`.trim();
  }
}

export async function GET() {
  await connection();

  const variables = Object.fromEntries(REQUIRED.map((name) => [name, describe(process.env[name])]));
  const url = process.env.DATABASE_URL ?? "";

  return NextResponse.json(
    {
      deployment: {
        environment: process.env.VERCEL_ENV ?? "not on Vercel",
        commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
        branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
        region: process.env.VERCEL_REGION ?? null,
      },
      variables,
      databaseUrlShape: url
        ? { usesPooledHost: url.includes("-pooler"), isNeon: url.includes("neon.tech") }
        : null,
      database: await databaseCheck(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
