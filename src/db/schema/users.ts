import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "viewer",
  "talent",
  "industry",
  "admin",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(), // Supabase auth user ID
    email: text("email").notNull().unique(),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),
    role: userRoleEnum("role").default("viewer").notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),

    // Stripe
    stripeCustomerId: text("stripe_customer_id").unique(),

    // Profile
    bio: text("bio"),
    instagramHandle: text("instagram_handle"),
    website: text("website"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    roleIdx: index("users_role_idx").on(table.role),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
