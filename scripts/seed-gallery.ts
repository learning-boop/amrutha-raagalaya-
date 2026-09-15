import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { pgConnectionString } from "../src/lib/pg-url";
import { gallery } from "../src/lib/content";

/**
 * Copies the photos bundled in src/lib/content.ts into the database, so the
 * admin gallery starts with the images already on the site. Safe to re-run:
 * it does nothing once the table has rows.
 *
 * Run with: npm run gallery:seed
 */
async function main() {
  const url = pgConnectionString(process.env.DIRECT_URL ?? process.env.DATABASE_URL);
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

  try {
    const existing = await db.galleryImage.count();
    if (existing > 0) {
      console.log(`Gallery already has ${existing} photos — nothing to do.`);
      return;
    }

    const rows = gallery
      .filter((g) => Boolean(g.src))
      .map((g, index) => ({
        category: g.category,
        caption: g.caption,
        // These stay in /public, so they have no Cloudinary public id.
        url: g.src!,
        sortOrder: index + 1,
      }));

    const { count } = await db.galleryImage.createMany({ data: rows });
    console.log(`Seeded ${count} photos from src/lib/content.ts.`);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error(`\n${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
