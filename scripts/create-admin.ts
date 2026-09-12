import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Creates (or updates the password of) an admin who can sign in at /admin.
 * Run with: npm run admin:create
 */
async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Copy .env.example to .env first.");

  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
  const rl = createInterface({ input: stdin, output: stdout });

  try {
    const email = (await rl.question("Email: ")).trim().toLowerCase();
    const name = (await rl.question("Name: ")).trim();
    const password = (await rl.question("Password (min 10 characters): ")).trim();

    if (!email.includes("@")) throw new Error("That does not look like an email address.");
    if (!name) throw new Error("Name is required.");
    if (password.length < 10) throw new Error("Please use at least 10 characters.");

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.adminUser.upsert({
      where: { email },
      update: { name, passwordHash },
      create: { email, name, passwordHash },
    });

    console.log(`\nReady. Sign in at /admin/login as ${user.email}`);
  } finally {
    rl.close();
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error(`\n${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
