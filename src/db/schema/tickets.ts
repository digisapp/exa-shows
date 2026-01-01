import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  boolean,
  index,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { shows } from "./shows";
import { users } from "./users";

// Ticket types/tiers for a show
export const ticketTypes = pgTable(
  "ticket_types",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    showId: uuid("show_id")
      .references(() => shows.id, { onDelete: "cascade" })
      .notNull(),

    name: text("name").notNull(),
    description: text("description"),
    priceUsd: integer("price_usd").notNull(), // Price in cents

    // Capacity
    totalQuantity: integer("total_quantity"), // NULL = unlimited
    soldCount: integer("sold_count").default(0).notNull(),

    // Features
    features: text("features"), // JSON array of features

    // Stripe
    stripePriceId: text("stripe_price_id"),

    // Display
    isFeatured: boolean("is_featured").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    showIdx: index("ticket_types_show_idx").on(table.showId),
    priceNonNegative: check("price_non_negative", sql`${table.priceUsd} >= 0`),
  })
);

// Purchased tickets
export const tickets = pgTable(
  "tickets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ticketTypeId: uuid("ticket_type_id")
      .references(() => ticketTypes.id)
      .notNull(),
    showId: uuid("show_id")
      .references(() => shows.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),

    // Purchase Info
    ticketNumber: integer("ticket_number"),
    pricePaid: integer("price_paid").notNull(), // In cents
    quantity: integer("quantity").default(1).notNull(),

    // Customer Info (for guests)
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone"),

    // Stripe
    stripeSessionId: text("stripe_session_id").unique(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),

    // Status
    paymentStatus: text("payment_status").default("pending").notNull(),
    isCheckedIn: boolean("is_checked_in").default(false).notNull(),
    checkInTime: timestamp("check_in_time"),

    // QR Code
    qrCode: text("qr_code").unique(),

    // Promo
    promoCode: text("promo_code"),

    purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
  },
  (table) => ({
    showIdx: index("tickets_show_idx").on(table.showId),
    userIdx: index("tickets_user_idx").on(table.userId),
    stripeIdx: index("tickets_stripe_idx").on(table.stripeSessionId),
    qrIdx: index("tickets_qr_idx").on(table.qrCode),
    paymentStatusIdx: index("tickets_payment_status_idx").on(
      table.paymentStatus
    ),
  })
);

export type TicketType = typeof ticketTypes.$inferSelect;
export type NewTicketType = typeof ticketTypes.$inferInsert;
export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;
