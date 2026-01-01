import { getDb } from "../src/db";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error("Usage: npx tsx scripts/make-admin.ts <email>");
    process.exit(1);
  }

  const db = getDb();

  // First check if user exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length === 0) {
    console.log(`User with email ${email} not found in database.`);
    console.log("The user needs to sign up first, then run this script.");
    process.exit(1);
  }

  // Update user to admin
  await db
    .update(users)
    .set({ role: "admin", updatedAt: new Date() })
    .where(eq(users.email, email));

  console.log(`✓ User ${email} is now an admin!`);
  process.exit(0);
}

makeAdmin();
